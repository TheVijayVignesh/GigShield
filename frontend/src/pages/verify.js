function renderVerify(phoneHint) {
    const app = document.getElementById('app');
    app.innerHTML = '';

    const partnerId = sessionStorage.getItem('partner_id');

    const container = document.createElement('div');
    container.className = 'min-h-screen flex flex-col items-center justify-center p-6';
    container.style.backgroundColor = 'var(--bg-base)';
    container.innerHTML = `
        <!-- Card -->
        <div class="w-full max-w-md rounded-2xl shadow-xl relative overflow-hidden" style="background-color: var(--bg-card);">
            <!-- Header with logo and back button -->
            <div class="flex items-center justify-between p-6 pb-2">
                <button id="back-btn" class="p-2 rounded-lg hover:opacity-70 transition-opacity" style="color: var(--text-secondary);">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
                <span class="text-2xl font-bold" style="color: var(--accent); font-family: 'Syne', sans-serif;">GigShield</span>
                <div class="w-10"></div>
            </div>

            <div class="p-6 pt-2">
                <!-- Shield icon -->
                <div class="flex justify-center mb-4">
                    <div class="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style="background-color: var(--accent-light);">
                        🛡️
                    </div>
                </div>

                <!-- Heading -->
                <h2 class="text-2xl font-bold text-center mb-2" style="color: var(--text-primary); font-family: 'Syne', sans-serif;">Verify your number</h2>

                <!-- Subtext -->
                <p class="text-sm text-center mb-6" style="color: var(--text-secondary);">OTP sent to ****${phoneHint}</p>

                <!-- OTP inputs -->
                <div class="flex justify-center gap-2 mb-4" id="otp-container">
                    <input type="text" inputmode="numeric" maxlength="1" class="otp-digit w-12 h-12 text-center text-xl font-bold rounded-lg border-2 outline-none transition-all" style="background-color: var(--bg-base); border-color: var(--border); color: var(--text-primary);" />
                    <input type="text" inputmode="numeric" maxlength="1" class="otp-digit w-12 h-12 text-center text-xl font-bold rounded-lg border-2 outline-none transition-all" style="background-color: var(--bg-base); border-color: var(--border); color: var(--text-primary);" />
                    <input type="text" inputmode="numeric" maxlength="1" class="otp-digit w-12 h-12 text-center text-xl font-bold rounded-lg border-2 outline-none transition-all" style="background-color: var(--bg-base); border-color: var(--border); color: var(--text-primary);" />
                    <input type="text" inputmode="numeric" maxlength="1" class="otp-digit w-12 h-12 text-center text-xl font-bold rounded-lg border-2 outline-none transition-all" style="background-color: var(--bg-base); border-color: var(--border); color: var(--text-primary);" />
                    <input type="text" inputmode="numeric" maxlength="1" class="otp-digit w-12 h-12 text-center text-xl font-bold rounded-lg border-2 outline-none transition-all" style="background-color: var(--bg-base); border-color: var(--border); color: var(--text-primary);" />
                    <input type="text" inputmode="numeric" maxlength="1" class="otp-digit w-12 h-12 text-center text-xl font-bold rounded-lg border-2 outline-none transition-all" style="background-color: var(--bg-base); border-color: var(--border); color: var(--text-primary);" />
                </div>

                <!-- Error message -->
                <p id="verify-error" class="text-sm text-center mb-4 hidden" style="color: #dc2626;">Incorrect OTP. Try again.</p>

                <!-- Verify button -->
                <button id="verify-btn" class="w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all" style="background-color: var(--accent); color: white; cursor: pointer;">
                    <span id="verify-btn-text">Verify OTP →</span>
                    <span id="verify-spinner" class="hidden">
                        <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.139 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </span>
                </button>

                <!-- Timer / Resend -->
                <div class="text-center mt-4">
                    <span id="resend-timer" class="text-sm" style="color: var(--text-secondary);">Resend OTP in <span id="countdown">0:59</span></span>
                    <a id="resend-link" href="#" class="text-sm hidden font-medium" style="color: var(--accent);">Resend OTP</a>
                </div>
            </div>
        </div>

        <!-- Dev mode helper -->
        <div class="w-full max-w-md mt-4 p-3 rounded-lg text-xs" style="background-color: var(--accent-light); border: 1px solid var(--accent); color: var(--text-secondary);">
            🧪 Dev mode: Check your terminal running the FastAPI server for the OTP printed there.
        </div>
    `;

    // ✅ CRITICAL — attach to DOM before querying any elements
    app.appendChild(container);

    // Add shake animation style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-10px); }
            40%, 80% { transform: translateX(10px); }
        }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .otp-digit:focus { border-color: var(--accent) !important; }
    `;
    document.head.appendChild(style);

    // Back button
    document.getElementById('back-btn').addEventListener('click', () => renderLogin());

    // OTP input handling
    const otpInputs = document.querySelectorAll('.otp-digit');
    otpInputs[0].focus();

    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            // Only allow digits
            e.target.value = e.target.value.replace(/\D/g, '');
            if (e.target.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
                otpInputs[index - 1].focus();
            }
            if (e.key === 'Enter') {
                document.getElementById('verify-btn').click();
            }
        });

        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
            digits.split('').forEach((digit, i) => {
                if (i < otpInputs.length) otpInputs[i].value = digit;
            });
            const focusIndex = Math.min(digits.length, otpInputs.length - 1);
            otpInputs[focusIndex].focus();
        });
    });

    // Countdown timer
    let secondsLeft = 59;
    const countdownEl = document.getElementById('countdown');
    const resendTimerEl = document.getElementById('resend-timer');
    const resendLinkEl = document.getElementById('resend-link');

    const startTimer = () => {
        secondsLeft = 59;
        resendTimerEl.classList.remove('hidden');
        resendLinkEl.classList.add('hidden');

        const interval = setInterval(() => {
            secondsLeft--;
            const mins = Math.floor(secondsLeft / 60);
            const secs = secondsLeft % 60;
            countdownEl.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
            if (secondsLeft <= 0) {
                clearInterval(interval);
                resendTimerEl.classList.add('hidden');
                resendLinkEl.classList.remove('hidden');
            }
        }, 1000);
    };

    startTimer();

    // Resend OTP
    resendLinkEl.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ partner_id: partnerId })
            });
            if (response.ok) {
                otpInputs.forEach(input => input.value = '');
                otpInputs[0].focus();
                startTimer();
            }
        } catch (err) {
            console.error('Resend failed:', err);
        }
    });

    // Verify button
    const verifyBtn = document.getElementById('verify-btn');
    const verifyBtnText = document.getElementById('verify-btn-text');
    const verifySpinner = document.getElementById('verify-spinner');
    const verifyError = document.getElementById('verify-error');
    const otpContainer = document.getElementById('otp-container');

    verifyBtn.addEventListener('click', async () => {
        const otp = Array.from(otpInputs).map(i => i.value).join('');

        if (otp.length !== 6) {
            verifyError.textContent = 'Please enter all 6 digits.';
            verifyError.classList.remove('hidden');
            return;
        }

        verifyBtnText.classList.add('hidden');
        verifySpinner.classList.remove('hidden');
        verifyBtn.disabled = true;
        verifyBtn.style.opacity = '0.7';
        verifyError.classList.add('hidden');

        try {
            const response = await fetch('http://localhost:8000/auth/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ partner_id: partnerId, otp: otp })
            });

            if (response.status === 401) {
                otpContainer.classList.add('animate-shake');
                verifyError.textContent = 'Incorrect OTP. Try again.';
                verifyError.classList.remove('hidden');
                setTimeout(() => otpContainer.classList.remove('animate-shake'), 500);
                otpInputs.forEach(i => i.value = '');
                otpInputs[0].focus();
            } else if (response.ok) {
                const data = await response.json();
                sessionStorage.setItem('access_token', data.access_token);
                renderDashboard();
            } else {
                verifyError.textContent = 'Something went wrong. Please try again.';
                verifyError.classList.remove('hidden');
            }
        } catch (err) {
            verifyError.textContent = 'Network error. Is the backend server running?';
            verifyError.classList.remove('hidden');
        } finally {
            verifyBtnText.classList.remove('hidden');
            verifySpinner.classList.add('hidden');
            verifyBtn.disabled = false;
            verifyBtn.style.opacity = '1';
        }
    });
}