"use client";

import { formatOrder, sample, services, type FormatId } from "@/lib/card";
import { questions, resultText, scoreQuiz } from "@/lib/quiz";
import { cn } from "cn";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";

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
    }, reduce ? 0 : 260);
  }

  const step = done ? questions.length : index + 1;

  return (
    <div className="mx-auto w-full max-w-[86rem] px-4 py-8 md:px-8 md:py-14">
      <div
        className="mb-8 h-2 bg-ink/10"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={questions.length}
        aria-valuenow={step}
        aria-label="Прогресс опроса"
      >
        <div
          className="h-2 w-full origin-left bg-ink transition-transform duration-500 motion-reduce:transition-none"
          style={{ transform: `scaleX(${step / questions.length})` }}
        />
      </div>

      <p className="text-sm text-stone">
        {done ? "Готово" : `Вопрос ${step} из ${questions.length}`}
      </p>

      <AnimatePresence mode="wait">
        {!done && question ? (
          <motion.div
            key={question.id}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease }}
            className="mt-6"
          >
            <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <h1
                  ref={headingRef}
                  tabIndex={-1}
                  className="font-display text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.92] font-medium tracking-[-0.05em] outline-none"
                >
                  {question.prompt}
                </h1>
                {index > 0 ? (
                  <button
                    type="button"
                    className="mt-8 border-b border-ink/40 pb-0.5 text-sm text-stone hover:text-ink disabled:opacity-40"
                    onClick={back}
                    disabled={pending !== null}
                  >
                    Назад
                  </button>
                ) : (
                  <Link href="/" className="mt-8 inline-block border-b border-ink/40 pb-0.5 text-sm text-stone hover:text-ink">
                    На главную
                  </Link>
                )}
              </div>

              <div className="lg:col-span-7" role="group" aria-label="Варианты ответа">
                {question.options.map((option, optionIndex) => {
                  const selected =
                    pending === option.id ||
                    (pending === null && answers[index] === option.format && answers.length > index);
                  return (
                    <motion.button
                      key={option.id}
                      type="button"
                      aria-pressed={selected}
                      disabled={pending !== null && pending !== option.id}
                      onClick={() => choose(option.id, option.format)}
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: reduce ? 0 : 0.04 * optionIndex, duration: 0.3, ease }}
                      className={cn(
                        "flex min-h-[4.5rem] w-full items-center gap-5 border-b-2 border-ink px-2 py-5 text-left text-xl transition-colors duration-200 motion-reduce:transition-none md:min-h-[5.75rem] md:text-2xl",
                        "hover:bg-ink hover:text-paper disabled:cursor-default",
                        selected && "bg-ink text-paper hover:bg-ink hover:text-paper",
                      )}
                    >
                      <span className="w-6 shrink-0 font-display text-lg tabular-nums">
                        {optionIndex + 1}
                      </span>
                      <span className="leading-snug">{option.label}</span>
                    </motion.button>
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
          <div key="incomplete" className="mt-8">
            <h1 ref={headingRef} tabIndex={-1} className="font-display text-4xl font-medium outline-none">
              Не хватает ответов.
            </h1>
            <button type="button" className="mt-8 border-b border-ink pb-0.5" onClick={restart}>
              Начать сначала
            </button>
          </div>
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
      className="mt-6"
      aria-live="polite"
    >
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="max-w-5xl font-display text-[clamp(3.6rem,10vw,7.5rem)] leading-[0.84] font-medium tracking-[-0.06em] outline-none"
      >
        {service.name}
      </h1>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduce ? 0 : 0.12, duration: 0.4, ease }}
      >
        <p className="mt-5 max-w-xl text-lg text-stone">
          {score.tied
            ? "Ответы разошлись поровну. Формат выбрал последний ответ."
            : "Этот формат ближе по ответам."}
        </p>
        <p className="mt-6 font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-none font-medium tracking-[-0.04em] tabular-nums">
          {service.price}
        </p>
        <p className="mt-6 max-w-xl leading-relaxed">{text.detail}</p>
        <p className="mt-3 max-w-xl leading-relaxed text-stone">{text.next}</p>

        <ul className="mt-10 max-w-md">
          {formatOrder.map((id) => {
            const total = score.totals[id];
            const active = id === score.winner;
            return (
              <li
                key={id}
                className="grid grid-cols-[minmax(0,1fr)_2.5rem] items-center gap-4 border-t border-ink/15 py-3 text-sm last:border-b"
              >
                <span className={active ? "font-medium" : "text-stone"}>
                  {services[id].name}
                  <span className="sr-only">, {total} из {questions.length}</span>
                </span>
                <span className="text-right tabular-nums">{total}</span>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <button type="button" className="border-b border-ink pb-0.5" onClick={onRestart}>
            Пройти ещё раз
          </button>
          <a href={sample.emailHref} className="border-b border-ink/40 pb-0.5 text-stone hover:text-ink">
            Написать
          </a>
          <Link href="/" className="text-stone hover:text-ink">
            На главную
          </Link>
        </div>
      </motion.div>
    </motion.section>
  );
}
