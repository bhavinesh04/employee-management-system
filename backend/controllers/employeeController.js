export const getMyTasks = (req, res) => {
  res.json({
    message: "Employee can see own tasks only",
    employeeId: req.user.id
  })
}
