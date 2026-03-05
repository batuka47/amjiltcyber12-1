export interface Person {
  id: string
  name: string
}

export interface Memory {
  id: string
  title: string
  description: string
  takenAt: string
  imageUrl: string | null
  people: Person[]
}

export const STUDENTS = [
  "Бат-Эрдэнэ",
  "Сарангэрэл",
  "Тэмүүлэн",
  "Номин-Эрдэнэ",
  "Ганзориг",
  "Оюунчимэг",
] as const

export const MOCK_MEMORIES: Memory[] = [
  {
    id: "1",
    title: "Ангийн хамтын зураг",
    description:
      "2024 оны хичээлийн жилийн эхний өдөр бүх анги хамтдаа зургаа авахуулсан. Бүгд инээмсэглэж байлаа.",
    takenAt: "2024-09-01",
    imageUrl: null,
    people: [
      { id: "p1", name: "Бат-Эрдэнэ" },
      { id: "p2", name: "Сарангэрэл" },
      { id: "p3", name: "Тэмүүлэн" },
    ],
  },
  {
    id: "2",
    title: "Шинэ жилийн баяр",
    description:
      "Ангийн шинэ жилийн үдэшлэгийн үеэр авсан зураг. Хүүхдүүд бэлэг солилцож байсан.",
    takenAt: "2024-12-27",
    imageUrl: null,
    people: [
      { id: "p4", name: "Номин-Эрдэнэ" },
      { id: "p5", name: "Ганзориг" },
      { id: "p2", name: "Сарангэрэл" },
    ],
  },
  {
    id: "3",
    title: "Дээлтэй өдөр",
    description:
      "Монголын үндэсний хувцас дээлтэй ирсэн өдрийн зураг. Маш гоё харагдаж байсан.",
    takenAt: "2025-03-08",
    imageUrl: null,
    people: [
      { id: "p6", name: "Оюунчимэг" },
      { id: "p1", name: "Бат-Эрдэнэ" },
    ],
  },
  {
    id: "4",
    title: "Спорт наадам",
    description:
      "Хичээлийн дундах завсарлагааны спорт тэмцээний үеийн зургууд.",
    takenAt: "2025-05-15",
    imageUrl: null,
    people: [
      { id: "p3", name: "Тэмүүлэн" },
      { id: "p5", name: "Ганзориг" },
      { id: "p4", name: "Номин-Эрдэнэ" },
    ],
  },
  {
    id: "5",
    title: "Багшийн баярын өдөр",
    description:
      "Багш нартаа баяр хүргэсэн тусгай арга хэмжээний үеийн зураг.",
    takenAt: "2024-10-05",
    imageUrl: null,
    people: [
      { id: "p2", name: "Сарангэрэл" },
      { id: "p6", name: "Оюунчимэг" },
      { id: "p1", name: "Бат-Эрдэнэ" },
      { id: "p3", name: "Тэмүүлэн" },
    ],
  },
  {
    id: "6",
    title: "Аялалын зураг",
    description:
      "Ангиараа Тэрэлж аялахад явсан өдрийн зургууд. Байгаль маш гоё байлаа.",
    takenAt: "2025-06-10",
    imageUrl: null,
    people: [
      { id: "p1", name: "Бат-Эрдэнэ" },
      { id: "p2", name: "Сарангэрэл" },
      { id: "p3", name: "Тэмүүлэн" },
      { id: "p4", name: "Номин-Эрдэнэ" },
      { id: "p5", name: "Ганзориг" },
      { id: "p6", name: "Оюунчимэг" },
    ],
  },
]
