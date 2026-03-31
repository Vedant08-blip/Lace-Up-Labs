import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const LogoMark = () => (
  <div className="logo-wrap">
    <img src="/Logo.svg" alt="Lace Up Labs" className="logo-img" />
  </div>
);

const AccentGrid = () => (
  <div className="accent-grid" aria-hidden="true" />
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
  const strengthColors = ['', '#ff6b61', '#ff9f43', '#f2c94c', '#22c55e'];

  if (!isAuthModalOpen) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .auth-backdrop {
          min-height: 100vh;
          background: #0f0f0f;
          background-image:
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255,59,48,0.16) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 100% 100%, rgba(255,59,48,0.12) 0%, transparent 55%),
            radial-gradient(ellipse 50% 30% at 0% 80%, rgba(255,59,48,0.08) 0%, transparent 55%);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Poppins', system-ui, sans-serif;
          padding: 2rem;
          position: fixed;
          inset: 0;
          z-index: 50;
          overflow: hidden;
        }

        .auth-card {
          position: relative;
          width: 100%;
          max-width: 420px;
          background: #1a1a1a;
          border: 1px solid #2b2b2b;
          border-radius: 18px;
          padding: 2.5rem 2.5rem 2rem;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.02),
            0 20px 80px rgba(0,0,0,0.6);
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
            rgba(255,59,48,0.025) 2px, rgba(255,59,48,0.025) 4px
          );
          pointer-events: none;
        }

        .auth-card::after {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%; height: 1px;
          background: linear-gradient(90deg, transparent, #ff3b30, #ff3b30, transparent);
          opacity: 0.4;
        }

        .back-btn {
          position: absolute;
          top: 14px;
          left: 14px;
          width: 34px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: rgba(0,0,0,0.35);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.8);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .back-btn:hover {
          border-color: rgba(255,59,48,0.6);
          color: #ffb3ae;
          box-shadow: 0 0 18px rgba(255,59,48,0.25);
        }
        .back-btn span { display: none; }

        .accent-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,59,48,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,59,48,0.08) 1px, transparent 1px);
          background-size: 56px 56px;
          opacity: 0.08;
          pointer-events: none;
        }

        .logo-wrap {
          width: 84px;
          height: 84px;
          border-radius: 20px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 30px rgba(255,59,48,0.25);
        }

        .logo-img {
          width: 56px;
          height: 56px;
          object-fit: contain;
          filter: drop-shadow(0 8px 18px rgba(255,59,48,0.35));
        }

        .skull-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 1.2rem;
          gap: 0.5rem;
        }

        .auth-title {
          font-family: 'Bebas Neue', system-ui, sans-serif;
          font-size: 2.1rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-shadow: 0 0 20px rgba(255,59,48,0.25);
          text-align: center;
        }

        .auth-subtitle {
          font-family: 'Poppins', system-ui, sans-serif;
          font-style: normal;
          color: #9ca3af;
          font-size: 0.9rem;
          text-align: center;
          letter-spacing: 0.04em;
        }

        .divider {
          display: flex; align-items: center; gap: 0.75rem;
          margin: 1.2rem 0 1.4rem;
        }
        .divider-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, #2b2b2b, transparent); }
        .divider-skull { color: #ff3b30; font-size: 0.7rem; letter-spacing: 0.18em; font-family: 'Bebas Neue', system-ui, sans-serif; }

        .field-group { margin-bottom: 1.1rem; }

        .field-label {
          display: block;
          font-family: 'Poppins', system-ui, sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #9ca3af;
          margin-bottom: 0.45rem;
        }

        .field-input {
          width: 100%;
          background: #0b0b0b;
          border: 1px solid #2b2b2b;
          border-radius: 10px;
          padding: 0.7rem 0.9rem;
          font-family: 'Poppins', system-ui, sans-serif;
          font-size: 1rem;
          color: #ffffff;
          outline: none;
          transition: border-color 0.3s, box-shadow 0.3s;
          letter-spacing: 0.02em;
        }
        .field-input::placeholder { color: #6b7280; }
        .field-input:focus {
          border-color: #ff3b30;
          box-shadow: 0 0 0 2px rgba(255,59,48,0.18);
        }

        .strength-bar {
          display: flex; gap: 3px; margin-top: 0.4rem;
        }
        .strength-seg {
          height: 3px; flex: 1; border-radius: 2px;
          background: #2b2b2b;
          transition: background 0.4s;
        }

        .remember-row {
          display: flex; align-items: center; gap: 0.6rem;
          margin-bottom: 1.4rem;
        }
        .remember-box {
          width: 14px; height: 14px;
          accent-color: #ff3b30;
          cursor: pointer;
        }
        .remember-label {
          font-family: 'Poppins', system-ui, sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          color: #9ca3af;
          text-transform: uppercase;
        }

        .submit-btn {
          width: 100%;
          padding: 0.85rem;
          background: linear-gradient(135deg, #ff3b30 0%, #e02f26 100%);
          border: 1px solid #ff3b30;
          border-radius: 12px;
          font-family: 'Bebas Neue', system-ui, sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #0b0b0b;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s;
          box-shadow: 0 0 30px rgba(255,59,48,0.35);
        }
        .submit-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #ff5046 0%, #ff3b30 100%);
          box-shadow: 0 0 40px rgba(255,59,48,0.5);
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
          background: rgba(255,59,48,0.12);
          border: 1px solid rgba(255,59,48,0.35);
          border-radius: 10px;
          padding: 0.6rem 0.9rem;
          color: #ff8a82;
          font-size: 0.88rem;
          margin-bottom: 1rem;
          font-style: normal;
          letter-spacing: 0.01em;
        }

        .success-msg {
          background: rgba(34,197,94,0.12);
          border: 1px solid rgba(34,197,94,0.35);
          border-radius: 10px;
          padding: 0.6rem 0.9rem;
          color: #86efac;
          font-size: 0.88rem;
          margin-bottom: 1rem;
          font-style: normal;
          text-align: center;
        }

        .mode-switch {
          text-align: center;
          margin-top: 1.5rem;
        }
        .mode-switch-text {
          font-size: 0.85rem;
          color: #9ca3af;
          font-style: normal;
        }
        .mode-switch-btn {
          background: none; border: none;
          font-family: 'Bebas Neue', system-ui, sans-serif;
          font-size: 0.9rem;
          letter-spacing: 0.18em;
          color: #ff3b30;
          cursor: pointer;
          text-transform: uppercase;
          text-decoration: none;
          border-bottom: 1px solid rgba(255,59,48,0.35);
          padding-bottom: 1px;
          transition: color 0.2s, border-color 0.2s;
          margin-left: 0.5rem;
        }
        .mode-switch-btn:hover { color: #ff7168; border-color: rgba(255,113,104,0.6); }

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
          width: 18px; height: 18px;
          border-color: rgba(255,255,255,0.12);
          border-style: solid;
          opacity: 0.8;
        }
        .corner-tl { top: 10px; left: 10px; border-width: 1px 0 0 1px; }
        .corner-tr { top: 10px; right: 10px; border-width: 1px 1px 0 0; }
        .corner-bl { bottom: 10px; left: 10px; border-width: 0 0 1px 1px; }
        .corner-br { bottom: 10px; right: 10px; border-width: 0 1px 1px 0; }
      `}</style>

      <div className="auth-backdrop" onClick={handleClose}>
        <AccentGrid />

        <button className="back-btn" type="button" onClick={handleClose} aria-label="Go back">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>

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
            <LogoMark />
            <h1 className="auth-title">
              {mode === 'login' ? 'Return from the Dead' : 'Sell Your Soul'}
            </h1>
            <p className="auth-subtitle">
              {mode === 'login' ? 'Enter your cursed credentials' : 'Bind yourself to LaceUp forever'}
            </p>
          </div>

          <div className="divider">
            <div className="divider-line" />
            <span className="divider-skull">• • •</span>
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
