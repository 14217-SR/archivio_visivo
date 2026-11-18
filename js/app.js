/* ==========================================================================
   IL BALCONE COME PALCOSCENICO URBANO — Logica Applicativa & Visualizzazione 3D
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. DATI ARCHITETTONICI DEL PALAZZO (5 PIANI STORICI)
     ------------------------------------------------------------------------ */
  const FLOORS_DATA = [
    {
      id: 'rinascimentale',
      n: 'Rinascimentale',
      epoca: 'Facciata piana, simmetrica e ordinata · XV–XVI secolo',
      specs: [
        ['Supporto', 'Mensole in pietra modanata, sobrie, con sporgenza contenuta'],
        ['Parapetto', 'Balaustra a balaustri in pietra calcarea'],
        ['Sporgenza', 'Circa 50–70 cm (valore indicativo)'],
        ['Rapporto con la facciata', 'Si integra nel piano senza romperlo: prevalgono linee orizzontali e proporzioni misurate']
      ],
      social: 'Il balcone rinascimentale è soprattutto rappresentanza. Dal palazzo il signore si mostra alla città in occasioni pubbliche, cortei e feste, e la sobrietà delle forme comunica rango e ordine. Il confine tra privato e pubblico è netto, formale e quasi cerimoniale.',
      queryHint: 'BR14217'
    },
    {
      id: 'barocco',
      n: 'Barocco',
      epoca: 'Balcone bombato e scenografico · XVII–XVIII secolo',
      specs: [
        ['Supporto', 'Mensole a voluta, scolpite, spesso con mascheroni e girali'],
        ['Parapetto', 'Ringhiera bombata in ferro battuto, a bacchette curve'],
        ['Sporgenza', 'Circa 70–100 cm (valore indicativo)'],
        ['Rapporto con la facciata', 'Rompe la planarità e crea giochi di luci e ombre sulla strada']
      ],
      social: 'Il balcone barocco è un palco: sporge, si gonfia e si offre allo sguardo. Da qui si assiste a processioni e feste, e la ringhiera lascia vedere senza essere visti del tutto. È la soglia tra intimità e spettacolo della strada, come nei fronti scenografici di Palermo.',
      queryHint: 'BB14217'
    },
    {
      id: 'liberty',
      n: 'Liberty',
      epoca: 'Belle Époque · fine XIX – inizio XX secolo',
      specs: [
        ['Supporto', 'Mensole stilizzate in pietra o cemento decorato'],
        ['Parapetto', 'Ferro con motivi floreali a «colpo di frusta»'],
        ['Sporgenza', 'Circa 70–90 cm (valore indicativo)'],
        ['Rapporto con la facciata', 'Linee sinuose e decorazioni vegetali che ammorbidiscono il prospetto']
      ],
      social: 'Nella Belle Époque il balcone diventa un salotto affacciato sulla via. Segno di una borghesia in crescita, è il luogo dove farsi vedere, conversare e mostrare gusto: i fiori di ferro dichiarano modernità e appartenenza a un ceto.',
      queryHint: 'IMG14217'
    },
    {
      id: 'ferro-battuto',
      n: 'Ferro battuto',
      epoca: 'Balcone tradizionale e quotidiano · Ottocento',
      specs: [
        ['Supporto', 'Mensola in pietra a gradoni, semplice e robusta'],
        ['Parapetto', 'Ringhiera a bacchette verticali con volute e cerchi'],
        ['Sporgenza', 'Circa 60–80 cm (valore indicativo)'],
        ['Rapporto con la facciata', 'Geometria ripetuta, in dialogo con persiane e aperture regolari']
      ],
      social: 'È il balcone di tutti i giorni. Si stendono i panni, si curano le piante, si scambiano saluti e notizie con il vicinato. Qui la strada diventa una conversazione tra piani e dirimpettai, e il balcone costruisce la socialità di quartiere.',
      queryHint: 'IMG14217'
    },
    {
      id: 'moderno',
      n: 'Moderno',
      epoca: 'Architettura del Novecento · balcone continuo o seriale',
      specs: [
        ['Supporto', 'Soletta in cemento armato a sbalzo, senza mensole'],
        ['Parapetto', 'Acciaio e vetro, linee orizzontali e sottili'],
        ['Sporgenza', 'Circa 120–150 cm (valore indicativo)'],
        ['Rapporto con la facciata', 'Il balcone continuo o seriale scandisce il ritmo dei nuovi quartieri']
      ],
      social: 'Nel Novecento il balcone diventa spazio domestico all’aperto per la famiglia: meno rappresentanza, più vita privata. Ripetuto piano dopo piano, crea però un ritmo condiviso, una comunità verticale che si affaccia insieme sul quartiere.',
      queryHint: 'IMG14217'
    }
  ];

  /* ------------------------------------------------------------------------
     2. GENERATORI SVG VETTORIALI PER LE FACCIATE
     ------------------------------------------------------------------------ */
  const bars = (a, b, s, y1, y2, w) => {
    let o = '';
    for (let x = a; x <= b; x += s) {
      o += `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke-width="${w}"/>`;
    }
    return o;
  };

  const winGroup = (inner, label) =>
    `<g class="win" tabindex="0" role="button" aria-label="${label}">
      ${inner}
      <rect class="glow pulse" x="145" y="40" width="110" height="168" rx="4"/>
    </g>`;

  const SVG_BUILDERS = [
    // Piano 1: Rinascimentale
    () => {
      let ashlar = '';
      for (let y = 0; y < 300; y += 50) {
        ashlar += `<line x1="0" x2="400" y1="${y}" y2="${y}" stroke="rgba(0,0,0,.11)" stroke-width="2"/>`;
      }
      let balusters = '';
      for (let x = 118; x <= 276; x += 14) {
        balusters += `<rect x="${x}" y="181" width="7" height="26" rx="3" fill="#efe6d2" stroke="#b9a782"/>`;
      }
      return `<rect width="400" height="300" fill="#d8c8a4"/>${ashlar}` +
        winGroup(
          `<rect x="132" y="30" width="136" height="180" fill="#efe6d2"/>
           <polygon points="132,34 200,6 268,34" fill="#efe6d2" stroke="#b9a782"/>
           <rect x="150" y="48" width="100" height="160" fill="#2b3a3a"/>
           <line x1="200" y1="48" x2="200" y2="208" stroke="#efe6d2" stroke-width="4"/>`,
          'Finestra rinascimentale: clicca per la funzione sociale'
        ) +
        `<rect x="108" y="173" width="184" height="8" fill="#efe6d2" stroke="#b9a782"/>
         ${balusters}
         <rect x="104" y="207" width="192" height="13" fill="#efe6d2" stroke="#b9a782"/>
         <rect x="124" y="220" width="16" height="30" fill="#e6dcc5" stroke="#b9a782"/>
         <rect x="260" y="220" width="16" height="30" fill="#e6dcc5" stroke="#b9a782"/>`;
    },
    // Piano 2: Barocco
    () => {
      let b = '';
      for (let x = 112; x <= 288; x += 11) {
        const d = (x - 200) / 95;
        const yb = 207 + 26 * (1 - d * d);
        b += `<line x1="${x}" y1="${yb}" x2="${x}" y2="168"/>`;
      }
      return `<rect width="400" height="300" fill="#b8905a"/>
        <path d="M140 207V74Q200 12 260 74V207Z" fill="#e3c58a" stroke="#8c6a38" stroke-width="3"/>
        <circle cx="200" cy="40" r="10" fill="#e3c58a" stroke="#8c6a38"/>` +
        winGroup(
          `<path d="M152 207V78Q200 30 248 78V207Z" fill="#2b3a3a"/>
           <line x1="200" y1="40" x2="200" y2="207" stroke="#e3c58a" stroke-width="4"/>`,
          'Finestra barocca: clicca per la funzione sociale'
        ) +
        `<g stroke="#1d2420" stroke-width="2.5" fill="none">
           ${b}
           <path d="M108 168Q200 146 292 168"/>
           <path d="M106 207Q200 258 294 207" stroke-width="3"/>
           <circle cx="108" cy="168" r="8"/>
           <circle cx="292" cy="168" r="8"/>
         </g>
         <path d="M100 207Q200 246 300 207V222Q200 262 100 222Z" fill="#e3c58a" stroke="#8c6a38" stroke-width="2"/>
         <g fill="#e3c58a" stroke="#8c6a38" stroke-width="2">
           <path d="M120 228c0 22 16 30 30 22l-6-10c-8 5-14-2-14-12Z"/>
           <path d="M280 228c0 22-16 30-30 22l6-10c8 5 14-2 14-12Z"/>
         </g>`;
    },
    // Piano 3: Liberty
    () => {
      let b = '';
      for (let i = 0; i < 8; i++) {
        const x = 120 + i * 22;
        const s = i % 2 ? -1 : 1;
        b += `<path d="M${x} 207C${x + 14 * s} 195 ${x - 14 * s} 182 ${x} 170C${x + 10 * s} 162 ${x + 16 * s} 168 ${x + 10 * s} 174"/>`;
      }
      return `<rect width="400" height="300" fill="#cfd6b8"/>
        <path d="M0 24Q100 4 200 24T400 24" fill="none" stroke="#9aa683" stroke-width="3"/>` +
        winGroup(
          `<path d="M146 207V86Q146 36 200 36T254 86V207Z" fill="#e8efd8" stroke="#8a9873" stroke-width="4"/>
           <path d="M156 207V90Q156 48 200 48T244 90V207Z" fill="#2b3a3a"/>
           <path d="M200 48V207" stroke="#e8efd8" stroke-width="4"/>
           <path d="M154 60q-18 20-4 44M246 60q18 20 4 44" fill="none" stroke="#6f7f58" stroke-width="3"/>`,
          'Finestra liberty: clicca per la funzione sociale'
        ) +
        `<g fill="none" stroke="#243024" stroke-width="2.6">
           ${b}
           <path d="M112 170Q150 160 200 170T288 170" stroke-width="3"/>
         </g>
         <path d="M104 207Q200 200 296 207V218Q200 214 104 218Z" fill="#e8efd8" stroke="#8a9873" stroke-width="2"/>
         <path d="M130 218c0 20 20 30 36 22M270 218c0 20-20 30-36 22" fill="none" stroke="#8a9873" stroke-width="5"/>`;
    },
    // Piano 4: Ferro battuto
    () => {
      const shutter = (x) =>
        `<rect x="${x}" y="40" width="40" height="168" fill="#2f6b4a" stroke="#1f4a33" stroke-width="2"/>` +
        Array.from({ length: 14 }, (_, i) =>
          `<line x1="${x}" x2="${x + 40}" y1="${50 + i * 11.5}" y2="${50 + i * 11.5}" stroke="#1f4a33"/>`
        ).join('');
      let circles = '';
      for (let x = 116; x <= 284; x += 42) {
        circles += `<circle cx="${x + 21}" cy="190" r="9"/>`;
      }
      return `<rect width="400" height="300" fill="#e2a93f"/>` +
        shutter(100) +
        shutter(260) +
        winGroup(
          `<rect x="148" y="44" width="104" height="164" fill="#2b3a3a"/>
           <rect x="148" y="44" width="104" height="164" fill="none" stroke="#f3e2b8" stroke-width="5"/>
           <line x1="200" y1="44" x2="200" y2="208" stroke="#f3e2b8" stroke-width="4"/>`,
          'Finestra con balcone in ferro battuto: clicca per la funzione sociale'
        ) +
        `<g stroke="#1b1f1c" stroke-width="2.5" fill="none">
           ${bars(112, 288, 11, 173, 207, 2.2)}
           <line x1="108" y1="173" x2="292" y2="173" stroke-width="4"/>
           <line x1="108" y1="207" x2="292" y2="207" stroke-width="3"/>
           ${circles}
         </g>
         <path d="M100 207H300V222H100Z" fill="#c98a1e"/>
         <path d="M130 222h40v14h-14v14h-26Zm100 0h40v28h-26v-14h-14Z" fill="#c98a1e"/>`;
    },
    // Piano 5: Moderno
    () =>
      `<rect width="400" height="300" fill="#cfd2d0"/>` +
      winGroup(
        `<rect x="90" y="40" width="220" height="168" fill="#233236" stroke="#8e9390" stroke-width="4"/>
         <line x1="200" y1="40" x2="200" y2="208" stroke="#8e9390" stroke-width="4"/>
         <path d="M110 60L150 190M210 60L250 190" stroke="#fff" opacity=".18" stroke-width="10"/>`,
        'Portafinestra moderna: clicca per la funzione sociale'
      ) +
      `<rect x="0" y="207" width="400" height="14" fill="#8e9390"/>
       <rect x="0" y="171" width="400" height="36" fill="#7fb3b5" opacity=".35"/>
       <g stroke="#4c5250" stroke-width="3">
         <line x1="0" y1="171" x2="400" y2="171"/>
         ${bars(0, 400, 100, 171, 207, 3)}
       </g>
       <rect x="0" y="221" width="400" height="5" fill="#a9aeab"/>`
  ];

  /* ------------------------------------------------------------------------
     3. GESTIONE NAVIGAZIONE VISTE & TEMA
     ------------------------------------------------------------------------ */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const viewSections = document.querySelectorAll('.view-section');
  let tsneInitialized = false;

  function switchView(targetId) {
    tabBtns.forEach((btn) => {
      const isMatch = btn.dataset.view === targetId;
      btn.classList.toggle('active', isMatch);
      btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    viewSections.forEach((sec) => {
      sec.classList.toggle('active', sec.id === targetId);
    });

    if (targetId === 'view-tsne') {
      if (!tsneInitialized) {
        initTsneScene();
        tsneInitialized = true;
      } else if (window.resizeTsne) {
        window.resizeTsne();
      }
    }
    if (targetId === 'view-palazzo') {
      resizePalazzo();
    }
  }

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  });

  // Toggle Tema Scuro / Editoriale
  const themeBtn = document.getElementById('theme-toggle');
  themeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  });

  /* ------------------------------------------------------------------------
     4. MODULO PALAZZO INTERATTIVO (FACCIATA + ASCENSORE + POPOVER)
     ------------------------------------------------------------------------ */
  const stage = document.getElementById('stage');
  const scene = document.getElementById('scene');
  const pop = document.getElementById('pop');
  const popBackdrop = document.getElementById('pop-backdrop');
  const floorDotsContainer = document.getElementById('floor-dots');

  let curFloor = 0;
  let stageHeight = 0;
  let tourTimer = null;

  // Costruzione piani dall'alto (indice 4) al basso (indice 0)
  for (let i = 4; i >= 0; i--) {
    const floorDiv = document.createElement('div');
    floorDiv.className = 'floor';
    floorDiv.innerHTML = `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Piano ${i + 1}: ${FLOORS_DATA[i].n}">${SVG_BUILDERS[i]()}</svg>`;
    scene.appendChild(floorDiv);

    const winEl = floorDiv.querySelector('.win');
    winEl.addEventListener('click', () => openSocialPopover(i));
    winEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openSocialPopover(i);
      }
    });
  }

  // Costruzione indicatori numerici ascensore (1..5)
  FLOORS_DATA.forEach((fl, idx) => {
    const dot = document.createElement('button');
    dot.className = 'floor-dot';
    dot.textContent = idx + 1;
    dot.setAttribute('aria-label', `Vai al piano ${idx + 1}: ${fl.n}`);
    dot.title = `Piano ${idx + 1} · ${fl.n}`;
    dot.addEventListener('click', () => {
      stopTour();
      goToFloor(idx);
    });
    floorDotsContainer.appendChild(dot);
  });

  function resizePalazzo() {
    stageHeight = stage.clientHeight || window.innerHeight - 64;
    scene.querySelectorAll('.floor').forEach((f) => {
      f.style.height = stageHeight + 'px';
    });
    scene.style.transition = 'none';
    moveScene();
    void scene.offsetHeight;
    scene.style.transition = '';
  }

  function moveScene() {
    scene.style.transform = `translateY(${-(4 - curFloor) * stageHeight}px)`;
  }

  function updatePalazzoUI() {
    const d = FLOORS_DATA[curFloor];
    document.getElementById('floor-kicker').textContent = `Piano ${curFloor + 1} di 5`;
    document.getElementById('t').textContent = d.n;
    document.getElementById('e').textContent = d.epoca;
    document.getElementById('stage-badge').textContent = `Piano ${curFloor + 1} · Stile ${d.n}`;

    document.getElementById('d').innerHTML = d.specs
      .map(
        (row) =>
          `<div class="spec-item"><dt>${row[0]}</dt><dd>${row[1]}</dd></div>`
      )
      .join('');

    document.querySelectorAll('.floor-dot').forEach((dot, idx) => {
      dot.classList.toggle('active', idx === curFloor);
    });

    document.getElementById('up').disabled = curFloor === 4;
    document.getElementById('dn').disabled = curFloor === 0;
  }

  function goToFloor(index) {
    curFloor = Math.max(0, Math.min(4, index));
    closeSocialPopover();
    moveScene();
    updatePalazzoUI();
  }

  function openSocialPopover(index) {
    if (index !== curFloor) goToFloor(index);
    const d = FLOORS_DATA[index];
    document.getElementById('pop-tag').textContent = `Piano ${index + 1} · ${d.n}`;
    document.getElementById('pt').textContent = 'Funzione sociale del balcone';
    document.getElementById('pp').textContent = d.social;
    pop.classList.add('show');
    popBackdrop.classList.add('show');
  }

  function closeSocialPopover() {
    pop.classList.remove('show');
    popBackdrop.classList.remove('show');
  }

  function stopTour() {
    if (tourTimer) {
      clearInterval(tourTimer);
      tourTimer = null;
    }
    const tourBtn = document.getElementById('tour');
    tourBtn.innerHTML = '<span>▶</span> Avvia tour guidato';
    tourBtn.classList.remove('on');
  }

  document.getElementById('x').addEventListener('click', closeSocialPopover);
  popBackdrop.addEventListener('click', closeSocialPopover);

  document.getElementById('open-social-btn').addEventListener('click', () => {
    openSocialPopover(curFloor);
  });

  document.getElementById('pop-explore-archive').addEventListener('click', () => {
    closeSocialPopover();
    switchView('view-tsne');
  });

  document.getElementById('up').addEventListener('click', () => {
    stopTour();
    goToFloor(curFloor + 1);
  });

  document.getElementById('dn').addEventListener('click', () => {
    stopTour();
    goToFloor(curFloor - 1);
  });

  document.getElementById('tour').addEventListener('click', function () {
    if (tourTimer) return stopTour();
    goToFloor(0);
    this.innerHTML = '<span>■</span> Ferma tour';
    this.classList.add('on');
    tourTimer = setInterval(() => {
      if (curFloor >= 4) return stopTour();
      goToFloor(curFloor + 1);
    }, 6500);
  });

  document.addEventListener('keydown', (e) => {
    if (!document.getElementById('view-palazzo').classList.contains('active')) return;
    if (e.key === 'Escape') closeSocialPopover();
    if (e.key === 'ArrowUp') {
      stopTour();
      goToFloor(curFloor + 1);
    }
    if (e.key === 'ArrowDown') {
      stopTour();
      goToFloor(curFloor - 1);
    }
  });

  window.addEventListener('resize', resizePalazzo);
  resizePalazzo();
  updatePalazzoUI();

  /* ------------------------------------------------------------------------
     5. HELPER METADATI DATASET ARCHIVIO (57 FOTOGRAFIE REALI)
     ------------------------------------------------------------------------ */
  const RAW_DATA = window.ARCHIVIO_DATA || [];

  function enrichItem(item) {
    const fn = item.filename || '';
    let seriesLabel = 'Serie Archivio';
    if (fn.startsWith('BR')) seriesLabel = 'Serie BR · Prospetti & Balconi';
    else if (fn.startsWith('BB')) seriesLabel = 'Serie BB · Dettagli & Mensole';
    else if (fn.startsWith('IMG')) seriesLabel = 'Serie IMG · Rilievi Fotografici';

    return {
      ...item,
      series: item.category && item.category.trim() ? item.category : seriesLabel,
      displayTitle: item.subject && item.subject.trim() ? item.subject : `Reperto ${item.id}`,
      displayNotes:
        item.notes && item.notes.trim()
          ? item.notes
          : `Coordinate embedding t-SNE: (${item.x.toFixed(1)}, ${item.y.toFixed(1)}, ${item.z.toFixed(1)})`
    };
  }

  const ENRICHED_DATA = RAW_DATA.map(enrichItem);

  /* ------------------------------------------------------------------------
     6. LIGHTBOX DETTAGLIO FOTOGRAFIA (CONDIVISO TRA 3D E GALLERIA)
     ------------------------------------------------------------------------ */
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbTitle = document.getElementById('lb-title');
  const lbMeta = document.getElementById('lb-meta');

  function openLightbox(item) {
    lbImg.src = item.img;
    lbImg.alt = item.displayTitle;
    lbTitle.textContent = `${item.id} — ${item.filename}`;
    lbMeta.innerHTML = `
      <strong>Classificazione:</strong> ${item.series}<br>
      ${item.author ? `<strong>Autore:</strong> ${item.author}<br>` : ''}
      ${item.source ? `<strong>Fonte:</strong> ${item.source}<br>` : ''}
      <strong>Analisi spaziale:</strong> ${item.displayNotes}
    `;
    lightbox.classList.add('show');
  }

  document.getElementById('lb-close').addEventListener('click', () => {
    lightbox.classList.remove('show');
  });
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('show');
  });

  /* ------------------------------------------------------------------------
     7. MODULO ARCHIVIO VISIVO 3D (THREE.JS + SPRITE FOTOGRAFICI)
     ------------------------------------------------------------------------ */
  function initTsneScene() {
    const mount = document.getElementById('tsne-canvas-mount');
    const tip = document.getElementById('tsne-tip');
    const searchInput = document.getElementById('tsne-search');
    const catSelect = document.getElementById('tsne-category');
    const countEl = document.getElementById('tsne-count');

    if (!window.THREE || ENRICHED_DATA.length === 0) {
      countEl.textContent = 'Dataset non disponibile o WebGL non supportato.';
      return;
    }

    // Popoliamo le categorie
    const categories = [...new Set(ENRICHED_DATA.map((d) => d.series))];
    categories.forEach((cat) => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      catSelect.appendChild(opt);
    });

    const scene3d = new THREE.Scene();
    scene3d.fog = new THREE.FogExp2(0x10120f, 0.0014);

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight - 64;

    const camera = new THREE.PerspectiveCamera(55, width / height, 1, 2000);
    camera.position.set(0, 40, 290);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.45;

    // Griglia architettonica sottile di riferimento
    const gridHelper = new THREE.GridHelper(360, 18, 0x565f4b, 0x262b21);
    gridHelper.position.y = -150;
    scene3d.add(gridHelper);

    // Creazione Sprite per ogni fotografia dell'archivio
    const sprites = [];
    const loader = new THREE.TextureLoader();

    ENRICHED_DATA.forEach((item) => {
      const tex = loader.load(item.img);
      const mat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        opacity: 0.95
      });
      const sprite = new THREE.Sprite(mat);
      sprite.position.set(item.x, item.y, item.z);
      sprite.scale.set(22, 22, 1);
      sprite.userData = item;
      scene3d.add(sprite);
      sprites.push(sprite);
    });

    // Linee di connessione tra punti vicini nello spazio latente
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xc69c53,
      transparent: true,
      opacity: 0.14
    });
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = [];
    for (let i = 0; i < ENRICHED_DATA.length; i++) {
      for (let j = i + 1; j < ENRICHED_DATA.length; j++) {
        const a = ENRICHED_DATA[i];
        const b = ENRICHED_DATA[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
        if (dist < 48) {
          linePositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
        }
      }
    }
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const networkLines = new THREE.LineSegments(lineGeo, lineMat);
    scene3d.add(networkLines);

    // Filtro ricerca e categoria
    function applyFilter() {
      const q = searchInput.value.trim().toLowerCase();
      const cat = catSelect.value;
      let visibleCount = 0;

      sprites.forEach((sp) => {
        const d = sp.userData;
        const hay = `${d.id} ${d.filename} ${d.series} ${d.subject} ${d.author} ${d.notes}`.toLowerCase();
        const matchQ = !q || hay.includes(q);
        const matchCat = !cat || d.series === cat;
        const ok = matchQ && matchCat;

        sp.material.opacity = ok ? 0.96 : 0.1;
        sp.scale.set(ok ? 23 : 12, ok ? 23 : 12, 1);
        if (ok) visibleCount++;
      });

      countEl.textContent = `${visibleCount} di ${ENRICHED_DATA.length} immagini visibili`;
    }

    searchInput.addEventListener('input', applyFilter);
    catSelect.addEventListener('change', applyFilter);
    applyFilter();

    document.getElementById('tsne-reset').addEventListener('click', () => {
      searchInput.value = '';
      catSelect.value = '';
      applyFilter();
      camera.position.set(0, 40, 290);
      controls.target.set(0, 0, 0);
      controls.update();
    });

    // Raycaster per hover & click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredSprite = null;

    renderer.domElement.addEventListener('pointermove', (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(sprites);

      if (hits.length > 0 && hits[0].object.material.opacity > 0.3) {
        const hit = hits[0].object;
        hoveredSprite = hit;
        controls.autoRotate = false;
        renderer.domElement.style.cursor = 'pointer';

        const d = hit.userData;
        tip.style.display = 'block';
        tip.style.left = Math.min(window.innerWidth - 260, e.clientX + 16) + 'px';
        tip.style.top = Math.min(window.innerHeight - 250, e.clientY + 16) + 'px';
        tip.innerHTML = `
          <img src="${d.img}" alt="${d.id}">
          <div class="tip-title">${d.id} · ${d.filename}</div>
          <div class="tip-meta">${d.series}<br><em>Clicca per ingrandire</em></div>
        `;
      } else {
        hoveredSprite = null;
        controls.autoRotate = true;
        renderer.domElement.style.cursor = 'grab';
        tip.style.display = 'none';
      }
    });

    renderer.domElement.addEventListener('click', () => {
      if (hoveredSprite) {
        tip.style.display = 'none';
        openLightbox(hoveredSprite.userData);
      }
    });

    window.resizeTsne = () => {
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight - 64;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', window.resizeTsne);

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene3d, camera);
    }
    animate();
  }

  /* ------------------------------------------------------------------------
     8. MODULO GALLERIA ARCHIVISTICA (GRIGLIA FOTOGRAFICA)
     ------------------------------------------------------------------------ */
  const galleryGrid = document.getElementById('gallery-grid');
  const galleryFilters = document.getElementById('gallery-filters');

  function renderGallery(filterPrefix = 'ALL') {
    const filtered =
      filterPrefix === 'ALL'
        ? ENRICHED_DATA
        : ENRICHED_DATA.filter((d) => d.filename.startsWith(filterPrefix));

    galleryGrid.innerHTML = filtered
      .map(
        (item, idx) => `
      <article class="gal-card" data-idx="${ENRICHED_DATA.indexOf(item)}" tabindex="0" role="button" aria-label="Apri scheda ${item.id}">
        <img src="${item.img}" alt="${item.id}" loading="lazy">
        <div class="gal-card-info">
          <span class="gal-card-id">${item.id}</span>
          <strong class="gal-card-title">${item.filename}</strong>
          <span class="gal-card-sub">${item.series}</span>
        </div>
      </article>
    `
      )
      .join('');

    galleryGrid.querySelectorAll('.gal-card').forEach((card) => {
      const openHandler = () => {
        const item = ENRICHED_DATA[Number(card.dataset.idx)];
        if (item) openLightbox(item);
      };
      card.addEventListener('click', openHandler);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openHandler();
        }
      });
    });
  }

  if (galleryFilters) {
    galleryFilters.querySelectorAll('.filter-pill').forEach((pill) => {
      pill.addEventListener('click', () => {
        galleryFilters.querySelectorAll('.filter-pill').forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        renderGallery(pill.dataset.prefix);
      });
    });
  }

  renderGallery('ALL');
})();
