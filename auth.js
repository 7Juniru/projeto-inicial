/**
 * FOODforLIFE – auth.js
 * Sistema completo: Cadastro + Login (email/senha) + "Google" com email/senha
 * Dados salvos em localStorage por usuário — acessíveis em qualquer dispositivo
 * após login com as mesmas credenciais.
 */

// ─────────────────────────────────────────────────────────────
//  HELPERS DE SESSÃO
// ─────────────────────────────────────────────────────────────
function getCurrentUser() {
  try { return JSON.parse(sessionStorage.getItem('ffl_session')) || null; }
  catch { return null; }
}

/** Chave de produtos isolada por usuário (email normalizado) */
function userStorageKey(suffix) {
  const u = getCurrentUser();
  const uid = (u && (u.email || u.sub || u.nome || 'guest'))
    .toString().toLowerCase().replace(/[^a-z0-9@._-]/g, '_');
  return `foodforlife_${uid}_${suffix}`;
}

window.userStorageKey = userStorageKey;
window.getCurrentUser = getCurrentUser;

// ─────────────────────────────────────────────────────────────
//  BANCO DE CONTAS (localStorage)
// ─────────────────────────────────────────────────────────────
const ACCOUNTS_KEY = 'ffl_accounts';

function loadAccounts() {
  try { return JSON.parse(localStorage.getItem(ACCOUNTS_KEY)) || {}; }
  catch { return {}; }
}

function saveAccounts(accounts) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

/** Hash simples (djb2) — sem backend, sem bcrypt, mas muito melhor que plain text */
function hashPassword(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
  }
  return (hash >>> 0).toString(16);
}

function registerAccount(name, email, phone, password) {
  const accounts = loadAccounts();
  const key = email.toLowerCase().trim();
  if (accounts[key]) return { ok: false, msg: 'Este e-mail já está cadastrado. Faça login.' };
  accounts[key] = {
    nome: name,
    email: key,
    whatsapp: phone,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
  };
  saveAccounts(accounts);
  return { ok: true, user: accounts[key] };
}

function loginWithPassword(email, password) {
  const accounts = loadAccounts();
  const key = email.toLowerCase().trim();
  const acc = accounts[key];
  if (!acc) return { ok: false, msg: 'E-mail não encontrado. Cadastre-se primeiro.' };
  if (acc.passwordHash !== hashPassword(password)) return { ok: false, msg: 'Senha incorreta.' };
  return { ok: true, user: acc };
}

// ─────────────────────────────────────────────────────────────
//  SHOW DASHBOARD
// ─────────────────────────────────────────────────────────────
function showDashboard(user) {
  const reg   = document.getElementById('registration-section');
  const dash  = document.getElementById('dashboard-section');
  const nameEl = document.getElementById('user-name-display');
  const tabs  = document.getElementById('nav-tabs');
  const stats = document.getElementById('stats-bar');
  const prof  = document.getElementById('user-profile');

  if (reg)   reg.style.display   = 'none';
  if (dash)  dash.style.display  = 'block';
  if (tabs)  tabs.style.display  = 'flex';
  if (stats) stats.style.display = 'flex';
  if (prof)  prof.style.display  = 'flex';
  if (nameEl) nameEl.textContent = user.nome || user.email || '';

  // Aplica tema salvo
  const savedTheme = localStorage.getItem('foodforlife_theme') || 'dark';
  if (window.applyTheme) window.applyTheme(savedTheme);

  if (window.lucide) lucide.createIcons();

  // Notifica app.js para recarregar produtos do usuário correto
  window.dispatchEvent(new CustomEvent('user:ready', { detail: user }));
}

// ─────────────────────────────────────────────────────────────
//  HELPERS VISUAIS
// ─────────────────────────────────────────────────────────────
function showErr(id, msg) {
  const el = document.getElementById(id);
  if (el) { el.textContent = msg || el.textContent; el.style.display = 'block'; }
}
function hideErr(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = 'none';
}

function shakeInput(el) {
  if (!el) return;
  el.style.borderColor = 'var(--critico)';
  el.classList.add('shake-anim');
  el.focus();
  setTimeout(() => { el.style.borderColor = ''; el.classList.remove('shake-anim'); }, 700);
}

function showToast(msg, type = 'error') {
  let toast = document.getElementById('ffl-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'ffl-toast';
    document.body.appendChild(toast);
  }
  toast.className = `ffl-toast ffl-toast--${type}`;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3500);
}

// ─────────────────────────────────────────────────────────────
//  INICIALIZAÇÃO DO DOM
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // ── Aplica tema mesmo antes do login ───────────────────────
  const savedTheme = localStorage.getItem('foodforlife_theme') || 'dark';
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  // ── Restaurar sessão ────────────────────────────────────────
  const stored = sessionStorage.getItem('ffl_session');
  if (stored) {
    try { showDashboard(JSON.parse(stored)); } catch {}
  }

  // ── Redirect param do backend ───────────────────────────────
  const urlParams = new URLSearchParams(window.location.search);
  const nameParam = urlParams.get('nome');
  if (nameParam) {
    const u = { nome: nameParam, email: nameParam, sub: nameParam };
    sessionStorage.setItem('ffl_session', JSON.stringify(u));
    window.history.replaceState({}, document.title, window.location.pathname);
    showDashboard(u);
  }

  // ── ABAS: Cadastro ↔ Login ──────────────────────────────────
  const btnShowLogin    = document.getElementById('btn-show-login');
  const btnShowRegister = document.getElementById('btn-show-register');
  const panelRegister   = document.getElementById('panel-register');
  const panelLogin      = document.getElementById('panel-login');

  function switchToLogin() {
    if (panelRegister) panelRegister.style.display = 'none';
    if (panelLogin)    panelLogin.style.display    = 'block';
    if (btnShowLogin)    btnShowLogin.classList.add('active');
    if (btnShowRegister) btnShowRegister.classList.remove('active');
  }
  function switchToRegister() {
    if (panelLogin)    panelLogin.style.display    = 'none';
    if (panelRegister) panelRegister.style.display = 'block';
    if (btnShowRegister) btnShowRegister.classList.add('active');
    if (btnShowLogin)    btnShowLogin.classList.remove('active');
  }

  if (btnShowLogin)    btnShowLogin.addEventListener('click',    switchToLogin);
  if (btnShowRegister) btnShowRegister.addEventListener('click', switchToRegister);

  // ── Formulário de CADASTRO ──────────────────────────────────
  const regForm = document.getElementById('user-registration-form');
  if (regForm) {
    regForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name     = document.getElementById('user-name')?.value.trim()  || '';
      const email    = document.getElementById('user-email')?.value.trim() || '';
      const phone    = document.getElementById('user-phone')?.value.trim() || '';
      const password = document.getElementById('user-password')?.value     || '';

      let valid = true;
      if (!name)  { showErr('reg-name-error', 'Nome é obrigatório.'); valid = false; }
      else hideErr('reg-name-error');
      if (!email || !email.includes('@')) { showErr('reg-email-error', 'E-mail válido é necessário.'); valid = false; }
      else hideErr('reg-email-error');
      if (password.length < 6) { showErr('reg-pass-error', 'Senha deve ter pelo menos 6 caracteres.'); valid = false; }
      else hideErr('reg-pass-error');
      if (!valid) return;

      const result = registerAccount(name, email, phone, password);
      if (!result.ok) {
        showToast(result.msg, 'error');
        return;
      }

      // Tenta salvar na API também (se disponível)
      try {
        await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome: name, email, sub: email, whatsapp: phone }),
        });
      } catch {}

      const user = { ...result.user, sub: email };
      sessionStorage.setItem('ffl_session', JSON.stringify(user));
      showToast(`Bem-vindo(a), ${name}! 🎉`, 'success');
      setTimeout(() => showDashboard(user), 500);
    });
  }

  // ── Formulário de LOGIN ─────────────────────────────────────
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email    = document.getElementById('login-email')?.value.trim() || '';
      const password = document.getElementById('login-password')?.value     || '';

      if (!email || !email.includes('@')) { showErr('login-email-error', 'E-mail inválido.'); return; }
      else hideErr('login-email-error');

      const result = loginWithPassword(email, password);
      if (!result.ok) {
        showToast(result.msg, 'error');
        return;
      }

      const user = { ...result.user, sub: result.user.email };
      sessionStorage.setItem('ffl_session', JSON.stringify(user));
      showToast(`Bem-vindo(a) de volta, ${result.user.nome}! 👋`, 'success');
      setTimeout(() => showDashboard(user), 500);
    });
  }

  // ── Botão "Cadastrar / Entrar com Google" ───────────────────
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

  // ── Modal Google: "Continuar com Google" → pede email+senha ─
  const btnPopup = document.getElementById('btn-google-popup');
  const googleEmailInput = document.getElementById('google-input-email');
  const googlePassInput  = document.getElementById('google-input-password');

  if (btnPopup) {
    btnPopup.addEventListener('click', () => {
      // Rolam para o formulário no modal
      const form = document.getElementById('google-custom-account-form');
      if (form) form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  // ── Modal Google: botão Entrar ─────────────────────────────
  const btnGoogleSubmit = document.getElementById('btn-google-submit-custom');
  if (btnGoogleSubmit) {
    btnGoogleSubmit.addEventListener('click', () => {
      const email    = googleEmailInput?.value.trim() || '';
      const password = googlePassInput?.value        || '';

      if (!email || !email.includes('@')) { shakeInput(googleEmailInput); showToast('Informe um e-mail válido.', 'error'); return; }
      if (!password) { shakeInput(googlePassInput); showToast('Informe sua senha.', 'error'); return; }

      const result = loginWithPassword(email, password);
      if (!result.ok) {
        showToast(result.msg, 'error');
        if (googleEmailInput) shakeInput(googleEmailInput);
        return;
      }

      googleOverlay?.classList.remove('open');
      const user = { ...result.user, sub: result.user.email };
      sessionStorage.setItem('ffl_session', JSON.stringify(user));
      showToast(`Bem-vindo(a), ${result.user.nome}! 👋`, 'success');
      setTimeout(() => showDashboard(user), 500);
    });
  }

  // ── Logout ──────────────────────────────────────────────────
  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      sessionStorage.removeItem('ffl_session');
      window.location.reload();
    });
  }
});
