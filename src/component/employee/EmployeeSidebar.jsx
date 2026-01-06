import React from "react"

const badgeColors = {
  new: "bg-blue-600",
  overdue: "bg-red-600",
  active: "bg-yellow-500 text-black",
  completed: "bg-green-600",
  failed: "bg-red-700",
}

const EmployeeSidebar = ({
  activeTab,
  setActiveTab,
  counts,
  isOpen,
  onClose,
}) => {
  const items = [
    { key: "new", label: "New Tasks" },
    { key: "active", label: "Active" },
    { key: "overdue", label: "Overdue" },
    { key: "completed", label: "Completed" },
    { key: "failed", label: "Failed" },
    { key: "messages", label: "Messages" },
  ]

  return (
    <aside
      className={`
        fixed md:static top-0 left-0 z-40
        h-screen md:h-[calc(100vh-72px)]
        w-64 bg-[#0F172A] p-5 border-r border-gray-800
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        flex flex-col   /* ✅ allows bottom alignment later */
      `}
    >
      {/* ❌ Close button (mobile only) */}
      <button
        onClick={() => onClose?.()}
        className="md:hidden text-gray-400 text-xl mb-6 self-end"
      >
        ✕
      </button>

      <h2 className="text-xl font-semibold text-white mb-8">
        My Tasks
      </h2>

      <div className="space-y-2">
        {items.map(item => (
          <button
            key={item.key}
            onClick={() => {
              setActiveTab(item.key)
              onClose?.() // ✅ SAFE
            }}
            className={`w-full flex justify-between items-center px-4 py-2.5 rounded-lg transition
              ${
                activeTab === item.key
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
          >
            <span>{item.label}</span>

            {/* ✅ Badge only for task tabs */}
            {item.key !== "messages" && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  badgeColors[item.key]
                }`}
              >
                {counts[item.key] || 0}
              </span>
            )}
          </button>
        ))}
      </div>
    </aside>
  )
}

export default EmployeeSidebar
