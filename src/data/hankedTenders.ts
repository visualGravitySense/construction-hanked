// Данные о тендерах с hanked.ee (собраны парсером)
export interface TenderDocument {
  name: string;
  url: string;
}

export interface Tender {
  id: number;
  title: string;
  description: string;
  source: string;
  category: string;
  region: string;
  value: string;
  deadline: string;
  published_date: string;
  buyer: string;
  status: string;
  matched: boolean;
  matched_keywords?: string[];
  cpv_code?: string;
  url: string;
  documents?: TenderDocument[];
  found_at?: string;
  parsed_at?: string;
}

export const hankedTenders: Tender[] = [
  {
    id: 1,
    title: "Бетонные работы для жилого комплекса в Таллинне",
    description: "Выполнение бетонных работ при строительстве жилого комплекса. Включает заливку фундамента, монолитных стен и перекрытий. Общая площадь бетонирования - 2500 м².",
    source: "Hanked.ee",
    category: "Бетонные работы",
    region: "Таллинн",
    value: "€125,000",
    deadline: "2026-01-31",
    published_date: "2026-01-11",
    buyer: "AS Eesti Kinnisvara",
    status: "active",
    matched: true,
    matched_keywords: ["бетон", "бетонные работы", "фундамент"],
    cpv_code: "45210000",
    url: "https://www.mercell.com/et-ee/tender/demo-1",
    documents: [
      { name: "Техническое задание.pdf", url: "https://example.com/doc1.pdf" },
      { name: "Чертежи.pdf", url: "https://example.com/doc2.pdf" }
    ],
    found_at: "2026-01-16T16:34:51.855353",
    parsed_at: "2026-01-16T16:34:51.855353"
  },
  {
    id: 2,
    title: "Заливка бетонного фундамента для административного здания",
    description: "Бетонные работы по устройству фундамента административного здания в Тарту. Требуется заливка монолитного фундамента площадью 800 м², класс бетона B25.",
    source: "Hanked.ee",
    category: "Бетонные работы",
    region: "Тарту",
    value: "€85,000",
    deadline: "2026-02-07",
    published_date: "2026-01-13",
    buyer: "Tartu Linnavalitsus",
    status: "active",
    matched: true,
    matched_keywords: ["бетон", "фундамент", "заливка бетона"],
    cpv_code: "45220000",
    url: "https://www.mercell.com/et-ee/tender/demo-2",
    documents: [
      { name: "Проектная документация.pdf", url: "https://example.com/doc3.pdf" }
    ],
    found_at: "2026-01-16T16:34:51.855353",
    parsed_at: "2026-01-16T16:34:51.855353"
  },
  {
    id: 3,
    title: "Бетонные работы по реконструкции дорожного покрытия",
    description: "Выполнение бетонных работ при реконструкции участка автомобильной дороги в Нарве. Включает демонтаж старого покрытия, подготовку основания и заливку нового бетонного покрытия толщиной 25 см.",
    source: "Hanked.ee",
    category: "Бетонные работы",
    region: "Нарва",
    value: "€250,000",
    deadline: "2026-02-15",
    published_date: "2026-01-09",
    buyer: "Narva Linna Tööstus",
    status: "active",
    matched: true,
    matched_keywords: ["бетон", "бетонные работы", "бетонирование"],
    cpv_code: "45233140",
    url: "https://www.mercell.com/et-ee/tender/demo-3",
    documents: [
      { name: "Технические условия.pdf", url: "https://example.com/doc4.pdf" },
      { name: "Схема участка.pdf", url: "https://example.com/doc5.pdf" }
    ],
    found_at: "2026-01-16T16:34:51.855353",
    parsed_at: "2026-01-16T16:34:51.855353"
  },
  {
    id: 4,
    title: "Устройство железобетонных конструкций для складского комплекса",
    description: "Бетонные работы по устройству железобетонных колонн, балок и перекрытий складского комплекса в Пярну. Объем бетонных работ - 1200 м³. Класс бетона B30.",
    source: "Hanked.ee",
    category: "Бетонные работы",
    region: "Пярну",
    value: "€180,000",
    deadline: "2026-02-03",
    published_date: "2026-01-14",
    buyer: "Pärnu Kaubanduskeskus OÜ",
    status: "active",
    matched: true,
    matched_keywords: ["железобетон", "бетонные работы", "бетон"],
    cpv_code: "45210000",
    url: "https://www.mercell.com/et-ee/tender/demo-4",
    documents: [
      { name: "Рабочая документация.pdf", url: "https://example.com/doc6.pdf" },
      { name: "Спецификация.pdf", url: "https://example.com/doc7.pdf" }
    ],
    found_at: "2026-01-16T16:34:51.855353",
    parsed_at: "2026-01-16T16:34:51.855353"
  },
  {
    id: 5,
    title: "Бетонирование монолитных стен и перекрытий офисного здания",
    description: "Выполнение бетонных работ по устройству монолитных несущих стен и перекрытий 5-этажного офисного здания в Таллинне. Площадь бетонирования - 3200 м². Требуется использование бетононасоса.",
    source: "Hanked.ee",
    category: "Бетонные работы",
    region: "Таллинн",
    value: "€195,000",
    deadline: "2026-02-10",
    published_date: "2026-01-12",
    buyer: "Tallinna Ärikeskus AS",
    status: "active",
    matched: true,
    matched_keywords: ["бетон", "бетонирование", "монолитные стены"],
    cpv_code: "45210000",
    url: "https://www.mercell.com/et-ee/tender/demo-5",
    documents: [
      { name: "Архитектурный проект.pdf", url: "https://example.com/doc8.pdf" },
      { name: "Конструктивный проект.pdf", url: "https://example.com/doc9.pdf" },
      { name: "Смета.pdf", url: "https://example.com/doc10.pdf" }
    ],
    found_at: "2026-01-16T16:34:51.855353",
    parsed_at: "2026-01-16T16:34:51.855353"
  }
];
