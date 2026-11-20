// ============================================================================
// СЕРВЕР АЛЬЯНСА «ГАРМОНИЯ» V6.0
// Поддержка: Основа/Академия, R1-R5, ТОП-снаряжение, Сообщения, Матрица 65 героев
// ============================================================================

const SHEET_PLAYERS = '👥 База_и_Пароли';
const SHEET_HEROES  = '🦸‍♂️ Арсенал_Героев';
const SHEET_LOGS    = '🕵️ Логи_Безопасности';

// Полный реестр всех 65 героев (1-17 поколения)
const ALL_HEROES_LIST = [
  { key: 'смит', name: 'Смит', gen: 1 },
  { key: 'юджин', name: 'Юджин', gen: 1 },
  { key: 'чарли', name: 'Чарли', gen: 1 },
  { key: 'клорис', name: 'Клорис', gen: 1 },
  { key: 'сергей', name: 'Сергей', gen: 1 },
  { key: 'джесси', name: 'Джесси', gen: 1 },
  { key: 'патрик', name: 'Патрик', gen: 1 },
  { key: 'лумак_бокан', name: 'Лумак Бокан', gen: 1 },
  { key: 'лин_сюэ', name: 'Лин Сюэ', gen: 1 },
  { key: 'джина', name: 'Джина', gen: 1 },
  { key: 'бахити', name: 'Бахити', gen: 1 },
  { key: 'джассер', name: 'Джассер', gen: 1 },
  { key: 'со_юн', name: 'Со-Юн', gen: 1 },
  { key: 'наталия', name: 'Наталия', gen: 1 },
  { key: 'молли', name: 'Молли', gen: 1 },
  { key: 'джеронимо', name: 'Джеронимо', gen: 1 },
  { key: 'зинман', name: 'Зинман', gen: 1 },
  { key: 'флинт', name: 'Флинт', gen: 2 },
  { key: 'филли', name: 'Филли', gen: 2 },
  { key: 'алонсо', name: 'Алонсо', gen: 2 },
  { key: 'логан', name: 'Логан', gen: 3 },
  { key: 'миа', name: 'Миа', gen: 3 },
  { key: 'грег', name: 'Грег', gen: 3 },
  { key: 'яхмос', name: 'Яхмос', gen: 4 },
  { key: 'рейна', name: 'Рейна', gen: 4 },
  { key: 'линн', name: 'Линн', gen: 4 },
  { key: 'гектор', name: 'Гектор', gen: 5 },
  { key: 'нора', name: 'Нора', gen: 5 },
  { key: 'гвен', name: 'Гвен', gen: 5 },
  { key: 'ву_минг', name: 'Ву Минг', gen: 6 },
  { key: 'рене', name: 'Рене', gen: 6 },
  { key: 'уэйн', name: 'Уэйн', gen: 6 },
  { key: 'эдит', name: 'Эдит', gen: 7 },
  { key: 'гордон', name: 'Гордон', gen: 7 },
  { key: 'брэдли', name: 'Брэдли', gen: 7 },
  { key: 'гатот', name: 'Гатот', gen: 8 },
  { key: 'соня', name: 'Соня', gen: 8 },
  { key: 'гендрик', name: 'Гендрик', gen: 8 },
  { key: 'магнус', name: 'Магнус', gen: 9 },
  { key: 'фред', name: 'Фред', gen: 9 },
  { key: 'ксура', name: 'Ксура', gen: 9 },
  { key: 'грегори', name: 'Грегори', gen: 10 },
  { key: 'фрея', name: 'Фрея', gen: 10 },
  { key: 'бланшет', name: 'Бланшет', gen: 10 },
  { key: 'элеонора', name: 'Элеонора', gen: 11 },
  { key: 'ллойд', name: 'Ллойд', gen: 11 },
  { key: 'руфус', name: 'Руфус', gen: 11 },
  { key: 'гервор', name: 'Гервор', gen: 12 },
  { key: 'карол', name: 'Карол', gen: 12 },
  { key: 'лигейя', name: 'Лигейя', gen: 12 },
  { key: 'гисела', name: 'Гисела', gen: 13 },
  { key: 'флора', name: 'Флора', gen: 13 },
  { key: 'вулканс', name: 'Вулканс', gen: 13 },
  { key: 'элиф', name: 'Элиф', gen: 14 },
  { key: 'доминик', name: 'Доминик', gen: 14 },
  { key: 'кара', name: 'Кара', gen: 14 },
  { key: 'хэнк', name: 'Хэнк', gen: 15 },
  { key: 'эстрелла', name: 'Эстрелла', gen: 15 },
  { key: 'вивека', name: 'Вивека', gen: 15 },
  { key: 'сейгель', name: 'Сейгель', gen: 16 },
  { key: 'урсар', name: 'Урсар', gen: 16 },
  { key: 'эйслинг', name: 'Эйслинг', gen: 16 },
  { key: 'эйден', name: 'Эйден', gen: 17 },
  { key: 'берта', name: 'Берта', gen: 17 },
  { key: 'элеанор', name: 'Элеанор', gen: 17 }
];

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🛡️ Альянс Гармония')
    .addItem('⚙️ Создать чистую базу с нуля (V6)', 'setupCleanHarmonyServer')
    .addItem('📋 Обновить выпадающие списки (Альянс, Ранг, Статус)', 'applySheetValidations')
    .addItem('🔑 Сгенерировать пароли для новых игроков', 'generateMissingPasswordsInSheet')
    .addItem('🔄 Пересобрать лист Арсенал_Героев из базы', 'rebuildAllHeroesSheet')
    .addItem('🎨 Включить подсветку дублей паролей', 'applyDuplicatePasswordHighlight')
    .addToUi();
}

function nowMsk() {
  return Utilities.formatDate(new Date(), 'Europe/Moscow', 'dd.MM.yyyy HH:mm:ss');
}

function isOfficerRank(rankStr) {
  const r = String(rankStr || '').toUpperCase().trim();
  return r.includes('R4') || r.includes('R5');
}

function generateUniquePassCode(prefix = 'FGT', existingSet = null) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  do {
    code = prefix + '-';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  } while (existingSet && existingSet.has(code));
  if (existingSet) existingSet.add(code);
  return code;
}

// 1. СОЗДАНИЕ ЧИСТОЙ БАЗЫ V6
function setupCleanHarmonyServer() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Временный лист, чтобы можно было безопасно пересоздать основные вкладки
  let tempSheet = ss.insertSheet('_temp_init_' + Date.now());

  // Пересоздаём лист игроков
  let pSheet = ss.getSheetByName(SHEET_PLAYERS);
  if (pSheet) ss.deleteSheet(pSheet);
  pSheet = ss.insertSheet(SHEET_PLAYERS);

  const playerHeaders = [
    'Ник игрока',          // A (0)
    'Альянс',              // B (1)
    'ID игрока',           // C (2)
    'Ранг',                // D (3)
    'Личный Пароль',       // E (4)
    'Статус',              // F (5)
    'Вместимость сбора',   // G (6)
    'Размер марша',        // H (7)
    'Уровень печи',        // I (8)
    'Тир войск',           // J (9)
    'Количество маршей',   // K (10)
    'Посещаемость (%)',    // L (11)
    'ТОП Снаряжение',      // M (12)
    'Сообщение игроку',    // N (13)
    'Обновлено',           // O (14)
    'Данные_Героев'        // P (15)
  ];

  pSheet.getRange(1, 1, 1, playerHeaders.length).setValues([playerHeaders]);
  pSheet.getRange(1, 1, 1, playerHeaders.length)
    .setFontWeight('bold')
    .setBackground('#0f172a')
    .setFontColor('#38bdf8');
  pSheet.setFrozenRows(1);

  // Стартовые тестовые записи
  const usedPasses = new Set();
  const sampleRows = [
    ['Виталий', 'Основа', '10001', 'R5', generateUniquePassCode('OFF', usedPasses), 'Активен', 1500000, 185000, '30 (Крист)', 'T10 (Крист)', 6, 100, 'Не настроено', '', nowMsk(), '{}'],
    ['Олег', 'Основа', '10002', 'R4', generateUniquePassCode('OFF', usedPasses), 'Активен', 1420000, 178000, '30 (Крист)', 'T10', 6, 100, 'Не настроено', '', nowMsk(), '{}'],
    ['Тайпан', 'Основа', '10003', 'R3', 'FGT-89JYV', 'Активен', 1100000, 145000, '28', 'T9', 5, 100, 'Не настроено', '', nowMsk(), '{}']
  ];
  pSheet.getRange(2, 1, sampleRows.length, playerHeaders.length).setValues(sampleRows);

  // Пересоздаём лист матрицы Арсенала Героев
  initHeroesMatrixSheet(ss, true);

  // Пересоздаём лист логов безопасности
  let lSheet = ss.getSheetByName(SHEET_LOGS);
  if (lSheet) ss.deleteSheet(lSheet);
  lSheet = ss.insertSheet(SHEET_LOGS);

  const logHeaders = ['Дата и время (МСК)', 'Игрок', 'Альянс / Ранг', 'Событие', 'Детали', 'Устройство'];
  lSheet.getRange(1, 1, 1, logHeaders.length).setValues([logHeaders]);
  lSheet.getRange(1, 1, 1, logHeaders.length)
    .setFontWeight('bold')
    .setBackground('#7f1d1d')
    .setFontColor('#ffffff');
  lSheet.setFrozenRows(1);

  // Удаляем временный лист
  ss.deleteSheet(tempSheet);

  applySheetValidations();
  applyDuplicatePasswordHighlight();
  rebuildAllHeroesSheet();

  try {
    SpreadsheetApp.getUi().alert('Чистая база V6 успешно создана! Выпадающие списки Альянса, Рангов R1–R5 и матрица героев настроены.');
  } catch (e) {}
}

// 2. ВЫПАДАЮЩИЕ СПИСКИ (ВАЛИДАЦИЯ ДАННЫХ ЧЕРЕЗ requireValueInList)
function applySheetValidations() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const pSheet = ss.getSheetByName(SHEET_PLAYERS);
  if (!pSheet) return;

  // Колонка B: Альянс
  const allianceRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Основа', 'Академия'], true)
    .setAllowInvalid(true)
    .build();
  pSheet.getRange('B2:B500').setDataValidation(allianceRule);

  // Колонка D: Ранг (R1-R5 + совместимость с R1-R3 / R4-R5)
  const rankRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['R5', 'R4', 'R3', 'R2', 'R1', 'R4-R5', 'R1-R3'], true)
    .setAllowInvalid(true)
    .build();
  pSheet.getRange('D2:D500').setDataValidation(rankRule);

  // Колонка F: Статус игрока
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Активен', 'Деактивирован', 'Бан'], true)
    .setAllowInvalid(true)
    .build();
  pSheet.getRange('F2:F500').setDataValidation(statusRule);
}

// 3. ПОДСВЕТКА ДУБЛЕЙ ПАРОЛЕЙ В КОЛОНКЕ E
function applyDuplicatePasswordHighlight() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const pSheet = ss.getSheetByName(SHEET_PLAYERS);
  if (!pSheet) return;

  const range = pSheet.getRange('E2:E500');
  const rules = pSheet.getConditionalFormatRules().filter(rule => {
    const ranges = rule.getRanges();
    return !(ranges.length === 1 && ranges[0].getA1Notation() === 'E2:E500');
  });

  const duplicateRule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=AND(E2<>""; COUNTIF($E$2:$E$500; E2)>1)')
    .setBackground('#7f1d1d')
    .setFontColor('#fecaca')
    .setBold(true)
    .setRanges([range])
    .build();

  rules.push(duplicateRule);
  pSheet.setConditionalFormatRules(rules);
}

// 4. ГЕНЕРАЦИЯ ПАРОЛЕЙ ДЛЯ НОВЫХ СТРОК В ТАБЛИЦЕ
function generateMissingPasswordsInSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const pSheet = ss.getSheetByName(SHEET_PLAYERS);
  if (!pSheet) return setupCleanHarmonyServer();

  const data = pSheet.getDataRange().getValues();
  const usedPasses = new Set();
  for (let i = 1; i < data.length; i++) {
    const p = String(data[i][4] || '').trim();
    if (p) usedPasses.add(p);
  }

  let createdCount = 0;
  for (let i = 1; i < data.length; i++) {
    const nick = String(data[i][0] || '').trim();
    const playerId = String(data[i][2] || '').trim();
    if (!nick && !playerId) continue;

    const alliance = String(data[i][1] || '').trim();
    const rank = String(data[i][3] || '').trim();
    const currentPass = String(data[i][4] || '').trim();
    const currentStatus = String(data[i][5] || '').trim();

    if (!alliance) pSheet.getRange(i + 1, 2).setValue('Основа');
    if (!rank) pSheet.getRange(i + 1, 4).setValue('R3');

    if (!currentPass) {
      const pfx = isOfficerRank(rank) ? 'OFF' : 'FGT';
      const newPass = generateUniquePassCode(pfx, usedPasses);
      pSheet.getRange(i + 1, 5).setValue(newPass);
      createdCount++;
    }
    if (!currentStatus) {
      pSheet.getRange(i + 1, 6).setValue('Активен');
    }
  }

  applySheetValidations();
  applyDuplicatePasswordHighlight();
  try {
    SpreadsheetApp.getUi().alert(`Готово! Сгенерировано новых паролей: ${createdCount}`);
  } catch (e) {}
}

// 5. ИНИЦИАЛИЗАЦИЯ И СИНХРОНИЗАЦИЯ ШИРОКОЙ МАТРИЦЫ «🦸‍♂️ Арсенал_Героев» (65 ГЕРОЕВ)
function getHeroesMatrixHeaders() {
  const headers = [
    'Ник игрока', 'Альянс', 'ID игрока', 'Обновлено',
    '🛡️ ТОП Пехота (Очки / Перч / Пояс / Сапоги)',
    '⚔️ ТОП Копейщики (Очки / Перч / Пояс / Сапоги)',
    '🏹 ТОП Стрелки (Очки / Перч / Пояс / Сапоги)'
  ];

  for (let i = 0; i < ALL_HEROES_LIST.length; i++) {
    const h = ALL_HEROES_LIST[i];
    const title = `${h.name} (G${h.gen})`;
    headers.push(
      `${title} - Ур`,
      `${title} - Звёзды`,
      `${title} - Лычки`,
      `${title} - Осв (В/С/Н)`,
      `${title} - Эксп (В/С/Н)`,
      `${title} - Пушка`
    );
  }
  return headers;
}

function initHeroesMatrixSheet(ss, forceRecreate = false) {
  let hSheet = ss.getSheetByName(SHEET_HEROES);
  if (hSheet && forceRecreate) {
    ss.deleteSheet(hSheet);
    hSheet = null;
  }
  const headers = getHeroesMatrixHeaders();

  if (!hSheet) {
    hSheet = ss.insertSheet(SHEET_HEROES);
    const currentMaxCols = hSheet.getMaxColumns();
    if (currentMaxCols < headers.length) {
      hSheet.insertColumnsAfter(currentMaxCols, headers.length - currentMaxCols);
    }
    hSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    hSheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#1e293b')
      .setFontColor('#fbbf24');
    hSheet.setFrozenRows(1);
    hSheet.setFrozenColumns(3);
  } else {
    const currentMaxCols = hSheet.getMaxColumns();
    if (currentMaxCols < headers.length) {
      hSheet.insertColumnsAfter(currentMaxCols, headers.length - currentMaxCols);
    }
  }
  return hSheet;
}

function formatSingleClassTopEq(eqObj) {
  if (!eqObj || (!eqObj.gLvl && !eqObj.glLvl && !eqObj.bLvl && !eqObj.btLvl)) {
    return '—';
  }
  return `Очки:${eqObj.gLvl || '-'}(${eqObj.gTier || '-'}) | Перч:${eqObj.glLvl || '-'}(${eqObj.glTier || '-'}) | Пояс:${eqObj.bLvl || '-'}(${eqObj.bTier || '-'}) | Сап:${eqObj.btLvl || '-'}(${eqObj.btTier || '-'})`;
}

function formatAllTopEquipmentSummary(topEq) {
  if (!topEq || typeof topEq !== 'object') return 'Не настроено';
  const inf = formatSingleClassTopEq(topEq.infantry);
  const lan = formatSingleClassTopEq(topEq.lancers);
  const mrk = formatSingleClassTopEq(topEq.marksmen);
  if (inf === '—' && lan === '—' && mrk === '—') return 'Не настроено';
  return `Пех:[${inf}] | Коп:[${lan}] | Стр:[${mrk}]`;
}

function buildPlayerHeroesMatrixRow(nick, alliance, playerId, updatedAt, heroesData, topEq) {
  const safeHeroes = heroesData || {};
  const safeTopEq = topEq || safeHeroes._topEquipment || {};

  const row = [
    nick,
    alliance || 'Основа',
    playerId || '',
    updatedAt || nowMsk(),
    formatSingleClassTopEq(safeTopEq.infantry),
    formatSingleClassTopEq(safeTopEq.lancers),
    formatSingleClassTopEq(safeTopEq.marksmen)
  ];

  for (let i = 0; i < ALL_HEROES_LIST.length; i++) {
    const hKey = ALL_HEROES_LIST[i].key;
    const d = safeHeroes[hKey];
    if (d && d.configured) {
      const sTop = d.sTop !== undefined ? d.sTop : (d.s1 || 5);
      const sMid = d.sMid !== undefined ? d.sMid : (d.s2 || 5);
      const sBot = d.sBot !== undefined ? d.sBot : (d.s3 || 5);

      const eTop = d.eTop !== undefined ? d.eTop : (d.e1 || 5);
      const eMid = d.eMid !== undefined ? d.eMid : 0;
      const eBot = d.eBot !== undefined ? d.eBot : (d.e2 || 5);

      const expSkills = eMid === 0 ? `${eTop}/—/${eBot}` : `${eTop}/${eMid}/${eBot}`;
      const cannonText = d.cannon ? `Да (${d.cannonLvl || '1'})` : 'Нет';

      row.push(
        Number(d.level) || 70,
        Number(d.starsFull !== undefined ? d.starsFull : 5),
        Number(d.starsBars) || 0,
        `${sTop}/${sMid}/${sBot}`,
        expSkills,
        cannonText
      );
    } else {
      row.push('', '', '', '', '', '');
    }
  }

  return row;
}

function syncPlayerToHeroesMatrix(ss, nick, alliance, playerId, updatedAt, heroesData, topEq) {
  const hSheet = initHeroesMatrixSheet(ss, false);
  const matrixRow = buildPlayerHeroesMatrixRow(nick, alliance, playerId, updatedAt, heroesData, topEq);

  const lastRow = hSheet.getLastRow();
  let targetRowIdx = -1;

  if (lastRow >= 2) {
    const metaCols = hSheet.getRange(2, 1, lastRow - 1, 3).getValues();
    for (let i = 0; i < metaCols.length; i++) {
      const rNick = String(metaCols[i][0] || '').trim().toLowerCase();
      const rId = String(metaCols[i][2] || '').trim();
      if ((playerId && rId === playerId) || (!playerId && rNick === nick.toLowerCase())) {
        targetRowIdx = i + 2;
        break;
      }
    }
  }

  if (targetRowIdx === -1) {
    targetRowIdx = lastRow + 1;
  }

  hSheet.getRange(targetRowIdx, 1, 1, matrixRow.length).setValues([matrixRow]);
}

function rebuildAllHeroesSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const pSheet = ss.getSheetByName(SHEET_PLAYERS);
  if (!pSheet) return;

  const hSheet = initHeroesMatrixSheet(ss, true);
  const pRows = pSheet.getDataRange().getValues();
  const matrixRows = [];

  for (let i = 1; i < pRows.length; i++) {
    const r = pRows[i];
    const nick = String(r[0] || '').trim();
    const playerId = String(r[2] || '').trim();
    if (!nick && !playerId) continue;

    let heroesData = {};
    try {
      if (r[15]) heroesData = JSON.parse(r[15]);
    } catch (e) {}

    const topEq = heroesData._topEquipment || {};
    matrixRows.push(
      buildPlayerHeroesMatrixRow(
        nick,
        String(r[1] || 'Основа'),
        playerId,
        String(r[14] || ''),
        heroesData,
        topEq
      )
    );
  }

  if (matrixRows.length > 0) {
    hSheet.getRange(2, 1, matrixRows.length, matrixRows[0].length).setValues(matrixRows);
  }
}

// 6. ЛОГИРОВАНИЕ СОБЫТИЙ
function writeLog(nick, playerId, alliance, rank, action, details, ua) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const lSheet = ss.getSheetByName(SHEET_LOGS);
  if (!lSheet) return;
  const actorLabel = playerId ? `${nick} [ID:${playerId}]` : nick;
  const rankLabel = `${alliance || 'Основа'} • ${rank}`;
  lSheet.appendRow([nowMsk(), actorLabel, rankLabel, action, details, String(ua || '').slice(0, 140)]);
}

// 7. ОБРАБОТЧИК POST-ЗАПРОСОВ ОТ ПОРТАЛА
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    const action = body.action || '';
    const passcode = String(body.passcode || '').trim();
    const page = body.page || 'index.html';
    const ua = body.userAgent || '';

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const pSheet = ss.getSheetByName(SHEET_PLAYERS);
    if (!pSheet) {
      return respond({ ok: false, error: 'База не инициализирована. Запустите создание чистой базы в меню таблицы.' });
    }

    const rows = pSheet.getDataRange().getValues();
    const headers = rows[0].map(h => String(h || '').toLowerCase().trim());
    const passColIdx = headers.findIndex(h => h.includes('пароль'));
    const actualPassCol = passColIdx !== -1 ? passColIdx : 4;

    let userRowIdx = -1;
    let userRow = null;

    for (let i = 1; i < rows.length; i++) {
      if (String(rows[i][actualPassCol] || '').trim() === passcode && passcode !== '') {
        userRowIdx = i + 1;
        userRow = rows[i];
        break;
      }
    }

    if (!userRow) {
      writeLog('НЕИЗВЕСТНЫЙ', '', '—', '—', '❌ Неверный пароль', `Код: "${passcode}" (${page})`, ua);
      return respond({ ok: false, error: 'Неверный индивидуальный код доступа!' });
    }

    const nick = String(userRow[0] || '').trim();
    const userAlliance = String(userRow[1] || 'Основа').trim();
    const playerId = String(userRow[2] || '').trim();
    const rank = String(userRow[3] || 'R3').trim();
    const status = String(userRow[5] || 'Активен').trim();
    const statusLow = status.toLowerCase();
    const isOfficer = isOfficerRank(rank);

    if (statusLow.includes('бан') || statusLow.includes('блок') || statusLow.includes('деактив')) {
      writeLog(nick, playerId, userAlliance, rank, '🚫 Вход отклонён', `Статус: ${status} (${page})`, ua);
      return respond({ ok: false, error: 'Ваш аккаунт деактивирован руководством альянса.' });
    }

    // А. ВХОД И СИНХРОНИЗАЦИЯ
    if (action === 'login' || action === 'sync') {
      if (action === 'login') {
        writeLog(nick, playerId, userAlliance, rank, '✅ Вход на портал', `Успешный вход (${page})`, ua);
      } else if (body.logPage) {
        writeLog(nick, playerId, userAlliance, rank, '👁️ Переход', `Открыл: ${page}`, ua);
      }

      const myCard = rowToCard(userRow, false);

      if (!isOfficer) {
        return respond({
          ok: true,
          user: { nick, playerId, alliance: userAlliance, rank, isOfficer: false },
          myCard
        });
      }

      // Для офицеров возвращаем список игроков (без выдачи личных паролей в открытый столбец)
      // R5 видит все подразделения, R4 видит игроков своего подразделения (либо всех при фильтре)
      const allPlayers = rows
        .slice(1)
        .filter(r => r[0] || r[2])
        .map(r => rowToCard(r, false));

      const lSheet = ss.getSheetByName(SHEET_LOGS);
      const logRows = lSheet && lSheet.getLastRow() > 1
        ? lSheet.getDataRange().getValues().slice(1).reverse().slice(0, 100)
        : [];
      const logs = logRows.map(lr => ({
        time: String(lr[0]),
        nick: String(lr[1]),
        rank: String(lr[2]),
        event: String(lr[3]),
        details: String(lr[4]),
        ua: String(lr[5])
      }));

      return respond({
        ok: true,
        user: { nick, playerId, alliance: userAlliance, rank, isOfficer: true },
        myCard,
        allPlayers,
        logs
      });
    }

    // Б. СОХРАНЕНИЕ КАРТОЧКИ БОЙЦА, ТОП-СНАРЯЖЕНИЯ И 65 ГЕРОЕВ
    if (action === 'save_card') {
      const targetId = String(body.targetId || '').trim();
      const targetNick = String(body.targetNick || '').trim();
      let targetIdx = userRowIdx;
      let oldR = userRow;

      if (isOfficer && (targetId || targetNick)) {
        for (let i = 1; i < rows.length; i++) {
          const rNick = String(rows[i][0] || '').trim().toLowerCase();
          const rId = String(rows[i][2] || '').trim();
          if ((targetId && rId === targetId) || (!targetId && targetNick && rNick === targetNick.toLowerCase())) {
            targetIdx = i + 1;
            oldR = rows[i];
            break;
          }
        }
      }

      const c = body.card || {};
      const updatedTime = nowMsk();
      const newNick = String(c.nick || oldR[0]).trim();
      const newAlliance = String(c.alliance || oldR[1] || 'Основа').trim();
      const newPlayerId = String(c.playerId !== undefined ? c.playerId : oldR[2]).trim();
      const newRank = (isOfficer && c.rank) ? String(c.rank).trim() : String(oldR[3] || 'R3').trim();
      const newStatus = (isOfficer && c.status) ? String(c.status).trim() : String(oldR[5] || 'Активен').trim();

      let heroesData = c.heroesData || {};
      const topEq = c.topEquipmentData || heroesData._topEquipment || {};
      heroesData._topEquipment = topEq;
      heroesData._alliance = newAlliance;

      const topEqSummary = formatAllTopEquipmentSummary(topEq);
      const messageToPlayer = c.officerMessage !== undefined ? String(c.officerMessage) : String(oldR[13] || '');
      const heroesJson = JSON.stringify(heroesData);

      const updatedRow = [
        newNick,                                                      // A: Ник
        newAlliance,                                                  // B: Альянс
        newPlayerId,                                                  // C: ID игрока
        newRank,                                                      // D: Ранг
        oldR[4],                                                      // E: Личный Пароль (неизменный)
        newStatus,                                                    // F: Статус
        Number(c.rallyCap) || 0,                                      // G: Вместимость сбора
        Number(c.marchCap) || 0,                                      // H: Размер марша
        String(c.furnaceLevel || ''),                                 // I: Уровень печи
        String(c.troopTier || ''),                                    // J: Тир войск
        Number(c.marchesCount) || 5,                                  // K: Количество маршей
        c.attendance !== undefined ? Number(c.attendance) : Number(oldR[11] || 100), // L: Посещаемость
        topEqSummary,                                                 // M: ТОП Снаряжение
        messageToPlayer,                                              // N: Сообщение игроку
        updatedTime,                                                  // O: Обновлено
        heroesJson                                                    // P: Данные_Героев
      ];

      pSheet.getRange(targetIdx, 1, 1, updatedRow.length).setValues([updatedRow]);

      // Синхронизируем строку игрока на листе 🦸‍♂️ Арсенал_Героев
      syncPlayerToHeroesMatrix(ss, newNick, newAlliance, newPlayerId, updatedTime, heroesData, topEq);

      writeLog(
        nick,
        playerId,
        userAlliance,
        rank,
        `✏️ Сохранение карточки (${newNick})`,
        `Альянс: ${newAlliance} | Печь: ${updatedRow[8]} | Тир: ${updatedRow[9]} | Сбор: ${updatedRow[6]}`,
        ua
      );

      return respond({
        ok: true,
        updatedAt: updatedTime,
        card: rowToCard(updatedRow, false)
      });
    }

    // В. ОФИЦЕРСКИЕ ОПЕРАЦИИ: ДОБАВЛЕНИЕ, ДЕАКТИВАЦИЯ, СООБЩЕНИЕ ИГРОКУ, СМЕНА ПАРОЛЯ, УДАЛЕНИЕ
    if (['add_member', 'toggle_status', 'deactivate_member', 'send_message', 'delete_member', 'regen_pass'].includes(action)) {
      if (!isOfficer) {
        return respond({ ok: false, error: 'Доступно только офицерам R4–R5!' });
      }

      const usedPasses = new Set(rows.slice(1).map(r => String(r[4] || '').trim()).filter(Boolean));

      // Добавление нового игрока
      if (action === 'add_member') {
        const mNick = String(body.memberNick || '').trim();
        const mId = String(body.memberId || '').trim();
        const mAlliance = String(body.memberAlliance || userAlliance || 'Основа').trim();
        const mRank = String(body.memberRank || 'R3').trim();
        if (!mNick) return respond({ ok: false, error: 'Укажите ник игрока' });

        const newPass = generateUniquePassCode(isOfficerRank(mRank) ? 'OFF' : 'FGT', usedPasses);
        const createdTime = nowMsk();
        const newRow = [
          mNick, mAlliance, mId, mRank, newPass, 'Активен',
          0, 0, '', '', 5, 100, 'Не настроено', '', createdTime, '{}'
        ];
        pSheet.appendRow(newRow);
        syncPlayerToHeroesMatrix(ss, mNick, mAlliance, mId, createdTime, {}, {});
        writeLog(nick, playerId, userAlliance, rank, '➕ Добавлен боец', `Ник: ${mNick}, Альянс: ${mAlliance}, Ранг: ${mRank}`, ua);
        return respond({ ok: true, player: rowToCard(newRow, false), generatedPass: newPass });
      }

      // Поиск целевого игрока по ID или нику
      const targetId = String(body.targetId || '').trim();
      const targetNick = String(body.targetNick || '').trim().toLowerCase();

      for (let i = 1; i < rows.length; i++) {
        const rNick = String(rows[i][0] || '').trim();
        const rId = String(rows[i][2] || '').trim();
        if ((targetId && rId === targetId) || (!targetId && targetNick && rNick.toLowerCase() === targetNick)) {
          const rowNum = i + 1;

          // Деактивация / Активация игрока
          if (action === 'deactivate_member' || action === 'toggle_status') {
            const currentSt = String(rows[i][5] || 'Активен').trim();
            const nextStatus = body.newStatus
              ? String(body.newStatus).trim()
              : (currentSt === 'Активен' ? 'Деактивирован' : 'Активен');
            pSheet.getRange(rowNum, 6).setValue(nextStatus);
            writeLog(nick, playerId, userAlliance, rank, '🔒 Статус игрока', `${rNick}: ${currentSt} -> ${nextStatus}`, ua);
            return respond({ ok: true, status: nextStatus });
          }

          // Отправка сообщения игроку от офицера
          if (action === 'send_message') {
            const msgText = String(body.message || '').trim();
            const stampedMsg = msgText ? `[От ${nick} • ${nowMsk()}]: ${msgText}` : '';
            pSheet.getRange(rowNum, 14).setValue(stampedMsg);
            writeLog(nick, playerId, userAlliance, rank, '✉️ Сообщение бойцу', `Для ${rNick}: ${msgText || '(очищено)'}`, ua);
            return respond({ ok: true, officerMessage: stampedMsg });
          }

          // Удаление игрока
          if (action === 'delete_member') {
            pSheet.deleteRow(rowNum);
            writeLog(nick, playerId, userAlliance, rank, '🗑️ Удалён игрок', `Удалён: ${rNick} [ID:${rId}]`, ua);
            return respond({ ok: true });
          }

          // Перегенерация пароля (возвращается только при прямом запросе офицера)
          if (action === 'regen_pass') {
            const pfx = isOfficerRank(rows[i][3]) ? 'OFF' : 'FGT';
            const nextPass = generateUniquePassCode(pfx, usedPasses);
            pSheet.getRange(rowNum, 5).setValue(nextPass);
            writeLog(nick, playerId, userAlliance, rank, '🔑 Сброс пароля', `Новый пароль для ${rNick}`, ua);
            return respond({ ok: true, newPass: nextPass });
          }
        }
      }

      return respond({ ok: false, error: 'Игрок не найден в базе' });
    }

    return respond({ ok: false, error: 'Неизвестный запрос: ' + action });
  } catch (err) {
    return respond({ ok: false, error: err.message });
  }
}

function rowToCard(r, includeSecret = false) {
  let heroesData = {};
  try {
    if (r[15]) heroesData = JSON.parse(r[15]);
  } catch (e) {}

  const topEq = heroesData._topEquipment || { infantry: null, lancers: null, marksmen: null };

  const obj = {
    nick: String(r[0] || ''),
    alliance: String(r[1] || heroesData._alliance || 'Основа'),
    playerId: String(r[2] || ''),
    rank: String(r[3] || 'R3'),
    status: String(r[5] || 'Активен'),
    rallyCap: Number(r[6]) || 0,
    marchCap: Number(r[7]) || 0,
    furnaceLevel: String(r[8] || ''),
    troopTier: String(r[9] || ''),
    marchesCount: Number(r[10]) || 5,
    attendance: Number(r[11] !== undefined && r[11] !== '' ? r[11] : 100),
    topEquipmentSummary: String(r[12] || 'Не настроено'),
    officerMessage: String(r[13] || ''),
    updatedAt: String(r[14] || ''),
    heroesData: heroesData,
    topEquipmentData: topEq
  };

  if (includeSecret) {
    obj.passcode = String(r[4] || '');
  }
  return obj;
}

function respond(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}