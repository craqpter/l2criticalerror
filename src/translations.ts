export type Language = 'en' | 'ro' | 'ru';

export interface Translations {
  // Header
  title: string;
  subtitle: string;
  
  // Server Status
  online: string;
  offline: string;
  
  // Music Control
  backgroundMusic: string;
  stopMusic: string;
  
  // Countdown Section
  serverOpening: string;
  serverWorks: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  
  // Rates Section
  serverRates: string;
  xpSp: string;
  adena: string;
  dropsSpoil: string;
  questRewards: string;
  petXp: string;
  features: string;
  noblesseSubclasses: string;
  
  // Globe Section
  whereEveryoneAt: string;
  
  // Patch Section
  latestPatchRelease: string;
  
  // Links Section
  quickLinks: string;
  guide: string;
  serverDescription: string;
  statistics: string;
  downloadClient: string;
  telegramChannel: string;
  telegramRegistrationBot: string;
  discordRegistrationBot: string;
  
  // Social Widgets
  joinOurCommunity: string;
  discordServer: string;
  membersOnline: string;
  joinDiscordServer: string;
  subscribers: string;
  joinTelegramChannel: string;
  
  // Server Button Section
  shareOurServer: string;
  
  // Footer
  inspiredBy: string;
  copyright: string;
  
  // Patch Overlay
  patchDownloadInstructions: string;
  downloadComplete: string;
  downloadCompleteDesc: string;
  extractArchive: string;
  extractArchiveDesc: string;
  installPatch: string;
  installPatchDesc: string;
  restartClient: string;
  restartClientDesc: string;
  gotIt: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    title: '✨ Lineage 2 CriticalError C4 ✨',
    subtitle: 'Old-School C4 Private Server',
    online: '🟢 Online',
    offline: '🔴 Offline',
    backgroundMusic: '🎵 Background Music',
    stopMusic: '🔇 Stop Music',
    serverOpening: '🚀 Server Opening',
    serverWorks: '✨ Lineage 2 CriticalError C4 ✨ Server works',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    serverRates: '📊 Server Rates',
    xpSp: 'XP/SP: x10',
    adena: 'Adena: x5',
    dropsSpoil: 'Drops/Spoil: x5',
    questRewards: 'Quest Rewards: x2',
    petXp: 'Pet XP: x15',
    features: 'Features: NpcBuffer • MasterClass • Craft XP',
    noblesseSubclasses: 'Noblesse and Subclasses: No quest needed',
    whereEveryoneAt: '🌍 Where\'s everyone at?',
    latestPatchRelease: '🔄 Latest Patch Release',
    quickLinks: '🔗 Quick Links',
    guide: '📖 Guide',
    serverDescription: '📖 Server Description',
    statistics: '🏆 Statistics',
    downloadClient: '📥 Download Client',
    telegramChannel: '📢 Telegram Channel',
    telegramRegistrationBot: '🤖 Telegram registration bot',
    discordRegistrationBot: '💬 Discord registration bot',
    joinOurCommunity: '🌐 Join Our Community',
    discordServer: '💬 Discord Server',
    membersOnline: 'members online',
    joinDiscordServer: 'Join Discord Server',
    subscribers: 'subscribers',
    joinTelegramChannel: 'Join Telegram Channel',
    shareOurServer: '🔗 Share Our Server',
    inspiredBy: 'Inspired by legendary Lineage 2 servers — Arax, Starnet, Moscow, L2Firebird, L2Reworld',
    copyright: '© 2025 Lineage 2 CriticalError',
    patchDownloadInstructions: '📦 Patch Download Instructions',
    downloadComplete: '📥 Download Complete',
    downloadCompleteDesc: 'The patch file system.7z has been downloaded to your computer.',
    extractArchive: '📂 Extract the Archive',
    extractArchiveDesc: 'Use 7-Zip, WinRAR, or any archive extractor to unzip the system.7z file.',
    installPatch: '🎯 Install the Patch',
    installPatchDesc: 'Copy the extracted system folder and drop it into your Lineage 2 client directory, replacing the existing system folder.',
    restartClient: '✅ Restart Client',
    restartClientDesc: 'Close your Lineage 2 client completely and restart it to apply the patch.',
    gotIt: 'Got it! 👍'
  },
  ro: {
    title: '✨ Lineage 2 CriticalError C4 ✨',
    subtitle: 'Server Privat C4 Old-School',
    online: '🟢 Online',
    offline: '🔴 Offline',
    backgroundMusic: '🎵 Muzică de Fundal',
    stopMusic: '🔇 Oprește Muzica',
    serverOpening: '🚀 Deschiderea Serverului',
    serverWorks: '✨ Lineage 2 CriticalError C4 ✨ Serverul funcționează',
    days: 'Zile',
    hours: 'Ore',
    minutes: 'Minute',
    seconds: 'Secunde',
    serverRates: '📊 Ratele Serverului',
    xpSp: 'XP/SP: x10',
    adena: 'Adena: x5',
    dropsSpoil: 'Drops/Spoil: x5',
    questRewards: 'Recompense Quest: x2',
    petXp: 'Pet XP: x15',
    features: 'Caracteristici: NpcBuffer • MasterClass • Craft XP',
    noblesseSubclasses: 'Noblesse și Subclase: Nu e nevoie de quest',
    whereEveryoneAt: '🌍 Unde sunt toți?',
    latestPatchRelease: '🔄 Ultima Versiune de Patch',
    quickLinks: '🔗 Linkuri Rapide',
    guide: '📖 Ghid',
    serverDescription: '📖 Descrierea Serverului',
    statistics: '🏆 Statistici',
    downloadClient: '📥 Descarcă Clientul',
    telegramChannel: '📢 Canalul Telegram',
    telegramRegistrationBot: '🤖 Bot de înregistrare Telegram',
    discordRegistrationBot: '💬 Bot de înregistrare Discord',
    joinOurCommunity: '🌐 Alătură-te Comunității Noastre',
    discordServer: '💬 Serverul Discord',
    membersOnline: 'membri online',
    joinDiscordServer: 'Alătură-te Serverului Discord',
    subscribers: 'abonați',
    joinTelegramChannel: 'Alătură-te Canalului Telegram',
    shareOurServer: '🔗 Distribuie Serverul Nostru',
    inspiredBy: 'Inspirat de serverele legendare Lineage 2 — Arax, Starnet, Moscow, L2Firebird, L2Reworld',
    copyright: '© 2025 Lineage 2 CriticalError',
    patchDownloadInstructions: '📦 Instrucțiuni pentru Descărcarea Patch-ului',
    downloadComplete: '📥 Descărcare Completă',
    downloadCompleteDesc: 'Fișierul patch system.7z a fost descărcat pe computerul tău.',
    extractArchive: '📂 Extrage Arhiva',
    extractArchiveDesc: 'Folosește 7-Zip, WinRAR sau orice extractor de arhive pentru a dezarhiva fișierul system.7z.',
    installPatch: '🎯 Instalează Patch-ul',
    installPatchDesc: 'Copiază folderul system extras și plasează-l în directorul clientului tău Lineage 2, înlocuind folderul system existent.',
    restartClient: '✅ Repornește Clientul',
    restartClientDesc: 'Închide complet clientul tău Lineage 2 și repornește-l pentru a aplica patch-ul.',
    gotIt: 'Am înțeles! 👍'
  },
  ru: {
    title: '✨ Lineage 2 CriticalError C4 ✨',
    subtitle: 'Старый Добрый C4 Приватный Сервер',
    online: '🟢 Онлайн',
    offline: '🔴 Офлайн',
    backgroundMusic: '🎵 Фоновая Музыка',
    stopMusic: '🔇 Остановить Музыку',
    serverOpening: '🚀 Открытие Сервера',
    serverWorks: '✨ Lineage 2 CriticalError C4 ✨ Сервер работает',
    days: 'Дни',
    hours: 'Часы',
    minutes: 'Минуты',
    seconds: 'Секунды',
    serverRates: '📊 Ставки Сервера',
    xpSp: 'Опыт/SP: x10',
    adena: 'Адена: x5',
    dropsSpoil: 'Дропы/Спойл: x5',
    questRewards: 'Награды Квестов: x2',
    petXp: 'Опыт Питомца: x15',
    features: 'Особенности: NpcBuffer • MasterClass • Craft XP',
    noblesseSubclasses: 'Ноблесс и Подклассы: Квест не нужен',
    whereEveryoneAt: '🌍 Где все находятся?',
    latestPatchRelease: '🔄 Последний Патч',
    quickLinks: '🔗 Быстрые Ссылки',
    guide: '📖 Руководство',
    serverDescription: '📖 Описание Сервера',
    statistics: '🏆 Статистика',
    downloadClient: '📥 Скачать Клиент',
    telegramChannel: '📢 Telegram Канал',
    telegramRegistrationBot: '🤖 Telegram бот регистрации',
    discordRegistrationBot: '💬 Discord бот регистрации',
    joinOurCommunity: '🌐 Присоединяйтесь к Нашему Сообществу',
    discordServer: '💬 Discord Сервер',
    membersOnline: 'участников онлайн',
    joinDiscordServer: 'Присоединиться к Discord Серверу',
    subscribers: 'подписчиков',
    joinTelegramChannel: 'Присоединиться к Telegram Каналу',
    shareOurServer: '🔗 Поделиться Нашим Сервером',
    inspiredBy: 'Вдохновлено легендарными серверами Lineage 2 — Arax, Starnet, Moscow, L2Firebird, L2Reworld',
    copyright: '© 2025 Lineage 2 CriticalError',
    patchDownloadInstructions: '📦 Инструкции по Скачиванию Патча',
    downloadComplete: '📥 Скачивание Завершено',
    downloadCompleteDesc: 'Файл патча system.7z был скачан на ваш компьютер.',
    extractArchive: '📂 Распаковать Архив',
    extractArchiveDesc: 'Используйте 7-Zip, WinRAR или любой архиватор для распаковки файла system.7z.',
    installPatch: '🎯 Установить Патч',
    installPatchDesc: 'Скопируйте извлеченную папку system и поместите её в директорию вашего клиента Lineage 2, заменив существующую папку system.',
    restartClient: '✅ Перезапустить Клиент',
    restartClientDesc: 'Полностью закройте ваш клиент Lineage 2 и перезапустите его для применения патча.',
    gotIt: 'Понятно! 👍'
  }
};

export const getLanguageFromStorage = (): Language => {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem('language') as Language;
  return stored && ['en', 'ro', 'ru'].includes(stored) ? stored : 'en';
};

export const setLanguageToStorage = (language: Language): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('language', language);
};
