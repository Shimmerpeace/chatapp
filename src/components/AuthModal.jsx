'use client'
import { useState, useRef, useEffect } from 'react'
import { FaUser, FaLock, FaEnvelope, FaTimes, FaCheckCircle } from 'react-icons/fa'

export default function AuthModal({ show, onClose, onLogin, onRegister }) {
  const [isRegister, setIsRegister] = useState(false)
  const modalRef = useRef(null)

  useEffect(() => {
    if (!show) setIsRegister(false)
  }, [show])

  // Close on overlay click
  useEffect(() => {
    function handleClick(e) {
      if (show && modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }
    if (show) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [show, onClose])

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/30 transition-all ${show ? 'scale-100 visible' : 'scale-0 invisible'}`}>
      <div ref={modalRef} className={`relative w-[420px] ${isRegister ? 'h-[520px]' : 'h-[440px]'} bg-white/10 border-2 border-white/30 rounded-2xl shadow-xl backdrop-blur-lg text-white overflow-hidden transition-all`}>
        <button
          type="button"
          className="absolute top-0 right-0 w-12 h-12 bg-white text-gray-900 rounded-bl-2xl text-3xl flex items-center justify-center z-10"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        {/* Login Form */}
        <div className={`absolute top-0 left-0 w-full h-full transition-transform duration-200 ${isRegister ? '-translate-x-full pointer-events-none opacity-0' : 'translate-x-0 opacity-100'}`}>
          <div className="p-10">
            <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
            <form onSubmit={onLogin}>
              <div className="relative mb-6">
                <input type="email" name="email" placeholder="Email" required className="w-full h-12 bg-transparent border-2 border-white/30 rounded-full text-white pl-5 pr-12 py-2 placeholder-white focus:outline-none" />
                <FaEnvelope className="absolute right-5 top-1/2 -translate-y-1/2 text-xl" />
              </div>
              <div className="relative mb-6">
                <input type="password" name="password" placeholder="Password" required className="w-full h-12 bg-transparent border-2 border-white/30 rounded-full text-white pl-5 pr-12 py-2 placeholder-white focus:outline-none" />
                <FaLock className="absolute right-5 top-1/2 -translate-y-1/2 text-xl" />
              </div>
              <button type="submit" className="w-full h-11 bg-white rounded-full text-gray-900 font-medium shadow text-base">Login</button>
              <p className="text-center mt-6 text-sm">
                Do not have an account?{' '}
                <button type="button" className="text-white font-semibold hover:underline" onClick={() => setIsRegister(true)}>
                  Register
                </button>
              </p>
            </form>
          </div>
        </div>
        {/* Register Form */}
        <div className={`absolute top-0 left-0 w-full h-full transition-transform duration-200 ${isRegister ? 'translate-x-0 opacity-100' : 'translate-x-full pointer-events-none opacity-0'}`}>
          <div className="p-10">
            <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
            <form onSubmit={onRegister}>
              <div className="relative mb-6">
                <input type="text" name="name" placeholder="Name" required className="w-full h-12 bg-transparent border-2 border-white/30 rounded-full text-white pl-5 pr-12 py-2 placeholder-white focus:outline-none" />
                <FaUser className="absolute right-5 top-1/2 -translate-y-1/2 text-xl" />
              </div>
              <div className="relative mb-6">
                <input type="email" name="email" placeholder="Email" required className="w-full h-12 bg-transparent border-2 border-white/30 rounded-full text-white pl-5 pr-12 py-2 placeholder-white focus:outline-none" />
                <FaEnvelope className="absolute right-5 top-1/2 -translate-y-1/2 text-xl" />
              </div>
              <div className="relative mb-6">
                <input type="password" name="password" placeholder="Password" required className="w-full h-12 bg-transparent border-2 border-white/30 rounded-full text-white pl-5 pr-12 py-2 placeholder-white focus:outline-none" />
                <FaLock className="absolute right-5 top-1/2 -translate-y-1/2 text-xl" />
              </div>
              <button type="submit" className="w-full h-11 bg-white rounded-full text-gray-900 font-medium shadow text-base">Register</button>
              <p className="text-center mt-6 text-sm">
                Already have an account?{' '}
                <button type="button" className="text-white font-semibold hover:underline" onClick={() => setIsRegister(false)}>
                  Login
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}