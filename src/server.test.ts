import { afterEach, describe, expect, it } from '@jest/globals';
import { once } from 'events';
import { AddressInfo } from 'net';
import WebSocket from 'ws';
import { createServers } from './server';

describe('production WebSocket listener', () => {
  let listeners: ReturnType<typeof createServers>;
  let client: WebSocket;

  afterEach(async () => {
    if (client && client.readyState !== WebSocket.CLOSED) {
      const closed = once(client, 'close');
      client.terminate();
      await closed;
    }
    if (listeners) {
      await new Promise<void>((resolve, reject) => listeners.wss.close(err => err ? reject(err) : resolve()));
      if (listeners.wsServer.listening) {
        await new Promise<void>((resolve, reject) => listeners.wsServer.close(err => err ? reject(err) : resolve()));
      }
    }
  });

  it('greets real clients and validates messages on the listener used by startup', async () => {
    listeners = createServers();
    expect(listeners.server.listening).toBe(false);
    expect(listeners.wsServer.listening).toBe(false);
    listeners.wsServer.listen(0, '127.0.0.1');
    await once(listeners.wsServer, 'listening');
    const port = (listeners.wsServer.address() as AddressInfo).port;
    client = new WebSocket(`ws://127.0.0.1:${port}`);
    const greeting = once(client, 'message');
    await once(client, 'open');
    expect((await greeting)[0].toString()).toBe('...connected to Risk Server');

    let response = once(client, 'message');
    client.send('not json');
    expect(JSON.parse((await response)[0].toString())).toEqual({ error: 'Invalid JSON format' });

    response = once(client, 'message');
    client.send(JSON.stringify({ action: 'test' }));
    expect(JSON.parse((await response)[0].toString())).toEqual({ error: 'Invalid message format' });

    // Accepted envelopes are currently a no-op, but must leave the connection usable.
    client.send(JSON.stringify({ action: 'test', data: {} }));
    response = once(client, 'message');
    client.send('{}');
    expect(JSON.parse((await response)[0].toString())).toEqual({ error: 'Invalid message format' });
  });
});
