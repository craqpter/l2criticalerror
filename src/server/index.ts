import { routePartykitRequest, Server } from "partyserver";

import type { OutgoingMessage, Position } from "../shared";
import type { Connection, ConnectionContext } from "partyserver";

// This is the state that we'll store on each connection
type ConnectionState = {
  position: Position;
};

export class Globe extends Server {
  async onConnect(conn: Connection<ConnectionState>, ctx: ConnectionContext) {
    // Whenever a fresh connection is made, we'll
    // send the entire state to the new connection

    // First, let's extract the position from the Cloudflare headers
    const latitude = ctx.request.cf?.latitude as string | undefined;
    const longitude = ctx.request.cf?.longitude as string | undefined;
    const country = ctx.request.cf?.country as string | undefined;
    
    if (!latitude || !longitude) {
      console.warn(`Missing position information for connection ${conn.id}`);
      return;
    }
    
    const position = {
      lat: parseFloat(latitude),
      lng: parseFloat(longitude),
      id: conn.id,
      country: country || 'Unknown',
    };
    
    // And save this on the connection's state
    conn.setState({
      position,
    });

    // Update persistent global stats
    if (country) {
      await this.updateGlobalStats(country);
    }

    // Get current global stats to send to client
    const globalStats = await this.getGlobalStats();

    // Now, let's send the entire state to the new connection
    for (const connection of this.getConnections<ConnectionState>()) {
      try {
        conn.send(
          JSON.stringify({
            type: "add-marker",
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            position: connection.state!.position,
          } satisfies OutgoingMessage),
        );

        // And let's send the new connection's position to all other connections
        if (connection.id !== conn.id) {
          connection.send(
            JSON.stringify({
              type: "add-marker",
              position,
            } satisfies OutgoingMessage),
          );
        }
      } catch {
        this.onCloseOrError(conn);
      }
    }

    // Send global stats to the new connection
    conn.send(
      JSON.stringify({
        type: "global-stats",
        stats: globalStats,
      } satisfies OutgoingMessage),
    );
  }

  private async updateGlobalStats(country: string) {
    const stats = await this.storage.get<Record<string, number>>("globalStats") || {};
    stats[country] = (stats[country] || 0) + 1;
    await this.storage.put("globalStats", stats);
  }

  private async getGlobalStats(): Promise<Record<string, number>> {
    return await this.storage.get<Record<string, number>>("globalStats") || {};
  }

  // Whenever a connection closes (or errors), we'll broadcast a message to all
  // other connections to remove the marker.
  onCloseOrError(connection: Connection) {
    this.broadcast(
      JSON.stringify({
        type: "remove-marker",
        id: connection.id,
      } satisfies OutgoingMessage),
      [connection.id],
    );
  }

  onClose(connection: Connection): void | Promise<void> {
    this.onCloseOrError(connection);
  }

  onError(connection: Connection): void | Promise<void> {
    this.onCloseOrError(connection);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    
    // Handle server info page route
    if (url.pathname === "/server-info") {
      try {
        const serverInfoHtml = await env.ASSETS.get("server-info.html");
        if (serverInfoHtml) {
          return new Response(serverInfoHtml.body, {
            headers: {
              "Content-Type": "text/html;charset=utf-8",
            },
          });
        }
      } catch (error) {
        console.error("Error serving server-info.html:", error);
      }
    }
    
    return (
      (await routePartykitRequest(request, { ...env })) ||
      new Response("Not Found", { status: 404 })
    );
  },
} satisfies ExportedHandler<Env>;
