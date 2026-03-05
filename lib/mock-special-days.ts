import type { Memory } from "./mock-memories"
import type { Student } from "./mock-about"

export interface SpecialDayGallery {
  id: string
  title: string
  subtitle: string
  type: "gallery"
  coverImage: string | null
  date: string
}

export interface SpecialDayProtectedVideo {
  id: string
  title: string
  subtitle: string
  type: "protected_video"
  coverImage: string | null
  date: string
  password: string
  youtubeUrl: string
  description: string
  specialStudents: Student[]
}

export type SpecialDay = SpecialDayGallery | SpecialDayProtectedVideo

export const MOCK_SPECIAL_DAY: SpecialDayGallery = {
  id: "sd1",
  title: "Дээлтэй өдөр",
  subtitle: "Монголын үндэсний хувцас өмсөх уламжлалт өдөр",
  type: "gallery",
  coverImage: null,
  date: "2025-03-08",
}

export const MOCK_PROTECTED_VIDEO_DAY: SpecialDayProtectedVideo = {
  id: "sd2",
  title: "Төгсөлтийн нууц видео",
  subtitle: "Зөвхөн ангийнхандаа зориулсан онцгой видео",
  type: "protected_video",
  coverImage: null,
  date: "2025-06-15",
  password: "1234",
  youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  description:
    "Энэ бол бидний ангийн хамгийн сайхан дурсамжуудыг нэгтгэсэн онцгой видео юм. Бид хамтдаа олон зүйлийг туулж, хамтдаа өссөн. Энэ видеонд бидний хамгийн сайхан мөчүүд, хамгийн их инээсэн үеүүд, хамгийн их хөдөлгөөнтэй байсан агшнууд багтсан болно. Энэ бол зөвхөн бидний ангийнхандаа зориулсан нууц бэлэг юм.",
  specialStudents: [
    {
      id: "ss1",
      name: "Б. Бат-Эрдэнэ",
      gender: "male",
      bestTitle: "Шилдэг найз",
      avatarUrl: null,
      achievements: [
        {
          title: "Хамгийн их туслах гар",
          date: "2025-06-01",
          description: "Найзуудадаа байнга тусалж, хамт олныг нэгтгэдэг.",
        },
        {
          title: "Ангийн ахлагч",
          date: "2024-09-05",
          description: "Нэг жилийн турш ангийн ахлагчаар ажилласан.",
        },
      ],
    },
    {
      id: "ss2",
      name: "С. Сарангэрэл",
      gender: "female",
      bestTitle: "Оюуны од",
      avatarUrl: null,
      achievements: [
        {
          title: "Хамгийн өндөр дундаж",
          date: "2025-05-20",
          description: "Жилийн турш хамгийн өндөр голчтой байсан.",
        },
      ],
    },
    {
      id: "ss3",
      name: "Т. Тэмүүлэн",
      gender: "male",
      bestTitle: "Спортын од",
      avatarUrl: null,
      achievements: [
        {
          title: "Спорт наадмын аварга",
          date: "2025-05-25",
          description: "Спорт наадамд хамгийн олон медаль авсан.",
        },
      ],
    },
    {
      id: "ss4",
      name: "Н. Номин-Эрдэнэ",
      gender: "female",
      bestTitle: "Урлагийн од",
      avatarUrl: null,
      achievements: [
        {
          title: "Бүтээлч сурагч",
          date: "2025-04-10",
          description: "Урлаг бүтээлийн үзэсгэлэнд шилдэг бүтээл танилцуулсан.",
        },
      ],
    },
    {
      id: "ss5",
      name: "Г. Ганзориг",
      gender: "male",
      bestTitle: "Хөгжилтэй найз",
      avatarUrl: null,
      achievements: [
        {
          title: "Инээдмийн аварга",
          date: "2025-06-01",
          description: "Ангийнхаа хамгийн хөгжилтэй хүн.",
        },
      ],
    },
    {
      id: "ss6",
      name: "О. Оюунчимэг",
      gender: "female",
      bestTitle: "Эелдэг бүсгүй",
      avatarUrl: null,
      achievements: [
        {
          title: "Зан харилцааны шилдэг",
          date: "2025-05-15",
          description: "Хамгийн эелдэг, зөв зан харилцаатай сурагч.",
        },
      ],
    },
  ],
}

export const MOCK_SPECIAL_DAY_IMAGES: Memory[] = [
  {
    id: "sd1-1",
    title: "Ангийн хамтын дээлтэй зураг",
    description:
      "Бүх анги хамтдаа дээлтэй зургаа авахуулсан. Монгол хувцас маш гоё харагдаж байлаа.",
    takenAt: "2025-03-08",
    imageUrl: null,
    people: [
      { id: "p1", name: "Бат-Эрдэнэ" },
      { id: "p2", name: "Сарангэрэл" },
      { id: "p3", name: "Тэмүүлэн" },
      { id: "p4", name: "Номин-Эрдэнэ" },
    ],
  },
  {
    id: "sd1-2",
    title: "Охидын дээлтэй зураг",
    description:
      "Ангийн охид үндэсний хувцсаараа гоёлоо. Төрөл бүрийн өнгийн дээл өмссөн байлаа.",
    takenAt: "2025-03-08",
    imageUrl: null,
    people: [
      { id: "p2", name: "Сарангэрэл" },
      { id: "p4", name: "Номин-Эрдэнэ" },
      { id: "p6", name: "Оюунчимэг" },
    ],
  },
  {
    id: "sd1-3",
    title: "Хөвгүүдийн дээлтэй зураг",
    description:
      "Хөвгүүд уламжлалт хувцсаараа цувж байна. Тэд малгайгаа ч өмссөн байлаа.",
    takenAt: "2025-03-08",
    imageUrl: null,
    people: [
      { id: "p1", name: "Бат-Эрдэнэ" },
      { id: "p3", name: "Тэмүүлэн" },
      { id: "p5", name: "Ганзориг" },
    ],
  },
  {
    id: "sd1-4",
    title: "Багштайгаа хамт",
    description:
      "Ангийн багш болон сурагчид хамтдаа зургаа авахуулсан. Багш ч бас дээлтэй ирсэн.",
    takenAt: "2025-03-08",
    imageUrl: null,
    people: [
      { id: "p1", name: "Бат-Эрдэнэ" },
      { id: "p2", name: "Сарангэрэл" },
      { id: "p6", name: "Оюунчимэг" },
    ],
  },
  {
    id: "sd1-5",
    title: "Уламжлалт тоглоом",
    description:
      "Хүүхдүүд монгол уламжлалт тоглоом тоглож байгаа зураг. Шагай харвалт маш сонирхолтой байлаа.",
    takenAt: "2025-03-08",
    imageUrl: null,
    people: [
      { id: "p3", name: "Тэмүүлэн" },
      { id: "p4", name: "Номин-Эрдэнэ" },
      { id: "p5", name: "Ганзориг" },
    ],
  },
  {
    id: "sd1-6",
    title: "Уламжлалт хоол",
    description:
      "Монгол уламжлалт хоол идэж байгаа зураг. Бууз, хуушуур маш амттай байлаа.",
    takenAt: "2025-03-08",
    imageUrl: null,
    people: [
      { id: "p1", name: "Бат-Эрдэнэ" },
      { id: "p5", name: "Ганзориг" },
      { id: "p6", name: "Оюунчимэг" },
    ],
  },
]
