// ===== FIFA World Cup 2026 Tracker - Application Logic =====

// State
let matchScores = JSON.parse(localStorage.getItem('fifaScores') || '{}');
let reminders = JSON.parse(localStorage.getItem('fifaReminders') || '[]');
let currentEditMatch = null;
let isAdmin = sessionStorage.getItem('isAdmin') === 'true';

function updateAdminUI() {
    const btn = document.getElementById('btnAdminAuth');
    const label = document.getElementById('adminLabel');
    const icon = document.getElementById('adminIcon');
    if (!btn || !label || !icon) return;
    if (isAdmin) {
        btn.classList.add('admin-active');
        label.innerText = 'Admin: Logout';
        icon.innerText = '🔓';
    } else {
        btn.classList.remove('admin-active');
        label.innerText = 'Admin Mode';
        icon.innerText = '🔒';
    }
}

function toggleAdminMode() {
    if (isAdmin) {
        isAdmin = false;
        sessionStorage.removeItem('isAdmin');
        updateAdminUI();
        showToast('Logged out of Admin Mode.');
    } else {
        document.getElementById('adminPasswordInput').value = '';
        document.getElementById('adminLoginError').style.display = 'none';
        document.getElementById('adminLoginModal').style.display = 'flex';
        document.getElementById('adminPasswordInput').focus();
    }
}

function closeAdminLoginModal() {
    document.getElementById('adminLoginModal').style.display = 'none';
}

function submitAdminPassword() {
    const password = document.getElementById('adminPasswordInput').value;
    if (password === 'admin2026') {
        isAdmin = true;
        sessionStorage.setItem('isAdmin', 'true');
        updateAdminUI();
        showToast('Logged in as Admin. Score editing enabled!');
        closeAdminLoginModal();
    } else {
        document.getElementById('adminLoginError').style.display = 'block';
    }
}

// Call during load
window.addEventListener('DOMContentLoaded', () => {
    updateAdminUI();

    // Submit password on Enter key
    const passInput = document.getElementById('adminPasswordInput');
    if (passInput) {
        passInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') submitAdminPassword();
        });
    }

    // Dismiss admin login modal when clicking backdrop overlay
    const loginModal = document.getElementById('adminLoginModal');
    if (loginModal) {
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) closeAdminLoginModal();
        });
    }
});

// ===== Utility Functions =====
function toIST(utcStr) {
    const d = new Date(utcStr);
    return new Date(d.getTime() + (5.5 * 60 * 60 * 1000));
}

function formatISTTime(utcStr) {
    const ist = toIST(utcStr);
    let h = ist.getUTCHours(), m = ist.getUTCMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${m.toString().padStart(2,'0')} ${ampm}`;
}

function formatISTDate(utcStr) {
    const ist = toIST(utcStr);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return `${days[ist.getUTCDay()]}, ${ist.getUTCDate()} ${months[ist.getUTCMonth()]} ${ist.getUTCFullYear()}`;
}

function formatISTDateShort(utcStr) {
    const ist = toIST(utcStr);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${ist.getUTCDate()} ${months[ist.getUTCMonth()]}`;
}

function getISTDateKey(utcStr) {
    const ist = toIST(utcStr);
    return `${ist.getUTCFullYear()}-${(ist.getUTCMonth()+1).toString().padStart(2,'0')}-${ist.getUTCDate().toString().padStart(2,'0')}`;
}

function getFlag(team) { return FLAGS[team] || '🏳️'; }

function getDeterministicMatchResult(matchId, homeTeam, awayTeam, isKnockout = false) {
    let seed = matchId * 12345;
    function random() {
        let x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }
    
    function getGoals() {
        const r = random();
        if (r < 0.22) return 0;
        if (r < 0.57) return 1;
        if (r < 0.82) return 2;
        if (r < 0.94) return 3;
        if (r < 0.98) return 4;
        return 5;
    }
    
    const homeScore = getGoals();
    const awayScore = getGoals();
    let advancingTeam = null;
    if (isKnockout) {
        if (homeScore === awayScore) {
            advancingTeam = random() < 0.5 ? homeTeam : awayTeam;
        } else {
            advancingTeam = homeScore > awayScore ? homeTeam : awayTeam;
        }
    }
    return { homeScore, awayScore, status: 'completed', advancingTeam };
}

function getMatchData(matchId) {
    const match = MATCHES.find(m => m.id === matchId);
    if (!match || match.home === 'TBD' || match.away === 'TBD') {
        return { homeScore: null, awayScore: null, status: 'scheduled', advancingTeam: null };
    }

    if (matchScores[matchId]) {
        return {
            homeScore: matchScores[matchId].homeScore,
            awayScore: matchScores[matchId].awayScore,
            status: matchScores[matchId].status,
            advancingTeam: matchScores[matchId].advancingTeam
        };
    }

    const matchStart = new Date(match.dateUTC);
    const now = new Date();
    if (now >= matchStart) {
        const isKnockout = match.stage !== 'group';
        return getDeterministicMatchResult(matchId, match.home, match.away, isKnockout);
    }

    return { homeScore: null, awayScore: null, status: 'scheduled', advancingTeam: null };
}

function getStageLabel(stage) {
    const labels = { group:'Group Stage', round32:'Round of 32', round16:'Round of 16', quarter:'Quarterfinals', semi:'Semifinals', third:'3rd Place', final:'Final' };
    return labels[stage] || stage;
}

// ===== IST Clock =====
function updateClock() {
    const now = new Date();
    const ist = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
    const h = ist.getUTCHours().toString().padStart(2,'0');
    const m = ist.getUTCMinutes().toString().padStart(2,'0');
    const s = ist.getUTCSeconds().toString().padStart(2,'0');
    document.getElementById('clockTime').textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

// ===== Tab Navigation =====
document.querySelectorAll('.nav-btn[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
});

// ===== Populate Filter Dropdowns =====
function populateFilters() {
    const dateSelect = document.getElementById('filterDate');
    const teamSelect = document.getElementById('filterTeam');
    
    const prevDate = dateSelect.value;
    const prevTeam = teamSelect.value;
    
    dateSelect.innerHTML = '<option value="all">All Dates</option>';
    teamSelect.innerHTML = '<option value="all">All Teams</option>';
    
    const dateSet = new Set();
    const teamSet = new Set();
    MATCHES.forEach(m => {
        dateSet.add(getISTDateKey(m.dateUTC));
        if (m.home !== 'TBD') teamSet.add(m.home);
        if (m.away !== 'TBD') teamSet.add(m.away);
    });
    
    [...dateSet].sort().forEach(d => {
        const opt = document.createElement('option');
        opt.value = d;
        opt.textContent = formatISTDate(new Date(d + 'T00:00:00Z').toISOString());
        dateSelect.appendChild(opt);
    });
    
    [...teamSet].sort().forEach(t => {
        const opt = document.createElement('option');
        opt.value = t;
        opt.textContent = `${getFlag(t)} ${t}`;
        teamSelect.appendChild(opt);
    });
    
    if ([...dateSelect.options].some(o => o.value === prevDate)) dateSelect.value = prevDate;
    if ([...teamSelect.options].some(o => o.value === prevTeam)) teamSelect.value = prevTeam;
}

// ===== Render Schedule =====
function renderSchedule() {
    const container = document.getElementById('scheduleContainer');
    const stageFilter = document.getElementById('filterStage').value;
    const groupFilter = document.getElementById('filterGroup').value;
    const dateFilter = document.getElementById('filterDate').value;
    const teamFilter = document.getElementById('filterTeam').value;

    let filtered = MATCHES.filter(m => {
        if (stageFilter !== 'all' && m.stage !== stageFilter) return false;
        if (groupFilter !== 'all' && m.group !== groupFilter) return false;
        if (dateFilter !== 'all' && getISTDateKey(m.dateUTC) !== dateFilter) return false;
        if (teamFilter !== 'all' && m.home !== teamFilter && m.away !== teamFilter) return false;
        return true;
    });

    // Group by date
    const byDate = {};
    filtered.forEach(m => {
        const key = getISTDateKey(m.dateUTC);
        if (!byDate[key]) byDate[key] = [];
        byDate[key].push(m);
    });

    let html = '';
    Object.keys(byDate).sort().forEach(dateKey => {
        const matches = byDate[dateKey];
        html += `<div class="schedule-day">
            <div class="day-header">
                <span class="day-date">${formatISTDate(matches[0].dateUTC)}</span>
                <span class="day-count">${matches.length} match${matches.length > 1 ? 'es' : ''}</span>
            </div>`;
        matches.sort((a, b) => new Date(a.dateUTC) - new Date(b.dateUTC));
        matches.forEach(m => {
            const data = getMatchData(m.id);
            const statusClass = data.status;
            const isReminder = reminders.includes(m.id);
            const scoreDisplay = data.status === 'scheduled'
                ? `<span class="score-num">-</span><span class="score-divider">:</span><span class="score-num">-</span>`
                : `<span class="score-num">${data.homeScore}</span><span class="score-divider">:</span><span class="score-num">${data.awayScore}</span>`;
            const liveClass = data.status === 'live' ? ' live' : '';
            const liveBadge = data.status === 'live' ? '<span class="live-badge">● LIVE</span>' : '';

            html += `<div class="match-card status-${statusClass}" onclick="handleMatchCardClick(${m.id})" id="match-card-${m.id}">
                <div class="match-team home">
                    <span class="team-flag">${getFlag(m.home)}</span>
                    <div>
                        <div class="team-name">${m.home}</div>
                        ${m.group ? `<div class="team-code">Group ${m.group}</div>` : ''}
                    </div>
                </div>
                <div class="match-score${liveClass}">
                    ${scoreDisplay}
                </div>
                <div class="match-team away">
                    <span class="team-flag">${getFlag(m.away)}</span>
                    <div>
                        <div class="team-name">${m.away}</div>
                        ${m.label ? `<div class="team-code">${m.label}</div>` : ''}
                    </div>
                </div>
                <div class="match-meta">
                    <span class="match-time">${formatISTTime(m.dateUTC)} IST</span>
                    ${liveBadge}
                    <span class="match-stage-badge">${m.group ? 'Group ' + m.group : getStageLabel(m.stage)}</span>
                    <span class="match-venue">📍 ${m.venue}</span>
                    <div class="match-actions">
                        <button class="btn-icon ${isReminder ? 'active' : ''}" onclick="event.stopPropagation(); toggleReminder(${m.id})" title="Set Reminder">🔔</button>
                    </div>
                </div>
            </div>`;
        });
        html += '</div>';
    });

    if (!html) html = '<div class="no-reminders"><div class="empty-icon">🔍</div><h3>No Matches Found</h3><p>Try adjusting the filters</p></div>';
    container.innerHTML = html;
}

// ===== Render Groups =====
function renderGroups() {
    const grid = document.getElementById('groupsGrid');
    let html = '';

    Object.keys(GROUPS).forEach(groupKey => {
        const teams = GROUPS[groupKey];
        const standings = calculateStandings(groupKey);

        html += `<div class="group-card" id="group-card-${groupKey}">
            <div class="group-header">
                <span class="group-name">Group ${groupKey}</span>
                <span class="group-status">${getGroupStatus(groupKey)}</span>
            </div>
            <table class="group-table">
                <thead>
                    <tr>
                        <th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GF</th><th>GA</th><th>GD</th><th>Pts</th>
                    </tr>
                </thead>
                <tbody>`;

        standings.forEach((team, idx) => {
            const posClass = idx < 2 ? 'q' : (idx === 2 ? 'tq' : '');
            const rowClass = idx < 2 ? 'qualified' : (idx === 2 ? 'third-qualified' : '');
            const gd = team.gf - team.ga;
            const gdClass = gd > 0 ? 'gd-positive' : (gd < 0 ? 'gd-negative' : '');
            const gdStr = gd > 0 ? `+${gd}` : `${gd}`;

            html += `<tr class="${rowClass}">
                <td>
                    <div class="table-team">
                        <span class="table-pos ${posClass}">${idx + 1}</span>
                        <span class="table-flag">${getFlag(team.name)}</span>
                        <span class="table-name">${team.name}</span>
                    </div>
                </td>
                <td>${team.played}</td>
                <td>${team.won}</td>
                <td>${team.drawn}</td>
                <td>${team.lost}</td>
                <td>${team.gf}</td>
                <td>${team.ga}</td>
                <td class="${gdClass}">${gdStr}</td>
                <td class="pts">${team.pts}</td>
            </tr>`;
        });

        html += `</tbody></table></div>`;
    });

    grid.innerHTML = html;
}

function calculateStandings(groupKey) {
    const teams = GROUPS[groupKey];
    const stats = {};
    teams.forEach(t => {
        stats[t] = { name: t, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 };
    });

    const groupMatches = MATCHES.filter(m => m.group === groupKey);
    groupMatches.forEach(m => {
        const data = getMatchData(m.id);
        if (data.status === 'completed' || data.status === 'live') {
            const hs = parseInt(data.homeScore) || 0;
            const as = parseInt(data.awayScore) || 0;
            if (stats[m.home]) {
                stats[m.home].played++;
                stats[m.home].gf += hs;
                stats[m.home].ga += as;
            }
            if (stats[m.away]) {
                stats[m.away].played++;
                stats[m.away].gf += as;
                stats[m.away].ga += hs;
            }
            if (hs > as) {
                if (stats[m.home]) { stats[m.home].won++; stats[m.home].pts += 3; }
                if (stats[m.away]) { stats[m.away].lost++; }
            } else if (hs < as) {
                if (stats[m.away]) { stats[m.away].won++; stats[m.away].pts += 3; }
                if (stats[m.home]) { stats[m.home].lost++; }
            } else {
                if (stats[m.home]) { stats[m.home].drawn++; stats[m.home].pts += 1; }
                if (stats[m.away]) { stats[m.away].drawn++; stats[m.away].pts += 1; }
            }
        }
    });

    return Object.values(stats).sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts;
        if ((b.gf - b.ga) !== (a.gf - a.ga)) return (b.gf - b.ga) - (a.gf - a.ga);
        if (b.gf !== a.gf) return b.gf - a.gf;
        return a.name.localeCompare(b.name);
    });
}

function getGroupStatus(groupKey) {
    const groupMatches = MATCHES.filter(m => m.group === groupKey);
    const completed = groupMatches.filter(m => getMatchData(m.id).status === 'completed').length;
    const live = groupMatches.filter(m => getMatchData(m.id).status === 'live').length;
    if (completed === 6) return 'Completed';
    if (live > 0) return '● Live';
    if (completed > 0) return `${completed}/6 played`;
    return 'Upcoming';
}

// ===== Render Knockout =====
function renderKnockout() {
    const stages = {
        round32: { containerId: 'r32Matches', matches: MATCHES.filter(m => m.stage === 'round32') },
        round16: { containerId: 'r16Matches', matches: MATCHES.filter(m => m.stage === 'round16') },
        quarter: { containerId: 'qfMatches', matches: MATCHES.filter(m => m.stage === 'quarter') },
        semi: { containerId: 'sfMatches', matches: MATCHES.filter(m => m.stage === 'semi') },
        third: { containerId: 'thirdMatch', matches: MATCHES.filter(m => m.stage === 'third') },
        final: { containerId: 'finalMatch', matches: MATCHES.filter(m => m.stage === 'final') }
    };

    Object.keys(stages).forEach(stageKey => {
        const { containerId, matches } = stages[stageKey];
        const container = document.getElementById(containerId);
        let html = '';

        matches.forEach(m => {
            const data = getMatchData(m.id);
            const homeWinner = data.status === 'completed' && parseInt(data.homeScore) > parseInt(data.awayScore);
            const awayWinner = data.status === 'completed' && parseInt(data.awayScore) > parseInt(data.homeScore);

            const liveKnockoutBadge = data.status === 'live' ? '<span class="live-badge" style="margin-left:8px;">● LIVE</span>' : '';

            html += `<div class="ko-match" onclick="handleMatchCardClick(${m.id})" id="ko-match-${m.id}">
                <div class="ko-match-header">
                    <span class="ko-match-id">${m.label || getStageLabel(m.stage)}</span>
                    <span class="ko-match-time">${formatISTDateShort(m.dateUTC)} • ${formatISTTime(m.dateUTC)} IST ${liveKnockoutBadge}</span>
                </div>
                <div class="ko-team-row">
                    <div class="ko-team-info">
                        <span class="ko-team-flag">${getFlag(m.home)}</span>
                        <div>
                            <span class="ko-team-name ${m.home === 'TBD' ? 'tbd' : ''} ${homeWinner ? 'ko-winner' : ''}">${m.home}</span>
                        </div>
                    </div>
                    <span class="ko-score ${homeWinner ? 'ko-winner' : ''}">${data.homeScore !== null ? data.homeScore : '-'}</span>
                </div>
                <div class="ko-team-row">
                    <div class="ko-team-info">
                        <span class="ko-team-flag">${getFlag(m.away)}</span>
                        <div>
                            <span class="ko-team-name ${m.away === 'TBD' ? 'tbd' : ''} ${awayWinner ? 'ko-winner' : ''}">${m.away}</span>
                        </div>
                    </div>
                    <span class="ko-score ${awayWinner ? 'ko-winner' : ''}">${data.awayScore !== null ? data.awayScore : '-'}</span>
                </div>
            </div>`;
        });

        container.innerHTML = html;
    });
}

function handleMatchCardClick(matchId) {
    const match = MATCHES.find(m => m.id === matchId);
    if (!match || match.home === 'TBD' || match.away === 'TBD') return;
    
    if (isAdmin) {
        openScoreModal(matchId);
    }
}

// ===== Score Modal =====
function openScoreModal(matchId) {
    const match = MATCHES.find(m => m.id === matchId);
    if (!match) return;
    if (match.home === 'TBD' || match.away === 'TBD') {
        showToast('Cannot update score for TBD teams');
        return;
    }
    currentEditMatch = matchId;
    const data = getMatchData(matchId);

    document.getElementById('modalTitle').textContent = match.label || `Group ${match.group}: ${match.home} vs ${match.away}`;
    document.getElementById('modalFlag1').textContent = getFlag(match.home);
    document.getElementById('modalTeam1').textContent = match.home;
    document.getElementById('modalFlag2').textContent = getFlag(match.away);
    document.getElementById('modalTeam2').textContent = match.away;
    document.getElementById('modalScore1').value = data.homeScore !== null ? data.homeScore : 0;
    document.getElementById('modalScore2').value = data.awayScore !== null ? data.awayScore : 0;
    document.getElementById('modalStatus').value = data.status;
    
    const advGroup = document.getElementById('advancingTeamGroup');
    if (match.stage !== 'group') {
        const advSelect = document.getElementById('modalAdvancing');
        advSelect.innerHTML = `
            <option value="${match.home}">${getFlag(match.home)} ${match.home}</option>
            <option value="${match.away}">${getFlag(match.away)} ${match.away}</option>
        `;
        advSelect.value = data.advancingTeam || match.home;
        advGroup.style.display = 'block';
    } else {
        advGroup.style.display = 'none';
    }
    
    document.getElementById('scoreModal').style.display = 'flex';
}

function closeScoreModal() {
    document.getElementById('scoreModal').style.display = 'none';
    currentEditMatch = null;
}

function saveScore() {
    if (currentEditMatch === null) return;
    const homeScore = parseInt(document.getElementById('modalScore1').value) || 0;
    const awayScore = parseInt(document.getElementById('modalScore2').value) || 0;
    const status = document.getElementById('modalStatus').value;
    
    const match = MATCHES.find(m => m.id === currentEditMatch);
    let advancingTeam = null;
    if (match.stage !== 'group') {
        advancingTeam = document.getElementById('modalAdvancing').value;
    }

    matchScores[currentEditMatch] = { homeScore, awayScore, status, advancingTeam };
    localStorage.setItem('fifaScores', JSON.stringify(matchScores));

    closeScoreModal();
    renderAll();
    showToast('Score updated successfully!');
}

// ===== Reminders =====
function toggleReminder(matchId) {
    const idx = reminders.indexOf(matchId);
    if (idx > -1) {
        reminders.splice(idx, 1);
        showToast('Reminder removed');
    } else {
        reminders.push(matchId);
        showToast('Reminder set! 🔔');
        scheduleReminder(matchId);
    }
    localStorage.setItem('fifaReminders', JSON.stringify(reminders));
    updateReminderBadge();
    renderSchedule();
    renderReminders();
}

function scheduleReminder(matchId) {
    const match = MATCHES.find(m => m.id === matchId);
    if (!match) return;
    const matchTime = new Date(match.dateUTC).getTime();
    const now = Date.now();
    const reminderTime = matchTime - (15 * 60 * 1000); // 15 min before

    if (reminderTime > now) {
        setTimeout(() => {
            if (reminders.includes(matchId) && Notification.permission === 'granted') {
                new Notification('⚽ FIFA World Cup 2026', {
                    body: `${match.home} vs ${match.away} starts in 15 minutes!\n${formatISTTime(match.dateUTC)} IST`,
                    icon: '⚽',
                    tag: `match-${matchId}`
                });
            }
        }, reminderTime - now);
    }
}

function renderReminders() {
    const list = document.getElementById('remindersList');
    const noReminders = document.getElementById('noReminders');
    const upcomingReminders = reminders.filter(id => {
        const match = MATCHES.find(m => m.id === id);
        return match && getMatchData(id).status === 'scheduled';
    });

    if (upcomingReminders.length === 0) {
        list.innerHTML = '';
        noReminders.style.display = 'block';
        return;
    }

    noReminders.style.display = 'none';
    let html = '';
    upcomingReminders.forEach(id => {
        const match = MATCHES.find(m => m.id === id);
        html += `<div class="reminder-card">
            <div class="reminder-match-info">
                <span>${getFlag(match.home)}</span>
                <div>
                    <div class="reminder-teams">${match.home} vs ${match.away}</div>
                    <div class="reminder-time">${formatISTDate(match.dateUTC)} • ${formatISTTime(match.dateUTC)} IST</div>
                </div>
            </div>
            <button class="reminder-remove" onclick="toggleReminder(${id})">Remove</button>
        </div>`;
    });
    list.innerHTML = html;
}

function updateReminderBadge() {
    const badge = document.getElementById('reminderBadge');
    const count = reminders.length;
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
}

function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(perm => {
            if (perm === 'granted') {
                showToast('Notifications enabled! 🔔');
                document.getElementById('reminderPermission').innerHTML = '<div class="permission-icon">✅</div><h3>Notifications Enabled</h3><p>You will be notified 15 minutes before matches you set reminders for</p>';
            }
        });
    } else {
        showToast('Notifications not supported in this browser');
    }
}

// ===== Toast =====
function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMessage').textContent = message;
    toast.style.display = 'flex';
    setTimeout(() => { toast.style.display = 'none'; }, 3000);
}

// ===== Knockout Progression Calculations =====

function getGroupStandings() {
    const winners = {};
    const runnersUp = {};
    const thirdPlaced = [];

    Object.keys(GROUPS).forEach(groupKey => {
        const standings = calculateStandings(groupKey);
        winners[groupKey] = standings[0].name;
        runnersUp[groupKey] = standings[1].name;
        thirdPlaced.push({
            name: standings[2].name,
            group: groupKey,
            pts: standings[2].pts,
            gf: standings[2].gf,
            ga: standings[2].ga,
            gd: standings[2].gf - standings[2].ga
        });
    });

    thirdPlaced.sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts;
        if (b.gd !== a.gd) return b.gd - a.gd;
        if (b.gf !== a.gf) return b.gf - a.gf;
        return a.group.localeCompare(b.group);
    });

    const qualifiedThirds = thirdPlaced.slice(0, 8);
    return { winners, runnersUp, qualifiedThirds };
}

function findThirdPlaceAssignment(qualifiedThirds) {
    const matches = [
        { id: 74, allowed: ['A', 'B', 'C', 'D', 'F'] },
        { id: 77, allowed: ['C', 'D', 'F', 'G', 'H'] },
        { id: 79, allowed: ['C', 'E', 'F', 'H', 'I'] },
        { id: 80, allowed: ['E', 'H', 'I', 'J', 'K'] },
        { id: 81, allowed: ['B', 'E', 'F', 'I', 'J'] },
        { id: 82, allowed: ['A', 'E', 'H', 'I', 'J'] },
        { id: 85, allowed: ['E', 'F', 'G', 'I', 'J'] },
        { id: 87, allowed: ['D', 'E', 'I', 'J', 'L'] }
    ];

    const assignment = {};
    const used = new Set();

    function backtrack(matchIdx) {
        if (matchIdx === matches.length) return true;
        const match = matches[matchIdx];
        for (let i = 0; i < qualifiedThirds.length; i++) {
            if (used.has(i)) continue;
            const team = qualifiedThirds[i];
            if (match.allowed.includes(team.group)) {
                used.add(i);
                assignment[match.id] = team.name;
                if (backtrack(matchIdx + 1)) return true;
                used.delete(i);
                delete assignment[match.id];
            }
        }
        for (let i = 0; i < qualifiedThirds.length; i++) {
            if (used.has(i)) continue;
            const team = qualifiedThirds[i];
            used.add(i);
            assignment[match.id] = team.name;
            if (backtrack(matchIdx + 1)) return true;
            used.delete(i);
            delete assignment[match.id];
        }
        return false;
    }

    backtrack(0);
    return assignment;
}

const KNOCKOUT_MAPPINGS = {
    89: { homeFrom: 74, awayFrom: 77 },
    90: { homeFrom: 73, awayFrom: 75 },
    91: { homeFrom: 76, awayFrom: 78 },
    92: { homeFrom: 79, awayFrom: 80 },
    93: { homeFrom: 83, awayFrom: 84 },
    94: { homeFrom: 81, awayFrom: 82 },
    95: { homeFrom: 86, awayFrom: 88 },
    96: { homeFrom: 85, awayFrom: 87 },

    97: { homeFrom: 89, awayFrom: 90 },
    98: { homeFrom: 93, awayFrom: 94 },
    99: { homeFrom: 91, awayFrom: 92 },
    100: { homeFrom: 95, awayFrom: 96 },

    101: { homeFrom: 97, awayFrom: 98 },
    102: { homeFrom: 99, awayFrom: 100 },

    103: { homeFrom: 101, awayFrom: 102, type: 'losers' },
    104: { homeFrom: 101, awayFrom: 102 }
};

function getMatchWinner(matchId) {
    const match = MATCHES.find(m => m.id === matchId);
    if (!match || match.home === 'TBD' || match.away === 'TBD') return 'TBD';
    const data = getMatchData(matchId);
    if (data.status !== 'completed') return 'TBD';

    const hs = parseInt(data.homeScore);
    const as = parseInt(data.awayScore);
    if (hs > as) return match.home;
    if (as > hs) return match.away;
    return data.advancingTeam || 'TBD';
}

function getMatchLoser(matchId) {
    const match = MATCHES.find(m => m.id === matchId);
    if (!match || match.home === 'TBD' || match.away === 'TBD') return 'TBD';
    const data = getMatchData(matchId);
    if (data.status !== 'completed') return 'TBD';

    const hs = parseInt(data.homeScore);
    const as = parseInt(data.awayScore);
    if (hs > as) return match.away;
    if (as > hs) return match.home;
    if (data.advancingTeam) {
        return data.advancingTeam === match.home ? match.away : match.home;
    }
    return 'TBD';
}

function computeKnockoutStage() {
    const { winners, runnersUp, qualifiedThirds } = getGroupStandings();
    const thirdAssignment = findThirdPlaceAssignment(qualifiedThirds);

    const r32Matches = [
        { id: 73, home: runnersUp['A'], away: runnersUp['B'] },
        { id: 74, home: winners['E'], away: thirdAssignment[74] || 'TBD' },
        { id: 75, home: winners['F'], away: runnersUp['C'] },
        { id: 76, home: winners['C'], away: runnersUp['F'] },
        { id: 77, home: winners['I'], away: thirdAssignment[77] || 'TBD' },
        { id: 78, home: runnersUp['E'], away: runnersUp['I'] },
        { id: 79, home: winners['A'], away: thirdAssignment[79] || 'TBD' },
        { id: 80, home: winners['L'], away: thirdAssignment[80] || 'TBD' },
        { id: 81, home: winners['D'], away: thirdAssignment[81] || 'TBD' },
        { id: 82, home: winners['G'], away: thirdAssignment[82] || 'TBD' },
        { id: 83, home: runnersUp['K'], away: runnersUp['L'] },
        { id: 84, home: winners['H'], away: runnersUp['J'] },
        { id: 85, home: winners['B'], away: thirdAssignment[85] || 'TBD' },
        { id: 86, home: winners['J'], away: runnersUp['H'] },
        { id: 87, home: winners['K'], away: thirdAssignment[87] || 'TBD' },
        { id: 88, home: runnersUp['D'], away: runnersUp['G'] }
    ];

    r32Matches.forEach(update => {
        const match = MATCHES.find(m => m.id === update.id);
        if (match) {
            match.home = update.home || 'TBD';
            match.away = update.away || 'TBD';
        }
    });

    const koOrder = [89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104];
    koOrder.forEach(id => {
        const mapping = KNOCKOUT_MAPPINGS[id];
        const match = MATCHES.find(m => m.id === id);
        if (match && mapping) {
            if (mapping.type === 'losers') {
                match.home = getMatchLoser(mapping.homeFrom);
                match.away = getMatchLoser(mapping.awayFrom);
            } else {
                match.home = getMatchWinner(mapping.homeFrom);
                match.away = getMatchWinner(mapping.awayFrom);
            }
        }
    });
}

// ===== Render Statistics =====
function renderStatistics() {
    const teamStats = {};

    Object.values(GROUPS).forEach(teams => {
        teams.forEach(t => {
            teamStats[t] = { name: t, gf: 0, ga: 0, played: 0 };
        });
    });

    MATCHES.forEach(m => {
        if (m.home === 'TBD' || m.away === 'TBD') return;
        const data = getMatchData(m.id);
        if (data.status === 'scheduled') return;

        const homeScore = parseInt(data.homeScore) || 0;
        const awayScore = parseInt(data.awayScore) || 0;

        if (teamStats[m.home]) {
            teamStats[m.home].gf += homeScore;
            teamStats[m.home].ga += awayScore;
            teamStats[m.home].played += 1;
        }
        if (teamStats[m.away]) {
            teamStats[m.away].gf += awayScore;
            teamStats[m.away].ga += homeScore;
            teamStats[m.away].played += 1;
        }
    });

    const attackTeams = Object.values(teamStats)
        .filter(t => t.played > 0)
        .sort((a, b) => b.gf - a.gf || (a.ga - b.ga) || a.name.localeCompare(b.name));
    
    const attackBody = document.getElementById('topAttackBody');
    if (attackBody) {
        if (attackTeams.length === 0) {
            attackBody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:var(--text-muted); padding: 20px;">No matches played yet.</td></tr>`;
        } else {
            attackBody.innerHTML = attackTeams.slice(0, 8).map((t, idx) => `
                <tr>
                    <td><strong>${idx + 1}</strong></td>
                    <td>${getFlag(t.name)} ${t.name}</td>
                    <td><strong>${t.gf}</strong></td>
                </tr>
            `).join('');
        }
    }

    const defenseTeams = Object.values(teamStats)
        .filter(t => t.played > 0)
        .sort((a, b) => a.ga - b.ga || (b.gf - a.gf) || a.name.localeCompare(b.name));

    const defenseBody = document.getElementById('bestDefenseBody');
    if (defenseBody) {
        if (defenseTeams.length === 0) {
            defenseBody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:var(--text-muted); padding: 20px;">No matches played yet.</td></tr>`;
        } else {
            defenseBody.innerHTML = defenseTeams.slice(0, 8).map((t, idx) => `
                <tr>
                    <td><strong>${idx + 1}</strong></td>
                    <td>${getFlag(t.name)} ${t.name}</td>
                    <td><strong>${t.ga}</strong></td>
                </tr>
            `).join('');
        }
    }
}

// ===== Render All =====
function renderAll() {
    computeKnockoutStage();
    populateFilters();
    renderSchedule();
    renderGroups();
    renderKnockout();
    renderReminders();
    renderStatistics();
    updateReminderBadge();
}

// ===== Event Listeners =====
document.getElementById('filterStage').addEventListener('change', renderSchedule);
document.getElementById('filterGroup').addEventListener('change', renderSchedule);
document.getElementById('filterDate').addEventListener('change', renderSchedule);
document.getElementById('filterTeam').addEventListener('change', renderSchedule);

// Close modal on overlay click
document.getElementById('scoreModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('scoreModal')) closeScoreModal();
});
// Keyboard shortcut
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeScoreModal();
});

// Check notification permission on load
if ('Notification' in window && Notification.permission === 'granted') {
    const permEl = document.getElementById('reminderPermission');
    if (permEl) {
        permEl.innerHTML = '<div class="permission-icon">✅</div><h3>Notifications Enabled</h3><p>You will be notified 15 minutes before matches you set reminders for</p>';
    }
    // Re-schedule existing reminders
    reminders.forEach(id => scheduleReminder(id));
}

// Periodic rerender to update live clock and check/render live match score updates
setInterval(renderAll, 10000); // Rerender every 10 seconds

// ===== Initialize =====
renderAll();
