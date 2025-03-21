import './App.css'
import {
  SortTasks,
  SearchTask,
  useRequestDelete,
  useRequestGet,
  useRequestPost,
  useRequestPut,
} from './components/index.js'
import { useState } from 'react'


function App() {
  const [isUpdating, setIsUpdating] = useState(false)

  const { isLoading, tasks, setTasks } = useRequestGet({
    isUpdating,
    setIsUpdating,
  })

  const { 
    addNewTask, 
    taskValue, 
    handleInputChange, 
    handleAddTask 
} = useRequestPost(setIsUpdating)

  const {
    editTask,
    idTaskModified,
    setIdTaskModified,
    handleEditChange,
    editTaskValue,
    handleEditTask,
  } = useRequestPut(setIsUpdating)

  const { deleteTask } = useRequestDelete(setIsUpdating)
  const { searchValue, handleSearchTask, filteredTasks } = SearchTask(tasks)
  const { sortedTasks } = SortTasks(tasks, setTasks)

  return (
    <>
      {isLoading ? (
        <p>Пожалуйста, подождите, идет загрузка данных...</p>
      ) : (
        <div>
          <h1>Список пользователей</h1>
          <input
            type="text"
            placeholder="Поиск задачи..."
            value={searchValue}
            onChange={handleSearchTask}
          />
          <button onClick={sortedTasks}>Фильтр А-Я</button>
          <div>
            <form onSubmit={handleAddTask}>
              <input
                type="text"
                placeholder="Записать задачу..."
                value={taskValue}
                onChange={handleInputChange}
              />
            </form>
            <button onClick={addNewTask} type={'submit'}>
              Добавить
            </button>
          </div>
          <ol>
            {filteredTasks.map(({ id, title }) => (
              <li key={id}>
                <div>
                  {idTaskModified === id ? (
                    <form onSubmit={handleEditTask}>
                      <input
                        type="text"
                        value={editTaskValue}
                        onBlur={() => setIdTaskModified(null)}
                        onChange={handleEditChange}
                      />
                    </form>
                  ) : (
                    title
                  )}
                  <button onClick={() => editTask(id, title)}>
                    Редактировать
                  </button>
                  <button onClick={() => deleteTask(id)}>Удалить</button>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  )
}

export default App
