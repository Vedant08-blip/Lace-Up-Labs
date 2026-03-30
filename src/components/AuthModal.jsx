import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const SkullIcon = () => (
  <svg viewBox="0 0 100 100" width="72" height="72" xmlns="http://www.w3.org/2000/svg">
    <style>{`
      .skull-main { fill: #e8e0d0; }
      .skull-shadow { fill: #c8bfaf; }
      .skull-dark { fill: #1a1512; }
      .skull-eye { fill: #1a1512; }
      .skull-gleam { fill: #fff; opacity: 0.6; }
      @keyframes skullPulse {
        0%, 100% { transform: scale(1); filter: drop-shadow(0 0 6px #ff3b3b44); }
        50% { transform: scale(1.04); filter: drop-shadow(0 0 18px #ff3b3b88); }
      }
      .skull-group { animation: skullPulse 3s ease-in-out infinite; transform-origin: 50px 50px; }
      @keyframes eyeGlow {
        0%, 100% { fill: #1a1512; }
        50% { fill: #cc1111; filter: drop-shadow(0 0 4px #ff0000); }
      }
      .skull-eye { animation: eyeGlow 3s ease-in-out infinite; }
    `}</style>
    <g className="skull-group">
      <ellipse cx="50" cy="44" rx="30" ry="28" className="skull-main" />
      <ellipse cx="50" cy="44" rx="28" ry="26" className="skull-shadow" opacity="0.2" />
      <rect x="36" y="64" width="28" height="14" rx="3" className="skull-main" />
      <rect x="39" y="66" width="7" height="10" rx="1" className="skull-dark" />
      <rect x="48" y="66" width="4" height="10" rx="1" className="skull-dark" />
      <rect x="54" y="66" width="7" height="10" rx="1" className="skull-dark" />
      <ellipse cx="39" cy="50" rx="8" ry="9" className="skull-eye" />
      <ellipse cx="61" cy="50" rx="8" ry="9" className="skull-eye" />
      <ellipse cx="36.5" cy="47.5" rx="2.5" ry="3" className="skull-gleam" />
      <ellipse cx="58.5" cy="47.5" rx="2.5" ry="3" className="skull-gleam" />
      <ellipse cx="50" cy="62" rx="5" ry="3" className="skull-dark" opacity="0.5" />
      <path d="M30 42 Q28 36 32 30 Q38 22 50 21 Q62 22 68 30 Q72 36 70 42" fill="none" stroke="#c8bfaf" strokeWidth="1.5" opacity="0.6" />
    </g>
  </svg>
);

const CrackedBackground = () => (
  <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.06 }} viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
    <path d="M80 0 L95 80 L60 120 L100 200 L75 280" stroke="#ff4444" strokeWidth="1.5" fill="none" />
    <path d="M320 0 L305 90 L340 150 L295 240 L330 340" stroke="#ff4444" strokeWidth="1.5" fill="none" />
    <path d="M0 150 L80 165 L120 145 L200 170 L280 148 L360 165 L400 155" stroke="#ff4444" strokeWidth="1" fill="none" />
    <path d="M0 400 L100 385 L160 405 L240 388 L320 402 L400 390" stroke="#ff4444" strokeWidth="1" fill="none" />
    <path d="M150 0 L148 60 L155 120 L145 200" stroke="#cc3333" strokeWidth="0.8" fill="none" />
    <path d="M250 600 L252 520 L245 440 L255 360" stroke="#cc3333" strokeWidth="0.8" fill="none" />
  </svg>
);

const FloatingBones = () => (
  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
    {[
      { x: '8%', y: '12%', r: -25, delay: '0s', size: 22 },
      { x: '88%', y: '8%', r: 40, delay: '0.8s', size: 18 },
      { x: '5%', y: '75%', r: 15, delay: '1.5s', size: 20 },
      { x: '92%', y: '70%', r: -35, delay: '2.2s', size: 16 },
      { x: '50%', y: '4%', r: 60, delay: '0.4s', size: 14 },
      { x: '75%', y: '90%', r: -15, delay: '1.2s', size: 19 },
    ].map((b, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: b.x,
          top: b.y,
          transform: `rotate(${b.r}deg)`,
          opacity: 0.18,
          animation: `floatBone 6s ease-in-out ${b.delay} infinite alternate`,
          fontSize: b.size,
          color: '#e8e0d0',
        }}
      >
        ✝
      </div>
    ))}
  </div>
);

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login, signup, isLoading, error, clearError } = useAuth();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', remember: false });
  const [visible, setVisible] = useState(false);
  const [pwStrength, setPwStrength] = useState(0);
  const [successMsg, setSuccessMsg] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isAuthModalOpen) return;
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, [isAuthModalOpen]);

  useEffect(() => {
    clearError();
    setSuccessMsg('');
  }, [mode, clearError]);

  useEffect(() => {
    if (isAuthModalOpen) inputRef.current?.focus();
  }, [mode, isAuthModalOpen]);

  const calcStrength = (pw) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    if (name === 'password') setPwStrength(calcStrength(value));
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    const result = mode === 'login'
      ? await login(form.email, form.password, form.remember)
      : await signup(form.name, form.email, form.password, form.remember);
    if (result?.success) {
      setSuccessMsg(mode === 'login' ? 'Welcome back, soul.' : 'Your soul has been registered.');
    }
  };

  const handleClose = () => {
    setVisible(false);
    setSuccessMsg('');
    clearError();
    closeAuthModal();
  };

  const strengthLabels = ['', 'Weak', 'Fair', 'Strong', 'Unbreakable'];
  const strengthColors = ['', '#cc2222', '#cc8800', '#558800', '#00aa44'];

  if (!isAuthModalOpen) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .auth-backdrop {
          min-height: 100vh;
          background: #0d0b09;
          background-image:
            radial-gradient(ellipse 80% 60% at 50% -10%, #2a0a0a 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 100% 100%, #1a0505 0%, transparent 50%),
            radial-gradient(ellipse 50% 30% at 0% 80%, #1a0a00 0%, transparent 50%);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Crimson Text', Georgia, serif;
          padding: 2rem;
          position: fixed;
          inset: 0;
          z-index: 50;
          overflow: hidden;
        }

        @keyframes floatBone {
          from { transform: translateY(0) rotate(var(--r, 0deg)); }
          to { transform: translateY(-12px) rotate(var(--r, 0deg)); }
        }

        .auth-card {
          position: relative;
          width: 100%;
          max-width: 420px;
          background: linear-gradient(160deg, #1c1510 0%, #120d09 50%, #1a1008 100%);
          border: 1px solid #4a2a1a;
          border-radius: 4px;
          padding: 2.5rem 2.5rem 2rem;
          box-shadow:
            0 0 0 1px #2a1510,
            0 0 40px #3a0a0a66,
            0 0 80px #1a000022,
            inset 0 1px 0 #5a3020;
          transition: opacity 0.6s ease, transform 0.6s ease;
          opacity: var(--visible, 0);
          transform: translateY(var(--ty, 20px));
          overflow: hidden;
        }

        .auth-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 2px,
            rgba(255,60,0,0.015) 2px, rgba(255,60,0,0.015) 4px
          );
          pointer-events: none;
        }

        .auth-card::after {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%; height: 1px;
          background: linear-gradient(90deg, transparent, #cc4422, #ff6633, #cc4422, transparent);
          opacity: 0.6;
        }

        .skull-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 1.2rem;
          gap: 0.5rem;
        }

        .auth-title {
          font-family: 'Cinzel', serif;
          font-size: 1.6rem;
          font-weight: 900;
          color: #e8d5b0;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-shadow: 0 0 20px #ff330055, 0 2px 4px #000;
          text-align: center;
        }

        .auth-subtitle {
          font-family: 'Crimson Text', serif;
          font-style: italic;
          color: #7a5a3a;
          font-size: 0.95rem;
          text-align: center;
          letter-spacing: 0.03em;
        }

        .divider {
          display: flex; align-items: center; gap: 0.75rem;
          margin: 1.2rem 0 1.4rem;
        }
        .divider-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, #4a2a1a, transparent); }
        .divider-skull { color: #5a3020; font-size: 0.7rem; letter-spacing: 0.1em; font-family: 'Cinzel', serif; }

        .field-group { margin-bottom: 1.1rem; }

        .field-label {
          display: block;
          font-family: 'Cinzel', serif;
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #8a6040;
          margin-bottom: 0.45rem;
        }

        .field-input {
          width: 100%;
          background: #0d0906;
          border: 1px solid #3a2010;
          border-radius: 2px;
          padding: 0.7rem 0.9rem;
          font-family: 'Crimson Text', serif;
          font-size: 1rem;
          color: #e0c8a0;
          outline: none;
          transition: border-color 0.3s, box-shadow 0.3s;
          letter-spacing: 0.02em;
        }
        .field-input::placeholder { color: #4a3020; }
        .field-input:focus {
          border-color: #8a3010;
          box-shadow: 0 0 0 2px #cc220022, inset 0 0 12px #3a100022;
        }

        .strength-bar {
          display: flex; gap: 3px; margin-top: 0.4rem;
        }
        .strength-seg {
          height: 3px; flex: 1; border-radius: 2px;
          background: #2a1508;
          transition: background 0.4s;
        }

        .remember-row {
          display: flex; align-items: center; gap: 0.6rem;
          margin-bottom: 1.4rem;
        }
        .remember-box {
          width: 14px; height: 14px;
          accent-color: #cc3311;
          cursor: pointer;
        }
        .remember-label {
          font-family: 'Cinzel', serif;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          color: #6a4a2a;
          text-transform: uppercase;
        }

        .submit-btn {
          width: 100%;
          padding: 0.85rem;
          background: linear-gradient(135deg, #8a1a08 0%, #5a0f04 50%, #7a1806 100%);
          border: 1px solid #cc3311;
          border-radius: 2px;
          font-family: 'Cinzel', serif;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #f0d8b0;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s;
          box-shadow: 0 0 20px #cc220033, inset 0 1px 0 #cc5533;
        }
        .submit-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #aa2a10 0%, #7a1508 50%, #9a2208 100%);
          box-shadow: 0 0 30px #cc220055, inset 0 1px 0 #dd6644;
          transform: translateY(-1px);
        }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .submit-btn::before {
          content: '';
          position: absolute;
          top: -50%; left: -60%;
          width: 40%; height: 200%;
          background: linear-gradient(90deg, transparent, rgba(255,200,150,0.12), transparent);
          transform: skewX(-20deg);
          transition: left 0.6s;
        }
        .submit-btn:hover::before { left: 130%; }

        .error-msg {
          background: #2a0808;
          border: 1px solid #8a1a0a;
          border-radius: 2px;
          padding: 0.6rem 0.9rem;
          color: #ff6644;
          font-size: 0.88rem;
          margin-bottom: 1rem;
          font-style: italic;
          letter-spacing: 0.01em;
        }

        .success-msg {
          background: #081a0a;
          border: 1px solid #1a6a2a;
          border-radius: 2px;
          padding: 0.6rem 0.9rem;
          color: #66dd88;
          font-size: 0.88rem;
          margin-bottom: 1rem;
          font-style: italic;
          text-align: center;
        }

        .mode-switch {
          text-align: center;
          margin-top: 1.5rem;
        }
        .mode-switch-text {
          font-size: 0.85rem;
          color: #5a3a20;
          font-style: italic;
        }
        .mode-switch-btn {
          background: none; border: none;
          font-family: 'Cinzel', serif;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          color: #cc5522;
          cursor: pointer;
          text-transform: uppercase;
          text-decoration: none;
          border-bottom: 1px solid #cc552244;
          padding-bottom: 1px;
          transition: color 0.2s, border-color 0.2s;
          margin-left: 0.5rem;
        }
        .mode-switch-btn:hover { color: #ff7744; border-color: #ff774488; }

        .spinner {
          display: inline-block;
          width: 14px; height: 14px;
          border: 2px solid #f0d8b044;
          border-top-color: #f0d8b0;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          margin-right: 8px;
          vertical-align: middle;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .corner-dec {
          position: absolute;
          width: 20px; height: 20px;
          border-color: #4a2a1a;
          border-style: solid;
          opacity: 0.6;
        }
        .corner-tl { top: 8px; left: 8px; border-width: 1px 0 0 1px; }
        .corner-tr { top: 8px; right: 8px; border-width: 1px 1px 0 0; }
        .corner-bl { bottom: 8px; left: 8px; border-width: 0 0 1px 1px; }
        .corner-br { bottom: 8px; right: 8px; border-width: 0 1px 1px 0; }
      `}</style>

      <div className="auth-backdrop" onClick={handleClose}>
        <CrackedBackground />
        <FloatingBones />

        <div
          className="auth-card"
          style={{ '--visible': visible ? 1 : 0, '--ty': visible ? '0px' : '20px' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="corner-dec corner-tl" />
          <div className="corner-dec corner-tr" />
          <div className="corner-dec corner-bl" />
          <div className="corner-dec corner-br" />

          <div className="skull-wrap">
            <SkullIcon />
            <h1 className="auth-title">
              {mode === 'login' ? 'Return from the Dead' : 'Sell Your Soul'}
            </h1>
            <p className="auth-subtitle">
              {mode === 'login' ? 'Enter your cursed credentials' : 'Bind yourself to LaceUp forever'}
            </p>
          </div>

          <div className="divider">
            <div className="divider-line" />
            <span className="divider-skull">☠ ☠ ☠</span>
            <div className="divider-line" />
          </div>

          {error && <div className="error-msg">⚠ {error}</div>}
          {successMsg && <div className="success-msg">✓ {successMsg}</div>}

          <form onSubmit={handleSubmit} autoComplete="off">
            {mode === 'signup' && (
              <div className="field-group">
                <label className="field-label" htmlFor="name">Your Name</label>
                <input
                  ref={inputRef}
                  className="field-input"
                  id="name" name="name" type="text"
                  placeholder="What do they call you..."
                  value={form.name} onChange={handleChange}
                  autoComplete="off"
                />
              </div>
            )}

            <div className="field-group">
              <label className="field-label" htmlFor="email">Blood Oath Email</label>
              <input
                ref={mode === 'login' ? inputRef : undefined}
                className="field-input"
                id="email" name="email" type="email"
                placeholder="soul@underworld.com"
                value={form.email} onChange={handleChange}
                autoComplete="email"
              />
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="password">
                {mode === 'login' ? 'Secret Incantation' : 'Choose Your Curse'}
              </label>
              <input
                className="field-input"
                id="password" name="password" type="password"
                placeholder="Min. 8 dark characters..."
                value={form.password} onChange={handleChange}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
              {mode === 'signup' && form.password && (
                <div className="strength-bar">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="strength-seg"
                      style={{
                        background: i <= pwStrength ? strengthColors[pwStrength] : '#2a1508',
                      }}
                    />
                  ))}
                </div>
              )}
              {mode === 'signup' && form.password && (
                <div style={{ fontSize: '0.72rem', color: strengthColors[pwStrength], marginTop: '0.3rem', fontFamily: 'Cinzel, serif', letterSpacing: '0.12em' }}>
                  {strengthLabels[pwStrength]}
                </div>
              )}
            </div>

            <div className="remember-row">
              <input
                className="remember-box"
                type="checkbox" id="remember" name="remember"
                checked={form.remember} onChange={handleChange}
              />
              <label className="remember-label" htmlFor="remember">
                Remember my dark pact
              </label>
            </div>

            <button className="submit-btn" type="submit" disabled={isLoading}>
              {isLoading && <span className="spinner" />}
              {isLoading
                ? (mode === 'login' ? 'Summoning...' : 'Binding your soul...')
                : (mode === 'login' ? '⚰ Enter the Crypt' : '🩸 Sign the Contract')
              }
            </button>
          </form>

          <div className="mode-switch">
            <span className="mode-switch-text">
              {mode === 'login' ? 'No soul on record?' : 'Already damned?'}
            </span>
            <button
              className="mode-switch-btn"
              type="button"
              onClick={() => {
                setForm({ name: '', email: '', password: '', remember: false });
                setPwStrength(0);
                setMode((m) => (m === 'login' ? 'signup' : 'login'));
              }}
            >
              {mode === 'login' ? 'Join the Damned' : 'Return to Hell'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthModal;
