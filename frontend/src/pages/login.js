function renderLogin() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    // Main container
    const container = document.createElement('div');
    container.className = 'min-h-screen flex';
    container.innerHTML = `
        <!-- LEFT PANEL - Hidden on mobile, visible md+ -->
        <div class="hidden md:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden" style="background-color: var(--accent);">
            <!-- Decorative abstract pattern - concentric circles -->
            <svg class="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="circles" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="white" stroke-width="0.5"/>
                        <circle cx="50" cy="50" r="30" fill="none" stroke="white" stroke-width="0.5"/>
                        <circle cx="50" cy="50" r="20" fill="none" stroke="white" stroke-width="0.5"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#circles)"/>
            </svg>

            <!-- Top: Logo -->
            <div class="relative z-10">
                <h1 class="text-5xl font-extrabold text-white" style="font-family: 'Syne', sans-serif;">GigShield</h1>
            </div>

            <!-- Bottom: Tagline -->
            <div class="relative z-10">
                <p class="text-3xl font-bold text-white" style="font-family: 'Syne', sans-serif;">Income protection<br>for delivery partners</p>
            </div>
        </div>

        <!-- RIGHT PANEL -->
        <div class="w-full md:w-1/2 flex items-center justify-center relative" style="background-color: var(--bg-base);">
            <!-- Theme toggle - top right corner -->
            <button id="theme-toggle" class="absolute top-6 right-6 p-3 rounded-full hover:opacity-80 transition-opacity" style="background-color: var(--bg-card); border: 1px solid var(--border);">
                <span id="theme-icon">☀️</span>
            </button>

            <!-- Card -->
            <div class="w-full max-w-md p-8 mx-6 rounded-2xl shadow-lg" style="background-color: var(--bg-card);">
                <!-- Label -->
                <p class="text-xs font-medium tracking-widest uppercase mb-2" style="color: var(--text-secondary);">Delivery Partner Login</p>

                <!-- Heading -->
                <h2 class="text-3xl font-bold mb-3" style="color: var(--text-primary); font-family: 'Syne', sans-serif;">Welcome back</h2>

                <!-- Subtext -->
                <p class="text-sm mb-6" style="color: var(--text-secondary);">Enter your Partner ID to receive a one-time password</p>

                <!-- Form -->
                <div id="login-form">
                    <div class="mb-4">
                        <input
                            type="text"
                            id="partner-id-input"
                            placeholder="Partner ID — e.g. SWG-84729"
                            class="w-full px-4 py-3 rounded-xl border-2 outline-none transition-all"
                            style="background-color: var(--bg-base); border-color: var(--border); color: var(--text-primary);"
                        />
                        <p id="error-message" class="text-sm mt-2 hidden" style="color: #dc2626;">Partner ID not found. Check and try again.</p>
                    </div>

                    <button
                        id="login-btn"
                        class="w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
                        style="background-color: var(--accent); color: white; cursor: pointer;"
                    >
                        <span id="btn-text">Send OTP →</span>
                        <span id="btn-spinner" class="hidden">
                            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.139 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </span>
                    </button>
                </div>

                <!-- Footer text -->
                <p class="text-xs text-center mt-6" style="color: var(--text-secondary);">Protected by GigShield parametric cover</p>
            </div>
        </div>
    `;

    // ✅ THIS IS THE CRITICAL LINE — appends container to the DOM
    app.appendChild(container);

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        themeIcon.textContent = newTheme === 'light' ? '☀️' : '🌙';
    });

    // Wire up button click (replaced <form> with <div> to avoid submit quirks)
    const partnerIdInput = document.getElementById('partner-id-input');
    const loginBtn = document.getElementById('login-btn');
    const btnText = document.getElementById('btn-text');
    const btnSpinner = document.getElementById('btn-spinner');
    const errorMessage = document.getElementById('error-message');

    loginBtn.addEventListener('click', async () => {
        const partnerId = partnerIdInput.value.trim();

        if (!partnerId) {
            errorMessage.textContent = 'Please enter your Partner ID.';
            errorMessage.classList.remove('hidden');
            return;
        }

        // Show loading state
        btnText.classList.add('hidden');
        btnSpinner.classList.remove('hidden');
        loginBtn.disabled = true;
        loginBtn.style.opacity = '0.7';
        errorMessage.classList.add('hidden');

        try {
            const response = await fetch('http://localhost:8000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ partner_id: partnerId })
            });

            if (response.status === 404) {
                errorMessage.textContent = 'Partner ID not found. Check and try again.';
                errorMessage.classList.remove('hidden');
            } else if (response.ok) {
                const data = await response.json();
                sessionStorage.setItem('partner_id', partnerId);
                renderVerify(data.phone_hint);
            } else {
                errorMessage.textContent = 'Something went wrong. Please try again.';
                errorMessage.classList.remove('hidden');
            }
        } catch (err) {
            errorMessage.textContent = 'Network error. Is the backend server running?';
            errorMessage.classList.remove('hidden');
        } finally {
            btnText.classList.remove('hidden');
            btnSpinner.classList.add('hidden');
            loginBtn.disabled = false;
            loginBtn.style.opacity = '1';
        }
    });

    // Also allow Enter key on input
    partnerIdInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') loginBtn.click();
    });
}