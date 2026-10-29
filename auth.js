/**
 * FOODforLIFE – auth.js v3
 * Login-first, Cadastro, Recuperação de Senha (e-mail → código → nova senha)
 */

// ─────────────────────────────────────────────────────────────
//  ESTADO GLOBAL DE RECUPERAÇÃO
// ─────────────────────────────────────────────────────────────
let _resetEmail = '';
let _resetCode  = '';

// ─────────────────────────────────────────────────────────────
//  SESSÃO / CONTAS
// ─────────────────────────────────────────────────────────────
function getCurrentUser() {
  try { return JSON.parse(sessionStorage.getItem('ffl_session')) || null; }
  catch { return null; }
}

function userStorageKey(suffix) {
  const u = getCurrentUser();
  const uid = ((u && (u.email || u.sub || u.nome)) || 'guest')
    .toString().toLowerCase().replace(/[^a-z0-9@._-]/g, '_');
  return `foodforlife_${uid}_${suffix}`;
}

window.userStorageKey = userStorageKey;
window.getCurrentUser = getCurrentUser;

const ACCOUNTS_KEY = 'ffl_accounts';

function loadAccounts() {
  try { return JSON.parse(localStorage.getItem(ACCOUNTS_KEY)) || {}; }
  catch { return {}; }
}
function saveAccounts(a) { localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(a)); }

function hashPassword(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h) ^ str.charCodeAt(i);
  return (h >>> 0).toString(16);
}

function registerAccount(name, email, phone, password) {
  const accounts = loadAccounts();
  const key = email.toLowerCase().trim();
  if (accounts[key]) return { ok: false, msg: 'Este e-mail já está cadastrado. Faça login.' };
  accounts[key] = { nome: name, email: key, whatsapp: phone, passwordHash: hashPassword(password), createdAt: new Date().toISOString() };
  saveAccounts(accounts);
  return { ok: true, user: accounts[key] };
}

function loginWithPassword(email, password) {
  const accounts = loadAccounts();
  const key = email.toLowerCase().trim();
  const acc = accounts[key];
  if (!acc) return { ok: false, msg: 'E-mail não encontrado. Cadastre-se primeiro.' };
  if (acc.passwordHash !== hashPassword(password)) return { ok: false, msg: 'Senha incorreta. Tente novamente.' };
  return { ok: true, user: acc };
}

function resetPasswordFor(email, newPassword) {
  const accounts = loadAccounts();
  const key = email.toLowerCase().trim();
  if (!accounts[key]) return false;
  accounts[key].passwordHash = hashPassword(newPassword);
  saveAccounts(accounts);
  return true;
}

// ─────────────────────────────────────────────────────────────
//  NAVEGAÇÃO DE PAINÉIS
// ─────────────────────────────────────────────────────────────
function showPanel(id) {
  document.querySelectorAll('.auth-panel').forEach(p => {
    p.classList.remove('active', 'slide-in-right', 'slide-in-left');
  });
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active', 'slide-in-right');
  }
  if (window.lucide) lucide.createIcons();
}

// ─────────────────────────────────────────────────────────────
//  DASHBOARD
// ─────────────────────────────────────────────────────────────
function showDashboard(user) {
  document.getElementById('registration-section').style.display = 'none';
  document.getElementById('dashboard-section').style.display    = 'block';
  document.getElementById('nav-tabs').style.display             = 'flex';
  document.getElementById('stats-bar').style.display            = 'flex';
  document.getElementById('user-profile').style.display         = 'flex';
  document.getElementById('user-name-display').textContent      = user.nome || user.email || '';

  const saved = localStorage.getItem('foodforlife_theme') || 'dark';
  if (window.applyTheme) window.applyTheme(saved);

  if (window.lucide) lucide.createIcons();
  window.dispatchEvent(new CustomEvent('user:ready', { detail: user }));
}

// ─────────────────────────────────────────────────────────────
//  TOAST
// ─────────────────────────────────────────────────────────────
function showToast(msg, type = 'error') {
  let t = document.getElementById('ffl-toast');
  if (!t) { t = document.createElement('div'); t.id = 'ffl-toast'; document.body.appendChild(t); }
  t.className = `ffl-toast ffl-toast--${type}`;
  t.innerHTML = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 4000);
}

function showErr(id, msg) {
  const el = document.getElementById(id);
  if (el) { el.textContent = msg; el.style.display = 'block'; }
}
function hideErr(id) {
  const el = document.getElementById(id);
  if (el) { el.textContent = ''; el.style.display = 'none'; }
}
function shakeInput(el) {
  if (!el) return;
  el.classList.remove('shake-anim');
  void el.offsetWidth;
  el.classList.add('shake-anim');
  setTimeout(() => el.classList.remove('shake-anim'), 700);
}

// ─────────────────────────────────────────────────────────────
//  TOGGLE MOSTRAR/OCULTAR SENHA
// ─────────────────────────────────────────────────────────────
function setupPasswordToggle(btnId, inputId) {
  const btn   = document.getElementById(btnId);
  const input = document.getElementById(inputId);
  if (!btn || !input) return;
  btn.addEventListener('click', () => {
    const isPass = input.type === 'password';
    input.type = isPass ? 'text' : 'password';
    btn.innerHTML = isPass
      ? '<i data-lucide="eye-off"></i>'
      : '<i data-lucide="eye"></i>';
    if (window.lucide) lucide.createIcons();
  });
}

// ─────────────────────────────────────────────────────────────
//  FORÇA DA SENHA
// ─────────────────────────────────────────────────────────────
function checkPasswordStrength(password) {
  let score = 0;
  if (password.length >= 6)  score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

function updateStrengthUI(password) {
  const bar   = document.getElementById('strength-bar');
  const label = document.getElementById('strength-label');
  const wrap  = document.getElementById('password-strength');
  if (!bar || !label || !wrap) return;

  if (!password) { wrap.style.display = 'none'; return; }
  wrap.style.display = 'flex';

  const score = checkPasswordStrength(password);
  const levels = [
    { label: 'Muito fraca', color: '#e05454', width: '20%' },
    { label: 'Fraca',       color: '#e07a3a', width: '40%' },
    { label: 'Razoável',    color: '#d4832a', width: '60%' },
    { label: 'Boa',         color: '#5a9a3a', width: '80%' },
    { label: 'Forte',       color: '#3d7a25', width: '100%' },
  ];
  const lvl = levels[Math.min(score - 1, 4)] || levels[0];
  bar.style.width      = lvl.width;
  bar.style.background = lvl.color;
  label.textContent    = lvl.label;
  label.style.color    = lvl.color;
}

// ─────────────────────────────────────────────────────────────
//  CÓDIGO ALEATÓRIO DE 6 DÍGITOS (criptograficamente seguro)
// ─────────────────────────────────────────────────────────────
const RESET_CODES_KEY = 'ffl_reset_codes';

function generateCode() {
  // Usa crypto.getRandomValues para códigos realmente aleatórios e únicos
  let code;
  if (window.crypto && window.crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    code = String(100000 + (arr[0] % 900000));
  } else {
    code = String(Math.floor(100000 + Math.random() * 900000));
  }

  // Garante unicidade verificando códigos já usados
  const usedCodes = JSON.parse(localStorage.getItem(RESET_CODES_KEY) || '[]');
  while (usedCodes.includes(code)) {
    if (window.crypto && window.crypto.getRandomValues) {
      const arr = new Uint32Array(1);
      window.crypto.getRandomValues(arr);
      code = String(100000 + (arr[0] % 900000));
    } else {
      code = String(Math.floor(100000 + Math.random() * 900000));
    }
  }

  // Registra o código como usado (mantém últimos 100)
  usedCodes.push(code);
  if (usedCodes.length > 100) usedCodes.splice(0, usedCodes.length - 100);
  localStorage.setItem(RESET_CODES_KEY, JSON.stringify(usedCodes));

  return code;
}

// ─────────────────────────────────────────────────────────────
//  ARMAZENAMENTO SEGURO DE CÓDIGOS COM EXPIRAÇÃO
// ─────────────────────────────────────────────────────────────
function storeResetCode(email, code) {
  const data = {
    email: email.toLowerCase().trim(),
    code,
    createdAt: Date.now(),
    expiresAt: Date.now() + (10 * 60 * 1000), // 10 minutos
  };
  localStorage.setItem('ffl_active_reset', JSON.stringify(data));
}

function getStoredResetCode(email) {
  try {
    const data = JSON.parse(localStorage.getItem('ffl_active_reset'));
    if (!data) return null;
    if (data.email !== email.toLowerCase().trim()) return null;
    if (Date.now() > data.expiresAt) {
      localStorage.removeItem('ffl_active_reset');
      return null; // Código expirado
    }
    return data.code;
  } catch {
    return null;
  }
}

function clearStoredResetCode() {
  localStorage.removeItem('ffl_active_reset');
}

// ─────────────────────────────────────────────────────────────
//  ENVIO DE E-MAIL VIA EmailJS (configuração real)
// ─────────────────────────────────────────────────────────────
// ╔══════════════════════════════════════════════════════════════╗
// ║  INSTRUÇÕES PARA ATIVAR ENVIO REAL DE E-MAIL:               ║
// ║                                                             ║
// ║  1. Crie uma conta grátis em https://www.emailjs.com/       ║
// ║  2. Adicione um serviço de e-mail (Gmail, Outlook, etc.)    ║
// ║  3. Crie um template com estas variáveis:                   ║
// ║     - {{to_email}}   → e-mail do destinatário               ║
// ║     - {{reset_code}} → código de 6 dígitos                  ║
// ║     - {{app_name}}   → nome do app (FOODforLIFE)            ║
// ║  4. Copie os IDs abaixo e substitua os valores              ║
// ╚══════════════════════════════════════════════════════════════╝
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // Cole sua Public Key aqui
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // Cole seu Service ID aqui
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // Cole seu Template ID aqui

let _emailjsInitialized = false;

async function sendResetCode(email, code) {
  // Armazena o código com expiração
  storeResetCode(email, code);

  // ── Tentativa real via EmailJS ──────────────────────────────
  if (EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' && window.emailjs) {
    try {
      if (!_emailjsInitialized) {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        _emailjsInitialized = true;
      }
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: email,
        reset_code: code,
        app_name: 'FOODforLIFE',
        message: `Seu código de redefinição de senha é: ${code}\n\nEsse código é válido por 10 minutos.\n\nSe você não solicitou a redefinição, ignore este e-mail.`,
      });
      console.log('✅ E-mail de reset enviado com sucesso via EmailJS para:', email);
      return { real: true };
    } catch (err) {
      console.warn('⚠️ EmailJS falhou, usando modo demo:', err);
    }
  }

  // ── Modo demo (sem EmailJS configurado) ─────────────────────
  console.log(`📩 [DEMO] Código de reset para ${email}: ${code}`);
  return { real: false, code };
}

// ─────────────────────────────────────────────────────────────
//  DIGIT INPUTS DO CÓDIGO
// ─────────────────────────────────────────────────────────────
function setupCodeInputs() {
  const digits = document.querySelectorAll('.code-digit');
  digits.forEach((input, idx) => {
    input.addEventListener('input', (e) => {
      input.value = input.value.replace(/[^0-9]/g, '').slice(-1);
      if (input.value && idx < digits.length - 1) digits[idx + 1].focus();
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && idx > 0) digits[idx - 1].focus();
    });
    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasted = (e.clipboardData || window.clipboardData).getData('text').replace(/[^0-9]/g, '');
      [...pasted].slice(0, 6).forEach((ch, i) => {
        if (digits[i]) { digits[i].value = ch; }
      });
      const last = Math.min(pasted.length, digits.length - 1);
      digits[last].focus();
    });
  });
}

function getCodeFromInputs() {
  return [...document.querySelectorAll('.code-digit')].map(d => d.value).join('');
}

function clearCodeInputs() {
  document.querySelectorAll('.code-digit').forEach(d => { d.value = ''; });
  const first = document.querySelector('.code-digit');
  if (first) first.focus();
}

// ─────────────────────────────────────────────────────────────
//  INICIALIZAÇÃO DO DOM
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // Tema antes do login
  const savedTheme = localStorage.getItem('foodforlife_theme') || 'dark';
  if (savedTheme === 'light') document.documentElement.setAttribute('data-theme', 'light');

  // Restaurar sessão
  const stored = sessionStorage.getItem('ffl_session');
  if (stored) {
    try { showDashboard(JSON.parse(stored)); return; } catch {}
  }

  // Redirect param backend
  const urlParams = new URLSearchParams(window.location.search);
  const nameParam = urlParams.get('nome');
  if (nameParam) {
    const u = { nome: nameParam, email: nameParam, sub: nameParam };
    sessionStorage.setItem('ffl_session', JSON.stringify(u));
    window.history.replaceState({}, document.title, window.location.pathname);
    showDashboard(u);
    return;
  }

  // Painel inicial = Login
  showPanel('panel-login');

  // Configura toggles de senha
  setupPasswordToggle('toggle-login-pass', 'login-password');
  setupPasswordToggle('toggle-reg-pass',   'user-password');
  setupPasswordToggle('toggle-new-pass',   'new-password');
  setupPasswordToggle('toggle-confirm-pass','confirm-password');

  // Digit inputs
  setupCodeInputs();

  // ── Força da senha em tempo real ─────────────────────────────
  document.getElementById('new-password')?.addEventListener('input', (e) => {
    updateStrengthUI(e.target.value);
  });

  // ══════════════════════════════════════════════════════
  //  NAVEGAÇÃO DOS PAINÉIS
  // ══════════════════════════════════════════════════════
  document.getElementById('btn-go-register')?.addEventListener('click', () => showPanel('panel-register'));
  document.getElementById('btn-go-login-from-reg')?.addEventListener('click', () => showPanel('panel-login'));
  document.getElementById('btn-back-from-register')?.addEventListener('click', () => showPanel('panel-login'));
  document.getElementById('btn-go-forgot')?.addEventListener('click', () => showPanel('panel-forgot-email'));
  document.getElementById('btn-back-from-forgot')?.addEventListener('click', () => showPanel('panel-login'));
  document.getElementById('btn-back-from-code')?.addEventListener('click', () => showPanel('panel-forgot-email'));

  // ── Google (login e register abre o mesmo modal) ─────────────
  const googleOverlay  = document.getElementById('google-login-modal-overlay');
  const btnCloseGoogle = document.getElementById('btn-close-google');
  function openGoogleModal() {
    googleOverlay?.classList.add('open');
    if (window.lucide) lucide.createIcons();
  }
  document.getElementById('btn-google-login')?.addEventListener('click',     openGoogleModal);
  document.getElementById('btn-google-login-reg')?.addEventListener('click', openGoogleModal);
  btnCloseGoogle?.addEventListener('click', () => googleOverlay?.classList.remove('open'));
  googleOverlay?.addEventListener('click', (e) => { if (e.target === googleOverlay) googleOverlay.classList.remove('open'); });

  // ══════════════════════════════════════════════════════
  //  FORMULÁRIO DE LOGIN
  // ══════════════════════════════════════════════════════
  document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email    = document.getElementById('login-email')?.value.trim() || '';
    const password = document.getElementById('login-password')?.value     || '';
    hideErr('login-email-error'); hideErr('login-pass-error');

    if (!email || !email.includes('@')) { showErr('login-email-error', 'Informe um e-mail válido.'); return; }
    if (!password) { showErr('login-pass-error', 'Informe sua senha.'); return; }

    const result = loginWithPassword(email, password);
    if (!result.ok) {
      showToast(result.msg, 'error');
      const passInput = document.getElementById('login-password');
      if (passInput) { passInput.value = ''; shakeInput(passInput); }
      return;
    }

    const user = { ...result.user, sub: result.user.email };
    sessionStorage.setItem('ffl_session', JSON.stringify(user));
    showToast(`Bem-vindo(a) de volta, ${result.user.nome}! 👋`, 'success');
    setTimeout(() => showDashboard(user), 600);
  });

  // ══════════════════════════════════════════════════════
  //  FORMULÁRIO DE CADASTRO
  // ══════════════════════════════════════════════════════
  document.getElementById('user-registration-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name     = document.getElementById('user-name')?.value.trim()  || '';
    const email    = document.getElementById('user-email')?.value.trim() || '';
    const phone    = document.getElementById('user-phone')?.value.trim() || '';
    const password = document.getElementById('user-password')?.value     || '';

    hideErr('reg-name-error'); hideErr('reg-email-error'); hideErr('reg-pass-error');
    let valid = true;
    if (!name)                          { showErr('reg-name-error',  'Nome é obrigatório.'); valid = false; }
    if (!email || !email.includes('@')) { showErr('reg-email-error', 'E-mail válido é necessário.'); valid = false; }
    if (password.length < 6)           { showErr('reg-pass-error',  'Senha deve ter pelo menos 6 caracteres.'); valid = false; }
    if (!valid) return;

    const result = registerAccount(name, email, phone, password);
    if (!result.ok) { showToast(result.msg, 'error'); return; }

    try {
      await fetch('/api/users', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: name, email, sub: email, whatsapp: phone }) });
    } catch {}

    const user = { ...result.user, sub: email };
    sessionStorage.setItem('ffl_session', JSON.stringify(user));
    showToast(`Conta criada! Bem-vindo(a), ${name} 🎉`, 'success');
    setTimeout(() => showDashboard(user), 700);
  });

  // ══════════════════════════════════════════════════════
  //  RECUPERAÇÃO – ETAPA 1: ENVIAR CÓDIGO
  // ══════════════════════════════════════════════════════
  document.getElementById('forgot-email-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideErr('forgot-email-error');
    const email = document.getElementById('forgot-email')?.value.trim() || '';
    if (!email || !email.includes('@')) { showErr('forgot-email-error', 'Informe um e-mail válido.'); return; }

    const accounts = loadAccounts();
    if (!accounts[email.toLowerCase()]) {
      showErr('forgot-email-error', 'E-mail não encontrado. Verifique ou cadastre-se.');
      return;
    }

    const btn = document.getElementById('btn-send-code');
    btn.disabled = true;
    btn.innerHTML = '<span class="spin-mini"></span> Enviando...';

    _resetEmail = email.toLowerCase();
    _resetCode  = generateCode();

    const result = await sendResetCode(email, _resetCode);

    btn.disabled = false;
    btn.innerHTML = '<i data-lucide="send"></i> Enviar código';
    if (window.lucide) lucide.createIcons();

    // Preenche o painel de código
    document.getElementById('code-dest-email').textContent = email;

    // Modo demo: exibe o código na tela
    const notice  = document.getElementById('demo-code-notice');
    const display = document.getElementById('demo-code-display');
    if (!result.real && notice && display) {
      notice.style.display = 'flex';
      display.textContent  = _resetCode;
    } else if (notice) {
      notice.style.display = 'none';
    }

    clearCodeInputs();
    showPanel('panel-forgot-code');
    showToast('Código enviado! Verifique seu e-mail 📩', 'success');
  });

  // ── Reenviar código ──────────────────────────────────────────
  document.getElementById('btn-resend-code')?.addEventListener('click', async () => {
    if (!_resetEmail) { showPanel('panel-forgot-email'); return; }
    _resetCode = generateCode();
    const result = await sendResetCode(_resetEmail, _resetCode);

    const display = document.getElementById('demo-code-display');
    const notice  = document.getElementById('demo-code-notice');
    if (!result.real && display && notice) { display.textContent = _resetCode; notice.style.display = 'flex'; }

    clearCodeInputs();
    showToast('Novo código enviado! Verifique seu e-mail 📩', 'success');
  });

  // ══════════════════════════════════════════════════════
  //  RECUPERAÇÃO – ETAPA 2: VERIFICAR CÓDIGO
  // ══════════════════════════════════════════════════════
  document.getElementById('forgot-code-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    hideErr('code-error');
    const entered = getCodeFromInputs();

    if (entered.length < 6) { showErr('code-error', 'Digite todos os 6 dígitos.'); return; }

    // Verifica código na memória E no armazenamento (fallback)
    const storedCode = getStoredResetCode(_resetEmail);
    const validCode = entered === _resetCode || (storedCode && entered === storedCode);

    if (!validCode) {
      // Verifica se expirou
      const activeReset = JSON.parse(localStorage.getItem('ffl_active_reset') || 'null');
      if (activeReset && Date.now() > activeReset.expiresAt) {
        showErr('code-error', 'Código expirado. Solicite um novo código.');
      } else {
        showErr('code-error', 'Código incorreto. Tente novamente.');
      }
      // Animação de erro nos inputs
      document.querySelectorAll('.code-digit').forEach(d => {
        d.classList.remove('code-error-anim');
        void d.offsetWidth;
        d.classList.add('code-error-anim');
      });
      setTimeout(() => {
        clearCodeInputs();
        document.querySelectorAll('.code-digit').forEach(d => d.classList.remove('code-error-anim'));
      }, 600);
      return;
    }

    // Código correto → próxima etapa
    document.getElementById('new-password').value = '';
    document.getElementById('confirm-password').value = '';
    updateStrengthUI('');
    showPanel('panel-new-password');
    showToast('Código verificado! ✅ Defina sua nova senha.', 'success');
  });

  // ══════════════════════════════════════════════════════
  //  RECUPERAÇÃO – ETAPA 3: NOVA SENHA
  // ══════════════════════════════════════════════════════
  document.getElementById('new-password-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    hideErr('new-pass-error'); hideErr('confirm-pass-error');

    const newPass     = document.getElementById('new-password')?.value     || '';
    const confirmPass = document.getElementById('confirm-password')?.value || '';

    if (newPass.length < 6)     { showErr('new-pass-error', 'A senha deve ter pelo menos 6 caracteres.'); return; }
    if (newPass !== confirmPass) { showErr('confirm-pass-error', 'As senhas não coincidem.'); return; }

    const ok = resetPasswordFor(_resetEmail, newPass);
    if (!ok) { showToast('Erro ao redefinir senha. Tente novamente.', 'error'); return; }

    // Salva o e-mail antes de limpar para pré-preencher o login
    const resetEmailForLogin = _resetEmail;

    // Limpa estado de reset
    _resetEmail = '';
    _resetCode  = '';
    clearStoredResetCode();

    showToast('Senha redefinida com sucesso! 🎉 Faça login.', 'success');

    // Vai para o login e pré-preenche o e-mail
    setTimeout(() => {
      showPanel('panel-login');
      const loginEmailInput = document.getElementById('login-email');
      if (loginEmailInput) loginEmailInput.value = resetEmailForLogin || '';
    }, 800);
  });

  // ══════════════════════════════════════════════════════
  //  GOOGLE MODAL – login com email+senha
  // ══════════════════════════════════════════════════════
  document.getElementById('btn-google-submit-custom')?.addEventListener('click', () => {
    const email    = document.getElementById('google-input-email')?.value.trim() || '';
    const password = document.getElementById('google-input-password')?.value     || '';
    if (!email || !email.includes('@')) { showToast('Informe um e-mail válido.', 'error'); return; }
    if (!password) { showToast('Informe sua senha.', 'error'); return; }

    const result = loginWithPassword(email, password);
    if (!result.ok) { showToast(result.msg, 'error'); return; }

    googleOverlay?.classList.remove('open');
    const user = { ...result.user, sub: result.user.email };
    sessionStorage.setItem('ffl_session', JSON.stringify(user));
    showToast(`Bem-vindo(a), ${result.user.nome}! 👋`, 'success');
    setTimeout(() => showDashboard(user), 600);
  });

  // ══════════════════════════════════════════════════════
  //  LOGOUT
  // ══════════════════════════════════════════════════════
  document.getElementById('btn-logout')?.addEventListener('click', () => {
    sessionStorage.removeItem('ffl_session');
    window.location.reload();
  });

});
