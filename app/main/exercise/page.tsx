"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { Typography } from "@/components/atoms/typography"
import { Button } from "@/components/atoms/button"
import { XPProgressBar } from "@/components/molecules/xp-progress-bar"
import { X, Volume2, ArrowRight, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"

export default function ExercisePage() {
  const [stage, setStage] = React.useState<'question' | 'result'>('question')
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null)
  const [isCorrect, setIsCorrect] = React.useState<boolean>(false)

  const handleSelect = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleCheck = () => {
    if (selectedAnswer === "ba") {
      setIsCorrect(true)
    } else {
      setIsCorrect(false)
    }
    setStage('result')
  }

  const handleNext = () => {
    setStage('question')
    setSelectedAnswer(null)
    setIsCorrect(false)
  }

  return (
    <div className="fixed inset-0 bg-white dark:bg-slate-950 z-[100] flex flex-col selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden">
      
      {/* Top Bar Navigation */}
      <div className="flex items-center gap-4 p-4 md:p-6 pb-2">
        <Link href="/main/learn">
          <Button variant="ghost" size="icon" className="w-10 h-10 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <X className="w-6 h-6" />
          </Button>
        </Link>
        <div className="flex-1">
          <XPProgressBar value={30} max={100} showPoints={false} />
        </div>
        <div className="w-10 h-10 font-bold text-indigo-600 flex items-center justify-center">
          3/10
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col px-4 md:px-8 overflow-y-auto w-full max-w-4xl mx-auto py-8">
        <Typography variant="h2" className="font-bold text-center mb-8">Pilih suku kata pertama!</Typography>

        <div className="flex justify-center mb-10">
          <div className="w-64 h-64 bg-slate-100 dark:bg-slate-900 rounded-3xl flex flex-col items-center justify-center gap-4 p-6 border-2 border-slate-200 dark:border-slate-800 shadow-inner relative overflow-hidden group">
            {/* Fallback image representation */}
            <div className="text-8xl select-none group-hover:scale-110 transition-transform duration-300">👕</div>
            <Typography variant="h4" className="font-black text-slate-700 dark:text-slate-300 tracking-widest text-center uppercase">
              <span className="text-indigo-500 font-extrabold border-b-4 border-indigo-500 pb-1 mr-1">__</span> <span className="opacity-50">JU</span>
            </Typography>
            <button className="absolute top-4 right-4 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center text-indigo-500 hover:bg-indigo-50 dark:hover:bg-slate-700 transition active:scale-95">
              <Volume2 className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-auto mb-20 max-w-2xl mx-auto w-full">
          {['be', 'ba', 'bu', 'bo'].map((option) => (
             <motion.button
                key={option}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelect(option)}
                disabled={stage === 'result'}
                className={`aspect-square rounded-2xl md:rounded-3xl flex items-center justify-center text-4xl md:text-5xl font-black transition-all duration-200 shadow-sm border-b-4 ${
                  selectedAnswer === option 
                    ? 'bg-indigo-100 border-indigo-500 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 dark:border-indigo-500 ring-4 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-950' 
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-800'
                } ${stage === 'result' ? 'opacity-50 cursor-not-allowed' : ''}`}
             >
                {option.toUpperCase()}
             </motion.button>
          ))}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="p-4 md:p-6 border-t border-slate-200 dark:border-slate-800 w-full bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
           <Button variant="ghost" className="text-slate-400 font-bold uppercase tracking-wider" disabled={stage === 'result'}>
              Lewati
           </Button>

           <Button 
              size="lg" 
              className={`rounded-xl px-8 font-bold text-lg uppercase tracking-wider shadow-lg transition-all ${
                 selectedAnswer ? 'opacity-100 translate-y-0' : 'opacity-50 pointer-events-none'
              } ${stage === 'result' ? 'hidden' : 'flex'}`}
              onClick={handleCheck}
           >
              Periksa
           </Button>
        </div>
      </div>

      {/* Result Overlay Drawer */}
      <AnimatePresence>
        {stage === 'result' && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`absolute bottom-0 inset-x-0 p-6 md:p-10 border-t-2 z-50 flex flex-col md:flex-row items-center justify-between gap-6 ${
              isCorrect 
                ? 'bg-emerald-100 border-emerald-500 dark:bg-emerald-950 dark:border-emerald-700' 
                : 'bg-rose-100 border-rose-500 dark:bg-rose-950 dark:border-rose-700'
            }`}
          >
            <div className={`flex items-center gap-4 ${isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
              <div className={`p-3 rounded-full bg-white dark:bg-slate-900 shadow-sm ${isCorrect ? 'text-emerald-500' : 'text-rose-500'}`}>
                {isCorrect ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
              </div>
              <div>
                <Typography variant="h2" className="font-extrabold uppercase tracking-widest">{isCorrect ? 'Hebat!' : 'Aduh...'}</Typography>
                <Typography variant="p" className="font-bold mt-1 opacity-90">{isCorrect ? 'Jawaban kamu benar.' : 'Jawaban yang benar adalah BA'}</Typography>
              </div>
            </div>
            
            <Button 
              size="lg" 
              onClick={handleNext}
              className={`rounded-2xl px-12 py-8 w-full md:w-auto font-black text-xl uppercase tracking-widest shadow-xl transition-transform active:scale-95 border-b-4 ${
                isCorrect 
                  ? 'bg-emerald-500 hover:bg-emerald-600 border-emerald-700 text-white' 
                  : 'bg-rose-500 hover:bg-rose-600 border-rose-700 text-white'
              }`}
            >
              Lanjut <ArrowRight className="ml-2 w-6 h-6" strokeWidth={3} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
