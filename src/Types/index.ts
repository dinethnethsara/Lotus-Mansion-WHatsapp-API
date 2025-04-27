/**
 * Type definitions for Lotus Mantion WhatsApp API
 */

import { EventEmitter } from 'events';
import WebSocket from 'ws';

// Authentication state
export interface AuthenticationState {
    creds: AuthenticationCreds;
    keys: SignalKeyStore;
}

export interface AuthenticationCreds {
    me?: {
        id: string;
        name: string;
    };
    noiseKey: Uint8Array;
    signedIdentityKey: Uint8Array;
    signedPreKey: SignedPreKey;
    registrationId: number;
    advSecretKey: string;
    nextPreKeyId: number;
    firstUnuploadedPreKeyId: number;
    serverHasPreKeys: boolean;
    account?: any;
    signalIdentities?: any[];
    lastAccountSyncTimestamp?: number;
    myAppStateKeyId?: string;
}

export interface SignedPreKey {
    keyPair: {
        private: Uint8Array;
        public: Uint8Array;
    };
    signature: Uint8Array;
    keyId: number;
}

export interface SignalKeyStore {
    getPreKey(keyId: number): Promise<{
        private: Uint8Array;
        public: Uint8Array;
    }>;
    setPreKey(keyId: number, key: {
        private: Uint8Array;
        public: Uint8Array;
    }): Promise<void>;
    getSession(id: string): Promise<any>;
    setSession(id: string, session: any): Promise<void>;
    getIdentity(id: string): Promise<{
        private: Uint8Array;
        public: Uint8Array;
    } | null>;
    setIdentity(id: string, identity: {
        private: Uint8Array;
        public: Uint8Array;
    }): Promise<void>;
}

// Socket configuration
export interface SocketConfig {
    /** Credentials to use for authentication */
    auth: AuthenticationState;
    /** Logger to use */
    logger?: any;
    /** Print QR to terminal */
    printQRInTerminal?: boolean;
    /** Browser configuration */
    browser?: {
        name?: string;
        version?: string;
    };
    /** Connection timeout in ms */
    connectTimeoutMs?: number;
    /** Keep alive interval in ms */
    keepAliveIntervalMs?: number;
    /** Retry connection delay in ms */
    retryRequestDelayMs?: number;
    /** Maximum retry count */
    maxRetries?: number;
}

// Message types
export interface Message {
    key: MessageKey;
    message: any;
    messageTimestamp?: number;
    status?: MessageStatus;
}

export interface MessageKey {
    remoteJid: string;
    fromMe: boolean;
    id: string;
    participant?: string;
}

export enum MessageStatus {
    ERROR = -1,
    PENDING = 0,
    SERVER_ACK = 1,
    DELIVERY_ACK = 2,
    READ = 3,
    PLAYED = 4,
}

// Socket events
export interface LotusSocketEvents {
    'connection.update': (update: {
        connection?: 'open' | 'close' | 'connecting';
        lastDisconnect?: {
            error?: Error;
            date?: Date;
        };
        qr?: string;
    }) => void;
    'creds.update': (creds: Partial<AuthenticationCreds>) => void;
    'messages.upsert': (messages: {
        messages: Message[];
        type: 'notify' | 'append';
    }) => void;
    'messages.update': (updates: Partial<Message>[]) => void;
    'presence.update': (update: {
        id: string;
        presences: { [participant: string]: string };
    }) => void;
    'chats.upsert': (chats: any[]) => void;
    'chats.update': (updates: Partial<any>[]) => void;
    'contacts.upsert': (contacts: any[]) => void;
    'contacts.update': (updates: Partial<any>[]) => void;
    'groups.upsert': (groups: any[]) => void;
    'groups.update': (updates: Partial<any>[]) => void;
}

// Socket type
export interface LotusSocket extends EventEmitter {
    // Connection methods
    connect(): Promise<{ user: { id: string; name: string } }>;
    logout(): Promise<void>;
    end(): Promise<void>;
    
    // Messaging methods
    sendMessage(jid: string, content: any, options?: any): Promise<Message>;
    sendTextMessage(jid: string, text: string, options?: any): Promise<Message>;
    sendImageMessage(jid: string, image: Buffer | string, caption?: string, options?: any): Promise<Message>;
    sendVideoMessage(jid: string, video: Buffer | string, caption?: string, options?: any): Promise<Message>;
    sendAudioMessage(jid: string, audio: Buffer | string, options?: any): Promise<Message>;
    sendDocumentMessage(jid: string, document: Buffer | string, mimetype: string, fileName: string, options?: any): Promise<Message>;
    sendContactMessage(jid: string, contacts: any[], options?: any): Promise<Message>;
    sendLocationMessage(jid: string, location: { degreesLatitude: number; degreesLongitude: number }, options?: any): Promise<Message>;
    
    // Group methods
    createGroup(subject: string, participants: string[]): Promise<{ id: string; subject: string; creation: number; owner: string }>;
    updateGroupSubject(jid: string, subject: string): Promise<void>;
    updateGroupDescription(jid: string, description: string): Promise<void>;
    updateGroupParticipants(jid: string, participants: { [key: string]: 'add' | 'remove' | 'promote' | 'demote' }): Promise<{ status: string; jid: string }[]>;
    leaveGroup(jid: string): Promise<void>;
    
    // Status methods
    getStatus(jid: string): Promise<{ status: string }>;
    updateStatus(status: string): Promise<void>;
    
    // Profile methods
    updateProfilePicture(jid: string, image: Buffer): Promise<void>;
    updateProfileName(name: string): Promise<void>;
    
    // Utility methods
    getJidInfo(jid: string): { server: string; user: string; device?: string };
    isJidUser(jid: string): boolean;
    isJidGroup(jid: string): boolean;
    isJidBroadcast(jid: string): boolean;
}

// WebSocket connection
export interface LotusWebSocket extends WebSocket {
    id?: string;
    sendMessage: (message: any) => void;
}
