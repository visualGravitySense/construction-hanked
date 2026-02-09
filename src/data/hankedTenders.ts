// Andmed hanked.ee hangetest (kogutud parsijaga)
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
    title: "Betoonitööd elukompleksi jaoks Tallinnas",
    description: "Betoonitööde teostamine elukompleksi ehitamisel. Sisaldab vundamendi valamist, monoliitseid seinu ja vahelagid. Betoneerimise üldpindala - 2500 m².",
    source: "Hanked.ee",
    category: "Betoonitööd",
    region: "Tallinn",
    value: "€125,000",
    deadline: "2026-01-31",
    published_date: "2026-01-11",
    buyer: "AS Eesti Kinnisvara",
    status: "active",
    matched: true,
    matched_keywords: ["betoon", "betoonitööd", "vundament"],
    cpv_code: "45210000",
    url: "https://www.mercell.com/et-ee/tender/demo-1",
    documents: [
      { name: "Tehniline ülesanne.pdf", url: "https://example.com/doc1.pdf" },
      { name: "Joonised.pdf", url: "https://example.com/doc2.pdf" }
    ],
    found_at: "2026-01-16T16:34:51.855353",
    parsed_at: "2026-01-16T16:34:51.855353"
  },
  {
    id: 2,
    title: "Betoonvundamendi valamine haldushoone jaoks",
    description: "Betoonitööd haldushoone vundamendi rajamiseks Tartus. Vajalik monoliitse vundamendi valamine pindalaga 800 m², betooniklass B25.",
    source: "Hanked.ee",
    category: "Betoonitööd",
    region: "Tartu",
    value: "€85,000",
    deadline: "2026-02-07",
    published_date: "2026-01-13",
    buyer: "Tartu Linnavalitsus",
    status: "active",
    matched: true,
    matched_keywords: ["betoon", "vundament", "betooni valamine"],
    cpv_code: "45220000",
    url: "https://www.mercell.com/et-ee/tender/demo-2",
    documents: [
      { name: "Projekti dokumentatsioon.pdf", url: "https://example.com/doc3.pdf" }
    ],
    found_at: "2026-01-16T16:34:51.855353",
    parsed_at: "2026-01-16T16:34:51.855353"
  },
  {
    id: 3,
    title: "Betoonitööd teekatte rekonstrueerimisel",
    description: "Betoonitööde teostamine maantee lõigu rekonstrueerimisel Narvas. Sisaldab vana katte demonteerimist, aluse ettevalmistust ja uue betoonkatte valamist paksusega 25 cm.",
    source: "Hanked.ee",
    category: "Betoonitööd",
    region: "Narva",
    value: "€250,000",
    deadline: "2026-02-15",
    published_date: "2026-01-09",
    buyer: "Narva Linna Tööstus",
    status: "active",
    matched: true,
    matched_keywords: ["betoon", "betoonitööd", "betoneerimine"],
    cpv_code: "45233140",
    url: "https://www.mercell.com/et-ee/tender/demo-3",
    documents: [
      { name: "Tehnilised tingimused.pdf", url: "https://example.com/doc4.pdf" },
      { name: "Krundi skeem.pdf", url: "https://example.com/doc5.pdf" }
    ],
    found_at: "2026-01-16T16:34:51.855353",
    parsed_at: "2026-01-16T16:34:51.855353"
  },
  {
    id: 4,
    title: "Raudbetoonkonstruktsioonide paigaldus laokompleksi jaoks",
    description: "Betoonitööd raudbetoonsammaste, talade ja vahelagide paigaldamiseks laokompleksis Pärnus. Betoonitööde maht - 1200 m³. Betooniklass B30.",
    source: "Hanked.ee",
    category: "Betoonitööd",
    region: "Pärnu",
    value: "€180,000",
    deadline: "2026-02-03",
    published_date: "2026-01-14",
    buyer: "Pärnu Kaubanduskeskus OÜ",
    status: "active",
    matched: true,
    matched_keywords: ["raudbetoon", "betoonitööd", "betoon"],
    cpv_code: "45210000",
    url: "https://www.mercell.com/et-ee/tender/demo-4",
    documents: [
      { name: "Töödokumentatsioon.pdf", url: "https://example.com/doc6.pdf" },
      { name: "Spetsifikatsioon.pdf", url: "https://example.com/doc7.pdf" }
    ],
    found_at: "2026-01-16T16:34:51.855353",
    parsed_at: "2026-01-16T16:34:51.855353"
  },
  {
    id: 5,
    title: "Monoliitsete seinte ja vahelagide betoneerimine kontorihones",
    description: "Betoonitööde teostamine monoliitsete kandeseinte ja vahelagide paigaldamiseks 5-korruselises kontorihones Tallinnas. Betoneerimise pindala - 3200 m². Vajalik betoonipumba kasutamine.",
    source: "Hanked.ee",
    category: "Betoonitööd",
    region: "Tallinn",
    value: "€195,000",
    deadline: "2026-02-10",
    published_date: "2026-01-12",
    buyer: "Tallinna Ärikeskus AS",
    status: "active",
    matched: true,
    matched_keywords: ["betoon", "betoneerimine", "monoliitsed seinad"],
    cpv_code: "45210000",
    url: "https://www.mercell.com/et-ee/tender/demo-5",
    documents: [
      { name: "Arhitektuuriprojekt.pdf", url: "https://example.com/doc8.pdf" },
      { name: "Konstruktsiooniprojekt.pdf", url: "https://example.com/doc9.pdf" },
      { name: "Kalkulatsioon.pdf", url: "https://example.com/doc10.pdf" }
    ],
    found_at: "2026-01-16T16:34:51.855353",
    parsed_at: "2026-01-16T16:34:51.855353"
  }
];
