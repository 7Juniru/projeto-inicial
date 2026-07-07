/**
 * FOODforLIFE – auth.js
 * Handles: user registration, login state, Google OAuth mock, dashboard toggle
 */

document.addEventListener('DOMContentLoaded', () => {
  // ── Check redirect from backend ─────────────────────────────
  const urlParams = new URLSearchParams(window.location.search);
  const nameParam = urlParams.get('nome');
  if (nameParam) {
    sessionStorage.setItem('user', JSON.stringify({ nome: nameParam }));
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  // ── Restore session ─────────────────────────────────────────
  const stored = sessionStorage.getItem('user');
  if (stored) {
    showDashboard(JSON.parse(stored));
  }

  // ── Email/Password registration form ────────────────────────
  const form = document.getElementById('user-registration-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name     = document.getElementById('user-name')?.value.trim()     || '';
      const email    = document.getElementById('user-email')?.value.trim()    || '';
      const phone    = document.getElementById('user-phone')?.value.trim()    || '';
      const password = document.getElementById('user-password')?.value        || '';

      // Basic validation
      let valid = true;
      if (!name)     { showErr('reg-name-error'); valid = false; }
      if (!email || !email.includes('@')) { showErr('reg-email-error'); valid = false; }
      if (!password) { showErr('reg-pass-error'); valid = false; }
      if (!valid) return;

      const user = { nome: name, email, whatsapp: phone, password };

      try {
        const res = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });

        if (res.redirected) { window.location.href = res.url; return; }

        let saved;
        if (res.ok) {
          try { saved = await res.json(); } catch { saved = user; }
        } else {
          throw new Error('Registration failed with status ' + res.status);
        }

        sessionStorage.setItem('user', JSON.stringify(saved));
        showDashboard(saved);
      } catch (err) {
        console.error(err);
        // Fallback: store locally and proceed
        sessionStorage.setItem('user', JSON.stringify(user));
        showDashboard(user);
      }
    });
  }

  // ── Google OAuth Simulator — Premium and Interactive ──
  const btnGoogle = document.getElementById('btn-google-login');
  const googleOverlay = document.getElementById('google-login-modal-overlay');
  const googleAccountsList = document.getElementById('google-accounts-list');
  const googleCustomForm = document.getElementById('google-custom-account-form');
  const btnCloseGoogle = document.getElementById('btn-close-google');
  
  if (btnGoogle && googleOverlay) {
    // Open modal
    btnGoogle.addEventListener('click', () => {
      googleOverlay.classList.add('open');
      // Reset to accounts list view
      googleAccountsList.style.display = 'flex';
      googleCustomForm.style.display = 'none';
      if (window.lucide) lucide.createIcons();
    });

    // Close modal
    const closeGoogleModal = () => {
      googleOverlay.classList.remove('open');
    };
    if (btnCloseGoogle) btnCloseGoogle.addEventListener('click', closeGoogleModal);
    googleOverlay.addEventListener('click', (e) => {
      if (e.target === googleOverlay) closeGoogleModal();
    });

    // Handle predefined account selection
    const accountItems = googleOverlay.querySelectorAll('.google-account-item:not(.google-use-another)');
    accountItems.forEach(item => {
      item.addEventListener('click', async () => {
        const email = item.getAttribute('data-email');
        const name = item.getAttribute('data-name');
        await performGoogleLogin(name, email);
      });
    });

    // Toggle custom form
    const btnGoogleAnother = document.getElementById('btn-google-another');
    if (btnGoogleAnother) {
      btnGoogleAnother.addEventListener('click', () => {
        googleAccountsList.style.display = 'none';
        googleCustomForm.style.display = 'block';
      });
    }

    const btnGoogleBackList = document.getElementById('btn-google-back-list');
    if (btnGoogleBackList) {
      btnGoogleBackList.addEventListener('click', () => {
        googleCustomForm.style.display = 'none';
        googleAccountsList.style.display = 'flex';
      });
    }

    // Submit custom Google account details
    const btnGoogleSubmitCustom = document.getElementById('btn-google-submit-custom');
    if (btnGoogleSubmitCustom) {
      btnGoogleSubmitCustom.addEventListener('click', async () => {
        const nameInput = document.getElementById('google-input-name');
        const emailInput = document.getElementById('google-input-email');
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();

        if (!name) { alert('Digite seu nome.'); return; }
        if (!email || !email.includes('@')) { alert('Digite um e-mail válido.'); return; }

        await performGoogleLogin(name, email);
      });
    }
  }

  // Core Google Auth handler
  async function performGoogleLogin(name, email) {
    if (googleOverlay) googleOverlay.classList.remove('open');
    const user = { nome: name, email, whatsapp: '', password: '' };
    try {
      const res = await fetch('/api/users/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      const saved = res.ok ? await res.json() : user;
      sessionStorage.setItem('user', JSON.stringify(saved));
      showDashboard(saved);
    } catch (err) {
      console.error('Error contacting Google API, using sessionStorage fallback:', err);
      sessionStorage.setItem('user', JSON.stringify(user));
      showDashboard(user);
    }
  }
});

/* ── Show Dashboard ────────────────────────────────────────── */
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

  if (window.lucide) lucide.createIcons();
}

/* ── Error helpers ─────────────────────────────────────────── */
function showErr(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = 'block';
}
