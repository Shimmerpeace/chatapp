'use client'
export default function Modal({ show, children, onClose }) {
  if (!show) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="relative w-[420px] bg-white/10 border-2 border-white/30 rounded-2xl shadow-xl backdrop-bl-lg text-white overflow-hidden">
        <button type="button" className="absolute top-0 right-0 w-12 h-12 bg-white text-gray-900 rounded-bl-2xl text-3xl flex items-center justify-center z-10" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  )
}