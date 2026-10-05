import type { Metadata } from "next";
import { Quiz } from "@/components/quiz/quiz";

export const metadata: Metadata = {
  title: "Короткий опрос",
  description:
    "Четыре вопроса образца сайта-визитки: какой формат съёмки ближе и что делать дальше. Ответы считаются в браузере.",
};

export default function QuizPage() {
  return (
    <main id="content" className="min-h-[70svh]">
      <Quiz />
    </main>
  );
}
