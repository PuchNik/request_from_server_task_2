import styles from './App.module.css'; // Предполагается, что стили находятся в App.module.css
import { useState } from 'react'

import {
  SortTasks,
  SearchTask,
  useRequestDelete,
  useRequestGet,
  useRequestPost,
  useRequestPut,
} from './components/index.js'


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
    <div className={styles['app-container']}>
      {isLoading ? (
        <p className={styles['loading-text']}>Пожалуйста, подождите, идет загрузка данных...</p>
      ) : (
        <div className={styles['content-container']}>
          <div className={styles['filter-container']}>
          <input
            className={styles['search-input']}
            type="text"
            placeholder="Поиск задачи..."
            value={searchValue}
            onChange={handleSearchTask}
          />
          <h1 className={styles['title']}>Список пользователей</h1>
          <button className={styles['sort-button']} onClick={sortedTasks}>Фильтр А-Я</button>
          </div>
          <div className={styles['task-input-container']}>
            <form className={styles['task-form']} onSubmit={handleAddTask}>
              <input
                className={styles['task-input']}
                type="text"
                placeholder="Записать задачу..."
                value={taskValue}
                onChange={handleInputChange}
              />
            </form>
            <button className={styles['add-button']} onClick={addNewTask} type={'submit'}>
              Добавить
            </button>
          </div>
          <ol className={styles['task-list']}>
            {filteredTasks.map(({ id, title }) => (
              <li key={id} className={styles['task-item']}>
                <div className={styles['task-content']}>
                  {idTaskModified === id ? (
                    <form className={styles['edit-form']} onSubmit={handleEditTask}>
                      <input
                        className={styles['edit-input']}
                        type="text"
                        value={editTaskValue}
                        onBlur={() => setIdTaskModified(null)}
                        onChange={handleEditChange}
                      />
                    </form>
                  ) : (
                    <span className={styles['task-title']}>{title}</span>
                  )}
                  <div className={styles['buttons-container']}>
                  <button className={styles['edit-button']} onClick={() => editTask(id, title)}>
                    Редактировать
                  </button>
                  <button className={styles['delete-button']} onClick={() => deleteTask(id)}>Удалить</button>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

export default App
