export interface VideoPerson {
  id: string
  name: string
}

export interface VideoMemory {
  id: string
  title: string
  description: string
  takenAt: string
  youtubeUrl: string
  people: VideoPerson[]
}

export const VIDEO_STUDENTS = [
  "Бат-Эрдэнэ",
  "Сарангэрэл",
  "Тэмүүлэн",
  "Номин-Эрдэнэ",
  "Ганзориг",
  "Оюунчимэг",
] as const

export const MOCK_VIDEOS: VideoMemory[] = [
  {
    id: "v1",
    title: "Ангийн танилцуулга",
    description:
      "Хичээлийн жилийн эхэнд анги бүр өөрсдийгөө танилцуулсан богино видео бэлтгэсэн. Маш хөгжилтэй болсон.",
    takenAt: "2024-09-05",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    people: [
      { id: "p1", name: "Бат-Эрдэнэ" },
      { id: "p2", name: "Сарангэрэл" },
      { id: "p3", name: "Тэмүүлэн" },
      { id: "p4", name: "Номин-Эрдэнэ" },
      { id: "p5", name: "Ганзориг" },
      { id: "p6", name: "Оюунчимэг" },
    ],
  },
  {
    id: "v2",
    title: "Шинэ жилийн тоглолт",
    description:
      "Шинэ жилийн үдэшлэгт ангийнхан хамтдаа тоглолт бэлтгэж, бүжиг болон дуу дуулсан.",
    takenAt: "2024-12-27",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    people: [
      { id: "p2", name: "Сарангэрэл" },
      { id: "p4", name: "Номин-Эрдэнэ" },
      { id: "p6", name: "Оюунчимэг" },
    ],
  },
  {
    id: "v3",
    title: "Дээлтэй өдрийн бичлэг",
    description:
      "Монгол дээлтэй ирсэн өдрийн бичлэг. Хүүхдүүд бүгд маш гоё хувцасласан байсан.",
    takenAt: "2025-03-08",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    people: [
      { id: "p1", name: "Бат-Эрдэнэ" },
      { id: "p6", name: "Оюунчимэг" },
      { id: "p3", name: "Тэмүүлэн" },
    ],
  },
  {
    id: "v4",
    title: "Спорт наадмын тэмцээн",
    description:
      "Ангиуд хоорондын спорт тэмцээний бичлэг. Амжилт кибер 12-1 анги хөл бөмбөгөөр тэргүүлсэн.",
    takenAt: "2025-05-15",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    people: [
      { id: "p5", name: "Ганзориг" },
      { id: "p3", name: "Тэмүүлэн" },
      { id: "p1", name: "Бат-Эрдэнэ" },
    ],
  },
  {
    id: "v5",
    title: "Тэрэлж аялалын видео",
    description:
      "Ангиараа Тэрэлж очсон аялалын бичлэг. Байгалийн үзэсгэлэнт газар бүрд зогсож бичлэг хийсэн.",
    takenAt: "2025-06-10",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    people: [
      { id: "p1", name: "Бат-Эрдэнэ" },
      { id: "p2", name: "Сарангэрэл" },
      { id: "p3", name: "Тэмүүлэн" },
      { id: "p4", name: "Номин-Эрдэнэ" },
      { id: "p5", name: "Ганзориг" },
      { id: "p6", name: "Оюунчимэг" },
    ],
  },
  {
    id: "v6",
    title: "Багшийн баярын тоглолт",
    description:
      "Багш нарын баярыг тохиолдуулан ангийнхан тусгай тоглолт бэлтгэж, багш нартаа бэлэглэсэн.",
    takenAt: "2024-10-05",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    people: [
      { id: "p2", name: "Сарангэрэл" },
      { id: "p4", name: "Номин-Эрдэнэ" },
      { id: "p6", name: "Оюунчимэг" },
      { id: "p1", name: "Бат-Эрдэнэ" },
    ],
  },
]
