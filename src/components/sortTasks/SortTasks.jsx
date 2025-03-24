import { useState } from 'react'

export const SortTasks = (tasks, setTasks) => {
  const [sortSwitch, setSortSwitch] = useState(true)

  const sortedTasks = () => {
    const originalTasks = [...tasks]
    if (sortSwitch) {
      const sortedTasks = [...tasks].sort((a, b) => a.title.localeCompare(b.title))
      setTasks(sortedTasks)
      setSortSwitch(false)
    } else {
      setTasks(originalTasks)
      setSortSwitch(true)
    }
  }

  return {
    sortedTasks,
  }
}
