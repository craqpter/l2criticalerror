// Translation system for HTML pages
const translations = {
  en: {
    // Common
    backToMainPage: '← Back to Main Page',
    inspiredBy: 'Inspired by legendary Lineage 2 servers — Arax, Starnet, Moscow, L2Firebird, L2Reworld',
    copyright: '© 2025 Lineage 2 CriticalError',
    
    // Guide page
    gameGuide: '📖 Game Guide',
    completeSetupGuide: 'Complete setup guide for Lineage 2 CriticalError C4',
    downloadInstallation: '📥 Download & Installation',
    downloadInstallationDesc: 'Follow these steps to download and set up the Lineage 2 CriticalError C4 client:',
    downloadClient: 'Download the Client',
    downloadClientDesc: 'Click the download button below to get the Lineage 2 CriticalError C4 client package.',
    downloadClientButton: '📥 Download Client',
    extractFiles: 'Extract the Files',
    extractFilesDesc: 'Unzip the downloaded file to a folder on your computer. Make sure you have enough disk space (approximately 2-3 GB).',
    runGame: 'Run the Game',
    runGameDesc: 'Navigate to the extracted folder and run L2.exe from the system folder. This is the main game executable.',
    createAccount: 'Create Account',
    createAccountDesc: 'Use our Telegram registration bot to create your game account:',
    createAccountDesc2: 'Alternatively, use our Discord registration bot:',
    openDiscordBot: 'Open Discord Bot',
    importantNotes: '⚠️ Important Notes',
    importantNotesDesc: 'Make sure to run L2.exe as administrator if you encounter any permission issues. The game requires Windows operating system.',
    gettingStarted: '🎮 Getting Started',
    gettingStartedDesc: 'Once you have the client installed and your account created, here\'s how to begin your adventure:',
    characterCreation: '🏃‍♂️ Character Creation',
    characterCreationDesc: 'Choose your race and class carefully. Each has unique abilities and playstyles.',
    combatSystem: '⚔️ Combat System',
    combatSystemDesc: 'Learn the combat mechanics and skill combinations for your chosen class.',
    economy: '💰 Economy',
    economyDesc: 'Understand the server rates: x10 XP/SP, x5 Adena, x5 Drops for optimal progression.',
    community: '👥 Community',
    communityDesc: 'Join our Discord and Telegram channels to connect with other players.',
    serverFeatures: '🔧 Server Features',
    serverFeaturesDesc: 'Our server includes several quality-of-life improvements:',
    npcBuffer: 'NPC Buffer',
    npcBufferDesc: 'Get buffs from NPCs to enhance your character\'s abilities.',
    masterClassSystem: 'Master Class System',
    masterClassSystemDesc: 'NPC-based class changes with flexible progression paths.',
    noblesseSubclasses: 'Noblesse & Subclasses',
    noblesseSubclassesDesc: 'No quest needed.',
    sevenSignsSieges: 'Seven Signs & Sieges',
    sevenSignsSiegesDesc: 'Participate in epic castle wars and faction battles.',
    communityLinks: '🌐 Community Links',
    communityLinksDesc: 'Stay connected with the community:',
    discord: '💬 Discord',
    discordDesc: 'Join our Discord server for real-time chat and support.',
    joinDiscord: 'Join Discord',
    telegram: '📱 Telegram',
    telegramDesc: 'Follow our Telegram channel for updates and announcements.',
    joinTelegram: 'Join Telegram',
    registrationBot: '🤖 Registration Bot',
    registrationBotDesc: 'Use our Telegram or Discord registration bots to create and manage your game account.',
    openTelegramBot: 'Open Telegram Bot',
    
    // Server info page
    serverInfo: '✨ Lineage 2 CriticalError C4 ✨',
    detailedServerInfo: 'Detailed Server Information',
    keyFeatures: '🌟 Key Features',
    championSystem: 'Champion System – rare, powerful mobs with boosted drops.',
    classMasterSupport: 'Class Master Support – NPC-based class changes with flexible progression.',
    forNoblesseSubclasses: 'For Noblesse and Subclasses - No quest Needed',
    npcBufferNpcShop: 'NPC Buffer/NPC Shop – multiple buff schemes for convenience.',
    dualBoxingSupport: 'Dual Boxing Support – multiple clients per IP allowed.',
    offlineTrade: 'Offline Trade – allowed',
    safeEnchant: 'Safe enchant 3 / Maximum enchant 10',
    gameplaySystems: '📜 Gameplay Systems',
    sevenSigns: 'Seven Signs – fully working cycle with dungeon NPC access options.',
    sieges: 'Sieges – classic castle wars with balanced guard pricing (x1).',
    editedStats: 'Edited Stats - for some Classes',
    serverRates: '📊 Server Rates',
    xpSp: 'XP/SP',
    adena: 'Adena',
    dropsSpoil: 'Drops/Spoil',
    bossDrops: 'Boss Drops',
    quests: 'Quests (Adena, XP, SP, Rewards)',
    manor: 'Manor',
    fishingExtract: 'Fishing Extract',
    petXp: 'Pet XP',
    consumables: 'Consumables (retail)',
    gameBalance: '⚖️ Game Balance',
    gameBalanceDesc: 'PvP, Karma, and drop rules are balanced for fair play while keeping the old-school C4 feel.',
    gameBalanceNote: 'Note: This server maintains the authentic C4 experience with balanced rates and features designed for fair and enjoyable gameplay.',
    quickLinks: '🔗 Quick Links',
    telegramChannel: '📢 Telegram Channel',
    telegramRegistrationBot: '🤖 Telegram registration bot',
    discordRegistrationBot: '💬 Discord registration bot',
    downloadClient: '📥 Download Client',
    
    // Statistics page
    statistics: '🏆 Statistics',
    playerRankings: 'Player Rankings and Server Statistics',
    topPlayers: '🏆 Top Players',
    serverStats: '📊 Server Statistics',
    totalPlayers: 'Total Players',
    onlinePlayers: 'Online Players',
    totalGuilds: 'Total Guilds',
    serverUptime: 'Server Uptime'
  },
  ro: {
    // Common
    backToMainPage: '← Înapoi la Pagina Principală',
    inspiredBy: 'Inspirat de serverele legendare Lineage 2 — Arax, Starnet, Moscow, L2Firebird, L2Reworld',
    copyright: '© 2025 Lineage 2 CriticalError',
    
    // Guide page
    gameGuide: '📖 Ghidul Jocului',
    completeSetupGuide: 'Ghid complet de configurare pentru Lineage 2 CriticalError C4',
    downloadInstallation: '📥 Descărcare și Instalare',
    downloadInstallationDesc: 'Urmează acești pași pentru a descărca și configura clientul Lineage 2 CriticalError C4:',
    downloadClient: 'Descarcă Clientul',
    downloadClientDesc: 'Apasă butonul de descărcare de mai jos pentru a obține pachetul clientului Lineage 2 CriticalError C4.',
    downloadClientButton: '📥 Descarcă Clientul',
    extractFiles: 'Extrage Fișierele',
    extractFilesDesc: 'Dezarhivează fișierul descărcat într-un folder pe computerul tău. Asigură-te că ai suficient spațiu pe disc (aproximativ 2-3 GB).',
    runGame: 'Rulează Jocul',
    runGameDesc: 'Navighează la folderul extras și rulează L2.exe din folderul system. Acesta este executabilul principal al jocului.',
    createAccount: 'Creează Contul',
    createAccountDesc: 'Folosește botul nostru de înregistrare Telegram pentru a-ți crea contul de joc:',
    createAccountDesc2: 'Alternativ, folosește botul nostru de înregistrare Discord:',
    openDiscordBot: 'Deschide Botul Discord',
    importantNotes: '⚠️ Note Importante',
    importantNotesDesc: 'Asigură-te că rulezi L2.exe ca administrator dacă întâmpini probleme de permisiuni. Jocul necesită sistemul de operare Windows.',
    gettingStarted: '🎮 Începe Aventura',
    gettingStartedDesc: 'Odată ce ai instalat clientul și ți-ai creat contul, iată cum să începi aventura:',
    characterCreation: '🏃‍♂️ Crearea Personajului',
    characterCreationDesc: 'Alege cu atenție rasa și clasa. Fiecare are abilități și stiluri de joc unice.',
    combatSystem: '⚔️ Sistemul de Luptă',
    combatSystemDesc: 'Învață mecanica de luptă și combinațiile de skilluri pentru clasa aleasă.',
    economy: '💰 Economia',
    economyDesc: 'Înțelege ratele serverului: x10 XP/SP, x5 Adena, x5 Drops pentru progresie optimă.',
    community: '👥 Comunitatea',
    communityDesc: 'Alătură-te canalelor noastre Discord și Telegram pentru a te conecta cu alți jucători.',
    serverFeatures: '🔧 Caracteristicile Serverului',
    serverFeaturesDesc: 'Serverul nostru include mai multe îmbunătățiri pentru calitatea vieții:',
    npcBuffer: 'NPC Buffer',
    npcBufferDesc: 'Obține buffuri de la NPC-uri pentru a-ți îmbunătăți abilitățile personajului.',
    masterClassSystem: 'Sistemul Master Class',
    masterClassSystemDesc: 'Schimbări de clasă bazate pe NPC-uri cu căi de progresie flexibile.',
    noblesseSubclasses: 'Noblesse și Subclase',
    noblesseSubclassesDesc: 'Nu e nevoie de quest.',
    sevenSignsSieges: 'Seven Signs și Asediuri',
    sevenSignsSiegesDesc: 'Participă la războaie epice de castel și bătălii de facțiune.',
    communityLinks: '🌐 Linkuri Comunitate',
    communityLinksDesc: 'Rămâi conectat cu comunitatea:',
    discord: '💬 Discord',
    discordDesc: 'Alătură-te serverului nostru Discord pentru chat în timp real și suport.',
    joinDiscord: 'Alătură-te Discord',
    telegram: '📱 Telegram',
    telegramDesc: 'Urmărește canalul nostru Telegram pentru actualizări și anunțuri.',
    joinTelegram: 'Alătură-te Telegram',
    registrationBot: '🤖 Bot de Înregistrare',
    registrationBotDesc: 'Folosește boturile noastre de înregistrare Telegram sau Discord pentru a crea și gestiona contul tău de joc.',
    openTelegramBot: 'Deschide Botul Telegram',
    
    // Server info page
    serverInfo: '✨ Lineage 2 CriticalError C4 ✨',
    detailedServerInfo: 'Informații Detaliate despre Server',
    keyFeatures: '🌟 Caracteristici Cheie',
    championSystem: 'Sistemul Champion – moburi rare și puternice cu drops îmbunătățite.',
    classMasterSupport: 'Suport Class Master – schimbări de clasă bazate pe NPC-uri cu progresie flexibilă.',
    forNoblesseSubclasses: 'Pentru Noblesse și Subclase - Nu e Nevoie de Quest',
    npcBufferNpcShop: 'NPC Buffer/NPC Shop – scheme multiple de buffuri pentru comoditate.',
    dualBoxingSupport: 'Suport Dual Boxing – multiple clienți per IP permise.',
    offlineTrade: 'Trade Offline – permis',
    safeEnchant: 'Enchant sigur 3 / Enchant maxim 10',
    gameplaySystems: '📜 Sisteme de Gameplay',
    sevenSigns: 'Seven Signs – ciclu complet funcțional cu opțiuni de acces NPC dungeon.',
    sieges: 'Asediuri – războaie clasice de castel cu prețuri echilibrate de gardă (x1).',
    editedStats: 'Statistici Editate - pentru unele Clase',
    serverRates: '📊 Ratele Serverului',
    xpSp: 'XP/SP',
    adena: 'Adena',
    dropsSpoil: 'Drops/Spoil',
    bossDrops: 'Drops Boss',
    quests: 'Questuri (Adena, XP, SP, Recompense)',
    manor: 'Manor',
    fishingExtract: 'Extragere Pescuire',
    petXp: 'Pet XP',
    consumables: 'Consumabile (retail)',
    gameBalance: '⚖️ Echilibrul Jocului',
    gameBalanceDesc: 'Regulile PvP, Karma și drop sunt echilibrate pentru joc echitabil păstrând sentimentul old-school C4.',
    gameBalanceNote: 'Notă: Acest server menține experiența autentică C4 cu rate echilibrate și caracteristici proiectate pentru gameplay echitabil și plăcut.',
    quickLinks: '🔗 Linkuri Rapide',
    telegramChannel: '📢 Canalul Telegram',
    telegramRegistrationBot: '🤖 Bot de înregistrare Telegram',
    discordRegistrationBot: '💬 Bot de înregistrare Discord',
    downloadClient: '📥 Descarcă Clientul',
    
    // Statistics page
    statistics: '🏆 Statistici',
    playerRankings: 'Clasamentul Jucătorilor și Statisticile Serverului',
    topPlayers: '🏆 Top Jucători',
    serverStats: '📊 Statisticile Serverului',
    totalPlayers: 'Total Jucători',
    onlinePlayers: 'Jucători Online',
    totalGuilds: 'Total Guild-uri',
    serverUptime: 'Timpul de Funcționare al Serverului'
  },
  ru: {
    // Common
    backToMainPage: '← Назад на Главную Страницу',
    inspiredBy: 'Вдохновлено легендарными серверами Lineage 2 — Arax, Starnet, Moscow, L2Firebird, L2Reworld',
    copyright: '© 2025 Lineage 2 CriticalError',
    
    // Guide page
    gameGuide: '📖 Руководство по Игре',
    completeSetupGuide: 'Полное руководство по настройке Lineage 2 CriticalError C4',
    downloadInstallation: '📥 Скачивание и Установка',
    downloadInstallationDesc: 'Следуйте этим шагам для скачивания и настройки клиента Lineage 2 CriticalError C4:',
    downloadClient: 'Скачать Клиент',
    downloadClientDesc: 'Нажмите кнопку скачивания ниже, чтобы получить пакет клиента Lineage 2 CriticalError C4.',
    downloadClientButton: '📥 Скачать Клиент',
    extractFiles: 'Извлечь Файлы',
    extractFilesDesc: 'Распакуйте скачанный файл в папку на вашем компьютере. Убедитесь, что у вас достаточно места на диске (примерно 2-3 ГБ).',
    runGame: 'Запустить Игру',
    runGameDesc: 'Перейдите в извлеченную папку и запустите L2.exe из папки system. Это основной исполняемый файл игры.',
    createAccount: 'Создать Аккаунт',
    createAccountDesc: 'Используйте нашего Telegram бота для регистрации, чтобы создать игровой аккаунт:',
    createAccountDesc2: 'Альтернативно, используйте нашего Discord бота для регистрации:',
    openDiscordBot: 'Открыть Discord Бота',
    importantNotes: '⚠️ Важные Заметки',
    importantNotesDesc: 'Убедитесь, что запускаете L2.exe от имени администратора, если возникают проблемы с разрешениями. Игра требует операционную систему Windows.',
    gettingStarted: '🎮 Начало Игры',
    gettingStartedDesc: 'После установки клиента и создания аккаунта, вот как начать ваше приключение:',
    characterCreation: '🏃‍♂️ Создание Персонажа',
    characterCreationDesc: 'Внимательно выберите расу и класс. У каждого есть уникальные способности и стили игры.',
    combatSystem: '⚔️ Боевая Система',
    combatSystemDesc: 'Изучите боевую механику и комбинации навыков для выбранного класса.',
    economy: '💰 Экономика',
    economyDesc: 'Поймите ставки сервера: x10 XP/SP, x5 Adena, x5 Drops для оптимального прогресса.',
    community: '👥 Сообщество',
    communityDesc: 'Присоединяйтесь к нашим каналам Discord и Telegram, чтобы общаться с другими игроками.',
    serverFeatures: '🔧 Особенности Сервера',
    serverFeaturesDesc: 'Наш сервер включает несколько улучшений качества жизни:',
    npcBuffer: 'NPC Буфер',
    npcBufferDesc: 'Получайте баффы от NPC для улучшения способностей вашего персонажа.',
    masterClassSystem: 'Система Мастер Классов',
    masterClassSystemDesc: 'Смена классов через NPC с гибкими путями прогрессии.',
    noblesseSubclasses: 'Ноблесс и Подклассы',
    noblesseSubclassesDesc: 'Квест не нужен.',
    sevenSignsSieges: 'Семь Знаков и Осады',
    sevenSignsSiegesDesc: 'Участвуйте в эпических войнах замков и фракционных битвах.',
    communityLinks: '🌐 Ссылки Сообщества',
    communityLinksDesc: 'Оставайтесь на связи с сообществом:',
    discord: '💬 Discord',
    discordDesc: 'Присоединяйтесь к нашему Discord серверу для чата в реальном времени и поддержки.',
    joinDiscord: 'Присоединиться к Discord',
    telegram: '📱 Telegram',
    telegramDesc: 'Подписывайтесь на наш Telegram канал для обновлений и объявлений.',
    joinTelegram: 'Присоединиться к Telegram',
    registrationBot: '🤖 Бот Регистрации',
    registrationBotDesc: 'Используйте наших Telegram или Discord ботов для создания и управления вашим игровым аккаунтом.',
    openTelegramBot: 'Открыть Telegram Бота',
    
    // Server info page
    serverInfo: '✨ Lineage 2 CriticalError C4 ✨',
    detailedServerInfo: 'Подробная Информация о Сервере',
    keyFeatures: '🌟 Ключевые Особенности',
    championSystem: 'Система Чемпионов – редкие, мощные мобы с улучшенными дропами.',
    classMasterSupport: 'Поддержка Мастер Классов – смена классов через NPC с гибкой прогрессией.',
    forNoblesseSubclasses: 'Для Ноблесс и Подклассов - Квест Не Нужен',
    npcBufferNpcShop: 'NPC Буфер/NPC Магазин – множественные схемы баффов для удобства.',
    dualBoxingSupport: 'Поддержка Двойного Боксинга – несколько клиентов на IP разрешены.',
    offlineTrade: 'Офлайн Торговля – разрешена',
    safeEnchant: 'Безопасное зачарование 3 / Максимальное зачарование 10',
    gameplaySystems: '📜 Игровые Системы',
    sevenSigns: 'Семь Знаков – полностью рабочий цикл с опциями доступа к NPC подземелий.',
    sieges: 'Осады – классические войны замков со сбалансированными ценами стражей (x1).',
    editedStats: 'Отредактированные Статы - для некоторых Классов',
    serverRates: '📊 Ставки Сервера',
    xpSp: 'Опыт/SP',
    adena: 'Адена',
    dropsSpoil: 'Дропы/Спойл',
    bossDrops: 'Дропы Боссов',
    quests: 'Квесты (Адена, Опыт, SP, Награды)',
    manor: 'Манор',
    fishingExtract: 'Извлечение Рыбалки',
    petXp: 'Опыт Питомца',
    consumables: 'Расходники (retail)',
    gameBalance: '⚖️ Игровой Баланс',
    gameBalanceDesc: 'Правила PvP, Кармы и дропов сбалансированы для честной игры, сохраняя ощущение старой школы C4.',
    gameBalanceNote: 'Примечание: Этот сервер поддерживает аутентичный опыт C4 со сбалансированными ставками и особенностями, разработанными для честного и приятного геймплея.',
    quickLinks: '🔗 Быстрые Ссылки',
    telegramChannel: '📢 Telegram Канал',
    telegramRegistrationBot: '🤖 Telegram бот регистрации',
    discordRegistrationBot: '💬 Discord бот регистрации',
    downloadClient: '📥 Скачать Клиент',
    
    // Statistics page
    statistics: '🏆 Статистика',
    playerRankings: 'Рейтинг Игроков и Статистика Сервера',
    topPlayers: '🏆 Топ Игроков',
    serverStats: '📊 Статистика Сервера',
    totalPlayers: 'Всего Игроков',
    onlinePlayers: 'Игроков Онлайн',
    totalGuilds: 'Всего Гильдий',
    serverUptime: 'Время Работы Сервера'
  }
};

// Language detection and management
function getLanguageFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('lang') || localStorage.getItem('language') || 'en';
}

function setLanguage(lang) {
  localStorage.setItem('language', lang);
  // Update URL without reload
  const url = new URL(window.location);
  url.searchParams.set('lang', lang);
  window.history.replaceState({}, '', url);
}

function translatePage() {
  const lang = getLanguageFromURL();
  const t = translations[lang] || translations.en;
  
  // Update all elements with data-translate attribute
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    if (t[key]) {
      if (element.tagName === 'INPUT' && element.type === 'submit') {
        element.value = t[key];
      } else {
        element.textContent = t[key];
      }
    }
  });
  
  // Update page title and meta description
  if (t.pageTitle) {
    document.title = t.pageTitle;
  }
  
  // Update language selector if it exists
  const langSelector = document.getElementById('language-selector');
  if (langSelector) {
    langSelector.value = lang;
  }
}

// Initialize translation when page loads
document.addEventListener('DOMContentLoaded', translatePage);

// Export for use in other scripts
window.TranslationSystem = {
  getLanguageFromURL,
  setLanguage,
  translatePage,
  translations
};
