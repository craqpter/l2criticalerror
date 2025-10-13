import "./styles.css";

import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import createGlobe from "cobe";
import usePartySocket from "partysocket/react";

// Message type from your server
import type { OutgoingMessage } from "../shared";
import type { LegacyRef } from "react";

// Language support
import { LanguageProvider, useLanguage } from "../LanguageContext";
import LanguageSelector from "../LanguageSelector";

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

// Static country data with coordinates
const countryData = [
  { name: 'Moldova', code: 'MD', lat: 47.4116, lng: 28.3699 },
  { name: 'Singapore', code: 'SG', lat: 1.3521, lng: 103.8198 },
  { name: 'Ukraine', code: 'UA', lat: 48.3794, lng: 31.1656 },
  { name: 'Netherlands', code: 'NL', lat: 52.1326, lng: 5.2913 },
  { name: 'United States', code: 'US', lat: 39.8283, lng: -98.5795 },
  { name: 'Germany', code: 'DE', lat: 51.1657, lng: 10.4515 },
  { name: 'Chile', code: 'CL', lat: -35.6751, lng: -71.5430 },
  { name: 'Australia', code: 'AU', lat: -25.2744, lng: 133.7751 },
  { name: 'Israel', code: 'IL', lat: 31.0461, lng: 34.8516 },
  { name: 'Saudi Arabia', code: 'SA', lat: 23.8859, lng: 45.0792 }
];

// Global stats are now handled by the server via Durable Object storage

function GlobeSection() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);

  // Static markers for all countries
  const staticMarkers = countryData.map(country => ({
    location: [country.lat, country.lng] as [number, number],
    size: 0.08,
    country: country.code,
    name: country.name
  }));

  useEffect(() => {
    let phi = 0;

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
        state.markers = staticMarkers;
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  // Handle country click to focus globe
  const handleCountryClick = (countryCode: string) => {
    console.log(`Focusing on ${countryCode}`);
  };

  return (
    <section className="globe-container">
      <div className="globe-section">
        <h2>{t.whereEveryoneAt}</h2>

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
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function App() {
  const { t } = useLanguage();
  const [serverStatus] = useState({
    online: true,
    players: 247,
    maxPlayers: 1000
  });

  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [discordMembers, setDiscordMembers] = useState(0);
  const [showPatchOverlay, setShowPatchOverlay] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [serverOpened, setServerOpened] = useState(false);
  const [serverUptime, setServerUptime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Background music functionality
  useEffect(() => {
    audioRef.current = new Audio('/music/background.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.9;
  }, []);

  // Discord member count simulation
  useEffect(() => {
    // Simulate Discord member count updates
    const updateDiscordMembers = () => {
      // Simulate realistic Discord member count (between 15-45 members)
      const baseCount = 25;
      const variation = Math.floor(Math.random() * 20) - 10;
      setDiscordMembers(Math.max(5, baseCount + variation));
    };

    // Initial count
    updateDiscordMembers();

    // Update every 30 seconds
    const interval = setInterval(updateDiscordMembers, 30000);

    return () => clearInterval(interval);
  }, []);

  // Countdown timer functionality
  useEffect(() => {
    const calculateTimeLeft = () => {
      // HARDCODED SERVER OPENING DATE: Tomorrow at 20:00 Chisinau time (UTC+2)
      // This date is fixed and will not change regardless of browser time
      const serverOpeningDate = new Date('2025-09-24T17:00:00.000Z'); // 20:00 Chisinau = 18:00 UTC
      
      const now = new Date();
      
      const difference = serverOpeningDate.getTime() - now.getTime();
      
      if (difference > 0) {
        // Countdown to server opening
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
        setServerOpened(false);
      } else {
        // Server is open - show uptime
        setServerOpened(true);
        
        // Calculate server uptime (time since opening)
        const uptimeDifference = now.getTime() - serverOpeningDate.getTime();
        const uptimeDays = Math.floor(uptimeDifference / (1000 * 60 * 60 * 24));
        const uptimeHours = Math.floor((uptimeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const uptimeMinutes = Math.floor((uptimeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const uptimeSeconds = Math.floor((uptimeDifference % (1000 * 60)) / 1000);
        
        setServerUptime({ days: uptimeDays, hours: uptimeHours, minutes: uptimeMinutes, seconds: uptimeSeconds });
      }
    };

    // Initial calculation
    calculateTimeLeft();

    // Update every second
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
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

  const handlePatchDownload = () => {
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = '/patches/system.7z';
    link.download = 'system.7z';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show overlay with instructions
    setShowPatchOverlay(true);
  };

  const closePatchOverlay = () => {
    setShowPatchOverlay(false);
  };

  return (
    <div className="App">
      {/* Language Selector */}
      <LanguageSelector />

      {/* Server Status Indicator */}
      <div className="server-status">
        <div className={`status-badge ${serverStatus.online ? 'online' : 'offline'}`}>
          <span className="status-dot"></span>
          {serverStatus.online ? t.online : t.offline}
        </div>
      </div>

      {/* Music Control */}
      <div className="music-control">
        <button className="music-toggle" onClick={toggleMusic}>
          {musicPlaying ? t.stopMusic : t.backgroundMusic}
        </button>
      </div>

      <header>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </header>

      {/* Countdown Timer Section */}
      <section className="countdown-section">
        <h2>{t.serverOpening}</h2>
        {!serverOpened ? (
          <div className="countdown-timer">
            <div className="countdown-item">
              <span className="countdown-number">{timeLeft.days}</span>
              <span className="countdown-label">{t.days}</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{timeLeft.hours}</span>
              <span className="countdown-label">{t.hours}</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{timeLeft.minutes}</span>
              <span className="countdown-label">{t.minutes}</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{timeLeft.seconds}</span>
              <span className="countdown-label">{t.seconds}</span>
            </div>
          </div>
        ) : (
          <div className="server-uptime">
            <h3>{t.serverWorks}</h3>
            <div className="uptime-timer">
              <div className="uptime-item">
                <span className="uptime-number">{serverUptime.days}</span>
                <span className="uptime-label">{t.days}</span>
              </div>
              <div className="uptime-item">
                <span className="uptime-number">{serverUptime.hours}</span>
                <span className="uptime-label">{t.hours}</span>
              </div>
              <div className="uptime-item">
                <span className="uptime-number">{serverUptime.minutes}</span>
                <span className="uptime-label">{t.minutes}</span>
              </div>
              <div className="uptime-item">
                <span className="uptime-number">{serverUptime.seconds}</span>
                <span className="uptime-label">{t.seconds}</span>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="rates">
        <h2>{t.serverRates}</h2>
        <p>
          {t.xpSp}
          <br />
          {t.adena}
          <br />
          {t.dropsSpoil}
          <br />
          {t.questRewards}
          <br />
          {t.petXp}
        </p>
        <p>{t.features}</p>
        <p><strong>{t.noblesseSubclasses}</strong></p>
      </section>

      {/* 🔥 Globe inserted here */}
      <GlobeSection />

      {/* Latest Patch Release Button */}
      <section className="patch-section">
        <button className="patch-download-btn" onClick={handlePatchDownload}>
          {t.latestPatchRelease}
        </button>
      </section>

      <section className="links">
        <h2>{t.quickLinks}</h2>
        <div className="links-grid">
          <a href="/guide" className="guide-link">
            {t.guide}
          </a>
          <a href="/server-info" className="server-info-link">
            {t.serverDescription}
          </a>
          <a href="/statistics" className="statistics-link">
            {t.statistics}
          </a>
          <a href="https://drive.google.com/file/d/11v4G7CWplFG3PJ2RHisoJKMprvZQRsb3/view?usp=sharing" target="_blank">
            {t.downloadClient}
          </a>
          <a href="https://t.me/l2CriticalError" target="_blank">
            {t.telegramChannel}
          </a>
          <a href="https://t.me/lineage2c4bot" target="_blank">
            {t.telegramRegistrationBot}
          </a>
          <a href="https://discord.com/oauth2/authorize?client_id=1415942904668749856" target="_blank" rel="noopener noreferrer">
            {t.discordRegistrationBot}
          </a>
        </div>
      </section>

      {/* Discord and Telegram Widgets */}
      <section className="social-widgets">
        <h2>{t.joinOurCommunity}</h2>
        <div className="widgets-container">
          {/* Discord Widget */}
          <div className="discord-widget">
            <h3>{t.discordServer}</h3>
            <div className="discord-info">
              <div className="discord-icon">🎮</div>
              <div className="discord-details">
                <h4>L2CriticalError</h4>
                <p className="discord-status">
                  <span className="status-indicator online"></span>
                  <span>{discordMembers}</span> {t.membersOnline}
                </p>
              </div>
            </div>
            <a href="https://discord.gg/Gdn4QNz2VK" target="_blank" className="discord-join-btn">
              {t.joinDiscordServer}
            </a>
          </div>

          {/* Telegram Widget */}
          <div className="telegram-widget">
            <h3>{t.telegramChannel}</h3>
            <div className="telegram-info">
              <div className="telegram-icon">📢</div>
              <div className="telegram-details">
                <h4>@l2CriticalError</h4>
                <p className="telegram-subscribers">
                  <span className="subscriber-count">2</span> {t.subscribers}
                </p>
              </div>
            </div>
            <a href="https://t.me/l2CriticalError" target="_blank" className="telegram-join-btn">
              {t.joinTelegramChannel}
            </a>
          </div>
        </div>
      </section>

      {/* Server Button Section */}
      <section className="server-button-section">
        <h2>{t.shareOurServer}</h2>
        <div className="server-button-container">
          <a href="https://l2-servera.com" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://l2-servera.com/wp-content/themes/servers/assets/images/button/black.gif" 
              alt="Black theme" 
              title="Black theme"
              className="server-button"
            />
          </a>
          <a href="http://l2top.ru/vote/31866/" target="_blank" rel="noopener noreferrer">
            <img 
              src="http://l2top.ru/vb/31866.pgif"
              width="88px" 
              height="31px" 
              border="0" 
              alt="L2top.ru: Рейтинг-каталог серверов Lineage2"
              className="server-button"
            />
          </a>
        </div>
      </section>

      <footer>
        <p>
          {t.inspiredBy}
        </p>
        <p>{t.copyright}</p>
      </footer>

      {/* Patch Download Overlay */}
      {showPatchOverlay && (
        <div className="patch-overlay">
          <div className="patch-overlay-content">
            <div className="patch-overlay-header">
              <h3>{t.patchDownloadInstructions}</h3>
              <button className="close-overlay-btn" onClick={closePatchOverlay}>
                ✕
              </button>
            </div>
            <div className="patch-instructions">
              <div className="instruction-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>{t.downloadComplete}</h4>
                  <p>{t.downloadCompleteDesc}</p>
                </div>
              </div>
              <div className="instruction-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>{t.extractArchive}</h4>
                  <p>{t.extractArchiveDesc}</p>
                </div>
              </div>
              <div className="instruction-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>{t.installPatch}</h4>
                  <p>{t.installPatchDesc}</p>
                </div>
              </div>
              <div className="instruction-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>{t.restartClient}</h4>
                  <p>{t.restartClientDesc}</p>
                </div>
              </div>
            </div>
            <div className="patch-overlay-footer">
              <button className="got-it-btn" onClick={closePatchOverlay}>
                {t.gotIt}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
