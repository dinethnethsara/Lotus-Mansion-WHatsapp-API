/**
 * Example usage of Lotus Mantion WhatsApp API
 */

// In a real project, you would import from the package
// const { makeLotusSocket, useMultiFileAuthState } = require('lotus-mantion-whatsapp-api');

// For this example, we'll import from our local files
const { makeLotusSocket, useMultiFileAuthState } = require('./lib');

async function startWhatsApp() {
    try {
        console.log('Starting Lotus Mantion WhatsApp API...');
        
        // Get authentication state
        const auth = await useMultiFileAuthState('./auth_info');
        console.log('Authentication state loaded');
        
        // Create socket
        const socket = makeLotusSocket({
            auth,
            printQRInTerminal: true,
            logger: {
                info: console.log,
                error: console.error,
                debug: console.debug,
                warn: console.warn
            }
        });
        console.log('Socket created');
        
        // Listen for connection updates
        socket.on('connection.update', update => {
            const { connection, lastDisconnect, qr } = update;
            
            if (qr) {
                console.log('QR code received. Scan it with your phone to log in.');
            }
            
            if (connection === 'open') {
                console.log('Connected to WhatsApp!');
            }
            
            if (connection === 'close') {
                console.log('Disconnected from WhatsApp');
                if (lastDisconnect?.error) {
                    console.error('Disconnect error:', lastDisconnect.error);
                }
            }
        });
        
        // Listen for credential updates
        socket.on('creds.update', creds => {
            console.log('Credentials updated');
        });
        
        // Listen for messages
        socket.on('messages.upsert', async ({ messages, type }) => {
            if (type === 'notify') {
                for (const message of messages) {
                    if (!message.key.fromMe) {
                        const jid = message.key.remoteJid;
                        const text = message.message?.conversation || '';
                        
                        console.log(`Received message from ${jid}: ${text}`);
                        
                        // Reply to the message
                        if (text) {
                            await socket.sendTextMessage(jid, `You said: ${text}`);
                        }
                    }
                }
            }
        });
        
        // Listen for message status updates
        socket.on('messages.update', updates => {
            for (const update of updates) {
                console.log(`Message ${update.key.id} status updated to ${update.status}`);
            }
        });
        
        // Connect to WhatsApp
        console.log('Connecting to WhatsApp...');
        const { user } = await socket.connect();
        console.log(`Connected as ${user.name} (${user.id})`);
        
        // Example: Send a message after 15 seconds
        setTimeout(async () => {
            try {
                // Replace with a valid JID (phone number@s.whatsapp.net)
                const jid = '1234567890@s.whatsapp.net';
                
                console.log(`Sending message to ${jid}...`);
                await socket.sendTextMessage(jid, 'Hello from Lotus Mantion WhatsApp API!');
                console.log('Message sent');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }, 15000);
        
    } catch (error) {
        console.error('Error starting WhatsApp:', error);
    }
}

// Start the example
startWhatsApp();
