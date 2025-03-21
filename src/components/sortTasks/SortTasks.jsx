export const SortTasks = (tasks, setTasks) => {
  const sortedTasks = () => {
    const sortTasks = [...tasks].sort((a, b) => a.title.localeCompare(b.title))
    setTasks(sortTasks)
  }

  return {
    sortedTasks,
  }
}
