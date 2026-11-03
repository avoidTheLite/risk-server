import {describe, expect, it} from '@jest/globals';
import WS from 'jest-websocket-mock';
import config from './config';



describe('websocket server test', () => {
    it('ws server should receive a message', async () => {
        const server = new WS(config.get('socketPort'));
        const client = new WebSocket(`ws://localhost:${config.get('socketPort')}`);
        console.log(`server.port = ${config.get('socketPort')}`);
        console.log(`ws_route = ws://localhost:${config.get('socketPort')}`);
        await server.connected;
        client.send('hello');
        await expect(server.messages[0]).toBe("hello");
    });
});