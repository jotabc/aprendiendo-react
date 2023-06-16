import { create } from 'zustand'
import { type Question } from '../types.d'

interface State {
  questions: Question[];
  currentQuestions: number;
  fetchQuetions: (limit: number)=> Promise<void>
}

export const useQuestionStore = create<State>((set) => {
  return {
    questions: [],
    currentQuestions: 0,
    fetchQuetions: async (limit: number) => {
      const res = await fetch('http://localhost:5173/data.json')
      const json = await res.json()

      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
      set({ questions })
    }
  }
})
