import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';

/* ─── Animated counter ─── */
function Counter({ to, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [inView, to]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Magnetic link ─── */
function MagLink({ href, children, external }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const moveX = useTransform(x, [-40, 40], [-6, 6]);
  const moveY = useTransform(y, [-40, 40], [-4, 4]);
  const handleMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      style={{ x: moveX, y: moveY }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative group text-[0.65rem] uppercase tracking-[0.28em] text-zinc-600 transition-colors duration-200 hover:text-accent"
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute -inset-x-2 -inset-y-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: 'rgba(249,115,22,0.08)' }}
      />
    </motion.a>
  );
}

/* ─── Social icon button ─── */
function SocialBtn({ href, label, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4, scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
      style={{
        background: hovered ? 'rgba(249,115,22,0.12)' : 'rgba(255,255,255,0.03)',
        border: hovered ? '1px solid rgba(249,115,22,0.4)' : '1px solid rgba(255,255,255,0.07)',
        boxShadow: hovered ? '0 0 18px rgba(249,115,22,0.2)' : 'none',
        color: hovered ? '#ff3b30' : '#52525b',
      }}
    >
      {children}
    </motion.a>
  );
}

/* ─── Glitch Name ─── */
function GlitchName() {
  return (
    <div className="relative select-none overflow-hidden rounded-sm">
      <style>{`
        @keyframes glitch-skew {
          0%  { transform: skew(0deg); }
          4%  { transform: skew(-6deg); }
          8%  { transform: skew(5deg); }
          12% { transform: skew(-4deg); }
          16% { transform: skew(6deg); }
          20% { transform: skew(-3deg); }
          24% { transform: skew(0deg); }
          100%{ transform: skew(0deg); }
        }
        @keyframes glitch-1 {
          0%   { clip-path: inset(0 0 95% 0); transform: translate(-6px, 0); opacity: 0; }
          3%   { clip-path: inset(6% 0 78% 0); transform: translate(10px, 0); opacity: 1; }
          6%   { clip-path: inset(42% 0 38% 0); transform: translate(-9px, 0); opacity: 1; }
          9%   { clip-path: inset(70% 0 10% 0); transform: translate(8px, 0); opacity: 1; }
          12%  { clip-path: inset(24% 0 58% 0); transform: translate(-8px, 0); opacity: 1; }
          15%  { clip-path: inset(5% 0 82% 0); transform: translate(7px, 0); opacity: 1; }
          18%  { clip-path: inset(55% 0 30% 0); transform: translate(-6px, 0); opacity: 1; }
          20%  { clip-path: inset(0 0 95% 0); transform: translate(0); opacity: 0; }
          100% { clip-path: inset(0 0 95% 0); transform: translate(0); opacity: 0; }
        }
        @keyframes glitch-2 {
          0%   { clip-path: inset(90% 0 0% 0); transform: translate(6px, 0); opacity: 0; }
          3%   { clip-path: inset(62% 0 18% 0); transform: translate(-10px, 0); opacity: 1; }
          6%   { clip-path: inset(28% 0 52% 0); transform: translate(9px, 0); opacity: 1; }
          9%   { clip-path: inset(8% 0 82% 0); transform: translate(-8px, 0); opacity: 1; }
          12%  { clip-path: inset(80% 0 8% 0); transform: translate(8px, 0); opacity: 1; }
          15%  { clip-path: inset(40% 0 45% 0); transform: translate(-7px, 0); opacity: 1; }
          18%  { clip-path: inset(15% 0 70% 0); transform: translate(6px, 0); opacity: 1; }
          20%  { clip-path: inset(90% 0 0% 0); transform: translate(0); opacity: 0; }
          100% { clip-path: inset(90% 0 0% 0); transform: translate(0); opacity: 0; }
        }
        @keyframes glitch-flash {
          0%,18%,22%,100% { opacity: 0; }
          20%             { opacity: 0.08; }
        }
        .glitch-base {
          animation: glitch-skew 2s infinite linear;
        }
        .glitch-layer-1 {
          animation: glitch-1 2s infinite linear;
        }
        .glitch-layer-2 {
          animation: glitch-2 2s infinite linear;
        }
        .glitch-flash {
          animation: glitch-flash 2s infinite linear;
        }
        .glitch-text {
          font-size: clamp(1.4rem, 5.2vw, 2.4rem);
          letter-spacing: -0.02em;
        }
        @media (max-width: 640px) {
          .glitch-base {
            animation: glitch-skew 2.2s infinite linear;
          }
          .glitch-layer-1,
          .glitch-layer-2,
          .glitch-flash {
            animation-duration: 2.2s;
          }
          .glitch-layer-1 {
            animation-name: glitch-1-smooth;
          }
          .glitch-layer-2 {
            animation-name: glitch-2-smooth;
          }
        }
        @keyframes glitch-1-smooth {
          0%   { clip-path: inset(0 0 95% 0); transform: translate(-4px, 0); opacity: 0; }
          4%   { clip-path: inset(10% 0 70% 0); transform: translate(4px, 0); opacity: 0.9; }
          8%   { clip-path: inset(40% 0 45% 0); transform: translate(-3px, 0); opacity: 0.9; }
          12%  { clip-path: inset(65% 0 15% 0); transform: translate(3px, 0); opacity: 0.9; }
          16%  { clip-path: inset(20% 0 60% 0); transform: translate(-2px, 0); opacity: 0.9; }
          20%  { clip-path: inset(0 0 95% 0); transform: translate(0); opacity: 0; }
          100% { clip-path: inset(0 0 95% 0); transform: translate(0); opacity: 0; }
        }
        @keyframes glitch-2-smooth {
          0%   { clip-path: inset(90% 0 0% 0); transform: translate(4px, 0); opacity: 0; }
          4%   { clip-path: inset(58% 0 22% 0); transform: translate(-4px, 0); opacity: 0.9; }
          8%   { clip-path: inset(28% 0 55% 0); transform: translate(3px, 0); opacity: 0.9; }
          12%  { clip-path: inset(8% 0 82% 0); transform: translate(-3px, 0); opacity: 0.9; }
          16%  { clip-path: inset(75% 0 10% 0); transform: translate(2px, 0); opacity: 0.9; }
          20%  { clip-path: inset(90% 0 0% 0); transform: translate(0); opacity: 0; }
          100% { clip-path: inset(90% 0 0% 0); transform: translate(0); opacity: 0; }
        }
      `}</style>

      {/* Base name */}
      <div className="glitch-base">
        <h3
          className="glitch-text font-black uppercase leading-none"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #ff3b30 45%, #ff3b30 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Vedant
        </h3>
        <h3
          className="glitch-text font-black uppercase leading-none"
          style={{
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(249,115,22,0.4)',
          }}
        >
          Trivedi
        </h3>
      </div>

      {/* Glitch layer 1 — cyan offset */}
      <div
        className="glitch-layer-1 absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <h3
          className="glitch-text font-black uppercase leading-none"
          style={{ color: '#22d3ee', opacity: 0.75 }}
        >
          Vedant
        </h3>
        <h3
          className="glitch-text font-black uppercase leading-none"
          style={{ color: '#22d3ee', opacity: 0.75 }}
        >
          Trivedi
        </h3>
      </div>

      {/* Glitch layer 2 — orange/red offset */}
      <div
        className="glitch-layer-2 absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <h3
          className="glitch-text font-black uppercase leading-none"
          style={{ color: '#ff3b30', opacity: 0.75 }}
        >
          Vedant
        </h3>
        <h3
          className="glitch-text font-black uppercase leading-none"
          style={{ color: '#ff3b30', opacity: 0.75 }}
        >
          Trivedi
        </h3>
      </div>

      {/* Soft flash overlay */}
      <div
        className="glitch-flash absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(120deg, rgba(255,255,255,0.18), rgba(255,255,255,0))',
          filter: 'blur(2px)',
        }}
        aria-hidden="true"
      />
    </div>
  );
}

export function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const navLinks = [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Policies', href: '/policies' },
  ];

  const stats = [
    { value: 500, suffix: '+', label: 'Styles' },
    { value: 8, suffix: '+', label: 'Brands' },
    { value: 10, suffix: 'K+', label: 'Happy Cops' },
  ];

  return (
    <footer
      ref={ref}
      role="contentinfo"
      className="relative mt-16 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, transparent 0%, #0a0a0a 18%, #080808 100%)',
        borderTop: '1px solid rgba(249,115,22,0.12)',
      }}
    >
      {/* Top orange glow line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.55), transparent)' }}
      />

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage: 'linear-gradient(rgba(249,115,22,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.7) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(249,115,22,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative px-6 sm:px-10 pt-12 pb-8 space-y-10">

        {/* ── Brand + tagline ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center gap-3"
        >
          {/* Logo wordmark */}
          <div className="relative">
            <h2
              className="text-[3rem] sm:text-[4rem] font-black uppercase leading-none tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #ff3b30 50%, #ff3b30 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Lace Up
            </h2>
            <h2
              className="text-[3rem] sm:text-[4rem] font-black uppercase leading-none tracking-tight"
              style={{
                color: 'transparent',
                WebkitTextStroke: '1.5px rgba(249,115,22,0.35)',
              }}
            >
              Labs
            </h2>
            {/* Underline accent */}
            <motion.div
              className="mx-auto h-0.5 rounded-full mt-1"
              style={{ background: 'linear-gradient(90deg, transparent, #ff3b30, #ff3b30, transparent)' }}
              initial={{ width: 0 }}
              animate={inView ? { width: '100%' } : {}}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            />
          </div>

          <p className="text-[0.62rem] uppercase tracking-[0.4em] text-zinc-600 mt-1">
            Always Wear Your Drip
          </p>
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-0"
        >
          {stats.map((s, i) => (
            <div key={s.label} className="flex items-center">
              <div className="flex flex-col items-center px-8 py-3 gap-0.5">
                <span
                  className="text-2xl font-black leading-none"
                  style={{ color: '#ff3b30' }}
                >
                  <Counter to={s.value} suffix={s.suffix} />
                </span>
                <span className="text-[0.5rem] uppercase tracking-[0.32em] text-zinc-600">{s.label}</span>
              </div>
              {i < stats.length - 1 && (
                <div className="w-px h-8 self-center" style={{ background: 'rgba(249,115,22,0.2)' }} />
              )}
            </div>
          ))}
        </motion.div>

        {/* ── Divider ── */}
        <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.2), transparent)' }} />

        {/* ── Nav + Social ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          {/* Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {navLinks.map(l => (
              <MagLink key={l.label} href={l.href}>{l.label}</MagLink>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {/* Instagram */}
            <SocialBtn href="https://www.instagram.com/vedant_trivedi_8" label="Instagram">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
            </SocialBtn>
            {/* X / Twitter */}
            <SocialBtn href="https://x.com" label="X">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.265 5.638L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </SocialBtn>
            {/* GitHub */}
            <SocialBtn href="https://github.com/Vedant08-blip/Lace-Up-Labs" label="GitHub">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </SocialBtn>
          </div>
        </motion.div>

        {/* ── DEVELOPER CREDIT — the hero piece ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl px-6 py-5 overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #1a1a1a 0%, #111 60%, #0e0e0e 100%)',
            border: '1px solid rgba(249,115,22,0.25)',
            boxShadow: '0 0 40px rgba(249,115,22,0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          {/* Inner top sheen */}
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.09), transparent)' }}
          />

          {/* Corner brackets */}
          {['top-0 left-0 border-t-2 border-l-2 rounded-tl-2xl',
            'top-0 right-0 border-t-2 border-r-2 rounded-tr-2xl',
            'bottom-0 left-0 border-b-2 border-l-2 rounded-bl-2xl',
            'bottom-0 right-0 border-b-2 border-r-2 rounded-br-2xl',
          ].map((cls, i) => (
            <span key={i} className={`absolute w-5 h-5 ${cls} border-accent/50 pointer-events-none`} />
          ))}

          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,1) 2px, rgba(0,0,0,1) 4px)',
            }}
          />

          {/* Animated left bar */}
          <motion.div
            className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full"
            style={{ background: 'linear-gradient(180deg, transparent, #ff3b30, transparent)' }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col gap-1.5 items-center sm:items-start text-center sm:text-left">
              {/* Label */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#ff3b30' }} />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: '#ff3b30' }} />
                </span>
                <p className="text-[0.5rem] uppercase tracking-[0.42em] text-zinc-600">
                  Crafted &amp; Engineered by
                </p>
              </div>

              {/* Name — the main event */}
              <div className="w-full flex justify-center sm:justify-start">
                <GlitchName />
              </div>
            </div>

            {/* Right side badges */}
            <div className="flex flex-col items-center sm:items-end gap-2">
              {[
                { icon: '⚡', text: 'Full Stack Dev' },
                { icon: '🎨', text: 'UI / UX Design' },
                { icon: '👟', text: 'Sneaker Enthusiast' },
              ].map((badge) => (
                <motion.div
                  key={badge.text}
                  whileHover={{ x: -4, scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 rounded-xl px-3 py-1.5"
                  style={{
                    background: 'rgba(249,115,22,0.07)',
                    border: '1px solid rgba(249,115,22,0.18)',
                  }}
                >
                  <span className="text-sm leading-none">{badge.icon}</span>
                  <span className="text-[0.55rem] uppercase tracking-[0.24em] font-semibold" style={{ color: '#ff3b30' }}>
                    {badge.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Copyright ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-2"
        >
          <p className="text-[0.52rem] uppercase tracking-[0.3em] text-zinc-700">
            © {new Date().getFullYear()} Lace Up Labs. All rights reserved.
          </p>
          <p
            className="text-[0.52rem] uppercase tracking-[0.3em]"
            style={{ color: 'rgba(249,115,22,0.35)' }}
          >
            Always Wear Your Drip ✦
          </p>
        </motion.div>

      </div>
    </footer>
  );
}

export default Footer;
