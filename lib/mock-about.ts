export interface Achievement {
  title: string
  date: string
  description: string
}

export interface Student {
  id: string
  name: string
  gender: "male" | "female"
  bestTitle: string
  avatarUrl: string | null
  achievements: Achievement[]
}

export interface TimelineItem {
  date: string
  title: string
  description: string
}

export const TEACHER = {
  name: "Д. Оюунтуяа",
  position: "Ангийн багш",
  bio: "Боловсролын Их Сургууль төгссөн, 12 жилийн туршлагатай багш. Хүүхдүүдийн хөгжил, бүтээлч сэтгэлгээг дэмжих нь миний хамгийн чухал зорилго юм.",
  email: "oyuntuya@school.mn",
  phone: "+976 9911 2233",
} as const

export const TIMELINE = [
  {
    date: "2025-04-15",
    title: "11-р ангийн Урлагийн үзлэг",
    description: `
• Чөлөөт бүжиг — 1-р байр
• Найрал дуу — 1-р байр
• Цэнгээнт бүжиг — 1-р байр
• Гоцлол дуу — 2-р байр
• Шилдэг анги
`,
  },
  {
    date: "2025-05-10",
    title: "Спартакиад",
    description: `
• Олс таталтын тэмцээн — 3-р байр
`,
  },
  {
    date: "2025-05-25",
    title: "Сургуулийн Волейболын тэмцээн",
    description: `
• 11-р ангийн баг — 3-р байр
`,
  },
  {
    date: "2025-06-02",
    title: "Сагсан бөмбөгийн тэмцээн",
    description: `
• 11-р ангийн баг — 1-р байр
`,
  },
]

export const MOCK_STUDENTS: Student[] = [
  {
    id: "s1",
    name: "Б. Бат-Эрдэнэ",
    gender: "male",
    bestTitle: "Хамгийн тусч",
    avatarUrl: null,
    achievements: [
      {
        title: "Хөгжмийн уралдаанд 1-р байр",
        date: "2024-11-10",
        description: "Сургуулийн хөгжмийн уралдаанд ятгаар тоглож 1-р байр эзэлсэн.",
      },
      {
        title: "Ангийн ахлагчаар сонгогдсон",
        date: "2024-09-05",
        description: "Ангийн найзуудын санал хураалтаар ахлагчаар сонгогдсон.",
      },
    ],
  },
  {
    id: "s2",
    name: "С. Сарангэрэл",
    gender: "female",
    bestTitle: "Хамгийн ухаантай",
    avatarUrl: null,
    achievements: [
      {
        title: "Шилдэг сурагч",
        date: "2024-12-15",
        description: "Хичээлийн жилийн 1-р хагаст хамгийн өндөр голчтой байсан.",
      },
      {
        title: "Англи хэлний уралдаанд 2-р байр",
        date: "2025-02-20",
        description: "Дүүргийн англи хэлний уралдаанд амжилттай оролцсон.",
      },
    ],
  },
  {
    id: "s3",
    name: "Т. Тэмүүлэн",
    gender: "male",
    bestTitle: "Хамгийн хурдан",
    avatarUrl: null,
    achievements: [
      {
        title: "100м гүйлтэнд 1-р байр",
        date: "2025-05-25",
        description: "Спорт наадмын 100 метрийн гүйлтэнд 1-р байр эзэлсэн.",
      },
    ],
  },
  {
    id: "s4",
    name: "Н. Номин-Эрдэнэ",
    gender: "female",
    bestTitle: "Хамгийн бүтээлч",
    avatarUrl: null,
    achievements: [
      {
        title: "Зургийн уралдаанд тусгай байр",
        date: "2025-01-18",
        description: "Нийслэлийн зургийн уралдаанд тусгай шагнал хүртсэн.",
      },
      {
        title: "Ангийн самбарыг чимсэн",
        date: "2024-09-10",
        description: "Хичээлийн жилийн эхний ангийн самбарыг бүтээлчээр чимсэн.",
      },
    ],
  },
  {
    id: "s5",
    name: "Г. Ганзориг",
    gender: "male",
    bestTitle: "Хамгийн хөгжилтэй",
    avatarUrl: null,
    achievements: [
      {
        title: "Математикийн олимпиад 2-р байр",
        date: "2024-10-15",
        description: "Сургуулийн математикийн олимпиадад 2-р байр эзэлсэн.",
      },
    ],
  },
  {
    id: "s6",
    name: "О. Оюунчимэг",
    gender: "female",
    bestTitle: "Хамгийн эелдэг",
    avatarUrl: null,
    achievements: [
      {
        title: "Зан харилцааны шилдэг сурагч",
        date: "2024-12-15",
        description: "Зан харилцааны хамгийн сайн сурагчаар шалгарсан.",
      },
      {
        title: "Уншлагын марафонд 1-р байр",
        date: "2025-04-10",
        description: "Номын сангийн уншлагын марафонд хамгийн олон ном уншсан.",
      },
    ],
  },
]

export const SITE_CREATORS = [
  { name: "Б. Бат-Энх", role: "Хөгжүүлэгч" },
  { name: "Б. Бат-Эрдэнэ", role: "Дизайнер" },
] as const
