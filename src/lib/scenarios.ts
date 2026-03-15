export interface DemoTourCard {
  hotel_name: string;
  hotel_stars: number;
  hotel_rating: number;
  resort: string;
  country: string;
  date_from: string;
  date_to: string;
  nights: number;
  price: number;
  price_per_person?: number;
  meal_description: string;
  room_type: string;
  operator: string;
  departure_city: string;
  flight_included: boolean;
  discount?: number;
  image_url: string;
  hotel_code: number;
}

export interface DemoMessage {
  role: "user" | "assistant";
  text: string;
  cards?: DemoTourCard[];
  delay: number;
}

export interface DemoScenario {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  messages: DemoMessage[];
}

const tv = (code: number) =>
  `https://static.tourvisor.ru/hotel_pics/main400/${code}.jpg`;

export const demoScenarios: DemoScenario[] = [
  // ─── 1. ПОДБОР ТУРА (каскадный диалог) ────────────────────────
  {
    id: "regular",
    title: "Подбор тура",
    subtitle: "Полный каскадный диалог с подбором",
    icon: "Globe",
    messages: [
      {
        role: "user",
        text: "Хочу в Турцию на море",
        delay: 0,
      },
      {
        role: "assistant",
        text: "Отличный выбор! Из какого города планируете вылет?",
        delay: 1,
      },
      {
        role: "user",
        text: "Из Москвы",
        delay: 2,
      },
      {
        role: "assistant",
        text: "Когда хотите поехать и на сколько ночей?",
        delay: 3,
      },
      {
        role: "user",
        text: "В начале июня на неделю",
        delay: 4.2,
      },
      {
        role: "assistant",
        text: "Сколько гостей? Есть ли дети?",
        delay: 5.2,
      },
      {
        role: "user",
        text: "Вдвоём с женой",
        delay: 6.2,
      },
      {
        role: "assistant",
        text: "Какую категорию отеля и тип питания предпочитаете?",
        delay: 7.2,
      },
      {
        role: "user",
        text: "4-5 звёзд, всё включено",
        delay: 8.5,
      },
      {
        role: "assistant",
        text: "Нашёл отличные варианты для вас! Какой заинтересовал?",
        delay: 10,
        cards: [
          {
            hotel_name: "Barut Hemera",
            hotel_stars: 5,
            hotel_rating: 4.7,
            resort: "Сиде",
            country: "Турция",
            date_from: "03.06",
            date_to: "10.06",
            nights: 7,
            price: 142500,
            meal_description: "Всё включено",
            room_type: "Standard",
            operator: "Anex Tour",
            departure_city: "Москва",
            flight_included: true,
            image_url: tv(1033),
            hotel_code: 1033,
          },
          {
            hotel_name: "Calista Luxury Resort",
            hotel_stars: 5,
            hotel_rating: 4.8,
            resort: "Белек",
            country: "Турция",
            date_from: "02.06",
            date_to: "09.06",
            nights: 7,
            price: 186200,
            meal_description: "Ультра всё включено",
            room_type: "Deluxe",
            operator: "Coral Travel",
            departure_city: "Москва",
            flight_included: true,
            image_url: tv(1065),
            hotel_code: 1065,
          },
          {
            hotel_name: "Voyage Belek",
            hotel_stars: 5,
            hotel_rating: 4.6,
            resort: "Белек",
            country: "Турция",
            date_from: "04.06",
            date_to: "11.06",
            nights: 7,
            price: 158900,
            meal_description: "Ультра всё включено",
            room_type: "Standard",
            operator: "Pegas",
            departure_city: "Москва",
            flight_included: true,
            image_url: tv(1582),
            hotel_code: 1582,
          },
        ],
      },
      {
        role: "user",
        text: "Расскажи подробнее о первом",
        delay: 13,
      },
      {
        role: "assistant",
        text: "Barut Hemera 5★ — рейтинг 4.7\n\n📍 Сиде, первая линия, 50 м до моря\n🏖 Песчаный пляж, шезлонги бесплатно\n🏊 3 бассейна + крытый + аквапарк\n🍽 5 ресторанов, 4 бара\n👶 Детский клуб, анимация\n\nХотите узнать о перелёте или что входит в тур?",
        delay: 14.5,
      },
      {
        role: "user",
        text: "А что входит в стоимость?",
        delay: 16,
      },
      {
        role: "assistant",
        text: "В стоимость тура включено:\n\n✈️ Перелёт Москва — Анталья — Москва\n🚗 Групповой трансфер аэропорт — отель\n🏨 Проживание 7 ночей\n🍽 Питание All Inclusive\n🏥 Медицинская страховка\n\nХотите оформить или сравнить с другим?",
        delay: 17.5,
      },
    ],
  },

  // ─── 2. ГОРЯЩИЕ ТУРЫ ──────────────────────────────────────────
  {
    id: "hot",
    title: "Горящие туры",
    subtitle: "Скидки до 40% на ближайшие даты",
    icon: "Flame",
    messages: [
      {
        role: "user",
        text: "Есть горящие путёвки?",
        delay: 0,
      },
      {
        role: "assistant",
        text: "Конечно! Из какого города планируете вылет?",
        delay: 1,
      },
      {
        role: "user",
        text: "Из Москвы",
        delay: 2,
      },
      {
        role: "assistant",
        text: "Вот горящие предложения! Цены за человека. Даты фиксированные — для конкретных параметров могу сделать обычный поиск.",
        delay: 3.5,
        cards: [
          {
            hotel_name: "Side Moon Palace",
            hotel_stars: 5,
            hotel_rating: 4.2,
            resort: "Сиде",
            country: "Турция",
            date_from: "13.03",
            date_to: "19.03",
            nights: 6,
            price: 98880,
            price_per_person: 49440,
            meal_description: "Ультра всё включено",
            room_type: "Standard",
            operator: "Coral Travel",
            departure_city: "Москва",
            flight_included: true,
            discount: 9,
            image_url: tv(111129),
            hotel_code: 111129,
          },
          {
            hotel_name: "Amarina Queen Resort",
            hotel_stars: 5,
            hotel_rating: 4.7,
            resort: "Марса Алам",
            country: "Египет",
            date_from: "06.03",
            date_to: "12.03",
            nights: 6,
            price: 88242,
            price_per_person: 44121,
            meal_description: "Всё включено",
            room_type: "Standard",
            operator: "OneTouch",
            departure_city: "Москва",
            flight_included: true,
            discount: 33,
            image_url: tv(36302),
            hotel_code: 36302,
          },
          {
            hotel_name: "Adalya Elite Lara",
            hotel_stars: 5,
            hotel_rating: 4.5,
            resort: "Лара",
            country: "Турция",
            date_from: "15.03",
            date_to: "22.03",
            nights: 7,
            price: 112600,
            price_per_person: 56300,
            meal_description: "Ультра всё включено",
            room_type: "Deluxe",
            operator: "Anex Tour",
            departure_city: "Москва",
            flight_included: true,
            discount: 18,
            image_url: tv(47025),
            hotel_code: 47025,
          },
        ],
      },
      {
        role: "user",
        text: "Какой пляж у второго?",
        delay: 6.5,
      },
      {
        role: "assistant",
        text: "Amarina Queen Resort — собственный коралловый риф, пляж песчаный с пологим входом. Первая линия, до моря 80 м. Шезлонги и зонтики бесплатно. Отличный для снорклинга!\n\nХотите уточнить стоимость или узнать о перелёте?",
        delay: 8,
      },
      {
        role: "user",
        text: "Нужна ли виза в Египет?",
        delay: 9.5,
      },
      {
        role: "assistant",
        text: "Виза оформляется по прилёту в аэропорту — $25. Некоторые операторы включают в стоимость тура. Загранпаспорт должен быть действителен 6 месяцев после окончания тура.\n\nХотите забронировать или посмотреть другие горящие?",
        delay: 11,
      },
    ],
  },

  // ─── 3. КОНКРЕТНЫЙ ОТЕЛЬ ───────────────────────────────────────
  {
    id: "hotel",
    title: "Конкретный отель",
    subtitle: "Поиск по названию или бренду",
    icon: "Building2",
    messages: [
      {
        role: "user",
        text: "Хочу в Rixos в Турцию",
        delay: 0,
      },
      {
        role: "assistant",
        text: "Rixos — отличная сеть! Из какого города вылет?",
        delay: 1,
      },
      {
        role: "user",
        text: "Из Москвы, середина июля, вдвоём",
        delay: 2.5,
      },
      {
        role: "assistant",
        text: "Какой тип питания предпочитаете?",
        delay: 3.5,
      },
      {
        role: "user",
        text: "Всё включено",
        delay: 4.5,
      },
      {
        role: "assistant",
        text: "Нашёл предложения по отелям сети Rixos:",
        delay: 6,
        cards: [
          {
            hotel_name: "Rixos Premium Belek",
            hotel_stars: 5,
            hotel_rating: 4.8,
            resort: "Белек",
            country: "Турция",
            date_from: "14.07",
            date_to: "21.07",
            nights: 7,
            price: 245800,
            meal_description: "Ультра всё включено",
            room_type: "Superior",
            operator: "Anex Tour",
            departure_city: "Москва",
            flight_included: true,
            image_url: tv(1449),
            hotel_code: 1449,
          },
          {
            hotel_name: "Rixos Sungate",
            hotel_stars: 5,
            hotel_rating: 4.6,
            resort: "Кемер",
            country: "Турция",
            date_from: "15.07",
            date_to: "22.07",
            nights: 7,
            price: 198500,
            meal_description: "Ультра всё включено",
            room_type: "Standard",
            operator: "Coral Travel",
            departure_city: "Москва",
            flight_included: true,
            image_url: tv(1452),
            hotel_code: 1452,
          },
          {
            hotel_name: "Rixos Downtown Antalya",
            hotel_stars: 5,
            hotel_rating: 4.5,
            resort: "Анталья",
            country: "Турция",
            date_from: "13.07",
            date_to: "20.07",
            nights: 7,
            price: 142000,
            meal_description: "Всё включено",
            room_type: "Deluxe",
            operator: "Pegas",
            departure_city: "Москва",
            flight_included: true,
            image_url: tv(1494),
            hotel_code: 1494,
          },
        ],
      },
      {
        role: "user",
        text: "Какой перелёт в первом?",
        delay: 9,
      },
      {
        role: "assistant",
        text: "Перелёт в Rixos Premium Belek:\n\n✈️ Туда: Москва (VKO) → Анталья (AYT)\nAzur Air, вылет 14.07 в 08:45, прилёт 12:20\nПрямой рейс, 3ч 35м\n\n✈️ Обратно: Анталья → Москва\n21.07 в 13:10, прилёт 18:40\n\nХотите уточнить актуальную цену?",
        delay: 10.5,
      },
      {
        role: "user",
        text: "Да, уточни цену",
        delay: 12,
      },
      {
        role: "assistant",
        text: "Актуальная стоимость Rixos Premium Belek:\n\n💰 245 800 ₽ за двоих (7 ночей)\n📋 Визовый сбор: не требуется\n✅ Мгновенное подтверждение\n🏥 Страховка включена\n\nДля оформления нажмите «Оформить тур» на карточке. Могу помочь с чем-то ещё?",
        delay: 13.5,
      },
    ],
  },

  // ─── 4. БЕЗ ПЕРЕЛЁТА ──────────────────────────────────────────
  {
    id: "noflight",
    title: "Без перелёта",
    subtitle: "Для поездки на машине или автобусе",
    icon: "Car",
    messages: [
      {
        role: "user",
        text: "Хотим в Сочи на машине",
        delay: 0,
      },
      {
        role: "assistant",
        text: "Понял, тур без перелёта — только проживание! Когда планируете и на сколько ночей?",
        delay: 1,
      },
      {
        role: "user",
        text: "Начало июля на 10 ночей, 2 взрослых и ребёнок 5 лет",
        delay: 2.5,
      },
      {
        role: "assistant",
        text: "Какую категорию отеля и тип питания предпочитаете?",
        delay: 3.5,
      },
      {
        role: "user",
        text: "4 звезды, завтрак",
        delay: 4.5,
      },
      {
        role: "assistant",
        text: "Нашёл варианты в Сочи без перелёта:",
        delay: 6,
        cards: [
          {
            hotel_name: "Radisson Collection Paradise",
            hotel_stars: 5,
            hotel_rating: 4.6,
            resort: "Адлер",
            country: "Россия",
            date_from: "01.07",
            date_to: "11.07",
            nights: 10,
            price: 98400,
            meal_description: "Завтрак",
            room_type: "Standard",
            operator: "Алеан",
            departure_city: "—",
            flight_included: false,
            image_url: tv(4832),
            hotel_code: 4832,
          },
          {
            hotel_name: "Hyatt Regency Sochi",
            hotel_stars: 5,
            hotel_rating: 4.5,
            resort: "Центр. Сочи",
            country: "Россия",
            date_from: "01.07",
            date_to: "11.07",
            nights: 10,
            price: 112600,
            meal_description: "Завтрак",
            room_type: "Standard",
            operator: "Алеан",
            departure_city: "—",
            flight_included: false,
            image_url: tv(63929),
            hotel_code: 63929,
          },
          {
            hotel_name: "Бридж Резорт",
            hotel_stars: 4,
            hotel_rating: 4.3,
            resort: "Адлер",
            country: "Россия",
            date_from: "01.07",
            date_to: "11.07",
            nights: 10,
            price: 62800,
            meal_description: "Завтрак",
            room_type: "Standard",
            operator: "Алеан",
            departure_city: "—",
            flight_included: false,
            image_url: tv(29042),
            hotel_code: 29042,
          },
        ],
      },
      {
        role: "user",
        text: "Далеко ли первый от моря?",
        delay: 9,
      },
      {
        role: "assistant",
        text: "Radisson Collection Paradise — первая линия, до моря 150 м. Собственный галечный пляж, шезлонги бесплатно. Территория 10 га с субтропическим парком.\n\nХотите узнать о детской инфраструктуре?",
        delay: 10.5,
      },
      {
        role: "user",
        text: "Да, есть ли развлечения для ребёнка?",
        delay: 12,
      },
      {
        role: "assistant",
        text: "Для детей в Radisson Collection:\n\n👶 Детский клуб (4-12 лет)\n🏊 Отдельный детский бассейн\n🎪 Анимация каждый день\n🎮 Игровая комната и площадка\n🍽 Детское меню на завтраке\n\nХотите забронировать или сравнить с другими?",
        delay: 13.5,
      },
    ],
  },

  // ─── 5. FAQ ────────────────────────────────────────────────────
  {
    id: "faq",
    title: "Частые вопросы",
    subtitle: "Визы, питание, документы и др.",
    icon: "HelpCircle",
    messages: [
      {
        role: "user",
        text: "Нужна ли виза в Турцию?",
        delay: 0,
      },
      {
        role: "assistant",
        text: "Для граждан России виза в Турцию не нужна — можно находиться до 60 дней. Достаточно загранпаспорта, действительного не менее 120 дней после въезда.\n\nМогу помочь с подбором тура?",
        delay: 1.2,
      },
      {
        role: "user",
        text: "Что входит в стоимость тура?",
        delay: 2.5,
      },
      {
        role: "assistant",
        text: "В стоимость пакетного тура включено:\n\n✅ Авиаперелёт туда и обратно\n✅ Трансфер аэропорт — отель — аэропорт\n✅ Проживание в отеле\n✅ Питание (по выбранному типу)\n✅ Медицинская страховка\n\n❌ Не включено: виза, экскурсии, индивидуальный трансфер.\n\nЧто ещё хотите узнать?",
        delay: 4,
      },
      {
        role: "user",
        text: "Можно оплатить картой?",
        delay: 5.5,
      },
      {
        role: "assistant",
        text: "Да! Принимаем МИР, VISA, MasterCard и СБП (QR-код). При полной оплате цена фиксируется. При предоплате 50% — доплата по курсу на день внесения.\n\nОплата до вылета >14 дней — можно 50%. Менее 14 дней — 100%.\n\nПодобрать тур?",
        delay: 7,
      },
      {
        role: "user",
        text: "Какое питание лучше с детьми?",
        delay: 8.5,
      },
      {
        role: "assistant",
        text: "С детьми рекомендую All Inclusive:\n\n🍽 AI — 3 приёма пищи + снэки + напитки весь день. Детское меню в отелях 4-5★.\n🍽 UAI — всё то же + рестораны à la carte, premium напитки.\n\nВ отелях 5★ обычно лучшая детская инфраструктура. Подобрать варианты?",
        delay: 10,
      },
    ],
  },

  // ─── 6. СВЯЗЬ С МЕНЕДЖЕРОМ ─────────────────────────────────────
  {
    id: "sos",
    title: "Связь с менеджером",
    subtitle: "Бронирование, изменения, помощь",
    icon: "Phone",
    messages: [
      {
        role: "user",
        text: "Хочу поменять даты в бронировании",
        delay: 0,
      },
      {
        role: "assistant",
        text: "Для изменения дат необходимо обратиться к менеджеру — это требует согласования с туроператором.\n\n📞 +7 (800) 555-35-35 (бесплатно)\n⏰ Ежедневно с 9:00 до 21:00\n\nМенеджер проверит возможность переноса и рассчитает доплату.",
        delay: 1.2,
      },
      {
        role: "user",
        text: "А можно отменить тур?",
        delay: 3,
      },
      {
        role: "assistant",
        text: "Отмена возможна, условия зависят от сроков:\n\n• >30 дней до вылета — возврат большей части\n• 15–30 дней — частичное удержание\n• <15 дней — штрафные санкции оператора\n\n📞 +7 (800) 555-35-35\n\nРекомендую страховку от невыезда (~3-5% от тура) при следующем бронировании.",
        delay: 4.5,
      },
      {
        role: "user",
        text: "Когда придут документы на тур?",
        delay: 6,
      },
      {
        role: "assistant",
        text: "Документы (ваучер, маршрутная квитанция, страховой полис) придут на email за 2-4 дня до вылета. Распечатайте и возьмите с собой.\n\n📞 +7 (800) 555-35-35 — если документы не пришли вовремя.\n\nМогу помочь с чем-то ещё?",
        delay: 7.5,
      },
    ],
  },
];
