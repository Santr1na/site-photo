import type { Metadata } from "next";
import { Quiz } from "@/components/quiz/quiz";

export const metadata: Metadata = {
  title: "Формат съёмки",
  description:
    "Четыре вопроса, чтобы выбрать формат съёмки у Марии Орловой: портрет, семья или событие. Ответы считаются в браузере.",
};

export default function QuizPage() {
  return (
    <main id="content" className="min-h-[70svh]">
      <Quiz />
    </main>
  );
}
