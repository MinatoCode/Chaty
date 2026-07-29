import { authStore } from '../../store/authStore.js';

export default function authView() {
  const element = document.createElement('div');
  element.className = 'auth-view';
  element.innerHTML = `
    <div class="auth-card">
      <h2>Welcome to Chaty</h2>
      <p>Sign in to continue your conversations.</p>
      <form class="auth-form">
        <input name="name" type="text" placeholder="Your name" style="display:none;" />
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Continue</button>
      </form>
      <p class="auth-switch">Need an account? <a href="#" class="toggle-mode">Create one</a></p>
      <div class="auth-message"></div>
    </div>
  `;

  const form = element.querySelector('.auth-form');
  const message = element.querySelector('.auth-message');
  const toggleMode = element.querySelector('.toggle-mode');
  const title = element.querySelector('h2');
  const subtitle = element.querySelector('p');
  const nameInput = element.querySelector('input[name="name"]');
  const emailInput = element.querySelector('input[name="email"]');
  const passwordInput = element.querySelector('input[name="password"]');
  const submitButton = element.querySelector('button[type="submit"]');

  let mode = 'login';

  const setMode = (nextMode) => {
    mode = nextMode;
    title.textContent = nextMode === 'login' ? 'Welcome to Chaty' : 'Create your account';
    subtitle.textContent = nextMode === 'login' ? 'Sign in to continue your conversations.' : 'Join Chaty and start messaging.';
    toggleMode.textContent = nextMode === 'login' ? 'Create one' : 'Sign in';
    submitButton.textContent = nextMode === 'login' ? 'Continue' : 'Create account';
    nameInput.style.display = nextMode === 'register' ? 'block' : 'none';
  };

  toggleMode.addEventListener('click', (event) => {
    event.preventDefault();
    setMode(mode === 'login' ? 'register' : 'login');
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
