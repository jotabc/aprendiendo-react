import { create } from 'zustand'
import { type Question } from '../types.d'
import confetti from 'canvas-confetti'

interface State {
  questions: Question[];
  currentQuestions: number;
  fetchQuetions: (limit: number)=> Promise<void>;
  selectAnswer: (questionId: number, index: number) => void;
  goNextQuestion: () => void
  previousQuestion: () => void
}

export const useQuestionStore = create<State>((set, get) => {
  return {
    questions: [],
    currentQuestions: 0,
    fetchQuetions: async (limit: number) => {
      const res = await fetch('http://localhost:5173/data.json')
      const json = await res.json()

      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
      set({ questions })
    },
    selectAnswer: (questionId: number, answerIndex: number) => {
      const state = get()
      // copia profunda de las questions
      const newQuestions = structuredClone(state.questions)
      // encontramos el indice de la pregunta
      const questionIndex = newQuestions.findIndex(q => q.id === questionId)
      // obtenemos la informacion de la pregunta
      const questionInfo = newQuestions[questionIndex]
      // averiguamos si el usuario ha seleccionado la respuesta correcta
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
      if (isCorrectUserAnswer) confetti()
      // cambiar la información en la copia de la pregunta
      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex
      }
      // actualizamos el estado
      set({ questions: newQuestions })
    },
    goNextQuestion: () => {
      const { currentQuestions, questions } = get()
      const nextQuestions = currentQuestions + 1

      if (nextQuestions < questions.length) {
        set({ currentQuestions: nextQuestions })
      }
    },
    previousQuestion: () => {
      const { currentQuestions } = get()
      const previousQuestion = currentQuestions - 1

      if (currentQuestions >= 0) {
        set({ currentQuestions: previousQuestion })
      }
    }
  }
})
