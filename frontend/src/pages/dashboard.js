async function renderDashboard() {
    const app = document.getElementById('app');
    const access_token = sessionStorage.getItem('access_token');

    if (!access_token) {
        renderLogin();
        return;
    }

    try {
        const response = await fetch('http://localhost:8000/partner/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });

        if (response.status === 401) {
            sessionStorage.clear();
            renderLogin();
            return;
        }

        if (!response.ok) {
            sessionStorage.clear();
            renderLogin();
            return;
        }

        const partner = await response.json();

        // Determine status badge
        let statusBadge, statusBg;
        if (partner.status === 'active_gold') {
            statusBadge = '🥇 Gold Partner';
            statusBg = 'var(--warning)';
        } else if (partner.status === 'active_silver') {
            statusBadge = '🥈 Silver Partner';
            statusBg = '#64748B';
        } else {
            statusBadge = '🥉 Bronze Partner';
            statusBg = 'var(--accent)';
        }

        const firstName = partner.name.split(' ')[0];
        const initial = partner.name[0].toUpperCase();
        const zoneDisplay = partner.primary_zone.replace(/_/g, ' ');

        // Calculate mock premium
        const base = partner.avg_weekly_earnings_inr * 0.025;
        const premium = Math.min(400, Math.max(50, Math.round(base * 1.1 * 1.05)));
        const baseRounded = Math.round(base);
        const maxWeeklyBenefit = Math.floor(partner.avg_weekly_earnings_inr * 5 / 7 * 5);

        app.innerHTML = '';

        const container = document.createElement('div');
        container.innerHTML = `
            <!-- TOPBAR (sticky) -->
            <header class="sticky top-0 z-50 px-6 py-4" style="background-color: var(--bg-card); border-bottom: 1px solid var(--border);">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-2xl font-bold" style="color: var(--accent); font-family: 'Syne', sans-serif;">GigShield</h1>
                        <p class="text-xs" style="color: var(--text-secondary);">Partner Dashboard</p>
                    </div>
                    <div class="flex items-center gap-4">
                        <button id="theme-toggle" class="p-2 rounded-full hover:opacity-80 transition-opacity" style="background-color: var(--bg-base); border: 1px solid var(--border);">
                            <span id="theme-icon">☀️</span>
                        </button>
                        <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold" style="background-color: var(--accent); color: white;">
                            ${initial}
                        </div>
                        <button id="logout-btn" class="text-sm font-medium hover:opacity-70 transition-opacity" style="color: var(--text-secondary); cursor: pointer;">
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <!-- HERO SECTION -->
            <section class="px-6 py-8" style="background-color: var(--bg-base);">
                <div class="flex flex-wrap items-center gap-3 mb-2">
                    <h2 class="text-2xl font-bold" style="color: var(--text-primary); font-family: 'Syne', sans-serif;">
                        Good morning, ${firstName} 👋
                    </h2>
                    <span class="px-3 py-1 rounded-full text-sm font-medium" style="background-color: ${statusBg}; color: white;">
                        ${statusBadge}
                    </span>
                </div>
                <p class="text-sm" style="color: var(--text-secondary);">Here's your coverage snapshot for this week</p>
            </section>

            <!-- STATS ROW -->
            <section class="px-6 pb-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="p-5 rounded-2xl border transition-shadow hover:shadow-md" style="background-color: var(--bg-card); border-color: var(--border);">
                        <div class="flex items-start justify-between mb-3">
                            <div>
                                <p class="text-sm" style="color: var(--text-secondary);">Weekly Earnings</p>
                                <p class="text-2xl font-bold mt-1" style="color: var(--text-primary); font-family: 'Syne', sans-serif;">₹${partner.avg_weekly_earnings_inr}</p>
                            </div>
                            <span class="text-2xl">💰</span>
                        </div>
                        <p class="text-xs" style="color: var(--text-secondary);">30-day verified average</p>
                    </div>

                    <div class="p-5 rounded-2xl border transition-shadow hover:shadow-md" style="background-color: var(--bg-card); border-color: var(--border);">
                        <div class="flex items-start justify-between mb-3">
                            <div>
                                <p class="text-sm" style="color: var(--text-secondary);">Coverage Status</p>
                                <p class="text-2xl font-bold mt-1" style="color: var(--success); font-family: 'Syne', sans-serif;">Active</p>
                            </div>
                            <span class="text-2xl">🛡️</span>
                        </div>
                        <p class="text-xs" style="color: var(--text-secondary);">Renews in 6 days</p>
                    </div>

                    <div class="p-5 rounded-2xl border transition-shadow hover:shadow-md" style="background-color: var(--bg-card); border-color: var(--border);">
                        <div class="flex items-start justify-between mb-3">
                            <div>
                                <p class="text-sm" style="color: var(--text-secondary);">Operating Zone</p>
                                <p class="text-2xl font-bold mt-1" style="color: var(--text-primary); font-family: 'Syne', sans-serif;">${zoneDisplay}</p>
                            </div>
                            <span class="text-2xl">📍</span>
                        </div>
                        <p class="text-xs" style="color: var(--text-secondary);">Registered area</p>
                    </div>
                </div>
            </section>

            <!-- COVERAGE DETAILS -->
            <section class="px-6 pb-6">
                <h3 class="text-lg font-bold mb-4" style="color: var(--text-primary); font-family: 'Syne', sans-serif;">Your Coverage This Week</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="p-5 rounded-2xl border" style="background-color: var(--bg-card); border-color: var(--border);">
                        <p class="text-sm mb-2" style="color: var(--text-secondary);">Weekly Premium</p>
                        <p class="text-3xl font-bold mb-4" style="color: var(--text-primary); font-family: 'Syne', sans-serif;">₹${premium}</p>
                        <div class="text-xs mb-3" style="color: var(--text-secondary);">
                            <div class="flex justify-between py-1 border-b" style="border-color: var(--border);">
                                <span>Base Rate</span>
                                <span>₹${baseRounded}</span>
                            </div>
                            <div class="flex justify-between py-1 border-b" style="border-color: var(--border);">
                                <span>Zone Factor</span>
                                <span>×1.10</span>
                            </div>
                            <div class="flex justify-between py-1 border-b" style="border-color: var(--border);">
                                <span>Time Factor</span>
                                <span>×1.05</span>
                            </div>
                        </div>
                        <p class="text-xs" style="color: var(--text-secondary);">Debited weekly via UPI AutoPay</p>
                    </div>

                    <div class="p-5 rounded-2xl border" style="background-color: var(--bg-card); border-color: var(--border);">
                        <p class="text-sm mb-4" style="color: var(--text-secondary);">Disruption Payouts</p>
                        <div class="space-y-3">
                            <div class="pl-3 pr-2 py-2 rounded-lg" style="background-color: var(--accent-light); border-left: 3px solid var(--warning);">
                                <p class="text-sm font-medium" style="color: var(--text-primary);">Partial Disruption</p>
                                <p class="text-xs" style="color: var(--text-secondary);">40–50% of daily earnings</p>
                            </div>
                            <div class="pl-3 pr-2 py-2 rounded-lg" style="background-color: #FFF0E8; border-left: 3px solid var(--accent);">
                                <p class="text-sm font-medium" style="color: var(--text-primary);">Significant Disruption</p>
                                <p class="text-xs" style="color: var(--text-secondary);">70% of daily earnings</p>
                            </div>
                            <div class="pl-3 pr-2 py-2 rounded-lg" style="background-color: #FFE5E5; border-left: 3px solid var(--accent);">
                                <p class="text-sm font-medium" style="color: var(--text-primary);">Full Disruption</p>
                                <p class="text-xs" style="color: var(--text-secondary);">100% of daily earnings</p>
                            </div>
                        </div>
                        <p class="text-xs mt-3" style="color: var(--text-secondary);">Max weekly benefit: ₹${maxWeeklyBenefit}</p>
                    </div>
                </div>
            </section>

            <!-- ACTIVE TRIGGERS -->
            <section class="px-6 pb-6">
                <h3 class="text-lg font-bold mb-4" style="color: var(--text-primary); font-family: 'Syne', sans-serif;">Live Disruption Monitor</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="p-4 rounded-xl border" style="background-color: var(--bg-card); border-color: var(--border);">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-xl">🌧</span>
                            <span class="text-sm font-medium" style="color: var(--text-primary);">Rainfall</span>
                        </div>
                        <span class="inline-block px-2 py-1 rounded text-xs font-medium" style="background-color: var(--success); color: white;">Clear</span>
                    </div>

                    <div class="p-4 rounded-xl border" style="background-color: var(--bg-card); border-color: var(--border);">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-xl">🌡</span>
                            <span class="text-sm font-medium" style="color: var(--text-primary);">Heat Index</span>
                        </div>
                        <span class="inline-block px-2 py-1 rounded text-xs font-medium" style="background-color: var(--warning); color: white;">Elevated</span>
                        <p class="text-xs mt-1" style="color: var(--text-secondary);">38°C in your zone</p>
                    </div>

                    <div class="p-4 rounded-xl border" style="background-color: var(--bg-card); border-color: var(--border);">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-xl">😷</span>
                            <span class="text-sm font-medium" style="color: var(--text-primary);">AQI Level</span>
                        </div>
                        <span class="inline-block px-2 py-1 rounded text-xs font-medium" style="background-color: var(--warning); color: white;">Moderate</span>
                        <p class="text-xs mt-1" style="color: var(--text-secondary);">AQI 145</p>
                    </div>

                    <div class="p-4 rounded-xl border" style="background-color: var(--bg-card); border-color: var(--border);">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-xl">🚫</span>
                            <span class="text-sm font-medium" style="color: var(--text-primary);">Civic Alerts</span>
                        </div>
                        <span class="inline-block px-2 py-1 rounded text-xs font-medium" style="background-color: var(--success); color: white;">None Active</span>
                    </div>
                </div>
            </section>

            <!-- RECENT ACTIVITY -->
            <section class="px-6 pb-8">
                <h3 class="text-lg font-bold mb-4" style="color: var(--text-primary); font-family: 'Syne', sans-serif;">Recent Claims & Alerts</h3>
                <div class="space-y-4">
                    <div class="flex gap-3">
                        <div class="flex flex-col items-center">
                            <div class="w-2 h-2 rounded-full mt-1" style="background-color: var(--success);"></div>
                            <div class="w-0.5 flex-1 my-1" style="background-color: var(--border);"></div>
                        </div>
                        <div class="pb-4">
                            <p class="text-sm font-medium" style="color: var(--text-primary);">Heavy rainfall payout — ₹630 credited</p>
                            <p class="text-xs mt-0.5" style="color: var(--text-secondary);">3 days ago · 70% of daily earnings</p>
                        </div>
                    </div>

                    <div class="flex gap-3">
                        <div class="flex flex-col items-center">
                            <div class="w-2 h-2 rounded-full mt-1" style="background-color: var(--warning);"></div>
                            <div class="w-0.5 flex-1 my-1" style="background-color: var(--border);"></div>
                        </div>
                        <div class="pb-4">
                            <p class="text-sm font-medium" style="color: var(--text-primary);">Zone heat alert issued</p>
                            <p class="text-xs mt-0.5" style="color: var(--text-secondary);">5 days ago · No payout — below threshold</p>
                        </div>
                    </div>

                    <div class="flex gap-3">
                        <div class="flex flex-col items-center">
                            <div class="w-2 h-2 rounded-full mt-1" style="background-color: var(--success);"></div>
                        </div>
                        <div class="pb-4">
                            <p class="text-sm font-medium" style="color: var(--text-primary);">Policy renewed automatically</p>
                            <p class="text-xs mt-0.5" style="color: var(--text-secondary);">6 days ago · ₹${premium} debited via UPI</p>
                        </div>
                    </div>
                </div>
            </section>
        `;

        // ✅ CRITICAL — attach to DOM before querying any elements
        app.appendChild(container);

        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        const html = document.documentElement;

        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            themeIcon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
        });

        // Set correct icon on load
        themeIcon.textContent = html.getAttribute('data-theme') === 'dark' ? '🌙' : '☀️';

        // Logout
        document.getElementById('logout-btn').addEventListener('click', () => {
            sessionStorage.clear();
            renderLogin();
        });

    } catch (err) {
        console.error('Dashboard load error:', err);
        sessionStorage.clear();
        renderLogin();
    }
}