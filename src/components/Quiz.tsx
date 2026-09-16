import { useState } from 'react'
import type { ChoiceOption, Exercise as ExerciseType, QuizQuestion } from '../content/types'
import { Md, MdBlock } from '../lib/markdown'
import { saveQuiz } from '../lib/storage'

/* ------------------------------------------------------- Einzelne Frage */

function Choice({
  options,
  onAnswer,
  answered,
  picked,
}: {
  options: ChoiceOption[]
  onAnswer: (index: number) => void
  answered: boolean
  picked: number | null
}) {
  return (
    <div className="choice__options">
      {options.map((opt, i) => {
        const isPicked = picked === i
        let cls = 'choice__option'
        if (answered) {
          if (opt.correct) cls += ' choice__option--correct'
          else if (isPicked) cls += ' choice__option--wrong'
          else cls += ' choice__option--muted'
        }
        return (
          <button
            key={i}
            type="button"
            className={cls}
            onClick={() => !answered && onAnswer(i)}
            disabled={answered}
          >
            <span className="choice__marker" aria-hidden="true">
              {answered ? (opt.correct ? '✓' : isPicked ? '✗' : String.fromCharCode(65 + i)) : String.fromCharCode(65 + i)}
            </span>
            <span>
              <Md>{opt.label}</Md>
            </span>
          </button>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------- Interaktive Übung */

export function ExerciseCard({ exercise }: { exercise: ExerciseType }) {
  const [picked, setPicked] = useState<number | null>(null)
  const answered = picked !== null
  const correct = answered && exercise.options[picked].correct

  return (
    <div className="choice">
      {exercise.scenario && (
        <div className="choice__scenario">
          <strong>Aufgabe: </strong>
          <Md>{exercise.scenario}</Md>
        </div>
      )}
      <p className="choice__q">
        <Md>{exercise.question}</Md>
      </p>
      <Choice
        options={exercise.options}
        onAnswer={setPicked}
        answered={answered}
        picked={picked}
      />
      {answered && (
        <div className={`choice__explain choice__explain--${correct ? 'correct' : 'wrong'}`}>
          <p style={{ marginBottom: '0.4rem', fontWeight: 650 }}>
            {correct ? '✓ Richtig' : '✗ Nicht ganz'}
          </p>
          <MdBlock>{exercise.options[picked].explain}</MdBlock>
          {!correct && (
            <p style={{ marginTop: '0.6rem' }}>
              <button type="button" className="btn btn--ghost" onClick={() => setPicked(null)}>
                Nochmal versuchen
              </button>
            </p>
          )}
        </div>
      )}
    </div>
  )
}

/* ---------------------------------------------------------------- Quiz */

export function Quiz({ questions, slug }: { questions: QuizQuestion[]; slug: string }) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [results, setResults] = useState<boolean[]>([])
  const [finished, setFinished] = useState(false)

  const question = questions[index]
  const answered = picked !== null
  const isCorrect = answered && question.options[picked].correct

  function answer(i: number) {
    setPicked(i)
  }

  function next() {
    const nextResults = [...results, Boolean(isCorrect)]
    setResults(nextResults)
    setPicked(null)

    if (index + 1 >= questions.length) {
      const correctCount = nextResults.filter(Boolean).length
      saveQuiz(slug, correctCount, questions.length)
      setFinished(true)
    } else {
      setIndex(index + 1)
    }
  }

  function restart() {
    setIndex(0)
    setPicked(null)
    setResults([])
    setFinished(false)
  }

  if (finished) {
    const correctCount = results.filter(Boolean).length
    const all = correctCount === questions.length
    return (
      <div className="quiz__result">
        <p className="quiz__score">
          {correctCount} / {questions.length}
        </p>
        <p style={{ color: 'var(--text-muted)', marginTop: 'var(--sp-2)' }}>
          {all
            ? 'Alles richtig. Dieses Thema sitzt.'
            : correctCount >= questions.length / 2
              ? 'Solide. Die Erklärungen zu den falschen Antworten lohnen sich nochmal.'
              : 'Kein Problem – lies die Lektion in Ruhe nochmal und versuch es dann erneut. Darum geht es hier.'}
        </p>
        <p style={{ marginTop: 'var(--sp-4)' }}>
          <button type="button" className="btn" onClick={restart}>
            Quiz wiederholen
          </button>
        </p>
      </div>
    )
  }

  return (
    <div className="choice">
      <div className="quiz__progress">
        <span>
          Frage {index + 1} von {questions.length}
        </span>
        <div className="quiz__dots" aria-hidden="true">
          {questions.map((_, i) => (
            <span
              key={i}
              className={`quiz__dot${
                results[i] === true
                  ? ' quiz__dot--correct'
                  : results[i] === false
                    ? ' quiz__dot--wrong'
                    : ''
              }`}
            />
          ))}
        </div>
      </div>

      <p className="choice__q">
        <Md>{question.q}</Md>
      </p>

      <Choice options={question.options} onAnswer={answer} answered={answered} picked={picked} />

      {answered && (
        <div className={`choice__explain choice__explain--${isCorrect ? 'correct' : 'wrong'}`}>
          <p style={{ marginBottom: '0.4rem', fontWeight: 650 }}>
            {isCorrect ? '✓ Richtig' : '✗ Nicht ganz'}
          </p>
          <MdBlock>{question.options[picked].explain}</MdBlock>
          <p style={{ marginTop: 'var(--sp-3)' }}>
            <button type="button" className="btn btn--primary" onClick={next}>
              {index + 1 >= questions.length ? 'Ergebnis anzeigen' : 'Nächste Frage'}
            </button>
          </p>
        </div>
      )}
    </div>
  )
}
