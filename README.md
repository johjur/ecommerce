# Sneakers E-Commerce

See rakendus pakub kasutajasõbralikku kogemust, rõhuga ligipääsetavusele.

## 🎯 Funktsionaalsus

- **Reageeriv disain** – sobitub enamike seadmesuurustega alates mobiilist kuni lauaarvutini  
- **Interaktiivne tootegalerii** – tootepilte saab avada lightbox vaates  
- **Ostukorvi haldamine** – tooteid saab lisada ja eemaldada reaalajas  
- **Ligipääsetavus** – vastab WCAG juhistele, toetab klaviatuuri ja ekraanilugejaid  

## 🧑‍💻 Kasutaja tegevused

Kasutaja saab:

- Vaadata saidi parimat paigutust vastavalt oma seadme ekraanisuurusele  
- Näha kõigi interaktiivsete elementide hover-olekuid  
- Avada tootepildi suurelt lightboxi kaudu  
- Vahetada suurt tootepilti klikates väikestel eelvaadetel  
- Lisada tooteid ostukorvi  
- Vaadata ja hallata ostukorvi sisu  

## ♿ Ligipääsetavuse lahendused

- Klaviatuurinavigatsioon koos fookuse nähtavusega  
- ARIA atribuute ekraanilugejate toetamiseks  
- Modaalide ja dialoogide fookuse lukustamine  
- Klaviatuuri otseteed liikumiseks  
- Alt-tekstid piltidele  
- Aria-live alad dünaamilise sisu jaoks  
- Reageeriv disain ligipääsetavust arvestades  

## 🛠️ Tehnoloogiad

- **Frontend**: Angular 19, TypeScript, SCSS  
- **Seisundi haldus**: RxJS  
- **Testimine**: Jasmine, Karma  
- **Ehitustööriistad**: Angular CLI  


- BEM meetod loetava ja hallatava CSS-i jaoks  

## 📦 Eeldused

- Node.js (v18.x või uuem)  
- npm (v9.x või uuem)  

## 🚀 Alustamine

1. Klooni repositoorium:

   ```bash
   git clone <repo-link>
   cd sneakers-ecommerce
   ```

2. Paigalda sõltuvused:

   ```bash
   npm install
   ```

### Rakenduse käivitamine

Arendusserveri käivitamine:

```bash
npm start
```

Ava `http://localhost:4200/` brauseris. Rakendus laeb automaatselt uuesti, kui muudate lähtefaile.

---

## ⚠️ Märkused

Kuigi projekt töötab ja katab suure osa nõuetest, ei ole see veel täiesti ideaalne. Siin on mõned puudused:

- **Reageerivus ekraanisuurustel** võib mõnes kohas olla ebapiisav (nt osad elemendid lähevad paigast ära). Standardekraanidel toimib kõik ootuspäraselt.
- **Font ei näe välja täpselt selline nagu kujunduses ette näidatud** ja ka teised elemendid ei vasta täpselt etteantud disainile.
- Kui **toodete ostukorv ("Your chart is empty")** on tühi, muutub selle suurus dünaamiliselt, mis erineb disainis ettenähtud fikseeritud suurusest.

---

Made by Johanna :D