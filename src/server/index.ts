import { routePartykitRequest, Server } from "partyserver";

import type { OutgoingMessage, Position } from "../shared";
import type { Connection, ConnectionContext } from "partyserver";

// This is the state that we'll store on each connection
type ConnectionState = {
  position: Position;
};

export class Globe extends Server {
  async onConnect(conn: Connection<ConnectionState>, ctx: ConnectionContext) {
    console.log(`New connection: ${conn.id}`);
    
    // First, let's extract the position from the Cloudflare headers
    const latitude = ctx.request.cf?.latitude as string | undefined;
    const longitude = ctx.request.cf?.longitude as string | undefined;
    const country = ctx.request.cf?.country as string | undefined;
    
    // Use fallback coordinates if geolocation is not available
    const lat = latitude ? parseFloat(latitude) : 0;
    const lng = longitude ? parseFloat(longitude) : 0;
    const countryCode = country || 'Unknown';
    
    const position = {
      lat,
      lng,
      id: conn.id,
      country: countryCode,
    };
    
    console.log(`Position for ${conn.id}:`, position);
    
    // And save this on the connection's state
    conn.setState({
      position,
    });

    for (const connection of this.connections.values()) {
      try {
        // Send existing markers to the new connection
        if (connection.id !== conn.id) {
          conn.send(
            JSON.stringify({
              type: "add-marker",
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              position: connection.state!.position,
            } satisfies OutgoingMessage),
          );
        }
      } catch (error) {
        console.error(`Error sending to connection ${connection.id}:`, error);
        this.onCloseOrError(connection);
      }
    }

    // Send the new connection's position to all other connections
    for (const connection of this.connections.values()) {
      if (connection.id !== conn.id) {
        try {
          connection.send(
            JSON.stringify({
              type: "add-marker",
              position,
            } satisfies OutgoingMessage),
          );
        } catch (error) {
          console.error(`Error sending new marker to ${connection.id}:`, error);
        }
      }
    }
  }

  // Whenever a connection closes (or errors), we'll broadcast a message to all
  // other connections to remove the marker.
  onCloseOrError(connection: Connection) {
    const message = JSON.stringify({
      type: "remove-marker",
      id: connection.id,
    } satisfies OutgoingMessage);
    
    for (const conn of this.connections.values()) {
      if (conn.id !== connection.id) {
        try {
          conn.send(message);
        } catch (error) {
          console.error(`Error sending remove-marker to ${conn.id}:`, error);
        }
      }
    }
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
        // For now, return a simple response - you can implement proper asset serving later
        return new Response("Server info page - implement asset serving", {
          headers: {
            "Content-Type": "text/html;charset=utf-8",
          },
        });
      } catch (error) {
        console.error("Error serving server-info.html:", error);
      }
    }
    
    // Handle guide page route
    if (url.pathname === "/guide") {
      try {
        // For now, return a simple response - you can implement proper asset serving later
        return new Response("Guide page - implement asset serving", {
          headers: {
            "Content-Type": "text/html;charset=utf-8",
          },
        });
      } catch (error) {
        console.error("Error serving guide.html:", error);
      }
    }
    
    return (
      (await routePartykitRequest(request, { ...env })) ||
      new Response("Not Found", { status: 404 })
    );
  },
} satisfies ExportedHandler<Env>;
