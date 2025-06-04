/**
 * Journal Entry interface matching the Rust struct JournalEntryState
 * This represents a journal entry stored on the Solana blockchain
 */
import { PublicKey } from '@solana/web3.js'

export interface JournalEntry {
  /** The owner/creator of the journal entry */
  owner: PublicKey;
  /** The title of the journal entry (max 280 characters) */
  title: string;
  /** The message/content of the journal entry (max 280 characters) */
  message: string;
}

/**
 * Arguments for creating a new journal entry
 */
export interface CreateJournalEntryArgs {
  /** The title for the new journal entry */
  title: string;
  /** The message/content for the new journal entry */
  message: string;
}

/**
 * Arguments for updating an existing journal entry
 */
export interface UpdateJournalEntryArgs {
  /** The title of the journal entry to update (used as identifier) */
  title: string;
  /** The new message/content for the journal entry */
  message: string;
}

/**
 * Transaction result interface
 */
export interface TransactionResult {
  /** The transaction signature */
  signature: string;
  /** The Program Derived Address of the journal entry */
  pda: PublicKey;
}

/**
 * Error types for journal operations
 */
export enum JournalErrorType {
  WALLET_NOT_CONNECTED = 'WALLET_NOT_CONNECTED',
  PROGRAM_NOT_INITIALIZED = 'PROGRAM_NOT_INITIALIZED',
  ENTRY_NOT_FOUND = 'ENTRY_NOT_FOUND',
  TITLE_TOO_LONG = 'TITLE_TOO_LONG',
  MESSAGE_TOO_LONG = 'MESSAGE_TOO_LONG',
  ENTRY_ALREADY_EXISTS = 'ENTRY_ALREADY_EXISTS',
  UNAUTHORIZED = 'UNAUTHORIZED',
  TRANSACTION_FAILED = 'TRANSACTION_FAILED',
}

/**
 * Custom error class for journal operations
 */
export class JournalError extends Error {
  constructor(
    public type: JournalErrorType,
    message: string,
    public cause?: Error
  ) {
    super(message);
    this.name = 'JournalError';
  }
}

/**
 * Configuration for the journal program
 */
export interface JournalConfig {
  /** The Solana program ID */
  programId: string;
  /** Maximum length for journal entry titles */
  maxTitleLength: number;
  /** Maximum length for journal entry messages */
  maxMessageLength: number;
  /** Solana commitment level */
  commitment: 'confirmed' | 'finalized' | 'processed';
}

/**
 * Default configuration for the journal program
 */
export const DEFAULT_JOURNAL_CONFIG: JournalConfig = {
  programId: '6NGgMhYhp4TaoesSxBJf5NJs67Y1j7xVHmuojSQLvnBe',
  maxTitleLength: 280,
  maxMessageLength: 280,
  commitment: 'confirmed',
};

/**
 * Anchor IDL type for the journal program
 * This would typically be generated from your Anchor program
 */
export interface JournalProgramIDL {
  version: string;
  name: string;
  instructions: Array<{
    name: string;
    accounts: Array<{
      name: string;
      isMut: boolean;
      isSigner: boolean;
    }>;
    args: Array<{
      name: string;
      type: string;
    }>;
  }>;
  accounts: Array<{
    name: string;
    type: {
      kind: string;
      fields: Array<{
        name: string;
        type: string;
      }>;
    };
  }>;
}
