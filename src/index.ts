/**
 * Lotus Mantion WhatsApp API
 * A WhatsApp Web API library for Node.js
 */

import { makeLotusSocket } from './LotusSocket';
import { AuthenticationState } from './Types';
import { useMultiFileAuthState } from './Auth';

export { 
    makeLotusSocket,
    useMultiFileAuthState,
    AuthenticationState
};

// Export types
export * from './Types';
