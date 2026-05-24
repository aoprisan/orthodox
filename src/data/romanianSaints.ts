import type { Saint } from '../types';

/**
 * Romanian saints absent from the calendar-ortodox.ro source that drives
 * fixedFeasts.ts + extendedSynaxarion.ts — chiefly the saints canonized by the
 * Holy Synod of the Romanian Orthodox Church in 2025–2026, plus other Romanian
 * commemorations that source omits. Compiled from doxologia.ro (Archdiocese of
 * Iași) per-day pages; dates and roles follow that source.
 *
 * Keyed by canonical liturgical "MM-DD" (same scheme as fixedFeasts.ts). These
 * merge into the day's principal (non-secondary) saints in lib/feasts.ts and
 * are deduplicated against the extended synaxarion there.
 *
 * Names are stored bilingually. The Romanian form is authoritative; English is
 * a rendering for EN-mode readers (these modern Romanian saints have no settled
 * English names — surnames are kept as-is).
 */
export const romanianSaints: Record<string, Saint[]> = {
  // ── 2025–2026 Romanian Synod canonizations + other Romanian saints ──
  '02-24': [
    { name: { en: 'St. Petroniu of Prodromu', ro: 'Sf. Cuv. Petroniu de la Prodromu' } },
  ],
  '03-08': [
    { name: { en: 'Hieromartyr Liviu Galaction of Cluj', ro: 'Sf. Sfințit Mc. Liviu-Galaction de la Cluj' } },
  ],
  '04-13': [
    { name: { en: 'St. Calinic of Cernica, Bishop of Râmnic', ro: 'Sf. Ier. Calinic de la Cernica' } },
    { name: { en: 'Martyr Sava of Buzău', ro: 'Sf. Mc. Sava de la Buzău' } },
    { name: { en: 'St. Philothea of Pasărea', ro: 'Sf. Cuv. Filofteia de la Pasărea' } },
  ],
  '04-14': [
    { name: { en: 'St. Pachomius of Gledin, Bishop of Roman', ro: 'Sf. Ier. Pahomie de la Gledin' } },
  ],
  '04-26': [
    { name: { en: 'Martyrs Cyril, Chindeus and Tasius of Axiopolis (Cernavodă)', ro: 'Sf. Mc. Chiril, Chindeu și Tasie din Axiopolis (Cernavodă)' } },
  ],
  '05-03': [
    { name: { en: 'St. Herodion of Lainici', ro: 'Sf. Cuv. Irodion de la Lainici' } },
  ],
  '05-05': [
    { name: { en: 'St. Matrona of Hurezi', ro: 'Sf. Cuv. Matrona de la Hurezi' } },
  ],
  '05-10': [
    { name: { en: 'St. Calistrat of Timișeni and Vasiova', ro: 'Sf. Cuv. Calistrat de la Timișeni și Vasiova' } },
  ],
  '05-16': [
    { name: { en: 'Sts. Silas, Paisius and Nathan of Sihăstria Putnei', ro: 'Sf. Cuv. Sila, Paisie și Natan de la Sihăstria Putnei' } },
  ],
  '05-24': [
    { name: { en: 'St. Blandina the Confessor of Iași', ro: 'Sf. Mărt. Blandina de la Iași' } },
  ],
  '06-04': [
    { name: { en: 'Martyrs Zoticus, Attalus, Camasis and Philip of Niculițel', ro: 'Sf. Mc. Zotic, Atal, Camasie și Filip de la Niculițel' } },
  ],
  '06-05': [
    { name: { en: 'St. Elizabeth of Pasărea', ro: 'Sf. Cuv. Elisabeta de la Pasărea' } },
  ],
  '07-04': [
    { name: { en: 'St. Olympias of Fărcașa', ro: 'Sf. Cuv. Olimpiada de la Fărcașa' } },
  ],
  '07-06': [
    { name: { en: 'St. Dometius the Merciful of Râmeț', ro: 'Sf. Cuv. Dometie cel Milostiv de la Râmeț' } },
  ],
  '07-21': [
    { name: { en: 'Sts. Raphael and Parthenius of Old Agapia', ro: 'Sf. Cuv. Rafael și Partenie de la Agapia Veche' } },
  ],
  '07-22': [
    { name: { en: 'St. Ilie Lăcătușu the Confessor', ro: 'Sf. Preot Mărt. Ilie Lăcătușu' } },
  ],
  '07-26': [
    { name: { en: 'St. Joanicius the New of Muscel', ro: 'Sf. Cuv. Ioanichie cel Nou de la Muscel' } },
  ],
  '08-03': [
    { name: { en: 'St. Heraclius the Confessor of Bessarabia', ro: 'Sf. Cuv. Mărt. Iraclie din Basarabia' } },
  ],
  '08-08': [
    { name: { en: 'Hieromartyr Alexander of Bessarabia', ro: 'Sf. Sfințit Mc. Alexandru din Basarabia' } },
  ],
  '08-16': [
    { name: { en: 'St. Joseph of Văratec', ro: 'Sf. Cuv. Iosif de la Văratec' } },
  ],
  '08-17': [
    { name: { en: 'Sts. Nazaria, Olympias and Elizabeth Brâncoveanu of Văratec', ro: 'Sf. Cuv. Nazaria, Olimpiada și Safta (Elisabeta) Brâncoveanu de la Văratec' } },
  ],
  '08-30': [
    { name: { en: 'St. John of Râșca and Secu, Bishop of Roman', ro: 'Sf. Ier. Ioan de la Râșca și Secu' } },
  ],
  '09-03': [
    { name: { en: 'Sts. Neophytus and Meletius of Stânișoara', ro: 'Sf. Cuv. Neofit și Meletie de la Stânișoara' } },
  ],
  '09-07': [
    { name: { en: 'Sts. Simeon and Amphilochius of Pângărați', ro: 'Sf. Cuv. Simeon și Amfilohie de la Pângărați' } },
  ],
  '09-09': [
    { name: { en: 'Sts. Onuphrius of Vorona and Cyriacus of Tazlău', ro: 'Sf. Cuv. Onufrie de la Vorona și Chiriac de la Tazlău' } },
  ],
  '09-16': [
    { name: { en: 'St. Sophian the Confessor of Antim', ro: 'Sf. Cuv. Mărt. Sofian de la Antim' } },
  ],
  '09-18': [
    { name: { en: 'Hieromartyr Ilarion Felea', ro: 'Sf. Sfințit Mc. Ilarion Felea' } },
  ],
  '09-26': [
    { name: { en: 'St. Platonida of Argeș', ro: 'Sf. Cuv. Platonida de la Argeș' } },
  ],
  '10-04': [
    { name: { en: 'St. Dumitru Stăniloae the Confessor', ro: 'Sf. Preot Mărt. Dumitru Stăniloae' } },
  ],
  '10-05': [
    { name: { en: 'Sts. Misael and Daniel of Turnu', ro: 'Sf. Cuv. Misail și Daniil de la Turnu' } },
  ],
  '10-15': [
    { name: { en: 'St. Magdalena of Mălainița', ro: 'Sf. Cuv. Magdalena de la Mălainița' } },
  ],
  '10-23': [
    { name: { en: 'Hieromartyr Constantin Sârbu', ro: 'Sf. Sfințit Mc. Constantin Sârbu' } },
  ],
  '11-10': [
    { name: { en: 'Venerable-Martyr Visarion of Lainici', ro: 'Sf. Cuv. Mc. Visarion de la Lainici' } },
  ],
  '11-12': [
    { name: { en: 'Martyrs of Năsăud (Atanasie Todoran and companions)', ro: 'Sf. Mc. Năsăudeni (Atanasie Todoran și cei împreună cu el)' } },
  ],
  '11-23': [
    { name: { en: 'St. Anthony of Iezerul Vâlcii', ro: 'Sf. Cuv. Antonie de la Iezerul Vâlcii' } },
  ],
  '11-28': [
    { name: { en: 'St. Arsenie the Confessor of Prislop', ro: 'Sf. Cuv. Mărt. Arsenie de la Prislop' } },
  ],
  '12-02': [
    { name: { en: 'St. Paisius of Sihăstria', ro: 'Sf. Cuv. Paisie de la Sihăstria' } },
    { name: { en: 'St. Cleopa of Sihăstria', ro: 'Sf. Cuv. Cleopa de la Sihăstria' } },
  ],
  '12-07': [
    { name: { en: 'Martyr Philothea of Curtea de Argeș', ro: 'Sf. Mc. Filofteia de la Curtea de Argeș' } },
  ],
  '12-19': [
    { name: { en: 'Venerable-Martyr Eulogia of Samurcășești', ro: 'Sf. Cuv. Mc. Evloghia de la Samurcășești' } },
  ],
  '12-20': [
    { name: { en: 'St. Seraphim the Patient of Sâmbăta de Sus', ro: 'Sf. Cuv. Serafim cel Răbdător de la Sâmbăta de Sus' } },
  ],
  '12-23': [
    { name: { en: 'St. Antonina of Tismana', ro: 'Sf. Cuv. Antonina de la Tismana' } },
  ],
  '12-26': [
    { name: { en: 'Venerable-Martyr Gherasim of Tismana', ro: 'Sf. Cuv. Mc. Gherasim de la Tismana' } },
  ],
};
