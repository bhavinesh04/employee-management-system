import React from "react"

const badgeColors = {
  history: "bg-green-600",
}

const AdminSidebar = ({
  activeTab,
  setActiveTab,
  counts,
  isOpen,
  onClose,
}) => {
  return (
    <aside
      className={`
        fixed md:sticky top-0 md:top-[72px] left-0 z-40
        h-screen md:h-[calc(100vh-72px)]
        w-64 bg-[#0F172A] p-5 border-r border-gray-800
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      {/* ❌ Close button (mobile only) */}
      <button
        onClick={onClose}
        className="md:hidden text-gray-400 text-xl mb-6"
      >
        ✕
      </button>

      {/* TITLE */}
      <h2 className="text-xl font-semibold text-white mb-8">
        Admin Panel
      </h2>

      {/* MAIN FEATURES */}
      <div className="space-y-2">
        <SidebarItem
          label="Task History"
          tab="history"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onClose={onClose}
          badge={counts?.history}
          color={badgeColors.history}
        />

        <SidebarItem
          label="Create New Task"
          tab="tasks"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onClose={onClose}
        />

        <SidebarItem
          label="Messages"
          tab="messages"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onClose={onClose}
        />
      </div>

      {/* PUSH TO BOTTOM */}
     <div className="mt-auto pt-6 border-t border-gray-800 space-y-2">

        <SidebarItem
          label="Create New Employee"
          tab="createEmployee"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onClose={onClose}
          danger
        />

        <SidebarItem
        
          label="Reset Password"
          tab="resetPassword"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onClose={onClose}
          danger
          
        />
      </div>
    </aside>
  )
}

export default AdminSidebar

/* ---------------- HELPER COMPONENT ---------------- */

const SidebarItem = ({
  label,
  tab,
  activeTab,
  setActiveTab,
  onClose,
  badge,
  color,
  danger = false,
}) => {
  return (
    <button
    onClick={() => {
  setActiveTab(tab)
  onClose?.()   // ✅ SAFE CALL
}}

      className={`
        w-full flex justify-between items-center
        px-4 py-2.5 rounded-lg transition
        ${
          activeTab === tab
            ? danger
              ? "bg-red-600 text-white"
              : "bg-blue-600 text-white"
            : danger
            ? "text-red-400 hover:bg-red-600/20"
            : "text-gray-400 hover:bg-gray-800 hover:text-white"
        }
      `}
    >
      <span>{label}</span>

      {badge !== undefined && (
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${color}`}
        >
          {badge}
        </span>
      )}
    </button>
  )
}
