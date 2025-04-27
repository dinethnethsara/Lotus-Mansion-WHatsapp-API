<div align="center">
  
# 🌸 Lotus Mantion WhatsApp API

[![NPM Version](https://img.shields.io/npm/v/lotus-mantion-whatsapp-api.svg?style=flat-square)](https://www.npmjs.com/package/lotus-mantion-whatsapp-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Contributors](https://img.shields.io/badge/Contributors-Hexxa%20|%20Nirnamika%20|%20Snetino-orange?style=flat-square)](https://github.com/yourusername/lotus-mantion-whatsapp-api/graphs/contributors)

<p align="center">
  <i>A lightweight, full-featured TypeScript/JavaScript WhatsApp Web API library for Node.js</i>
</p>

<p align="center">
  <img src="https://i.imgur.com/YYYYYyy.png" alt="Lotus Mantion Logo" width="200"/>
</p>

</div>

## ✨ Features

<div align="center">

| Feature | Description |
|---------|-------------|
| 📱 **WhatsApp Web Connection** | Seamless connection to WhatsApp Web |
| 💬 **Messaging** | Send and receive messages with ease |
| 🖼️ **Media Support** | Handle images, videos, documents, and more |
| 👥 **Group Management** | Complete group creation and management |
| 👤 **Profile Control** | Update profile information effortlessly |
| 📞 **Contact Management** | Efficient contact organization |
| 🎯 **Event Architecture** | Robust event-based system |
| 📝 **TypeScript** | Full TypeScript support |

</div>

## 🚀 Installation

```bash
npm install lotus-mantion-whatsapp-api
```

## 🌟 Quick Start

Create a new WhatsApp client in just a few lines of code:

```javascript
const { makeLotusSocket, useMultiFileAuthState } = require('lotus-mantion-whatsapp-api');

async function startWhatsApp() {
    const { state } = await useMultiFileAuthState('auth_info');
    
    const socket = makeLotusSocket({
        auth: state,
        printQRInTerminal: true
    });

    socket.on('connection.update', update => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr) console.log('QR code:', qr);
        if (connection === 'open') console.log('Connected to WhatsApp');
        if (connection === 'close') console.log('Disconnected from WhatsApp');
    });

    socket.on('messages.upsert', async ({ messages, type }) => {
        if (type === 'notify') {
            const message = messages[0];
            
            if (!message.key.fromMe) {
                const jid = message.key.remoteJid;
                const text = message.message?.conversation || '';
                
                console.log(`Received message from ${jid}: ${text}`);
                await socket.sendTextMessage(jid, `You said: ${text}`);
            }
        }
    });

    await socket.connect();
}

startWhatsApp().catch(err => console.error(err));
```

## 📚 API Documentation

### 🔌 Connection Management

```javascript
// Connect to WhatsApp
const { user } = await socket.connect();

// Logout from WhatsApp
await socket.logout();

// End connection
await socket.end();
```

### 💬 Message Operations

```javascript
// Text message
await socket.sendTextMessage('1234567890@s.whatsapp.net', 'Hello, world!');

// Image message
await socket.sendImageMessage('1234567890@s.whatsapp.net', imageBuffer, 'Caption');

// Video message
await socket.sendVideoMessage('1234567890@s.whatsapp.net', videoBuffer, 'Caption');

// Audio message
await socket.sendAudioMessage('1234567890@s.whatsapp.net', audioBuffer);

// Document message
await socket.sendDocumentMessage(
    '1234567890@s.whatsapp.net',
    docBuffer,
    'application/pdf',
    'document.pdf'
);

// Location message
await socket.sendLocationMessage('1234567890@s.whatsapp.net', {
    degreesLatitude: 37.7749,
    degreesLongitude: -122.4194
});
```

### 👥 Group Features

```javascript
// Create group
const group = await socket.createGroup(
    'Group Name',
    ['1234567890@s.whatsapp.net', '0987654321@s.whatsapp.net']
);

// Group management
await socket.updateGroupSubject(group.id, 'New Group Name');
await socket.updateGroupDescription(group.id, 'Group description');

// Participant management
await socket.updateGroupParticipants(group.id, {
    '1234567890@s.whatsapp.net': 'add'    // Add member
    '0987654321@s.whatsapp.net': 'remove' // Remove member
    '1122334455@s.whatsapp.net': 'promote' // Make admin
    '5544332211@s.whatsapp.net': 'demote'  // Remove admin
});

// Leave group
await socket.leaveGroup(group.id);
```

### 👤 Profile Management

```javascript
// Update profile picture
await socket.updateProfilePicture('me', imageBuffer);

// Update profile name
await socket.updateProfileName('New Name');

// Update status
await socket.updateStatus('Hello, world!');
```

### 🎯 Event Handling

<details>
<summary>Click to expand event examples</summary>

```javascript
// Connection events
socket.on('connection.update', update => {
    const { connection, lastDisconnect, qr } = update;
});

// Credential events
socket.on('creds.update', creds => {
    // Handle credential updates
});

// Message events
socket.on('messages.upsert', ({ messages, type }) => {
    // Handle new messages
});

// Presence events
socket.on('presence.update', update => {
    const { id, presences } = update;
});

// Chat events
socket.on('chats.upsert', chats => {
    // Handle new chats
});

// Contact events
socket.on('contacts.update', updates => {
    // Handle contact updates
});

// Group events
socket.on('groups.update', updates => {
    // Handle group updates
});
```
</details>

## 💖 Contributors

<div align="center">

| <img src="https://github.com/hexxa.png" width="50px" height="50px"/> | <img src="https://github.com/nirnamika.png" width="50px" height="50px"/> | <img src="https://github.com/snetino.png" width="50px" height="50px"/> |
|:---:|:---:|:---:|
| **Hexxa** | **Nirnamika** | **Snetino** |

</div>

## 📄 License

<div align="center">

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<p align="center">Made with ❤️ by the Lotus Mantion Team</p>

</div>
