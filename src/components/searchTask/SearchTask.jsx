import { useState } from 'react'

export const SearchTask = (tasks) => {
  const [searchValue, setSearchValue] = useState('')

  const handleSearchTask = (event) => {
    setSearchValue(event.target.value)
  }

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchValue.toLowerCase())
  )

  return {
    searchValue,
    handleSearchTask,
    filteredTasks,
  }
}
