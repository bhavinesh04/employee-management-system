import admin from '../data/admin'
import employees from '../data/employees'

// Initialize storage ONCE
export const setLocalStorage = () => {
  if (!localStorage.getItem('employees')) {
    localStorage.setItem('employees', JSON.stringify(employees))
  }

  if (!localStorage.getItem('admin')) {
    localStorage.setItem('admin', JSON.stringify(admin))
  }
}

// Only read data
export const getLocalStorage = () => {
  const employees = JSON.parse(localStorage.getItem('employees')) || []
  const admin = JSON.parse(localStorage.getItem('admin')) || []

  return { employees, admin }
}
