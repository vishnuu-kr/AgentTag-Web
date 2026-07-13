import { motion } from 'framer-motion'
import { Button } from './components/ui/button'

export default function NotFoundPage() {
  return (
    <div data-theme="dark" className="aeg-dash min-h-screen w-full flex flex-col items-center justify-center bg-[#050505] text-zinc-100 antialiased relative overflow-hidden">
      {/* Subtle dot matrix background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[420px] flex flex-col items-center text-center relative z-10"
      >
        <div className="flex items-center gap-2.5 mb-8">
          <img src="/logo_bgremoved_inverted.png" alt="AgentTag" className="h-[28px] w-auto opacity-100 mix-blend-screen" />
          <span className="text-white text-[22px] font-bold tracking-tight">AgentTag</span>
        </div>

        <div className="text-[120px] font-bold tracking-tighter text-white/5 leading-none mb-4 select-none">
          404
        </div>
        
        <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
          Page Not Found
        </h1>
        <p className="text-[13px] text-zinc-400 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>

        <Button
          onClick={() => window.location.href = '/'}
          className="h-11 px-8 transition-all active:scale-[0.98] rounded-xl text-[13px] font-semibold bg-zinc-100 text-zinc-900 hover:bg-white shadow-none"
        >
          Return Home
        </Button>
      </motion.div>
    </div>
  )
}
