# ✨ Lineage 2 CriticalError C4 ✨

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/yourusername/l2criticalerror)

A beautiful, real-time website for the **Lineage 2 CriticalError C4** private server featuring global player tracking, authentic L2 styling, and immersive user experience.

## 🌟 Features

### 🗺️ **Real-Time Global Player Tracking**
- **Live Globe Visualization**: See players from around the world in real-time using an interactive 3D globe
- **Country Statistics**: Track current session and all-time visitor counts by country
- **Persistent Data**: Global statistics stored using Cloudflare Durable Objects
- **Interactive Tooltips**: Hover over markers to see country details and player counts

### 🎮 **Lineage 2 Themed Design**
- **Authentic L2 Aesthetics**: Medieval fonts (Cinzel), gold/bronze color scheme, and fantasy UI elements
- **Animated Effects**: Gold shimmer animations, glowing borders, and smooth transitions
- **Responsive Design**: Optimized for desktop and mobile devices
- **Background Music**: Immersive audio experience with toggle controls

### 📊 **Server Information**
- **Detailed Server Stats**: Complete information about rates, features, and gameplay systems
- **Champion System**: Rare mobs with boosted drops
- **NPC Buffer & Shop**: Multiple buff schemes for convenience
- **Seven Signs & Sieges**: Classic castle wars and dungeon access

## 🚀 Technology Stack

- **Frontend**: React 18 + TypeScript
- **Real-time**: PartyKit + WebSockets
- **Backend**: Cloudflare Workers + Durable Objects
- **Styling**: Custom CSS with L2-themed design
- **3D Globe**: Cobe.js for interactive globe visualization
- **Deployment**: Cloudflare Pages

## 🛠️ How It Works

### Real-Time Player Tracking
1. **Connection**: When a player visits the website, a WebSocket connection is established
2. **Geolocation**: Player's location is determined using Cloudflare's geolocation data
3. **Visualization**: Player appears as a marker on the 3D globe
4. **Statistics**: Country counts are updated in real-time and stored persistently
5. **Broadcasting**: All connected players see live updates

### Persistent Global Statistics
- **Durable Object Storage**: Global visitor counts stored server-side
- **Real-time Updates**: Statistics update instantly for all users
- **Historical Data**: All-time visitor counts maintained across sessions
- **Country Breakdown**: Detailed statistics by country with flags and names

## 🎯 Server Features

### 📈 **Server Rates**
- **XP/SP**: x10
- **Adena**: x5
- **Drops/Spoil**: x5
- **Quest Rewards**: x2
- **Pet XP**: x15

### ⚔️ **Gameplay Systems**
- **Champion System**: Rare, powerful mobs with boosted drops
- **Class Master Support**: NPC-based class changes
- **Seven Signs**: Fully working cycle with dungeon access
- **Sieges**: Classic castle wars with balanced guard pricing
- **Dual Boxing**: Multiple clients per IP allowed
- **Offline Trade**: Allowed

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Cloudflare account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/l2criticalerror.git
   cd l2criticalerror
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Cloudflare**
   ```bash
   npx wrangler login
   ```

4. **Deploy to Cloudflare**
   ```bash
   npm run deploy
   ```

### Development

```bash
# Start development server
npm run dev

# Type checking
npm run check

# Deploy to production
npm run deploy
```

## 📁 Project Structure

```
l2criticalerror/
├── public/
│   ├── index.html              # Main page
│   ├── server-info.html        # Server information page
│   ├── music/
│   │   └── background.mp3      # Background music
│   └── normalize.css           # CSS reset
├── src/
│   ├── client/
│   │   ├── index.tsx           # React app
│   │   └── styles.css          # L2-themed styles
│   ├── server/
│   │   └── index.ts            # Cloudflare Worker + Durable Object
│   └── shared.ts               # Shared types
├── package.json
├── wrangler.json              # Cloudflare configuration
└── tsconfig.json
```

## 🎨 Customization

### Adding New Countries
Update the country flags and names in `src/client/index.tsx`:

```typescript
const countryFlags: Record<string, string> = {
  'US': '🇺🇸', 'CA': '🇨🇦', // Add more countries
};

const countryNames: Record<string, string> = {
  'US': 'United States', 'CA': 'Canada', // Add more countries
};
```

### Styling
The L2 theme is defined in `src/client/styles.css` with:
- **Color Variables**: Gold (#ffd700), Bronze (#b8860b)
- **Fonts**: Cinzel (headings), Crimson Text (body)
- **Effects**: Animations, glows, and transitions

### Server Information
Update server details in `public/server-info.html` and `src/client/index.tsx`.

## 🌐 Live Demo

- **Main Site**: [https://l2criticalerror.com](https://l2criticalerror.com)
- **Server Info**: [https://l2criticalerror.com/server-info](https://l2criticalerror.com/server-info)

## 📱 Social Links

- **Telegram Channel**: [@l2CriticalError](https://t.me/l2CriticalError)
- **Registration Bot**: [@lineage2c4bot](https://t.me/lineage2c4bot)
- **Client Download**: [Google Drive](https://drive.google.com/file/d/13Fm0M30JIC8GxYvw3iCrmzT0dbjdNKce/view?usp=sharing)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Lineage 2**: The legendary MMORPG that inspired this project
- **Cloudflare**: For the amazing Workers and Durable Objects platform
- **PartyKit**: For real-time WebSocket functionality
- **Cobe.js**: For the beautiful 3D globe visualization
- **Inspired by**: Arax, Starnet, Moscow, L2Firebird, L2Reworld servers

---

**✨ Experience the legendary Lineage 2 C4 chronicle with authentic old-school gameplay! ✨**

*Join thousands of players worldwide in the ultimate Lineage 2 CriticalError C4 experience.*
