'use client'
import { FaEnvelope, FaLock } from 'react-icons/fa'
export default function LoginForm({ onSubmit, onSwitch }) {
  return (
    <form onSubmit={onSubmit}>
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
        <button type="button" className="text-white font-semibold hover:underline" onClick={onSwitch}>
          Register
        </button>
      </p>
    </form>
  )
}