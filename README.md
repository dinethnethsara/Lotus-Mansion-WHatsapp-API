# Lotus Mantion WhatsApp API

A lightweight, full-featured TypeScript/JavaScript WhatsApp Web API library for Node.js.

## Features

- Connect to WhatsApp Web
- Send and receive messages
- Send media (images, videos, documents, etc.)
- Create and manage groups
- Update profile information
- Manage contacts
- Event-based architecture
- TypeScript support

## Installation

```bash
npm install lotus-mantion-whatsapp-api
```

## Quick Start

```javascript
const { makeLotusSocket, useMultiFileAuthState } = require('lotus-mantion-whatsapp-api');

async function startWhatsApp() {
    // Get authentication state
    const { state } = await useMultiFileAuthState('auth_info');
    
    // Create socket
    const socket = makeLotusSocket({
        auth: state,
        printQRInTerminal: true
    });
    
    // Listen for connection updates
    socket.on('connection.update', update => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr) {
            console.log('QR code:', qr);
        }
        
        if (connection === 'open') {
            console.log('Connected to WhatsApp');
        }
        
        if (connection === 'close') {
            console.log('Disconnected from WhatsApp');
        }
    });
    
    // Listen for messages
    socket.on('messages.upsert', async ({ messages, type }) => {
        if (type === 'notify') {
            const message = messages[0];
            
            if (!message.key.fromMe) {
                const jid = message.key.remoteJid;
                const text = message.message?.conversation || '';
                
                console.log(`Received message from ${jid}: ${text}`);
                
                // Reply to the message
                await socket.sendTextMessage(jid, `You said: ${text}`);
            }
        }
    });
    
    // Connect to WhatsApp
    await socket.connect();
}

startWhatsApp().catch(err => console.error(err));
```

## API Documentation

### Connection

```javascript
// Connect to WhatsApp
const { user } = await socket.connect();

// Logout from WhatsApp
await socket.logout();

// End connection
await socket.end();
```

### Sending Messages

```javascript
// Send text message
await socket.sendTextMessage('1234567890@s.whatsapp.net', 'Hello, world!');

// Send image message
await socket.sendImageMessage('1234567890@s.whatsapp.net', imageBuffer, 'Caption');

// Send video message
await socket.sendVideoMessage('1234567890@s.whatsapp.net', videoBuffer, 'Caption');

// Send audio message
await socket.sendAudioMessage('1234567890@s.whatsapp.net', audioBuffer);

// Send document message
await socket.sendDocumentMessage('1234567890@s.whatsapp.net', docBuffer, 'application/pdf', 'document.pdf');

// Send location message
await socket.sendLocationMessage('1234567890@s.whatsapp.net', {
    degreesLatitude: 37.7749,
    degreesLongitude: -122.4194
});
```

### Group Management

```javascript
// Create group
const group = await socket.createGroup('Group Name', ['1234567890@s.whatsapp.net', '0987654321@s.whatsapp.net']);

// Update group subject
await socket.updateGroupSubject(group.id, 'New Group Name');

// Update group description
await socket.updateGroupDescription(group.id, 'Group description');

// Add participants
await socket.updateGroupParticipants(group.id, {
    '1234567890@s.whatsapp.net': 'add'
});

// Remove participants
await socket.updateGroupParticipants(group.id, {
    '1234567890@s.whatsapp.net': 'remove'
});

// Promote participants to admin
await socket.updateGroupParticipants(group.id, {
    '1234567890@s.whatsapp.net': 'promote'
});

// Demote admins to participants
await socket.updateGroupParticipants(group.id, {
    '1234567890@s.whatsapp.net': 'demote'
});

// Leave group
await socket.leaveGroup(group.id);
```

### Profile Management

```javascript
// Update profile picture
await socket.updateProfilePicture('me', imageBuffer);

// Update profile name
await socket.updateProfileName('New Name');

// Update status
await socket.updateStatus('Hello, world!');
```

### Events

```javascript
// Connection updates
socket.on('connection.update', update => {
    const { connection, lastDisconnect, qr } = update;
});

// Credentials updates
socket.on('creds.update', creds => {
    // Save updated credentials
});

// New messages
socket.on('messages.upsert', ({ messages, type }) => {
    // Handle new messages
});

// Message updates (status changes)
socket.on('messages.update', updates => {
    // Handle message updates
});

// Presence updates
socket.on('presence.update', update => {
    const { id, presences } = update;
    // Handle presence updates
});

// Chat updates
socket.on('chats.upsert', chats => {
    // Handle new chats
});

// Chat updates
socket.on('chats.update', updates => {
    // Handle chat updates
});

// Contact updates
socket.on('contacts.upsert', contacts => {
    // Handle new contacts
});

// Contact updates
socket.on('contacts.update', updates => {
    // Handle contact updates
});

// Group updates
socket.on('groups.upsert', groups => {
    // Handle new groups
});

// Group updates
socket.on('groups.update', updates => {
    // Handle group updates
});
```

## License

MIT
