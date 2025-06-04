"use client";

import {
  getJournalProgram,
  getJournalProgramId,
  getJournalEntryPDA,
  JournalEntryState,
  JournalProgram,
} from "@/lib/anchor";
import { useWalletUi } from "@wallet-ui/react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useCluster } from "./cluster-data-access";
import { useAnchorProvider } from "../solana/solana-provider";
import { useTransactionToast } from "../use-transaction-toast";
import { useMemo } from "react";
import { address } from "gill";

interface CreateEntryArgs {
  title: string;
  message: string;
  owner: PublicKey;
}

export function useJournalProgram() {
  const { client } = useWalletUi();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const programId = useMemo(
    () => getJournalProgramId(cluster.network as string),
    [cluster]
  );
  const program = getJournalProgram(provider);

  const accounts = useQuery({
    queryKey: ["journal", "all", { cluster }],
    queryFn: async () => {
      try {
        return await program.account.journalEntryState.all();
      } catch (error) {
        console.warn('Error fetching journal entries:', error);
        return [];
      }
    },
  });

  const getProgramAccount = useQuery({
    queryKey: ["get-program-account", { cluster }],
    queryFn: async () => {
      if (!client) return null;
      try {
        return await client.rpc.getAccountInfo(address(programId.toString()));
      } catch (error) {
        console.warn('Error fetching program account:', error);
        return null;
      }
    },
  });

  const createEntry = useMutation<string, Error, CreateEntryArgs>({
    mutationKey: ['journalEntry', 'create', { cluster }],
    mutationFn: async ({ title, message, owner }) => {
      if (!program) {
        throw new Error('Program not initialized');
      }

      // Generate PDA for the journal entry using the helper function
      const [journalEntryAddress] = getJournalEntryPDA(title, owner, programId);

      console.log('Creating journal entry:', {
        title,
        message,
        owner: owner.toString(),
        journalEntry: journalEntryAddress.toString()
      });

      try {
        const signature = await program.methods.createJournalEntry(title, message).accounts({
          owner,
          journalEntry: journalEntryAddress,
          systemProgram: SystemProgram.programId,
        }).rpc();
        return signature;
      } catch (error) {
        console.error('Error in createJournalEntry:', error);
        throw error;
      }
    },
    onSuccess: (signature: string) => {
      console.log('Journal entry created successfully:', signature);
      transactionToast(signature);
      toast.success('Journal entry created successfully!');
      accounts.refetch();
    },
    onError: (error: Error) => {
      console.error('Failed to create journal entry:', error);
      toast.error(`Failed to create journal entry: ${error.message}`);
    },
  });

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    createEntry,
  };
}

export function useJournalProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { program, accounts } = useJournalProgram();
  const programId = useMemo(
    () => getJournalProgramId(cluster.network as string),
    [cluster]
  );

  const accountQuery = useQuery({
    queryKey: ["journal", "fetch", { cluster, account: account.toString() }],
    queryFn: async () => {
      try {
        return await program.account.journalEntryState.fetch(account);
      } catch (error) {
        console.warn('Error fetching journal entry:', error);
        return null;
      }
    },
  });

  const updateEntry = useMutation<string, Error, CreateEntryArgs>({
    mutationKey: ["journalEntry", "update", { cluster }],
    mutationFn: async ({ title, message, owner }) => {
      if (!program) {
        throw new Error('Program not initialized');
      }

      const [journalEntryAddress] = getJournalEntryPDA(title, owner, programId);

      return await program.methods.updateJournalEntry(title, message).accounts({
        journalEntry: journalEntryAddress,
        owner,
        systemProgram: SystemProgram.programId,
      }).rpc();
    },
    onSuccess: (signature: string) => {
      transactionToast(signature);
      toast.success('Journal entry updated successfully!');
      accounts.refetch();
    },
    onError: (error: Error) => {
      console.error('Failed to update journal entry:', error);
      toast.error(`Failed to update journal entry: ${error.message}`);
    },
  });

  const deleteEntry = useMutation({
    mutationKey: ["journal", "deleteEntry", { cluster, account: account.toString() }],
    mutationFn: async (title: string) => {
      if (!program) {
        throw new Error('Program not initialized');
      }

      const owner = account; // Assuming account is the owner
      const [journalEntryAddress] = getJournalEntryPDA(title, owner, programId);

      return await program.methods.deleteJournalEntry(title).accounts({
        journalEntry: journalEntryAddress,
        owner,
        systemProgram: SystemProgram.programId,
      }).rpc();
    },
    onSuccess: (tx: string) => {
      transactionToast(tx);
      toast.success('Journal entry deleted successfully!');
      accounts.refetch();
    },
    onError: (error: Error) => {
      console.error('Failed to delete journal entry:', error);
      toast.error(`Failed to delete journal entry: ${error.message}`);
    },
  });

  return {
    accountQuery,
    updateEntry,
    deleteEntry,
  };
}

// Additional hooks that the test file expects
export function useJournalEntries() {
  const { accounts } = useJournalProgram();
  return {
    data: accounts.data || [],
    isLoading: accounts.isLoading,
    error: accounts.error,
    refetch: accounts.refetch,
  };
}

export function useCreateJournalEntry() {
  const { createEntry } = useJournalProgram();
  return createEntry;
}

// Export types for use in other components
export type { JournalEntryState, JournalProgram, CreateEntryArgs };
