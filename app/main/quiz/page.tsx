"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { Typography } from "@/components/atoms/typography"
import { Button } from "@/components/atoms/button"
import { GlassCard } from "@/components/molecules/glass-card"
import { X, ArrowRight, Award, Star } from "lucide-react"
import Link from "next/link"

const quizData = [
  {
    id: 1,
    question: "Suku kata apa yang ada di awal kata BUKU?",
    options: ["Bu", "Ba", "Bi", "Bo"],
    answer: "Bu"
  },
  {
    id: 2,
    question: "Benda apa yang berawalan dengan kata ME?",
    options: ["Meja", "Kursi", "Lemari", "Pintu"],
    answer: "Meja"
  }
]

export default function QuizPage() {
  const [currentQ, setCurrentQ] = React.useState(0)
  const [score, setScore] = React.useState(0)
  const [showResult, setShowResult] = React.useState(false)
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null)
  
  const handleSelect = (option: string) => {
    setSelectedOption(option)
  }

  const handleNext = () => {
    if (selectedOption === quizData[currentQ].answer) {
      setScore(s => s + 1)
    }
    
    if (currentQ < quizData.length - 1) {
      setCurrentQ(c => c + 1)
      setSelectedOption(null)
    } else {
      setShowResult(true)
    }
  }

  if (showResult) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-500 to-fuchsia-600 z-[100] flex flex-col items-center justify-center p-6 text-white selection:bg-white/30 selection:text-white">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="flex flex-col items-center max-w-md w-full"
        >
          <Award className="w-32 h-32 text-amber-300 drop-shadow-[0_0_30px_rgba(252,211,77,0.5)] mb-8" />
          <Typography variant="h1" className="font-black text-center text-4xl mb-2 text-white">Kuis Selesai!</Typography>
          <Typography variant="h3" className="font-bold text-indigo-100 mb-8 border-b border-indigo-400/30 pb-8 w-full text-center">
            Kamu menjawab {score} dari {quizData.length} benar.
          </Typography>
          
          <div className="flex gap-2 mb-10">
             {[...Array(quizData.length)].map((_, i) => (
                <Star key={i} className={`w-10 h-10 ${i < score ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]' : 'text-indigo-400/50 fill-indigo-400/20'}`} />
             ))}
          </div>

          <Link href="/main" className="w-full">
            <Button size="lg" className="w-full bg-white text-indigo-600 hover:bg-slate-50 font-bold text-lg h-14 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)]">
              Selesai Belajar
            </Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-slate-50 dark:bg-slate-950 z-[100] flex flex-col selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden">
      
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between p-4 md:p-6 pb-2">
        <Link href="/main">
          <Button variant="ghost" size="icon" className="w-10 h-10 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <X className="w-6 h-6" />
          </Button>
        </Link>
        <div className="font-bold text-indigo-600 bg-indigo-100 dark:bg-indigo-900/40 dark:text-indigo-400 px-4 py-1.5 rounded-full text-sm">
          Soal {currentQ + 1} / {quizData.length}
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full h-1 bg-slate-200 dark:bg-slate-800">
         <motion.div 
            className="h-full bg-indigo-500"
            initial={{ width: `${(currentQ / quizData.length) * 100}%` }}
            animate={{ width: `${((currentQ + 1) / quizData.length) * 100}%` }}
         />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col px-4 md:px-8 overflow-y-auto w-full max-w-3xl mx-auto py-8">
        
        <GlassCard className="p-8 md:p-12 text-center mb-10 border-2 border-slate-200 dark:border-slate-800 shadow-sm rounded-3xl bg-white dark:bg-slate-900">
          <Typography variant="h2" className="font-bold leading-tight">
            {quizData[currentQ].question}
          </Typography>
        </GlassCard>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-auto mb-20">
          {quizData[currentQ].options.map((option, idx) => {
             const isSelected = selectedOption === option;
             return (
               <motion.button
                  key={option}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(option)}
                  className={`p-6 rounded-2xl flex items-center gap-4 text-xl font-bold transition-all duration-200 shadow-sm border-b-4 text-left ${
                    isSelected 
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-500 ring-2 ring-indigo-500 shadow-md' 
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-750'
                  }`}
               >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-500'}`}>
                     {String.fromCharCode(65 + idx)}
                  </div>
                  {option}
               </motion.button>
             )
          })}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="p-4 md:p-6 border-t border-slate-200 dark:border-slate-800 w-full bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto flex items-center justify-end">
           <Button 
              size="lg" 
              className={`rounded-xl px-10 h-14 font-bold text-lg transition-all ${
                 selectedOption ? 'opacity-100' : 'opacity-50 pointer-events-none'
              }`}
              onClick={handleNext}
           >
              Selanjutnya <ArrowRight className="w-5 h-5 ml-2" />
           </Button>
        </div>
      </div>

    </div>
  )
}
