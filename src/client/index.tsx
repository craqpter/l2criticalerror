import "./styles.css";

import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import createGlobe from "cobe";
import usePartySocket from "partysocket/react";

// Message type from your server
import type { OutgoingMessage } from "../shared";
import type { LegacyRef } from "react";

// Country data with flags
const countryFlags: Record<string, string> = {
  'US': '🇺🇸', 'CA': '🇨🇦', 'MX': '🇲🇽', 'BR': '🇧🇷', 'AR': '🇦🇷', 'CL': '🇨🇱', 'CO': '🇨🇴', 'PE': '🇵🇪',
  'GB': '🇬🇧', 'DE': '🇩🇪', 'FR': '🇫🇷', 'IT': '🇮🇹', 'ES': '🇪🇸', 'NL': '🇳🇱', 'BE': '🇧🇪', 'CH': '🇨🇭',
  'RU': '🇷🇺', 'PL': '🇵🇱', 'CZ': '🇨🇿', 'HU': '🇭🇺', 'RO': '🇷🇴', 'BG': '🇧🇬', 'HR': '🇭🇷', 'SI': '🇸🇮',
  'CN': '🇨🇳', 'JP': '🇯🇵', 'KR': '🇰🇷', 'IN': '🇮🇳', 'TH': '🇹🇭', 'VN': '🇻🇳', 'MY': '🇲🇾', 'SG': '🇸🇬',
  'AU': '🇦🇺', 'NZ': '🇳🇿', 'ZA': '🇿🇦', 'EG': '🇪🇬', 'NG': '🇳🇬', 'KE': '🇰🇪', 'MA': '🇲🇦', 'TN': '🇹🇳',
  'TR': '🇹🇷', 'IL': '🇮🇱', 'AE': '🇦🇪', 'SA': '🇸🇦', 'QA': '🇶🇦', 'KW': '🇰🇼', 'BH': '🇧🇭', 'OM': '🇴🇲'
};

const countryNames: Record<string, string> = {
  'US': 'United States', 'CA': 'Canada', 'MX': 'Mexico', 'BR': 'Brazil', 'AR': 'Argentina', 'CL': 'Chile', 'CO': 'Colombia', 'PE': 'Peru',
  'GB': 'United Kingdom', 'DE': 'Germany', 'FR': 'France', 'IT': 'Italy', 'ES': 'Spain', 'NL': 'Netherlands', 'BE': 'Belgium', 'CH': 'Switzerland',
  'RU': 'Russia', 'PL': 'Poland', 'CZ': 'Czech Republic', 'HU': 'Hungary', 'RO': 'Romania', 'BG': 'Bulgaria', 'HR': 'Croatia', 'SI': 'Slovenia',
  'CN': 'China', 'JP': 'Japan', 'KR': 'South Korea', 'IN': 'India', 'TH': 'Thailand', 'VN': 'Vietnam', 'MY': 'Malaysia', 'SG': 'Singapore',
  'AU': 'Australia', 'NZ': 'New Zealand', 'ZA': 'South Africa', 'EG': 'Egypt', 'NG': 'Nigeria', 'KE': 'Kenya', 'MA': 'Morocco', 'TN': 'Tunisia',
  'TR': 'Turkey', 'IL': 'Israel', 'AE': 'United Arab Emirates', 'SA': 'Saudi Arabia', 'QA': 'Qatar', 'KW': 'Kuwait', 'BH': 'Bahrain', 'OM': 'Oman'
};

// Global stats are now handled by the server via Durable Object storage

function GlobeSection() {
  const canvasRef = useRef<HTMLCanvasElement>();
  const [counter, setCounter] = useState(4);
  const [countryStats, setCountryStats] = useState<Map<string, number>>(new Map([
    ['US', 2],
    ['DE', 1],
    ['FR', 1],
  ]));
  const [globalStats, setGlobalStats] = useState<Record<string, number>>({
    'US': 15,
    'DE': 8,
    'FR': 6,
    'BR': 4,
    'JP': 3,
  });
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);

  const positions = useRef<
    Map<
      string,
      {
        location: [number, number];
        size: number;
        country?: string;
      }
    >
  >(new Map());

  const socket = usePartySocket({
    room: "default",
    party: "globe",
    onMessage(evt: any) {
      try {
        const message = JSON.parse(evt.data as string) as OutgoingMessage;
        console.log('Received message:', message); // Debug log
        
        if (message.type === "add-marker") {
          positions.current.set(message.position.id, {
            location: [message.position.lat, message.position.lng],
            size: message.position.id === socket.id ? 0.1 : 0.05,
            country: message.position.country,
          });
          
          // Update country statistics
          if (message.position.country) {
            setCountryStats((prev: any) => {
              const newStats = new Map(prev);
              const current = newStats.get(message.position.country) || 0;
              newStats.set(message.position.country, current + 1);
              return newStats;
            });
          }
          
          setCounter((c: any) => c + 1);
        } else if (message.type === "remove-marker") {
          const position = positions.current.get(message.id);
          if (position?.country) {
            setCountryStats((prev: any) => {
              const newStats = new Map(prev);
              const current = newStats.get(position.country) || 0;
              if (current > 1) {
                newStats.set(position.country, current - 1);
              } else {
                newStats.delete(position.country);
              }
              return newStats;
            });
          }
          positions.current.delete(message.id);
          setCounter((c: any) => Math.max(0, c - 1));
        } else if (message.type === "global-stats") {
          console.log('Received global stats:', message.stats); // Debug log
          setGlobalStats(message.stats);
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    },
    onOpen: () => {
      console.log('Socket connected');
    },
    onClose: () => {
      console.log('Socket disconnected');
    },
    onError: (error) => {
      console.error('Socket error:', error);
    },
  });

  useEffect(() => {
    let phi = 0;

    // Add a test marker for debugging
    positions.current.set('test', {
      location: [40.7128, -74.0060], // New York
      size: 0.1,
      country: 'US',
    });

    const globe = createGlobe(canvasRef.current as HTMLCanvasElement, {
      devicePixelRatio: 2,
      width: 400 * 2,
      height: 400 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 0.8,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.8, 0.1, 0.1],
      glowColor: [0.2, 0.2, 0.2],
      markers: [],
      opacity: 0.7,
      onRender: (state) => {
        state.markers = [...positions.current.values()];
        state.phi = phi;
        phi += 0.01;
      },
      onMouseMove: (coords) => {
        // Find the closest marker to the mouse position
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = coords.x * rect.width;
        const y = coords.y * rect.height;
        
        let closestMarker = null;
        let closestDistance = Infinity;
        
        for (const [id, marker] of positions.current) {
          if (!marker.country) continue;
          
          // Convert lat/lng to screen coordinates (simplified)
          const markerX = (marker.location[1] + 180) / 360 * rect.width;
          const markerY = (90 - marker.location[0]) / 180 * rect.height;
          
          const distance = Math.sqrt((x - markerX) ** 2 + (y - markerY) ** 2);
          if (distance < 30 && distance < closestDistance) {
            closestDistance = distance;
            closestMarker = marker;
          }
        }
        
        if (closestMarker && closestMarker.country) {
          setHoveredCountry(closestMarker.country);
          setTooltipPosition({ x: x + rect.left, y: y + rect.top });
        } else {
          setHoveredCountry(null);
          setTooltipPosition(null);
        }
      },
      onMouseLeave: () => {
        setHoveredCountry(null);
        setTooltipPosition(null);
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  // Sort countries by visitor count (current session)
  const sortedCountries = Array.from(countryStats.entries())
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);

  // Sort countries by all-time visitor count (from server)
  const sortedAllTime = Object.entries(globalStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);

  // Debug logging
  console.log('Current country stats:', countryStats);
  console.log('Global stats:', globalStats);
  console.log('Counter:', counter);
  console.log('Positions:', positions.current);

  // Handle country click to focus globe
  const handleCountryClick = (countryCode: string) => {
    // This would require more complex globe manipulation
    // For now, we'll just highlight it in the UI
    console.log(`Focusing on ${countryCode}`);
  };

  return (
    <section className="globe-container">
      <div className="globe-section">
        <h2>🌍 Where's everyone at?</h2>
        {counter > 0 ? (
          <p>
            <b>{counter}</b> {counter === 1 ? "person" : "people"} connected
          </p>
        ) : (
          <p>&nbsp;</p>
        )}

        <div className="globe-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
          <canvas
            ref={canvasRef as LegacyRef<HTMLCanvasElement>}
            style={{ width: 400, height: 400, maxWidth: "100%", aspectRatio: 1 }}
          />
          
          {/* Tooltip */}
          {hoveredCountry && tooltipPosition && (
            <div
              className="country-tooltip"
              style={{
                position: 'fixed',
                left: tooltipPosition.x + 10,
                top: tooltipPosition.y - 10,
                zIndex: 1000,
                background: 'rgba(0, 0, 0, 0.9)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
                pointerEvents: 'none',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>{countryFlags[hoveredCountry] || '🌍'}</span>
                <span>{countryNames[hoveredCountry] || hoveredCountry}</span>
                <span style={{ color: '#ff6b6b', fontWeight: 'bold' }}>
                  {countryStats.get(hoveredCountry) || 0} online
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="stats-panel">
        <h3>📊 Global Statistics</h3>
        
        {/* Current Session */}
        <div className="stats-section">
          <h4>🟢 Current Session</h4>
          <div className="country-stats">
            {sortedCountries.length > 0 ? (
              <>
                {sortedCountries.map(([countryCode, count], index) => (
                  <div 
                    key={countryCode} 
                    className="country-stat clickable"
                    onClick={() => handleCountryClick(countryCode)}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="country-flag">{countryFlags[countryCode] || '🌍'}</span>
                    <span className="country-name">{countryNames[countryCode] || countryCode}</span>
                    <span className={`country-count ${index < 3 ? `top-${index + 1}` : ''}`}>
                      {count}
                    </span>
                  </div>
                ))}
                {countryStats.size > 10 && (
                  <div className="more-countries-indicator">
                    <span>+{countryStats.size - 10} more countries</span>
                  </div>
                )}
              </>
            ) : (
              <p className="no-stats">No visitors yet</p>
            )}
          </div>
        </div>

        {/* All-Time Statistics */}
        <div className="stats-section">
          <h4>⭐ All-Time Visitors</h4>
          <div className="country-stats">
            {sortedAllTime.length > 0 ? (
              <>
                {sortedAllTime.map(([countryCode, count], index) => (
                  <div 
                    key={countryCode} 
                    className="country-stat all-time clickable"
                    onClick={() => handleCountryClick(countryCode)}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="country-flag">{countryFlags[countryCode] || '🌍'}</span>
                    <span className="country-name">{countryNames[countryCode] || countryCode}</span>
                    <span className={`country-count all-time ${index < 3 ? `top-${index + 1}` : ''}`}>
                      {count}
                    </span>
                  </div>
                ))}
                {Object.keys(globalStats).length > 10 && (
                  <div className="more-countries-indicator">
                    <span>+{Object.keys(globalStats).length - 10} more countries</span>
                  </div>
                )}
              </>
            ) : (
              <p className="no-stats">
                {Object.keys(globalStats).length === 0 ? 'Loading global stats...' : 'No historical data'}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [serverStatus] = useState({
    online: true,
    players: 247,
    maxPlayers: 1000
  });

  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Background music functionality
  useEffect(() => {
    audioRef.current = new Audio('/music/background.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.9;
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause();
        setMusicPlaying(false);
      } else {
        audioRef.current.play().catch(() => {
          console.log('Audio autoplay blocked');
        });
        setMusicPlaying(true);
      }
    }
  };

  return (
    <div className="App">
      {/* Server Status Indicator */}
      <div className="server-status">
        <div className={`status-badge ${serverStatus.online ? 'online' : 'offline'}`}>
          <span className="status-dot"></span>
          {serverStatus.online ? '🟢 Online' : '🔴 Offline'}
        </div>
      </div>

      {/* Music Control */}
      <div className="music-control">
        <button className="music-toggle" onClick={toggleMusic}>
          {musicPlaying ? '🔇 Stop Music' : '🎵 Background Music'}
        </button>
      </div>

      <header>
        <h1>✨ Lineage 2 CriticalError C4 ✨</h1>
        <p>Old-School C4 Private Server - Test Period</p>
      </header>

      <section className="rates">
        <h2>📊 Server Rates</h2>
        <p>
          XP/SP: x10
          <br />
          Adena: x5
          <br />
          Drops/Spoil: x5
          <br />
          Quest Rewards: x2
          <br />
          Pet XP: x15
        </p>
        <p>Features: NpcBuffer • MasterClass • Craft XP</p>
        <a href="/server-info" className="server-info-link">
          📖 Read Full Server Description
        </a>
      </section>

      {/* 🔥 Globe inserted here */}
      <GlobeSection />

      <section className="links">
        <h2>🔗 Quick Links</h2>
        <a href="https://t.me/l2CriticalError" target="_blank">
          📢 Telegram Channel
        </a>
        <a href="https://t.me/lineage2c4bot" target="_blank">
          🤖 Registration Bot
        </a>
        <a href="https://instagram.com/l2criticalerror" target="_blank">
          📸 Instagram
        </a>
        <a href="https://drive.google.com/file/d/14LLNAB8eAZ3B7WUywC3U4159OkV9WpzZ/view?usp=sharing" target="_blank">
          📥 Download Client
        </a>
      </section>

      <footer>
        <p>
          Inspired by legendary Lineage 2 servers — Arax, Starnet, Moscow,
          L2Firebird, L2Reworld
        </p>
        <p>&copy; 2025 Lineage 2 CriticalError</p>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
