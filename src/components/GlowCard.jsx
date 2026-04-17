export default function GlowCard({ children, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-card-bg border border-card-border rounded-xl p-6
        transition-all duration-200
        hover:scale-[1.02] hover:rotate-[-0.5deg]
        ${className}
      `}
    >
      {children}
    </div>
  )
}
