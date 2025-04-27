/**
 * Authentication module for Lotus Mantion WhatsApp API
 */

import * as fs from 'fs';
import * as path from 'path';
import { AuthenticationState, AuthenticationCreds, SignalKeyStore } from '../Types';

/**
 * Stores authentication state in multiple files
 * @param folder folder to store the auth files
 */
export const useMultiFileAuthState = async (folder: string): Promise<AuthenticationState> => {
    const writeData = (file: string, data: any) => {
        try {
            fs.writeFileSync(
                path.join(folder, file), 
                JSON.stringify(data, (key, value) => {
                    if (value instanceof Uint8Array) {
                        return {
                            type: 'Buffer',
                            data: Array.from(value)
                        };
                    }
                    return value;
                }, 2)
            );
        } catch (error) {
            console.error(`Error writing file ${file}:`, error);
        }
    };

    const readData = (file: string) => {
        try {
            const data = JSON.parse(
                fs.readFileSync(path.join(folder, file), { encoding: 'utf8' }),
                (key, value) => {
                    if (value && value.type === 'Buffer') {
                        return new Uint8Array(value.data);
                    }
                    return value;
                }
            );
            return data;
        } catch (error) {
            return null;
        }
    };

    // Create folder if it doesn't exist
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }

    const creds: AuthenticationCreds = readData('creds.json') || {
        noiseKey: null,
        signedIdentityKey: null,
        signedPreKey: null,
        registrationId: 0,
        advSecretKey: '',
        nextPreKeyId: 1,
        firstUnuploadedPreKeyId: 1,
        serverHasPreKeys: false
    };

    const keys: SignalKeyStore = {
        async getPreKey(keyId: number) {
            const preKeys = readData('pre-keys.json') || {};
            return preKeys[keyId];
        },
        async setPreKey(keyId: number, key: any) {
            const preKeys = readData('pre-keys.json') || {};
            preKeys[keyId] = key;
            writeData('pre-keys.json', preKeys);
        },
        async getSession(id: string) {
            const sessions = readData('sessions.json') || {};
            return sessions[id];
        },
        async setSession(id: string, session: any) {
            const sessions = readData('sessions.json') || {};
            sessions[id] = session;
            writeData('sessions.json', sessions);
        },
        async getIdentity(id: string) {
            const identities = readData('identities.json') || {};
            return identities[id];
        },
        async setIdentity(id: string, identity: any) {
            const identities = readData('identities.json') || {};
            identities[id] = identity;
            writeData('identities.json', identities);
        }
    };

    return {
        creds,
        keys
    };
};
