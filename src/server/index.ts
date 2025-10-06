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
    // Default to New York if no geolocation data is available
    const lat = latitude ? parseFloat(latitude) : 40.7128;
    const lng = longitude ? parseFloat(longitude) : -74.0060;
    const countryCode = country || 'US';
    
    const position = {
      lat,
      lng,
      id: conn.id,
      country: countryCode,
    };
    
    console.log(`Position for ${conn.id}:`, position);
    console.log(`Cloudflare geolocation data:`, {
      latitude: ctx.request.cf?.latitude,
      longitude: ctx.request.cf?.longitude,
      country: ctx.request.cf?.country,
      city: ctx.request.cf?.city,
      region: ctx.request.cf?.region
    });
    
    // And save this on the connection's state
    conn.setState({
      position,
    });

    // Update persistent global stats
    if (countryCode && countryCode !== 'Unknown') {
      await this.updateGlobalStats(countryCode);
    }

    // Send the new connection's position to all other connections
    // Note: We'll send existing markers to the new connection in a separate step
    this.broadcastToOthers(conn, {
      type: "add-marker",
      position,
    });

    // Also send the new connection its own marker
    try {
      conn.send(JSON.stringify({
        type: "add-marker",
        position,
      } satisfies OutgoingMessage));
    } catch (error) {
      console.error('Error sending own marker to new connection:', error);
    }
  }

  private broadcastToOthers(excludeConnection: Connection, message: OutgoingMessage) {
    const messageStr = JSON.stringify(message);
    
    for (const connection of this.connections) {
      if (connection.id !== excludeConnection.id) {
        try {
          connection.send(messageStr);
        } catch (error) {
          console.error(`Error sending message to ${connection.id}:`, error);
        }
      }
    }
  }

  private async sendExistingMarkersToNewConnection(newConnection: Connection) {
    // Send existing markers to the new connection
    for (const connection of this.connections) {
      if (connection.id !== newConnection.id && connection.state?.position) {
        try {
          newConnection.send(
            JSON.stringify({
              type: "add-marker",
              position: connection.state.position,
            } satisfies OutgoingMessage),
          );
        } catch (error) {
          console.error(`Error sending existing marker to new connection:`, error);
        }
      }
    }
  }

  private async updateGlobalStats(country: string) {
    try {
      if (!this.storage) {
        console.warn('Storage not available, skipping global stats update');
        return;
      }
      
      const stats = await this.storage.get<Record<string, number>>("globalStats") || {};
      stats[country] = (stats[country] || 0) + 1;
      await this.storage.put("globalStats", stats);
      console.log(`Updated global stats for ${country}:`, stats[country]);
    } catch (error) {
      console.error('Error updating global stats:', error);
    }
  }

  private async getGlobalStats(): Promise<Record<string, number>> {
    try {
      if (!this.storage) {
        console.warn('Storage not available, returning empty global stats');
        return {};
      }
      
      const stats = await this.storage.get<Record<string, number>>("globalStats") || {};
      console.log('Retrieved global stats:', stats);
      return stats;
    } catch (error) {
      console.error('Error getting global stats:', error);
      return {};
    }
  }

  // Whenever a connection closes (or errors), we'll broadcast a message to all
  // other connections to remove the marker.
  onCloseOrError(connection: Connection) {
    this.broadcastToOthers(connection, {
      type: "remove-marker",
      id: connection.id,
    });
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
    
    // Handle CSS file serving
    if (url.pathname === "/styles.css") {
      try {
        // For now, return a minimal CSS that matches the main page
        const cssContent = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

body.statistics-body {
  font-family: 'Crimson Text', serif;
  font-size: 16px;
  line-height: 1.6;
  color: #d4af37;
  background: 
    linear-gradient(135deg, rgba(10, 10, 10, 0.8) 0%, rgba(26, 26, 26, 0.8) 25%, rgba(15, 15, 15, 0.8) 50%, rgba(26, 26, 26, 0.8) 75%, rgba(10, 10, 10, 0.8) 100%);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  text-align: center;
  padding-top: 40px;
  position: relative;
  overflow-x: hidden;
}

body.statistics-body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 48, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.08) 0%, transparent 50%);
  pointer-events: none;
  z-index: -1;
}

body.statistics-body::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  pointer-events: none;
  z-index: -1;
}

.statistics-page {
  background: linear-gradient(135deg, 
    rgba(26, 26, 26, 0.8) 0%, 
    rgba(42, 42, 42, 0.8) 100%);
  border: 2px solid #b8860b;
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 800px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 0 20px rgba(184, 134, 11, 0.2);
  position: relative;
}

.statistics-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, 
    rgba(255, 215, 0, 0.05) 0%, 
    transparent 25%, 
    transparent 75%, 
    rgba(255, 215, 0, 0.05) 100%);
  border-radius: 10px;
  pointer-events: none;
}

.statistics-page h1 {
  color: #ffd700;
  font-family: 'Cinzel', serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  margin-bottom: 1.5rem;
  text-align: center;
  position: relative;
  z-index: 1;
  font-size: 2.5rem;
}

.statistics-section {
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}

.statistics-section:last-child {
  margin-bottom: 0;
}

.statistics-section h2 {
  color: #ffd700;
  font-family: 'Cinzel', serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.3rem;
}

.statistics-table {
  width: 100%;
  background: #2e2e2e;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.statistics-table td {
  padding: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.statistics-table tr:hover td {
  background: rgba(255, 255, 255, 0.05);
}

.statistics-table tr:last-child td {
  border-bottom: none;
}

.player-name {
  color: #ff9900;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

.player-score {
  color: #cccccc;
  font-weight: 500;
  text-align: right;
}

.back-link {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #8b4513 0%, #a0522d 50%, #8b4513 100%);
  color: #ffd700;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid #b8860b;
  font-family: 'Cinzel', serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 1;
  text-align: center;
  min-height: 60px;
  overflow: hidden;
}

.back-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(255, 215, 0, 0.2) 50%, 
    transparent 100%);
  transition: left 0.5s ease;
}

.back-link:hover::before {
  left: 100%;
}

.back-link:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 0 20px rgba(255, 215, 0, 0.3);
  color: #ffff00;
  border-color: #ffd700;
  text-decoration: none;
}

@media (max-width: 480px) {
  .statistics-page {
    padding: 1rem;
    margin: 1rem auto;
  }

  .statistics-section {
    margin-bottom: 1.5rem;
  }

  .statistics-section h2 {
    font-size: 1.1rem;
  }

  .statistics-table td {
    padding: 0.5rem;
    font-size: 0.9rem;
  }

  .back-link {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}
`;
        return new Response(cssContent, {
          headers: {
            "Content-Type": "text/css;charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      } catch (error) {
        console.error("Error serving styles.css:", error);
        return new Response("/* CSS file not found */", {
          headers: {
            "Content-Type": "text/css;charset=utf-8",
          },
        });
      }
    }
    
    // Handle favicon
    if (url.pathname === "/favicon.ico") {
      try {
        // Return a simple favicon response
        return new Response("", {
          headers: {
            "Content-Type": "image/x-icon",
          },
        });
      } catch (error) {
        console.error("Error serving favicon.ico:", error);
      }
    }
    
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
    
    // Handle statistics page route
    if (url.pathname === "/statistics") {
      try {
        const statisticsHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🏆 Server Statistics - Lineage 2 CriticalError C4</title>
    <link rel="stylesheet" href="/styles.css">
    <link rel="icon" href="/favicon.ico">
</head>
<body class="statistics-body">
    <div class="statistics-page">
        <h1>🏆 Server Rankings</h1>
        
        <div class="statistics-section">
            <h2>Top PvP Players</h2>
            <table class="statistics-table">
                <tr><td class="player-name">Neo</td><td class="player-score">1</td></tr>
                <tr><td class="player-name">imh0</td><td class="player-score">1</td></tr>
                <tr><td class="player-name">ParintelePetru</td><td class="player-score">1</td></tr>
                <tr><td class="player-name">SkyWrath</td><td class="player-score">0</td></tr>
                <tr><td class="player-name">MazaFaker</td><td class="player-score">0</td></tr>
                <tr><td class="player-name">CritikalEror</td><td class="player-score">0</td></tr>
                <tr><td class="player-name">indig0</td><td class="player-score">0</td></tr>
                <tr><td class="player-name">SuperGlad</td><td class="player-score">0</td></tr>
                <tr><td class="player-name">Uzinelor</td><td class="player-score">0</td></tr>
                <tr><td class="player-name">Doom</td><td class="player-score">0</td></tr>
            </table>
        </div>
        
        <div class="statistics-section">
            <h2>Top PK Players</h2>
            <table class="statistics-table">
                <tr><td class="player-name">ParintelePetru</td><td class="player-score">4</td></tr>
                <tr><td class="player-name">Neo</td><td class="player-score">3</td></tr>
                <tr><td class="player-name">SkyWrath</td><td class="player-score">1</td></tr>
                <tr><td class="player-name">Doom</td><td class="player-score">1</td></tr>
                <tr><td class="player-name">MazaFaker</td><td class="player-score">0</td></tr>
                <tr><td class="player-name">CritikalEror</td><td class="player-score">0</td></tr>
                <tr><td class="player-name">indig0</td><td class="player-score">0</td></tr>
                <tr><td class="player-name">SuperGlad</td><td class="player-score">0</td></tr>
                <tr><td class="player-name">imh0</td><td class="player-score">0</td></tr>
                <tr><td class="player-name">Uzinelor</td><td class="player-score">0</td></tr>
            </table>
        </div>
        
        <div class="statistics-section">
            <h2>Top Level Players</h2>
            <table class="statistics-table">
                <tr><td class="player-name">Doom</td><td class="player-score">78</td></tr>
                <tr><td class="player-name">Uzinelor</td><td class="player-score">78</td></tr>
                <tr><td class="player-name">SkyWrath</td><td class="player-score">74</td></tr>
                <tr><td class="player-name">NasteaUrsachi</td><td class="player-score">72</td></tr>
                <tr><td class="player-name">Neo</td><td class="player-score">72</td></tr>
                <tr><td class="player-name">StarKebab</td><td class="player-score">69</td></tr>
                <tr><td class="player-name">imh0</td><td class="player-score">66</td></tr>
                <tr><td class="player-name">ParintelePetru</td><td class="player-score">65</td></tr>
                <tr><td class="player-name">indig0</td><td class="player-score">64</td></tr>
                <tr><td class="player-name">Wizard</td><td class="player-score">61</td></tr>
            </table>
        </div>
        
        <a href="/" class="back-link">🔙 Return to Main Page</a>
    </div>
</body>
</html>`;
        
        return new Response(statisticsHTML, {
          headers: {
            "Content-Type": "text/html;charset=utf-8",
          },
        });
      } catch (error) {
        console.error("Error serving statistics page:", error);
        return new Response("Error loading statistics page", { status: 500 });
      }
    }
    
    return (
      (await routePartykitRequest(request, { ...env })) ||
      new Response("Not Found", { status: 404 })
    );
  },
} satisfies ExportedHandler<Env>;
