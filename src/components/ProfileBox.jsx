'use client'
import { useState, useRef, useEffect } from 'react'

export default function ProfileBox({ name, onLogout }) {
  const [show, setShow] = useState(false)
  const boxRef = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) setShow(false)
    }
    if (show) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [show])

  return (
    <div ref={boxRef} className="relative inline-block ml-10">
      <div
        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl font-bold text-gray-900 cursor-pointer"
        onClick={() => setShow((s) => !s)}
      >
        {name?.[0]?.toUpperCase() || 'U'}
      </div>
      <div className={`absolute top-14 right-0 px-3 py-2 bg-white rounded-md shadow-lg flex flex-col transition-all duration-300 ${show ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-3 pointer-events-none'}`}>
        <a href="#" className="px-3 py-1 rounded hover:bg-gray-100 font-medium text-gray-900">My Account</a>
        <button className="px-3 py-1 rounded hover:bg-gray-100 font-medium text-gray-900 text-left" onClick={onLogout}>Logout</button>
      </div>
    </div>
  )
}