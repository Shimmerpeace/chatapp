'use client'
import { useEffect, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'

export default function AlertBox({ show, message, error, onClose }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        if (onClose) setTimeout(onClose, 500)
      }, 6000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  return (
    <div className={`fixed top-9 left-1/2 -translate-x-1/2 w-[350px] h-[70px] z-[100] bg-white rounded-md px-4 flex items-center shadow-lg overflow-hidden transition-transform duration-500 ${visible ? 'translate-y-0' : '-translate-y-[150%]'}`}>
      <div className={`flex items-center h-full font-medium text-base relative ${error ? 'text-red-600' : 'text-green-600'}`}>
        <FaCheckCircle className={`text-3xl mr-2 ${error ? 'text-red-600' : 'text-green-600'}`} />
        <span>{message}</span>
        <span className={`absolute left-0 bottom-0 h-1 w-full ${error ? 'bg-red-600' : 'bg-green-600'}`} style={{ animation: 'progress 6s linear forwards' }} />
        <style jsx>{`
          @keyframes progress {
            100% { width: 0; }
          }
        `}</style>
      </div>
    </div>
  )
}