export const sample = {
  name: "Мария Орлова",
  city: "Казань",
  role: "Частный фотограф",
  sentence: "Снимаю портреты, семьи и небольшие события. Встреча в городе, готовые фото через неделю.",
  phone: "+7 900 000-00-00",
  phoneHref: "tel:+79000000000",
  email: "maria@example.com",
  emailHref: "mailto:maria@example.com",
} as const;

export const formatOrder = ["portrait", "family", "event"] as const;

export type FormatId = (typeof formatOrder)[number];

export type Service = {
  id: FormatId;
  name: string;
  price: string;
  time: string;
  detail: string;
};

export const services: Record<FormatId, Service> = {
  portrait: {
    id: "portrait",
    name: "Портрет",
    price: "8–12 тысяч ₽",
    time: "около часа",
    detail: "Один человек, улица или тихий двор.",
  },
  family: {
    id: "family",
    name: "Семейная съёмка",
    price: "15–22 тысячи ₽",
    time: "около двух часов",
    detail: "Семья или пара, без спешки.",
  },
  event: {
    id: "event",
    name: "Съёмка события",
    price: "25–40 тысяч ₽",
    time: "большая часть дня",
    detail: "Репортаж на площадке.",
  },
};
