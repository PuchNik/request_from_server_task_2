import { useState } from 'react'

export const useRequestPost = (setIsUpdating) => {
  const [taskValue, setTaskValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (event) => {
    setTaskValue(event.target.value)
    setErrorMessage('')
  }

  const handleAddTask = (event) => {
    event.preventDefault()

    if (!taskValue) {
      setErrorMessage('Невозможно добавить пустую задачу')
      return
    }

    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        title: taskValue,
        completed: false,
      }),
    })
      .then((rowResponse) => rowResponse.json())
      .finally(() => {
        setTaskValue('')
        setIsUpdating(false)
      })
  }

  const addNewTask = () => {
    if (!taskValue) {
      setErrorMessage('Невозможно добавить пустую задачу')
      return
    }

    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        title: taskValue,
        completed: false,
      }),
    })
      .then((rowResponse) => rowResponse.json())
      .finally(() => {
        setTaskValue('')
        setIsUpdating(false)
      })
  }

  return {
    addNewTask,
    taskValue,
    handleInputChange,
    handleAddTask,
    errorMessage,
  }
}
