import { authStore } from '../../store/authStore.js';

export default function authView() {
  const element = document.createElement('div');
  element.className = 'auth-view';
  element.innerHTML = `
    <div class="auth-card">
      <div class="auth-header">
        <div>
          <h2>Welcome to Chaty</h2>
          <p class="auth-subtitle">Sign in to continue your conversations.</p>
        </div>
        <div class="auth-mode-toggle">
          <button type="button" class="mode-button active" data-mode="login">Login</button>
          <button type="button" class="mode-button" data-mode="register">Register</button>
        </div>
      </div>
      <form class="auth-form">
        <input name="name" type="text" placeholder="Your name" class="auth-name" style="display:none;" />
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Continue</button>
      </form>
      <div class="auth-message"></div>
    </div>
  `;

  const form = element.querySelector('.auth-form');
  const message = element.querySelector('.auth-message');
  const modeButtons = element.querySelectorAll('.mode-button');
  const title = element.querySelector('h2');
  const subtitle = element.querySelector('.auth-subtitle');
  const nameInput = element.querySelector('input[name="name"]');
  const emailInput = element.querySelector('input[name="email"]');
  const passwordInput = element.querySelector('input[name="password"]');
  const submitButton = element.querySelector('button[type="submit"]');

  let mode = 'login';

  const setMode = (nextMode) => {
    mode = nextMode;
    title.textContent = nextMode === 'login' ? 'Welcome to Chaty' : 'Create your account';
    subtitle.textContent = nextMode === 'login' ? 'Sign in to continue your conversations.' : 'Join Chaty and start messaging.';
    submitButton.textContent = nextMode === 'login' ? 'Continue' : 'Create account';
    nameInput.style.display = nextMode === 'register' ? 'block' : 'none';
    nameInput.required = nextMode === 'register';
    if (nextMode === 'login') {
      nameInput.value = '';
    }

    modeButtons.forEach((button) => {
      button.classList.toggle('active', button.dataset.mode === nextMode);
    });
  };

  modeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setMode(button.dataset.mode);
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    message.textContent = '';

    const payload = {
      email: emailInput.value.trim(),
      password: passwordInput.value.trim()
    };

    if (mode === 'register') {
      const nameInput = element.querySelector('input[name="name"]');
      const name = nameInput ? nameInput.value.trim() : '';
      if (!name) {
        message.textContent = 'Please enter your name.';
        return;
      }
      payload.name = name;
    }

    try {
      if (mode === 'login') {
        await authStore.login(payload);
      } else {
        await authStore.register(payload);
      }
      window.location.reload();
    } catch (error) {
      message.textContent = error.message;
    }
  });

  return element;
}
