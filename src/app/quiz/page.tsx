import type { Metadata } from "next";
import { Quiz } from "@/components/quiz/quiz";

export const metadata: Metadata = {
  title: "Профиль эксперта",
  description:
    "Диагностика NORDA: семь вопросов и один из четырёх архетипов — Стратег, Визионер, Наставник или Искатель — с конкретным следующим шагом.",
};

export default function QuizPage() {
  return (
    <div id="content">
      <Quiz />
    </div>
  );
}
