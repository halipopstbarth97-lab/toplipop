import { useState, useEffect } from "react";

// ── ICONS (inline SVG components) ──────────────────────────────────────────
const Icon = ({ d, size = 18, stroke = "currentColor", fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((path, i) => <path key={i} d={path} />) : <path d={d} />}
  </svg>
);

const icons = {
  dashboard: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  baby: ["M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z", "M6 8a6 6 0 0 1 12 0v1H6V8z", "M4 18c0-3.3 3.6-6 8-6s8 2.7 8 6"],
  tool: ["M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"],
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  invoice: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", "M14 2v6h6", "M16 13H8", "M16 17H8", "M10 9H8"],
  users: ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M23 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75"],
  tag: ["M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z", "M7 7h.01"],
  bell: ["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 0 1-3.46 0"],
  calendar: ["M3 4h18v18H3z", "M16 2v4", "M8 2v4", "M3 10h18"],
  check: "M20 6L9 17l-5-5",
  plus: ["M12 5v14", "M5 12h14"],
  search: ["M11 17.25a6.25 6.25 0 1 1 0-12.5 6.25 6.25 0 0 1 0 12.5z", "M16 16l4.5 4.5"],
  logout: ["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", "M16 17l5-5-5-5", "M21 12H9"],
  chevron: "M9 18l6-6-6-6",
  dot: "",
  shield: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"],
  clock: ["M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z", "M12 6v6l4 2"],
  map: ["M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z", "M8 2v16", "M16 6v16"],
  trend: ["M23 6l-9.5 9.5-5-5L1 18"],
  package: ["M16.5 9.4l-9-5.19", "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z", "M3.27 6.96L12 12.01l8.73-5.05", "M12 22.08V12"],
  mail: ["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z", "M22 6l-10 7L2 6"],
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
  grid: ["M3 3h7v7H3z", "M14 3h7v7h-7z", "M14 14h7v7h-7z", "M3 14h7v7H3z"],
  euro: ["M14 2a7 7 0 1 0 0 14H14", "M3 9h11", "M3 13h11"],
  percent: ["M19 5L5 19", "M6.5 6.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z", "M17.5 17.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"],
  broadcast: ["M22 8.5c0 2.76-2.24 5-5 5s-5-2.24-5-5 2.24-5 5-5 5 2.24 5 5z", "M17 13.5v7", "M2 20l4-4", "M2 20h5", "M2 20v-5", "M8.56 13.07A8 8 0 0 0 3 20"],
  send: ["M22 2L11 13", "M22 2L15 22l-4-9-9-4 20-7z"],
  zap: ["M13 2L3 14h9l-1 8 10-12h-9l1-8z"],
  radio: ["M2 16.1A5 5 0 0 1 5.9 20", "M2 12.05A9 9 0 0 1 9.95 19", "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6", "M12 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"],
  msgcheck: ["M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", "M9 11l3 3 4-4"],
  filter: ["M22 3H2l8 9.46V19l4 2v-8.54L22 3z"],
};

// ── MOCK DATA ───────────────────────────────────────────────────────────────
const BABYSITTERS = [
  { id: 1, name: "Sophie Martin", age: 26, photo: "SM", rating: 4.9, reviews: 48, languages: ["FR", "EN", "ES"], hourlyRate: 15, available: true, zones: ["Monaco", "Nice", "Cap-d'Ail"], certified: true, experience: "5 ans", specialties: ["0-3 ans", "Aide aux devoirs"], phone: "+377 06 12 34 56" },
  { id: 2, name: "Emma Rousseau", age: 23, photo: "ER", rating: 4.8, reviews: 31, languages: ["FR", "EN"], hourlyRate: 14, available: true, zones: ["Monaco", "Beausoleil"], certified: true, experience: "3 ans", specialties: ["3-10 ans", "Activités créatives"], phone: "+377 06 98 76 54" },
  { id: 3, name: "Léa Fontaine", age: 29, photo: "LF", rating: 5.0, reviews: 67, languages: ["FR", "EN", "IT"], hourlyRate: 17, available: false, zones: ["Monaco", "Menton", "Roquebrune"], certified: true, experience: "7 ans", specialties: ["Nourrissons", "Besoins spéciaux"], phone: "+377 06 55 44 33" },
  { id: 4, name: "Julie Bernard", age: 24, photo: "JB", rating: 4.7, reviews: 22, languages: ["FR", "DE"], hourlyRate: 13, available: true, zones: ["Cap-d'Ail", "Eze", "Villefranche"], certified: false, experience: "2 ans", specialties: ["3-12 ans"], phone: "+377 06 11 22 33" },
];

const MAINTENANCE_REQUESTS = [
  { id: "M001", client: "Hôtel Métropole", type: "Plomberie", desc: "Fuite salle de bain suite 204", priority: "urgent", status: "in_progress", team: "Équipe A", date: "2026-05-20", time: "09:00" },
  { id: "M002", client: "Résidence Park Palace", type: "Électricité", desc: "Remplacement tableau électrique", priority: "normal", status: "scheduled", team: "Équipe B", date: "2026-05-21", time: "14:00" },
  { id: "M003", client: "Villa Riviera", type: "Climatisation", desc: "Maintenance annuelle 3 unités", priority: "low", status: "completed", team: "Équipe A", date: "2026-05-19", time: "10:00" },
  { id: "M004", client: "Appartement Carré d'Or", type: "Serrurerie", desc: "Remplacement serrure entrée", priority: "urgent", status: "pending", team: null, date: "2026-05-20", time: "11:00" },
];

const EVENTS = [
  { id: "E001", name: "Gala de charité — Yacht Club", client: "Fondation Prince Albert II", date: "2026-05-25", guests: 120, type: "Gala", status: "confirmed", staff: 8, budget: 4500 },
  { id: "E002", name: "Anniversaire — Villa Bella Vista", client: "Famille Moreau", date: "2026-05-28", guests: 45, type: "Anniversaire", status: "planning", staff: 4, budget: 1800 },
  { id: "E003", name: "Cocktail Corporate — Grimaldi Forum", client: "Monaco Media Group", date: "2026-06-03", guests: 200, type: "Corporate", status: "confirmed", staff: 12, budget: 7200 },
  { id: "E004", name: "Baby shower — Monte-Carlo Bay", client: "Famille Dubois", date: "2026-06-08", guests: 25, type: "Baby Shower", status: "planning", staff: 2, budget: 900 },
];

const CLIENTS = [
  { id: 1, name: "Hôtel Hermitage", type: "partner", category: "Hôtellerie", contact: "M. Laurent", email: "laurent@hermitage.mc", phone: "+377 98 06 40 00", services: ["Baby-sitting", "Événements", "Maintenance"], since: "2023", spent: 28500 },
  { id: 2, name: "Famille Johnson", type: "tourist", category: "Touriste", contact: "Sarah Johnson", email: "sarah@johnson.com", phone: "+1 555 234 5678", services: ["Baby-sitting"], since: "2025", spent: 1200 },
  { id: 3, name: "Résidence Le Sporting", type: "resident", category: "Résident", contact: "M. Blanchard", email: "blanchard@sporting.mc", phone: "+377 06 77 88 99", services: ["Baby-sitting", "Maintenance"], since: "2024", spent: 5600 },
  { id: 4, name: "Monaco Events SA", type: "partner", category: "Agence événementielle", contact: "Mme Petit", email: "petit@monacoevents.mc", phone: "+377 99 11 22 33", services: ["Extras", "Événements", "Location"], since: "2022", spent: 42000 },
];

const INVOICES = [
  { id: "F2026-047", client: "Hôtel Hermitage", service: "Baby-sitting × 12h", amount: 216, associate: "Sophie M.", date: "2026-05-18", status: "paid", commission: 15 },
  { id: "F2026-046", client: "Famille Johnson", service: "Baby-sitting × 8h", amount: 120, associate: "Emma R.", date: "2026-05-17", status: "pending", commission: 12 },
  { id: "F2026-045", client: "Monaco Events SA", service: "Gala — 8 extras", amount: 1440, associate: "Équipe Events", date: "2026-05-15", status: "paid", commission: 180 },
  { id: "F2026-044", client: "Résidence Le Sporting", service: "Maintenance plomberie", amount: 380, associate: "Équipe A", date: "2026-05-14", status: "overdue", commission: 38 },
];

const EXTRAS_TEAM = [
  { id: 1, name: "Lucas Fernandez", photo: "LF", role: "Serveur", rating: 4.9, missions: 34, available: true, phone: "+377 06 10 20 30", zones: ["Monaco", "Nice"], skills: ["Service cocktail", "Barman", "Vins"] },
  { id: 2, name: "Inès Dubois", photo: "ID", role: "Serveuse", rating: 4.8, missions: 28, available: true, phone: "+377 06 11 22 33", zones: ["Monaco", "Cap-d'Ail"], skills: ["Service à table", "Maître d'hôtel"] },
  { id: 3, name: "Romain Charvet", photo: "RC", role: "Barman", rating: 5.0, missions: 51, available: false, phone: "+377 06 33 44 55", zones: ["Monaco", "Menton"], skills: ["Cocktails", "Vins", "Champagne"] },
  { id: 4, name: "Amina Boulou", photo: "AB", role: "Animatrice", rating: 4.7, missions: 19, available: true, phone: "+377 06 55 66 77", zones: ["Monaco", "Beausoleil"], skills: ["Animation", "Jeux", "Enfants"] },
  { id: 5, name: "Théo Martin", photo: "TM", role: "Logisticien", rating: 4.6, missions: 22, available: true, phone: "+377 06 77 88 99", zones: ["Toute Côte d'Azur"], skills: ["Montage", "Démontage", "Transport"] },
  { id: 6, name: "Chloé Renard", photo: "CR", role: "Hôtesse", rating: 4.9, missions: 41, available: false, phone: "+377 06 99 00 11", zones: ["Monaco", "Nice", "Cannes"], skills: ["Accueil", "Placement", "Protocole"] },
];

const BROADCAST_HISTORY = [
  { id: "B001", title: "Dispo Gala 25 mai — Yacht Club", date: "2026-05-18 14:32", sentTo: 18, replied: 12, confirmed: 8, type: "gala", urgent: true, message: "Bonjour, nous recherchons 8 extras pour le Gala de charité au Yacht Club le 25 mai. Service cocktail + dîner assis. 19h–02h. Tenue : tenue noire. Tarif : 28€/h. Merci de confirmer votre disponibilité." },
  { id: "B002", title: "Cocktail Corporate — Grimaldi Forum 3 juin", date: "2026-05-16 10:05", sentTo: 22, replied: 15, confirmed: 12, type: "corporate", urgent: false, message: "Bonjour à tous, besoin de 12 extras pour un cocktail corporate au Grimaldi Forum. Horaires 18h–23h. Profils serveurs et hôtesses. Répondez dès que possible." },
  { id: "B003", title: "Anniversaire Villa Bella Vista — 28 mai", date: "2026-05-14 09:17", sentTo: 12, replied: 7, confirmed: 4, type: "anniversaire", urgent: false, message: "Recherche 4 extras pour anniversaire privé à la Villa Bella Vista. Ambiance décontractée. 20h–01h. Service buffet et boissons." },
];

const EQUIPMENT = [
  { id: 1, name: "Mobilier cocktail (set 10 tables)", category: "Mobilier", dailyRate: 120, weeklyRate: 700, available: 3, total: 5, image: "🪑" },
  { id: 2, name: "Buffet chaud professionnel", category: "Restauration", dailyRate: 85, weeklyRate: 500, available: 1, total: 2, image: "🔥" },
  { id: 3, name: "Kit jeux anniversaire (3-10 ans)", category: "Animation", dailyRate: 45, weeklyRate: 250, available: 4, total: 4, image: "🎮" },
  { id: 4, name: "Pack sono DJ compact", category: "Sonorisation", dailyRate: 95, weeklyRate: 550, available: 2, total: 3, image: "🎵" },
  { id: 5, name: "Package anniversaire Premium", category: "Pack", dailyRate: 350, weeklyRate: 2100, available: 1, total: 2, image: "🎂" },
];

// ── STYLES ──────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Canela:wght@300;400&family=Neue+Haas+Grotesk+Display+Pro:wght@400;500;600&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --noir: #0d0f12;
    --noir-2: #151820;
    --noir-3: #1e2230;
    --blanc: #f8f7f4;
    --gris-1: #2c3044;
    --gris-2: #4a5168;
    --gris-3: #8892a4;
    --gris-4: #c8cdd8;
    --or: #c9a96e;
    --or-light: #e8d5a3;
    --or-dark: #9d7a42;
    --accent: #4f7fe8;
    --green: #3ecf8e;
    --red: #e84f6a;
    --amber: #f0a500;
    --radius: 14px;
    --radius-sm: 8px;
    --shadow: 0 4px 24px rgba(0,0,0,.35);
    --shadow-lg: 0 12px 48px rgba(0,0,0,.5);
    --transition: all .22s cubic-bezier(.4,0,.2,1);
  }

  body { background: var(--noir); color: var(--blanc); font-family: 'DM Sans', sans-serif; font-size: 14px; overflow: hidden; }

  .app { display: flex; height: 100vh; overflow: hidden; }

  /* ── SIDEBAR ── */
  .sidebar {
    width: 240px; min-width: 240px; background: var(--noir-2);
    border-right: 1px solid rgba(255,255,255,.06);
    display: flex; flex-direction: column;
    padding: 0; overflow: hidden;
    transition: var(--transition);
  }

  .sidebar-logo {
    padding: 28px 24px 20px;
    border-bottom: 1px solid rgba(255,255,255,.06);
  }

  .logo-wordmark {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px; font-weight: 300; letter-spacing: .04em;
    color: var(--blanc);
    display: flex; align-items: center; gap: 10px;
  }

  .logo-dot { width: 8px; height: 8px; background: var(--or); border-radius: 50%; display: inline-block; }
  .logo-sub { font-size: 10px; color: var(--gris-3); letter-spacing: .12em; text-transform: uppercase; margin-top: 3px; font-family: 'DM Sans', sans-serif; font-weight: 400; }

  .sidebar-nav { flex: 1; padding: 16px 12px; overflow-y: auto; display: flex; flex-direction: column; gap: 2px; }

  .nav-section-label {
    font-size: 9.5px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase;
    color: var(--gris-2); padding: 14px 12px 6px; margin-top: 8px;
  }

  .nav-item {
    display: flex; align-items: center; gap: 11px; padding: 10px 12px;
    border-radius: var(--radius-sm); cursor: pointer; color: var(--gris-3);
    transition: var(--transition); font-size: 13.5px; font-weight: 400;
    position: relative; user-select: none;
  }

  .nav-item:hover { background: rgba(255,255,255,.05); color: var(--blanc); }

  .nav-item.active {
    background: linear-gradient(135deg, rgba(201,169,110,.15), rgba(201,169,110,.05));
    color: var(--or-light);
    border: 1px solid rgba(201,169,110,.2);
  }

  .nav-item.active::before {
    content: ''; position: absolute; left: -1px; top: 25%; bottom: 25%;
    width: 2px; background: var(--or); border-radius: 0 2px 2px 0;
  }

  .nav-badge {
    margin-left: auto; background: var(--red); color: white;
    font-size: 10px; font-weight: 600; padding: 2px 6px; border-radius: 10px;
    min-width: 18px; text-align: center;
  }

  .sidebar-footer {
    padding: 16px 12px; border-top: 1px solid rgba(255,255,255,.06);
  }

  .user-card {
    display: flex; align-items: center; gap: 10px; padding: 10px 12px;
    border-radius: var(--radius-sm); cursor: pointer;
    transition: var(--transition);
  }
  .user-card:hover { background: rgba(255,255,255,.05); }

  .avatar {
    width: 32px; height: 32px; border-radius: 50%;
    background: linear-gradient(135deg, var(--or-dark), var(--or));
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 600; color: var(--noir); flex-shrink: 0;
  }

  .avatar-lg { width: 48px; height: 48px; border-radius: 50%; font-size: 16px; font-weight: 600; color: var(--noir); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

  .avatar-xl { width: 64px; height: 64px; border-radius: 50%; font-size: 20px; font-weight: 600; color: var(--noir); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

  .user-name { font-size: 13px; font-weight: 500; color: var(--blanc); }
  .user-role { font-size: 11px; color: var(--gris-3); }

  /* ── MAIN ── */
  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

  .topbar {
    height: 60px; border-bottom: 1px solid rgba(255,255,255,.06);
    display: flex; align-items: center; padding: 0 28px; gap: 16px;
    background: var(--noir-2); flex-shrink: 0;
  }

  .topbar-title { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 300; color: var(--blanc); flex: 1; }

  .search-bar {
    display: flex; align-items: center; gap: 8px;
    background: var(--noir-3); border: 1px solid rgba(255,255,255,.08);
    border-radius: 8px; padding: 7px 14px; color: var(--gris-3);
    width: 220px; transition: var(--transition);
  }
  .search-bar:hover { border-color: rgba(255,255,255,.15); }
  .search-bar input { background: none; border: none; outline: none; color: var(--blanc); font-size: 13px; width: 100%; font-family: 'DM Sans', sans-serif; }
  .search-bar input::placeholder { color: var(--gris-3); }

  .btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 8px 16px; border-radius: var(--radius-sm); font-size: 13px; font-weight: 500;
    cursor: pointer; transition: var(--transition); border: none; font-family: 'DM Sans', sans-serif;
    white-space: nowrap;
  }

  .btn-gold {
    background: linear-gradient(135deg, var(--or), var(--or-dark));
    color: var(--noir);
  }
  .btn-gold:hover { opacity: .9; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(201,169,110,.3); }

  .btn-ghost {
    background: rgba(255,255,255,.06); color: var(--gris-4);
    border: 1px solid rgba(255,255,255,.1);
  }
  .btn-ghost:hover { background: rgba(255,255,255,.1); color: var(--blanc); }

  .btn-sm { padding: 6px 12px; font-size: 12px; }
  .btn-icon { padding: 8px; border-radius: var(--radius-sm); }

  .notif-btn {
    position: relative; width: 36px; height: 36px;
    background: var(--noir-3); border: 1px solid rgba(255,255,255,.08);
    border-radius: 8px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--gris-3); transition: var(--transition);
  }
  .notif-btn:hover { color: var(--blanc); border-color: rgba(255,255,255,.15); }
  .notif-btn .badge { position: absolute; top: -4px; right: -4px; width: 16px; height: 16px; background: var(--red); border-radius: 50%; font-size: 9px; font-weight: 700; display: flex; align-items: center; justify-content: center; color: white; border: 2px solid var(--noir-2); }

  /* ── CONTENT ── */
  .content { flex: 1; overflow-y: auto; padding: 28px; background: var(--noir); }

  /* SCROLLBAR */
  .content::-webkit-scrollbar, .sidebar-nav::-webkit-scrollbar { width: 4px; }
  .content::-webkit-scrollbar-track, .sidebar-nav::-webkit-scrollbar-track { background: transparent; }
  .content::-webkit-scrollbar-thumb, .sidebar-nav::-webkit-scrollbar-thumb { background: var(--gris-1); border-radius: 4px; }

  /* ── CARDS ── */
  .card {
    background: var(--noir-2); border: 1px solid rgba(255,255,255,.07);
    border-radius: var(--radius); padding: 20px;
    transition: var(--transition);
  }
  .card:hover { border-color: rgba(255,255,255,.12); }

  .card-gold { border-color: rgba(201,169,110,.2); background: linear-gradient(135deg, rgba(201,169,110,.08), var(--noir-2)); }

  .stat-card {
    background: var(--noir-2); border: 1px solid rgba(255,255,255,.07);
    border-radius: var(--radius); padding: 20px 22px;
    display: flex; align-items: center; gap: 16px;
  }

  .stat-icon {
    width: 44px; height: 44px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }

  .stat-value { font-size: 26px; font-weight: 600; color: var(--blanc); font-family: 'Cormorant Garamond', serif; letter-spacing: .02em; }
  .stat-label { font-size: 12px; color: var(--gris-3); margin-top: 2px; }
  .stat-trend { font-size: 11px; font-weight: 500; margin-top: 4px; }
  .trend-up { color: var(--green); }
  .trend-down { color: var(--red); }

  /* ── GRID ── */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
  .grid-4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; }
  .grid-auto { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }

  /* ── SECTION HEADER ── */
  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .section-title { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 300; color: var(--blanc); }
  .section-sub { font-size: 12px; color: var(--gris-3); margin-top: 2px; }

  /* ── TABLE ── */
  .table { width: 100%; border-collapse: collapse; }
  .table th { text-align: left; padding: 10px 14px; font-size: 11px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: var(--gris-3); border-bottom: 1px solid rgba(255,255,255,.07); }
  .table td { padding: 13px 14px; font-size: 13px; color: var(--gris-4); border-bottom: 1px solid rgba(255,255,255,.04); }
  .table tr:last-child td { border-bottom: none; }
  .table tr:hover td { background: rgba(255,255,255,.02); color: var(--blanc); }

  /* ── BADGES / TAGS ── */
  .badge { display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 500; }
  .badge-green { background: rgba(62,207,142,.12); color: var(--green); border: 1px solid rgba(62,207,142,.2); }
  .badge-red { background: rgba(232,79,106,.12); color: var(--red); border: 1px solid rgba(232,79,106,.2); }
  .badge-amber { background: rgba(240,165,0,.12); color: var(--amber); border: 1px solid rgba(240,165,0,.2); }
  .badge-blue { background: rgba(79,127,232,.12); color: var(--accent); border: 1px solid rgba(79,127,232,.2); }
  .badge-gold { background: rgba(201,169,110,.12); color: var(--or); border: 1px solid rgba(201,169,110,.2); }
  .badge-gray { background: rgba(255,255,255,.06); color: var(--gris-3); border: 1px solid rgba(255,255,255,.08); }

  /* ── PROFILE CARD (baby-sitter) ── */
  .bs-card {
    background: var(--noir-2); border: 1px solid rgba(255,255,255,.07);
    border-radius: var(--radius); padding: 22px; cursor: pointer;
    transition: var(--transition);
  }
  .bs-card:hover { border-color: rgba(201,169,110,.25); transform: translateY(-2px); box-shadow: var(--shadow); }
  .bs-card.unavailable { opacity: .6; }

  .bs-header { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 14px; }
  .bs-name { font-size: 15px; font-weight: 500; color: var(--blanc); }
  .bs-meta { font-size: 12px; color: var(--gris-3); margin-top: 3px; }
  .bs-rate { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 300; color: var(--or); margin-top: 4px; }

  .stars { display: flex; align-items: center; gap: 3px; color: var(--or); font-size: 12px; margin-top: 5px; }
  .stars span { color: var(--gris-3); margin-left: 4px; font-size: 11px; }

  .tags { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 12px; }
  .tag { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08); color: var(--gris-4); font-size: 11px; padding: 3px 9px; border-radius: 20px; }

  .bs-actions { display: flex; gap: 8px; margin-top: 16px; }

  /* ── STATUS DOT ── */
  .status-dot { width: 7px; height: 7px; border-radius: 50%; display: inline-block; flex-shrink: 0; }
  .dot-green { background: var(--green); box-shadow: 0 0 6px var(--green); }
  .dot-red { background: var(--red); }
  .dot-amber { background: var(--amber); }
  .dot-blue { background: var(--accent); }
  .dot-gray { background: var(--gris-2); }

  /* ── MAINTENANCE ── */
  .request-card {
    background: var(--noir-2); border: 1px solid rgba(255,255,255,.07);
    border-radius: var(--radius); padding: 18px 20px;
    transition: var(--transition); cursor: pointer;
    display: grid; grid-template-columns: auto 1fr auto; gap: 16px; align-items: center;
  }
  .request-card:hover { border-color: rgba(255,255,255,.14); }

  .req-id { font-size: 11px; color: var(--gris-3); font-weight: 600; letter-spacing: .06em; font-family: 'DM Mono', monospace; }
  .req-title { font-size: 14px; color: var(--blanc); font-weight: 500; }
  .req-client { font-size: 12px; color: var(--gris-3); }
  .req-meta { display: flex; align-items: center; gap: 10px; margin-top: 5px; }

  /* ── EVENTS ── */
  .event-card {
    background: var(--noir-2); border: 1px solid rgba(255,255,255,.07);
    border-radius: var(--radius); overflow: hidden;
    transition: var(--transition); cursor: pointer;
  }
  .event-card:hover { border-color: rgba(201,169,110,.2); transform: translateY(-2px); }
  .event-top { padding: 20px; }
  .event-bottom { padding: 14px 20px; background: rgba(0,0,0,.2); border-top: 1px solid rgba(255,255,255,.05); display: flex; align-items: center; justify-content: space-between; }
  .event-name { font-size: 15px; font-weight: 500; color: var(--blanc); margin-bottom: 4px; }
  .event-client { font-size: 12px; color: var(--or); }
  .event-date { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 300; color: var(--blanc); }
  .event-month { font-size: 11px; color: var(--gris-3); text-transform: uppercase; letter-spacing: .1em; }

  /* ── PROGRESS ── */
  .progress-bar { height: 4px; background: rgba(255,255,255,.08); border-radius: 4px; overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 4px; transition: width .5s ease; }

  /* ── TABS ── */
  .tabs { display: flex; gap: 2px; background: var(--noir-3); padding: 4px; border-radius: 10px; width: fit-content; margin-bottom: 24px; }
  .tab { padding: 7px 16px; border-radius: 7px; font-size: 13px; cursor: pointer; color: var(--gris-3); transition: var(--transition); }
  .tab.active { background: var(--noir-2); color: var(--blanc); box-shadow: 0 2px 8px rgba(0,0,0,.3); }

  /* ── EMPTY ── */
  .empty { text-align: center; padding: 60px 20px; color: var(--gris-3); }
  .empty-icon { font-size: 40px; margin-bottom: 12px; opacity: .5; }
  .empty-text { font-size: 13px; }

  /* ── DIVIDER ── */
  .divider { height: 1px; background: rgba(255,255,255,.06); margin: 24px 0; }

  /* ── EQUIPMENT CARD ── */
  .equip-card {
    background: var(--noir-2); border: 1px solid rgba(255,255,255,.07);
    border-radius: var(--radius); padding: 20px;
    transition: var(--transition); display: flex; flex-direction: column; gap: 14px;
  }
  .equip-emoji { font-size: 32px; }
  .equip-name { font-size: 14px; font-weight: 500; color: var(--blanc); }
  .equip-cat { font-size: 11px; color: var(--gris-3); margin-top: 2px; }
  .equip-price { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 300; color: var(--or); }

  /* ── ANIMATIONS ── */
  @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
  .fade-in { animation: fadeIn .3s ease forwards; }

  /* ── MODAL OVERLAY (simple) ── */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.65); z-index: 100; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px); }
  .modal { background: var(--noir-2); border: 1px solid rgba(255,255,255,.1); border-radius: 18px; padding: 32px; width: 480px; max-width: 95vw; }
  .modal-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 300; margin-bottom: 20px; }
  .input-row { margin-bottom: 14px; }
  .input-label { font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: var(--gris-3); margin-bottom: 6px; display: block; }
  .input { width: 100%; background: var(--noir-3); border: 1px solid rgba(255,255,255,.1); border-radius: 8px; padding: 10px 14px; color: var(--blanc); font-size: 13px; outline: none; font-family: 'DM Sans', sans-serif; transition: var(--transition); }
  .input:focus { border-color: var(--or); }
  .input-row-inline { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }


  /* ── DIFFUSION ── */
  .diffusion-layout { display: grid; grid-template-columns: 380px 1fr; gap: 20px; height: calc(100vh - 180px); }
  .diffusion-sidebar { display: flex; flex-direction: column; gap: 0; background: var(--noir-2); border: 1px solid rgba(255,255,255,.07); border-radius: var(--radius); overflow: hidden; }
  .diffusion-sidebar-header { padding: 16px 18px; border-bottom: 1px solid rgba(255,255,255,.07); display: flex; align-items: center; justify-content: space-between; }
  .broadcast-item { padding: 14px 18px; border-bottom: 1px solid rgba(255,255,255,.05); cursor: pointer; transition: var(--transition); }
  .broadcast-item:hover { background: rgba(255,255,255,.04); }
  .broadcast-item.active { background: rgba(201,169,110,.06); border-left: 2px solid var(--or); }
  .broadcast-item-title { font-size: 13px; font-weight: 500; color: var(--blanc); margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .broadcast-item-meta { font-size: 11px; color: var(--gris-3); }
  .diffusion-main { display: flex; flex-direction: column; gap: 16px; overflow-y: auto; }
  .compose-box { background: var(--noir-2); border: 1px solid rgba(255,255,255,.07); border-radius: var(--radius); padding: 22px; }
  .compose-title { font-family: "Cormorant Garamond", serif; font-size: 18px; font-weight: 300; color: var(--blanc); margin-bottom: 16px; display: flex; align-items: center; gap: 10px; }
  .recipient-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 8px; margin-top: 10px; }
  .recipient-chip { display: flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,.08); background: var(--noir-3); cursor: pointer; transition: var(--transition); user-select: none; }
  .recipient-chip.selected { border-color: rgba(201,169,110,.4); background: rgba(201,169,110,.08); }
  .recipient-chip.selected .chip-name { color: var(--or-light); }
  .chip-name { font-size: 12px; font-weight: 500; color: var(--gris-4); }
  .chip-role { font-size: 10px; color: var(--gris-3); }
  .stat-ring { display: flex; gap: 20px; }
  .ring-stat { text-align: center; }
  .ring-val { font-family: "Cormorant Garamond", serif; font-size: 24px; font-weight: 300; }
  .ring-lbl { font-size: 10px; color: var(--gris-3); text-transform: uppercase; letter-spacing: .08em; }
  .response-row { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 8px; background: var(--noir-3); margin-bottom: 6px; }
  .response-name { font-size: 13px; font-weight: 500; color: var(--blanc); flex: 1; }
  .response-time { font-size: 11px; color: var(--gris-3); }
  .textarea-compose { min-height: 120px; resize: none; }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .sidebar { width: 60px; min-width: 60px; }
    .logo-wordmark span:not(.logo-dot) { display: none; }
    .logo-sub, .nav-section-label, .nav-item span, .user-name, .user-role { display: none; }
    .nav-item { justify-content: center; padding: 12px; }
    .grid-4 { grid-template-columns: 1fr 1fr; }
    .grid-3 { grid-template-columns: 1fr 1fr; }
    .grid-2 { grid-template-columns: 1fr; }
    .content { padding: 16px; }
  }
`;

// ── HELPERS ──────────────────────────────────────────────────────────────────
const avatarColors = ["#4f7fe8","#3ecf8e","#e84f6a","#f0a500","#c9a96e","#9b59b6"];
const getColor = (str) => avatarColors[str.charCodeAt(0) % avatarColors.length];

const StatusBadge = ({ status }) => {
  const map = {
    pending: ["badge-amber", "En attente"],
    in_progress: ["badge-blue", "En cours"],
    scheduled: ["badge-blue", "Planifiée"],
    completed: ["badge-green", "Terminée"],
    confirmed: ["badge-green", "Confirmé"],
    planning: ["badge-amber", "Planification"],
    paid: ["badge-green", "Payée"],
    overdue: ["badge-red", "En retard"],
    urgent: ["badge-red", "Urgent"],
    normal: ["badge-blue", "Normal"],
    low: ["badge-gray", "Faible"],
  };
  const [cls, label] = map[status] || ["badge-gray", status];
  return <span className={`badge ${cls}`}>{label}</span>;
};

const PriorityDot = ({ priority }) => {
  const map = { urgent: "dot-red", normal: "dot-blue", low: "dot-gray" };
  return <span className={`status-dot ${map[priority] || "dot-gray"}`}></span>;
};

// ── DASHBOARD ───────────────────────────────────────────────────────────────
function Dashboard() {
  const stats = [
    { label: "Demandes actives", value: "24", trend: "+3 aujourd'hui", up: true, icon: icons.trend, color: "#4f7fe8", bg: "rgba(79,127,232,.12)" },
    { label: "Revenus ce mois", value: "€18 240", trend: "+12% vs mai", up: true, icon: icons.euro, color: "#c9a96e", bg: "rgba(201,169,110,.12)" },
    { label: "Événements à venir", value: "7", trend: "2 cette semaine", up: true, icon: icons.calendar, color: "#3ecf8e", bg: "rgba(62,207,142,.12)" },
    { label: "Baby-sitters dispo", value: "9", trend: "3 indisponibles", up: false, icon: icons.users, color: "#e84f6a", bg: "rgba(232,79,106,.12)" },
  ];

  const notifications = [
    { text: "Nouvelle demande urgente — Hôtel Métropole", time: "Il y a 12 min", type: "urgent" },
    { text: "Facture F2026-044 en retard de paiement", time: "Il y a 1h", type: "warning" },
    { text: "Sophie M. a confirmé sa disponibilité pour samedi", time: "Il y a 2h", type: "info" },
    { text: "Événement Gala confirmé — 25 mai", time: "Il y a 3h", type: "success" },
  ];

  const notifColors = { urgent: "#e84f6a", warning: "#f0a500", info: "#4f7fe8", success: "#3ecf8e" };

  const upcoming = EVENTS.filter(e => e.status !== "completed").slice(0, 4);

  return (
    <div className="fade-in">
      <div className="grid-4" style={{ marginBottom: 24 }}>
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{ background: s.bg }}>
              <Icon d={s.icon} size={20} stroke={s.color} />
            </div>
            <div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
              <div className={`stat-trend ${s.up ? "trend-up" : "trend-down"}`}>{s.trend}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Prochains événements */}
        <div className="card">
          <div className="section-header">
            <div>
              <div className="section-title">Prochains événements</div>
              <div className="section-sub">{upcoming.length} événements planifiés</div>
            </div>
            <button className="btn btn-ghost btn-sm"><Icon d={icons.plus} size={14} /> Ajouter</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {upcoming.map(e => (
              <div key={e.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
                <div style={{ textAlign: "center", minWidth: 44 }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 300, color: "var(--blanc)", lineHeight: 1 }}>
                    {new Date(e.date).getDate()}
                  </div>
                  <div style={{ fontSize: 10, color: "var(--gris-3)", textTransform: "uppercase", letterSpacing: ".08em" }}>
                    {new Date(e.date).toLocaleDateString("fr", { month: "short" })}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "var(--blanc)" }}>{e.name}</div>
                  <div style={{ fontSize: 11, color: "var(--gris-3)", marginTop: 2 }}>{e.guests} invités · {e.staff} extras</div>
                </div>
                <StatusBadge status={e.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="card">
          <div className="section-header">
            <div>
              <div className="section-title">Notifications</div>
              <div className="section-sub">4 nouvelles aujourd'hui</div>
            </div>
            <span className="badge badge-red">4</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {notifications.map((n, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                <div style={{ width: 3, borderRadius: 3, background: notifColors[n.type], flexShrink: 0, alignSelf: "stretch" }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: "var(--blanc)", lineHeight: 1.4 }}>{n.text}</div>
                  <div style={{ fontSize: 11, color: "var(--gris-3)", marginTop: 4 }}>{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interventions urgentes */}
      <div className="card">
        <div className="section-header">
          <div>
            <div className="section-title">Interventions urgentes</div>
            <div className="section-sub">Demandes prioritaires en attente</div>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Référence</th><th>Client</th><th>Type</th><th>Priorité</th><th>Statut</th><th>Équipe</th>
            </tr>
          </thead>
          <tbody>
            {MAINTENANCE_REQUESTS.filter(r => r.priority === "urgent").map(r => (
              <tr key={r.id}>
                <td><span style={{ fontFamily: "monospace", color: "var(--gris-3)" }}>{r.id}</span></td>
                <td style={{ color: "var(--blanc)", fontWeight: 500 }}>{r.client}</td>
                <td>{r.type}</td>
                <td><StatusBadge status={r.priority} /></td>
                <td><StatusBadge status={r.status} /></td>
                <td>{r.team || <span style={{ color: "var(--red)" }}>Non assignée</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── BABY-SITTING ─────────────────────────────────────────────────────────────
function Babysitting() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const filtered = filter === "available" ? BABYSITTERS.filter(b => b.available) : BABYSITTERS;

  return (
    <div className="fade-in">
      <div className="section-header">
        <div>
          <div className="section-title">Espace Baby-sitting</div>
          <div className="section-sub">{BABYSITTERS.filter(b => b.available).length} baby-sitters disponibles sur {BABYSITTERS.length}</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div className="tabs" style={{ marginBottom: 0 }}>
            <div className={`tab ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>Toutes</div>
            <div className={`tab ${filter === "available" ? "active" : ""}`} onClick={() => setFilter("available")}>Disponibles</div>
          </div>
          <button className="btn btn-gold"><Icon d={icons.plus} size={14} /> Nouveau profil</button>
        </div>
      </div>

      <div className="grid-auto">
        {filtered.map(bs => (
          <div key={bs.id} className={`bs-card ${!bs.available ? "unavailable" : ""}`} onClick={() => setSelected(bs)}>
            <div className="bs-header">
              <div className="avatar-xl" style={{ background: `linear-gradient(135deg, ${getColor(bs.name)}, ${getColor(bs.name)}88)` }}>
                {bs.photo}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div className="bs-name">{bs.name}</div>
                  {bs.certified && <span className="badge badge-gold" style={{ fontSize: 10, padding: "2px 7px" }}>✓ Certifiée</span>}
                </div>
                <div className="bs-meta">{bs.age} ans · {bs.experience}</div>
                <div className="stars">
                  {"★★★★★".split("").map((s, i) => (
                    <span key={i} style={{ color: i < Math.floor(bs.rating) ? "var(--or)" : "var(--gris-2)" }}>★</span>
                  ))}
                  <span>({bs.reviews} avis)</span>
                </div>
                <div className="bs-rate">{bs.hourlyRate}€<span style={{ fontSize: 14, color: "var(--gris-3)" }}>/h</span></div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span className={`status-dot ${bs.available ? "dot-green" : "dot-gray"}`}></span>
              <span style={{ fontSize: 12, color: bs.available ? "var(--green)" : "var(--gris-3)" }}>
                {bs.available ? "Disponible" : "Indisponible"}
              </span>
              <span style={{ fontSize: 11, color: "var(--gris-2)", marginLeft: "auto" }}>
                {bs.languages.join(" · ")}
              </span>
            </div>

            <div className="tags">
              {bs.zones.map(z => <span key={z} className="tag">{z}</span>)}
              {bs.specialties.map(s => <span key={s} className="tag" style={{ borderColor: "rgba(201,169,110,.2)", color: "var(--or-light)" }}>{s}</span>)}
            </div>

            <div className="bs-actions">
              <button className="btn btn-gold btn-sm" style={{ flex: 1 }} onClick={e => { e.stopPropagation(); }}>
                <Icon d={icons.mail} size={12} /> Envoyer profil
              </button>
              <button className="btn btn-ghost btn-sm">
                <Icon d={icons.phone} size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL PROFIL */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ width: 540 }}>
            <div style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 24 }}>
              <div className="avatar-xl" style={{ width: 72, height: 72, fontSize: 22, background: `linear-gradient(135deg, ${getColor(selected.name)}, ${getColor(selected.name)}88)` }}>
                {selected.photo}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 20, fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "var(--blanc)" }}>{selected.name}</div>
                <div style={{ fontSize: 12, color: "var(--gris-3)", marginTop: 3 }}>{selected.age} ans · {selected.experience} d'expérience</div>
                <div className="stars" style={{ marginTop: 6 }}>
                  {"★★★★★".split("").map((s, i) => <span key={i} style={{ color: i < Math.floor(selected.rating) ? "var(--or)" : "var(--gris-2)" }}>★</span>)}
                  <span style={{ color: "var(--gris-3)" }}>{selected.rating} · {selected.reviews} avis</span>
                </div>
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 300, color: "var(--or)" }}>{selected.hourlyRate}€/h</div>
            </div>
            <div className="divider" style={{ margin: "16px 0" }}></div>
            <div className="grid-2" style={{ marginBottom: 16 }}>
              <div><div className="input-label">Zones</div><div className="tags">{selected.zones.map(z => <span key={z} className="tag">{z}</span>)}</div></div>
              <div><div className="input-label">Langues</div><div className="tags">{selected.languages.map(l => <span key={l} className="tag">{l}</span>)}</div></div>
            </div>
            <div style={{ marginBottom: 20 }}><div className="input-label">Spécialités</div><div className="tags">{selected.specialties.map(s => <span key={s} className="tag" style={{ borderColor: "rgba(201,169,110,.2)", color: "var(--or-light)" }}>{s}</span>)}</div></div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-gold" style={{ flex: 1 }}><Icon d={icons.mail} size={14} /> Envoyer au client</button>
              <button className="btn btn-ghost"><Icon d={icons.calendar} size={14} /> Réservation</button>
              <button className="btn btn-ghost" onClick={() => setSelected(null)}>Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── MAINTENANCE ──────────────────────────────────────────────────────────────
function Maintenance() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="fade-in">
      <div className="section-header">
        <div>
          <div className="section-title">Espace Maintenance</div>
          <div className="section-sub">{MAINTENANCE_REQUESTS.filter(r => r.status !== "completed").length} interventions actives</div>
        </div>
        <button className="btn btn-gold" onClick={() => setShowModal(true)}><Icon d={icons.plus} size={14} /> Nouvelle demande</button>
      </div>

      <div className="grid-4" style={{ marginBottom: 24 }}>
        {[
          { label: "En attente", count: MAINTENANCE_REQUESTS.filter(r => r.status === "pending").length, color: "var(--amber)", bg: "rgba(240,165,0,.1)" },
          { label: "En cours", count: MAINTENANCE_REQUESTS.filter(r => r.status === "in_progress").length, color: "var(--accent)", bg: "rgba(79,127,232,.1)" },
          { label: "Planifiées", count: MAINTENANCE_REQUESTS.filter(r => r.status === "scheduled").length, color: "var(--or)", bg: "rgba(201,169,110,.1)" },
          { label: "Terminées", count: MAINTENANCE_REQUESTS.filter(r => r.status === "completed").length, color: "var(--green)", bg: "rgba(62,207,142,.1)" },
        ].map((s, i) => (
          <div key={i} className="stat-card" style={{ borderColor: `${s.color}22` }}>
            <div style={{ width: 10, height: 40, background: s.bg, borderRadius: 4, borderLeft: `3px solid ${s.color}` }}></div>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 300, color: s.color }}>{s.count}</div>
              <div style={{ fontSize: 12, color: "var(--gris-3)" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {MAINTENANCE_REQUESTS.map(r => (
          <div key={r.id} className="request-card">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <PriorityDot priority={r.priority} />
              <div>
                <div className="req-id">{r.id}</div>
                <div style={{ fontSize: 11, color: "var(--gris-3)", marginTop: 2 }}>{r.date} à {r.time}</div>
              </div>
            </div>
            <div>
              <div className="req-title">{r.desc}</div>
              <div className="req-meta">
                <span style={{ fontSize: 12, color: "var(--gris-3)" }}>{r.client}</span>
                <span className="tag">{r.type}</span>
                {r.team && <span style={{ fontSize: 12, color: "var(--or)" }}>→ {r.team}</span>}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
              <StatusBadge status={r.status} />
              <StatusBadge status={r.priority} />
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Nouvelle demande d'intervention</div>
            <div className="input-row"><label className="input-label">Client</label><input className="input" placeholder="Nom du client ou établissement" /></div>
            <div className="input-row-inline">
              <div className="input-row"><label className="input-label">Type</label><input className="input" placeholder="Plomberie, électricité…" /></div>
              <div className="input-row"><label className="input-label">Priorité</label><select className="input"><option>Normal</option><option>Urgent</option><option>Faible</option></select></div>
            </div>
            <div className="input-row"><label className="input-label">Description</label><textarea className="input" rows={3} placeholder="Détails de l'intervention…" style={{ resize: "none" }}></textarea></div>
            <div className="input-row-inline">
              <div className="input-row"><label className="input-label">Date</label><input className="input" type="date" /></div>
              <div className="input-row"><label className="input-label">Heure</label><input className="input" type="time" /></div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <button className="btn btn-gold" style={{ flex: 1 }}>Créer la demande</button>
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── EVENTS ────────────────────────────────────────────────────────────────────
function Events() {
  return (
    <div className="fade-in">
      <div className="section-header">
        <div>
          <div className="section-title">Extras & Événements</div>
          <div className="section-sub">{EVENTS.length} événements · {EVENTS.filter(e => e.status === "confirmed").length} confirmés</div>
        </div>
        <button className="btn btn-gold"><Icon d={icons.plus} size={14} /> Créer un événement</button>
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        {EVENTS.map(e => (
          <div key={e.id} className="event-card">
            <div className="event-top">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div>
                  <div className="event-name">{e.name}</div>
                  <div className="event-client">{e.client}</div>
                </div>
                <StatusBadge status={e.status} />
              </div>
              <div style={{ display: "flex", gap: 24 }}>
                <div>
                  <div className="event-month">{new Date(e.date).toLocaleDateString("fr", { month: "long", year: "numeric" })}</div>
                  <div className="event-date">{new Date(e.date).getDate()}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, justifyContent: "center" }}>
                  <span className="tag">{e.type}</span>
                  <span style={{ fontSize: 12, color: "var(--gris-3)" }}>{e.guests} invités</span>
                </div>
              </div>
            </div>
            <div className="event-bottom">
              <div style={{ display: "flex", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 11, color: "var(--gris-3)" }}>Extras</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "var(--blanc)" }}>{e.staff}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "var(--gris-3)" }}>Budget</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "var(--or)", fontFamily: "'Cormorant Garamond', serif" }}>€{e.budget.toLocaleString()}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn btn-ghost btn-sm">Modifier</button>
                <button className="btn btn-gold btn-sm">Gérer</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prestations */}
      <div className="card">
        <div className="section-header"><div className="section-title">Prestations proposées</div></div>
        <div className="grid-3">
          {[
            { name: "Service cocktail", desc: "Serveurs, barman, maître d'hôtel", price: "À partir de 25€/h", icon: "🥂" },
            { name: "Animation & Jeux", desc: "Animateurs, jeux événementiels", price: "À partir de 200€/event", icon: "🎭" },
            { name: "Baby-corner event", desc: "Baby-sitting pendant vos events", price: "À partir de 20€/h", icon: "👶" },
            { name: "Logistique complète", desc: "Montage, démontage, installation", price: "Sur devis", icon: "📦" },
            { name: "Traiteur & Extras", desc: "Service traiteur, aide cuisine", price: "À partir de 18€/h", icon: "🍽️" },
            { name: "Photo & Vidéo", desc: "Photographe, vidéaste événementiel", price: "À partir de 350€/h", icon: "📸" },
          ].map((p, i) => (
            <div key={i} className="card" style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ fontSize: 28 }}>{p.icon}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--blanc)", marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: "var(--gris-3)", marginBottom: 8 }}>{p.desc}</div>
                <div style={{ fontSize: 12, color: "var(--or)", fontWeight: 500 }}>{p.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── FACTURATION ───────────────────────────────────────────────────────────────
function Facturation() {
  const total = INVOICES.reduce((s, f) => s + f.amount, 0);
  const paid = INVOICES.filter(f => f.status === "paid").reduce((s, f) => s + f.amount, 0);
  const pending = INVOICES.filter(f => f.status === "pending").reduce((s, f) => s + f.amount, 0);
  const overdue = INVOICES.filter(f => f.status === "overdue").reduce((s, f) => s + f.amount, 0);

  return (
    <div className="fade-in">
      <div className="section-header">
        <div>
          <div className="section-title">Gestion & Facturation</div>
          <div className="section-sub">Suivi des paiements et répartition associés</div>
        </div>
        <button className="btn btn-gold"><Icon d={icons.plus} size={14} /> Nouvelle facture</button>
      </div>

      <div className="grid-3" style={{ marginBottom: 24 }}>
        <div className="stat-card card-gold">
          <div className="stat-icon" style={{ background: "rgba(201,169,110,.15)" }}><Icon d={icons.euro} size={20} stroke="var(--or)" /></div>
          <div>
            <div className="stat-value" style={{ color: "var(--or)" }}>€{paid.toLocaleString()}</div>
            <div className="stat-label">Encaissé</div>
            <div className="stat-trend trend-up">↗ Ce mois</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "rgba(240,165,0,.1)" }}><Icon d={icons.clock} size={20} stroke="var(--amber)" /></div>
          <div>
            <div className="stat-value" style={{ color: "var(--amber)" }}>€{pending.toLocaleString()}</div>
            <div className="stat-label">En attente</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "rgba(232,79,106,.1)" }}><Icon d={icons.bell} size={20} stroke="var(--red)" /></div>
          <div>
            <div className="stat-value" style={{ color: "var(--red)" }}>€{overdue.toLocaleString()}</div>
            <div className="stat-label">En retard</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="section-header"><div className="section-title">Historique des factures</div></div>
        <table className="table">
          <thead>
            <tr>
              <th>N° Facture</th><th>Client</th><th>Prestation</th><th>Montant</th><th>Associé</th><th>Commission</th><th>Statut</th><th>Date</th>
            </tr>
          </thead>
          <tbody>
            {INVOICES.map(f => (
              <tr key={f.id}>
                <td><span style={{ fontFamily: "monospace", color: "var(--or)", fontSize: 12 }}>{f.id}</span></td>
                <td style={{ color: "var(--blanc)", fontWeight: 500 }}>{f.client}</td>
                <td>{f.service}</td>
                <td style={{ color: "var(--blanc)", fontWeight: 600, fontFamily: "'Cormorant Garamond', serif", fontSize: 16 }}>€{f.amount}</td>
                <td style={{ color: "var(--gris-3)" }}>{f.associate}</td>
                <td><span style={{ color: "var(--green)", fontWeight: 500 }}>€{f.commission}</span></td>
                <td><StatusBadge status={f.status} /></td>
                <td style={{ color: "var(--gris-3)" }}>{f.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Répartition associés */}
      <div className="card" style={{ marginTop: 16 }}>
        <div className="section-header"><div className="section-title">Répartition des commissions</div></div>
        <div className="grid-3">
          {[
            { name: "Associé A", invoices: 12, total: 4200, commission: 420, pct: 70 },
            { name: "Associé B", invoices: 8, total: 2800, commission: 280, pct: 47 },
            { name: "Associé C", invoices: 15, total: 6100, commission: 610, pct: 100 },
          ].map((a, i) => (
            <div key={i} className="card" style={{ padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--blanc)" }}>{a.name}</div>
                <span className="badge badge-gold">{a.invoices} factures</span>
              </div>
              <div style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: "var(--gris-3)" }}>CA généré</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "var(--blanc)", fontWeight: 300 }}>€{a.total.toLocaleString()}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${a.pct}%`, background: "linear-gradient(90deg, var(--or-dark), var(--or))" }}></div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: "var(--gris-3)" }}>Commission</span>
                <span style={{ fontSize: 13, color: "var(--green)", fontWeight: 500 }}>€{a.commission}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── CLIENTS ───────────────────────────────────────────────────────────────────
function Clients() {
  const [tab, setTab] = useState("all");

  const filtered = tab === "all" ? CLIENTS : CLIENTS.filter(c => c.type === tab);
  const tabLabels = { all: "Tous", tourist: "Touristes", resident: "Résidents", partner: "Partenaires" };

  return (
    <div className="fade-in">
      <div className="section-header">
        <div>
          <div className="section-title">Clients & Partenaires</div>
          <div className="section-sub">{CLIENTS.length} contacts · {CLIENTS.filter(c => c.type === "partner").length} partenaires professionnels</div>
        </div>
        <button className="btn btn-gold"><Icon d={icons.plus} size={14} /> Ajouter un contact</button>
      </div>

      <div className="tabs">
        {Object.entries(tabLabels).map(([key, label]) => (
          <div key={key} className={`tab ${tab === key ? "active" : ""}`} onClick={() => setTab(key)}>
            {label} <span style={{ fontSize: 11, color: "var(--gris-3)", marginLeft: 4 }}>({key === "all" ? CLIENTS.length : CLIENTS.filter(c => c.type === key).length})</span>
          </div>
        ))}
      </div>

      <div className="grid-auto">
        {filtered.map(c => (
          <div key={c.id} className="bs-card">
            <div style={{ display: "flex", gap: 14, marginBottom: 14 }}>
              <div className="avatar-xl" style={{ background: `linear-gradient(135deg, ${getColor(c.name)}, ${getColor(c.name)}88)` }}>
                {c.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 500, color: "var(--blanc)" }}>{c.name}</div>
                <div style={{ fontSize: 12, color: "var(--gris-3)", marginTop: 2 }}>{c.category} · {c.contact}</div>
                <div style={{ marginTop: 6, display: "flex", gap: 6 }}>
                  {c.type === "partner" && <span className="badge badge-gold">Partenaire</span>}
                  {c.type === "tourist" && <span className="badge badge-blue">Touriste</span>}
                  {c.type === "resident" && <span className="badge badge-green">Résident</span>}
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "var(--or)", alignSelf: "center" }}>€{c.spent.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="divider" style={{ margin: "12px 0" }}></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 12 }}>
              <div style={{ display: "flex", gap: 8, fontSize: 12, color: "var(--gris-3)" }}>
                <Icon d={icons.mail} size={13} /> {c.email}
              </div>
              <div style={{ display: "flex", gap: 8, fontSize: 12, color: "var(--gris-3)" }}>
                <Icon d={icons.phone} size={13} /> {c.phone}
              </div>
            </div>
            <div className="tags">
              {c.services.map(s => <span key={s} className="tag">{s}</span>)}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}><Icon d={icons.clock} size={12} /> Historique</button>
              <button className="btn btn-gold btn-sm"><Icon d={icons.mail} size={12} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── TARIFS & LOCATION ─────────────────────────────────────────────────────────
function Tarifs() {
  return (
    <div className="fade-in">
      <div className="section-header">
        <div>
          <div className="section-title">Tarifs & Location de matériel</div>
          <div className="section-sub">Grilles tarifaires et équipements disponibles</div>
        </div>
        <button className="btn btn-gold"><Icon d={icons.plus} size={14} /> Ajouter du matériel</button>
      </div>

      {/* Tarifs baby-sitting */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="section-header"><div className="section-title">Tarifs Baby-sitting</div></div>
        <div className="grid-3">
          {[
            { label: "Tarif de base", price: "13€", unit: "/ heure", desc: "Baby-sitter standard, journée", color: "var(--gris-4)" },
            { label: "Tarif premium", price: "17€", unit: "/ heure", desc: "Certifiée, langues, spécialités", color: "var(--or)" },
            { label: "Nuit (22h–7h)", price: "+5€", unit: "/ heure", desc: "Supplément nuit automatique", color: "var(--accent)" },
            { label: "Week-end & jours fériés", price: "+20%", unit: "", desc: "Supplément appliqué", color: "var(--amber)" },
            { label: "Package journée", price: "120€", unit: "/ 10h", desc: "Tarif dégressif journée complète", color: "var(--green)" },
            { label: "Abonnement mensuel", price: "Sur devis", unit: "", desc: "Pour clients réguliers", color: "var(--or)" },
          ].map((t, i) => (
            <div key={i} className="card" style={{ padding: 16, borderColor: `${t.color}22` }}>
              <div style={{ fontSize: 11, color: "var(--gris-3)", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".08em" }}>{t.label}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 300, color: t.color }}>
                {t.price}<span style={{ fontSize: 14, color: "var(--gris-3)" }}>{t.unit}</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--gris-3)", marginTop: 6 }}>{t.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Location matériel */}
      <div className="section-header">
        <div className="section-title">Location de matériel</div>
      </div>
      <div className="grid-auto">
        {EQUIPMENT.map(eq => (
          <div key={eq.id} className="equip-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div className="equip-emoji">{eq.emoji}</div>
              <span className={`badge ${eq.available > 0 ? "badge-green" : "badge-red"}`}>
                {eq.available > 0 ? `${eq.available} dispo` : "Indisponible"}
              </span>
            </div>
            <div>
              <div className="equip-name">{eq.name}</div>
              <div className="equip-cat">{eq.category}</div>
            </div>
            <div className="divider" style={{ margin: "8px 0" }}></div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 11, color: "var(--gris-3)" }}>Journée</div>
                <div className="equip-price">{eq.dailyRate}€</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "var(--gris-3)" }}>Semaine</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "var(--gris-4)" }}>{eq.weeklyRate}€</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button className="btn btn-gold btn-sm" style={{ flex: 1 }}>Réserver</button>
              <button className="btn btn-ghost btn-sm">Devis</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ACCÈS & ÉQUIPES ────────────────────────────────────────────────────────────
function Acces() {
  const roles = [
    { name: "Administrateur principal", color: "var(--or)", icon: icons.shield, perms: ["Accès total", "Gestion des utilisateurs", "Facturation", "Rapports", "Paramètres"], users: 1 },
    { name: "Associé", color: "var(--accent)", icon: icons.star, perms: ["Tableau de bord", "Baby-sitting", "Événements", "Facturation partielle", "Clients"], users: 3 },
    { name: "Salarié / Collègue", color: "var(--green)", icon: icons.users, perms: ["Missions assignées", "Planning", "Disponibilités"], users: 8 },
    { name: "Baby-sitter", color: "var(--amber)", icon: icons.baby, perms: ["Profil personnel", "Disponibilités", "Missions"], users: 12 },
  ];

  const team = [
    { name: "Alexandre Moreau", role: "Administrateur", avatar: "AM", status: "online" },
    { name: "Camille Dupont", role: "Associée", avatar: "CD", status: "online" },
    { name: "Thomas Girard", role: "Associé", avatar: "TG", status: "away" },
    { name: "Nathalie Bertin", role: "Coordinatrice", avatar: "NB", status: "online" },
    { name: "Maxime Laurent", role: "Équipe maintenance", avatar: "ML", status: "offline" },
    { name: "Clara Petit", role: "Baby-sitter senior", avatar: "CP", status: "online" },
  ];

  const statusColor = { online: "var(--green)", away: "var(--amber)", offline: "var(--gris-2)" };

  return (
    <div className="fade-in">
      <div className="section-header">
        <div>
          <div className="section-title">Gestion des accès & Équipes</div>
          <div className="section-sub">Rôles, permissions et membres actifs</div>
        </div>
        <button className="btn btn-gold"><Icon d={icons.plus} size={14} /> Inviter un membre</button>
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        {roles.map((r, i) => (
          <div key={i} className="card" style={{ borderColor: `${r.color}22` }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${r.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon d={r.icon} size={18} stroke={r.color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--blanc)" }}>{r.name}</div>
                <div style={{ fontSize: 12, color: "var(--gris-3)" }}>{r.users} utilisateur{r.users > 1 ? "s" : ""}</div>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {r.perms.map(p => (
                <span key={p} style={{ background: `${r.color}10`, border: `1px solid ${r.color}25`, color: r.color, fontSize: 11, padding: "3px 9px", borderRadius: 20 }}>
                  ✓ {p}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="section-header"><div className="section-title">Membres actifs</div></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          {team.map((m, i) => (
            <div key={i} style={{ background: "var(--noir-3)", borderRadius: 10, padding: "14px 16px", display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ position: "relative" }}>
                <div className="avatar-lg" style={{ background: `linear-gradient(135deg, ${getColor(m.name)}, ${getColor(m.name)}88)` }}>
                  {m.avatar}
                </div>
                <div style={{ position: "absolute", bottom: 0, right: 0, width: 10, height: 10, borderRadius: "50%", background: statusColor[m.status], border: "2px solid var(--noir-3)" }}></div>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--blanc)" }}>{m.name}</div>
                <div style={{ fontSize: 11, color: "var(--gris-3)", marginTop: 2 }}>{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// ── DIFFUSION EXTRAS ──────────────────────────────────────────────────────────
function Diffusion() {
  const [selected, setSelected] = useState(BROADCAST_HISTORY[0]);
  const [composing, setComposing] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [msgText, setMsgText] = useState("");
  const [msgTitle, setMsgTitle] = useState("");
  const [eventRef, setEventRef] = useState("");
  const [channel, setChannel] = useState("sms");
  const [sent, setSent] = useState(false);
  const [filterRole, setFilterRole] = useState("all");

  const toggleRecipient = (id) => {
    setSelectedRecipients(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };
  const selectAll = () => setSelectedRecipients(EXTRAS_TEAM.map(e => e.id));
  const selectAvailable = () => setSelectedRecipients(EXTRAS_TEAM.filter(e => e.available).map(e => e.id));

  const roles = ["all", ...Array.from(new Set(EXTRAS_TEAM.map(e => e.role)))];
  const filtered = filterRole === "all" ? EXTRAS_TEAM : EXTRAS_TEAM.filter(e => e.role === filterRole);

  const handleSend = () => {
    if (!msgTitle || !msgText || selectedRecipients.length === 0) return;
    setSent(true);
    setTimeout(() => { setSent(false); setComposing(false); setMsgText(""); setMsgTitle(""); setSelectedRecipients([]); setEventRef(""); }, 2200);
  };

  const typeColors = { gala: "var(--or)", corporate: "var(--accent)", anniversaire: "var(--green)", default: "var(--gris-3)" };

  const mockResponses = [
    { name: "Lucas Fernandez", status: "confirmed", time: "Il y a 2h", note: "Dispo, je confirme ✓" },
    { name: "Inès Dubois", status: "confirmed", time: "Il y a 1h30", note: "Présente !" },
    { name: "Amina Boulou", status: "confirmed", time: "Il y a 45 min", note: "OK pour moi" },
    { name: "Théo Martin", status: "declined", time: "Il y a 1h", note: "Déjà occupé ce soir-là" },
    { name: "Romain Charvet", status: "pending", time: "—", note: "" },
    { name: "Chloé Renard", status: "pending", time: "—", note: "" },
  ];

  return (
    <div className="fade-in">
      <div className="section-header">
        <div>
          <div className="section-title">Diffusion Extras</div>
          <div className="section-sub">Envoyer des appels à mission à votre équipe d'extras</div>
        </div>
        <button className="btn btn-gold" onClick={() => { setComposing(true); setSelected(null); }}>
          <Icon d={icons.send} size={14} /> Nouveau message
        </button>
      </div>

      <div className="diffusion-layout">
        {/* ── SIDEBAR HISTORIQUE ── */}
        <div className="diffusion-sidebar">
          <div className="diffusion-sidebar-header">
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--gris-3)" }}>Historique</span>
            <span className="badge badge-gold">{BROADCAST_HISTORY.length}</span>
          </div>
          {BROADCAST_HISTORY.map(b => {
            const pct = Math.round((b.confirmed / b.sentTo) * 100);
            return (
              <div key={b.id} className={`broadcast-item ${selected?.id === b.id && !composing ? "active" : ""}`}
                onClick={() => { setSelected(b); setComposing(false); }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                  <div className="broadcast-item-title" style={{ flex: 1, paddingRight: 8 }}>{b.title}</div>
                  {b.urgent && <span className="badge badge-red" style={{ fontSize: 9, padding: "2px 6px", flexShrink: 0 }}>Urgent</span>}
                </div>
                <div className="broadcast-item-meta" style={{ marginBottom: 8 }}>{b.date}</div>
                <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
                  <span style={{ fontSize: 11, color: "var(--gris-3)" }}>{b.sentTo} envoyés</span>
                  <span style={{ fontSize: 11, color: "var(--amber)" }}>{b.replied} réponses</span>
                  <span style={{ fontSize: 11, color: "var(--green)" }}>{b.confirmed} confirmés</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${pct}%`, background: pct >= 60 ? "var(--green)" : pct >= 30 ? "var(--amber)" : "var(--red)" }}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── MAIN PANEL ── */}
        <div className="diffusion-main">
          {/* COMPOSE */}
          {composing && (
            <div className="compose-box fade-in">
              <div className="compose-title">
                <Icon d={icons.send} size={18} stroke="var(--or)" />
                Nouveau message de diffusion
              </div>

              {/* Objet + événement lié */}
              <div className="input-row">
                <label className="input-label">Objet du message</label>
                <input className="input" placeholder="Ex: Besoin extras — Gala 25 mai" value={msgTitle} onChange={e => setMsgTitle(e.target.value)} />
              </div>
              <div className="input-row-inline" style={{ marginBottom: 14 }}>
                <div>
                  <label className="input-label">Événement lié</label>
                  <select className="input" value={eventRef} onChange={e => setEventRef(e.target.value)}>
                    <option value="">— Choisir un événement —</option>
                    {EVENTS.map(ev => <option key={ev.id} value={ev.id}>{ev.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="input-label">Canal d'envoi</label>
                  <select className="input" value={channel} onChange={e => setChannel(e.target.value)}>
                    <option value="sms">SMS</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="email">Email</option>
                    <option value="notif">Notification app</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="input-row">
                <label className="input-label">Message</label>
                <textarea className="input textarea-compose" placeholder="Bonjour,&#10;&#10;Nous recherchons des extras pour..." value={msgText} onChange={e => setMsgText(e.target.value)} />
              </div>

              {/* Destinataires */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <label className="input-label" style={{ margin: 0 }}>Destinataires ({selectedRecipients.length} sélectionné{selectedRecipients.length > 1 ? "s" : ""})</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn btn-ghost btn-sm" onClick={selectAvailable}>Disponibles</button>
                    <button className="btn btn-ghost btn-sm" onClick={selectAll}>Tous</button>
                    <button className="btn btn-ghost btn-sm" onClick={() => setSelectedRecipients([])}>Aucun</button>
                  </div>
                </div>

                {/* Filtre rôle */}
                <div className="tabs" style={{ marginBottom: 10 }}>
                  {roles.map(r => (
                    <div key={r} className={`tab ${filterRole === r ? "active" : ""}`} onClick={() => setFilterRole(r)} style={{ padding: "5px 12px", fontSize: 12 }}>
                      {r === "all" ? "Tous" : r}
                    </div>
                  ))}
                </div>

                <div className="recipient-grid">
                  {filtered.map(ext => {
                    const isSelected = selectedRecipients.includes(ext.id);
                    return (
                      <div key={ext.id} className={`recipient-chip ${isSelected ? "selected" : ""} ${!ext.available ? "unavailable" : ""}`}
                        onClick={() => toggleRecipient(ext.id)}>
                        <div style={{ width: 30, height: 30, borderRadius: "50%", background: `linear-gradient(135deg, ${isSelected ? "var(--or-dark)" : getColor(ext.name)}, ${isSelected ? "var(--or)" : getColor(ext.name) + "88"})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "var(--noir)", flexShrink: 0 }}>
                          {ext.photo}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="chip-name">{ext.name.split(" ")[0]}</div>
                          <div className="chip-role">{ext.role}</div>
                        </div>
                        <div>
                          {isSelected
                            ? <div style={{ width: 16, height: 16, borderRadius: "50%", background: "var(--or)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon d={icons.check} size={10} stroke="var(--noir)" /></div>
                            : <div style={{ width: 16, height: 16, borderRadius: "50%", border: "1px solid rgba(255,255,255,.12)" }}></div>
                          }
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <button className="btn btn-gold" onClick={handleSend}
                  disabled={!msgTitle || !msgText || selectedRecipients.length === 0}
                  style={{ flex: 1, justifyContent: "center", opacity: (!msgTitle || !msgText || selectedRecipients.length === 0) ? 0.4 : 1 }}>
                  <Icon d={icons.send} size={14} />
                  {sent ? "✓ Envoyé !" : `Envoyer à ${selectedRecipients.length} extra${selectedRecipients.length > 1 ? "s" : ""}`}
                </button>
                <button className="btn btn-ghost" onClick={() => setComposing(false)}>Annuler</button>
              </div>
            </div>
          )}

          {/* DETAIL MESSAGE DIFFUSÉ */}
          {selected && !composing && (
            <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Header message */}
              <div className="compose-box">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 300, color: "var(--blanc)" }}>{selected.title}</div>
                      {selected.urgent && <span className="badge badge-red">Urgent</span>}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--gris-3)" }}>Envoyé le {selected.date}</div>
                  </div>
                  <button className="btn btn-gold btn-sm"><Icon d={icons.send} size={12} /> Relancer</button>
                </div>

                {/* Stats anneaux */}
                <div style={{ display: "flex", gap: 28, marginBottom: 18 }}>
                  {[
                    { val: selected.sentTo, lbl: "Envoyés", color: "var(--gris-4)" },
                    { val: selected.replied, lbl: "Réponses", color: "var(--amber)" },
                    { val: selected.confirmed, lbl: "Confirmés", color: "var(--green)" },
                    { val: selected.sentTo - selected.replied, lbl: "Sans réponse", color: "var(--red)" },
                  ].map((s, i) => (
                    <div key={i} style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 300, color: s.color, lineHeight: 1 }}>{s.val}</div>
                      <div style={{ fontSize: 10, color: "var(--gris-3)", textTransform: "uppercase", letterSpacing: ".08em", marginTop: 3 }}>{s.lbl}</div>
                    </div>
                  ))}
                </div>

                {/* Barre de progression globale */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 11, color: "var(--gris-3)" }}>Taux de confirmation</span>
                    <span style={{ fontSize: 11, color: "var(--green)", fontWeight: 600 }}>{Math.round((selected.confirmed / selected.sentTo) * 100)}%</span>
                  </div>
                  <div className="progress-bar" style={{ height: 6 }}>
                    <div className="progress-fill" style={{ width: `${Math.round((selected.confirmed / selected.sentTo) * 100)}%`, background: "linear-gradient(90deg, var(--or-dark), var(--green))" }}></div>
                  </div>
                </div>

                {/* Contenu message */}
                <div style={{ background: "var(--noir-3)", borderRadius: 10, padding: "14px 16px", borderLeft: "3px solid var(--or)" }}>
                  <div style={{ fontSize: 11, color: "var(--or)", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".08em" }}>Message envoyé</div>
                  <div style={{ fontSize: 13, color: "var(--gris-4)", lineHeight: 1.6 }}>{selected.message}</div>
                </div>
              </div>

              {/* Réponses des extras */}
              <div className="compose-box">
                <div style={{ fontSize: 15, fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, marginBottom: 16 }}>Réponses des extras</div>
                {mockResponses.map((r, i) => (
                  <div key={i} className="response-row">
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${getColor(r.name)}, ${getColor(r.name)}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "var(--noir)" }}>
                      {r.name.split(" ").map(w => w[0]).join("")}
                    </div>
                    <div className="response-name">{r.name}</div>
                    {r.note && <div style={{ fontSize: 12, color: "var(--gris-3)", fontStyle: "italic", marginRight: 8 }}>"{r.note}"</div>}
                    <div className="response-time">{r.time}</div>
                    <span className={`badge ${r.status === "confirmed" ? "badge-green" : r.status === "declined" ? "badge-red" : "badge-gray"}`}>
                      {r.status === "confirmed" ? "✓ Confirmé" : r.status === "declined" ? "✗ Indispo" : "En attente"}
                    </span>
                    {r.status === "pending" && <button className="btn btn-ghost btn-sm"><Icon d={icons.send} size={11} /> Relancer</button>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EMPTY STATE */}
          {!selected && !composing && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--gris-3)" }}>
              <div style={{ fontSize: 48, marginBottom: 16, opacity: .4 }}>📡</div>
              <div style={{ fontSize: 14 }}>Sélectionnez un message ou créez une nouvelle diffusion</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// ── NAVIGATION CONFIG ─────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard", label: "Tableau de bord", icon: icons.dashboard, badge: 0 },
  { section: "Services" },
  { id: "babysitting", label: "Baby-sitting", icon: icons.baby, badge: 2 },
  { id: "maintenance", label: "Maintenance", icon: icons.tool, badge: 1 },
  { id: "events", label: "Extras & Events", icon: icons.star, badge: 0 },
  { id: "diffusion", label: "Diffusion Extras", icon: icons.send, badge: 3 },
  { section: "Gestion" },
  { id: "facturation", label: "Facturation", icon: icons.invoice, badge: 1 },
  { id: "clients", label: "Clients & Partenaires", icon: icons.users, badge: 0 },
  { id: "tarifs", label: "Tarifs & Location", icon: icons.tag, badge: 0 },
  { section: "Admin" },
  { id: "acces", label: "Accès & Équipes", icon: icons.shield, badge: 0 },
];

const PAGES = { dashboard: Dashboard, babysitting: Babysitting, maintenance: Maintenance, events: Events, diffusion: Diffusion, facturation: Facturation, clients: Clients, tarifs: Tarifs, acces: Acces };
const PAGE_TITLES = { dashboard: "Tableau de bord", babysitting: "Baby-sitting", maintenance: "Maintenance", events: "Extras & Événements", diffusion: "Diffusion Extras", facturation: "Facturation", clients: "Clients & Partenaires", tarifs: "Tarifs & Location", acces: "Accès & Équipes" };

// ── APP SHELL ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("dashboard");
  const Page = PAGES[page] || Dashboard;

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-wordmark">
              <span className="logo-dot"></span>
              <span>Côte d'Azur<br /><span style={{ fontWeight: 400 }}>Services</span></span>
            </div>
            <div className="logo-sub">Monaco · Riviera</div>
          </div>

          <nav className="sidebar-nav">
            {NAV.map((item, i) => {
              if (item.section) return <div key={i} className="nav-section-label">{item.section}</div>;
              return (
                <div key={item.id} className={`nav-item ${page === item.id ? "active" : ""}`} onClick={() => setPage(item.id)}>
                  <Icon d={item.icon} size={16} />
                  <span>{item.label}</span>
                  {item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
                </div>
              );
            })}
          </nav>

          <div className="sidebar-footer">
            <div className="user-card">
              <div className="avatar">AM</div>
              <div style={{ flex: 1 }}>
                <div className="user-name">Alexandre M.</div>
                <div className="user-role">Administrateur</div>
              </div>
              <Icon d={icons.logout} size={14} stroke="var(--gris-2)" />
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <div className="main">
          {/* TOPBAR */}
          <header className="topbar">
            <div className="topbar-title">{PAGE_TITLES[page]}</div>
            <div className="search-bar">
              <Icon d={icons.search} size={14} stroke="var(--gris-3)" />
              <input placeholder="Rechercher…" />
            </div>
            <div className="notif-btn">
              <Icon d={icons.bell} size={16} />
              <div className="badge">4</div>
            </div>
            <div className="avatar" style={{ cursor: "pointer" }}>AM</div>
          </header>

          {/* CONTENT */}
          <main className="content">
            <Page key={page} />
          </main>
        </div>
      </div>
    </>
  );
}

