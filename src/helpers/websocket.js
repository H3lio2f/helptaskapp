import Pusher from 'pusher-js';

export const pusherConfig = {
    cluster: 'mt1',
    wsHost: '127.0.0.1',
    wsPort: '6001',
    encrypted:false,
    enabledTransports: ['ws'],
    forceTLS: false
  };

export const pusher = new Pusher('ABCDEFG', pusherConfig);

Pusher.logToConsole = true;