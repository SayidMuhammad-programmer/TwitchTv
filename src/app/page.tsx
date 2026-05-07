'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import ProfileHeader from '@/components/ProfileHeader';
import TabNavigation from '@/components/TabNavigation';
import ChatArea from '@/components/ChatArea';
import ChatInput from '@/components/ChatInput';
import BottomNavigation from '@/components/BottomNavigation';

export default function Home() {
  const [activeTab, setActiveTab] = useState('chat');
  const [activeNavItem, setActiveNavItem] = useState('home');
  const streamerName = 'YNBFAM';

  // Define a pool of simulated users with icons
  const simulatedUsers = useMemo(
    () => [
      { name: 'pixel_pilot', icon: '🛩️' },
      { name: 'crypto_coyote', icon: '🦊' },
      { name: 'byte_bard', icon: '🎭' },
      { name: 'luna_lofi', icon: '🌙' },
      { name: 'nova_nexus', icon: '✨' },
      { name: 'glitch_ghost', icon: '👻' },
      { name: 'quant_koala', icon: '🐨' },
      { name: 'zen_zebra', icon: '🦓' },
      { name: 'hyper_husky', icon: '🐺' },
      { name: 'orbit_otter', icon: '🦦' },
      { name: 'joystick_jay', icon: '🎮' },
      { name: 'vibe_vince', icon: '🌀' },
      { name: 'sigma_sam', icon: '💼' },
      { name: 'dub_dylan', icon: '🏆' },
      { name: 'copium_cade', icon: '🫁' },
      { name: 'pog_patrick', icon: '🤯' },
      { name: 'keanu_kekw', icon: '😆' },
      { name: 'boost_bryce', icon: '⚡' },
      { name: 'cloud_chris', icon: '☁️' },
      { name: 'astro_ace', icon: '🧑‍🚀' },
      { name: 'drift_dante', icon: '🏎️' },
      { name: 'combo_cole', icon: '🕹️' },
      { name: 'ping_preston', icon: '📶' },
      { name: 'macro_miles', icon: '📈' },
      { name: 'turbo_ty', icon: '🚀' },
      { name: 'neon_nate', icon: '🔮' },
      { name: 'frost_finn', icon: '❄️' },
      { name: 'skate_sky', icon: '🛹' },
      { name: 'atlas_ari', icon: '🌍' },
      { name: 'ghost_gabe', icon: '💨' },
    ],
    []
  );

  // Fallback generic messages for variety
  const fallbackTemplates = useMemo(
    () => [
      'let’s gooo!',
      'this layout is clean fr',
      'drop the playlist?',
      'W streamer',
      'L take tbh',
      'anyone else vibing?',
      'that transition was smooth',
      'mod check?',
      'brb grabbing snacks 🍿',
      'ayo this is heat',
      'camera crispy today',
      'mic sounds nice',
      '12 hour stream when?',
      'new emotes when??',
      'ratio',
      'touch grass (respectfully)',
      'this beat go hard',
      'yall see that?',
      'hydrate check 💧',
      'W take',
      'massive dub',
      'no cap',
      'ong',
      'fr fr',
      'bro said WHAT',
      'say less',
      'we up',
      'vibes immaculate',
      'mid? be serious',
      'light work',
      'gz on that',
      'peak content',
      'hard carry',
      'lock it in',
      'speedrun that',
      'we cooking',
      'shield check 🛡️',
      'stamina low bar',
      'buff that',
      'insane timing',
      'clutch gene',
      'go next',
      'queue up',
      'coach me pls',
    ],
    []
  );

  // Themed sentiment seeds and weights derived from user prompts
  const themeSeeds = useMemo(
    () => ({
      compliment: [
        'production clean',
        'overlay is hard',
        'setup is fire fr',
        'mic crispy',
        'audio mixing on point',
        'stream quality A1',
      ],
      humor: [
        'you crazy ngl 😭',
        'nah that was wild',
        'im crying rn',
        'aint no way 💀',
        'bro really did that',
      ],
      laugh: [
        'LMAOOO',
        'lmfaooo',
        'lmao',
        'OMEGALUL',
        'KEKW',
      ],
      rizz: [
        'drop the rizz',
        'rizzlord moment',
        'light rizz, we move',
        'smooth with it ngl',
        'charisma speedrun',
      ],
      speed: [
        'Chat moving faster than my gpa lol',
        'chat zoomin rn',
        'cant read this fast 😭',
        'yo slow down chat',
        'mods struggling fr',
      ],
      cameraman: [
        'Camera man GOATED',
        'cam work is crazy',
        'camera on point',
        'director vibes',
        'steadiest hands in the game',
      ],
    }),
    []
  );

  const themeEmojis = useMemo(
    () => ({
      compliment: ['🔥','😮‍💨','✨','😍','🥵'],
      humor: ['😭','💀','😂','😹'],
      laugh: ['🤣','😂','😭'],
      rizz: ['😎','💫','🧠','💘','🗣️'],
      speed: ['💨','⚡','🏎️','🌀','😵‍💫'],
      cameraman: ['🎥','🫡','🧠','🏆','🔝'],
    }),
    []
  );

  const themeWeights = useMemo(
    () => ({
      compliment: 0.2,
      humor: 0.2,
      laugh: 0.15,
      rizz: 0.15,
      speed: 0.15,
      cameraman: 0.15,
    }),
    []
  );

  const randomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  const generateWSpam = () => {
    const length = 1 + Math.floor(Math.random() * 5);
    const char = Math.random() < 0.75 ? 'W' : 'w';
    return char.repeat(length);
  };

  const pickWeightedCategory = () => {
    const entries = Object.entries(themeWeights);
    const r = Math.random();
    let acc = 0;
    for (const [cat, w] of entries) {
      acc += w as number;
      if (r <= acc) return cat as keyof typeof themeSeeds;
    }
    return entries[entries.length - 1][0] as keyof typeof themeSeeds;
  };

  const varyBySentiment = (sentiment: keyof typeof themeSeeds, base: string) => {
    let text = base;
    const chance = (p: number) => Math.random() < p;

    // Emphasize with repeats/casing
    if (sentiment === 'laugh') {
      const oCount = 3 + Math.floor(Math.random() * 5);
      text = text.toLowerCase().startsWith('lma') ? `LMA${'O'.repeat(oCount)}` : text;
      if (chance(0.4)) text = text + (chance(0.5) ? ' 😂' : ' 🤣');
    }

    if (sentiment === 'compliment') {
      if (chance(0.5)) text = text.replace(/gud|good/i, chance(0.5) ? 'goodddd' : 'gooood');
      if (chance(0.4)) text = 'sheesh ' + text.toLowerCase();
    }

    if (sentiment === 'rizz') {
      if (chance(0.5)) text = text.replace(/rizz+/i, 'riz' + 'z'.repeat(2 + Math.floor(Math.random() * 4)));
      if (chance(0.4)) text = text + ' no cap';
    }

    if (sentiment === 'speed') {
      if (chance(0.5)) text = text + ' fr';
      if (chance(0.4)) text = text + ' 💀';
    }

    if (sentiment === 'cameraman') {
      if (chance(0.5)) text = text.replace(/GOATED/i, chance(0.5) ? 'GOATEDDDD' : 'goated');
    }

    if (sentiment === 'humor') {
      if (chance(0.5)) text = text + (chance(0.5) ? ' 😭😭' : ' 💀');
    }

    // Randomly add punctuation flair
    if (chance(0.5)) {
      const marks = ['!', '!!', '!!!', '?!'];
      text = text + marks[Math.floor(Math.random() * marks.length)];
    }

    // Add 0-2 sentiment-fitting emojis
    const eCount = Math.floor(Math.random() * 3);
    const emojis = themeEmojis[sentiment];
    for (let i = 0; i < eCount; i++) text += ' ' + randomItem(emojis);

    // Occasionally all-caps for hype
    if ((sentiment === 'laugh' || sentiment === 'compliment' || sentiment === 'cameraman') && chance(0.2)) {
      text = text.toUpperCase();
    }

    return text.trim();
  };

  const defaultMessages = [
    {
      id: '1',
      username: 'xX_GamerPro_Xx',
      message: 'W RIZZ',
      isStreamer: false,
    },
    {
      id: '2',
      username: 'MiamiNightz',
      message: 'LMAOOO she was not feeling it',
      isStreamer: false,
    },
    {
      id: '3',
      username: 'WavyVibes88',
      message: 'Bro ask her what her sign is',
      isStreamer: false,
    },
    {
      id: '4',
      username: '305_Player',
      message: 'This stream is fire 🔥',
      isStreamer: false,
    },
    {
      id: '5',
      username: 'SavageSam',
      message: "She's a 10 but she likes pineapple on pizza",
      isStreamer: false,
    },
    {
      id: '6',
      username: 'ClutchKing42',
      message: "He's got that unspoken rizz",
      isStreamer: false,
    },
    {
      id: '7',
      username: 'J-Roc',
      message: 'AYOOO',
      isStreamer: false,
    },
    {
      id: '8',
      username: 'SlickRick',
      message: 'nah he fumbled that one',
      isStreamer: false,
    },
    {
      id: '9',
      username: 'BasedGodflow',
      message: 'Clip it!',
      isStreamer: false,
    },
    {
      id: '10',
      username: 'WRLD_On_DRGS',
      message: 'KEKW',
      isStreamer: false,
    },
    {
      id: '11',
      username: 'VibeMaster',
      message: 'Is that a filter or is she really that...',
      isStreamer: false,
    },
    {
      id: '12',
      username: 'TheRealDeal',
      message: 'Bro is bricked up',
      isStreamer: false,
    },
    {
      id: '13',
      username: 'ChillFactor',
      message: 'the AUDACITY',
      isStreamer: false,
    },
    {
      id: '14',
      username: 'GamerGod',
      message: 'Tell her my boy Bilal wants her number',
      isStreamer: false,
    },
  ];

  const initialMessages = useMemo(
    () => defaultMessages,
    []
  );

  const [messages, setMessages] = useState(initialMessages);
  const generatorTimerRef = useRef<number | null>(null);
  const lastTouchTimestampRef = useRef<number>(0);

  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      username: 'You',
      message: message,
      isStreamer: false,
      userIcon: '💬',
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const triggerSpecialMessage = () => {
    const user = randomItem(simulatedUsers);
    const text = generateWSpam();
    const id = (Date.now() + Math.random()).toString();
    setMessages(prev => {
      const next = [
        ...prev,
        {
          id,
          username: user.name,
          message: text,
          isStreamer: false,
          userIcon: user.icon,
        },
      ];
      return next.length > 200 ? next.slice(next.length - 200) : next;
    });
  };

  const holdSpamTimerRef = useRef<number | null>(null);
  const holdSpamIntervalRef = useRef<number | null>(null);

  const stopHoldSpam = () => {
    if (holdSpamTimerRef.current !== null) {
      clearTimeout(holdSpamTimerRef.current);
      holdSpamTimerRef.current = null;
    }
    if (holdSpamIntervalRef.current !== null) {
      clearInterval(holdSpamIntervalRef.current);
      holdSpamIntervalRef.current = null;
    }
  };

  // Wait 200ms before treating a press as a "hold", so taps/double-taps still work cleanly.
  const handlePointerDown = () => {
    stopHoldSpam();
    holdSpamTimerRef.current = window.setTimeout(() => {
      triggerSpecialMessage();
      holdSpamIntervalRef.current = window.setInterval(triggerSpecialMessage, 400);
    }, 200);
  };

  const handlePointerUp = () => {
    stopHoldSpam();
  };

  const burstIntervalRef = useRef<number | null>(null);
  const burstStopTimeoutRef = useRef<number | null>(null);

  const stopSpamBurst = () => {
    if (burstIntervalRef.current !== null) {
      clearInterval(burstIntervalRef.current);
      burstIntervalRef.current = null;
    }
    if (burstStopTimeoutRef.current !== null) {
      clearTimeout(burstStopTimeoutRef.current);
      burstStopTimeoutRef.current = null;
    }
  };

  const triggerSpamBurst = (durationMs: number) => {
    stopSpamBurst();
    triggerSpecialMessage();
    burstIntervalRef.current = window.setInterval(triggerSpecialMessage, 400);
    burstStopTimeoutRef.current = window.setTimeout(() => {
      stopSpamBurst();
    }, durationMs);
  };

  const handleDoubleClick = () => {
    triggerSpamBurst(4000);
  };

  const handleTouchStart = () => {
    const now = Date.now();
    if (now - lastTouchTimestampRef.current < 300) {
      triggerSpamBurst(4000);
    }
    lastTouchTimestampRef.current = now;
  };

  useEffect(() => {
    return () => {
      stopHoldSpam();
      stopSpamBurst();
    };
  }, []);

  // Randomly add messages from simulated users on a rolling cadence
  useEffect(() => {
    if (activeTab !== 'chat') return;

    const scheduleNext = () => {
      // Random interval between 400ms and 1600ms for lively chat
      const delay = 400 + Math.random() * 1200;
      generatorTimerRef.current = window.setTimeout(() => {
        const user = simulatedUsers[Math.floor(Math.random() * simulatedUsers.length)];
        // Weighted themed generation most of the time, fallback sometimes
        const useTheme = Math.random() < 0.8; // 80% themed, 20% fallback
        let text: string;
        if (useTheme) {
          const category = pickWeightedCategory();
          const base = randomItem(themeSeeds[category]);
          text = varyBySentiment(category, base);
        } else {
          text = randomItem(fallbackTemplates);
        }

        setMessages(prev => {
          const id = (Date.now() + Math.random()).toString();
          const next = [
            ...prev,
            {
              id,
              username: user.name,
              message: text,
              isStreamer: false,
              userIcon: user.icon,
            },
          ];
          // Keep only the latest 200 messages to avoid unbounded growth
          if (next.length > 200) {
            return next.slice(next.length - 200);
          }
          return next;
        });

        scheduleNext();
      }, delay);
    };

    scheduleNext();

    return () => {
      if (generatorTimerRef.current) {
        clearTimeout(generatorTimerRef.current);
        generatorTimerRef.current = null;
      }
    };
  }, [activeTab, simulatedUsers, fallbackTemplates, themeSeeds, themeEmojis, themeWeights]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 min-h-0">
              <ChatArea messages={messages} />
            </div>
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        );
      case 'about':
        return (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center">
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">About</h2>
              <p className="text-[var(--text-secondary)]">Stream information and details would go here.</p>
            </div>
          </div>
        );
      case 'clips':
        return (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center">
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">Clips</h2>
              <p className="text-[var(--text-secondary)]">Stream clips and highlights would be displayed here.</p>
            </div>
          </div>
        );
      case 'videos':
        return (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center">
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">Videos</h2>
              <p className="text-[var(--text-secondary)]">Past stream videos and VODs would be shown here.</p>
            </div>
          </div>
        );
      case 'schedule':
        return (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center">
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">Schedule</h2>
              <p className="text-[var(--text-secondary)]">Stream schedule and upcoming events would be displayed here.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="mobile-container"
      onDoubleClick={handleDoubleClick}
      onTouchStart={handleTouchStart}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div className="flex flex-col h-full">
        {/* Profile Header with Gradient Background */}
        <ProfileHeader />
        
        {/* Tab Navigation */}
        <TabNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        
        {/* Main Content Area */}
        <div className="flex-1 min-h-0 bg-black">
          {renderTabContent()}
        </div>
        
        {/* Bottom Navigation */}
        <BottomNavigation 
          activeItem={activeNavItem} 
          onItemChange={setActiveNavItem} 
        />
      </div>
    </div>
  );
}