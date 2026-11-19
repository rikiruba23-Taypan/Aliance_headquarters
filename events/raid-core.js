// ============================================================================
// ОБЩИЙ ДВИЖОК ШТАБА РЕЙДОВ И «УМНЫЙ ВЫБОРЩИК ИГРОКОВ» (events/raid-core.js)
// ============================================================================

const RAID_API_URL = 'https://script.google.com/macros/s/AKfycbwsX-LADURoQu_MsQ2XJVsSPsHAgMebI4_QDXmpPpi3OcpW3ScwPep9ukQBFJfDMrjQ7g/exec';

const RAID_HEROES = [
  { key: 'джесси', name: 'Джесси', gen: 1, quick: true },
  { key: 'джассер', name: 'Джассер', gen: 1, quick: true },
  { key: 'со_юн', name: 'Со Юн', gen: 1, quick: true },
  { key: 'рейна', name: 'Райна', gen: 4, quick: true },
  { key: 'сергей', name: 'Сергей', gen: 1, quick: true },
  { key: 'патрик', name: 'Патрик', gen: 1, quick: true },
  { key: 'джеронимо', name: 'Джеронимо', gen: 1, quick: true },
  { key: 'смит', name: 'Смит', gen: 1 }, { key: 'юджин', name: 'Юджин', gen: 1 },
  { key: 'чарли', name: 'Чарли', gen: 1 }, { key: 'клорис', name: 'Клорис', gen: 1 },
  { key: 'лумак_бокан', name: 'Лумак Бокан', gen: 1 }, { key: 'лин_сюэ', name: 'Лин Сюэ', gen: 1 },
  { key: 'джина', name: 'Джина', gen: 1 }, { key: 'бахити', name: 'Бахити', gen: 1 },
  { key: 'наталия', name: 'Наталия', gen: 1 }, { key: 'молли', name: 'Молли', gen: 1 },
  { key: 'зинман', name: 'Зинман', gen: 1 }, { key: 'флинт', name: 'Флинт', gen: 2 },
  { key: 'филли', name: 'Филли', gen: 2 }, { key: 'алонсо', name: 'Алонсо', gen: 2 },
  { key: 'логан', name: 'Логан', gen: 3 }, { key: 'миа', name: 'Мия', gen: 3 },
  { key: 'грег', name: 'Грег', gen: 3 }, { key: 'яхмос', name: 'Яхмос', gen: 4 },
  { key: 'линн', name: 'Линн', gen: 4 }, { key: 'гектор', name: 'Гектор', gen: 5 },
  { key: 'нора', name: 'Нора', gen: 5 }, { key: 'гвен', name: 'Гвен', gen: 5 },
  { key: 'ву_минг', name: 'Ву Минг', gen: 6 }, { key: 'рене', name: 'Рене', gen: 6 },
  { key: 'уэйн', name: 'Уэйн', gen: 6 }, { key: 'эдит', name: 'Эдит', gen: 7 },
  { key: 'гордон', name: 'Гордон', gen: 7 }, { key: 'брэдли', name: 'Брэдли', gen: 7 },
  { key: 'гатот', name: 'Гатот', gen: 8 }, { key: 'соня', name: 'Соня', gen: 8 },
  { key: 'гендрик', name: 'Гендрик', gen: 8 }, { key: 'магнус', name: 'Магнус', gen: 9 },
  { key: 'фред', name: 'Фред', gen: 9 }, { key: 'ксура', name: 'Ксура', gen: 9 },
  { key: 'грегори', name: 'Грегори', gen: 10 }, { key: 'фрея', name: 'Фрея', gen: 10 },
  { key: 'бланшет', name: 'Бланшет', gen: 10 }, { key: 'элеонора', name: 'Элеонора', gen: 11 },
  { key: 'ллойд', name: 'Ллойд', gen: 11 }, { key: 'руфус', name: 'Руфус', gen: 11 },
  { key: 'гервор', name: 'Гервор', gen: 12 }, { key: 'карол', name: 'Карол', gen: 12 },
  { key: 'лигейя', name: 'Лигейя', gen: 12 }, { key: 'гисела', name: 'Гисела', gen: 13 },
  { key: 'флора', name: 'Флора', gen: 13 }, { key: 'вулканс', name: 'Вулканс', gen: 13 },
  { key: 'элиф', name: 'Элиф', gen: 14 }, { key: 'доминик', name: 'Доминик', gen: 14 },
  { key: 'кара', name: 'Кара', gen: 14 }, { key: 'хэнк', name: 'Хэнк', gen: 15 },
  { key: 'эстрелла', name: 'Эстрелла', gen: 15 }, { key: 'вивека', name: 'Вивека', gen: 15 },
  { key: 'сейгель', name: 'Сейгель', gen: 16 }, { key: 'урсар', name: 'Урсар', gen: 16 },
  { key: 'эйслинг', name: 'Эйслинг', gen: 16 }, { key: 'эйден', name: 'Эйден', gen: 17 },
  { key: 'берта', name: 'Берта', gen: 17 }, { key: 'элеанор', name: 'Элеанор', gen: 17 }
];

window.RaidCore = {
  user: null,
  allPlayers: [],
  activeAlliance: 'Основа',
  pickerState: {
    sortBy: 'rallyCap',
    heroKey: '',
    hideAssigned: true,
    search: '',
    assignmentsMap: {},
    onSelect: null
  },

  getPasscode() {
    return sessionStorage.getItem('harmony_passcode') || localStorage.getItem('harmony_passcode') || '';
  },

  getPlayerKey(p) {
    return p.playerId ? `ID:${p.playerId}` : `NICK:${(p.nick || '').toLowerCase()}`;
  },

  getHeroRecord(p, heroKey) {
    if (!p || !p.heroesData || !heroKey) return null;
    const hObj = p.heroesData;
    if (hObj[heroKey] && hObj[heroKey].configured) return hObj[heroKey];
    if (heroKey === 'миа' && hObj['мия'] && hObj['мия'].configured) return hObj['мия'];
    if (heroKey === 'рейна' && hObj['райна'] && hObj['райна'].configured) return hObj['райна'];
    return null;
  },

  calcFurnaceScore(p) {
    const fStr = String(p.furnaceLevel || '');
    const fNum = Number(fStr.replace(/\D/g, '')) || 0;
    const fCryst = fStr.toLowerCase().includes('крист') || fStr.includes('💎');
    const tStr = String(p.troopTier || '');
    const tNum = Number(tStr.replace(/\D/g, '')) || 0;
    const tCryst = tStr.toLowerCase().includes('крист') || tStr.includes('💎');
    return (fCryst ? 10000 + fNum * 100 : fNum * 10) + (tCryst ? 500 + tNum * 10 : tNum);
  },

  calcTopEqScore(p) {
    const topEq = p.topEquipmentData || (p.heroesData && p.heroesData._topEquipment) || {};
    let sum = 0;
    ['infantry', 'lancers', 'marksmen'].forEach(cat => {
      const eq = topEq[cat];
      if (!eq) return;
      sum += (Number(String(eq.gLvl || '').replace(/\D/g, '')) || 0);
      sum += (Number(String(eq.glLvl || '').replace(/\D/g, '')) || 0);
      sum += (Number(String(eq.bLvl || '').replace(/\D/g, '')) || 0);
      sum += (Number(String(eq.btLvl || '').replace(/\D/g, '')) || 0);
    });
    return sum;
  },

  calcHeroScore(p, heroKey) {
    const rec = this.getHeroRecord(p, heroKey);
    if (!rec) return -1;
    const lvl = Number(rec.level) || 0;
    const stars = Number(rec.starsFull || 0) * 10 + Number(rec.starsBars || 0);
    const eTop = Number(rec.eTop !== undefined ? rec.eTop : (rec.e1 || 0));
    const cannon = rec.cannon ? (50 + (Number(String(rec.cannonLvl || '').replace(/\D/g, '')) || 1) * 5) : 0;
    return stars * 100 + eTop * 20 + lvl + cannon;
  },

  formatTopEqShort(p) {
    const topEq = p.topEquipmentData || (p.heroesData && p.heroesData._topEquipment) || {};
    const score = this.calcTopEqScore(p);
    if (score === 0) return '—';
    const sumCat = c => {
      const e = topEq[c];
      if (!e) return 0;
      return (Number(String(e.gLvl||'').replace(/\D/g,''))||0) + (Number(String(e.glLvl||'').replace(/\D/g,''))||0) +
             (Number(String(e.bLvl||'').replace(/\D/g,''))||0) + (Number(String(e.btLvl||'').replace(/\D/g,''))||0);
    };
    return `🛡️${sumCat('infantry')} ⚔️${sumCat('lancers')} 🏹${sumCat('marksmen')}`;
  },

  async init(pageName, onReady) {
    const code = this.getPasscode();
    if (!code) { window.location.href = '../index.html'; return; }

    this.injectPickerModal();

    const cached = sessionStorage.getItem('harmony_session_cache');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.user && parsed.allPlayers) {
          this._applySession(parsed, true);
          onReady(this);
        }
      } catch (e) {}
    }

    try {
      const res = await fetch(RAID_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'sync', passcode: code, page: pageName, userAgent: navigator.userAgent })
      }).then(r => r.json());

      if (res.ok) {
        sessionStorage.setItem('harmony_session_cache', JSON.stringify(res));
        this._applySession(res, !cached);
        onReady(this);
      } else {
        window.location.href = '../index.html';
      }
    } catch (err) {
      console.error('Ошибка синхронизации RaidCore:', err);
    }
  },

  _applySession(data, autoSetAlliance) {
    if (!data.user || !data.user.isOfficer) {
      alert('Доступ в Штаб Рейдов открыт только Владельцу и Офицерам!');
      window.location.href = '../index.html';
      return;
    }
    this.user = data.user;
    this.allPlayers = (data.allPlayers || []).filter(p => (p.status || 'Активен') === 'Активен');

    const nickEl = document.getElementById('headerUserNick');
    const badgeEl = document.getElementById('userRoleBadge');
    if (nickEl) nickEl.textContent = `${this.user.nick} (${this.user.alliance || 'Основа'} • ${this.user.role})`;
    if (badgeEl) {
      badgeEl.textContent = this.user.role || 'Офицер';
      if (this.user.isOwner) {
        badgeEl.className = 'text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40';
      }
    }
    if (autoSetAlliance) {
      this.activeAlliance = this.user.isOwner ? 'ALL' : (this.user.alliance || 'Основа');
    }
  },

  getFilteredPlayers() {
    return this.allPlayers.filter(p =>
      this.activeAlliance === 'ALL' || (p.alliance || 'Основа') === this.activeAlliance
    );
  },

  injectPickerModal() {
    if (document.getElementById('smartPlayerPickerModal')) return;
    const quickChips = RAID_HEROES.filter(h => h.quick).map(h =>
      `<button type="button" onclick="RaidCore.setPickerHero('${h.key}')" data-hchip="${h.key}" class="hchip px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-sky-600 text-[11px] text-slate-200 font-semibold transition">${h.name}</button>`
    ).join('');

    const heroOptions = '<option value="">— Без фильтра по герою —</option>' +
      RAID_HEROES.map(h => `<option value="${h.key}">${h.name} (Gen ${h.gen})</option>`).join('');

    const html = `
      <div id="smartPlayerPickerModal" class="hidden fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
        <div class="glass-card max-w-5xl w-full rounded-3xl p-5 sm:p-6 border border-slate-700 shadow-2xl flex flex-col max-h-[92vh] space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 id="pickerModalTitle" class="text-base font-extrabold text-white">Выбор участника из базы альянса</h3>
              <p class="text-[11px] text-slate-400">Нажмите на заголовок любого столбца для сортировки (лучшие всегда сверху).</p>
            </div>
            <button type="button" onclick="RaidCore.closePicker()" class="text-slate-400 hover:text-white text-lg p-1"><i class="fa-solid fa-xmark"></i></button>
          </div>

          <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-3 text-xs">
            <div class="flex flex-wrap items-center gap-2.5">
              <div class="relative flex-1 min-w-[180px]">
                <i class="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-500"></i>
                <input id="pickerSearchInput" type="text" oninput="RaidCore.renderPickerTable()" placeholder="Поиск по нику или ID..."
                  class="w-full bg-slate-950 border border-slate-700 focus:border-sky-500 rounded-xl pl-8 pr-3 py-1.5 text-white focus:outline-none" />
              </div>
              <div class="flex items-center gap-2">
                <span class="text-slate-400 font-semibold">ТОП-герой:</span>
                <select id="pickerHeroSelect" onchange="RaidCore.setPickerHero(this.value)" class="bg-slate-950 border border-amber-500/40 rounded-xl px-3 py-1.5 text-amber-300 font-bold">
                  ${heroOptions}
                </select>
              </div>
              <label class="flex items-center gap-2 cursor-pointer select-none bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-slate-200">
                <input id="pickerHideAssigned" type="checkbox" checked onchange="RaidCore.renderPickerTable()" class="accent-sky-500 w-4 h-4 rounded" />
                <span>Скрыть уже занятых</span>
              </label>
            </div>
            <div class="flex flex-wrap items-center gap-1.5">
              <span class="text-[11px] text-slate-400 mr-1">Быстрый выбор героя:</span>
              ${quickChips}
              <button type="button" onclick="RaidCore.setPickerHero('')" class="px-2 py-1 rounded-lg bg-slate-950 border border-slate-700 text-[11px] text-slate-400 hover:text-white">Сбросить</button>
            </div>
          </div>

          <div class="flex-1 overflow-auto border border-slate-800 rounded-2xl bg-slate-950/70">
            <table class="w-full text-left border-collapse text-xs">
              <thead class="sticky top-0 bg-slate-900 text-slate-300 font-mono text-[11px] uppercase border-b border-slate-800 select-none">
                <tr>
                  <th class="py-2.5 px-3">Боец / Занятость</th>
                  <th class="py-2.5 px-2.5 cursor-pointer hover:text-sky-300" onclick="RaidCore.setPickerSort('furnace')">Печь / Тир <i class="fa-solid fa-sort ml-1"></i></th>
                  <th class="py-2.5 px-2.5 text-right cursor-pointer hover:text-amber-300" onclick="RaidCore.setPickerSort('rallyCap')">Сбор (Лидер) <i class="fa-solid fa-sort ml-1"></i></th>
                  <th class="py-2.5 px-2.5 text-right cursor-pointer hover:text-rose-300" onclick="RaidCore.setPickerSort('marchCap')">Марш (Филлер) <i class="fa-solid fa-sort ml-1"></i></th>
                  <th class="py-2.5 px-2.5 text-center cursor-pointer hover:text-emerald-300" onclick="RaidCore.setPickerSort('topEq')">ТОП-шмот <i class="fa-solid fa-sort ml-1"></i></th>
                  <th id="pickerHeroColHeader" class="hidden py-2.5 px-2.5 text-center cursor-pointer text-amber-300" onclick="RaidCore.setPickerSort('hero')">Герой <i class="fa-solid fa-sort ml-1"></i></th>
                  <th class="py-2.5 px-3 text-right">Выбор</th>
                </tr>
              </thead>
              <tbody id="pickerTableBody" class="divide-y divide-slate-800/60"></tbody>
            </table>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
  },

  openPicker({ title, defaultSort = 'rallyCap', assignmentsMap = {}, onSelect }) {
    this.pickerState.sortBy = defaultSort;
    this.pickerState.assignmentsMap = assignmentsMap || {};
    this.pickerState.onSelect = onSelect;
    document.getElementById('pickerModalTitle').textContent = title || 'Выбор участника';
    document.getElementById('pickerSearchInput').value = '';
    document.getElementById('smartPlayerPickerModal').classList.remove('hidden');
    this.renderPickerTable();
  },

  closePicker() {
    document.getElementById('smartPlayerPickerModal').classList.add('hidden');
  },

  setPickerSort(field) {
    this.pickerState.sortBy = field;
    this.renderPickerTable();
  },

  setPickerHero(heroKey) {
    this.pickerState.heroKey = heroKey;
    document.getElementById('pickerHeroSelect').value = heroKey;
    if (heroKey) this.pickerState.sortBy = 'hero';
    document.querySelectorAll('.hchip').forEach(btn => {
      const active = btn.getAttribute('data-hchip') === heroKey;
      btn.className = active
        ? 'hchip px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 text-[11px] font-extrabold transition'
        : 'hchip px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-sky-600 text-[11px] text-slate-200 font-semibold transition';
    });
    this.renderPickerTable();
  },

  renderPickerTable() {
    const tbody = document.getElementById('pickerTableBody');
    const search = (document.getElementById('pickerSearchInput').value || '').trim().toLowerCase();
    const hideAssigned = document.getElementById('pickerHideAssigned').checked;
    const heroKey = this.pickerState.heroKey;
    const sortBy = this.pickerState.sortBy;
    const assignMap = this.pickerState.assignmentsMap;

    const heroHeader = document.getElementById('pickerHeroColHeader');
    if (heroKey) {
      const hObj = RAID_HEROES.find(x => x.key === heroKey);
      heroHeader.innerHTML = `${hObj ? hObj.name : heroKey} <i class="fa-solid fa-sort ml-1"></i>`;
      heroHeader.classList.remove('hidden');
    } else {
      heroHeader.classList.add('hidden');
    }

    let list = this.getFilteredPlayers().filter(p => {
      const pKey = this.getPlayerKey(p);
      const assignedList = assignMap[pKey] || [];
      if (hideAssigned && assignedList.length > 0) return false;
      if (search) {
        const mNick = (p.nick || '').toLowerCase().includes(search);
        const mId = (p.playerId || '').toLowerCase().includes(search);
        if (!mNick && !mId) return false;
      }
      return true;
    });

    list.sort((a, b) => {
      if (sortBy === 'hero' && heroKey) return this.calcHeroScore(b, heroKey) - this.calcHeroScore(a, heroKey);
      if (sortBy === 'furnace') return this.calcFurnaceScore(b) - this.calcFurnaceScore(a);
      if (sortBy === 'marchCap') return (Number(b.marchCap) || 0) - (Number(a.marchCap) || 0);
      if (sortBy === 'topEq') return this.calcTopEqScore(b) - this.calcTopEqScore(a);
      return (Number(b.rallyCap) || 0) - (Number(a.rallyCap) || 0);
    });

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="py-8 text-center text-slate-500">Подходящих игроков не найдено (попробуйте снять галочку «Скрыть уже занятых»)</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(p => {
      const pKey = this.getPlayerKey(p);
      const assignedList = assignMap[pKey] || [];
      const maxMarches = Number(p.marchesCount) || 5;
      const isBusy = assignedList.length > 0;

      const statusBadge = !isBusy
        ? `<span class="text-[10px] text-emerald-400 font-mono">🟢 Свободен (0/${maxMarches})</span>`
        : `<span class="text-[10px] text-amber-300 font-mono">🟡 Занят: ${assignedList.join(', ')} (${assignedList.length}/${maxMarches})</span>`;

      let heroCell = '';
      if (heroKey) {
        const rec = this.getHeroRecord(p, heroKey);
        if (!rec) {
          heroCell = `<td class="py-2.5 px-2.5 text-center text-slate-600 font-mono">—</td>`;
        } else {
          const eTop = rec.eTop !== undefined ? rec.eTop : (rec.e1 || 5);
          heroCell = `
            <td class="py-2.5 px-2.5 text-center font-mono">
              <span class="px-2 py-0.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold text-[11px]">
                Ур.${rec.level || 70} • ${rec.starsFull ?? 5}★ • Экв.В:${eTop}
              </span>
            </td>`;
        }
      }

      const safeKey = pKey.replace(/'/g, "\\'");
      return `
        <tr class="hover:bg-slate-900/70 transition">
          <td class="py-2.5 px-3">
            <div class="font-bold text-white">${p.nick} <span class="text-[10px] font-normal text-sky-400">(${p.alliance || 'Основа'})</span></div>
            <div>${statusBadge}</div>
          </td>
          <td class="py-2.5 px-2.5 font-mono">
            <div class="text-sky-300">Печь: <b>${p.furnaceLevel || '—'}</b></div>
            <div class="text-rose-300 text-[10px]">Тир: <b>${p.troopTier || '—'}</b></div>
          </td>
          <td class="py-2.5 px-2.5 text-right font-mono font-bold text-amber-300">${(Number(p.rallyCap) || 0).toLocaleString('ru-RU')}</td>
          <td class="py-2.5 px-2.5 text-right font-mono font-bold text-slate-200">${(Number(p.marchCap) || 0).toLocaleString('ru-RU')}</td>
          <td class="py-2.5 px-2.5 text-center font-mono text-[11px] text-slate-300">${this.formatTopEqShort(p)}</td>
          ${heroCell}
          <td class="py-2.5 px-3 text-right">
            <button type="button" onclick="RaidCore.selectFromPicker('${safeKey}')"
              class="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition">
              Выбрать
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },

  selectFromPicker(pKey) {
    const player = this.allPlayers.find(p => this.getPlayerKey(p) === pKey);
    if (player && typeof this.pickerState.onSelect === 'function') {
      this.pickerState.onSelect(player);
    }
    this.closePicker();
  }
};