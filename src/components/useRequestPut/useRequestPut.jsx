import { useState } from 'react'

export const useRequestPut = (setIsUpdating) => {
  const [idTaskModified, setIdTaskModified] = useState(null)
  const [editTaskValue, setEditTaskValue] = useState('')

  const editTask = (id, title) => {
    setIdTaskModified(id)
    setEditTaskValue(title)
  }

  const handleEditChange = (event) => {
    setEditTaskValue(event.target.value)
  }

  const handleEditTask = (event) => {
    event.preventDefault()

    fetch(`http://localhost:3000/tasks/${idTaskModified}`, {
      method: 'PUT',
      headers: { 'Content-type': 'applications/json; charset=utf-8' },
      body: JSON.stringify({
        title: editTaskValue,
        completed: false,
      }),
    })
      .then((rowResponse) => rowResponse.json())
      .finally(() => {
        setIdTaskModified(null)
        setEditTaskValue('')
        setIsUpdating(false)
      })
  }

  return {
    editTask,
    idTaskModified,
    setIdTaskModified,
    handleEditChange,
    editTaskValue,
    handleEditTask,
  }
}
