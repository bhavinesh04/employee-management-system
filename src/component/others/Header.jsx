import React from "react"

const Header = ({ changeUser, data, onMenuClick }) => {
  const logOutUser = () => {
    localStorage.removeItem("loggedInUser")
    changeUser()
  }

  return (
    <div className="flex justify-between items-center px-4 md:px-6 py-4 bg-[#0F172A] sticky top-0 z-50 border-b border-gray-800">
      
      {/* LEFT: Hamburger + Greeting */}
      <div className="flex items-center gap-3">
        
        {/* ☰ Mobile Menu */}
        <button
          onClick={onMenuClick}
          className="md:hidden flex items-center justify-center
                     w-10 h-10 rounded-lg
                     text-gray-300 hover:text-white
                     hover:bg-gray-700 transition"
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Greeting */}
        <h1 className="text-gray-400 text-lg leading-tight">
          Hello <br />
          <span className="text-2xl font-semibold text-white">
            {data?.firstName || "User"} 👋



          </span>
        </h1>
      </div>

      {/* LOGOUT */}
      <button
        onClick={logOutUser}
        className="
          bg-red-600
          hover:bg-red-700
          text-white
          px-5 py-2
          rounded-lg
          transition
        "
      >
        Log Out
      </button>
    </div>
  )
}

export default Header
