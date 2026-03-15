export const navLinks = [
  { label: "Возможности", href: "/#features" },
  { label: "Тарифы", href: "/#pricing" },
  { label: "Личный кабинет", href: "/dashboard" },
  { label: "Интеграция", href: "/#integration" },
  { label: "Контакты", href: "/#cta" },
];

export const heroContent = {
  badge: "AI-powered • B2B",
  title: "AI-турменеджер, который продаёт туры пока вы спите",
  subtitle:
    "Полностью автоматизированный AI-ассистент для турагентств. Подбирает туры, консультирует по отелям, показывает перелёты и цены — в живом диалоге с клиентом. Подключается за 1 день.",
  ctaPrimary: "Попробовать демо",
  ctaSecondary: "Узнать больше",
  partners: ["ВКонтакте", "Telegram", "Web Widget"],
};

export const problems = [
  {
    stat: "70%",
    title: "заявок теряются",
    description:
      "Клиент пишет в 23:00 — менеджер ответит утром. К утру клиент уже купил у конкурента.",
    icon: "TrendingDown" as const,
  },
  {
    stat: "15–40 мин",
    title: "на одного клиента",
    description:
      "Подбор, сравнение, ручной поиск в системах бронирования. На 50 заявок нужно 5 менеджеров.",
    icon: "Clock" as const,
  },
  {
    stat: "80%",
    title: "рутинных вопросов",
    description:
      "«Какой пляж?», «есть бассейн?», «что входит в тур?» — менеджер тратит время на то, что можно автоматизировать.",
    icon: "MessageSquare" as const,
  },
];

export const solutionText = {
  title: "AI Tour Assistant берёт на себя 80% работы менеджера",
  description:
    "Мгновенный подбор, консультация, актуализация цен. Менеджер подключается только на этапе бронирования.",
};

export const howItWorks = [
  {
    step: 1,
    title: "Умный сбор информации",
    description:
      "Ведёт естественный диалог: выясняет направление, даты, состав группы, пожелания. Не задаёт лишних вопросов.",
    icon: "MessagesSquare" as const,
  },
  {
    step: 2,
    title: "Поиск в реальном времени",
    description:
      "Ищет по всем туроператорам одновременно, фильтрует по 20+ параметрам. Актуальные цены на момент запроса.",
    icon: "Search" as const,
  },
  {
    step: 3,
    title: "Визуальная презентация",
    description:
      "Красивые карточки туров: фото, звёзды, рейтинг, питание, даты, цена. Готовая витрина, как в лучших OTA.",
    icon: "LayoutGrid" as const,
  },
  {
    step: 4,
    title: "Консультация и бронь",
    description:
      "Отвечает на вопросы об отелях, сравнивает варианты, показывает перелёты. Готов — оформляет бронирование.",
    icon: "CheckCircle" as const,
  },
];

export const features = [
  {
    title: "Подбор туров",
    description:
      "Поиск по 50+ странам, 500+ курортам, тысячам отелей. Международные и российские направления.",
    icon: "Globe" as const,
  },
  {
    title: "Горящие туры",
    description:
      "Мгновенная выдача горящих предложений по городу вылета с фильтрами по звёздности.",
    icon: "Flame" as const,
  },
  {
    title: "Поиск по отелю",
    description:
      "«Хочу в Rixos» или «Риксос» — найдёт все отели сети. Fuzzy-matching, транслитерация.",
    icon: "Building2" as const,
  },
  {
    title: "Консультация по отелю",
    description:
      "Территория, пляж, бассейн, детская инфраструктура, рейтинг — из реальных данных.",
    icon: "Info" as const,
  },
  {
    title: "Информация о перелёте",
    description:
      "Авиакомпания, время, аэропорты, пересадки — с фоновой загрузкой для мгновенного ответа.",
    icon: "Plane" as const,
  },
  {
    title: "Актуализация цен",
    description:
      "Проверка реальной стоимости в момент запроса, с учётом визовых сборов и доплат.",
    icon: "BadgeRussianRuble" as const,
  },
  {
    title: "Туры без перелёта",
    description:
      "Для клиентов на машине или автобусом. Автоматическое определение формата поездки.",
    icon: "Car" as const,
  },
  {
    title: "Умные safety-nets",
    description:
      "15+ автокорректоров: парсинг дат, конвертация дней в ночи, коррекция бюджета.",
    icon: "Shield" as const,
  },
  {
    title: "Каскадный диалог",
    description:
      "Не задаёт вопросов, на которые клиент уже ответил. Минимум шагов до результата.",
    icon: "GitBranch" as const,
  },
  {
    title: "Мультистрановой поиск",
    description:
      "«Турция или Египет» — найдёт и сравнит оба направления в одном диалоге.",
    icon: "ArrowLeftRight" as const,
  },
  {
    title: "Группы и семьи",
    description:
      "Понимает «вдвоём», «семьёй», «нас 8 человек» — распределяет по номерам.",
    icon: "Users" as const,
  },
  {
    title: "FAQ и общие вопросы",
    description:
      "Визы, погода, что входит в тур, документы — ответы без обращения к менеджеру.",
    icon: "HelpCircle" as const,
  },
];

export const technologies = [
  {
    title: "LLM GPT-5-mini",
    description:
      "Последнее поколение языковой модели. Понимает контекст, помнит историю, ведёт естественную беседу на русском.",
    size: "large" as const,
    icon: "Brain" as const,
  },
  {
    title: "Tourvisor API",
    description:
      "Крупнейший агрегатор туроператоров России. Реальные цены, реальная доступность, 50+ стран.",
    size: "medium" as const,
    icon: "Database" as const,
  },
  {
    title: "15+ Safety-nets",
    description:
      "Автокоррекция ошибок LLM: даты, бюджет, регионы, звёздность, питание.",
    size: "medium" as const,
    icon: "ShieldCheck" as const,
  },
  {
    title: "Async Engine",
    description:
      "Параллельные запросы к API, фоновое кэширование, мгновенные повторные ответы.",
    size: "medium" as const,
    icon: "Zap" as const,
  },
  {
    title: "White-label",
    description: "Работает от имени вашего бренда. Никаких сторонних упоминаний.",
    size: "small" as const,
    icon: "Palette" as const,
  },
  {
    title: "Multi-channel",
    description: "Веб-виджет, ВКонтакте, Telegram — один движок.",
    size: "small" as const,
    icon: "Share2" as const,
  },
  {
    title: "Prefetch Cache",
    description: "Фоновая загрузка перелётов для мгновенных ответов.",
    size: "small" as const,
    icon: "HardDrive" as const,
  },
];

export const metrics = [
  { value: 30, suffix: " сек", prefix: "3–", label: "Среднее время ответа" },
  { value: 90, suffix: "%+", prefix: "", label: "Точность подбора" },
  { value: 24, suffix: "/7", prefix: "", label: "Работает круглосуточно" },
  { value: 1, suffix: " день", prefix: "", label: "Время интеграции" },
];

export const audiences = [
  {
    title: "Турагентства",
    subtitle: "Сети и одиночные офисы",
    description:
      "AI-ассистент берёт первичную консультацию, подбор и презентацию. Менеджер подключается когда клиент готов бронировать. Больше обработанных заявок, меньше потерянных клиентов.",
    icon: "Store" as const,
  },
  {
    title: "Туроператоры",
    subtitle: "B2B и B2C",
    description:
      "Дайте агентам AI-инструмент для мгновенного поиска по вашей базе. Или встройте виджет на B2C-сайт — клиенты получат предложения без ожидания.",
    icon: "Briefcase" as const,
  },
  {
    title: "Онлайн-платформы",
    subtitle: "Маркетплейсы туров",
    description:
      "AI-ассистент превращает сайт в интерактивную витрину: клиент общается как с менеджером, а получает результат как на Booking.com.",
    icon: "Monitor" as const,
  },
];

export const pricingPlans = [
  {
    name: "Старт",
    price: "14 990",
    dialogs: "100",
    popular: false,
    features: [
      "AI-ассистент 24/7",
      "Веб-виджет на сайт",
      "Личный кабинет",
      "Email-поддержка",
    ],
  },
  {
    name: "Рост",
    price: "29 990",
    dialogs: "300",
    popular: true,
    features: [
      "AI-ассистент 24/7",
      "Веб-виджет на сайт",
      "Личный кабинет с аналитикой",
      "Кастомизация виджета",
      "Чат-поддержка",
    ],
  },
  {
    name: "Профи",
    price: "39 990",
    dialogs: "500",
    popular: false,
    features: [
      "AI-ассистент 24/7",
      "Веб-виджет на сайт",
      "Расширенная аналитика",
      "Кастомизация виджета",
      "Приоритетная поддержка",
    ],
  },
  {
    name: "Максимум",
    price: "64 990",
    dialogs: "1 000",
    popular: false,
    features: [
      "AI-ассистент 24/7",
      "Веб-виджет на сайт",
      "Полная аналитика и экспорт",
      "Кастомизация виджета",
      "Персональный менеджер",
    ],
  },
];

export const integrationSteps = [
  {
    step: 1,
    title: "Встраиваете виджет",
    description:
      "Одна строка кода на ваш сайт. Или подключаете бота в ВКонтакте / Telegram.",
  },
  {
    step: 2,
    title: "Настраиваете бренд",
    description:
      "Название, логотип, телефон менеджера, приветственное сообщение.",
  },
  {
    step: 3,
    title: "Запускаете",
    description:
      "Ассистент начинает обрабатывать заявки. Мониторинг и аналитика в личном кабинете.",
  },
];

export const integrationCode = `<script src="https://ai-tour.ru/widget.js"
  data-key="YOUR_API_KEY">
</script>`;

export const ctaContent = {
  title: "Готовы увеличить конверсию заявок?",
  subtitle:
    "Попробуйте AI Tour Assistant на своём сайте. Бесплатный тестовый период — 14 дней.",
  ctaPrimary: "Начать бесплатно",
  ctaSecondary: "Связаться с нами",
};

export const footerLinks = {
  product: {
    title: "Продукт",
    links: [
      { label: "Возможности", href: "/#features" },
      { label: "Тарифы", href: "/#pricing" },
      { label: "Личный кабинет", href: "/dashboard" },
      { label: "Демо", href: "/#demo" },
    ],
  },
  company: {
    title: "Компания",
    links: [
      { label: "О нас", href: "/#partners" },
      { label: "Контакты", href: "/#cta" },
      { label: "Партнёры", href: "/#partners" },
    ],
  },
  resources: {
    title: "Ресурсы",
    links: [
      { label: "Как это работает", href: "/#how-it-works" },
      { label: "Технологии", href: "/#tech" },
      { label: "Интеграция", href: "/#integration" },
    ],
  },
  legal: {
    title: "Правовое",
    links: [
      { label: "Политика конфиденциальности", href: "/#cta" },
      { label: "Условия использования", href: "/#cta" },
      { label: "Оферта", href: "/#cta" },
    ],
  },
};
