'use client'
import ProfileBox from '../ProfileBox'
export default function Header({ user, onLoginClick, onLogout }) {
  return (
    <header className="fixed top-0 left-0 w-full px-[100px] py-5 flex items-center z-[99] bg-green-600/90 backdrop-blur-2xl">
      <a href="#" className="text-2xl font-bold text-white mr-auto">🐦</a>
      <div className="flex items-center">
        {user
          ? <ProfileBox name={user.name} onLogout={onLogout} />
          : <button className="h-10 px-9 border-2 border-white rounded-full text-base text-white font-medium bg-transparent hover:bg-white hover:text-gray-900 transition-colors ml-10" onClick={onLoginClick}>Login</button>
        }
      </div>
    </header>
  )
}