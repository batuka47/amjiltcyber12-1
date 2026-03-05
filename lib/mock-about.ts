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

export const TIMELINE: TimelineItem[] = [
  {
    date: "2024-09-01",
    title: "Хичээлийн шинэ жил эхэлсэн",
    description: "Бүх сурагчид шинэ хичээлийн жилдээ баяртай угтлаа.",
  },
  {
    date: "2024-10-15",
    title: "Математикийн олимпиадад 2-р байр",
    description:
      "Ганзориг, Тэмүүлэн нар сургуулийн математикийн олимпиадад амжилттай оролцлоо.",
  },
  {
    date: "2024-12-20",
    title: "Шинэ жилийн тоглолт",
    description:
      "Ангийн сурагчид бүжиг, дуу бэлдэж, шинэ жилийн тоглолтод оролцсон.",
  },
  {
    date: "2025-03-08",
    title: "Дээлтэй Монгол өдөр",
    description:
      "Бүх сурагчид дээлтэй ирж, Монгол ёс заншлын тухай ярилцлаа.",
  },
  {
    date: "2025-05-25",
    title: "Спорт наадам — 1-р байр",
    description:
      "Амжилт кибер 12-1 анги сургуулийн спорт наадамд нийт дүнгээр 1-р байр эзэллээ.",
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
