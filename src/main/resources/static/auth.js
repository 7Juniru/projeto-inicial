/**
 * FOODforLIFE – auth.js
 * Google OAuth real via popup + isolamento de produtos por conta
 */

// ─────────────────────────────────────────────────────────────
//  HELPERS DE SESSÃO  (namespacing por userId)
// ─────────────────────────────────────────────────────────────
function getCurrentUser() {
  try { return JSON.parse(sessionStorage.getItem('user')) || null; }
  catch { return null; }
}

/** Chave do localStorage isolada por usuário */
function userStorageKey(suffix) {
  const u = getCurrentUser();
  const uid = (u && (u.sub || u.email || u.id || u.nome || 'guest'))
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9@._-]/g, '_');
  return `foodforlife_${uid}_${suffix}`;
}

// Expõe globalmente para que app.js use
window.userStorageKey = userStorageKey;
window.getCurrentUser = getCurrentUser;

// ─────────────────────────────────────────────────────────────
//  GOOGLE OAUTH  –  popup real
// ─────────────────────────────────────────────────────────────

/**
 * Abre uma janela popup para o Google escolher a conta.
 * Usa o endpoint de autorização OAuth 2 com response_type=token
 * (implicit flow) para obter um access_token sem backend dedicado.
 * Depois usa a API do Google UserInfo para pegar nome + email.
 */
function openGoogleOAuthPopup() {
  const CLIENT_ID = window.GOOGLE_CLIENT_ID || '419105188850-j5v7f36nrlprj5r2m1rt1b8rdp7sk7iu.apps.googleusercontent.com';

  const redirectUri = encodeURIComponent(window.location.origin + '/auth/google/callback.html');
  const scope       = encodeURIComponent('openid email profile');
  const state       = Math.random().toString(36).slice(2);
  sessionStorage.setItem('oauth_state', state);

  const url =
    `https://accounts.google.com/o/oauth2/v2/auth` +
    `?client_id=${CLIENT_ID}` +
    `&redirect_uri=${redirectUri}` +
    `&response_type=token` +
    `&scope=${scope}` +
    `&state=${state}` +
    `&prompt=select_account`;

  const popup = window.open(
    url,
    'google-login',
    'width=480,height=600,top=100,left=200,resizable=yes,scrollbars=yes'
  );

  if (!popup || popup.closed) {
    alert('O popup foi bloqueado. Permita popups para este site e tente novamente.');
    return;
  }

  // Escuta mensagem do callback
  window.addEventListener('message', function handler(e) {
    if (e.origin !== window.location.origin) return;
    if (e.data && e.data.type === 'GOOGLE_AUTH_SUCCESS') {
      window.removeEventListener('message', handler);
      const { name, email, picture, sub } = e.data.payload;
      performGoogleLogin(name, email, sub, picture);
    }
  });
}

function showGoogleConfigWarning() {
  // Mostra aviso explicativo e abre form manual abaixo
  const hint = document.getElementById('google-config-hint');
  if (hint) {
    hint.style.display = 'block';
    hint.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// ─────────────────────────────────────────────────────────────
//  LOGIN POR E-MAIL MANUAL  (fallback sem Client ID)
// ─────────────────────────────────────────────────────────────
async function performGoogleLogin(name, email, sub, picture) {
  const overlay = document.getElementById('google-login-modal-overlay');
  if (overlay) overlay.classList.remove('open');

  // sub (Google ID) garante unicidade mesmo se o usuário mudar o nome
  const userId = sub || email;
  const user = {
    sub: userId,
    nome: name,
    email,
    picture: picture || null,
    whatsapp: '',
  };

  try {
    const res = await fetch('/api/users/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const saved = res.ok ? await res.json() : user;
    // Preserva sub para namespace
    saved.sub = saved.sub || userId;
    sessionStorage.setItem('user', JSON.stringify(saved));
    showDashboard(saved);
  } catch {
    sessionStorage.setItem('user', JSON.stringify(user));
    showDashboard(user);
  }
}

// ─────────────────────────────────────────────────────────────
//  INICIALIZAÇÃO DO DOM
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // ── Restaurar sessão ────────────────────────────────────────
  const stored = sessionStorage.getItem('user');
  if (stored) { showDashboard(JSON.parse(stored)); }

  // ── Redirect param do backend ───────────────────────────────
  const urlParams = new URLSearchParams(window.location.search);
  const nameParam = urlParams.get('nome');
  if (nameParam) {
    const u = { nome: nameParam, sub: nameParam };
    sessionStorage.setItem('user', JSON.stringify(u));
    window.history.replaceState({}, document.title, window.location.pathname);
    showDashboard(u);
  }

  // ── Formulário de cadastro e-mail/senha ─────────────────────
  const form = document.getElementById('user-registration-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name     = document.getElementById('user-name')?.value.trim()  || '';
      const email    = document.getElementById('user-email')?.value.trim() || '';
      const phone    = document.getElementById('user-phone')?.value.trim() || '';
      const password = document.getElementById('user-password')?.value     || '';

      let valid = true;
      if (!name)  { showErr('reg-name-error');  valid = false; }
      if (!email || !email.includes('@')) { showErr('reg-email-error'); valid = false; }
      if (!password) { showErr('reg-pass-error'); valid = false; }
      if (!valid) return;

      const user = { nome: name, email, sub: email, whatsapp: phone, password };

      try {
        const res = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });
        if (res.redirected) { window.location.href = res.url; return; }
        const saved = res.ok ? (await res.json().catch(() => user)) : user;
        saved.sub = saved.sub || email;
        sessionStorage.setItem('user', JSON.stringify(saved));
        showDashboard(saved);
      } catch {
        sessionStorage.setItem('user', JSON.stringify(user));
        showDashboard(user);
      }
    });
  }

  // ── Botão "Cadastrar com Google" ────────────────────────────
  const btnGoogle = document.getElementById('btn-google-login');
  const googleOverlay = document.getElementById('google-login-modal-overlay');
  const btnCloseGoogle = document.getElementById('btn-close-google');

  if (btnGoogle && googleOverlay) {
    btnGoogle.addEventListener('click', () => {
      googleOverlay.classList.add('open');
      if (window.lucide) lucide.createIcons();
    });

    const closeModal = () => googleOverlay.classList.remove('open');
    if (btnCloseGoogle) btnCloseGoogle.addEventListener('click', closeModal);
    googleOverlay.addEventListener('click', (e) => {
      if (e.target === googleOverlay) closeModal();
    });
  }

  // ── Popup Google real ───────────────────────────────────────
  const btnPopup = document.getElementById('btn-google-popup');
  if (btnPopup) {
    btnPopup.addEventListener('click', openGoogleOAuthPopup);
  }

  // ── Fallback: formulário de e-mail manual ───────────────────
  const btnSubmitCustom = document.getElementById('btn-google-submit-custom');
  if (btnSubmitCustom) {
    btnSubmitCustom.addEventListener('click', async () => {
      const nameEl  = document.getElementById('google-input-name');
      const emailEl = document.getElementById('google-input-email');
      const name    = nameEl?.value.trim()  || '';
      const email   = emailEl?.value.trim() || '';

      if (!name)  { shakeInput(nameEl);  return; }
      if (!email || !email.includes('@')) { shakeInput(emailEl); return; }

      await performGoogleLogin(name, email, email, null);
    });
  }

  // ── Botão de Logout ───────────────────────────────────────────
  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      sessionStorage.removeItem('user');
      window.location.reload();
    });
  }
});

// ─────────────────────────────────────────────────────────────
//  SHOW DASHBOARD
// ─────────────────────────────────────────────────────────────
function showDashboard(user) {
  const reg   = document.getElementById('registration-section');
  const dash  = document.getElementById('dashboard-section');
  const name  = document.getElementById('user-name-display');
  const tabs  = document.getElementById('nav-tabs');
  const stats = document.getElementById('stats-bar');
  const prof  = document.getElementById('user-profile');

  if (reg)   reg.style.display   = 'none';
  if (dash)  dash.style.display  = 'block';
  if (tabs)  tabs.style.display  = 'flex';
  if (stats) stats.style.display = 'flex';
  if (prof)  prof.style.display  = 'flex';
  if (name)  name.textContent    = user.nome || '';

  // Atualiza avatar no header se houver foto
  if (user.picture) {
    const avatarEl = document.getElementById('user-avatar-img');
    if (avatarEl) { avatarEl.src = user.picture; avatarEl.style.display = 'block'; }
    const initials = document.getElementById('user-avatar-initials');
    if (initials) initials.style.display = 'none';
  }

  if (window.lucide) lucide.createIcons();

  // Notifica app.js para recarregar produtos do usuário correto
  window.dispatchEvent(new CustomEvent('user:ready', { detail: user }));
}

// ─────────────────────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────────────────────
function showErr(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = 'block';
}

function shakeInput(el) {
  if (!el) return;
  el.style.borderColor = 'var(--critico)';
  el.classList.add('shake-anim');
  el.focus();
  setTimeout(() => { el.style.borderColor = ''; el.classList.remove('shake-anim'); }, 700);
}
