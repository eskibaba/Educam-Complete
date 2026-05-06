import { useState, useRef, useEffect } from 'react'

// ============================================================
// ✏️  CONFIGURATION
// ============================================================
const CONFIG = {
  CAMPAY_USERNAME: 'NGWAEPHRAIM4@GMAIL.COM',
  CAMPAY_PASSWORD: 'Eski5096@',
  CAMPAY_BASE_URL: 'https://demo.campay.net/api',
  WHATSAPP_SUPPORT: '237682613235',
  ADMIN_PASSWORD: 'educam-admin-2024',
}

// ============================================================
// 🌍 TRANSLATIONS — All UI text in English and French
// ============================================================
const T = {
  en: {
    appSub: 'AI TUTOR · CAMEROON',
    fromPrice: '🇨🇲 from 500 FCFA',
    hero: 'Pass Your Exams.\nOwn Your Future.',
    heroSub: 'Expert AI tutoring for GCE, BEPC, BAC and more.\nBilingual · 24/7 · Affordable for every student.',
    feat1t: 'AI-Powered', feat1d: 'Step-by-step help',
    feat2t: 'Past Papers', feat2d: 'Real exam questions',
    feat3t: 'Bilingual', feat3d: 'English and French',
    feat4t: '24/7 Access', feat4d: 'Study anytime',
    btnPay: '💳 Choose a Plan and Pay',
    btnCode: '🔑 I Already Have a Code',
    manualPay: '💬 Prefer to pay manually via MoMo?',
    contactWA: 'Contact EduCam on WhatsApp',
    momoNote: 'Send money via MTN/Orange MoMo → Get your code instantly',
    choosePlan: 'Choose Your Plan',
    choosePlanSub: 'All plans give unlimited access until they expire.',
    payManually: '📲 Pay Manually via WhatsApp',
    payManuallyNote: 'Send MoMo to EduCam → Receive your access code on WhatsApp',
    checkPhone: 'Check Your Phone!',
    paymentConfirmed: 'Payment Confirmed!',
    paymentIssue: 'Payment Issue',
    tryAgain: 'Try Again',
    back: '← Back',
    startStudying: '🚀 Start Studying Now',
    copyCode: '📋 Copy Code',
    copied: '✅ Copied!',
    whatsapp: '📲 WhatsApp',
    schoolShare: 'Share this code with ALL your students. Valid 30 days · Unlimited students.',
    enterCode: 'Enter Your Code',
    enterCodeSub: 'Enter the code from your payment, or the code shared by your school.',
    unlimited: '✅ Your code gives unlimited access until it expires — come and go as many times as you want!',
    unlockBtn: 'Unlock Session →',
    enterAbove: 'Enter your code above',
    noCode: 'No code yet?',
    buyPlan: 'Buy a plan',
    orContact: 'Or contact us directly to pay manually:',
    waTeam: 'WhatsApp EduCam Team',
    waNote: '+237 682 613 235 · We reply fast! 🇨🇲',
    accessVerified: '🎉 Access Verified!',
    chooseExamSub: 'You can switch subjects and come back anytime. Choose your exam and subject to begin.',
    chooseExam: '1. Choose Your Exam',
    chooseSubject: '2. Choose Your Subject',
    startSession: '🚀 Start Tutoring Session',
    selectFirst: 'Select Exam and Subject to Begin',
    changeSubject: '← Subjects',
    welcomeBack: 'Welcome back! ',
    savedMessages: 'Your previous {n} message(s) are saved below. Scroll up to review.',
    clearHistory: '🗑️ Clear',
    clearConfirm: 'Clear all history?',
    yes: 'Yes', no: 'No',
    quickPrompts: ['Explain a key topic', 'Give me a past paper question', 'What should I revise?', 'Help me with an essay'],
    askPlaceholder: 'Ask anything… or type in French',
    retrying: 'Retrying...',
    payWith: 'Pay with Mobile Money',
    payWithSub: 'Enter your MTN or Orange Money number below.',
    momoNumber: '📱 Your MoMo Phone Number',
    sendPrompt: 'Send Payment Prompt',
    pinNote: 'You will receive a prompt on your phone. Enter your PIN to confirm.',
    waitingFor: 'was sent to',
    via: 'via',
    enterPin: 'Enter your PIN to confirm.',
    remaining: 's remaining)',
    planActive: 'Active',
    validFor: 'Works on any device · Valid for',
    days: 'day(s)',
    generateAnother: '➕ Generate Another Code',
    codeGenerated: 'Code Generated!',
    forStudent: 'For:',
    plan: 'Plan:',
    langSelect: 'Choose Your Language',
    langEn: '🇬🇧 English',
    langFr: '🇫🇷 Français',
    langContinue: 'Continue',
    switchLang: 'FR',
  },
  fr: {
    appSub: 'TUTEUR IA · CAMEROUN',
    fromPrice: '🇨🇲 dès 500 FCFA',
    hero: 'Réussis tes Examens.\nConstruit ton Avenir.',
    heroSub: 'Tutorat IA expert pour GCE, BEPC, BAC et plus.\nBilingue · 24h/24 · Abordable pour chaque élève.',
    feat1t: 'Propulsé par IA', feat1d: 'Aide étape par étape',
    feat2t: 'Sujets Passés', feat2d: "Vraies questions d'examen",
    feat3t: 'Bilingue', feat3d: 'Anglais et Français',
    feat4t: 'Accès 24h/24', feat4d: 'Étudie à toute heure',
    btnPay: '💳 Choisir un Forfait et Payer',
    btnCode: "🔑 J'ai déjà un Code",
    manualPay: '💬 Préfères-tu payer manuellement via MoMo?',
    contactWA: 'Contacter EduCam sur WhatsApp',
    momoNote: "Envoie de l'argent via MTN/Orange MoMo → Reçois ton code instantanément",
    choosePlan: 'Choisir ton Forfait',
    choosePlanSub: "Tous les forfaits donnent un accès illimité jusqu'à expiration.",
    payManually: '📲 Payer Manuellement via WhatsApp',
    payManuallyNote: "Envoie MoMo à EduCam → Reçois ton code d'accès sur WhatsApp",
    checkPhone: 'Vérifie ton Téléphone!',
    paymentConfirmed: 'Paiement Confirmé!',
    paymentIssue: 'Problème de Paiement',
    tryAgain: 'Réessayer',
    back: '← Retour',
    startStudying: '🚀 Commencer à Étudier',
    copyCode: '📋 Copier le Code',
    copied: '✅ Copié!',
    whatsapp: '📲 WhatsApp',
    schoolShare: 'Partage ce code avec TOUS tes élèves. Valable 30 jours · Élèves illimités.',
    enterCode: 'Entrer ton Code',
    enterCodeSub: 'Entre le code reçu après paiement, ou le code partagé par ton école.',
    unlimited: "✅ Ton code donne un accès illimité jusqu'à expiration — entre et sors autant que tu veux!",
    unlockBtn: 'Déverrouiller la Session →',
    enterAbove: 'Entre ton code ci-dessus',
    noCode: 'Pas encore de code?',
    buyPlan: 'Acheter un forfait',
    orContact: 'Ou contacte-nous directement pour payer manuellement:',
    waTeam: 'WhatsApp Équipe EduCam',
    waNote: '+237 682 613 235 · Nous répondons vite! 🇨🇲',
    accessVerified: '🎉 Accès Vérifié!',
    chooseExamSub: 'Tu peux changer de matière à tout moment. Choisis ton examen et ta matière pour commencer.',
    chooseExam: '1. Choisis ton Examen',
    chooseSubject: '2. Choisis ta Matière',
    startSession: '🚀 Démarrer la Session de Tutorat',
    selectFirst: 'Sélectionne Examen et Matière pour Commencer',
    changeSubject: '← Matières',
    welcomeBack: 'Bon retour! ',
    savedMessages: 'Tes {n} message(s) précédents sont sauvegardés ci-dessous. Remonte pour les consulter.',
    clearHistory: '🗑️ Effacer',
    clearConfirm: "Effacer tout l'historique?",
    yes: 'Oui', no: 'Non',
    quickPrompts: ['Expliquer un sujet clé', "Donne-moi un sujet d'examen", 'Que dois-je réviser?', 'Aide-moi avec une dissertation'],
    askPlaceholder: "Pose n'importe quelle question… ou écris en anglais",
    retrying: 'Nouvelle tentative...',
    payWith: 'Payer avec Mobile Money',
    payWithSub: 'Entre ton numéro MTN ou Orange Money ci-dessous.',
    momoNumber: '📱 Ton Numéro MoMo',
    sendPrompt: 'Envoyer la Demande de Paiement',
    pinNote: 'Tu recevras une demande sur ton téléphone. Entre ton PIN pour confirmer.',
    waitingFor: 'a été envoyé à',
    via: 'via',
    enterPin: 'Entre ton PIN pour confirmer.',
    remaining: 's restantes)',
    planActive: 'Actif',
    validFor: 'Fonctionne sur tout appareil · Valable',
    days: 'jour(s)',
    generateAnother: '➕ Générer un Autre Code',
    codeGenerated: 'Code Généré!',
    forStudent: 'Pour:',
    plan: 'Forfait:',
    langSelect: 'Choisir ta Langue',
    langEn: '🇬🇧 English',
    langFr: '🇫🇷 Français',
    langContinue: 'Continuer',
    switchLang: 'EN',
  }
}

// Language helpers
function getSavedLang() {
  return localStorage.getItem('educam_lang') || null
}
function saveLang(lang) {
  localStorage.setItem('educam_lang', lang)
}

// Plans with bilingual labels
function getPlans(lang) {
  const t = T[lang]
  return [
    { id: 'session',  label: lang === 'en' ? 'Single Session'  : 'Session Unique',      icon: '⚡',  price: 500,   duration: 24*60*60*1000,    color: '#4CAF50', badge: null,                              desc: lang === 'en' ? '24 hours unlimited access'      : "24 heures d'accès illimité",   detail: lang === 'en' ? 'Come back as many times as you want for 24 hours.'              : "Revenez autant de fois que vous voulez pendant 24 heures.",           prefix: 'EDU', maxDevices: 3    },
    { id: 'weekly',   label: lang === 'en' ? 'Weekly Plan'      : 'Forfait Hebdomadaire', icon: '📅',  price: 2500,  duration: 7*24*60*60*1000,  color: '#2196F3', badge: lang === 'en' ? 'POPULAR'  : 'POPULAIRE',  desc: lang === 'en' ? '7 days unlimited access'        : "7 jours d'accès illimité",     detail: lang === 'en' ? 'Unlimited sessions for a full week. Study any subject, any time.' : "Sessions illimitées pendant une semaine complète.",                   prefix: 'WEK', maxDevices: 3    },
    { id: 'monthly',  label: lang === 'en' ? 'Monthly Plan'     : 'Forfait Mensuel',      icon: '🗓️', price: 5000,  duration: 30*24*60*60*1000, color: '#FF9800', badge: lang === 'en' ? 'BEST VALUE' : 'MEILLEUR PRIX', desc: lang === 'en' ? '30 days unlimited access'       : "30 jours d'accès illimité",    detail: lang === 'en' ? 'One full month of unlimited AI tutoring across all subjects.'    : "Un mois complet de tutorat IA illimité sur toutes les matières.",     prefix: 'MON', maxDevices: 3    },
    { id: 'school',   label: lang === 'en' ? 'School Package'   : 'Pack École',           icon: '🏫',  price: 50000, duration: 30*24*60*60*1000, color: '#9C27B0', badge: lang === 'en' ? 'FOR SCHOOLS': 'POUR ÉCOLES',  desc: lang === 'en' ? 'Unlimited students · 30 days'   : "Élèves illimités · 30 jours",   detail: lang === 'en' ? 'One code shared with your entire school. Unlimited students.'    : "Un code partagé avec toute votre école. Élèves illimités.",           prefix: 'SCH', maxDevices: 9999 },
  ]
}

// Full subjects list with bilingual labels
function getSubjects(lang) {
  const s = [
    { id: 'math',        en: 'Mathematics',                    fr: 'Mathématiques',                  icon: '📐' },
    { id: 'furthermath', en: 'Further Mathematics',            fr: 'Mathématiques Sup.',              icon: '🔢' },
    { id: 'bizmath',     en: 'Business Mathematics',           fr: 'Mathématiques Commerciales',      icon: '🧮' },
    { id: 'english',     en: 'English Language',               fr: 'Anglais',                        icon: '📝' },
    { id: 'french',      en: 'French Language',                fr: 'Français',                       icon: '🗣️' },
    { id: 'physics',     en: 'Physics',                        fr: 'Physique',                       icon: '⚡' },
    { id: 'chemistry',   en: 'Chemistry',                      fr: 'Chimie',                         icon: '🧪' },
    { id: 'biology',     en: 'Biology',                        fr: 'Biologie',                       icon: '🌿' },
    { id: 'history',     en: 'History',                        fr: 'Histoire',                       icon: '🏛️' },
    { id: 'geography',   en: 'Geography',                      fr: 'Géographie',                     icon: '🌍' },
    { id: 'economics',   en: 'Economics',                      fr: 'Économie',                       icon: '📈' },
    { id: 'commerce',    en: 'Commerce',                       fr: 'Commerce',                       icon: '🏪' },
    { id: 'geology',     en: 'Geology',                        fr: 'Géologie',                       icon: '🪨' },
    { id: 'acc_cg',      en: 'Accounting (ACC/CG)',             fr: 'Comptabilité (ACC/CG)',           icon: '📒' },
    { id: 'acc_aca',     en: 'Accounting (ACA)',                fr: 'Comptabilité (ACA)',              icon: '📗' },
    { id: 'bizman',      en: 'Business Management',             fr: "Gestion d'Entreprise",           icon: '💼' },
    { id: 'marketing',   en: 'Marketing Management (MKT/ACC)', fr: 'Management Marketing (MKT/ACC)',  icon: '📣' },
    { id: 'foodsci',     en: 'Food Science',                   fr: 'Sciences Alimentaires',           icon: '🍽️' },
    { id: 'compsci',     en: 'Computer Science',               fr: 'Informatique',                   icon: '💻' },
    { id: 'ict',         en: 'ICT',                            fr: 'TIC',                            icon: '🖥️' },
    { id: 'sec_sac',     en: 'Secretarial Admin (SAC/ACA)',     fr: 'Secrétariat Admin (SAC/ACA)',     icon: '🗂️' },
    { id: 'sec_ssa',     en: 'Secretarial Studies (SSA)',       fr: 'Études de Secrétariat (SSA)',     icon: '📋' },
    { id: 'taxation',    en: 'Taxation (TIMS/FIG)',             fr: 'Fiscalité (TIMS/FIG)',            icon: '🏦' },
    { id: 'finance',     en: 'Finance',                        fr: 'Finance',                        icon: '💰' },
    { id: 'law',         en: 'Law',                            fr: 'Droit',                          icon: '⚖️' },
    { id: 'entrepreneur',en: 'Entrepreneurship',               fr: 'Entrepreneuriat',                icon: '🚀' },
    { id: 'philosophy',  en: 'Philosophy',                     fr: 'Philosophie',                    icon: '🤔' },
    { id: 'logic',       en: 'Logic',                          fr: 'Logique',                        icon: '🧠' },
    { id: 'citizenship', en: 'Citizenship',                    fr: 'Éducation à la Citoyenneté',      icon: '🏳️' },
    { id: 'building',    en: 'Building & Construction',        fr: 'Bâtiment & Construction',        icon: '🏗️' },
    { id: 'motor',       en: 'Motor Mechanics',                fr: 'Mécanique Auto',                 icon: '🔧' },
    { id: 'electrical',  en: 'Electrical Power Systems',       fr: "Systèmes d'Énergie Électrique",  icon: '⚡' },
    { id: 'fashion',     en: 'Fashion & Textile',              fr: 'Mode & Textile',                 icon: '👗' },
    { id: 'engsci',      en: 'Engineering Science',            fr: "Sciences de l'Ingénieur",        icon: '⚙️' },
    { id: 'auto_maint',  en: 'Automobile Maintenance (AM)',    fr: 'Maintenance Automobile (AM)',     icon: '🚗' },
    { id: 'arch_draft',  en: 'Architectural Draftsmanship (AD)',fr: 'Dessin Architectural (AD)',      icon: '📐' },
    { id: 'electronics', en: 'Electronics (ELN)',              fr: 'Électronique (ELN)',              icon: '🔌' },
    { id: 'appmech',     en: 'Applied Mechanics',              fr: 'Mécanique Appliquée',            icon: '🔩' },
    { id: 'religion',    en: 'Religious Studies',              fr: 'Éducation Religieuse',           icon: '✝️' },
    { id: 'qhse',        en: 'Quality Hygiene Safety & Env.',  fr: 'Qualité Hygiène Sécurité & Env.',icon: '🛡️' },
  ]
  return s.map(x => ({ id: x.id, label: lang === 'en' ? x.en : x.fr, icon: x.icon, en: x.en, fr: x.fr }))
}

const EXAMS = ['GCE O/L', 'BEPC', 'GCE A/L', 'BAC', 'CAP', 'PROBATOIRE']

function getSystemPrompt(lang, subjLabel, exam) {
  if (lang === 'fr') {
    return "Tu es EduCam AI, un tuteur chaleureux et brillant pour les élèves camerounais préparant le GCE, BEPC, BAC, CAP et Probatoire. Tu es bilingue (Anglais/Français), tu connais profondément le programme MINESEC, et tu donnes des explications étape par étape avec des exemples de la vie quotidienne camerounaise. Réponds toujours en Français sauf si l'élève écrit en Anglais. Termine toujours par une phrase d'encouragement et une question de pratique rapide. Matière: " + subjLabel + ". Examen: " + exam + ".\n" 
  }
  return 'You are EduCam AI, a warm and brilliant tutor for Cameroonian students preparing for GCE, BEPC, BAC, CAP, and Probatoire exams. You are bilingual (English/French), know the MINESEC curriculum deeply, and give step-by-step explanations with Cameroonian daily life examples. Respond in English unless the student writes in French. Always end with an encouraging sentence and a quick practice question. Subject: ' + subjLabel + '. Exam: ' + exam + '.'
}

// ── Device ID — unique per browser, persisted ─────────────
function getDeviceId() {
  let id = localStorage.getItem('educam_device_id')
  if (!id) {
    id = 'dev-' + Math.random().toString(36).slice(2) + Date.now().toString(36)
    localStorage.setItem('educam_device_id', id)
  }
  return id
}

// ── Code prefix to plan mapping ────────────────────────────
const PLAN_PREFIXES = { EDU: 'session', WEK: 'weekly', MON: 'monthly', SCH: 'school' }
const PLAN_ICONS = { session: '⚡', weekly: '📅', monthly: '🗓️', school: '🏫' }
function getPlanFromCode(code, lang) {
  const prefix = (code || '').split('-')[0]
  const planId = PLAN_PREFIXES[prefix]
  if (!planId) return null
  return getPlans(lang || 'en').find(p => p.id === planId) || null
}

// ── Code generator ─────────────────────────────────────────
function generateCode(prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = prefix + '-'
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return code
}

function daysLeft(expiresAt) {
  return Math.max(0, Math.ceil((expiresAt - Date.now()) / (1000*60*60*24)))
}

// ── API calls to Netlify functions ─────────────────────────
async function apiChat(messages, system) {
  const res = await fetch('/.netlify/functions/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, system }),
  })
  let data
  try { data = await res.json() } catch (e) { throw new Error('Server returned invalid response (status ' + res.status + ')') }
  if (!res.ok || data.error) throw new Error(data.error || 'Server error ' + res.status)
  return data.reply
}

async function apiCodes(payload) {
  const res = await fetch('/.netlify/functions/codes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Server error ' + res.status)
  return res.json()
}

// ── Payment helpers ────────────────────────────────────────
async function getCampayToken() {
  const res = await fetch(CONFIG.CAMPAY_BASE_URL + '/token/', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: CONFIG.CAMPAY_USERNAME, password: CONFIG.CAMPAY_PASSWORD }),
  })
  return (await res.json()).token
}

async function initiatePayment(phone, plan, token) {
  const code = generateCode(plan.prefix)
  const res = await fetch(CONFIG.CAMPAY_BASE_URL + '/collect/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Token ' + token },
    body: JSON.stringify({ amount: String(plan.price), currency: 'XAF', from: phone.replace(/\s/g, ''), description: 'EduCam ' + plan.label + ' - ' + code, external_reference: code }),
  })
  return { ...(await res.json()), code }
}

async function checkPaymentStatus(ref, token) {
  const res = await fetch(CONFIG.CAMPAY_BASE_URL + '/transaction/' + ref + '/', { headers: { Authorization: 'Token ' + token } })
  return res.json()
}

function detectNetwork(num) {
  const p = num.replace(/\D/g, '').slice(-9).slice(0, 3)
  if (['650','651','652','653','654','670','671','672','673','674','675','676','677','678','679','680','681','682','683','690','691','692','693','694','695','696','697','698','699'].includes(p)) return 'MTN'
  if (['655','656','657','658','659','685','686','687','688','689'].includes(p)) return 'Orange'
  return ''
}

// ── Styles ─────────────────────────────────────────────────
const S = {
  page: { minHeight: '100vh', background: 'linear-gradient(135deg,#0a0a1a 0%,#0d1f0d 50%,#1a0a0a 100%)', fontFamily: "Georgia,'Times New Roman',serif", color: '#f0ead6', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  grid: { position: 'fixed', inset: 0, opacity: 0.03, backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 40px,#4CAF50 40px,#4CAF50 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,#4CAF50 40px,#4CAF50 41px)', pointerEvents: 'none' },
  header: { width: '100%', maxWidth: 680, padding: '14px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  centered: { width: '100%', maxWidth: 480, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 24px 40px' },
  hero: { fontSize: 'clamp(24px,5vw,36px)', fontWeight: 'bold', textAlign: 'center', lineHeight: 1.25, margin: '0 0 10px', background: 'linear-gradient(135deg,#f0ead6,#4CAF50)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  heroSub: { color: '#999', fontSize: 14, textAlign: 'center', lineHeight: 1.7, marginBottom: 24 },
  btnPrimary: { width: '100%', padding: '14px', borderRadius: 12, fontSize: 15, fontWeight: 'bold', fontFamily: 'inherit', cursor: 'pointer', border: 'none', background: 'linear-gradient(135deg,#2E7D32,#4CAF50)', color: '#fff', marginBottom: 10, boxShadow: '0 4px 20px rgba(76,175,80,0.3)', transition: 'all 0.2s' },
  btnSecondary: { width: '100%', padding: '12px', borderRadius: 12, fontSize: 14, fontFamily: 'inherit', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', color: '#aaa', marginBottom: 10 },
  btnDisabled: { width: '100%', padding: '14px', borderRadius: 12, fontSize: 15, fontWeight: 'bold', fontFamily: 'inherit', cursor: 'not-allowed', border: 'none', background: 'rgba(255,255,255,0.08)', color: '#555', marginBottom: 10 },
  backBtn: { alignSelf: 'flex-start', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '5px 14px', color: '#777', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 18 },
  sectionTitle: { fontSize: 21, fontWeight: 'bold', color: '#f0ead6', textAlign: 'center', marginBottom: 6 },
  inputLabel: { fontSize: 10, color: '#666', textTransform: 'uppercase', letterSpacing: 2, display: 'block', marginBottom: 7 },
  input: { width: '100%', padding: '13px 16px', borderRadius: 10, fontSize: 15, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#f0ead6', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' },
  codeBox: { background: 'rgba(76,175,80,0.15)', border: '2px solid #4CAF50', borderRadius: 12, padding: '14px 28px', fontSize: 26, fontWeight: 'bold', letterSpacing: 5, color: '#4CAF50', marginBottom: 10, fontFamily: 'monospace', textAlign: 'center' },
  tagBtn: { padding: '7px 16px', borderRadius: 20, fontSize: 13, cursor: 'pointer', border: '2px solid', fontFamily: 'inherit', transition: 'all 0.2s' },
  waitingBar: { width: '100%', height: 5, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' },
  waitingFill: { height: '100%', background: 'linear-gradient(90deg,#2E7D32,#4CAF50)', borderRadius: 3, transition: 'width 1s linear' },
  momoTag: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '4px 12px', fontSize: 12, color: '#777' },
  infoBox: { width: '100%', background: 'rgba(33,150,243,0.1)', border: '1px solid rgba(33,150,243,0.3)', borderRadius: 10, padding: '12px 14px', marginBottom: 14, fontSize: 13, color: '#90CAF9', lineHeight: 1.5 },
}

// ============================================================
// 🔐 ADMIN LOGIN
// ============================================================
function AdminLoginScreen({ t, onSuccess, onBack }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const handle = () => pw === CONFIG.ADMIN_PASSWORD ? onSuccess() : (setError('Wrong password. Try again.'), setPw(''))
  return (
    <div style={S.centered}>
      <button onClick={onBack} style={S.backBtn}>← Back</button>
      <div style={{ fontSize: 48, marginBottom: 12 }}>🔐</div>
      <h2 style={S.sectionTitle}>Admin Login</h2>
      <p style={{ color: '#666', fontSize: 13, textAlign: 'center', marginBottom: 24 }}>EduCam administrators only.</p>
      <div style={{ width: '100%', marginBottom: 14 }}>
        <label style={S.inputLabel}>Admin Password</label>
        <input type="password" placeholder="Enter admin password" value={pw} onChange={e => { setPw(e.target.value); setError('') }} onKeyDown={e => e.key === 'Enter' && handle()} style={S.input} />
      </div>
      {error && <p style={{ color: '#f87171', fontSize: 13, marginBottom: 10 }}>{error}</p>}
      <button onClick={handle} style={{ ...S.btnPrimary, background: 'linear-gradient(135deg,#FF6F00,#FFA000)' }}>🔓 Login as Admin</button>
    </div>
  )
}

// ============================================================
// 🛠️ ADMIN DASHBOARD
// ============================================================
function AdminDashboard({ lang, t, PLANS, onBack }) {
  const [tab, setTab] = useState('generate')
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [studentName, setStudentName] = useState('')
  const [studentPhone, setStudentPhone] = useState('')
  const [paymentNote, setPaymentNote] = useState('')
  const [generatedCode, setGeneratedCode] = useState(null)
  const [copied, setCopied] = useState(false)
  const [codes, setCodes] = useState([])
  const [filter, setFilter] = useState('all')
  const [loadingCodes, setLoadingCodes] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [genError, setGenError] = useState('')

  const loadCodes = async () => {
    setLoadingCodes(true)
    try {
      const res = await apiCodes({ action: 'getAll' })
      setCodes(res.codes || [])
    } catch (e) { console.error(e) }
    setLoadingCodes(false)
  }

  useEffect(() => { if (tab === 'codes') loadCodes() }, [tab])

  const handleGenerate = async () => {
    if (!selectedPlan) return
    setGenerating(true); setGenError('')
    try {
      const code = generateCode(selectedPlan.prefix)
      const expiresAt = Date.now() + selectedPlan.duration
      await apiCodes({
        action: 'save', code, planId: selectedPlan.id,
        phone: studentPhone, note: studentName + (paymentNote ? ' — ' + paymentNote : ''),
        source: 'admin', expiresAt, maxUses: 999999,
        maxDevices: selectedPlan.maxDevices,
      })
      setGeneratedCode({ code, plan: selectedPlan, expiresAt })
    } catch (e) { setGenError('Error: ' + e.message) }
    setGenerating(false)
  }

  const reset = () => { setGeneratedCode(null); setStudentName(''); setStudentPhone(''); setPaymentNote(''); setSelectedPlan(null); setGenError('') }

  const copyCode = code => { navigator.clipboard && navigator.clipboard.writeText(code); setCopied(code); setTimeout(() => setCopied(false), 2000) }

  const shareCode = (code, plan) => {
    const msg = encodeURIComponent(
      '🎓 *EduCam Access Code*\n\n' + (studentName ? 'Dear ' + studentName + ',\n\n' : 'Dear Student,\n\n') +
      'Your EduCam tutoring access is ready!\n\n🔑 Your code: *' + code + '*\n📦 Plan: ' + plan.label + ' · ' + plan.desc +
      '\n📚 All subjects · All exams · English and French\n\n' +
      (plan.id === 'school' ? 'Share this code with all your students.\n\n' : '') +
      'Enter this code in the EduCam app to start studying.\n\nBonne chance! 🇨🇲'
    )
    window.open('https://wa.me/?text=' + msg, '_blank')
  }

  const handleRevoke = async (code) => {
    try { await apiCodes({ action: 'revoke', code }); loadCodes() } catch (e) { alert('Error: ' + e.message) }
  }

  const now = Date.now()
  const filtered = codes.filter(c => {
    const exp = new Date(c.expires_at).getTime()
    if (filter === 'active') return now < exp
    if (filter === 'expired') return now >= exp
    if (filter === 'admin') return c.source === 'admin'
    if (filter === 'campay') return c.source === 'campay'
    return true
  })

  const stats = {
    total: codes.length,
    active: codes.filter(c => now < new Date(c.expires_at).getTime()).length,
    manual: codes.filter(c => c.source === 'admin').length,
    revenue: codes.reduce((s, c) => s + (PLANS.find(p => p.id === c.plan_id)?.price || 0), 0),
  }

  return (
    <div style={{ width: '100%', maxWidth: 680, padding: '16px 20px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,#FF6F00,#FFA000)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🛠️</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 'bold', color: '#FFA000' }}>Admin Dashboard</div>
            <div style={{ fontSize: 11, color: '#666' }}>Cloud-synced · Works on all devices</div>
          </div>
        </div>
        <button onClick={onBack} style={{ ...S.backBtn, marginBottom: 0 }}>← Exit Admin</button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 20 }}>
        {[{ l: 'Total', v: stats.total, c: '#4CAF50' }, { l: 'Active', v: stats.active, c: '#2196F3' }, { l: 'Manual', v: stats.manual, c: '#FF9800' }, { l: 'Revenue', v: stats.revenue.toLocaleString() + ' F', c: '#9C27B0' }].map(s => (
          <div key={s.l} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '10px 6px', textAlign: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 'bold', color: s.c }}>{s.v}</div>
            <div style={{ fontSize: 9, color: '#666', marginTop: 2 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {[{ id: 'generate', label: '➕ Generate Code' }, { id: 'codes', label: '📋 All Codes' }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: '10px', borderRadius: 10, fontSize: 13, fontWeight: 'bold', fontFamily: 'inherit', cursor: 'pointer', border: 'none', background: tab === t.id ? 'linear-gradient(135deg,#FF6F00,#FFA000)' : 'rgba(255,255,255,0.05)', color: tab === t.id ? '#fff' : '#777' }}>{t.label}</button>
        ))}
      </div>

      {/* GENERATE */}
      {tab === 'generate' && !generatedCode && (
        <div>
          <div style={S.infoBox}>ℹ️ Codes are stored in the cloud. They work on any device, anywhere. Student codes work on up to 3 devices. School codes work on unlimited devices.</div>
          <div style={{ marginBottom: 12 }}>
            <label style={S.inputLabel}>👤 Student Name (optional)</label>
            <input type="text" placeholder="e.g. Marie Nguemo" value={studentName} onChange={e => setStudentName(e.target.value)} style={S.input} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={S.inputLabel}>📱 Student Phone (optional)</label>
            <input type="tel" placeholder="e.g. 677 123 456" value={studentPhone} onChange={e => setStudentPhone(e.target.value)} style={S.input} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={S.inputLabel}>📝 Payment Note (optional)</label>
            <input type="text" placeholder="e.g. Paid via MTN MoMo 08/04/2026" value={paymentNote} onChange={e => setPaymentNote(e.target.value)} style={S.input} />
          </div>
          <label style={S.inputLabel}>📦 Select Plan</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {PLANS.map(plan => (
              <button key={plan.id} onClick={() => setSelectedPlan(plan)} style={{ width: '100%', background: selectedPlan?.id === plan.id ? plan.color + '20' : 'rgba(255,255,255,0.03)', border: '2px solid ' + (selectedPlan?.id === plan.id ? plan.color : plan.color + '33'), borderRadius: 12, padding: '12px 16px', cursor: 'pointer', fontFamily: 'inherit', color: '#f0ead6', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 22 }}>{plan.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 'bold', color: selectedPlan?.id === plan.id ? plan.color : '#f0ead6' }}>{plan.label}</div>
                      <div style={{ fontSize: 11, color: '#777' }}>{plan.desc} · max {plan.maxDevices === 9999 ? '∞' : plan.maxDevices} devices</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 'bold', color: plan.color }}>{plan.price.toLocaleString()} FCFA</span>
                </div>
              </button>
            ))}
          </div>
          {genError && <p style={{ color: '#f87171', fontSize: 13, marginBottom: 10 }}>{genError}</p>}
          {selectedPlan
            ? <button onClick={handleGenerate} disabled={generating} style={{ ...S.btnPrimary, background: 'linear-gradient(135deg,#FF6F00,#FFA000)', opacity: generating ? 0.7 : 1 }}>{generating ? '⏳ Generating...' : '⚡ Generate ' + selectedPlan.label + ' Code'}</button>
            : <button disabled style={S.btnDisabled}>Select a Plan First</button>
          }
        </div>
      )}

      {/* GENERATED RESULT */}
      {tab === 'generate' && generatedCode && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>✅</div>
          <h2 style={{ ...S.sectionTitle, color: generatedCode.plan.color }}>Code Generated!</h2>
          {studentName && <p style={{ color: '#888', fontSize: 13, marginBottom: 6 }}>For: <strong style={{ color: '#f0ead6' }}>{studentName}</strong></p>}
          <p style={{ color: '#aaa', fontSize: 13, marginBottom: 12 }}><strong style={{ color: generatedCode.plan.color }}>{generatedCode.plan.label}</strong> · {generatedCode.plan.desc}</p>
          <div style={{ ...S.codeBox, borderColor: generatedCode.plan.color, color: generatedCode.plan.color }}>{generatedCode.code}</div>
          <p style={{ color: '#555', fontSize: 11, marginBottom: 14, textAlign: 'center' }}>Works on any device · Valid for {daysLeft(generatedCode.expiresAt)} day(s)</p>
          <div style={{ display: 'flex', gap: 8, width: '100%', marginBottom: 12 }}>
            <button onClick={() => copyCode(generatedCode.code)} style={{ ...S.btnSecondary, flex: 1, marginBottom: 0 }}>{copied === generatedCode.code ? '✅ Copied!' : '📋 Copy Code'}</button>
            <button onClick={() => shareCode(generatedCode.code, generatedCode.plan)} style={{ ...S.btnSecondary, flex: 1, marginBottom: 0, borderColor: 'rgba(37,211,102,0.4)', color: '#25D366' }}>📲 WhatsApp</button>
          </div>
          <button onClick={reset} style={{ ...S.btnPrimary, background: 'linear-gradient(135deg,#FF6F00,#FFA000)' }}>➕ Generate Another Code</button>
        </div>
      )}

      {/* CODES LIST */}
      {tab === 'codes' && (
        <div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
            {[['all','All'],['active','Active'],['expired','Expired'],['admin','Manual'],['campay','Campay']].map(([id, label]) => (
              <button key={id} onClick={() => setFilter(id)} style={{ padding: '5px 12px', borderRadius: 20, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', border: '1px solid', borderColor: filter === id ? '#FFA000' : 'rgba(255,255,255,0.12)', background: filter === id ? 'rgba(255,160,0,0.15)' : 'rgba(255,255,255,0.03)', color: filter === id ? '#FFA000' : '#888', fontWeight: filter === id ? 'bold' : 'normal' }}>{label}</button>
            ))}
            <button onClick={loadCodes} style={{ padding: '5px 12px', borderRadius: 20, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', color: '#666' }}>🔄 Refresh</button>
          </div>
          {loadingCodes && <p style={{ color: '#666', textAlign: 'center', marginTop: 20 }}>Loading codes...</p>}
          {!loadingCodes && filtered.length === 0 && <p style={{ color: '#555', textAlign: 'center', marginTop: 20 }}>No codes found.</p>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map(c => {
              const plan = PLANS.find(p => p.id === c.plan_id)
              const exp = new Date(c.expires_at).getTime()
              const expired = now > exp
              const statusColor = expired ? '#f87171' : '#4CAF50'
              return (
                <div key={c.code} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'monospace', fontSize: 15, fontWeight: 'bold', color: plan?.color || '#aaa', letterSpacing: 2 }}>{c.code}</span>
                      <span style={{ fontSize: 10, fontWeight: 'bold', color: statusColor, background: statusColor + '20', padding: '2px 7px', borderRadius: 10 }}>{expired ? 'Expired' : 'Active'}</span>
                      <span style={{ fontSize: 10, color: '#555', background: 'rgba(255,255,255,0.05)', padding: '2px 7px', borderRadius: 10 }}>{c.source === 'admin' ? '🛠️ Manual' : '💳 Campay'}</span>
                    </div>
                    <button onClick={() => copyCode(c.code)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '3px 10px', color: copied === c.code ? '#4CAF50' : '#666', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit' }}>{copied === c.code ? '✅' : '📋'}</button>
                  </div>
                  <div style={{ display: 'flex', gap: 10, fontSize: 11, color: '#666', flexWrap: 'wrap' }}>
                    <span>{plan?.icon} {plan?.label}</span>
                    {c.note && <span>👤 {c.note}</span>}
                    {c.phone && <span>📱 {c.phone}</span>}
                    <span>🕐 {expired ? 'Expired' : daysLeft(exp) + ' day(s) left'}</span>
                    <span>📱 {(c.device_ids || []).length}/{c.max_devices === 9999 ? '∞' : c.max_devices} devices</span>
                  </div>
                  {!expired && (
                    <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                      <button onClick={() => shareCode(c.code, plan)} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 8, border: '1px solid rgba(37,211,102,0.3)', background: 'transparent', color: '#25D366', cursor: 'pointer', fontFamily: 'inherit' }}>📲 WhatsApp</button>
                      <button onClick={() => handleRevoke(c.code)} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 8, border: '1px solid rgba(248,113,113,0.3)', background: 'transparent', color: '#f87171', cursor: 'pointer', fontFamily: 'inherit' }}>🚫 Revoke</button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================================
// STUDENT SCREENS
// ============================================================
function LandingScreen({ lang, t, onSelectPlan, onHaveCode }) {
  return (
    <div style={S.centered}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'linear-gradient(135deg,#4CAF50,#1B5E20)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, boxShadow: '0 0 20px rgba(76,175,80,0.4)' }}>🎓</div>
        <div>
          <div style={{ fontSize: 22, fontWeight: 'bold', color: '#4CAF50', letterSpacing: 1 }}>EduCam</div>
          <div style={{ fontSize: 10, color: '#555', letterSpacing: 3, textTransform: 'uppercase' }}>AI TUTOR · CAMEROON</div>
        </div>
      </div>
      <h1 style={S.hero}>{t.hero.split('\\n')[0]}<br />{t.hero.split('\\n')[1]}</h1>
      <p style={S.heroSub}>{t.heroSub.split('\\n')[0]}<br />{t.heroSub.split('\\n')[1]}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, width: '100%', marginBottom: 28 }}>
        {[{ icon: '🧠', tt: t.feat1t, d: t.feat1d }, { icon: '📋', tt: t.feat2t, d: t.feat2d }, { icon: '🌍', tt: t.feat3t, d: t.feat3d }, { icon: '⏰', tt: t.feat4t, d: t.feat4d }].map(f => (
          <div key={f.t} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 12, textAlign: 'center' }}>
            <div style={{ fontSize: 22, marginBottom: 4 }}>{f.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 'bold', color: '#4CAF50', marginBottom: 2 }}>{f.tt}</div>
            <div style={{ fontSize: 11, color: '#666' }}>{f.d}</div>
          </div>
        ))}
      </div>
      <button onClick={onSelectPlan} style={S.btnPrimary}>{t.btnPay}</button>
      <button onClick={onHaveCode} style={S.btnSecondary}>{t.btnCode}</button>

      {/* WhatsApp Manual Subscription */}
      <div style={{ width: '100%', marginTop: 8, background: 'rgba(37,211,102,0.07)', border: '1px solid rgba(37,211,102,0.25)', borderRadius: 14, padding: '14px 16px' }}>
        <div style={{ fontSize: 12, color: '#888', textAlign: 'center', marginBottom: 10 }}>{t.manualPay}</div>
        <a
          href="https://wa.me/237682613235?text=Hello%20EduCam%20Team!%20I%20would%20like%20to%20subscribe%20and%20get%20an%20access%20code.%20Please%20guide%20me."
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            background: 'linear-gradient(135deg,#128C7E,#25D366)',
            color: '#fff', borderRadius: 10, padding: '11px 16px',
            textDecoration: 'none', fontWeight: 'bold', fontSize: 14,
            boxShadow: '0 3px 14px rgba(37,211,102,0.3)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.522 5.849L.057 23.882l6.196-1.448A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.032-1.382l-.36-.214-3.733.872.938-3.638-.235-.374A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/>
          </svg>
          {t.contactWA}
        </a>
        <div style={{ fontSize: 11, color: '#666', textAlign: 'center', marginTop: 8 }}>{t.momoNote}</div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <span style={S.momoTag}>🟡 MTN MoMo</span>
        <span style={S.momoTag}>🟠 Orange Money</span>
      </div>
    </div>
  )
}

function PlanScreen({ lang, t, PLANS, onSelect, onBack }) {
  return (
    <div style={{ ...S.centered, maxWidth: 560 }}>
      <button onClick={onBack} style={S.backBtn}>{t.back}</button>
      <h2 style={S.sectionTitle}>{t.choosePlan}</h2>
      <p style={{ color: '#888', fontSize: 14, textAlign: 'center', marginBottom: 24 }}>{t.choosePlanSub}</p>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {PLANS.map(plan => (
          <button key={plan.id} onClick={() => onSelect(plan)} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '2px solid ' + plan.color + '33', borderRadius: 14, padding: '16px 18px', cursor: 'pointer', fontFamily: 'inherit', color: '#f0ead6', textAlign: 'left', transition: 'all 0.2s', position: 'relative' }}>
            {plan.badge && <span style={{ position: 'absolute', top: 10, right: 12, background: plan.color, color: '#fff', fontSize: 9, fontWeight: 'bold', letterSpacing: 1, padding: '2px 8px', borderRadius: 10 }}>{plan.badge}</span>}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', flexShrink: 0, background: plan.color + '20', border: '2px solid ' + plan.color + '40', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{plan.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 2 }}>
                  <span style={{ fontSize: 15, fontWeight: 'bold' }}>{plan.label}</span>
                  <span style={{ fontSize: 17, fontWeight: 'bold', color: plan.color }}>{plan.price.toLocaleString()} FCFA</span>
                </div>
                <div style={{ fontSize: 12, color: '#4CAF50', marginBottom: 2, fontWeight: 'bold' }}>{plan.desc}</div>
                <div style={{ fontSize: 11, color: '#555', lineHeight: 1.4 }}>{plan.detail}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Manual subscription via WhatsApp */}
      <a
        href="https://wa.me/237682613235?text=Hello%20EduCam%20Team!%20I%20would%20like%20to%20subscribe%20manually%20and%20get%20an%20access%20code.%20Please%20guide%20me."
        target="_blank"
        rel="noreferrer"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 16, background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.25)', borderRadius: 10, padding: '11px 16px', textDecoration: 'none', color: '#25D366', fontSize: 13, fontWeight: 'bold', width: '100%' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.522 5.849L.057 23.882l6.196-1.448A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.032-1.382l-.36-.214-3.733.872.938-3.638-.235-.374A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/></svg>
        {t.payManually}
      </a>
      <p style={{ color: '#555', fontSize: 11, textAlign: 'center', marginTop: 6 }}>{t.payManuallyNote}</p>
    </div>
  )
}

function PaymentScreen({ lang, t, plan, onSuccess, onBack }) {
  const [phone, setPhone] = useState('')
  const [network, setNetwork] = useState('')
  const [step, setStep] = useState('form')
  const [generatedCode, setGeneratedCode] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [countdown, setCountdown] = useState(90)
  const [copied, setCopied] = useState(false)
  const pollRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => () => { clearInterval(pollRef.current); clearInterval(timerRef.current) }, [])

  const handlePhoneChange = val => { setPhone(val); setNetwork(detectNetwork(val)) }

  const startPayment = async () => {
    if (phone.replace(/\D/g, '').length < 9) { setErrorMsg('Enter a valid Cameroonian phone number.'); return }
    setErrorMsg(''); setStep('waiting'); setCountdown(90)
    try {
      const token = await getCampayToken()
      const result = await initiatePayment(phone, plan, token)
      if (!result.reference) { setStep('error'); setErrorMsg('Could not start payment. Please try again.'); return }
      const { reference, code } = result
      setGeneratedCode(code)
      let ticks = 0
      timerRef.current = setInterval(() => { setCountdown(c => c - 1); if (++ticks >= 90) { clearInterval(timerRef.current); clearInterval(pollRef.current); setStep('error'); setErrorMsg('Payment timed out. Please try again.') } }, 1000)
      pollRef.current = setInterval(async () => {
        try {
          const status = await checkPaymentStatus(reference, token)
          if (status.status === 'SUCCESSFUL') {
            clearInterval(pollRef.current); clearInterval(timerRef.current)
            const expiresAt = Date.now() + plan.duration
            await apiCodes({ action: 'save', code, planId: plan.id, phone, note: '', source: 'campay', expiresAt, maxUses: 999999, maxDevices: plan.maxDevices })
            setStep('success')
          } else if (status.status === 'FAILED') { clearInterval(pollRef.current); clearInterval(timerRef.current); setStep('error'); setErrorMsg('Payment failed or rejected. Please try again.') }
        } catch (_) {}
      }, 4000)
    } catch (_) { setStep('error'); setErrorMsg('Network error. Check your connection and try again.') }
  }

  const copyCode = () => { navigator.clipboard && navigator.clipboard.writeText(generatedCode); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  const shareWhatsApp = () => { const msg = encodeURIComponent('🎓 *EduCam School Access Code*\n\nDear Students,\n\nYour school has purchased EduCam AI tutoring for you!\n\n🔑 Your code: *' + generatedCode + '*\n\n✅ ' + plan.desc + ' · All subjects\n\nEnter this code in the EduCam app to start.\n\nBonne chance! 🇨🇲'); window.open('https://wa.me/?text=' + msg, '_blank') }

  if (step === 'waiting') return (
    <div style={S.centered}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', border: '3px solid #4CAF50', animation: 'pulse 1.5s infinite', marginBottom: 16 }} />
      <div style={{ fontSize: 44, marginBottom: 12 }}>📱</div>
      <h2 style={S.sectionTitle}>{t.checkPhone}</h2>
      <p style={{ color: '#aaa', textAlign: 'center', lineHeight: 1.7, marginBottom: 6 }}>A prompt of <strong style={{ color: plan.color }}>{plan.price.toLocaleString()} FCFA</strong> was sent to <strong style={{ color: '#fff' }}>{phone}</strong> via <strong style={{ color: network === 'MTN' ? '#FFD700' : '#FF6600' }}>{network || 'Mobile Money'}</strong></p>
      <p style={{ color: '#666', fontSize: 13, marginBottom: 20 }}>Enter your PIN to confirm. ({countdown}s remaining)</p>
      <div style={S.waitingBar}><div style={{ ...S.waitingFill, width: (countdown / 90 * 100) + '%' }} /></div>
    </div>
  )
  if (step === 'success') return (
    <div style={S.centered}>
      <div style={{ fontSize: 54, marginBottom: 12 }}>🎉</div>
      <h2 style={{ ...S.sectionTitle, color: plan.color }}>{t.paymentConfirmed}</h2>
      <p style={{ color: '#aaa', textAlign: 'center', marginBottom: 8 }}>Your access code is:</p>
      <div style={{ ...S.codeBox, borderColor: plan.color, color: plan.color }}>{generatedCode}</div>
      <p style={{ color: '#4CAF50', fontSize: 13, textAlign: 'center', marginBottom: 6, fontWeight: 'bold' }}>✅ {plan.desc} — Come back as many times as you want!</p>
      {plan.id === 'school' ? (
        <>
          <p style={{ color: '#777', fontSize: 12, textAlign: 'center', marginBottom: 14 }}>Share this one code with ALL your students. Unlimited students · 30 days.</p>
          <div style={{ display: 'flex', gap: 8, width: '100%', marginBottom: 10 }}>
            <button onClick={copyCode} style={{ ...S.btnSecondary, flex: 1, marginBottom: 0 }}>{copied ? '✅ Copied!' : '📋 Copy Code'}</button>
            <button onClick={shareWhatsApp} style={{ ...S.btnSecondary, flex: 1, marginBottom: 0, borderColor: 'rgba(37,211,102,0.4)', color: '#25D366' }}>📲 WhatsApp</button>
          </div>
        </>
      ) : (
        <p style={{ color: '#777', fontSize: 11, textAlign: 'center', marginBottom: 16 }}>Works on up to 3 devices. Save your code safely.</p>
      )}
      <button onClick={() => onSuccess(generatedCode, plan.id)} style={{ ...S.btnPrimary, background: 'linear-gradient(135deg,' + plan.color + '99,' + plan.color + ')' }}>{t.startStudying}</button>
    </div>
  )
  if (step === 'error') return (
    <div style={S.centered}>
      <div style={{ fontSize: 52, marginBottom: 12 }}>⚠️</div>
      <h2 style={S.sectionTitle}>{t.paymentIssue}</h2>
      <p style={{ color: '#f87171', textAlign: 'center', marginBottom: 20 }}>{errorMsg}</p>
      <button onClick={() => setStep('form')} style={S.btnPrimary}>{t.tryAgain}</button>
      <button onClick={onBack} style={S.btnSecondary}>{t.back}</button>
    </div>
  )
  return (
    <div style={S.centered}>
      <button onClick={onBack} style={S.backBtn}>← Back</button>
      <div style={{ width: '100%', background: plan.color + '12', border: '1px solid ' + plan.color + '40', borderRadius: 12, padding: '14px 16px', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 24 }}>{plan.icon}</span>
          <div><div style={{ fontSize: 15, fontWeight: 'bold' }}>{plan.label}</div><div style={{ fontSize: 12, color: '#4CAF50' }}>{plan.desc}</div></div>
          <div style={{ marginLeft: 'auto', fontSize: 18, fontWeight: 'bold', color: plan.color }}>{plan.price.toLocaleString()} FCFA</div>
        </div>
      </div>
      <h2 style={S.sectionTitle}>{t.payWith}</h2>
      <p style={{ color: '#888', textAlign: 'center', marginBottom: 20, fontSize: 13 }}>{t.payWithSub}</p>
      <div style={{ width: '100%', marginBottom: 14 }}>
        <label style={S.inputLabel}>{t.momoNumber}</label>
        <div style={{ position: 'relative' }}>
          <input type="tel" placeholder="e.g. 677 123 456" value={phone} onChange={e => handlePhoneChange(e.target.value)} style={S.input} />
          {network && <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 11, fontWeight: 'bold', color: network === 'MTN' ? '#FFD700' : '#FF6600', background: 'rgba(0,0,0,0.5)', padding: '2px 8px', borderRadius: 10 }}>{network === 'MTN' ? '🟡 MTN' : '🟠 Orange'}</span>}
        </div>
      </div>
      {errorMsg && <p style={{ color: '#f87171', fontSize: 13, marginBottom: 10 }}>{errorMsg}</p>}
      <div style={{ width: '100%', background: 'rgba(76,175,80,0.08)', border: '1px solid rgba(76,175,80,0.2)', borderRadius: 10, padding: '12px 16px', marginBottom: 14, fontSize: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}><span style={{ color: '#888' }}>{plan.label}</span><span>{plan.price.toLocaleString()} FCFA</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 8 }}><span style={{ color: plan.color, fontWeight: 'bold' }}>Total</span><span style={{ color: plan.color, fontWeight: 'bold' }}>{plan.price.toLocaleString()} FCFA</span></div>
      </div>
      <button onClick={startPayment} style={{ ...S.btnPrimary, background: 'linear-gradient(135deg,' + plan.color + '99,' + plan.color + ')' }}>
        {network === 'MTN' ? '🟡' : network === 'Orange' ? '🟠' : '💳'} {t.sendPrompt}
      </button>
      <p style={{ color: '#555', fontSize: 11, textAlign: 'center', marginTop: 8 }}>{t.pinNote}</p>
    </div>
  )
}

function CodeEntryScreen({ lang, t, PLANS, onSuccess, onBack }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState(null)
  const [validating, setValidating] = useState(false)

  const previewPlan = val => {
    setCode(val.toUpperCase()); setError(''); setInfo(null)
    if (val.length >= 3) {
      const plan = getPlanFromCode(val.toUpperCase(), lang)
      if (plan) setInfo({ plan })
    }
  }

  const handleValidate = async () => {
    if (code.length < 9) return
    setValidating(true); setError('')
    try {
      const deviceId = getDeviceId()
      const res = await apiCodes({ action: 'validate', code: code.trim(), deviceId })
      if (res.valid) {
        onSuccess(code.trim().toUpperCase(), res.entry)
      } else {
        setError(res.reason)
      }
    } catch (e) { setError('Network error. Check your connection.') }
    setValidating(false)
  }

  return (
    <div style={S.centered}>
      <button onClick={onBack} style={S.backBtn}>{t.back}</button>
      <div style={{ fontSize: 44, marginBottom: 10 }}>🔑</div>
      <h2 style={S.sectionTitle}>{t.enterCode}</h2>
      <p style={{ color: '#888', textAlign: 'center', marginBottom: 8, fontSize: 13 }}>{t.enterCodeSub}</p>
      <div style={S.infoBox}>{t.unlimited}</div>
      <input type="text" placeholder="e.g. SCH-AB3K7P" value={code} onChange={e => previewPlan(e.target.value)} style={{ ...S.input, textAlign: 'center', fontSize: 20, letterSpacing: 4, fontWeight: 'bold', marginBottom: 8 }} maxLength={10} />
      {info && (
        <div style={{ width: '100%', background: info.plan.color + '15', border: '1px solid ' + info.plan.color + '40', borderRadius: 10, padding: '10px 14px', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>{info.plan.icon}</span>
            <div style={{ fontSize: 13, fontWeight: 'bold', color: info.plan.color }}>{info.plan.label} · {info.plan.desc}</div>
          </div>
        </div>
      )}
      {error && <p style={{ color: '#f87171', fontSize: 13, marginBottom: 8, textAlign: 'center' }}>{error}</p>}
      {code.length >= 9
        ? <button onClick={handleValidate} disabled={validating} style={{ ...S.btnPrimary, opacity: validating ? 0.7 : 1 }}>{validating ? '⏳ Checking...' : 'Unlock Session →'}</button>
        : <button disabled style={S.btnDisabled}>Enter your code above</button>
      }
      <p style={{ color: '#555', fontSize: 12, textAlign: 'center', marginTop: 8 }}>No code yet? <span onClick={onBack} style={{ color: '#4CAF50', cursor: 'pointer' }}>Buy a plan</span></p>

      <div style={{ width: '100%', marginTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16 }}>
        <p style={{ color: '#666', fontSize: 12, textAlign: 'center', marginBottom: 10 }}>{t.orContact}</p>
        <a
          href="https://wa.me/237682613235?text=Hello%20EduCam%20Team!%20I%20want%20to%20get%20an%20access%20code.%20I%20will%20pay%20manually%20via%20MoMo."
          target="_blank"
          rel="noreferrer"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'linear-gradient(135deg,#128C7E,#25D366)', color: '#fff', borderRadius: 10, padding: '11px 16px', textDecoration: 'none', fontWeight: 'bold', fontSize: 14, boxShadow: '0 3px 14px rgba(37,211,102,0.25)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.522 5.849L.057 23.882l6.196-1.448A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.032-1.382l-.36-.214-3.733.872.938-3.638-.235-.374A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/></svg>
          {t.waTeam}
        </a>
        <p style={{ color: '#555', fontSize: 11, textAlign: 'center', marginTop: 6 }}>{t.waNote}</p>
      </div>
    </div>
  )
}

function SelectorScreen({ lang, t, PLANS, SUBJECTS, planId, onStart, onBack }) {
  const [subject, setSubject] = useState(null)
  const [exam, setExam] = useState(null)
  const plan = PLANS.find(p => p.id === planId) || PLANS[0]
  return (
    <div style={{ width: '100%', maxWidth: 680, padding: '20px 24px 40px' }}>
      <button onClick={onBack} style={S.backBtn}>{t.back}</button>
      <div style={{ background: plan.color + '12', border: '1px solid ' + plan.color + '30', borderRadius: 10, padding: '10px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 18 }}>{plan.icon}</span>
        <span style={{ fontSize: 13, color: plan.color, fontWeight: 'bold' }}>{plan.label} {t.planActive}</span>
        <span style={{ fontSize: 12, color: '#666', marginLeft: 'auto' }}>{plan.desc}</span>
      </div>
      <h2 style={{ ...S.sectionTitle, textAlign: 'left', marginBottom: 4 }}>{t.accessVerified}</h2>
      <p style={{ color: '#888', fontSize: 13, marginBottom: 20 }}>{t.chooseExamSub}</p>
      <label style={S.inputLabel}>{t.chooseExam}</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
        {EXAMS.map(e => <button key={e} onClick={() => setExam(e)} style={{ ...S.tagBtn, borderColor: exam === e ? '#4CAF50' : 'rgba(255,255,255,0.12)', background: exam === e ? 'rgba(76,175,80,0.2)' : 'rgba(255,255,255,0.04)', color: exam === e ? '#4CAF50' : '#ccc', fontWeight: exam === e ? 'bold' : 'normal' }}>{e}</button>)}
      </div>
      <label style={S.inputLabel}>{t.chooseSubject}</label>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(130px,1fr))', gap: 10, marginBottom: 28 }}>
        {SUBJECTS.map(s => (
          <button key={s.id} onClick={() => setSubject(s.id)} style={{ padding: '12px 10px', borderRadius: 12, cursor: 'pointer', textAlign: 'left', border: subject === s.id ? '2px solid #4CAF50' : '2px solid rgba(255,255,255,0.08)', background: subject === s.id ? 'rgba(76,175,80,0.15)' : 'rgba(255,255,255,0.03)', color: '#f0ead6', fontFamily: 'inherit', transition: 'all 0.2s' }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 'bold', color: subject === s.id ? '#4CAF50' : '#f0ead6' }}>{s.label}</div>
          </button>
        ))}
      </div>
      {subject && exam ? <button onClick={() => onStart(subject, exam)} style={S.btnPrimary}>{t.startSession}</button> : <button disabled style={S.btnDisabled}>{t.selectFirst}</button>}
    </div>
  )
}

// ── Chat history helpers ─────────────────────────────────
function getHistoryKey(subject, exam) {
  return 'educam_history_' + subject + '_' + exam.replace(/[^a-zA-Z0-9]/g, '_')
}
function loadHistory(subject, exam) {
  try {
    const raw = localStorage.getItem(getHistoryKey(subject, exam))
    return raw ? JSON.parse(raw) : null
  } catch (_) { return null }
}
function saveHistory(subject, exam, messages) {
  try {
    // Keep max 200 messages per subject to avoid storage limits
    const trimmed = messages.slice(-200)
    localStorage.setItem(getHistoryKey(subject, exam), JSON.stringify(trimmed))
  } catch (_) {}
}
function clearHistory(subject, exam) {
  try { localStorage.removeItem(getHistoryKey(subject, exam)) } catch (_) {}
}

function ChatScreen({ lang, t, PLANS, SUBJECTS, subject, exam, planId, onEnd }) {
  const subj = SUBJECTS.find(s => s.id === subject)
  const plan = PLANS.find(p => p.id === planId) || PLANS[0]

  // Load saved history or start fresh
  const welcomeMsg = { role: 'assistant', content: lang === 'fr' ? '🎓 Bienvenue! Je suis ton tuteur IA EduCam pour **' + (subj?.label || '') + '** — niveau ' + exam + '.\n\nPose-moi n\'importe quelle question en Français ou en Anglais. Réussissons cet examen ensemble! 🇨🇲' : '🎓 Welcome! I am your EduCam AI tutor for **' + (subj?.label || '') + '** — ' + exam + ' level.\n\nAsk me anything in English or French. Let us pass this exam together! 🇨🇲' }
  const savedHistory = loadHistory(subject, exam)
  const [messages, setMessages] = useState(savedHistory && savedHistory.length > 0 ? savedHistory : [welcomeMsg])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const isReturning = savedHistory && savedHistory.length > 1
  const endRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll on new messages
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  // Save history whenever messages change
  useEffect(() => {
    if (messages.length > 0) saveHistory(subject, exam, messages)
  }, [messages, subject, exam])

  const send = async (text) => {
    const msgText = text || input.trim()
    if (!msgText || loading) return
    const newMsgs = [...messages, { role: 'user', content: msgText }]
    setMessages(newMsgs); setInput(''); setLoading(true); setRetryCount(0)

    const tryAsk = async (attempt) => {
      try {
        // Only send last 20 messages to API to keep costs low but maintain context
        const apiMsgs = newMsgs.slice(-20).map(m => ({ role: m.role, content: m.content }))
        const reply = await apiChat(
          apiMsgs,
          getSystemPrompt(lang, subj?.label || '', exam)
        )
        setMessages(prev => [...prev, { role: 'assistant', content: reply }])
        setRetryCount(0)
      } catch (err) {
        if (attempt < 2) {
          setRetryCount(attempt + 1)
          setTimeout(() => tryAsk(attempt + 1), 2000)
        } else {
          setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Error: ' + err.message + '. Please try again.' }])
        }
      }
    }
    await tryAsk(0)
    setLoading(false)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const handleClearHistory = () => {
    clearHistory(subject, exam)
    setMessages([welcomeMsg])
    setShowClearConfirm(false)
  }

  const fmt = t => t.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>')

  return (
    <div style={{ width: '100%', maxWidth: 680, flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px 10px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 18 }}>{subj?.icon || '🎓'}</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 'bold' }}>{subj?.label || ''}</div>
            <div style={{ fontSize: 11, color: plan.color }}>{exam} · {plan.label}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {isReturning && !showClearConfirm && (
            <button onClick={() => setShowClearConfirm(true)} style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.25)', borderRadius: 16, padding: '4px 10px', color: '#f87171', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit' }}>{t.clearHistory}</button>
          )}
          {showClearConfirm && (
            <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: '#f87171' }}>{t.clearConfirm}</span>
              <button onClick={handleClearHistory} style={{ background: '#f87171', border: 'none', borderRadius: 12, padding: '3px 10px', color: '#fff', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit' }}>{t.yes}</button>
              <button onClick={() => setShowClearConfirm(false)} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 12, padding: '3px 10px', color: '#aaa', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit' }}>{t.no}</button>
            </div>
          )}
          <button onClick={onEnd} style={{ ...S.backBtn, marginBottom: 0 }}>{t.changeSubject}</button>
        </div>
      </div>

      {/* Returning student banner */}
      {isReturning && (
        <div style={{ margin: '8px 20px 0', background: 'rgba(76,175,80,0.08)', border: '1px solid rgba(76,175,80,0.2)', borderRadius: 8, padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14 }}>📚</span>
          <div>
            <span style={{ fontSize: 12, color: '#4CAF50', fontWeight: 'bold' }}>{t.welcomeBack}</span>
            <span style={{ fontSize: 11, color: '#777' }}>{t.savedMessages.replace('{n}', messages.length - 1)}</span>
          </div>
        </div>
      )}

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 14, maxHeight: 'calc(100vh - 260px)' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: m.role === 'user' ? 'row-reverse' : 'row', gap: 8, alignItems: 'flex-start' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, background: m.role === 'user' ? 'linear-gradient(135deg,#1565C0,#42A5F5)' : 'linear-gradient(135deg,#2E7D32,#4CAF50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>{m.role === 'user' ? '👤' : '🎓'}</div>
            <div style={{ maxWidth: '78%', padding: '10px 14px', borderRadius: m.role === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px', background: m.role === 'user' ? 'rgba(21,101,192,0.25)' : 'rgba(255,255,255,0.06)', border: m.role === 'user' ? '1px solid rgba(66,165,245,0.2)' : '1px solid rgba(76,175,80,0.15)', fontSize: 14, lineHeight: 1.65, color: '#f0ead6' }} dangerouslySetInnerHTML={{ __html: fmt(m.content) }} />
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#2E7D32,#4CAF50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>🎓</div>
            <div style={{ padding: '12px 16px', borderRadius: '4px 16px 16px 16px', background: 'rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#4CAF50', animation: 'bounce 1.2s ' + (i*0.2) + 's infinite' }} />)}
              </div>
              {retryCount > 0 && <div style={{ fontSize: 10, color: '#888' }}>{t.retrying} ({retryCount}/2)</div>}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Quick prompts — only show on fresh chat */}
      {messages.length <= 1 && (
        <div style={{ padding: '0 20px 10px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {t.quickPrompts.map(p => (
            <button key={p} onClick={() => send(p)} style={{ background: 'rgba(76,175,80,0.1)', border: '1px solid rgba(76,175,80,0.25)', borderRadius: 20, padding: '5px 12px', fontSize: 12, color: '#4CAF50', cursor: 'pointer', fontFamily: 'inherit' }}>{p}</button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ padding: '10px 20px 20px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 8, alignItems: 'flex-end' }}>
        <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }} placeholder={t.askPlaceholder} rows={2} style={{ flex: 1, padding: '10px 14px', borderRadius: 10, fontSize: 14, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#f0ead6', fontFamily: 'inherit', resize: 'none', outline: 'none', lineHeight: 1.5 }} />
        <button onClick={() => send()} disabled={!input.trim() || loading} style={{ width: 44, height: 44, borderRadius: '50%', border: 'none', background: input.trim() && !loading ? 'linear-gradient(135deg,#2E7D32,#4CAF50)' : 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 18, cursor: input.trim() && !loading ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>→</button>
      </div>
    </div>
  )
}

// ============================================================
// MAIN APP
// ============================================================
// ============================================================
// 🌐 LANGUAGE PICKER SCREEN
// ============================================================
function LangPickerScreen({ onSelect }) {
  return (
    <div style={{ ...S.centered, justifyContent: 'center', minHeight: '80vh' }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg,#4CAF50,#1B5E20)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, boxShadow: '0 0 30px rgba(76,175,80,0.4)', marginBottom: 20 }}>🎓</div>
      <div style={{ fontSize: 26, fontWeight: 'bold', color: '#4CAF50', letterSpacing: 1, marginBottom: 4 }}>EduCam</div>
      <div style={{ fontSize: 11, color: '#555', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 32 }}>AI TUTOR · CAMEROON</div>
      <div style={{ fontSize: 17, color: '#f0ead6', fontWeight: 'bold', textAlign: 'center', marginBottom: 8 }}>Choose Your Language</div>
      <div style={{ fontSize: 13, color: '#666', textAlign: 'center', marginBottom: 28 }}>Choisir ta Langue</div>
      <div style={{ display: 'flex', gap: 16, width: '100%', maxWidth: 320 }}>
        <button onClick={() => onSelect('en')} style={{ flex: 1, padding: '18px 10px', borderRadius: 14, border: '2px solid rgba(76,175,80,0.4)', background: 'rgba(76,175,80,0.08)', color: '#f0ead6', fontFamily: 'inherit', cursor: 'pointer', fontSize: 15, fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, transition: 'all 0.2s' }}>
          <span style={{ fontSize: 32 }}>🇬🇧</span>
          <span>English</span>
        </button>
        <button onClick={() => onSelect('fr')} style={{ flex: 1, padding: '18px 10px', borderRadius: 14, border: '2px solid rgba(76,175,80,0.4)', background: 'rgba(76,175,80,0.08)', color: '#f0ead6', fontFamily: 'inherit', cursor: 'pointer', fontSize: 15, fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, transition: 'all 0.2s' }}>
          <span style={{ fontSize: 32 }}>🇫🇷</span>
          <span>Français</span>
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const [lang, setLang] = useState(getSavedLang)
  const [screen, setScreen] = useState('landing')
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [activePlanId, setActivePlanId] = useState(null)
  const [subject, setSubject] = useState(null)
  const [exam, setExam] = useState(null)
  const [logoTaps, setLogoTaps] = useState(0)
  const tapTimer = useRef(null)

  const handleLogoTap = () => {
    const n = logoTaps + 1; setLogoTaps(n); clearTimeout(tapTimer.current)
    if (n >= 5) { setLogoTaps(0); setScreen('adminLogin') }
    else tapTimer.current = setTimeout(() => setLogoTaps(0), 2000)
  }

  const handleLangSelect = (l) => { saveLang(l); setLang(l) }
  const toggleLang = () => { const l = lang === 'en' ? 'fr' : 'en'; saveLang(l); setLang(l) }

  // Show language picker first if no language saved
  if (!lang) return (
    <div style={S.page}>
      <div style={S.grid} />
      <LangPickerScreen onSelect={handleLangSelect} />
    </div>
  )

  const t = T[lang]
  const PLANS = getPlans(lang)
  const SUBJECTS = getSubjects(lang)

  return (
    <div style={S.page}>
      <div style={S.grid} />
      <header style={S.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', userSelect: 'none' }} onClick={handleLogoTap}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: screen === 'admin' ? 'linear-gradient(135deg,#FF6F00,#FFA000)' : 'linear-gradient(135deg,#4CAF50,#1B5E20)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, transition: 'all 0.3s' }}>
            {screen === 'admin' ? '🛠️' : '🎓'}
          </div>
          <span style={{ fontSize: 17, fontWeight: 'bold', color: screen === 'admin' ? '#FFA000' : '#4CAF50', letterSpacing: 1 }}>EduCam{screen === 'admin' ? ' Admin' : ''}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={toggleLang} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 16, padding: '4px 12px', color: '#f0ead6', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 'bold' }}>
            {t.switchLang} {lang === 'en' ? '🇫🇷' : '🇬🇧'}
          </button>
          <span style={{ background: 'rgba(76,175,80,0.15)', border: '1px solid rgba(76,175,80,0.3)', borderRadius: 20, padding: '3px 12px', fontSize: 11, color: '#4CAF50' }}>{t.fromPrice}</span>
        </div>
      </header>

      {screen === 'landing'    && <LandingScreen lang={lang} t={t} onSelectPlan={() => setScreen('plans')} onHaveCode={() => setScreen('codeEntry')} />}
      {screen === 'plans'      && <PlanScreen lang={lang} t={t} PLANS={PLANS} onSelect={p => { setSelectedPlan(p); setScreen('payment') }} onBack={() => setScreen('landing')} />}
      {screen === 'payment'    && <PaymentScreen lang={lang} t={t} plan={selectedPlan} onSuccess={(code, pid) => { setActivePlanId(pid); setScreen('selector') }} onBack={() => setScreen('plans')} />}
      {screen === 'codeEntry'  && <CodeEntryScreen lang={lang} t={t} PLANS={PLANS} onSuccess={(code, entry) => { setActivePlanId(entry.planId); setScreen('selector') }} onBack={() => setScreen('landing')} />}
      {screen === 'selector'   && <SelectorScreen lang={lang} t={t} PLANS={PLANS} SUBJECTS={SUBJECTS} planId={activePlanId} onStart={(s, e) => { setSubject(s); setExam(e); setScreen('chat') }} onBack={() => setScreen('landing')} />}
      {screen === 'chat'       && <ChatScreen lang={lang} t={t} PLANS={PLANS} SUBJECTS={SUBJECTS} subject={subject} exam={exam} planId={activePlanId} onEnd={() => setScreen('selector')} />}
      {screen === 'adminLogin' && <AdminLoginScreen t={t} onSuccess={() => setScreen('admin')} onBack={() => setScreen('landing')} />}
      {screen === 'admin'      && <AdminDashboard lang={lang} t={t} PLANS={PLANS} onBack={() => setScreen('landing')} />}

      <style>{`
        @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-6px)} }
        @keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.15);opacity:0.5} }
        input::placeholder,textarea::placeholder { color:#444 }
        input:focus,textarea:focus { border-color:rgba(76,175,80,0.4)!important }
        ::-webkit-scrollbar { width:4px }
        ::-webkit-scrollbar-thumb { background:rgba(76,175,80,0.3);border-radius:2px }
        button:hover { opacity:0.88 }
      `}</style>
    </div>
  )
}
