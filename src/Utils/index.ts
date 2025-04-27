/**
 * Utility functions for Lotus Mantion WhatsApp API
 */

/**
 * Generates a random ID
 * @param length Length of the ID
 * @returns Random ID
 */
export const generateRandomId = (length: number = 16): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

/**
 * Validates a JID (WhatsApp ID)
 * @param jid JID to validate
 * @returns Whether the JID is valid
 */
export const isValidJid = (jid: string): boolean => {
    return jid !== null && jid !== undefined && jid.includes('@');
};

/**
 * Gets the server from a JID
 * @param jid JID
 * @returns Server part of the JID
 */
export const getJidServer = (jid: string): string => {
    return jid.split('@')[1];
};

/**
 * Gets the user part from a JID
 * @param jid JID
 * @returns User part of the JID
 */
export const getJidUser = (jid: string): string => {
    return jid.split('@')[0];
};

/**
 * Checks if a JID is a user
 * @param jid JID to check
 * @returns Whether the JID is a user
 */
export const isJidUser = (jid: string): boolean => {
    return jid.endsWith('@s.whatsapp.net');
};

/**
 * Checks if a JID is a group
 * @param jid JID to check
 * @returns Whether the JID is a group
 */
export const isJidGroup = (jid: string): boolean => {
    return jid.endsWith('@g.us');
};

/**
 * Checks if a JID is a broadcast
 * @param jid JID to check
 * @returns Whether the JID is a broadcast
 */
export const isJidBroadcast = (jid: string): boolean => {
    return jid.endsWith('@broadcast');
};

/**
 * Formats a phone number to a JID
 * @param phoneNumber Phone number to format
 * @returns Formatted JID
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
    // Remove any non-numeric characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    return `${cleaned}@s.whatsapp.net`;
};

/**
 * Delays execution for a specified time
 * @param ms Milliseconds to delay
 * @returns Promise that resolves after the delay
 */
export const delay = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Converts a buffer to a base64 string
 * @param buffer Buffer to convert
 * @returns Base64 string
 */
export const bufferToBase64 = (buffer: Buffer): string => {
    return buffer.toString('base64');
};

/**
 * Converts a base64 string to a buffer
 * @param base64 Base64 string to convert
 * @returns Buffer
 */
export const base64ToBuffer = (base64: string): Buffer => {
    return Buffer.from(base64, 'base64');
};
