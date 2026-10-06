import { formatOrder, services, type FormatId } from "@/lib/card";

export type QuizOption = {
  id: string;
  label: string;
  format: FormatId;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: [QuizOption, QuizOption, QuizOption];
};

export const questions: QuizQuestion[] = [
  {
    id: "who",
    prompt: "Кого нужно снять?",
    options: [
      { id: "who-one", label: "Одного человека", format: "portrait" },
      { id: "who-family", label: "Семью или пару", format: "family" },
      { id: "who-event", label: "Гостей на событии", format: "event" },
    ],
  },
  {
    id: "time",
    prompt: "Сколько времени есть на съёмку?",
    options: [
      { id: "time-hour", label: "Около часа", format: "portrait" },
      { id: "time-few", label: "Два–три часа", format: "family" },
      { id: "time-day", label: "Большую часть дня", format: "event" },
    ],
  },
  {
    id: "place",
    prompt: "Где удобнее снимать?",
    options: [
      { id: "place-street", label: "На улице в городе", format: "portrait" },
      { id: "place-home", label: "Дома или в знакомом дворе", format: "family" },
      { id: "place-venue", label: "На площадке события", format: "event" },
    ],
  },
  {
    id: "keep",
    prompt: "Что должно остаться на снимках?",
    options: [
      { id: "keep-face", label: "Характер одного человека", format: "portrait" },
      { id: "keep-together", label: "Как люди рядом друг с другом", format: "family" },
      { id: "keep-day", label: "Что происходило в этот день", format: "event" },
    ],
  },
];

export type Score = {
  winner: FormatId;
  totals: Record<FormatId, number>;
  tied: boolean;
};

export function scoreQuiz(answers: FormatId[]): Score {
  const totals: Record<FormatId, number> = {
    portrait: 0,
    family: 0,
    event: 0,
  };

  for (const answer of answers) {
    totals[answer] += 1;
  }

  const max = Math.max(...formatOrder.map((id) => totals[id]));
  const leaders = formatOrder.filter((id) => totals[id] === max);
  let winner = leaders[0];

  if (leaders.length > 1) {
    for (let i = answers.length - 1; i >= 0; i -= 1) {
      if (leaders.includes(answers[i])) {
        winner = answers[i];
        break;
      }
    }
  }

  return { winner, totals, tied: leaders.length > 1 };
}

export function resultText(score: Score) {
  const service = services[score.winner];
  const lead = score.tied
    ? `Ответы разошлись поровну. Ближе ${service.name.toLowerCase()} — так решил последний ответ.`
    : `Ближе ${service.name.toLowerCase()}.`;

  return {
    lead,
    detail: `${service.detail} Съёмка занимает ${service.time}. ${service.price}.`,
    next: "Напишите или позвоните и назовите удобный день. Я подтвержу время.",
  };
}
