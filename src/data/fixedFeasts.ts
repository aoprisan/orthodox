import type { DayEntry } from '../types';
import { mmdd } from '../lib/julian';

/**
 * Synaxarion — daily commemorations keyed by canonical liturgical "MM-DD".
 * The same key is used under either calendar; the New/Old toggle only
 * shifts the civil date the entry shows up on.
 *
 * Romanian-first dataset; entries store names as `{ en, ro }` so both
 * languages render natively. Names + short titles only — no full
 * hagiographies. Curated from common Orthodox sources (Greek, Russian,
 * Romanian). Local feasts (parish patrons, regional saints) and minor
 * commemorations may need to be added by hand for a specific community.
 */
export const fixedFeasts: Record<string, DayEntry> = {
  // ═══════════════════════════════════════════════════════════════
  // JANUARY · IANUARIE
  // ═══════════════════════════════════════════════════════════════
  [mmdd(1, 1)]: {
    feasts: [{ name: { en: 'Circumcision of Our Lord', ro: 'Tăierea împrejur a Domnului' }, rank: 'major' }],
    saints: [
      { name: { en: 'St. Basil the Great', ro: 'Sf. Ier. Vasile cel Mare' }, title: { en: 'Archbishop of Caesarea (†379)', ro: 'Arhiepiscopul Cezareei Capadociei (†379)' } },
    ],
  },
  [mmdd(1, 2)]: {
    feasts: [{ name: { en: 'Forefeast of the Theophany', ro: 'Înainte-prăznuirea Botezului Domnului' }, rank: 'minor' }],
    saints: [
      { name: { en: 'St. Silvester, Pope of Rome', ro: 'Sf. Silvestru, Papa Romei' } },
      { name: { en: 'St. Seraphim of Sarov', ro: 'Sf. Cuv. Serafim de Sarov' } },
    ],
  },
  [mmdd(1, 3)]: {
    feasts: [],
    saints: [
      { name: { en: 'Holy Prophet Malachi', ro: 'Sf. Prooroc Maleahi' } },
      { name: { en: 'St. Gordius the Martyr', ro: 'Sf. Mc. Gordie' } },
    ],
  },
  [mmdd(1, 4)]: {
    feasts: [{ name: { en: 'Synaxis of the Seventy Apostles', ro: 'Soborul celor 70 de Apostoli' }, rank: 'minor' }],
    saints: [{ name: { en: 'St. Theoctistus of Cucumo', ro: 'Sf. Cuv. Teoctist' } }],
  },
  [mmdd(1, 5)]: {
    feasts: [{ name: { en: 'Eve of the Theophany', ro: 'Ajunul Botezului Domnului' }, rank: 'minor' }],
    saints: [
      { name: { en: 'Sts. Theopemptus and Theonas', ro: 'Sf. Mc. Teopempt și Teona' } },
      { name: { en: 'St. Syncletica of Alexandria', ro: 'Sf. Cuv. Sincletichia' } },
    ],
  },
  [mmdd(1, 6)]: {
    feasts: [{ name: { en: 'Theophany — Holy Baptism of the Lord', ro: 'Botezul Domnului — Boboteaza' }, rank: 'great', about: { en: 'Christ is baptized by John the Forerunner in the river Jordan, and the Holy Trinity is made manifest: the Father’s voice from heaven, the Son in the water, and the Spirit descending as a dove. On this day the Church blesses the waters in remembrance of the sanctifying of all creation.', ro: 'Hristos este botezat de Ioan Înaintemergătorul în râul Iordan, iar Sfânta Treime Se descoperă: glasul Tatălui din cer, Fiul în apă și Duhul pogorându-Se ca un porumbel. În această zi Biserica sfințește apele, spre pomenirea sfințirii întregii făpturi.' } }],
    saints: [],
  },
  [mmdd(1, 7)]: {
    feasts: [{ name: { en: 'Synaxis of the Holy Forerunner John the Baptist', ro: 'Soborul Sf. Prooroc Ioan Botezătorul' }, rank: 'major' }],
    saints: [],
  },
  [mmdd(1, 8)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. George the Chozebite', ro: 'Sf. Cuv. Gheorghe Hozevitul' } },
      { name: { en: 'St. Domnica', ro: 'Sf. Cuv. Domnița' } },
    ],
  },
  [mmdd(1, 9)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Polyeuctus the Martyr', ro: 'Sf. Mc. Polieuct' } },
      { name: { en: 'St. Eustratius the Wonderworker', ro: 'Sf. Cuv. Eustratie' } },
    ],
  },
  [mmdd(1, 10)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Gregory of Nyssa', ro: 'Sf. Ier. Grigorie, Episcopul Nisei' } },
      { name: { en: 'St. Dometian, Bishop of Melitene', ro: 'Sf. Dometian, Episcopul Melitinei' } },
    ],
  },
  [mmdd(1, 11)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Theodosius the Cenobiarch', ro: 'Sf. Cuv. Teodosie cel Mare' } },
      { name: { en: 'St. Vitalius', ro: 'Sf. Cuv. Vitalie' } },
    ],
  },
  [mmdd(1, 12)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Tatiana the Martyr', ro: 'Sf. Muceniță Tatiana' } },
      { name: { en: 'St. Mertius the Martyr', ro: 'Sf. Mc. Mertios' } },
    ],
  },
  [mmdd(1, 13)]: {
    feasts: [],
    saints: [
      { name: { en: 'Sts. Hermylus and Stratonicus', ro: 'Sf. Mc. Ermil și Stratonic' } },
      { name: { en: 'St. James of Nisibis', ro: 'Sf. Iacob de Nisibe' } },
    ],
  },
  [mmdd(1, 14)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Nina, Equal-to-the-Apostles', ro: 'Sf. Cuv. Nina, luminătoarea Georgiei' } },
      { name: { en: 'Holy Fathers slain at Sinai and Raithu', ro: 'Sf. Părinți uciși în Sinai și Rait' } },
    ],
  },
  [mmdd(1, 15)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Paul of Thebes', ro: 'Sf. Cuv. Pavel Tebeul' } },
      { name: { en: 'St. John Kalybites', ro: 'Sf. Cuv. Ioan Colibașul' } },
    ],
  },
  [mmdd(1, 16)]: {
    feasts: [{ name: { en: 'Veneration of the Chains of the Holy Apostle Peter', ro: 'Cinstirea lanțului Sf. Ap. Petru' }, rank: 'minor' }],
    saints: [{ name: { en: 'Sts. Peusippus, Eleusippus, and Meleusippus', ro: 'Sf. Mc. Peusip, Eleusip și Meleusip' } }],
  },
  [mmdd(1, 17)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Anthony the Great', ro: 'Sf. Cuv. Antonie cel Mare' }, title: { en: 'Father of Monasticism (†356)', ro: 'Părintele monahismului (†356)' } }],
  },
  [mmdd(1, 18)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Athanasius the Great', ro: 'Sf. Ier. Atanasie cel Mare' }, title: { en: 'Patriarch of Alexandria', ro: 'Patriarhul Alexandriei' } },
      { name: { en: 'St. Cyril', ro: 'Sf. Ier. Chiril' }, title: { en: 'Patriarch of Alexandria', ro: 'Patriarhul Alexandriei' } },
    ],
  },
  [mmdd(1, 19)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Macarius the Great of Egypt', ro: 'Sf. Cuv. Macarie cel Mare' } },
      { name: { en: 'St. Mark, Metropolitan of Ephesus', ro: 'Sf. Marcu, Mitropolitul Efesului' } },
    ],
  },
  [mmdd(1, 20)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Euthymius the Great', ro: 'Sf. Cuv. Eftimie cel Mare' } }],
  },
  [mmdd(1, 21)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Maximus the Confessor', ro: 'Sf. Cuv. Maxim Mărturisitorul' } },
      { name: { en: 'St. Neophytus the Martyr', ro: 'Sf. Mc. Neofit' } },
    ],
  },
  [mmdd(1, 22)]: {
    feasts: [],
    saints: [
      { name: { en: 'Holy Apostle Timothy', ro: 'Sf. Ap. Timotei' } },
      { name: { en: 'St. Anastasius the Persian', ro: 'Sf. Cuv. Mc. Anastasie Persul' } },
    ],
  },
  [mmdd(1, 23)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Clement, Bishop of Ancyra', ro: 'Sf. sfințit Mc. Clement, Episcopul Ancirei' } },
      { name: { en: 'St. Agathangelus the Martyr', ro: 'Sf. Mc. Agatanghel' } },
    ],
  },
  [mmdd(1, 24)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Xenia of Rome', ro: 'Sf. Cuv. Xenia Romana' } },
      { name: { en: 'St. Xenia of St. Petersburg', ro: 'Sf. Cuv. Xenia din Sankt Petersburg' }, title: { en: 'Fool-for-Christ', ro: 'cea nebună pentru Hristos' } },
    ],
  },
  [mmdd(1, 25)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Gregory the Theologian', ro: 'Sf. Ier. Grigorie Teologul' }, title: { en: 'Archbishop of Constantinople', ro: 'Arhiepiscopul Constantinopolului' } }],
  },
  [mmdd(1, 26)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Xenophon, his wife Mary and their sons', ro: 'Sf. Cuv. Xenofont, soția Maria și fiii săi' } }],
  },
  [mmdd(1, 27)]: {
    feasts: [{ name: { en: 'Translation of the Relics of St. John Chrysostom', ro: 'Aducerea moaștelor Sf. Ioan Gură de Aur' }, rank: 'minor' }],
    saints: [],
  },
  [mmdd(1, 28)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Ephrem the Syrian', ro: 'Sf. Cuv. Efrem Sirul' } },
      { name: { en: 'St. Isaac the Syrian', ro: 'Sf. Cuv. Isaac Sirul' } },
    ],
  },
  [mmdd(1, 29)]: {
    feasts: [{ name: { en: 'Translation of the Relics of St. Ignatius the God-Bearer', ro: 'Aducerea moaștelor Sf. sfințit Mc. Ignatie Teoforul' }, rank: 'minor' }],
    saints: [],
  },
  [mmdd(1, 30)]: {
    feasts: [{ name: { en: 'Synaxis of the Three Holy Hierarchs', ro: 'Soborul Sf. Trei Ierarhi' }, rank: 'major' }],
    saints: [
      { name: { en: 'St. Basil the Great', ro: 'Sf. Vasile cel Mare' } },
      { name: { en: 'St. Gregory the Theologian', ro: 'Sf. Grigorie Teologul' } },
      { name: { en: 'St. John Chrysostom', ro: 'Sf. Ioan Gură de Aur' } },
    ],
  },
  [mmdd(1, 31)]: {
    feasts: [],
    saints: [{ name: { en: 'Holy Unmercenaries Cyrus and John', ro: 'Sf. doctori fără de arginți Chir și Ioan' } }],
  },

  // ═══════════════════════════════════════════════════════════════
  // FEBRUARY · FEBRUARIE
  // ═══════════════════════════════════════════════════════════════
  [mmdd(2, 1)]: {
    feasts: [{ name: { en: 'Forefeast of the Meeting of the Lord', ro: 'Înainte-prăznuirea Întâmpinării Domnului' }, rank: 'minor' }],
    saints: [{ name: { en: 'St. Tryphon the Martyr', ro: 'Sf. Mc. Trifon' } }],
  },
  [mmdd(2, 2)]: {
    feasts: [{ name: { en: 'Meeting of Our Lord in the Temple', ro: 'Întâmpinarea Domnului' }, rank: 'great', about: { en: 'Forty days after His birth, the infant Christ is brought to the Temple, where the righteous elder Symeon receives Him in his arms and the prophetess Anna gives thanks. Symeon’s words, "Now lettest Thou Thy servant depart in peace," greet the Lord as the Light of revelation to the nations.', ro: 'La patruzeci de zile de la naștere, Pruncul Hristos este adus la Templu, unde dreptul bătrân Simeon Îl primește în brațe, iar proorocița Ana mulțumește lui Dumnezeu. Cuvintele lui Simeon, „Acum slobozește pe robul Tău, Stăpâne", întâmpină pe Domnul ca Lumină spre descoperirea neamurilor.' } }],
    saints: [],
  },
  [mmdd(2, 3)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Simeon the God-Receiver', ro: 'Sf. și Drept Simeon, primitorul de Dumnezeu' } },
      { name: { en: 'St. Anna the Prophetess', ro: 'Sf. Prooroaca Ana' } },
    ],
  },
  [mmdd(2, 4)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Isidore of Pelusium', ro: 'Sf. Cuv. Isidor Pelusiotul' } },
      { name: { en: 'St. Nicholas the Confessor', ro: 'Sf. Cuv. Nicolae Mărturisitorul' } },
    ],
  },
  [mmdd(2, 5)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Agatha the Martyr', ro: 'Sf. Muceniță Agata' } },
      { name: { en: 'St. Theodula the Martyr', ro: 'Sf. Muceniță Teodula' } },
    ],
  },
  [mmdd(2, 6)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Bucolus, Bishop of Smyrna', ro: 'Sf. Cuv. Vucol, Episcopul Smirnei' } },
      { name: { en: 'St. Photius the Great', ro: 'Sf. Fotie cel Mare, Patriarhul Constantinopolului' } },
    ],
  },
  [mmdd(2, 7)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Parthenius, Bishop of Lampsacus', ro: 'Sf. Partenie, Episcopul Lampsacului' } },
      { name: { en: 'St. Luke of Hellas', ro: 'Sf. Cuv. Luca din Elada' } },
    ],
  },
  [mmdd(2, 8)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Theodore the Commander', ro: 'Sf. Mare Mc. Teodor Stratilat' } },
      { name: { en: 'Holy Prophet Zechariah', ro: 'Sf. Prooroc Zaharia' } },
    ],
  },
  [mmdd(2, 9)]: {
    feasts: [{ name: { en: 'Leave-taking of the Meeting of the Lord', ro: 'Odovania Întâmpinării Domnului' }, rank: 'minor' }],
    saints: [{ name: { en: 'St. Nicephorus the Martyr', ro: 'Sf. Mc. Nichifor' } }],
  },
  [mmdd(2, 10)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Charalampus the Hieromartyr', ro: 'Sf. sfințit Mc. Haralambie' } }],
  },
  [mmdd(2, 11)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Blaise, Bishop of Sebaste', ro: 'Sf. sfințit Mc. Vlasie, Episcopul Sevastiei' } },
      { name: { en: 'St. Theodora the Empress', ro: 'Sf. Teodora împărăteasa' } },
    ],
  },
  [mmdd(2, 12)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Meletius, Archbishop of Antioch', ro: 'Sf. Meletie, Arhiepiscopul Antiohiei' } }],
  },
  [mmdd(2, 13)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Martinian', ro: 'Sf. Cuv. Martinian' } },
      { name: { en: 'Sts. Aquila and Priscilla', ro: 'Sf. Ap. Acvila și Priscila' } },
    ],
  },
  [mmdd(2, 14)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Auxentius', ro: 'Sf. Cuv. Auxenție' } },
      { name: { en: 'St. Maro the Hermit', ro: 'Sf. Cuv. Maron' } },
    ],
  },
  [mmdd(2, 15)]: {
    feasts: [],
    saints: [{ name: { en: 'Holy Apostle Onesimus', ro: 'Sf. Ap. Onisim' } }],
  },
  [mmdd(2, 16)]: {
    feasts: [],
    saints: [
      { name: { en: 'Sts. Pamphilus and Valentine', ro: 'Sf. Mc. Pamfil și Valentin' } },
      { name: { en: 'St. Porphyrius the Martyr', ro: 'Sf. Mc. Porfirie' } },
    ],
  },
  [mmdd(2, 17)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Theodore the Tyro', ro: 'Sf. Mare Mc. Teodor Tiron' } },
      { name: { en: 'St. Marina', ro: 'Sf. Cuv. Marin' } },
    ],
  },
  [mmdd(2, 18)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Leo the Great, Pope of Rome', ro: 'Sf. Leon cel Mare, Papa Romei' } }],
  },
  [mmdd(2, 19)]: {
    feasts: [],
    saints: [
      { name: { en: 'Sts. Archippus, Philemon, and Apphia', ro: 'Sf. Ap. Arhip, Filimon și Apfia' } },
    ],
  },
  [mmdd(2, 20)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Leo, Bishop of Catania', ro: 'Sf. Cuv. Leon, Episcopul Cataniei' } }],
  },
  [mmdd(2, 21)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Timothy of Symbola', ro: 'Sf. Cuv. Timotei din Simboleon' } },
      { name: { en: 'St. Eustathius, Archbishop of Antioch', ro: 'Sf. Eustatie, Arhiepiscopul Antiohiei' } },
    ],
  },
  [mmdd(2, 22)]: {
    feasts: [{ name: { en: 'Uncovering of the Relics of the Holy Martyrs of Eugenius', ro: 'Aflarea moaștelor Sf. Mucenici din Evghenia' }, rank: 'minor' }],
    saints: [],
  },
  [mmdd(2, 23)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Polycarp, Bishop of Smyrna', ro: 'Sf. sfințit Mc. Policarp, Episcopul Smirnei' } }],
  },
  [mmdd(2, 24)]: {
    feasts: [{ name: { en: 'First and Second Finding of the Head of St. John the Baptist', ro: 'Întâia și a doua aflare a Capului Sf. Ioan Botezătorul' }, rank: 'major' }],
    saints: [],
  },
  [mmdd(2, 25)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Tarasius, Archbishop of Constantinople', ro: 'Sf. Tarasie, Arhiepiscopul Constantinopolului' } }],
  },
  [mmdd(2, 26)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Porphyrius, Bishop of Gaza', ro: 'Sf. Porfirie, Episcopul Gazei' } }],
  },
  [mmdd(2, 27)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Procopius of Decapolis', ro: 'Sf. Cuv. Procopie Decapolitul' } }],
  },
  [mmdd(2, 28)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Basil the Confessor', ro: 'Sf. Cuv. Vasile Mărturisitorul' } },
      { name: { en: 'St. Cassian the Roman', ro: 'Sf. Cuv. Casian Romanul' }, title: { en: 'commemorated Feb 28 in non-leap years', ro: 'pomenit la 28 februarie în anii nebisecți' } },
    ],
  },
  [mmdd(2, 29)]: {
    feasts: [],
    saints: [{ name: { en: 'St. John Cassian the Roman', ro: 'Sf. Cuv. Casian Romanul' }, title: { en: 'commemorated on leap years', ro: 'pomenit în anii bisecți' } }],
  },

  // ═══════════════════════════════════════════════════════════════
  // MARCH · MARTIE
  // ═══════════════════════════════════════════════════════════════
  [mmdd(3, 1)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Eudokia the Martyr', ro: 'Sf. Muceniță Evdochia' } }],
  },
  [mmdd(3, 2)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Theodotus, Bishop of Cyrene', ro: 'Sf. sfințit Mc. Teodot, Episcopul Cirenei' } }],
  },
  [mmdd(3, 3)]: {
    feasts: [],
    saints: [{ name: { en: 'Sts. Eutropius, Cleonicus, and Basiliscus', ro: 'Sf. Mc. Eutropie, Cleonic și Vasilisc' } }],
  },
  [mmdd(3, 4)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Gerasimus of the Jordan', ro: 'Sf. Cuv. Gherasim de la Iordan' } }],
  },
  [mmdd(3, 5)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Conon of Isauria', ro: 'Sf. Mc. Conon din Isauria' } }],
  },
  [mmdd(3, 6)]: {
    feasts: [],
    saints: [{ name: { en: 'The Holy 42 Martyrs of Amorion', ro: 'Sf. 42 de Mucenici din Amoreea' } }],
  },
  [mmdd(3, 7)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Ephraim of Tomis', ro: 'Sf. sfințit Mc. Efrem de Tomis' }, title: { en: 'first attested martyr-bishop on Romanian soil', ro: 'cel dintâi martir-ierarh de pe pământ românesc' } },
      { name: { en: 'The Holy Hieromartyrs of Cherson', ro: 'Sf. sfințiți Mc. din Cherson' } },
    ],
  },
  [mmdd(3, 8)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Theophylact, Bishop of Nicomedia', ro: 'Sf. Teofilact Mărturisitorul, Episcopul Nicomidiei' } }],
  },
  [mmdd(3, 9)]: {
    feasts: [{ name: { en: 'The Holy Forty Martyrs of Sebaste', ro: 'Sf. 40 de Mucenici din Sevasta' }, rank: 'major' }],
    saints: [],
  },
  [mmdd(3, 10)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Codratus the Martyr', ro: 'Sf. Mc. Codrat' } }],
  },
  [mmdd(3, 11)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Sophronius, Patriarch of Jerusalem', ro: 'Sf. Sofronie, Patriarhul Ierusalimului' } }],
  },
  [mmdd(3, 12)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Theophanes the Confessor', ro: 'Sf. Cuv. Teofan Mărturisitorul' } },
      { name: { en: 'St. Gregory Dialogus, Pope of Rome', ro: 'Sf. Grigorie Dialogul, Papa Romei' } },
    ],
  },
  [mmdd(3, 13)]: {
    feasts: [{ name: { en: 'Translation of the Relics of St. Nicephorus the Confessor', ro: 'Mutarea moaștelor Sf. Nichifor Mărturisitorul' }, rank: 'minor' }],
    saints: [],
  },
  [mmdd(3, 14)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Benedict of Nursia', ro: 'Sf. Cuv. Benedict de Nursia' } }],
  },
  [mmdd(3, 15)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Agapius the Martyr', ro: 'Sf. Mc. Agapie' } }],
  },
  [mmdd(3, 16)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Sabinus the Egyptian Martyr', ro: 'Sf. Mc. Sabin Egipteanul' } }],
  },
  [mmdd(3, 17)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Alexius, the Man of God', ro: 'Sf. Cuv. Alexie, omul lui Dumnezeu' } }],
  },
  [mmdd(3, 18)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Cyril, Archbishop of Jerusalem', ro: 'Sf. Chiril, Arhiepiscopul Ierusalimului' } }],
  },
  [mmdd(3, 19)]: {
    feasts: [],
    saints: [{ name: { en: 'Sts. Chrysanthus and Daria', ro: 'Sf. Mc. Hrisant și Daria' } }],
  },
  [mmdd(3, 20)]: {
    feasts: [],
    saints: [{ name: { en: 'Holy Fathers slain at the Monastery of St. Sabbas', ro: 'Sf. Părinți uciși în Mănăstirea Sf. Sava' } }],
  },
  [mmdd(3, 21)]: {
    feasts: [],
    saints: [{ name: { en: 'St. James the Confessor, Bishop of Catania', ro: 'Sf. Iacob Mărturisitorul, Episcopul Cataniei' } }],
  },
  [mmdd(3, 22)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Basil of Ancyra, Hieromartyr', ro: 'Sf. sfințit Mc. Vasile din Ancira' } }],
  },
  [mmdd(3, 23)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Nicon the Hieromartyr and his 199 disciples', ro: 'Sf. sfințit Mc. Nicon și 199 de ucenici ai săi' } }],
  },
  [mmdd(3, 24)]: {
    feasts: [{ name: { en: 'Forefeast of the Annunciation', ro: 'Înainte-prăznuirea Bunei Vestiri' }, rank: 'minor' }],
    saints: [{ name: { en: 'St. Zacharias the Hermit', ro: 'Sf. Cuv. Zaharia' } }],
  },
  [mmdd(3, 25)]: {
    feasts: [{ name: { en: 'Annunciation to the Most Holy Theotokos', ro: 'Buna Vestire' }, rank: 'great', about: { en: 'The Archangel Gabriel is sent to Nazareth to announce to the Virgin Mary that she will conceive and bear the Son of God. By her humble answer, "Behold the handmaid of the Lord; be it unto me according to thy word," the Word becomes flesh and our salvation begins.', ro: 'Arhanghelul Gavriil este trimis în Nazaret ca să vestească Fecioarei Maria că va zămisli și va naște pe Fiul lui Dumnezeu. Prin răspunsul ei smerit, „Iată roaba Domnului, fie mie după cuvântul tău", Cuvântul Se face trup și începe mântuirea noastră.' } }],
    saints: [],
  },
  [mmdd(3, 26)]: {
    feasts: [{ name: { en: 'Synaxis of the Archangel Gabriel', ro: 'Soborul Sf. Arhanghel Gavriil' }, rank: 'major' }],
    saints: [],
  },
  [mmdd(3, 27)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Matrona of Thessaloniki', ro: 'Sf. Muceniță Matrona din Tesalonic' } }],
  },
  [mmdd(3, 28)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Hilarion the New', ro: 'Sf. Cuv. Ilarion cel Nou' } },
      { name: { en: 'St. Stephen the Wonderworker', ro: 'Sf. Cuv. Ștefan Mărturisitorul' } },
    ],
  },
  [mmdd(3, 29)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Mark, Bishop of Arethusa, and St. Cyril the Deacon', ro: 'Sf. sfințit Mc. Marcu, Episcopul Aretuselor și Chiril Diaconul' } }],
  },
  [mmdd(3, 30)]: {
    feasts: [],
    saints: [{ name: { en: 'St. John of the Ladder', ro: 'Sf. Cuv. Ioan Scărarul' } }],
  },
  [mmdd(3, 31)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Hypatius, Bishop of Gangra', ro: 'Sf. sfințit Mc. Ipatie, Episcopul Gangrelor' } }],
  },

  // ═══════════════════════════════════════════════════════════════
  // APRIL · APRILIE
  // ═══════════════════════════════════════════════════════════════
  [mmdd(4, 1)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Mary of Egypt', ro: 'Sf. Cuv. Maria Egipteanca' } }],
  },
  [mmdd(4, 2)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Titus the Wonderworker', ro: 'Sf. Cuv. Tit Făcătorul de Minuni' } }],
  },
  [mmdd(4, 3)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Nicetas the Confessor', ro: 'Sf. Cuv. Nichita Mărturisitorul' } }],
  },
  [mmdd(4, 4)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Joseph the Hymnographer', ro: 'Sf. Cuv. Iosif Imnograful' } },
      { name: { en: 'St. George of Maleon', ro: 'Sf. Cuv. Gheorghe din Maleon' } },
    ],
  },
  [mmdd(4, 5)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Theodulus the Martyr', ro: 'Sf. Mc. Teodul' } },
      { name: { en: 'St. Mark of Athens', ro: 'Sf. Cuv. Marcu cel Mare' } },
    ],
  },
  [mmdd(4, 6)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Eutychius, Archbishop of Constantinople', ro: 'Sf. Eutihie, Arhiepiscopul Constantinopolului' } }],
  },
  [mmdd(4, 7)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Calliopius the Martyr', ro: 'Sf. Mc. Calliopie' } },
      { name: { en: 'St. George the Confessor, Bishop of Mytilene', ro: 'Sf. Gheorghe Mărturisitorul, Episcopul Mitilenei' } },
    ],
  },
  [mmdd(4, 8)]: {
    feasts: [],
    saints: [{ name: { en: 'Holy Apostles Herodion, Agabus, Rufus, Asyncritus, Phlegon, and Hermes', ro: 'Sf. Ap. Irodion, Agav, Ruf, Asincrit, Flegon și Ermes (din cei 70)' } }],
  },
  [mmdd(4, 9)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Eupsychius the Martyr', ro: 'Sf. Mc. Eupsihie' } }],
  },
  [mmdd(4, 10)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Terence the Martyr', ro: 'Sf. Mc. Terentie' } },
      { name: { en: 'St. Maximus', ro: 'Sf. Cuv. Maxim' } },
    ],
  },
  [mmdd(4, 11)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Antipas, Bishop of Pergamum', ro: 'Sf. sfințit Mc. Antipa, Episcopul Pergamului' } },
      { name: { en: 'St. Callinicus of Cernica', ro: 'Sf. Ier. Calinic de la Cernica' }, title: { en: 'Bishop of Râmnic (†1868)', ro: 'Episcopul Râmnicului (†1868)' } },
    ],
  },
  [mmdd(4, 12)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Basil the Confessor, Bishop of Parium', ro: 'Sf. Cuv. Vasile Mărturisitorul, Episcopul Pariei' } }],
  },
  [mmdd(4, 13)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Artemon the Hieromartyr', ro: 'Sf. sfințit Mc. Artemon' } }],
  },
  [mmdd(4, 14)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Martin the Confessor, Pope of Rome', ro: 'Sf. Martin Mărturisitorul, Papa Romei' } }],
  },
  [mmdd(4, 15)]: {
    feasts: [],
    saints: [{ name: { en: 'Holy Apostles Aristarchus, Pudens, and Trophimus', ro: 'Sf. Ap. Aristarh, Pud și Trofim (din cei 70)' } }],
  },
  [mmdd(4, 16)]: {
    feasts: [],
    saints: [{ name: { en: 'Sts. Agape, Chionia, and Irene', ro: 'Sf. Mucenițe Agapia, Hionia și Irina' } }],
  },
  [mmdd(4, 17)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Simeon, Bishop in Persia', ro: 'Sf. sfințit Mc. Simeon, Episcopul Persiei' } }],
  },
  [mmdd(4, 18)]: {
    feasts: [],
    saints: [{ name: { en: 'St. John, disciple of St. Gregory of Decapolis', ro: 'Sf. Cuv. Ioan, ucenicul Sf. Grigorie Decapolitul' } }],
  },
  [mmdd(4, 19)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Paphnutius the Hieromartyr', ro: 'Sf. sfințit Mc. Pafnutie' } }],
  },
  [mmdd(4, 20)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Theodore Trichinas', ro: 'Sf. Cuv. Teodor Trihina' } }],
  },
  [mmdd(4, 21)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Januarius the Hieromartyr', ro: 'Sf. sfințit Mc. Ianuarie' } },
      { name: { en: 'St. Alexandra the Empress', ro: 'Sf. Mc. Alexandra împărăteasa' } },
    ],
  },
  [mmdd(4, 22)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Theodore of Sykeon', ro: 'Sf. Cuv. Teodor Sicheotul' } }],
  },
  [mmdd(4, 23)]: {
    feasts: [],
    saints: [{ name: { en: 'St. George the Great-Martyr', ro: 'Sf. Mare Mc. Gheorghe' }, title: { en: 'the Trophy-bearer', ro: 'purtătorul de biruință' } }],
  },
  [mmdd(4, 24)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Sabbas Stratelates the Martyr', ro: 'Sf. Mc. Sava Stratilat' } }],
  },
  [mmdd(4, 25)]: {
    feasts: [],
    saints: [{ name: { en: 'Holy Apostle and Evangelist Mark', ro: 'Sf. Ap. și Ev. Marcu' } }],
  },
  [mmdd(4, 26)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Basil, Bishop of Amasea, Hieromartyr', ro: 'Sf. sfințit Mc. Vasile, Episcopul Amasiei' } }],
  },
  [mmdd(4, 27)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Simeon, kinsman of the Lord, Hieromartyr', ro: 'Sf. sfințit Mc. Simeon, ruda Domnului' } }],
  },
  [mmdd(4, 28)]: {
    feasts: [],
    saints: [{ name: { en: 'Holy Apostles Jason and Sosipater', ro: 'Sf. Ap. Iason și Sosipatru (din cei 70)' } }],
  },
  [mmdd(4, 29)]: {
    feasts: [],
    saints: [{ name: { en: 'The Holy Nine Martyrs of Cyzicus', ro: 'Sf. 9 Mucenici din Cizic' } }],
  },
  [mmdd(4, 30)]: {
    feasts: [],
    saints: [{ name: { en: 'Holy Apostle James, brother of St. John the Theologian', ro: 'Sf. Ap. Iacov, fratele Sf. Ioan Teologul' } }],
  },

  // ═══════════════════════════════════════════════════════════════
  // MAY · MAI
  // ═══════════════════════════════════════════════════════════════
  [mmdd(5, 1)]: {
    feasts: [],
    saints: [
      { name: { en: 'Holy Prophet Jeremiah', ro: 'Sf. Prooroc Ieremia' } },
      { name: { en: 'St. Paphnutius of Borovsk', ro: 'Sf. Cuv. Pafnutie de Borovsk' } },
    ],
  },
  [mmdd(5, 2)]: {
    feasts: [{ name: { en: 'Translation of the Relics of St. Athanasius the Great', ro: 'Mutarea moaștelor Sf. Atanasie cel Mare' }, rank: 'minor' }],
    saints: [],
  },
  [mmdd(5, 3)]: {
    feasts: [],
    saints: [
      { name: { en: 'Sts. Timothy and Maura, Martyrs', ro: 'Sf. Mc. Timotei și Maura' } },
      { name: { en: 'St. Theodosius of the Kiev Caves', ro: 'Sf. Cuv. Teodosie de la Lavra Peșterilor' } },
    ],
  },
  [mmdd(5, 4)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Pelagia the Martyr', ro: 'Sf. Muceniță Pelaghia' } }],
  },
  [mmdd(5, 5)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Irene the Great-Martyr', ro: 'Sf. Muceniță Irina' } }],
  },
  [mmdd(5, 6)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Job the Long-suffering', ro: 'Sf. și Dreptul Iov, mult-pătimitorul' } }],
  },
  [mmdd(5, 7)]: {
    feasts: [{ name: { en: 'Commemoration of the Sign of the Cross appearing over Jerusalem', ro: 'Pomenirea Sf. Cruci care s-a arătat pe cer la Ierusalim' }, rank: 'minor' }],
    saints: [],
  },
  [mmdd(5, 8)]: {
    feasts: [],
    saints: [{ name: { en: 'Holy Apostle and Evangelist John the Theologian', ro: 'Sf. Ap. și Ev. Ioan Teologul' } }],
  },
  [mmdd(5, 9)]: {
    feasts: [{ name: { en: 'Translation of the Relics of St. Nicholas of Myra', ro: 'Mutarea moaștelor Sf. Ier. Nicolae' }, rank: 'minor' }],
    saints: [{ name: { en: 'Holy Prophet Isaiah', ro: 'Sf. Prooroc Isaia' } }],
  },
  [mmdd(5, 10)]: {
    feasts: [],
    saints: [{ name: { en: 'Holy Apostle Simon the Zealot', ro: 'Sf. Ap. Simon Zilotul' } }],
  },
  [mmdd(5, 11)]: {
    feasts: [{ name: { en: 'Renewal of the City of Constantinople', ro: 'Înnoirea cetății Constantinopolului' }, rank: 'minor' }],
    saints: [{ name: { en: 'St. Mocius the Hieromartyr', ro: 'Sf. sfințit Mc. Mochie' } }],
  },
  [mmdd(5, 12)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Epiphanius, Bishop of Cyprus', ro: 'Sf. Epifanie, Arhiepiscopul Ciprului' } },
      { name: { en: 'St. Germanus, Patriarch of Constantinople', ro: 'Sf. Gherman, Patriarhul Constantinopolului' } },
    ],
  },
  [mmdd(5, 13)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Glyceria the Martyr', ro: 'Sf. Muceniță Glicheria' } }],
  },
  [mmdd(5, 14)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Isidore of Chios', ro: 'Sf. Mc. Isidor' } }],
  },
  [mmdd(5, 15)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Pachomius the Great', ro: 'Sf. Cuv. Pahomie cel Mare' } },
      { name: { en: 'St. Iakov Putneanul', ro: 'Sf. Iacob Putneanul' }, title: { en: 'Metropolitan of Moldavia (†1778)', ro: 'Mitropolitul Moldovei (†1778)' } },
    ],
  },
  [mmdd(5, 16)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Theodore the Sanctified', ro: 'Sf. Cuv. Teodor cel Sfințit' } }],
  },
  [mmdd(5, 17)]: {
    feasts: [],
    saints: [{ name: { en: 'Holy Apostles Andronicus and Junia', ro: 'Sf. Ap. Andronic și Iunia' } }],
  },
  [mmdd(5, 18)]: {
    feasts: [],
    saints: [{ name: { en: 'Sts. Peter, Dionysius, Andrew, and Paul, Martyrs', ro: 'Sf. Mc. Petru, Dionisie, Andrei și Pavel' } }],
  },
  [mmdd(5, 19)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Patrick, Bishop of Prussa, Hieromartyr', ro: 'Sf. sfințit Mc. Patrichie, Episcopul Prusiei' } }],
  },
  [mmdd(5, 20)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Thalleleus the Martyr', ro: 'Sf. Mc. Talaleu' } }],
  },
  [mmdd(5, 21)]: {
    feasts: [{ name: { en: 'Sts. Constantine and Helen, Equal-to-the-Apostles', ro: 'Sf. Mari Împărați Constantin și Elena, întocmai cu Apostolii' }, rank: 'major' }],
    saints: [],
  },
  [mmdd(5, 22)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Basiliscus the Martyr', ro: 'Sf. Mc. Vasilisc' } }],
  },
  [mmdd(5, 23)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Michael the Confessor, Bishop of Synada', ro: 'Sf. Mihail Mărturisitorul, Episcopul Sinadelor' } }],
  },
  [mmdd(5, 24)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Simeon of the Wonderful Mountain', ro: 'Sf. Cuv. Simeon din Muntele Minunat' } }],
  },
  [mmdd(5, 25)]: {
    feasts: [{ name: { en: 'Third Finding of the Head of St. John the Baptist', ro: 'A treia aflare a Capului Sf. Ioan Botezătorul' }, rank: 'major' }],
    saints: [],
  },
  [mmdd(5, 26)]: {
    feasts: [],
    saints: [{ name: { en: 'Holy Apostles Carpus and Alphaeus', ro: 'Sf. Ap. Carp și Alfeu (din cei 70)' } }],
  },
  [mmdd(5, 27)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Helladius, Hieromartyr', ro: 'Sf. sfințit Mc. Eladie' } },
      { name: { en: 'St. Therapont the Martyr', ro: 'Sf. Mc. Terapont' } },
    ],
  },
  [mmdd(5, 28)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Nicetas the Confessor, Bishop of Chalcedon', ro: 'Sf. Cuv. Nichita Mărturisitorul, Episcopul Halcedonului' } }],
  },
  [mmdd(5, 29)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Theodosia, Virgin-Martyr', ro: 'Sf. Cuv. Muceniță Teodosia' } }],
  },
  [mmdd(5, 30)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Isaac the Confessor of Dalmaton', ro: 'Sf. Cuv. Isaachie Mărturisitorul' } }],
  },
  [mmdd(5, 31)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Hermias the Martyr', ro: 'Sf. Mc. Ermias' } }],
  },

  // ═══════════════════════════════════════════════════════════════
  // JUNE · IUNIE
  // ═══════════════════════════════════════════════════════════════
  [mmdd(6, 1)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Justin the Philosopher, Martyr', ro: 'Sf. Mc. Iustin Filosoful' } }],
  },
  [mmdd(6, 2)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Nicephorus the Confessor, Patriarch of Constantinople', ro: 'Sf. Nichifor Mărturisitorul, Patriarhul Constantinopolului' } }],
  },
  [mmdd(6, 3)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Lucillian the Martyr', ro: 'Sf. Mc. Luchilian' } },
      { name: { en: 'St. Paul the Martyr', ro: 'Sf. Mc. Pavel' } },
    ],
  },
  [mmdd(6, 4)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Metrophanes, Patriarch of Constantinople', ro: 'Sf. Mitrofan, Patriarhul Constantinopolului' } }],
  },
  [mmdd(6, 5)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Dorotheus, Bishop of Tyre', ro: 'Sf. sfințit Mc. Dorotei, Episcopul Tirului' } }],
  },
  [mmdd(6, 6)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Bessarion the Wonderworker', ro: 'Sf. Cuv. Visarion Făcătorul de Minuni' } },
      { name: { en: 'St. Hilarion the New', ro: 'Sf. Cuv. Ilarion cel Nou' } },
    ],
  },
  [mmdd(6, 7)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Theodotus of Ancyra, Hieromartyr', ro: 'Sf. sfințit Mc. Teodot din Ancira' } }],
  },
  [mmdd(6, 8)]: {
    feasts: [{ name: { en: 'Translation of the Relics of St. Theodore Stratelates', ro: 'Mutarea moaștelor Sf. Mare Mc. Teodor Stratilat' }, rank: 'minor' }],
    saints: [],
  },
  [mmdd(6, 9)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Cyril, Patriarch of Alexandria', ro: 'Sf. Chiril, Patriarhul Alexandriei' } }],
  },
  [mmdd(6, 10)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Timothy, Bishop of Prussa, Hieromartyr', ro: 'Sf. sfințit Mc. Timotei, Episcopul Prusiei' } }],
  },
  [mmdd(6, 11)]: {
    feasts: [{ name: { en: 'Holy Apostles Bartholomew and Barnabas', ro: 'Sf. Ap. Vartolomeu și Varnava' }, rank: 'major' }],
    saints: [],
  },
  [mmdd(6, 12)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Onuphrius the Great', ro: 'Sf. Cuv. Onufrie cel Mare' } },
      { name: { en: 'St. Peter of Mount Athos', ro: 'Sf. Cuv. Petru Athonitul' } },
    ],
  },
  [mmdd(6, 13)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Aquilina the Martyr', ro: 'Sf. Muceniță Achilina' } },
      { name: { en: 'St. Triphyllius, Bishop of Leucosia', ro: 'Sf. Trifilie, Episcopul Levcusiei' } },
    ],
  },
  [mmdd(6, 14)]: {
    feasts: [],
    saints: [
      { name: { en: 'Holy Prophet Elisha', ro: 'Sf. Prooroc Elisei' } },
      { name: { en: 'St. Methodius, Patriarch of Constantinople', ro: 'Sf. Metodie, Patriarhul Constantinopolului' } },
    ],
  },
  [mmdd(6, 15)]: {
    feasts: [],
    saints: [
      { name: { en: 'Holy Prophet Amos', ro: 'Sf. Prooroc Amos' } },
      { name: { en: 'St. Jerome of Stridon', ro: 'Sf. Ieronim' } },
    ],
  },
  [mmdd(6, 16)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Tychon, Bishop of Amathous in Cyprus', ro: 'Sf. Tihon, Episcopul Amatundei' } }],
  },
  [mmdd(6, 17)]: {
    feasts: [],
    saints: [{ name: { en: 'Sts. Manuel, Sabel, and Ishmael, Martyrs', ro: 'Sf. Mc. Manuil, Savel și Ismail' } }],
  },
  [mmdd(6, 18)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Leontius the Martyr', ro: 'Sf. Mc. Leontie' } },
      { name: { en: 'St. Erasmus of Ohrid', ro: 'Sf. Cuv. Erasm' } },
    ],
  },
  [mmdd(6, 19)]: {
    feasts: [],
    saints: [
      { name: { en: 'Holy Apostle Jude (Thaddaeus)', ro: 'Sf. Ap. Iuda' } },
      { name: { en: 'St. Paisius the Great', ro: 'Sf. Cuv. Paisie cel Mare' } },
    ],
  },
  [mmdd(6, 20)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Methodius, Bishop of Patara, Hieromartyr', ro: 'Sf. sfințit Mc. Metodie, Episcopul Patarelor' } }],
  },
  [mmdd(6, 21)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Julian of Tarsus, Martyr', ro: 'Sf. Mc. Iulian din Tars' } }],
  },
  [mmdd(6, 22)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Eusebius of Samosata, Hieromartyr', ro: 'Sf. sfințit Mc. Eusebie, Episcopul Samosatelor' } }],
  },
  [mmdd(6, 23)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Agrippina the Martyr', ro: 'Sf. Muceniță Agripina' } }],
  },
  [mmdd(6, 24)]: {
    feasts: [{ name: { en: 'Nativity of the Holy Forerunner John the Baptist', ro: 'Nașterea Sf. Ioan Botezătorul' }, rank: 'major' }],
    saints: [],
  },
  [mmdd(6, 25)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Febronia, Virgin-Martyr', ro: 'Sf. Cuv. Muceniță Fevronia' } }],
  },
  [mmdd(6, 26)]: {
    feasts: [],
    saints: [{ name: { en: 'St. David of Thessaloniki', ro: 'Sf. Cuv. David din Tesalonic' } }],
  },
  [mmdd(6, 27)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Sampson, the Hospitable', ro: 'Sf. Cuv. Samson, primitorul de străini' } }],
  },
  [mmdd(6, 28)]: {
    feasts: [{ name: { en: 'Translation of the Relics of Sts. Cyrus and John, Unmercenaries', ro: 'Mutarea moaștelor Sf. doctori fără de arginți Chir și Ioan' }, rank: 'minor' }],
    saints: [],
  },
  [mmdd(6, 29)]: {
    feasts: [{ name: { en: 'Holy Glorious and All-Praised Leaders of the Apostles, Peter and Paul', ro: 'Sf. Ap. Petru și Pavel' }, rank: 'major' }],
    saints: [],
  },
  [mmdd(6, 30)]: {
    feasts: [{ name: { en: 'Synaxis of the Holy Twelve Apostles', ro: 'Soborul Sf. 12 Apostoli' }, rank: 'major' }],
    saints: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // JULY · IULIE
  // ═══════════════════════════════════════════════════════════════
  [mmdd(7, 1)]: {
    feasts: [],
    saints: [{ name: { en: 'Holy Unmercenaries Cosmas and Damian of Rome', ro: 'Sf. doctori fără de arginți Cosma și Damian de la Roma' } }],
  },
  [mmdd(7, 2)]: {
    feasts: [{ name: { en: 'Placing of the Honorable Robe of the Theotokos at Blachernae', ro: 'Așezarea cinstitului veșmânt al Maicii Domnului în Vlaherne' }, rank: 'minor' }],
    saints: [
      { name: { en: 'St. Stephen the Great', ro: 'Sf. Voievod Ștefan cel Mare' }, title: { en: 'Prince of Moldavia (1457–1504)', ro: 'Domnul Moldovei (1457–1504)' } },
    ],
  },
  [mmdd(7, 3)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Hyacinth the Martyr', ro: 'Sf. Mc. Iachint' } },
      { name: { en: 'St. Anatolius, Patriarch of Constantinople', ro: 'Sf. Cuv. Anatolie, Patriarhul Constantinopolului' } },
    ],
  },
  [mmdd(7, 4)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Andrew, Archbishop of Crete', ro: 'Sf. Andrei Criteanul' } },
      { name: { en: 'St. Martha, mother of St. Simeon', ro: 'Sf. Marta, mama Sf. Simeon Stâlpnicul' } },
    ],
  },
  [mmdd(7, 5)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Athanasius of Mount Athos', ro: 'Sf. Cuv. Atanasie Athonitul' } },
      { name: { en: 'St. Lampadus', ro: 'Sf. Cuv. Lampadie' } },
    ],
  },
  [mmdd(7, 6)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Sisoes the Great', ro: 'Sf. Cuv. Sisoe cel Mare' } }],
  },
  [mmdd(7, 7)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Thomas of Maleon', ro: 'Sf. Cuv. Toma din Maleon' } }],
  },
  [mmdd(7, 8)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Procopius the Great-Martyr', ro: 'Sf. Mare Mc. Procopie' } },
      { name: { en: 'St. Theophilus of Pângărați', ro: 'Sf. Cuv. Teofil de la Pângărați' }, title: { en: '17th-century Moldavian elder', ro: 'stareț moldovean, sec. XVII' } },
    ],
  },
  [mmdd(7, 9)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Pancratius of Tauromenium, Hieromartyr', ro: 'Sf. sfințit Mc. Pancratie, Episcopul Tavromeniei' } }],
  },
  [mmdd(7, 10)]: {
    feasts: [],
    saints: [{ name: { en: 'The Holy 45 Martyrs of Nicopolis in Armenia', ro: 'Sf. 45 de Mucenici din Nicopolea Armeniei' } }],
  },
  [mmdd(7, 11)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Euphemia the All-Praised', ro: 'Sf. Mare Mc. Eufimia' } },
      { name: { en: 'St. Olga of Russia', ro: 'Sf. Olga, întocmai cu Apostolii' } },
    ],
  },
  [mmdd(7, 12)]: {
    feasts: [],
    saints: [{ name: { en: 'Sts. Proclus and Hilarius, Martyrs', ro: 'Sf. Mc. Proclu și Ilarie' } }],
  },
  [mmdd(7, 13)]: {
    feasts: [{ name: { en: 'Synaxis of the Archangel Gabriel', ro: 'Soborul Sf. Arhanghel Gavriil' }, rank: 'major' }],
    saints: [],
  },
  [mmdd(7, 14)]: {
    feasts: [],
    saints: [
      { name: { en: 'Holy Apostle Aquila', ro: 'Sf. Ap. Acvila' } },
      { name: { en: 'St. Pachomius of Gledin', ro: 'Sf. Cuv. Pahomie de la Gledin' }, title: { en: 'Bishop of Roman (RO)', ro: 'Episcopul Romanului (RO)' } },
    ],
  },
  [mmdd(7, 15)]: {
    feasts: [],
    saints: [
      { name: { en: 'Sts. Cyricus and Julitta, Martyrs', ro: 'Sf. Mc. Chiric și Iulita' } },
      { name: { en: 'St. Vladimir, Equal-to-the-Apostles', ro: 'Sf. Cnez Vladimir, întocmai cu Apostolii' } },
    ],
  },
  [mmdd(7, 16)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Athenogenes, Bishop of Pidachthoe, Hieromartyr', ro: 'Sf. sfințit Mc. Atinoghen' } }],
  },
  [mmdd(7, 17)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Marina the Great-Martyr', ro: 'Sf. Mare Muceniță Marina' } }],
  },
  [mmdd(7, 18)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Aemilian of Durostorum, Martyr', ro: 'Sf. Mc. Emilian' } },
      { name: { en: 'St. Hyacinth of Amastris', ro: 'Sf. Mc. Iachint din Amastrida' } },
    ],
  },
  [mmdd(7, 19)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Macrina, sister of St. Basil the Great', ro: 'Sf. Cuv. Macrina, sora Sf. Vasile cel Mare' } },
      { name: { en: 'St. Dius', ro: 'Sf. Cuv. Die' } },
    ],
  },
  [mmdd(7, 20)]: {
    feasts: [{ name: { en: 'Holy Glorious Prophet Elijah', ro: 'Sf. Prooroc Ilie Tesviteanul' }, rank: 'major' }],
    saints: [],
  },
  [mmdd(7, 21)]: {
    feasts: [],
    saints: [
      { name: { en: 'Holy Prophet Ezekiel', ro: 'Sf. Prooroc Iezechiel' } },
      { name: { en: 'St. Simeon the Fool-for-Christ', ro: 'Sf. Cuv. Simeon, cel nebun pentru Hristos' } },
    ],
  },
  [mmdd(7, 22)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Mary Magdalene, Equal-to-the-Apostles', ro: 'Sf. Maria Magdalena, întocmai cu Apostolii' } }],
  },
  [mmdd(7, 23)]: {
    feasts: [],
    saints: [
      { name: { en: 'Sts. Trophimus and Theophilus, Martyrs', ro: 'Sf. Mc. Trofim și Teofil' } },
    ],
  },
  [mmdd(7, 24)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Christina the Great-Martyr', ro: 'Sf. Muceniță Hristina' } }],
  },
  [mmdd(7, 25)]: {
    feasts: [{ name: { en: 'Dormition of Righteous Anna, mother of the Theotokos', ro: 'Adormirea Sf. Ana, mama Maicii Domnului' }, rank: 'major' }],
    saints: [{ name: { en: 'St. Olympia the Deaconess', ro: 'Sf. Cuv. Olimpiada' } }],
  },
  [mmdd(7, 26)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Hermolaus the Hieromartyr', ro: 'Sf. sfințit Mc. Ermolae' } },
      { name: { en: 'St. Paraskeve of Rome', ro: 'Sf. Cuv. Paraschevi de la Roma' } },
    ],
  },
  [mmdd(7, 27)]: {
    feasts: [{ name: { en: 'St. Panteleimon the Great-Martyr and Healer', ro: 'Sf. Mare Mc. și Tămăduitor Pantelimon' }, rank: 'major' }],
    saints: [],
  },
  [mmdd(7, 28)]: {
    feasts: [],
    saints: [{ name: { en: 'Holy Apostles and Deacons Prochorus, Nicanor, Timon, and Parmenas', ro: 'Sf. Ap. și Diaconi Prohor, Nicanor, Timon și Parmena (din cei 70)' } }],
  },
  [mmdd(7, 29)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Callinicus the Martyr', ro: 'Sf. Mc. Calinic' } }],
  },
  [mmdd(7, 30)]: {
    feasts: [],
    saints: [{ name: { en: 'Holy Apostles Silas, Silvanus, Crescens, Epaenetus, and Andronicus', ro: 'Sf. Ap. Sila, Silvan, Crescent, Epenet și Andronic (din cei 70)' } }],
  },
  [mmdd(7, 31)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Eudokimos the Righteous', ro: 'Sf. și Drept Evdochim' } }],
  },

  // ═══════════════════════════════════════════════════════════════
  // AUGUST · AUGUST
  // ═══════════════════════════════════════════════════════════════
  [mmdd(8, 1)]: {
    feasts: [
      { name: { en: 'Procession of the Precious and Life-giving Cross', ro: 'Scoaterea Sf. Cruci' }, rank: 'minor' },
      { name: { en: 'Beginning of the Dormition Fast', ro: 'Începutul Postului Adormirii' }, rank: 'minor' },
    ],
    saints: [{ name: { en: 'The Seven Holy Maccabean Children', ro: 'Cei Șapte Tineri Macabei' } }],
  },
  [mmdd(8, 2)]: {
    feasts: [{ name: { en: 'Translation of the Relics of St. Stephen the Archdeacon', ro: 'Mutarea moaștelor Sf. Arhid. și întâi Mc. Ștefan' }, rank: 'minor' }],
    saints: [],
  },
  [mmdd(8, 3)]: {
    feasts: [],
    saints: [{ name: { en: 'Sts. Isaakios, Dalmatos, and Faustus', ro: 'Sf. Cuv. Isaachie, Dalmat și Faust' } }],
  },
  [mmdd(8, 4)]: {
    feasts: [],
    saints: [{ name: { en: 'The Holy Seven Youths of Ephesus', ro: 'Sf. 7 tineri din Efes' } }],
  },
  [mmdd(8, 5)]: {
    feasts: [{ name: { en: 'Forefeast of the Transfiguration', ro: 'Înainte-prăznuirea Schimbării la Față' }, rank: 'minor' }],
    saints: [{ name: { en: 'St. Eusignius the Martyr', ro: 'Sf. Mc. Evsignie' } }],
  },
  [mmdd(8, 6)]: {
    feasts: [{ name: { en: 'Holy Transfiguration of Our Lord, God, and Savior Jesus Christ', ro: 'Schimbarea la Față a Domnului' }, rank: 'great', about: { en: 'On Mount Tabor Christ is transfigured before Peter, James, and John, His face shining like the sun and His garments white as light, while Moses and Elijah speak with Him. The Father’s voice declares, "This is My beloved Son," revealing the uncreated glory of the Godhead before the Passion.', ro: 'Pe Muntele Taborului Hristos Se schimbă la față înaintea lui Petru, Iacov și Ioan, fața Sa strălucind ca soarele și veșmintele albe ca lumina, în timp ce Moise și Ilie vorbesc cu El. Glasul Tatălui mărturisește: „Acesta este Fiul Meu cel iubit", descoperind slava cea necreată a Dumnezeirii înainte de Patimă.' } }],
    saints: [],
  },
  [mmdd(8, 7)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Dometius the Persian, Venerable Martyr', ro: 'Sf. Cuv. Mc. Domețiu Persul' } }],
  },
  [mmdd(8, 8)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Aemilian the Confessor, Bishop of Cyzicus', ro: 'Sf. Emilian Mărturisitorul, Episcopul Cizicului' } }],
  },
  [mmdd(8, 9)]: {
    feasts: [{ name: { en: 'Holy Apostle Matthias', ro: 'Sf. Ap. Matia' }, rank: 'major' }],
    saints: [],
  },
  [mmdd(8, 10)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Lawrence the Archdeacon, Martyr', ro: 'Sf. Mc. și Arhid. Lavrentie' } }],
  },
  [mmdd(8, 11)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Euplus the Deacon, Martyr', ro: 'Sf. Mc. Eupl Diaconul' } }],
  },
  [mmdd(8, 12)]: {
    feasts: [],
    saints: [{ name: { en: 'Sts. Photius and Anicetus, Martyrs', ro: 'Sf. Mc. Fotie și Anichit' } }],
  },
  [mmdd(8, 13)]: {
    feasts: [{ name: { en: 'Translation of the Relics of St. Maximus the Confessor', ro: 'Mutarea moaștelor Sf. Maxim Mărturisitorul' }, rank: 'minor' }],
    saints: [{ name: { en: 'St. Tikhon of Zadonsk', ro: 'Sf. Tihon de Zadonsk' } }],
  },
  [mmdd(8, 14)]: {
    feasts: [{ name: { en: 'Forefeast of the Dormition', ro: 'Înainte-prăznuirea Adormirii Maicii Domnului' }, rank: 'minor' }],
    saints: [{ name: { en: 'Holy Prophet Micah', ro: 'Sf. Prooroc Miheia' } }],
  },
  [mmdd(8, 15)]: {
    feasts: [{ name: { en: 'Dormition of Our Most Holy Lady the Theotokos and Ever-Virgin Mary', ro: 'Adormirea Maicii Domnului' }, rank: 'great', about: { en: 'The Most Holy Theotokos falls asleep in the Lord, surrounded by the apostles whom God gathered miraculously from afar. Her Son receives her soul into His hands, and the Church confesses that she was translated to heaven, remaining a mother and intercessor for the faithful. It is crowned by a strict fast from August 1 to 14.', ro: 'Preasfânta Născătoare de Dumnezeu adoarme întru Domnul, înconjurată de apostolii pe care Dumnezeu i-a adunat în chip minunat din depărtări. Fiul ei îi primește sufletul în mâinile Sale, iar Biserica mărturisește mutarea ei la cer, rămânând maică și mijlocitoare pentru credincioși. Praznicul este pregătit prin postul Adormirii, de la 1 la 14 august.' } }],
    saints: [],
  },
  [mmdd(8, 16)]: {
    feasts: [{ name: { en: 'Translation of the Image Not-Made-by-Hands of Our Lord', ro: 'Aducerea Sf. Mahrame a Domnului' }, rank: 'major' }],
    saints: [
      { name: { en: 'Holy Brâncoveanu Martyrs', ro: 'Sf. Mc. Brâncoveni' }, title: { en: 'Voivode Constantin Brâncoveanu and his sons Constantin, Ștefan, Radu, Matei, and his counsellor Ianache (†1714)', ro: 'Sf. Voievod Constantin Brâncoveanu, fiii săi Constantin, Ștefan, Radu, Matei, și sfetnicul Ianache (†1714)' } },
    ],
  },
  [mmdd(8, 17)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Myron the Martyr', ro: 'Sf. Mc. Miron' } }],
  },
  [mmdd(8, 18)]: {
    feasts: [],
    saints: [{ name: { en: 'Sts. Florus and Laurus, Martyrs', ro: 'Sf. Mc. Flor și Lavru' } }],
  },
  [mmdd(8, 19)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Andrew Stratelates, Martyr', ro: 'Sf. Mc. Andrei Stratilat' } }],
  },
  [mmdd(8, 20)]: {
    feasts: [],
    saints: [{ name: { en: 'Holy Prophet Samuel', ro: 'Sf. Prooroc Samuel' } }],
  },
  [mmdd(8, 21)]: {
    feasts: [],
    saints: [{ name: { en: 'Holy Apostle Thaddaeus', ro: 'Sf. Ap. Tadeu' } }],
  },
  [mmdd(8, 22)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Agathonicus the Martyr', ro: 'Sf. Mc. Agatonic' } }],
  },
  [mmdd(8, 23)]: {
    feasts: [{ name: { en: 'Leave-taking of the Dormition', ro: 'Odovania Adormirii Maicii Domnului' }, rank: 'minor' }],
    saints: [{ name: { en: 'St. Lupus the Martyr', ro: 'Sf. Mc. Lup' } }],
  },
  [mmdd(8, 24)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Eutyches the Hieromartyr', ro: 'Sf. sfințit Mc. Eutihie' } },
      { name: { en: 'St. Kosmas the Aetolian', ro: 'Sf. Cosma, Episcopul Etoliei' } },
    ],
  },
  [mmdd(8, 25)]: {
    feasts: [{ name: { en: 'Translation of the Relics of Holy Apostle Bartholomew', ro: 'Mutarea moaștelor Sf. Ap. Vartolomeu' }, rank: 'minor' }],
    saints: [{ name: { en: 'Holy Apostle Titus', ro: 'Sf. Ap. Tit (din cei 70)' } }],
  },
  [mmdd(8, 26)]: {
    feasts: [],
    saints: [{ name: { en: 'Sts. Adrian and Natalia, Martyrs', ro: 'Sf. Mc. Adrian și Natalia' } }],
  },
  [mmdd(8, 27)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Poemen the Great', ro: 'Sf. Cuv. Pimen cel Mare' } }],
  },
  [mmdd(8, 28)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Moses the Ethiopian', ro: 'Sf. Cuv. Moise Etiopianul' } }],
  },
  [mmdd(8, 29)]: {
    feasts: [{ name: { en: 'Beheading of the Holy Forerunner John the Baptist', ro: 'Tăierea Capului Sf. Ioan Botezătorul' }, rank: 'major' }],
    saints: [],
  },
  [mmdd(8, 30)]: {
    feasts: [],
    saints: [{ name: { en: 'Sts. Alexander, John, and Paul the New, Patriarchs of Constantinople', ro: 'Sf. Ierarhi Alexandru, Ioan și Pavel cel Nou, Patriarhi ai Constantinopolului' } }],
  },
  [mmdd(8, 31)]: {
    feasts: [{ name: { en: 'Placing of the Honorable Sash of the Theotokos', ro: 'Punerea cinstitului brâu al Maicii Domnului' }, rank: 'minor' }],
    saints: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // SEPTEMBER · SEPTEMBRIE
  // ═══════════════════════════════════════════════════════════════
  [mmdd(9, 1)]: {
    feasts: [{ name: { en: 'Indiction — Ecclesiastical New Year', ro: 'Începutul Anului Bisericesc' }, rank: 'minor' }],
    saints: [
      { name: { en: 'St. Symeon the Stylite', ro: 'Sf. Cuv. Simeon Stâlpnicul' } },
      { name: { en: 'St. Dionysius Exiguus', ro: 'Sf. Dionisie Exiguul' }, title: { en: 'Scythian monk who established the Anno Domini era', ro: 'monah scit, rânduitorul erei creștine' } },
    ],
  },
  [mmdd(9, 2)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Mamas the Martyr', ro: 'Sf. Mc. Mamant' } },
      { name: { en: 'St. John the Faster, Patriarch of Constantinople', ro: 'Sf. Ioan Postnicul, Patriarhul Constantinopolului' } },
    ],
  },
  [mmdd(9, 3)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Anthimus, Bishop of Nicomedia, Hieromartyr', ro: 'Sf. sfințit Mc. Antim, Episcopul Nicomidiei' } },
      { name: { en: 'St. Theoctistus the Hermit', ro: 'Sf. Cuv. Teoctist' } },
    ],
  },
  [mmdd(9, 4)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Babylas, Bishop of Antioch, Hieromartyr', ro: 'Sf. sfințit Mc. Vavila, Episcopul Antiohiei' } },
      { name: { en: 'Holy Prophet Moses, the God-seer', ro: 'Sf. Prooroc Moise' } },
    ],
  },
  [mmdd(9, 5)]: {
    feasts: [],
    saints: [{ name: { en: 'Holy Prophet Zechariah, father of St. John the Baptist', ro: 'Sf. Prooroc Zaharia, tatăl Sf. Ioan Botezătorul' } }],
  },
  [mmdd(9, 6)]: {
    feasts: [{ name: { en: 'Commemoration of the Miracle of the Archangel Michael at Chonae', ro: 'Pomenirea minunii Sf. Arhanghel Mihail din Colose' }, rank: 'minor' }],
    saints: [],
  },
  [mmdd(9, 7)]: {
    feasts: [{ name: { en: 'Forefeast of the Nativity of the Theotokos', ro: 'Înainte-prăznuirea Nașterii Maicii Domnului' }, rank: 'minor' }],
    saints: [{ name: { en: 'St. Sozon the Martyr', ro: 'Sf. Mc. Sozont' } }],
  },
  [mmdd(9, 8)]: {
    feasts: [{ name: { en: 'Nativity of Our Most Holy Lady the Theotokos', ro: 'Nașterea Maicii Domnului' }, rank: 'great', about: { en: 'The Virgin Mary is born to the aged and childless Joachim and Anna, whose long prayer is answered by God. As the first great feast of the Church year, it marks the dawn of salvation: she who would become the living temple of the Word enters the world.', ro: 'Fecioara Maria se naște din bătrânii și până atunci neroditorii Ioachim și Ana, a căror îndelungată rugăciune este ascultată de Dumnezeu. Fiind cel dintâi praznic mare al anului bisericesc, el vestește zorii mântuirii: vine în lume ceea ce avea să fie templul cel viu al Cuvântului.' } }],
    saints: [],
  },
  [mmdd(9, 9)]: {
    feasts: [{ name: { en: 'Synaxis of the Holy Righteous Ancestors of God Joachim and Anna', ro: 'Sf. și Drepți Părinți Ioachim și Ana' }, rank: 'major' }],
    saints: [],
  },
  [mmdd(9, 10)]: {
    feasts: [],
    saints: [{ name: { en: 'Sts. Minodora, Mitrodora, and Nymphodora, Martyrs', ro: 'Sf. Mucenițe Minodora, Mitrodora și Nymfodora' } }],
  },
  [mmdd(9, 11)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Theodora of Alexandria', ro: 'Sf. Cuv. Teodora din Alexandria' } },
      { name: { en: 'St. Euphrosynus the Cook', ro: 'Sf. Cuv. Eufrosin' } },
    ],
  },
  [mmdd(9, 12)]: {
    feasts: [{ name: { en: 'Forefeast of the Exaltation of the Cross', ro: 'Înainte-prăznuirea Înălțării Sf. Cruci' }, rank: 'minor' }],
    saints: [{ name: { en: 'St. Autonomus the Hieromartyr', ro: 'Sf. sfințit Mc. Autonom' } }],
  },
  [mmdd(9, 13)]: {
    feasts: [{ name: { en: 'Dedication of the Church of the Holy Resurrection at Jerusalem', ro: 'Sfințirea bisericii Învierii din Ierusalim' }, rank: 'minor' }],
    saints: [{ name: { en: 'St. Cornelius the Centurion, Hieromartyr', ro: 'Sf. sfințit Mc. Cornelie Sutașul' } }],
  },
  [mmdd(9, 14)]: {
    feasts: [{ name: { en: 'Universal Exaltation of the Precious and Life-Giving Cross', ro: 'Înălțarea Sfintei Cruci' }, rank: 'great', about: { en: 'The Church commemorates the finding of the True Cross by St. Helena in Jerusalem and its solemn lifting up before the people, so that all might venerate the instrument of our salvation. In honour of the Lord’s suffering, the feast is kept with a strict fast.', ro: 'Biserica prăznuiește aflarea Cinstitei Cruci de către Sfânta Elena la Ierusalim și înălțarea ei solemnă înaintea poporului, ca toți să se închine uneltei mântuirii noastre. În cinstea pătimirii Domnului, praznicul se ține cu post aspru.' } }],
    saints: [],
  },
  [mmdd(9, 15)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Nicetas the Goth, Great-Martyr', ro: 'Sf. Mare Mc. Nichita' } },
      { name: { en: 'St. Iosif the New of Partoș', ro: 'Sf. Iosif cel Nou de la Partoș' }, title: { en: 'Metropolitan of Timișoara (†1656)', ro: 'Mitropolitul Timișoarei (†1656)' } },
    ],
  },
  [mmdd(9, 16)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Euphemia the All-Praised, Great-Martyr', ro: 'Sf. Mare Muceniță Eufimia' } }],
  },
  [mmdd(9, 17)]: {
    feasts: [],
    saints: [{ name: { en: 'Sts. Sophia and her daughters Faith, Hope, and Love', ro: 'Sf. Mucenițe Sofia și fiicele sale Pistis, Elpis și Agapis' } }],
  },
  [mmdd(9, 18)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Eumenius, Bishop of Gortyna', ro: 'Sf. Cuv. Eumenie, Episcopul Gortinei' } }],
  },
  [mmdd(9, 19)]: {
    feasts: [],
    saints: [{ name: { en: 'Sts. Trophimus, Sabbatius, and Dorymedon, Martyrs', ro: 'Sf. Mc. Trofim, Savatie și Dorimedont' } }],
  },
  [mmdd(9, 20)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Eustathius the Great-Martyr and Placidas', ro: 'Sf. Mare Mc. Eustatie Plachida' } }],
  },
  [mmdd(9, 21)]: {
    feasts: [{ name: { en: 'Leave-taking of the Exaltation of the Cross', ro: 'Odovania Înălțării Sf. Cruci' }, rank: 'minor' }],
    saints: [{ name: { en: 'Holy Apostle Quadratus', ro: 'Sf. Ap. Codrat' } }],
  },
  [mmdd(9, 22)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Phocas the Hieromartyr', ro: 'Sf. sfințit Mc. Foca' } },
      { name: { en: 'Holy Prophet Jonah', ro: 'Sf. Prooroc Iona' } },
    ],
  },
  [mmdd(9, 23)]: {
    feasts: [{ name: { en: 'Conception of the Holy Forerunner John the Baptist', ro: 'Zămislirea Sf. Ioan Botezătorul' }, rank: 'minor' }],
    saints: [],
  },
  [mmdd(9, 24)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Thecla, First Woman-Martyr, Equal-to-the-Apostles', ro: 'Sf. Cuv. Muceniță Tecla, întâia muceniță' } }],
  },
  [mmdd(9, 25)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Euphrosyne of Alexandria', ro: 'Sf. Cuv. Eufrosina' } },
      { name: { en: 'Repose of St. Sergius of Radonezh', ro: 'Mutarea Sf. Sergie de Radonej' } },
    ],
  },
  [mmdd(9, 26)]: {
    feasts: [{ name: { en: 'Repose of the Holy Apostle and Evangelist John the Theologian', ro: 'Mutarea Sf. Ap. și Ev. Ioan Teologul' }, rank: 'major' }],
    saints: [{ name: { en: 'St. Neagoe Basarab', ro: 'Sf. Voievod Neagoe Basarab' }, title: { en: 'Prince of Wallachia (†1521)', ro: 'Domnul Țării Românești (†1521)' } }],
  },
  [mmdd(9, 27)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Callistratus the Martyr', ro: 'Sf. Mc. Calistrat' } },
      { name: { en: 'St. Anthimus the Iberian', ro: 'Sf. Antim Ivireanul' }, title: { en: 'Metropolitan of Wallachia (†1716)', ro: 'Mitropolitul Țării Românești (†1716)' } },
    ],
  },
  [mmdd(9, 28)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Chariton the Confessor', ro: 'Sf. Cuv. Hariton Mărturisitorul' } },
      { name: { en: 'Holy Prophet Baruch', ro: 'Sf. Prooroc Baruh' } },
    ],
  },
  [mmdd(9, 29)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Cyriacus the Anchorite', ro: 'Sf. Cuv. Chiriac Sihastrul' } }],
  },
  [mmdd(9, 30)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Gregory the Illuminator of Armenia, Hieromartyr', ro: 'Sf. sfințit Mc. Grigorie, Luminătorul Armeniei' } }],
  },

  // ═══════════════════════════════════════════════════════════════
  // OCTOBER · OCTOMBRIE
  // ═══════════════════════════════════════════════════════════════
  [mmdd(10, 1)]: {
    feasts: [{ name: { en: 'Protection of the Most Holy Theotokos', ro: 'Acoperământul Maicii Domnului' }, rank: 'major' }],
    saints: [{ name: { en: 'Holy Apostle Ananias', ro: 'Sf. Ap. Anania (din cei 70)' } }],
  },
  [mmdd(10, 2)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Cyprian, Hieromartyr, and St. Justina, Virgin-Martyr', ro: 'Sf. sfințit Mc. Ciprian și Sf. Muceniță Iustina' } }],
  },
  [mmdd(10, 3)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Dionysius the Areopagite, Hieromartyr', ro: 'Sf. sfințit Mc. Dionisie Areopagitul' } }],
  },
  [mmdd(10, 4)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Hierotheus, Bishop of Athens, Hieromartyr', ro: 'Sf. sfințit Mc. Ierotei, Episcopul Atenei' } }],
  },
  [mmdd(10, 5)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Charitina, Martyr', ro: 'Sf. Muceniță Haritina' } }],
  },
  [mmdd(10, 6)]: {
    feasts: [{ name: { en: 'Holy Apostle Thomas', ro: 'Sf. Ap. Toma' }, rank: 'major' }],
    saints: [],
  },
  [mmdd(10, 7)]: {
    feasts: [],
    saints: [{ name: { en: 'Sts. Sergius and Bacchus, Martyrs', ro: 'Sf. Mc. Serghie și Vah' } }],
  },
  [mmdd(10, 8)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Pelagia the Penitent', ro: 'Sf. Cuv. Pelaghia' } }],
  },
  [mmdd(10, 9)]: {
    feasts: [],
    saints: [
      { name: { en: 'Holy Apostle James, son of Alphaeus', ro: 'Sf. Ap. Iacov, fiul lui Alfeu' } },
      { name: { en: 'Holy Patriarch Abraham', ro: 'Sf. Drept Avraam' } },
    ],
  },
  [mmdd(10, 10)]: {
    feasts: [],
    saints: [{ name: { en: 'Sts. Eulampius and Eulampia, Martyrs', ro: 'Sf. Mc. Evlampie și sora sa Evlampia' } }],
  },
  [mmdd(10, 11)]: {
    feasts: [],
    saints: [
      { name: { en: 'Holy Apostle Philip the Deacon', ro: 'Sf. Ap. și Diacon Filip' } },
      { name: { en: 'St. Theophanes the Confessor', ro: 'Sf. Cuv. Teofan Mărturisitorul' } },
    ],
  },
  [mmdd(10, 12)]: {
    feasts: [],
    saints: [
      { name: { en: 'Sts. Probus, Tarachus, and Andronicus, Martyrs', ro: 'Sf. Mc. Prov, Tarah și Andronic' } },
      { name: { en: 'St. Cosmas, Bishop of Maiuma', ro: 'Sf. Cosma, Episcopul Maiumei' } },
    ],
  },
  [mmdd(10, 13)]: {
    feasts: [],
    saints: [{ name: { en: 'Sts. Carpus, Papylus, Agathodorus, and Agathonice, Martyrs', ro: 'Sf. Mc. Carp, Papila, Agatodor și Agatonica' } }],
  },
  [mmdd(10, 14)]: {
    feasts: [{ name: { en: 'St. Parascheva of Iași', ro: 'Sf. Cuv. Parascheva de la Iași' }, rank: 'major', note: { en: 'Patroness of Moldavia; her relics are kept at the Metropolitan Cathedral of Iași', ro: 'Ocrotitoarea Moldovei; moaștele se află la Catedrala Mitropolitană din Iași' } }],
    saints: [{ name: { en: 'Sts. Nazarius, Gervase, Protase, and Celsus, Martyrs', ro: 'Sf. Mc. Nazarie, Ghervasie, Protasie și Chelsie' } }],
  },
  [mmdd(10, 15)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Lucian, Priest of Antioch, Venerable Martyr', ro: 'Sf. Cuv. Mc. Lucian, preotul Antiohiei' } }],
  },
  [mmdd(10, 16)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Longinus the Centurion, Martyr', ro: 'Sf. Mc. Longhin Sutașul' } }],
  },
  [mmdd(10, 17)]: {
    feasts: [],
    saints: [
      { name: { en: 'Holy Prophet Hosea', ro: 'Sf. Prooroc Osea' } },
      { name: { en: 'St. Andrew of Crete, Venerable Martyr', ro: 'Sf. Cuv. Mc. Andrei Criteanul' } },
    ],
  },
  [mmdd(10, 18)]: {
    feasts: [{ name: { en: 'Holy Apostle and Evangelist Luke', ro: 'Sf. Ap. și Ev. Luca' }, rank: 'major' }],
    saints: [],
  },
  [mmdd(10, 19)]: {
    feasts: [],
    saints: [
      { name: { en: 'Holy Prophet Joel', ro: 'Sf. Prooroc Ioil' } },
      { name: { en: 'St. Varus the Martyr', ro: 'Sf. Mc. Uar' } },
    ],
  },
  [mmdd(10, 20)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Artemius the Great-Martyr', ro: 'Sf. Mare Mc. Artemie' } }],
  },
  [mmdd(10, 21)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Hilarion the Great', ro: 'Sf. Cuv. Ilarion cel Mare' } },
      { name: { en: 'Sts. Visarion and Sofronie of Cioara', ro: 'Sf. Cuv. Visarion și Sofronie de la Cioara' }, title: { en: 'Transylvanian Confessors (†18th c.)', ro: 'Mărturisitorii Ardealului (sec. XVIII)' } },
      { name: { en: 'St. Oprea Miclăuș, Martyr', ro: 'Sf. Mc. Oprea Miclăuș' }, title: { en: 'Transylvanian Confessor (†1752)', ro: 'Mărturisitor în Ardeal (†1752)' } },
    ],
  },
  [mmdd(10, 22)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Aberkios of Hierapolis, Equal-to-the-Apostles', ro: 'Sf. Averchie, Episcopul Ierapolei' } }],
  },
  [mmdd(10, 23)]: {
    feasts: [],
    saints: [{ name: { en: 'Holy Apostle James, the Brother of the Lord, first Bishop of Jerusalem', ro: 'Sf. Ap. Iacov, ruda Domnului, întâiul episcop al Ierusalimului' } }],
  },
  [mmdd(10, 24)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Arethas the Martyr', ro: 'Sf. Mc. Areta' } }],
  },
  [mmdd(10, 25)]: {
    feasts: [],
    saints: [{ name: { en: 'Sts. Marcian and Martyrius the Notaries, Martyrs', ro: 'Sf. Mc. Marcian și Martirie Notarii' } }],
  },
  [mmdd(10, 26)]: {
    feasts: [{ name: { en: 'St. Demetrius the Great-Martyr, the Myrrh-streaming', ro: 'Sf. Mare Mc. Dimitrie, Izvorâtorul de Mir' }, rank: 'major' }],
    saints: [],
  },
  [mmdd(10, 27)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Demetrius the New of Basarabov', ro: 'Sf. Cuv. Dimitrie cel Nou Basarabov' }, title: { en: 'Patron of Bucharest; relics at the Patriarchal Cathedral', ro: 'Ocrotitorul Bucureștilor; moaștele la Catedrala Patriarhală' } },
      { name: { en: 'St. Nestor the Martyr', ro: 'Sf. Mc. Nestor' } },
    ],
  },
  [mmdd(10, 28)]: {
    feasts: [],
    saints: [
      { name: { en: 'Sts. Terence and Neonilla, Martyrs', ro: 'Sf. Mc. Terentie și Neonila' } },
      { name: { en: 'St. Jacob, Bishop of Aleppo', ro: 'Sf. Iachint Mărturisitorul, Mitropolitul Țării Românești' }, title: { en: 'first Metropolitan of Wallachia (†1372)', ro: 'cel dintâi Mitropolit al Țării Românești (†1372)' } },
    ],
  },
  [mmdd(10, 29)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Anastasia of Rome, Virgin-Martyr', ro: 'Sf. Cuv. Muceniță Anastasia Romana' } },
      { name: { en: 'St. Abramius the Anchorite', ro: 'Sf. Cuv. Avramie Sihastrul' } },
    ],
  },
  [mmdd(10, 30)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Zenobius, Bishop of Aegae, and his sister Zenobia', ro: 'Sf. sfințit Mc. Zenovie și sora sa Zenovia' } }],
  },
  [mmdd(10, 31)]: {
    feasts: [],
    saints: [{ name: { en: 'Holy Apostles Stachys, Amplius, Urban, Narcissus, Apelles, and Aristobulus', ro: 'Sf. Ap. Stahie, Amplie, Urban, Narcis, Apelie și Aristobul (din cei 70)' } }],
  },

  // ═══════════════════════════════════════════════════════════════
  // NOVEMBER · NOIEMBRIE
  // ═══════════════════════════════════════════════════════════════
  [mmdd(11, 1)]: {
    feasts: [{ name: { en: 'Holy Unmercenaries Cosmas and Damian of Asia', ro: 'Sf. doctori fără de arginți Cosma și Damian' }, rank: 'major' }],
    saints: [],
  },
  [mmdd(11, 2)]: {
    feasts: [],
    saints: [{ name: { en: 'Sts. Acindynus, Pegasius, Anempodistus, Aphthonius, and Elpidiphorus, Martyrs', ro: 'Sf. Mc. Achindin, Pigasie, Anempodist, Aftonie și Elpidifor' } }],
  },
  [mmdd(11, 3)]: {
    feasts: [],
    saints: [
      { name: { en: 'Sts. Acepsimas, Joseph, and Aeithalas, Martyrs', ro: 'Sf. Mc. Achepsim, Iosif și Aitala' } },
      { name: { en: 'Dedication of the Church of St. George at Lydda', ro: 'Sfințirea bisericii Sf. Mc. Gheorghe din Lida' } },
    ],
  },
  [mmdd(11, 4)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Joannicius the Great', ro: 'Sf. Cuv. Ioanichie cel Mare' } },
      { name: { en: 'St. Nicander, Hieromartyr', ro: 'Sf. sfințit Mc. Nicandru' } },
    ],
  },
  [mmdd(11, 5)]: {
    feasts: [],
    saints: [{ name: { en: 'Sts. Galaction and Epistemis, Martyrs', ro: 'Sf. Mc. Galaction și Epistimia' } }],
  },
  [mmdd(11, 6)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Paul the Confessor, Patriarch of Constantinople', ro: 'Sf. Pavel Mărturisitorul, Patriarhul Constantinopolului' } }],
  },
  [mmdd(11, 7)]: {
    feasts: [],
    saints: [
      { name: { en: 'The Holy 33 Martyrs of Melitene', ro: 'Sf. 33 de Mucenici din Melitina' } },
      { name: { en: 'St. Lazarus the Wonderworker', ro: 'Sf. Cuv. Lazăr Făcătorul de Minuni' } },
    ],
  },
  [mmdd(11, 8)]: {
    feasts: [{ name: { en: 'Synaxis of the Archangel Michael and the other Bodiless Powers', ro: 'Soborul Sf. Arhangheli Mihail și Gavriil' }, rank: 'major' }],
    saints: [],
  },
  [mmdd(11, 9)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Nectarius of Aegina', ro: 'Sf. Ier. Nectarie de la Eghina' }, title: { en: 'Bishop of Pentapolis (†1920) — widely venerated in Romania', ro: 'Episcop al Pentapolei (†1920) — mult cinstit în Romania' } },
      { name: { en: 'Sts. Onesiphorus and Porphyrius, Martyrs', ro: 'Sf. Mc. Onisifor și Porfirie' } },
    ],
  },
  [mmdd(11, 10)]: {
    feasts: [],
    saints: [{ name: { en: 'Holy Apostles Erastus, Olympas, Rhodion, Sosipater, Tertius, Quartus, and Achaicus', ro: 'Sf. Ap. Erast, Olimp, Rodion, Sosipatru, Terțiu, Cvart și Achila (din cei 70)' } }],
  },
  [mmdd(11, 11)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Menas of Egypt, Great-Martyr', ro: 'Sf. Mare Mc. Mina' } },
      { name: { en: 'St. Victor the Martyr', ro: 'Sf. Mc. Victor' } },
      { name: { en: 'St. Theodora of Sihla', ro: 'Sf. Cuv. Teodora de la Sihla' }, title: { en: 'Moldavian recluse (†early 18th c.)', ro: 'sihastră în Munții Neamțului (sec. XVIII)' } },
    ],
  },
  [mmdd(11, 12)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. John the Merciful, Patriarch of Alexandria', ro: 'Sf. Ioan cel Milostiv, Patriarhul Alexandriei' } },
      { name: { en: 'St. Nilus the Faster', ro: 'Sf. Cuv. Nil Pustnicul' } },
    ],
  },
  [mmdd(11, 13)]: {
    feasts: [{ name: { en: 'St. John Chrysostom, Archbishop of Constantinople', ro: 'Sf. Ier. Ioan Gură de Aur, Arhiepiscopul Constantinopolului' }, rank: 'major' }],
    saints: [],
  },
  [mmdd(11, 14)]: {
    feasts: [{ name: { en: 'Holy Apostle Philip', ro: 'Sf. Ap. Filip' }, rank: 'major' }],
    saints: [],
  },
  [mmdd(11, 15)]: {
    feasts: [{ name: { en: 'Beginning of the Nativity Fast', ro: 'Începutul Postului Crăciunului' }, rank: 'minor' }],
    saints: [
      { name: { en: 'Sts. Gurias, Samonas, and Abibus, Confessors of Edessa', ro: 'Sf. Mc. Guria, Samona și Aviv' } },
      { name: { en: 'St. Paisius of Neamț', ro: 'Sf. Cuv. Paisie de la Neamț' }, title: { en: 'Restorer of Hesychasm in Moldavia (†1794)', ro: 'restauratorul isihasmului în Moldova (†1794)' } },
    ],
  },
  [mmdd(11, 16)]: {
    feasts: [{ name: { en: 'Holy Apostle and Evangelist Matthew', ro: 'Sf. Ap. și Ev. Matei' }, rank: 'major' }],
    saints: [],
  },
  [mmdd(11, 17)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Gregory the Wonderworker, Bishop of Neocaesarea', ro: 'Sf. Grigorie Făcătorul de Minuni, Episcopul Neocezareei' } }],
  },
  [mmdd(11, 18)]: {
    feasts: [],
    saints: [{ name: { en: 'Sts. Platon and Romanus, Martyrs', ro: 'Sf. Mc. Platon și Roman' } }],
  },
  [mmdd(11, 19)]: {
    feasts: [],
    saints: [
      { name: { en: 'Holy Prophet Obadiah', ro: 'Sf. Prooroc Avdie' } },
      { name: { en: 'St. Barlaam the Martyr', ro: 'Sf. Mc. Varlaam' } },
    ],
  },
  [mmdd(11, 20)]: {
    feasts: [{ name: { en: 'Forefeast of the Entry of the Theotokos into the Temple', ro: 'Înainte-prăznuirea Intrării în Biserică a Maicii Domnului' }, rank: 'minor' }],
    saints: [
      { name: { en: 'St. Gregory of Decapolis', ro: 'Sf. Cuv. Grigorie Decapolitul' } },
      { name: { en: 'St. Proclus, Archbishop of Constantinople', ro: 'Sf. Proclu, Arhiepiscopul Constantinopolului' } },
    ],
  },
  [mmdd(11, 21)]: {
    feasts: [{ name: { en: 'Entry of the Most Holy Theotokos into the Temple', ro: 'Intrarea în Biserică a Maicii Domnului' }, rank: 'great', about: { en: 'At three years of age the Virgin Mary is brought by Joachim and Anna to the Temple to be dedicated to God, and she is led even into the Holy of Holies, where she is nourished for her future role. The feast prepares the faithful for the Nativity and opens the singing of Christmas hymns.', ro: 'La vârsta de trei ani, Fecioara Maria este adusă de Ioachim și Ana la Templu spre a fi închinată lui Dumnezeu și este dusă până în Sfânta Sfintelor, unde este hrănită pentru chemarea ei cea viitoare. Praznicul îi pregătește pe credincioși pentru Nașterea Domnului și deschide cântarea colindelor.' } }],
    saints: [],
  },
  [mmdd(11, 22)]: {
    feasts: [],
    saints: [{ name: { en: 'Holy Apostles Philemon, Apphia, Archippus, and Onesimus', ro: 'Sf. Ap. Filimon, Apfia, Arhip și Onisim (din cei 70)' } }],
  },
  [mmdd(11, 23)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Amphilochius, Bishop of Iconium', ro: 'Sf. Amfilohie, Episcopul Iconiei' } }],
  },
  [mmdd(11, 24)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Catherine of Alexandria, Great-Martyr', ro: 'Sf. Mare Muceniță Ecaterina' } },
      { name: { en: 'St. Mercurius the Great-Martyr', ro: 'Sf. Mc. Mercurie' } },
    ],
  },
  [mmdd(11, 25)]: {
    feasts: [{ name: { en: 'Leave-taking of the Entry of the Theotokos', ro: 'Odovania Praznicului Intrării' }, rank: 'minor' }],
    saints: [{ name: { en: 'St. Clement, Pope of Rome, Hieromartyr', ro: 'Sf. sfințit Mc. Clement, Papa Romei' } }],
  },
  [mmdd(11, 26)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Alipius the Stylite', ro: 'Sf. Cuv. Alipie Stâlpnicul' } },
      { name: { en: 'St. Jacob the Anchorite', ro: 'Sf. Cuv. Iacov Sihastrul' } },
    ],
  },
  [mmdd(11, 27)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. James the Persian, Great-Martyr', ro: 'Sf. Mare Mc. Iacov Persul' } },
      { name: { en: 'St. Nathanael the Hermit', ro: 'Sf. Cuv. Natanael' } },
    ],
  },
  [mmdd(11, 28)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Stephen the New, Venerable Martyr', ro: 'Sf. Cuv. Mc. Ștefan cel Nou' } }],
  },
  [mmdd(11, 29)]: {
    feasts: [],
    saints: [{ name: { en: 'Sts. Paramonus and Philumenus, Martyrs', ro: 'Sf. Mc. Paramon și Filumen' } }],
  },
  [mmdd(11, 30)]: {
    feasts: [{ name: { en: 'Holy Apostle Andrew, the First-Called', ro: 'Sf. Ap. Andrei, cel întâi-chemat' }, rank: 'major', note: { en: 'Patron of the Romanian Orthodox Church', ro: 'Ocrotitorul Bisericii Ortodoxe Române' } }],
    saints: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // DECEMBER · DECEMBRIE
  // ═══════════════════════════════════════════════════════════════
  [mmdd(12, 1)]: {
    feasts: [],
    saints: [
      { name: { en: 'Holy Prophet Nahum', ro: 'Sf. Prooroc Naum' } },
      { name: { en: 'St. Philaret the Merciful', ro: 'Sf. Cuv. Filaret Milostivul' } },
    ],
  },
  [mmdd(12, 2)]: {
    feasts: [],
    saints: [
      { name: { en: 'Holy Prophet Habakkuk', ro: 'Sf. Prooroc Avacum' } },
      { name: { en: 'St. Porphyrius of Kavsokalyvia', ro: 'Sf. Cuv. Porfirie Kavsokalivitul' } },
    ],
  },
  [mmdd(12, 3)]: {
    feasts: [],
    saints: [
      { name: { en: 'Holy Prophet Zephaniah', ro: 'Sf. Prooroc Sofonie' } },
      { name: { en: 'St. Gheorghe of Cernica', ro: 'Sf. Cuv. Gheorghe de la Cernica' }, title: { en: 'Restorer of monastic life in Wallachia (†1806)', ro: 'reînnoitorul monahismului în Țara Românească (†1806)' } },
    ],
  },
  [mmdd(12, 4)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Barbara the Great-Martyr', ro: 'Sf. Mare Muceniță Varvara' } },
      { name: { en: 'St. John Damascene', ro: 'Sf. Cuv. Ioan Damaschin' } },
    ],
  },
  [mmdd(12, 5)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Sabbas the Sanctified', ro: 'Sf. Cuv. Sava cel Sfințit' } }],
  },
  [mmdd(12, 6)]: {
    feasts: [{ name: { en: 'St. Nicholas the Wonderworker, Archbishop of Myra in Lycia', ro: 'Sf. Ier. Nicolae, Arhiepiscopul Mirelor Lichiei, Făcătorul de Minuni' }, rank: 'major' }],
    saints: [],
  },
  [mmdd(12, 7)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Ambrose, Bishop of Milan', ro: 'Sf. Ambrozie, Episcopul Mediolanului' } }],
  },
  [mmdd(12, 8)]: {
    feasts: [{ name: { en: 'Forefeast of the Conception of the Theotokos', ro: 'Înainte-prăznuirea Zămislirii Sf. Ana' }, rank: 'minor' }],
    saints: [{ name: { en: 'St. Patapius the Hermit', ro: 'Sf. Cuv. Patapie' } }],
  },
  [mmdd(12, 9)]: {
    feasts: [{ name: { en: 'Conception by Righteous Anna of the Most Holy Theotokos', ro: 'Zămislirea Sf. Ana' }, rank: 'major' }],
    saints: [{ name: { en: 'Holy Prophetess Anna', ro: 'Sf. Prooroaca Ana' } }],
  },
  [mmdd(12, 10)]: {
    feasts: [],
    saints: [{ name: { en: 'Sts. Menas, Hermogenes, and Eugraphus, Martyrs', ro: 'Sf. Mc. Mina, Ermoghen și Evgraf' } }],
  },
  [mmdd(12, 11)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Daniel the Stylite', ro: 'Sf. Cuv. Daniil Stâlpnicul' } }],
  },
  [mmdd(12, 12)]: {
    feasts: [{ name: { en: 'St. Spyridon the Wonderworker, Bishop of Trimythous', ro: 'Sf. Ier. Spiridon, Episcopul Trimitundei, Făcătorul de Minuni' }, rank: 'major' }],
    saints: [],
  },
  [mmdd(12, 13)]: {
    feasts: [],
    saints: [
      { name: { en: 'Sts. Eustratius, Auxentius, Eugene, Mardarius, and Orestes, Martyrs', ro: 'Sf. Mc. Eustratie, Auxentie, Eugen, Mardarie și Orest' } },
      { name: { en: 'St. Lucia of Syracuse, Virgin-Martyr', ro: 'Sf. Muceniță Lucia' } },
    ],
  },
  [mmdd(12, 14)]: {
    feasts: [],
    saints: [{ name: { en: 'Sts. Thyrsus, Callinicus, Philemon, and Apollonius, Martyrs', ro: 'Sf. Mc. Tirs, Calinic, Filimon și Apolonie' } }],
  },
  [mmdd(12, 15)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Eleutherius, Hieromartyr', ro: 'Sf. sfințit Mc. Eleftherie' } },
      { name: { en: 'St. Paul of Latros', ro: 'Sf. Cuv. Pavel cel din Latro' } },
    ],
  },
  [mmdd(12, 16)]: {
    feasts: [],
    saints: [
      { name: { en: 'Holy Prophet Haggai', ro: 'Sf. Prooroc Agheu' } },
    ],
  },
  [mmdd(12, 17)]: {
    feasts: [],
    saints: [
      { name: { en: 'Holy Prophet Daniel', ro: 'Sf. Prooroc Daniel' } },
      { name: { en: 'The Three Holy Youths Ananias, Azarias, and Misael', ro: 'Sf. trei tineri Anania, Azaria și Misail' } },
    ],
  },
  [mmdd(12, 18)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Sebastian the Martyr', ro: 'Sf. Mc. Sebastian' } },
      { name: { en: 'St. Daniel the Hermit', ro: 'Sf. Cuv. Daniil Sihastrul' }, title: { en: 'Confessor of St. Stephen the Great (†1496)', ro: 'duhovnicul Sf. Ștefan cel Mare (†1496)' } },
    ],
  },
  [mmdd(12, 19)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Boniface the Martyr', ro: 'Sf. Mc. Bonifaciu' } }],
  },
  [mmdd(12, 20)]: {
    feasts: [{ name: { en: 'Forefeast of the Nativity of Christ', ro: 'Înainte-prăznuirea Nașterii Domnului' }, rank: 'minor' }],
    saints: [{ name: { en: 'St. Ignatius the God-Bearer, Hieromartyr', ro: 'Sf. sfințit Mc. Ignatie Teoforul' } }],
  },
  [mmdd(12, 21)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Juliana the Martyr', ro: 'Sf. Muceniță Iuliana' } }],
  },
  [mmdd(12, 22)]: {
    feasts: [],
    saints: [{ name: { en: 'St. Anastasia, Deliverer-from-Potions, Great-Martyr', ro: 'Sf. Mare Muceniță Anastasia, izbăvitoarea de otravă' } }],
  },
  [mmdd(12, 23)]: {
    feasts: [],
    saints: [{ name: { en: 'The Holy Ten Martyrs of Crete', ro: 'Sf. 10 Mucenici din Creta' } }],
  },
  [mmdd(12, 24)]: {
    feasts: [{ name: { en: 'Eve of the Nativity of Christ', ro: 'Ajunul Nașterii Domnului' }, rank: 'minor' }],
    saints: [{ name: { en: 'St. Eugenia, Venerable Martyr', ro: 'Sf. Cuv. Muceniță Eugenia' } }],
  },
  [mmdd(12, 25)]: {
    feasts: [{ name: { en: 'Nativity According to the Flesh of Our Lord, God, and Savior Jesus Christ', ro: 'Nașterea Domnului' }, rank: 'great', about: { en: 'The Son of God is born of the Virgin Mary in a cave at Bethlehem and laid in a manger, the eternal Word taking on our flesh. Shepherds hear the angels’ hymn and Magi come from the East to worship Him, so that heaven and earth rejoice together at God made man.', ro: 'Fiul lui Dumnezeu Se naște din Fecioara Maria într-o peșteră din Betleem și este pus în iesle, Cuvântul cel veșnic luând trupul nostru. Păstorii aud cântarea îngerilor, iar magii vin de la Răsărit ca să I se închine, încât cerul și pământul se bucură împreună de Dumnezeu făcut om.' } }],
    saints: [],
  },
  [mmdd(12, 26)]: {
    feasts: [{ name: { en: 'Synaxis of the Most Holy Theotokos', ro: 'Soborul Maicii Domnului' }, rank: 'major' }],
    saints: [{ name: { en: 'St. Nicodemus of Tismana', ro: 'Sf. Cuv. Nicodim de la Tismana' }, title: { en: 'Founder of monasticism in Wallachia (†1406)', ro: 'întemeietorul vieții călugărești în Țara Românească (†1406)' } }],
  },
  [mmdd(12, 27)]: {
    feasts: [{ name: { en: 'Holy Apostle, Archdeacon, and Protomartyr Stephen', ro: 'Sf. Ap. și Arhidiacon Ștefan, întâiul mucenic' }, rank: 'major' }],
    saints: [],
  },
  [mmdd(12, 28)]: {
    feasts: [],
    saints: [{ name: { en: 'The Holy 20,000 Martyrs of Nicomedia', ro: 'Sf. 20.000 de Mucenici din Nicomidia' } }],
  },
  [mmdd(12, 29)]: {
    feasts: [],
    saints: [{ name: { en: 'The Holy 14,000 Infants slain by Herod', ro: 'Sf. 14.000 de prunci uciși de Irod' } }],
  },
  [mmdd(12, 30)]: {
    feasts: [],
    saints: [
      { name: { en: 'St. Anysia the Martyr', ro: 'Sf. Muceniță Anisia' } },
      { name: { en: 'St. Melania the Younger of Rome', ro: 'Sf. Cuv. Melania Romana' } },
    ],
  },
  [mmdd(12, 31)]: {
    feasts: [{ name: { en: 'Leave-taking of the Nativity of Christ', ro: 'Odovania Nașterii Domnului' }, rank: 'minor' }],
    saints: [],
  },
};
