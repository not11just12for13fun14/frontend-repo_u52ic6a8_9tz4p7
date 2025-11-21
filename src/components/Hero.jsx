import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Spline 3D scene */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient aura overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(124,58,237,0.25),rgba(59,130,246,0.12)_40%,transparent_70%)]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-[0_2px_20px_rgba(99,102,241,0.35)]">
          Think faster. Decide smarter.
        </h1>
        <p className="mt-4 text-slate-200/90 text-lg sm:text-xl">
          An AI-powered thinking assistant that asks targeted questions, learns your preferences, and turns fuzzy ideas into concrete plans.
        </p>
      </div>
    </section>
  )
}

export default Hero
