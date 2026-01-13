'use client';

import { useEffect, useState } from 'react';

interface IPhoneMockupProps {
  isActive: boolean;
  opacity?: number;
}

// Notification data type
interface NotificationData {
  id: number;
  type: 'stripe' | 'cash';
  appName: string;
  title: string;
  body: string;
  amount: number;
  time: string;
}

// Single notification card - Arctic Silver theme
const NotificationCard = ({
  type,
  appName,
  title,
  body,
  time,
  isNew,
  isLastVisible,
  isExiting,
}: Omit<NotificationData, 'id' | 'amount'> & { isNew: boolean; isLastVisible: boolean; isExiting: boolean }) => {
  // Base card style - starts invisible, animation or inline styles make it visible
  const cardStyle: React.CSSProperties = {
    background: 'rgba(15, 15, 20, 0.65)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(226, 232, 240, 0.15)',
    borderRadius: isLastVisible ? '6px 6px 2px 2px' : 6,
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4), 0 0 40px rgba(226, 232, 240, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
    padding: 14,
    fontFamily: "'Inter', sans-serif",
    position: 'relative',
    overflow: 'hidden',
    minHeight: 88,
    flexShrink: 0,
    isolation: 'isolate',
    // Initial state (invisible) - overridden by animation or inline styles
    opacity: isNew ? 0 : (isExiting ? 0.25 : 1),
    transform: isNew ? 'translateY(-50px) scale(0.92)' : (isExiting ? 'translateY(10px) scale(0.98)' : 'translateY(0) scale(1)'),
    // Animation for new cards
    animation: isNew ? 'arcticNotifSlide 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' : undefined,
    // Transition for existing cards moving/exiting
    transition: isNew ? undefined : 'all 0.4s ease',
  };

  const highlightStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: '20%',
    right: '20%',
    height: 1,
    background: 'linear-gradient(90deg, transparent 0%, rgba(226, 232, 240, 0.3) 50%, transparent 100%)',
  };

  const glowStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    background: 'radial-gradient(ellipse at 50% 0%, rgba(226, 232, 240, 0.06) 0%, transparent 70%)',
    pointerEvents: 'none',
  };

  const iconStyle: React.CSSProperties = {
    flexShrink: 0,
    width: 40,
    height: 40,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    background: type === 'stripe'
      ? 'linear-gradient(135deg, rgba(99, 91, 255, 0.25) 0%, rgba(99, 91, 255, 0.1) 100%)'
      : 'linear-gradient(135deg, rgba(0, 212, 75, 0.2) 0%, rgba(0, 212, 75, 0.08) 100%)',
    border: type === 'stripe'
      ? '1px solid rgba(99, 91, 255, 0.4)'
      : '1px solid rgba(0, 212, 75, 0.35)',
  };

  const iconSymbolStyle: React.CSSProperties = {
    fontSize: 20,
    fontWeight: 700,
    fontFamily: "'Inter', sans-serif",
    background: type === 'stripe'
      ? 'linear-gradient(135deg, #a5b4fc 0%, #818cf8 100%)'
      : 'linear-gradient(135deg, #6ee7b7 0%, #34d399 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    transform: type === 'cash' ? 'rotate(12deg)' : undefined,
    display: 'inline-block',
  };

  return (
    <div style={cardStyle}>
      <div style={highlightStyle} />
      <div style={glowStyle} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative', zIndex: 1, height: '100%' }}>
        <div style={iconStyle}>
          <span style={iconSymbolStyle}>{type === 'stripe' ? 'S' : '$'}</span>
        </div>
        <div style={{ flex: 1, minWidth: 0, paddingTop: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(226, 232, 240, 0.9)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {appName}
            </span>
            <span style={{ fontSize: 11, color: 'rgba(226, 232, 240, 0.6)', fontWeight: 500 }}>{time}</span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#ffffff', marginBottom: 2, lineHeight: 1.2, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
            {title}
          </div>
          <div
            style={{ fontSize: 13, color: 'rgba(226, 232, 240, 0.9)', lineHeight: 1.35, fontWeight: 400 }}
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </div>
      </div>
    </div>
  );
};

// Notification Stack with Arctic Silver styling
const NotificationStack = ({ isActive, onNotificationAdd }: { isActive: boolean; onNotificationAdd: (amount: number) => void }) => {
  const [notifications, setNotifications] = useState<{ data: NotificationData; isNew: boolean }[]>([]);
  const [allLoaded, setAllLoaded] = useState(false);
  const maxVisible = 4;

  const allNotifications: (Omit<NotificationData, 'id'> & { delay: number })[] = [
    { type: 'stripe', appName: 'Stripe', title: 'Payment Received', body: 'You received <span class="money-amount" style="font-weight:700;color:#fff;text-shadow:0 0 20px rgba(255,255,255,0.4)">$2,450.00</span> from Client', amount: 2450, time: 'now', delay: 400 },
    { type: 'cash', appName: 'Cash App', title: 'Money Received!', body: '<span class="money-amount" style="font-weight:700;color:#fff;text-shadow:0 0 20px rgba(255,255,255,0.4)">$847.00</span> from Alex is now available', amount: 847, time: '1m', delay: 1100 },
    { type: 'stripe', appName: 'Stripe', title: 'New Subscription', body: 'Premium plan • <span class="money-amount" style="font-weight:700;color:#fff;text-shadow:0 0 20px rgba(255,255,255,0.4)">$199.00</span>/month', amount: 199, time: '2m', delay: 1800 },
    { type: 'cash', appName: 'Cash App', title: 'Large Transfer!', body: '<span class="money-amount" style="font-weight:700;color:#fff;text-shadow:0 0 20px rgba(255,255,255,0.4)">$5,280.00</span> deposited', amount: 5280, time: 'now', delay: 2400 },
    { type: 'stripe', appName: 'Stripe', title: 'Invoice Paid', body: 'Client paid <span class="money-amount" style="font-weight:700;color:#fff;text-shadow:0 0 20px rgba(255,255,255,0.4)">$12,750.00</span>', amount: 12750, time: 'now', delay: 2900 },
    { type: 'cash', appName: 'Cash App', title: 'Bonus Received!', body: '<span class="money-amount" style="font-weight:700;color:#fff;text-shadow:0 0 20px rgba(255,255,255,0.4)">$8,400.00</span> from Partner', amount: 8400, time: 'now', delay: 3350 },
    { type: 'stripe', appName: 'Stripe', title: 'Enterprise Deal', body: 'Contract signed • <span class="money-amount" style="font-weight:700;color:#fff;text-shadow:0 0 20px rgba(255,255,255,0.4)">$24,999.00</span>', amount: 24999, time: 'now', delay: 3750 },
    { type: 'cash', appName: 'Cash App', title: 'Investment Return', body: '<span class="money-amount" style="font-weight:700;color:#fff;text-shadow:0 0 20px rgba(255,255,255,0.4)">$47,500.00</span> credited', amount: 47500, time: 'now', delay: 4100 },
    { type: 'stripe', appName: 'Stripe', title: 'Milestone Reached!', body: 'Total revenue: <span class="money-amount" style="font-weight:700;color:#fff;text-shadow:0 0 20px rgba(255,255,255,0.4)">$100,000+</span>', amount: 0, time: 'now', delay: 4450 },
  ];

  useEffect(() => {
    if (!isActive) {
      setNotifications([]);
      setAllLoaded(false);
      return;
    }

    const timers: NodeJS.Timeout[] = [];

    allNotifications.forEach((notif, index) => {
      const timer = setTimeout(() => {
        const newId = Date.now() + index;
        const newNotif: NotificationData = {
          id: newId,
          type: notif.type,
          appName: notif.appName,
          title: notif.title,
          body: notif.body,
          amount: notif.amount,
          time: notif.time,
        };

        // Add new notification and mark all existing ones as not new
        setNotifications(prev => {
          const updated = prev.map(n => ({ ...n, isNew: false }));
          return [{ data: newNotif, isNew: true }, ...updated];
        });

        onNotificationAdd(notif.amount);

        // After animation completes, mark as not new
        setTimeout(() => {
          setNotifications(prev =>
            prev.map(n => n.data.id === newId ? { ...n, isNew: false } : n)
          );
        }, 550);
      }, notif.delay);
      timers.push(timer);
    });

    // After the last notification + animation time, mark all as loaded (resting state)
    const lastDelay = allNotifications[allNotifications.length - 1].delay;
    const allLoadedTimer = setTimeout(() => {
      setAllLoaded(true);
    }, lastDelay + 600); // 600ms after last notification for animation to complete
    timers.push(allLoadedTimer);

    return () => timers.forEach(t => clearTimeout(t));
  }, [isActive]);

  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    top: 120,
    left: 12,
    right: 12,
    height: 420,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    zIndex: 2,
  };

  // Only show maxVisible notifications
  const visibleNotifs = notifications.slice(0, maxVisible);

  return (
    <div style={containerStyle}>
      {visibleNotifs.map((notif, index) => {
        const isLastVisible = index === visibleNotifs.length - 1;
        // Only apply exit effect while notifications are still coming in
        const isExiting = !allLoaded && index === maxVisible - 1 && notifications.length > maxVisible;

        return (
          <NotificationCard
            key={notif.data.id}
            type={notif.data.type}
            appName={notif.data.appName}
            title={notif.data.title}
            body={notif.data.body}
            time={notif.data.time}
            isNew={notif.isNew}
            isLastVisible={isLastVisible}
            isExiting={isExiting}
          />
        );
      })}
    </div>
  );
};

// Gauge Widget
const GaugeWidget = ({ totalReceived, notificationCount, totalNotifications }: { totalReceived: number; notificationCount: number; totalNotifications: number }) => {
  const maxTotal = 110000;
  const progress = Math.min(totalReceived / maxTotal, 1);
  const circumference = 2 * Math.PI * 28;
  const arcLength = circumference * 0.75;
  const fillLength = arcLength * progress;
  const percentChange = ((notificationCount / totalNotifications) * 100).toFixed(0);

  const formatMoney = (amount: number) => {
    if (amount >= 1000) {
      return (amount / 1000).toFixed(1) + 'K';
    }
    return amount.toFixed(0);
  };

  const widgetStyle: React.CSSProperties = {
    width: '100%',
    height: 82,
    background: 'rgba(10, 10, 15, 0.65)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(226, 232, 240, 0.15)',
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 16px',
    gap: 16,
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
  };

  return (
    <div style={widgetStyle}>
      {/* Top highlight */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '10%',
        right: '10%',
        height: 1,
        background: 'linear-gradient(90deg, transparent 0%, rgba(226, 232, 240, 0.25) 50%, transparent 100%)',
      }} />
      {/* Corner accent */}
      <div style={{
        position: 'absolute',
        top: 8,
        left: 8,
        width: 8,
        height: 8,
        borderLeft: '1px solid rgba(226, 232, 240, 0.15)',
        borderTop: '1px solid rgba(226, 232, 240, 0.15)',
      }} />

      {/* Gauge SVG */}
      <svg width={58} height={58} viewBox="0 0 70 70" style={{ flexShrink: 0 }}>
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        {/* Background arc */}
        <circle
          cx="35"
          cy="35"
          r="28"
          fill="none"
          stroke="rgba(226, 232, 240, 0.1)"
          strokeWidth="5"
          strokeDasharray="131.95 175.93"
          transform="rotate(135, 35, 35)"
        />
        {/* Fill arc */}
        <circle
          cx="35"
          cy="35"
          r="28"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={`${fillLength} ${circumference}`}
          transform="rotate(135, 35, 35)"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(226, 232, 240, 0.5))',
            transition: 'stroke-dasharray 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        />
      </svg>

      {/* Gauge info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 9, fontWeight: 500, color: 'rgba(226, 232, 240, 0.7)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 3 }}>
            Total Received
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, color: '#ffffff', fontFamily: "'JetBrains Mono', monospace", textShadow: '0 0 25px rgba(226, 232, 240, 0.5)', lineHeight: 1 }}>
            <span style={{ fontSize: 13, fontWeight: 400, color: 'rgba(226, 232, 240, 0.8)' }}>$</span>
            {formatMoney(totalReceived)}
          </div>
        </div>
        <div style={{ width: 1, height: 36, background: 'linear-gradient(180deg, transparent 0%, rgba(226, 232, 240, 0.2) 50%, transparent 100%)' }} />
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 9, fontWeight: 500, color: 'rgba(226, 232, 240, 0.7)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 3 }}>
            Progress
          </div>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#6ee7b7', fontFamily: "'JetBrains Mono', monospace", textShadow: '0 0 15px rgba(110, 231, 183, 0.5)' }}>
            +{percentChange}%
          </div>
        </div>
      </div>
    </div>
  );
};

// Bullmode Logo SVG
const BullmodeLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))', color: '#e2e8f0' }}>
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

// Fingerprint Icon SVG
const FingerprintIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" style={{ width: '70%', height: '70%', filter: 'drop-shadow(0 0 8px rgba(226, 232, 240, 0.4))' }}>
    <path d="M50 20 C65 20 80 35 80 50 C80 65 65 80 50 80 C35 80 20 65 20 50 C20 35 35 20 50 20 Z" strokeOpacity="0.3" strokeWidth="2" />
    <path d="M50 26 C62 26 74 38 74 50 C74 62 62 74 50 74 C38 74 26 62 26 50 C26 38 38 26 50 26 Z" strokeOpacity="0.5" strokeWidth="2.5" />
    <path d="M50 32 C59 32 68 41 68 50 C68 59 59 68 50 68 C41 68 32 59 32 50 C32 41 41 32 50 32 Z" strokeOpacity="0.7" strokeWidth="2.5" />
    <path d="M50 38 C56 38 62 44 62 50 C62 56 56 62 50 62 C44 62 38 56 38 50 C38 44 44 38 50 38 Z" strokeOpacity="0.9" strokeWidth="2.5" />
    <path d="M50 44 C53 44 56 47 56 50 C56 53 53 56 50 56 C47 56 44 53 44 50 C44 47 47 44 50 44 Z" strokeOpacity="1" strokeWidth="3" />
    <path d="M50 15 C30 15 10 35 10 55" strokeDasharray="5 5" opacity="0.4" />
    <path d="M90 55 C90 35 70 15 50 15" strokeDasharray="5 5" opacity="0.4" />
  </svg>
);

// Inject keyframe animations into document
const injectStyles = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById('iphone-mockup-arctic-styles')) return;

  const style = document.createElement('style');
  style.id = 'iphone-mockup-arctic-styles';
  style.textContent = `
    @keyframes arcticFadeIn {
      0% {
        opacity: 0;
        transform: scale(1.02) translateY(30px);
        filter: blur(10px);
      }
      100% {
        opacity: 1;
        transform: scale(1) translateY(0);
        filter: blur(0);
      }
    }

    @keyframes arcticNotifSlide {
      0% {
        opacity: 0;
        transform: translateY(-50px) scale(0.92);
        filter: blur(8px);
      }
      50% {
        opacity: 1;
        filter: blur(0);
      }
      75% {
        transform: translateY(4px) scale(1.01);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes arcticSlideShimmer {
      0% { background-position: -200px 0; }
      40%, 100% { background-position: 300px 0; }
    }

    @keyframes arcticGlow {
      0%, 100% {
        opacity: 0.6;
      }
      50% {
        opacity: 1;
      }
    }

    @keyframes arcticTimePulse {
      0%, 100% {
        text-shadow: 0 0 30px rgba(226, 232, 240, 0.3);
      }
      50% {
        text-shadow: 0 0 50px rgba(226, 232, 240, 0.5), 0 0 80px rgba(226, 232, 240, 0.2);
      }
    }

    @keyframes logoPulse {
      0%, 100% {
        filter: drop-shadow(0 0 8px rgba(226, 232, 240, 0.3));
        opacity: 0.8;
      }
      50% {
        filter: drop-shadow(0 0 20px rgba(226, 232, 240, 0.6));
        opacity: 1;
      }
    }

    @keyframes fingerprintPulse {
      0%, 100% {
        opacity: 0.6;
        transform: scale(1);
        filter: drop-shadow(0 0 5px rgba(226, 232, 240, 0.2));
      }
      50% {
        opacity: 1;
        transform: scale(1.04);
        filter: drop-shadow(0 0 15px rgba(226, 232, 240, 0.6));
      }
    }
  `;
  document.head.appendChild(style);
};

export default function IPhoneMockup({ isActive, opacity = 1 }: IPhoneMockupProps) {
  const [time, setTime] = useState('12:42');
  const [date, setDate] = useState('Wednesday, Dec 25');
  const [totalReceived, setTotalReceived] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);

  // Inject CSS animations
  useEffect(() => {
    injectStyles();
  }, []);

  // Reset state when isActive changes
  useEffect(() => {
    if (!isActive) {
      setTotalReceived(0);
      setNotificationCount(0);
    }
  }, [isActive]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);

      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      setDate(`${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleNotificationAdd = (amount: number) => {
    setTotalReceived(prev => prev + amount);
    setNotificationCount(prev => prev + 1);
  };

  if (!isActive) return null;

  // iPhone Wrapper
  const wrapperStyle: React.CSSProperties = {
    width: 800,
    height: 700,
    position: 'relative',
    perspective: 6000,
    animation: 'arcticFadeIn 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
    opacity,
  };

  // iPhone Container - 3D transformed
  const containerStyle: React.CSSProperties = {
    height: 760,
    width: 372,
    position: 'absolute',
    left: 220,
    top: -40,
    transform: 'rotateX(35deg) rotateZ(-32deg)',
    transformStyle: 'preserve-3d',
  };

  // Ethereal glow shadow
  const shadowStyle: React.CSSProperties = {
    width: 360,
    height: 760,
    background: 'radial-gradient(ellipse at center, rgba(226, 232, 240, 0.15) 0%, transparent 60%)',
    position: 'absolute',
    top: 25,
    left: 15,
    transform: 'translateZ(-40px)',
    filter: 'blur(50px)',
    animation: 'arcticGlow 4s ease-in-out infinite',
  };

  // Back depth layer
  const depthStyle: React.CSSProperties = {
    width: 372,
    height: 760,
    position: 'absolute',
    background: 'linear-gradient(145deg, #1a1a1f 0%, #0a0a0c 100%)',
    borderRadius: 45,
    transform: 'translateZ(-8px)',
    boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.03), inset 0 -2px 4px rgba(0, 0, 0, 0.5)',
  };

  // Side edge
  const edgeStyle: React.CSSProperties = {
    width: 374,
    height: 762,
    position: 'absolute',
    left: -1,
    top: -1,
    background: 'linear-gradient(135deg, rgba(100, 100, 110, 0.4) 0%, rgba(60, 60, 70, 0.3) 20%, rgba(40, 40, 50, 0.4) 50%, rgba(60, 60, 70, 0.3) 80%, rgba(100, 100, 110, 0.4) 100%)',
    borderRadius: 46,
    transform: 'translateZ(-4px)',
    boxShadow: 'inset 1px 1px 2px rgba(255, 255, 255, 0.1), inset -1px -1px 2px rgba(0, 0, 0, 0.3)',
  };

  // Frame
  const frameStyle: React.CSSProperties = {
    width: 372,
    height: 760,
    position: 'absolute',
    background: 'linear-gradient(145deg, rgba(148, 163, 184, 0.12) 0%, rgba(226, 232, 240, 0.06) 30%, rgba(148, 163, 184, 0.08) 70%, rgba(226, 232, 240, 0.12) 100%)',
    border: '1px solid rgba(226, 232, 240, 0.15)',
    borderRadius: 44,
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 0 rgba(0, 0, 0, 0.2), 0 0 80px rgba(226, 232, 240, 0.08)',
    transform: 'translateZ(-1px)',
    overflow: 'hidden',
  };

  // Corner accent style generator
  const cornerAccentBase: React.CSSProperties = {
    position: 'absolute',
    width: 12,
    height: 12,
    border: '1px solid rgba(226, 232, 240, 0.2)',
  };

  // Front face
  const frontStyle: React.CSSProperties = {
    width: 362,
    height: 750,
    position: 'absolute',
    background: '#000000',
    left: 5,
    top: 5,
    border: '1px solid rgba(226, 232, 240, 0.08)',
    borderRadius: 40,
    boxShadow: 'inset 0 0 80px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
    transform: 'translateZ(1px)',
    overflow: 'hidden',
    isolation: 'isolate',
  };

  // Notch (Dynamic Island style)
  const notchStyle: React.CSSProperties = {
    position: 'absolute',
    top: 18,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 90,
    height: 28,
    background: '#000',
    borderRadius: 14,
    border: '1px solid rgba(226, 232, 240, 0.06)',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
    zIndex: 10,
  };

  // Home indicator
  const homeIndicatorStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 12,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 120,
    height: 5,
    background: 'linear-gradient(90deg, transparent 0%, rgba(226, 232, 240, 0.25) 50%, transparent 100%)',
    borderRadius: 3,
    zIndex: 10,
  };

  // Screen
  const screenStyle: React.CSSProperties = {
    backgroundImage: 'url("/assets/bullWallpaper.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#000',
    width: 340,
    height: 700,
    position: 'absolute',
    top: 25,
    left: 11,
    overflow: 'hidden',
    fontFamily: "'Inter', sans-serif",
    borderRadius: 36,
    isolation: 'isolate',
  };

  // Screen overlay
  const screenOverlayStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.4) 100%)',
    pointerEvents: 'none',
  };

  // Time
  const timeStyle: React.CSSProperties = {
    fontSize: 58,
    position: 'absolute',
    top: 28,
    left: '50%',
    transform: 'translateX(-50%)',
    fontWeight: 200,
    fontFamily: "'Outfit', sans-serif",
    background: 'linear-gradient(180deg, #ffffff 0%, #e2e8f0 50%, #94a3b8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '-0.02em',
    animation: 'arcticTimePulse 4s ease-in-out infinite',
    zIndex: 2,
  };

  // Date
  const dateStyle: React.CSSProperties = {
    fontSize: 13,
    position: 'absolute',
    top: 92,
    left: '50%',
    transform: 'translateX(-50%)',
    fontWeight: 400,
    color: 'rgba(226, 232, 240, 0.8)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    fontFamily: "'Inter', sans-serif",
    whiteSpace: 'nowrap',
    zIndex: 2,
  };

  // Status signal
  const signalStyle: React.CSSProperties = {
    position: 'absolute',
    top: 14,
    left: 28,
    display: 'flex',
    gap: 3,
    alignItems: 'flex-end',
    zIndex: 2,
  };

  const signalBarStyle = (height: number, opacity: number = 1): React.CSSProperties => ({
    width: 3,
    height,
    background: `rgba(226, 232, 240, ${opacity * 0.9})`,
    borderRadius: 1,
  });

  // Battery
  const batteryStyle: React.CSSProperties = {
    position: 'absolute',
    top: 12,
    right: 28,
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    fontSize: 12,
    color: 'rgba(226, 232, 240, 0.9)',
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    zIndex: 2,
  };

  const batteryBodyStyle: React.CSSProperties = {
    width: 24,
    height: 11,
    border: '1.5px solid rgba(226, 232, 240, 0.6)',
    borderRadius: 3,
    position: 'relative',
  };

  const batteryLevelStyle: React.CSSProperties = {
    width: 17,
    height: 7,
    background: 'linear-gradient(90deg, rgba(148, 163, 184, 0.8), rgba(226, 232, 240, 1))',
    borderRadius: 1,
    position: 'absolute',
    top: 1,
    left: 1,
  };

  const batteryCapStyle: React.CSSProperties = {
    position: 'absolute',
    right: -4,
    top: 2,
    width: 2,
    height: 5,
    background: 'rgba(226, 232, 240, 0.6)',
    borderRadius: '0 1px 1px 0',
  };

  // Bottom widgets area
  const bottomWidgetsStyle: React.CSSProperties = {
    position: 'absolute',
    top: 500,
    left: 12,
    right: 12,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 2,
  };

  // Action bar
  const actionBarStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 28,
    left: 20,
    right: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  };

  // Logo container
  const logoStyle: React.CSSProperties = {
    width: 94,
    height: 94,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    animation: 'logoPulse 4s ease-in-out infinite',
  };

  // Slide to unlock
  const slideUnlockStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    background: 'linear-gradient(90deg, rgba(148, 163, 184, 0.3) 0%, rgba(148, 163, 184, 0.3) 40%, #ffffff 50%, rgba(148, 163, 184, 0.3) 60%, rgba(148, 163, 184, 0.3) 100%)',
    backgroundSize: '500px 100%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    whiteSpace: 'nowrap',
    animation: 'arcticSlideShimmer 4s linear infinite',
    fontFamily: "'Inter', sans-serif",
    marginTop: 10,
  };

  // Fingerprint container
  const fingerprintStyle: React.CSSProperties = {
    width: 94,
    height: 94,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'fingerprintPulse 4s ease-in-out infinite',
    animationDelay: '2s',
  };

  return (
    <div style={wrapperStyle}>
      <div style={containerStyle}>
        {/* Ethereal glow shadow */}
        <div style={shadowStyle} />

        {/* Back depth layer */}
        <div style={depthStyle} />

        {/* Side edge */}
        <div style={edgeStyle} />

        {/* Frame */}
        <div style={frameStyle}>
          {/* Corner accents */}
          <div style={{ ...cornerAccentBase, top: 16, left: 16, borderRight: 'none', borderBottom: 'none' }} />
          <div style={{ ...cornerAccentBase, top: 16, right: 16, borderLeft: 'none', borderBottom: 'none' }} />
          <div style={{ ...cornerAccentBase, bottom: 16, left: 16, borderRight: 'none', borderTop: 'none' }} />
          <div style={{ ...cornerAccentBase, bottom: 16, right: 16, borderLeft: 'none', borderTop: 'none' }} />
        </div>

        {/* Front face */}
        <div style={frontStyle}>
          {/* Notch */}
          <div style={notchStyle} />

          {/* Home indicator */}
          <div style={homeIndicatorStyle} />

          {/* Screen */}
          <div style={screenStyle}>
            {/* Dark overlay */}
            <div style={screenOverlayStyle} />

            {/* Status bar - signal */}
            <div style={signalStyle}>
              <div style={signalBarStyle(4)} />
              <div style={signalBarStyle(6)} />
              <div style={signalBarStyle(8)} />
              <div style={signalBarStyle(10, 0.3)} />
            </div>

            {/* Status bar - battery */}
            <div style={batteryStyle}>
              <span>86%</span>
              <div style={batteryBodyStyle}>
                <div style={batteryLevelStyle} />
                <div style={batteryCapStyle} />
              </div>
            </div>

            {/* Time */}
            <div style={timeStyle}>{time}</div>

            {/* Date */}
            <div style={dateStyle}>{date}</div>

            {/* Notifications container */}
            <NotificationStack isActive={isActive} onNotificationAdd={handleNotificationAdd} />

            {/* Bottom widgets area - gauge */}
            <div style={bottomWidgetsStyle}>
              <GaugeWidget totalReceived={totalReceived} notificationCount={notificationCount} totalNotifications={9} />
            </div>

            {/* Action bar: Logo, Slide Text, Fingerprint */}
            <div style={actionBarStyle}>
              {/* Bullmode Logo (Left) */}
              <div style={logoStyle}>
                <BullmodeLogo />
              </div>

              {/* Slide to Unlock (Center) */}
              <div style={slideUnlockStyle}>slide to unlock</div>

              {/* Fingerprint Icon (Right) */}
              <div style={fingerprintStyle}>
                <FingerprintIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
