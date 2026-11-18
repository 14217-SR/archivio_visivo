# Il balcone come palcoscenico urbano

> **Atlante storico-architettonico interattivo ed esplorazione tridimensionale t-SNE dell'archivio visivo dei balconi.**

Un progetto web interattivo progettato per **GitHub Pages** che unisce narrazione architettonica e analisi visiva computazionale in un'unica interfaccia editoriale:

1. **Il Palazzo dei Balconi (5 Epoche Storiche)**
   - Navigazione verticale tramite **ascensore interattivo** (pulsanti, indicatori di piano `1–5`, frecce da tastiera `↑`/`↓` e modalità **Tour guidato automatico**).
   - Illustrazioni vettoriali **SVG** su misura per ciascuna epoca: *Rinascimentale (XV–XVI sec.)*, *Barocco (XVII–XVIII sec.)*, *Liberty (Belle Époque)*, *Ferro battuto (Ottocento)* e *Moderno (Novecento)*.
   - Schede tecniche su supporti, parapetti, sporgenze e approfondimenti dedicati alla **funzione sociale** del balcone come soglia tra spazio domestico e scena urbana.
2. **Mappa Visiva t-SNE 3D**
   - Visualizzazione spaziale in **WebGL / Three.js** delle **57 fotografie** dell'archivio proiettate tramite riduzione dimensionale *t-SNE*.
   - Connessioni reticolari di prossimità semantica/visiva, ricerca istantanea per ID/serie, tooltip dinamici al passaggio del mouse e lightbox ad alta leggibilità.
3. **Catalogo Fotografico Indicizzato**
   - Griglia filtrabile per serie archivistica (`BR`, `BB`, `IMG`) con ispezione dettagliata dei singoli reperti e delle relative coordinate nello spazio latente.

---

## Struttura del Repository

```text
palazzo-dei-balconi/
├── index.html              # Applicazione principale (entry point per GitHub Pages)
├── css/
│   └── style.css           # Design system editoriale, responsive e accessibile
├── js/
│   └── app.js              # Motore ascensore SVG, scena Three.js t-SNE e catalogo
├── data/
│   ├── archivio.js         # Dataset JS (compatibile anche con apertura locale file://)
│   └── archivio.json       # Dataset JSON strutturato (57 reperti con coordinate x, y, z)
├── assets/
│   └── images/             # Immagini originali estratte dall'archivio (BR, BB, IMG)
├── .nojekyll               # Disabilita Jekyll su GitHub Pages per caricamento immediato
├── .gitignore
├── LICENSE
└── README.md
```

---

## Pubblicazione su GitHub Pages

1. Carica tutti i file contenuti nella cartella `palazzo-dei-balconi/` nella root del tuo repository GitHub.
2. Vai su **Settings → Pages** nel repository.
3. In **Build and deployment → Source**, seleziona **Deploy from a branch**.
4. Scegli il branch `main` (o `master`) e la cartella `/ (root)`, poi clicca su **Save**.
5. Dopo pochi istanti il sito sarà online all'indirizzo `https://<tuo-utente>.github.io/<nome-repository>/`.

---

## Accessibilità & Scorciatoie da Tastiera

- `↑` / `↓`: Salita e discesa tra i piani del palazzo.
- `Invio` / `Spazio` (sulle finestre o sulle card): Apertura scheda di approfondimento.
- `Esc`: Chiusura finestre modali e lightbox.
- Supporto completo a `prefers-reduced-motion` e controllo manuale del tema cromatismo/contrasto.
