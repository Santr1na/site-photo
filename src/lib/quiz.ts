export const archetypeOrder = [
  "strategist",
  "visionary",
  "mentor",
  "seeker",
] as const;

export type ArchetypeId = (typeof archetypeOrder)[number];

export type Archetype = {
  id: ArchetypeId;
  index: string;
  name: string;
  line: string;
  portrait: string;
  strengths: [string, string, string];
  nextStep: string;
};

export type QuizOption = {
  id: string;
  label: string;
  archetype: ArchetypeId;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: [QuizOption, QuizOption, QuizOption, QuizOption];
};

export const archetypes: Record<ArchetypeId, Archetype> = {
  strategist: {
    id: "strategist",
    index: "01",
    name: "Стратег",
    line: "Вас зовут, когда нужно решение, а не вдохновение.",
    portrait:
      "Вы собираете сложное в ход, который можно сделать. Позиция Стратега держится на точности: кому вы полезны, какой рычаг нажимаете и какой исход обещаете. Пока это не сказано вслух, вас покупают как «умного человека в комнате» — а у этой роли слабая цена и размытая память.",
    strengths: [
      "Ясность приоритета",
      "Обещание, которому верят",
      "Жёсткость к лишнему",
    ],
    nextStep:
      "Напишите одну фразу: «Я помогаю [кому] получить [исход] через [рычаг]». Уберите прилагательные. Если фразу можно сказать за двадцать секунд и не захотеть пояснить — это уже ядро.",
  },
  visionary: {
    id: "visionary",
    index: "02",
    name: "Визионер",
    line: "Вас слушают ради картины, в которую хочется войти.",
    portrait:
      "Вас выбирают не за чек-лист, а за направление. Позиция Визионера — названная ставка: что вы считаете важным раньше других. Без неё вас читают как вдохновляющего спикера. Со ставкой — как человека, за которым идут в работу, а не только на эфир.",
    strengths: [
      "Длинный горизонт",
      "Язык, который собирает людей",
      "Смелость назвать ставку",
    ],
    nextStep:
      "Опишите ставку на ближайшие два года одним абзацем. Без оговорок «и ещё мы делаем». Если абзац можно прочитать со сцены и не захотеть сузить — позиция начала звучать.",
  },
  mentor: {
    id: "mentor",
    index: "03",
    name: "Наставник",
    line: "Вас выбирают, когда человеку нужно пройти изменение.",
    portrait:
      "Ваша ценность — в превращении человека, а не в наборе модулей. Рядом с вами видно, откуда человек выходит и куда приходит. Пока вы говорите о программах, это остаётся скрытым. Позиция Наставника начинается с пути: один человек, до и после.",
    strengths: [
      "Доверие с первых минут",
      "Видимый путь человека",
      "Выдержка долгого процесса",
    ],
    nextStep:
      "Опишите одного человека до работы с вами и после — конкретно, без «раскрыл потенциал». Этот контраст и есть позиционирование. Услуги приложатся к нему, а не наоборот.",
  },
  seeker: {
    id: "seeker",
    index: "04",
    name: "Искатель",
    line: "К вам приходят за вопросом, который ещё нельзя закрыть лозунгом.",
    portrait:
      "Вы ценны качеством вопроса. Клиенты входят в исследование как соавторы, а не как покупатели готовой карты. Позиция Искателя ломается, когда её упаковывают в уверенный слоган. Ей нужен вопрос, который вы готовы держать публично и не предать готовым ответом.",
    strengths: [
      "Точный вопрос",
      "Честность незаконченного",
      "Глубина без позы",
    ],
    nextStep:
      "Сформулируйте вопрос, который практика исследует следующие полгода. Поставьте его над оффером. Люди, которым нужен поиск, узнают себя в вопросе быстрее, чем в списке компетенций.",
  },
};

export const questions: QuizQuestion[] = [
  {
    id: "intro",
    prompt: "Когда вас просят представиться за двадцать секунд, вы скорее…",
    options: [
      {
        id: "q1a",
        label: "Называете результат, который умеете собрать.",
        archetype: "strategist",
      },
      {
        id: "q1b",
        label: "Говорите о будущем, которое хотите сделать видимым.",
        archetype: "visionary",
      },
      {
        id: "q1c",
        label: "Рассказываете, кого ведёте и через что проводите.",
        archetype: "mentor",
      },
      {
        id: "q1d",
        label: "Начинаете с вопроса, который сейчас держит вашу работу.",
        archetype: "seeker",
      },
    ],
  },
  {
    id: "return",
    prompt: "За чем к вам возвращаются?",
    options: [
      {
        id: "q2a",
        label: "За рамкой: что важно, что нет, какой ход следующий.",
        archetype: "strategist",
      },
      {
        id: "q2b",
        label: "За направлением, когда рынок шумит и все говорят одно и то же.",
        archetype: "visionary",
      },
      {
        id: "q2c",
        label: "За тем, что рядом становится ясно, куда расти.",
        archetype: "mentor",
      },
      {
        id: "q2d",
        label: "За совместным разбором того, на что ещё нет готового ответа.",
        archetype: "seeker",
      },
    ],
  },
  {
    id: "share",
    prompt: "Какой ваш материал люди пересылают друг другу?",
    options: [
      {
        id: "q3a",
        label: "Разбор с выводом и последовательностью шагов.",
        archetype: "strategist",
      },
      {
        id: "q3b",
        label: "Текст, в котором названа большая ставка.",
        archetype: "visionary",
      },
      {
        id: "q3c",
        label: "Историю человека до и после.",
        archetype: "mentor",
      },
      {
        id: "q3d",
        label: "Наблюдение, которое открывает тему, а не закрывает её.",
        archetype: "seeker",
      },
    ],
  },
  {
    id: "irritation",
    prompt: "Что в чужом позиционировании раздражает быстрее всего?",
    options: [
      {
        id: "q4a",
        label: "Обещание без механики: красиво и непонятно, как это случается.",
        archetype: "strategist",
      },
      {
        id: "q4b",
        label: "Мелкость. Горизонт на квартал и ни шага дальше.",
        archetype: "visionary",
      },
      {
        id: "q4c",
        label: "Холод. Человека в формулировке нет.",
        archetype: "mentor",
      },
      {
        id: "q4d",
        label: "Готовая формула, в которую автора пришлось втиснуть.",
        archetype: "seeker",
      },
    ],
  },
  {
    id: "choice",
    prompt: "Как вы решаете, браться ли за проект?",
    options: [
      {
        id: "q5a",
        label: "Если виден рычаг и эффект, который можно назвать.",
        archetype: "strategist",
      },
      {
        id: "q5b",
        label: "Если работа может сдвинуть правила, а не только закрыть задачу.",
        archetype: "visionary",
      },
      {
        id: "q5c",
        label: "Если смогу реально провести человека через изменение.",
        archetype: "mentor",
      },
      {
        id: "q5d",
        label: "Если вопрос живой и у меня нет заготовленного ответа.",
        archetype: "seeker",
      },
    ],
  },
  {
    id: "public",
    prompt: "В публичном поле вам естественнее…",
    options: [
      {
        id: "q6a",
        label: "Раскладывать сложное так, чтобы другим стало можно действовать.",
        archetype: "strategist",
      },
      {
        id: "q6b",
        label: "Задавать тему разговору раньше, чем её назовут остальные.",
        archetype: "visionary",
      },
      {
        id: "q6c",
        label: "Отвечать адресно и держать долгий диалог с теми, кого ведёте.",
        archetype: "mentor",
      },
      {
        id: "q6d",
        label: "Думать вслух и звать аудиторию в исследование.",
        archetype: "seeker",
      },
    ],
  },
  {
    id: "next",
    prompt: "Какой следующий шаг кажется самым честным?",
    options: [
      {
        id: "q7a",
        label: "Собрать одно предложение: кому, какой рычаг, какой исход.",
        archetype: "strategist",
      },
      {
        id: "q7b",
        label: "Назвать ставку на два года — без списка услуг в придачу.",
        archetype: "visionary",
      },
      {
        id: "q7c",
        label: "Описать человека, которого вы ведёте: откуда и куда.",
        archetype: "mentor",
      },
      {
        id: "q7d",
        label: "Сформулировать вопрос, вокруг которого строится практика.",
        archetype: "seeker",
      },
    ],
  },
];

export type Score = {
  winner: ArchetypeId;
  totals: Record<ArchetypeId, number>;
  tied: boolean;
};

export function scoreQuiz(answers: ArchetypeId[]): Score {
  const totals: Record<ArchetypeId, number> = {
    strategist: 0,
    visionary: 0,
    mentor: 0,
    seeker: 0,
  };

  for (const answer of answers) {
    totals[answer] += 1;
  }

  const max = Math.max(...archetypeOrder.map((id) => totals[id]));
  const leaders = archetypeOrder.filter((id) => totals[id] === max);
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
