/**
 * WhatsApp Protocol implementation for Lotus Mantion WhatsApp API
 */

// This is a simplified version. In a real implementation, this would contain
// the protobuf definitions for WhatsApp's protocol

/**
 * Message types
 */
export enum MessageType {
    TEXT = 'text',
    IMAGE = 'image',
    VIDEO = 'video',
    AUDIO = 'audio',
    DOCUMENT = 'document',
    CONTACT = 'contact',
    LOCATION = 'location',
    STICKER = 'sticker',
    TEMPLATE = 'template',
    BUTTON = 'button',
    LIST = 'list',
    REACTION = 'reaction'
}

/**
 * Creates a text message
 * @param text Message text
 * @returns Message object
 */
export const createTextMessage = (text: string) => {
    return {
        conversation: text
    };
};

/**
 * Creates an image message
 * @param image Image data (base64)
 * @param caption Optional caption
 * @returns Message object
 */
export const createImageMessage = (image: string, caption?: string) => {
    return {
        imageMessage: {
            url: '',
            mimetype: 'image/jpeg',
            caption: caption || '',
            jpegThumbnail: '',
            fileLength: 0,
            mediaKey: new Uint8Array(),
            fileEncSha256: new Uint8Array(),
            fileSha256: new Uint8Array(),
            directPath: ''
        }
    };
};

/**
 * Creates a video message
 * @param video Video data (base64)
 * @param caption Optional caption
 * @returns Message object
 */
export const createVideoMessage = (video: string, caption?: string) => {
    return {
        videoMessage: {
            url: '',
            mimetype: 'video/mp4',
            caption: caption || '',
            fileLength: 0,
            seconds: 0,
            mediaKey: new Uint8Array(),
            fileEncSha256: new Uint8Array(),
            fileSha256: new Uint8Array(),
            directPath: ''
        }
    };
};

/**
 * Creates an audio message
 * @param audio Audio data (base64)
 * @param ptt Whether the audio is a voice note
 * @returns Message object
 */
export const createAudioMessage = (audio: string, ptt: boolean = false) => {
    return {
        audioMessage: {
            url: '',
            mimetype: 'audio/ogg; codecs=opus',
            fileLength: 0,
            seconds: 0,
            ptt,
            mediaKey: new Uint8Array(),
            fileEncSha256: new Uint8Array(),
            fileSha256: new Uint8Array(),
            directPath: ''
        }
    };
};

/**
 * Creates a document message
 * @param document Document data (base64)
 * @param mimetype MIME type
 * @param fileName File name
 * @returns Message object
 */
export const createDocumentMessage = (document: string, mimetype: string, fileName: string) => {
    return {
        documentMessage: {
            url: '',
            mimetype,
            title: fileName,
            fileLength: 0,
            fileName,
            mediaKey: new Uint8Array(),
            fileEncSha256: new Uint8Array(),
            fileSha256: new Uint8Array(),
            directPath: ''
        }
    };
};

/**
 * Creates a contact message
 * @param contacts Array of contacts
 * @returns Message object
 */
export const createContactMessage = (contacts: { displayName: string; vcard: string }[]) => {
    return {
        contactsArrayMessage: {
            contacts: contacts.map(contact => ({
                displayName: contact.displayName,
                vcard: contact.vcard
            }))
        }
    };
};

/**
 * Creates a location message
 * @param latitude Latitude
 * @param longitude Longitude
 * @param name Optional location name
 * @param address Optional address
 * @returns Message object
 */
export const createLocationMessage = (
    latitude: number,
    longitude: number,
    name?: string,
    address?: string
) => {
    return {
        locationMessage: {
            degreesLatitude: latitude,
            degreesLongitude: longitude,
            name: name || '',
            address: address || '',
            url: ''
        }
    };
};
