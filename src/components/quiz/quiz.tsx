"use client";

import { CtaLink } from "@/components/cta-link";
import { Button } from "@/components/ui/button";
import {
  archetypeOrder,
  archetypes,
  questions,
  scoreQuiz,
  type ArchetypeId,
} from "@/lib/quiz";
import { cn } from "cn";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const letters = ["А", "Б", "В", "Г"] as const;
const ease = [0.22, 1, 0.36, 1] as const;

type Phase = "intro" | "quiz" | "scoring" | "result";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function Quiz() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<ArchetypeId[]>([]);
  const [pending, setPending] = useState<string | null>(null);
  const timer = useRef<number | null>(null);
  const indexRef = useRef(index);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    if (phase !== "scoring") return;
    const timeout = window.setTimeout(() => setPhase("result"), reduce ? 0 : 820);
    return () => window.clearTimeout(timeout);
  }, [phase, reduce]);

  useEffect(() => {
    if (phase === "intro") return;
    const timeout = window.setTimeout(() => {
      headingRef.current?.focus();
    }, reduce ? 0 : 480);
    return () => window.clearTimeout(timeout);
  }, [phase, index, reduce]);

  const question = questions[index];
  const result = useMemo(
    () => (answers.length === questions.length ? scoreQuiz(answers) : null),
    [answers],
  );

  function clearTimer() {
    if (timer.current) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  }

  function start() {
    clearTimer();
    setAnswers([]);
    setIndex(0);
    setPending(null);
    setPhase("quiz");
  }

  function restart() {
    clearTimer();
    setAnswers([]);
    setIndex(0);
    setPending(null);
    setPhase("intro");
  }

  function back() {
    clearTimer();
    setPending(null);
    setIndex((current) => Math.max(0, current - 1));
  }

  function choose(optionId: string, archetype: ArchetypeId) {
    if (pending) return;
    clearTimer();
    setPending(optionId);
    setAnswers((prev) => {
      const next = [...prev];
      next[indexRef.current] = archetype;
      return next;
    });
    const delay = reduce ? 0 : 420;
    timer.current = window.setTimeout(() => {
      setPending(null);
      const current = indexRef.current;
      if (current >= questions.length - 1) {
        setPhase(reduce ? "result" : "scoring");
        return;
      }
      setIndex(current + 1);
    }, delay);
  }

  const progress =
    phase === "intro" ? 0 : phase === "quiz" ? (index + 1) / questions.length : 1;

  const motionProps = reduce
    ? { initial: false as const }
    : {
        initial: { opacity: 0, y: 22 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -16 },
        transition: { duration: 0.45, ease },
      };

  return (
    <main className="min-h-[100svh] bg-ivory text-ink">
      {phase !== "intro" ? (
        <div
          className="fixed inset-x-0 top-0 z-[70] h-[3px] bg-ink/10"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={questions.length}
          aria-valuenow={phase === "quiz" ? index + 1 : questions.length}
          aria-label="Прогресс диагностики"
        >
          <motion.div
            className="h-full origin-left bg-cinnabar"
            initial={false}
            animate={{ scaleX: progress }}
            transition={
              reduce ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 24 }
            }
          />
        </div>
      ) : null}

      <div className="mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col px-5 pt-24 pb-16 md:px-10 md:pt-28">
        <AnimatePresence mode="wait">
          {phase === "intro" ? (
            <motion.section key="intro" {...motionProps} className="flex flex-1 flex-col">
              <p className="text-[0.72rem] font-medium tracking-[0.22em] uppercase text-cinnabar">
                Диагностика NORDA
              </p>
              <h1 className="mt-5 max-w-4xl font-display text-[clamp(3.4rem,8vw,6.5rem)] leading-[0.88] font-medium tracking-[-0.035em]">
                Профиль
                <br />
                <span className="italic">эксперта</span>
              </h1>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-stone md:text-lg">
                Семь вопросов о том, как вы думаете, говорите и выбираете работу.
                Это не тест личности. Это черновик позиции: один из четырёх
                архетипов и конкретный следующий шаг.
              </p>

              <ul className="mt-12 grid grid-cols-2 gap-px bg-ink/10 md:grid-cols-4">
                {archetypeOrder.map((id) => {
                  const archetype = archetypes[id];
                  return (
                    <li key={id} className="bg-ivory px-4 py-5">
                      <p className="font-display text-2xl text-cinnabar italic">
                        {archetype.index}
                      </p>
                      <p className="mt-3 font-display text-2xl leading-none font-medium md:text-3xl">
                        {archetype.name}
                      </p>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-12 flex flex-col items-start gap-4">
                <Button
                  className="h-12 px-6 text-[0.72rem] font-semibold tracking-[0.16em] uppercase"
                  onClick={start}
                >
                  Начать
                </Button>
                <p className="text-sm text-stone">
                  Около четырёх минут. Можно вернуться к предыдущему вопросу.
                </p>
              </div>
            </motion.section>
          ) : null}

          {phase === "quiz" && question ? (
            <motion.section
              key={question.id}
              {...motionProps}
              className="flex flex-1 flex-col justify-center"
              aria-live="polite"
            >
              <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-5">
                  <p className="text-[0.72rem] font-medium tracking-[0.2em] uppercase text-cinnabar">
                    Вопрос {pad(index + 1)}
                    <span className="text-stone"> / {pad(questions.length)}</span>
                  </p>
                  <h1
                    ref={headingRef}
                    tabIndex={-1}
                    className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] font-medium tracking-[-0.03em] outline-none"
                  >
                    {question.prompt}
                  </h1>
                  {index > 0 ? (
                    <Button
                      variant="ghost"
                      className="mt-8 h-11 px-0 text-[0.72rem] font-semibold tracking-[0.16em] uppercase hover:bg-transparent"
                      onClick={back}
                      disabled={pending !== null}
                    >
                      <ArrowLeft />
                      Назад
                    </Button>
                  ) : (
                    <p className="mt-8 text-sm text-stone">
                      Выберите ответ — он ближе к одному из четырёх профилей.
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-3 lg:col-span-7">
                  {question.options.map((option, optionIndex) => {
                    const selected =
                      pending === option.id ||
                      (pending === null && answers[index] === option.archetype);
                    return (
                      <motion.div
                        key={option.id}
                        initial={reduce ? false : { opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: reduce ? 0 : 0.05 * optionIndex, duration: 0.35, ease }}
                      >
                        <Button
                          variant="outline"
                          aria-pressed={selected}
                          disabled={pending !== null && pending !== option.id}
                          onClick={() => choose(option.id, option.archetype)}
                          className={cn(
                            "h-auto min-h-[5.25rem] w-full items-start justify-start gap-4 px-4 py-4 text-left text-base font-normal whitespace-normal hover:border-ink hover:bg-ink hover:text-ivory md:gap-5 md:px-5 md:py-5 md:text-lg",
                            selected &&
                              "border-cinnabar bg-cinnabar text-ink hover:border-cinnabar hover:bg-cinnabar hover:text-ink",
                          )}
                        >
                          <span
                            className={cn(
                              "flex size-11 shrink-0 items-center justify-center border border-current/25 font-display text-2xl",
                              selected && "border-ink/30",
                            )}
                          >
                            {letters[optionIndex]}
                          </span>
                          <span className="pt-2 leading-snug">{option.label}</span>
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.section>
          ) : null}

          {phase === "scoring" ? (
            <motion.section
              key="scoring"
              {...motionProps}
              className="flex flex-1 flex-col justify-center"
            >
              <p className="text-[0.72rem] font-medium tracking-[0.22em] uppercase text-cinnabar">
                Считаем профиль
              </p>
              <h1
                ref={headingRef}
                tabIndex={-1}
                className="mt-4 max-w-xl font-display text-5xl leading-[0.95] font-medium tracking-[-0.03em] outline-none md:text-7xl"
              >
                Собираем ответы в одну линию.
              </h1>
              <div className="mt-10 h-px w-full max-w-md bg-ink/15">
                <motion.div
                  className="h-px origin-left bg-cinnabar"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: reduce ? 0 : 0.75, ease: "easeInOut" }}
                />
              </div>
            </motion.section>
          ) : null}

          {phase === "result" && result ? (
            <motion.section key="result" {...motionProps} className="flex flex-1 flex-col">
              <ResultView headingRef={headingRef} answers={answers} onRestart={restart} />
            </motion.section>
          ) : null}

          {phase === "result" && !result ? (
            <motion.section key="incomplete" {...motionProps} className="flex flex-1 flex-col justify-center">
              <h1
                ref={headingRef}
                tabIndex={-1}
                className="font-display text-5xl font-medium outline-none"
              >
                Не хватает ответов.
              </h1>
              <p className="mt-4 max-w-md text-stone">
                Профиль собирается из всех семи вопросов. Вернитесь и дойдите до конца.
              </p>
              <Button
                className="mt-8 h-12 px-6 text-[0.72rem] font-semibold tracking-[0.16em] uppercase"
                onClick={start}
              >
                Начать сначала
              </Button>
            </motion.section>
          ) : null}
        </AnimatePresence>
      </div>
    </main>
  );
}

function ResultView({
  headingRef,
  answers,
  onRestart,
}: {
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  answers: ArchetypeId[];
  onRestart: () => void;
}) {
  const reduce = useReducedMotion();
  const score = scoreQuiz(answers);
  const archetype = archetypes[score.winner];

  return (
    <>
      <p className="text-[0.72rem] font-medium tracking-[0.22em] uppercase text-cinnabar">
        Архетип {archetype.index} / 04
      </p>
      <div className="mt-4 overflow-hidden">
        <motion.h1
          ref={headingRef}
          tabIndex={-1}
          className="font-display text-[clamp(4.2rem,12vw,8.5rem)] leading-[0.84] font-medium tracking-[-0.04em] outline-none"
          initial={reduce ? false : { y: "110%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.85, ease }}
        >
          {archetype.name}
        </motion.h1>
      </div>
      <motion.p
        className="mt-6 max-w-2xl font-display text-2xl leading-snug font-medium italic md:text-3xl"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5, ease }}
      >
        {archetype.line}
      </motion.p>
      <motion.p
        className="mt-8 max-w-2xl text-base leading-relaxed text-stone md:text-lg"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {archetype.portrait}
      </motion.p>

      <div className="mt-12">
        <p className="text-[0.72rem] font-medium tracking-[0.18em] uppercase text-stone">
          Сильные стороны
        </p>
        <ul className="mt-4 grid gap-px bg-ink/10 md:grid-cols-3">
          {archetype.strengths.map((strength, strengthIndex) => (
            <motion.li
              key={strength}
              className="bg-ivory py-5 pr-4 font-display text-2xl leading-tight font-medium md:text-3xl"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + strengthIndex * 0.08, duration: 0.45, ease }}
            >
              {strength}
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.div
        className="mt-12 border-l-2 border-cinnabar pl-6"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5, ease }}
      >
        <p className="text-[0.72rem] font-medium tracking-[0.18em] uppercase text-cinnabar">
          Рекомендованный шаг
        </p>
        <p className="mt-3 max-w-2xl text-base leading-relaxed md:text-lg">
          {archetype.nextStep}
        </p>
      </motion.div>

      <div className="mt-12 max-w-xl">
        <p className="text-[0.72rem] font-medium tracking-[0.18em] uppercase text-stone">
          {score.totals[score.winner]} из {questions.length} ответов ближе к этому профилю
          {score.tied ? ". При равенстве решил последний ответ" : ""}
        </p>
        <ul className="mt-4 space-y-3">
          {archetypeOrder.map((id) => {
            const total = score.totals[id];
            const active = id === score.winner;
            return (
              <li key={id} className="grid grid-cols-[6.5rem_1fr_1.5rem] items-center gap-3 text-sm">
                <span className={active ? "font-semibold" : "text-stone"}>
                  {archetypes[id].name}
                </span>
                <span className="h-[3px] bg-ink/10" aria-hidden>
                  <motion.span
                    className={cn("block h-[3px]", active ? "bg-cinnabar" : "bg-ink/35")}
                    initial={{ width: 0 }}
                    animate={{ width: `${(total / questions.length) * 100}%` }}
                    transition={{ duration: reduce ? 0 : 0.7, delay: 0.5, ease }}
                  />
                </span>
                <span className="text-right tabular-nums text-stone">{total}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-12 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
        <CtaLink href="mailto:hello@norda.studio?subject=%D0%9F%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8C%20%D1%8D%D0%BA%D1%81%D0%BF%D0%B5%D1%80%D1%82%D0%B0">
          Написать в бюро
        </CtaLink>
        <Button
          variant="outline"
          className="h-12 px-6 text-[0.72rem] font-semibold tracking-[0.16em] uppercase"
          onClick={onRestart}
        >
          Пройти ещё раз
        </Button>
        <CtaLink href="/" variant="ghost" showArrow={false}>
          На главную
        </CtaLink>
      </div>
    </>
  );
}
