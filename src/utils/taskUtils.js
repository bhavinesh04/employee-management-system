// ================= EMPLOYEE OVERDUE CHECK =================
export const isOverdue = (task) => {
  if (!task?.date) return false
  if (!task.active) return false
  if (task.completed || task.failed) return false

  const today = new Date()
  const deadline = new Date(task.date)

  // normalize dates (ignore time)
  today.setHours(0, 0, 0, 0)
  deadline.setHours(0, 0, 0, 0)

  return deadline < today
}

// ================= ADMIN OVERDUE CHECK =================
export const isAdminOverdue = (task) => {
  if (!task?.date) return false
  if (task.completed) return false

  const today = new Date()
  const deadline = new Date(task.date)

  today.setHours(0, 0, 0, 0)
  deadline.setHours(0, 0, 0, 0)

  return deadline < today
}
