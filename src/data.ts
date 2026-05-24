import { Song, TourEvent, StyleFeature } from './types';

export const BAND_INTRO = {
  name: '椅子乐团 The Chairs',
  origin: '中国台湾',
  activeYears: '2015 - 至今',
  members: [
    { name: '詠靖 (Yung-Ching)', role: '主唱 / 吉他 / 词曲创作', desc: '以富有文学色彩的治愈词句和温柔多变的唱腔为乐团奠定情感基调。' },
    { name: '仲穎 (Chung-Ying)', role: '主唱 / 吉他 / 词曲创作', desc: '拥有明亮高亢的复古好声音，精湛的木吉他编配注入温暖海风般的能量。' },
    { name: 'Benson', role: '贝斯手', desc: '扎实而跃动的低音线条是椅子乐团慵懒律动感与律动性十足的强力后盾。' }
  ],
  awards: '第30届金曲奖最佳演唱组合得主 (凭专辑《Lovely Loner》)',
  vibeText: '椅子乐团（The Chairs）是台湾Indie-pop（独立流行）的重要代表。他们的音乐如同铺满落日余晖的金色海滩，融合了Dream Pop、Retro-romantic、70年代City Pop以及迷幻民谣。标志性的双主唱完美和声、暖洋洋的配器，能瞬间将听众拉入一场属于夏日的复古温柔梦境。'
};

export const STYLE_FEATURES: StyleFeature[] = [
  {
    id: 'retro-pop',
    title: '复古浪漫主义',
    englishTitle: 'Retro-romantic Pop',
    description: '继承了上世纪七八十年代City Pop、灵魂乐(Soul)与黑胶民谣的精髓。使用温暖柔和的电吉他滑音(Slide Guitar)、富有律动的贝斯线条，营造出轻快迷人、摇摆自如的复古派对氛围。',
    musicalElements: ['70s 混响与温暖音色', '跃动的复古贝斯律动', '双吉他交织的精致编配', 'City Pop都市慵懒感'],
    bgClass: 'from-[#FF8F70]/10 to-[#FFA384]/20 border-orange-200',
    emoji: '🌸'
  },
  {
    id: 'dream-pop',
    title: '海风梦幻流行',
    englishTitle: 'Dream Pop & Vocal Harmony',
    description: '椅子乐团最广为人知的金字招牌。两位主唱詠靖与仲穎的声线一个温柔内敛、一个清脆明亮，完美的双声部男声和音搭配轻飘飘的合成器，仿佛置身于微醺、充满夏日咸涩海风的梦幻海洋。',
    musicalElements: ['极其纯净的双声部人声和声', '大量空气感与回声音效', '梦幻轻柔的乐段留白', '青春悸动与浪漫幻想'],
    bgClass: 'from-[#6E90F5]/10 to-[#8CA6F8]/20 border-blue-200',
    emoji: '🌊'
  },
  {
    id: 'cozy-folk',
    title: '写意民谣与城市写实',
    englishTitle: 'Indie Folk & Storytelling',
    description: '早期的《Cheers! Land》充满了富有质朴生活气息的木吉他叙事。歌词围绕生活小细节、城市地标、或者是手绘地图的小小赴约，用原声吉他和简单的手鼓，带给人最纯粹的治愈和安全感。',
    musicalElements: ['自然原木吉他指弹', '口琴、手鼓等原声器乐', '充满故事感的细腻歌词', '对日常生活与土地的眷恋'],
    bgClass: 'from-[#5A8F76]/10 to-[#7AA893]/20 border-emerald-200',
    emoji: '🌿'
  }
];

export const PLAYLIST: Song[] = [
  {
    id: 'rollin-on',
    title: 'Rollin\' On',
    album: 'Lovely Loner (乐芙莉洛娜)',
    year: 2018,
    duration: '04:15',
    description: '椅子乐团最具代表性的王牌歌曲，伴随了无数听众的下班路或公路旅程。全曲以极其松弛的沙哑原木吉他与一尘不染的贝斯作为骨架，副歌那句“Rollin\' on my friends”像日落晚风般治愈所有疲惫。',
    vibeTags: ['公路旅行', '夏日夕阳', '海感', '最爱收藏'],
    backgroundGradient: 'linear-gradient(135deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)',
    accentColor: '#FF6A88',
    chordNotes: [261.63, 329.63, 392.00, 493.88, 523.25] // Cmaj9 / G base
  },
  {
    id: 'handwritten-map',
    title: '手绘地图',
    englishTitle: 'Hand-drawn Map',
    album: 'Cheers! Land',
    year: 2016,
    duration: '04:52',
    description: '椅子乐团的纯真起点。木吉他和清新的口风琴交织出一段青涩温暖的都市散步。歌词描写拿着朋友手画的地图，在台北的巷弄中寻找一间隐秘咖啡馆的赴约过程，流露出极其珍贵的写实治愈感。',
    vibeTags: ['简单纯朴', '治愈和煦', '木吉他', '散步音乐'],
    backgroundGradient: 'linear-gradient(135deg, #13547a 0%, #80d0c7 100%)',
    accentColor: '#4CA1AF',
    chordNotes: [349.23, 440.00, 523.25, 587.33, 659.25] // Fmaj9
  },
  {
    id: 'entering-the-room',
    title: 'Entering The Room',
    album: 'Real Love Is...',
    year: 2020,
    duration: '03:40',
    description: '将R&B、新灵魂乐(Neo-Soul)与椅子独有的慵懒复古彻底融合。窗外霓虹闪烁，乐器编配极其克制，吉他的微醺润色和主唱带有轻声呼吸的原唱，为听众构建起一个完美隔绝外界喧嚣的二人深夜房间。',
    vibeTags: ['微醺摩登', '深夜卧室', '新灵魂乐', '私享氛围'],
    backgroundGradient: 'linear-gradient(135deg, #6B30AC 0%, #FF9671 100%)',
    accentColor: '#8C3FC9',
    chordNotes: [293.66, 349.23, 440.00, 493.88, 587.33] // Dm9
  },
  {
    id: 'loneliest-loner',
    title: 'Loneliest Loner',
    album: 'The Chairs',
    year: 2022,
    duration: '03:52',
    description: '同名专辑中的浪漫遗珠。在标志性的极简鼓点中，用英文与中文词交错出对孤独灵魂的自我歌颂。这首歌里的和声美妙绝伦，背景甚至有着海鸥般的电吉他声波反馈，让人在孤独中感受到一整颗夜空的温度。',
    vibeTags: ['深夜星空', '孤独共振', '极致和声', '冬日暖炉'],
    backgroundGradient: 'linear-gradient(135deg, #243B55 0%, #141E30 100%)',
    accentColor: '#3A6073',
    chordNotes: [329.63, 392.00, 493.88, 587.33, 698.46] // Em9/F
  },
  {
    id: 'dandy',
    title: 'Dandy',
    album: 'Lovely Loner (乐芙莉洛娜)',
    year: 2018,
    duration: '03:12',
    description: '充满俏皮感的复古舞曲，复古铜管乐与蹦跳的贝斯交相辉映。它还原了老式摩登绅士(Dandy)走在复古街道上的雀跃画面。听着这首歌，你会忍不住想要在卧室里踩着轻松的舞步。',
    vibeTags: ['轻松摇摆', '复古铜管', '都市心动', '古灵精怪'],
    backgroundGradient: 'linear-gradient(135deg, #FAD961 0%, #F76B1C 100%)',
    accentColor: '#F76B1C',
    chordNotes: [311.13, 392.00, 466.16, 523.25, 587.33] // Ebmaj9
  }
];

export const LYRICS_DATABASE: Record<string, string[]> = {
  'rollin-on': [
    'Rollin\' on, my friends 乘着海浪的风',
    '我们将金黄色的落日 一颗颗揉进漫长的公路中',
    'Hey, don\'t look back 不要回头',
    '你听，昨天的喧闹 都已经被海风亲吻抚平',
    '生活就像是一首唱不完的中板歌谣',
    '我们总是这样 轻松地、一直走、一直走',
    'Rollin\' on, sweet dreamers...',
    '别怕在梦幻的海滩迷路 我们终会在晨光里相拥'
  ],
  'handwritten-map': [
    '如果你手里也有一张手绘的地图',
    '请记得在第三个红绿灯左拐 穿过旧铁道',
    '这里的下午茶信件 还在散发着松饼的焦香',
    '因为你在终点执着地等待着我',
    '所以我一路上所有的迷失 都变成了浪漫的游历',
    '纸笔摩挲的痕迹 是我们最默契的密电',
    '看啊，终点的霓虹和花香 正在向我们轻轻招手'
  ],
  'entering-the-room': [
    'Baby, when you entering the room...',
    '时间的滴答声 好像也在你的步履里瞬间静止',
    '窗外霓虹画出的红色弧线 像是在琴键上的温柔撩拨',
    '在黑胶唱片沙沙的旋转里 慢慢靠近我',
    '不谈论沉重的明天，不打量遥远的现实',
    '在这个散落玫瑰气泡的静音角落，只有音乐和我们。'
  ],
  'loneliest-loner': [
    'We are the loneliest loners dancing in the dark',
    '但每一个不愿妥协的灵魂 都有独属他的星辰',
    '不需要任何人吵闹的原谅 也不渴求廉价的安慰',
    '在落寞与高傲的夹角里 我们抱紧了月光的清辉',
    '听海鸥和电吉他在晚潮里 唱着没有歌词的歌',
    '我们是孤独的主角 也是彼此最灿烂的共振。'
  ],
  'dandy': [
    'Mr. Dandy 穿着宽大的呢绒西装',
    '把礼帽压低 踩在落叶拼成的金黄色琴键上',
    '吹个轻松的口哨 给路过的猫咪致意',
    'Hey dandy lover, 浪漫在这个下午并不昂贵',
    '只需要一首复古萨克斯 与你那跳跃起飞的脚步',
    '抛开刻板的公式，今天我们都是最迷人的游侠！'
  ]
};

export const TOUR_UPDATES: TourEvent[] = [
  {
    id: 't-tp',
    city: '台北 (Taipei)',
    englishCity: 'Taipei',
    date: '2026-06-12 (周五) 20:00',
    venue: 'Legacy Taipei (台北传音乐展演空间)',
    status: 'upcoming',
    mapX: 75,
    mapY: 65,
    ticketUrl: '#',
    specialGuests: '神秘浪漫女声 / 脆乐团'
  },
  {
    id: 't-sh',
    city: '上海 (Shanghai)',
    englishCity: 'Shanghai',
    date: '2026-06-20 (周六) 20:00',
    venue: 'Modern Sky Lab',
    status: 'upcoming',
    mapX: 62,
    mapY: 48,
    ticketUrl: '#',
    specialGuests: '甜约翰 Sweet John'
  },
  {
    id: 't-gz',
    city: '广州 (Guangzhou)',
    englishCity: 'Guangzhou',
    date: '2026-06-25 (周四) 20:00',
    venue: 'MAO Livehouse (广州店)',
    status: 'upcoming',
    mapX: 42,
    mapY: 76,
    ticketUrl: '#',
    specialGuests: '肆無忌憚之和声配角'
  },
  {
    id: 't-cd',
    city: '成都 (Chengdu)',
    englishCity: 'Chengdu',
    date: '2026-07-04 (周六) 19:30',
    venue: '正火艺术中心 1号馆',
    status: 'upcoming',
    mapX: 25,
    mapY: 58,
    ticketUrl: '#',
    specialGuests: '橘子海 Orange Ocean'
  },
  {
    id: 't-hz',
    city: '杭州 (Hangzhou)',
    englishCity: 'Hangzhou',
    date: '2026-07-11 (周六) 20:00',
    venue: 'MAO Livehouse (杭州沙沙店)',
    status: 'sold_out',
    mapX: 57,
    mapY: 54,
    ticketUrl: '#',
    specialGuests: '告五人 (云端连线合声)'
  },
  {
    id: 't-tk',
    city: '东京 (Tokyo)',
    englishCity: 'Tokyo',
    date: '2026-07-18 (周六) 18:30',
    venue: 'Shibuya Club Quattro (渋谷)',
    status: 'upcoming',
    mapX: 86,
    mapY: 34,
    ticketUrl: '#',
    specialGuests: 'Lucky Tapes / Awesome City Club 成员'
  },
  {
    id: 't-ny',
    city: '纽约 (New York)',
    englishCity: 'New York',
    date: '2026-08-10 (周一) 19:00',
    venue: 'The Bowery Ballroom',
    status: 'completed',
    mapX: 95,
    mapY: 15,
    ticketUrl: '#',
    specialGuests: 'Men I Trust'
  }
];

export const SETLIST_PREDICTION = [
  { song: 'Rollin\' On', count: 184, probability: '100%', reason: '开场或倒数第一首全场大合唱保留曲目' },
  { song: '手绘地图', count: 142, probability: '95%', reason: '青春写意神曲，暖心安可极佳选择' },
  { song: 'Entering The Room', count: 125, probability: '85%', reason: '中场灯光转暗、开启私密微醺互动的首选' },
  { song: 'Dandy', count: 110, probability: '78%', reason: '跳跃欢快，吉他独奏瞬间调动全场乐迷踩步起跳' },
  { song: 'Shangri-La Is Calling', count: 98, probability: '70%', reason: '新乐迷挚爱的海风呼唤' },
  { song: 'Aphrodite', count: 85, probability: '60%', reason: '极致静谧，咏靖声线最迷人的戏剧表达' }
];
