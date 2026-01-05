export const isOverdue = (task) => {
  if (!task.date) return false

  const today = new Date()
  const deadline = new Date(task.date)

  if (!task.active) return false
  if (task.completed || task.failed) return false
  // remove time for correct comparison
  today.setHours(0, 0, 0, 0)
  deadline.setHours(0, 0, 0, 0)

  return new Date(task.date) < new Date()
}

export const isAdminOverdue = (task) => {
  if (!task.date) return false
  if (task.completed) return false
  return new Date(task.date) < new Date()
}
