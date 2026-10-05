"use client";

import { Button } from "@/components/ui/button";
import { formatOrder, services, type FormatId } from "@/lib/card";
import { questions, resultText, scoreQuiz } from "@/lib/quiz";
import { cn } from "cn";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";

const letters = ["А", "Б", "В"] as const;
const ease = [0.22, 1, 0.36, 1] as const;

export function Quiz() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<FormatId[]>([]);
  const [pending, setPending] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const timer = useRef<number | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const indexRef = useRef(index);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => headingRef.current?.focus(), reduce ? 0 : 280);
    return () => window.clearTimeout(timeout);
  }, [index, done, reduce]);

  const question = questions[index];
  const score = useMemo(
    () => (done && answers.length === questions.length ? scoreQuiz(answers) : null),
    [answers, done],
  );

  function clearTimer() {
    if (timer.current) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  }

  function restart() {
    clearTimer();
    setAnswers([]);
    setIndex(0);
    setPending(null);
    setDone(false);
  }

  function back() {
    clearTimer();
    setPending(null);
    setDone(false);
    setIndex((current) => Math.max(0, current - 1));
  }

  function choose(optionId: string, format: FormatId) {
    if (pending) return;
    clearTimer();
    const questionIndex = indexRef.current;
    setPending(optionId);
    setAnswers((prev) => {
      const next = prev.slice(0, questionIndex);
      next[questionIndex] = format;
      return next;
    });

    timer.current = window.setTimeout(() => {
      setPending(null);
      if (questionIndex >= questions.length - 1) {
        setDone(true);
        return;
      }
      setIndex(questionIndex + 1);
    }, reduce ? 0 : 280);
  }

  const step = done ? questions.length : index + 1;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col px-4 py-6 md:px-6 md:py-10">
      <div
        className="mb-6 flex gap-1.5"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={questions.length}
        aria-valuenow={step}
        aria-label="Прогресс опроса"
      >
        {questions.map((item, itemIndex) => (
          <span
            key={item.id}
            className={cn(
              "h-1.5 flex-1 rounded-full bg-ink/10 transition-colors duration-300 motion-reduce:transition-none",
              itemIndex < step && "bg-pine",
            )}
          />
        ))}
      </div>

      <p className="text-sm text-stone">
        {done
          ? "Короткий опрос · готово"
          : `Короткий опрос · вопрос ${step} из ${questions.length}`}
      </p>

      <AnimatePresence mode="wait">
        {!done && question ? (
          <motion.div
            key={question.id}
            initial={reduce ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease }}
            className="mt-4"
          >
            <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <h1
                  ref={headingRef}
                  tabIndex={-1}
                  className="font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.15] font-medium tracking-[-0.03em] outline-none"
                >
                  {question.prompt}
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-stone">
                  Один ответ. Его можно сменить, вернувшись назад.
                </p>
                {index > 0 ? (
                  <Button
                    variant="ghost"
                    className="mt-4 h-11 px-3 text-base"
                    onClick={back}
                    disabled={pending !== null}
                  >
                    <ArrowLeft />
                    Назад
                  </Button>
                ) : (
                  <Link
                    href="/"
                    className="mt-4 inline-flex h-11 items-center gap-2 rounded-xl px-3 text-base text-stone hover:text-ink"
                  >
                    <ArrowLeft className="size-4" aria-hidden />
                    К карточке
                  </Link>
                )}
              </div>

              <div className="flex flex-col gap-3 lg:col-span-7" role="group" aria-label="Варианты ответа">
                {question.options.map((option, optionIndex) => {
                  const selected = pending === option.id || (pending === null && answers[index] === option.format && answers.length > index);
                  return (
                    <motion.div
                      key={option.id}
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: reduce ? 0 : 0.05 * optionIndex, duration: 0.3, ease }}
                    >
                      <Button
                        variant="outline"
                        aria-pressed={selected}
                        disabled={pending !== null && pending !== option.id}
                        onClick={() => choose(option.id, option.format)}
                        className={cn(
                          "h-auto min-h-[4.75rem] w-full items-center justify-start gap-4 rounded-2xl bg-white px-4 py-4 text-left text-base font-normal whitespace-normal hover:border-pine hover:bg-accent md:min-h-[5.25rem] md:px-5 md:text-lg",
                          selected &&
                            "border-pine bg-pine text-white hover:border-pine hover:bg-pine hover:text-white",
                        )}
                      >
                        <span
                          className={cn(
                            "flex size-10 shrink-0 items-center justify-center rounded-xl bg-paper font-display text-sm text-ink",
                            selected && "bg-white/15 text-white",
                          )}
                        >
                          {letters[optionIndex]}
                        </span>
                        <span className="leading-snug">{option.label}</span>
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : null}

        {done && score ? (
          <Result key="result" answers={answers} onRestart={restart} headingRef={headingRef} />
        ) : null}

        {done && !score ? (
          <motion.div key="incomplete" className="mt-6">
            <h1 ref={headingRef} tabIndex={-1} className="font-display text-3xl font-medium outline-none">
              Не хватает ответов.
            </h1>
            <p className="mt-3 text-stone">Опрос собирается из всех четырёх вопросов.</p>
            <Button className="mt-6 h-12 rounded-xl px-5 text-base" onClick={restart}>
              Начать сначала
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function Result({
  answers,
  onRestart,
  headingRef,
}: {
  answers: FormatId[];
  onRestart: () => void;
  headingRef: RefObject<HTMLHeadingElement | null>;
}) {
  const reduce = useReducedMotion();
  const score = scoreQuiz(answers);
  const service = services[score.winner];
  const text = resultText(score);

  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease }}
      className="mt-4"
      aria-live="polite"
    >
      <p className="text-sm font-medium text-pine">Результат опроса</p>
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="mt-2 max-w-3xl font-display text-[clamp(1.7rem,3.4vw,2.6rem)] leading-[1.15] font-medium tracking-[-0.03em] outline-none"
      >
        {text.lead}
      </h1>
      <motion.div
        className="mt-6 rounded-3xl bg-white p-5 ring-1 ring-black/5 md:p-8"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduce ? 0 : 0.12, duration: 0.45, ease }}
      >
        <p className="font-display text-xl font-medium">{service.name}</p>
        <p className="mt-2 text-pine">{service.price}</p>
        <p className="mt-4 max-w-2xl leading-relaxed">{text.detail}</p>
        <p className="mt-4 max-w-2xl leading-relaxed text-stone">{text.next}</p>

        <ul className="mt-6 space-y-2">
          {formatOrder.map((id) => {
            const total = score.totals[id];
            const active = id === score.winner;
            return (
              <li key={id} className="grid grid-cols-[8.5rem_1fr_1.25rem] items-center gap-3 text-sm">
                <span className={cn("leading-tight", active ? "font-medium" : "text-stone")}>
                  {services[id].name}
                </span>
                <span className="h-1.5 overflow-hidden rounded-full bg-ink/10" aria-hidden>
                  <motion.span
                    className={cn("block h-1.5 rounded-full", active ? "bg-pine" : "bg-ink/30")}
                    initial={{ width: 0 }}
                    animate={{ width: `${(total / questions.length) * 100}%` }}
                    transition={{ duration: reduce ? 0 : 0.55, ease }}
                  />
                </span>
                <span className="text-right text-stone tabular-nums">{total}</span>
              </li>
            );
          })}
        </ul>
      </motion.div>

      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row">
        <Button className="h-12 rounded-xl px-5 text-base" onClick={onRestart}>
          <RotateCcw />
          Пройти ещё раз
        </Button>
        <Button
          variant="outline"
          className="h-12 rounded-xl bg-white px-5 text-base"
          nativeButton={false}
          render={<Link href="/" />}
        >
          К карточке
        </Button>
      </div>
    </motion.section>
  );
}
