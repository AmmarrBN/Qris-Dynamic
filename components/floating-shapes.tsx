"use client"

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl animate-float" />
      <div className="absolute top-40 right-20 w-52 h-52 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-32 left-1/4 w-44 h-44 bg-gradient-to-br from-primary/15 to-accent/15 rounded-full blur-3xl animate-float-reverse" />
      <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-gradient-to-br from-accent/15 to-primary/15 rounded-full blur-3xl animate-float" />

      <div className="absolute top-1/3 right-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-2xl animate-float-slow rotate-45" />
      <div className="absolute bottom-1/3 left-20 w-40 h-40 bg-gradient-to-br from-accent/10 to-primary/10 rounded-3xl blur-2xl animate-float-reverse rotate-12" />

      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl animate-float-slow -translate-x-1/2 -translate-y-1/2" />

      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                           linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "4rem 4rem",
        }}
      />
    </div>
  )
}
