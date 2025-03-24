import styles from './App.module.css' // Предполагается, что стили находятся в App.module.css
import { useState } from 'react'

import {
  SortTasks,
  SearchTask,
  useRequestDelete,
  useRequestGet,
  useRequestPost,
  useRequestPut,
  Btn,
  Input,
} from './components/index.js'

function App() {
  const [isUpdating, setIsUpdating] = useState(false)

  const { isLoading, tasks, setTasks } = useRequestGet({
    isUpdating,
    setIsUpdating,
  })

  const { addNewTask, taskValue, handleInputChange, handleAddTask, errorMessage } =
    useRequestPost(setIsUpdating)

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
        <p className={styles['loading-text']}>
          Пожалуйста, подождите, идет загрузка данных...
        </p>
      ) : (
        <div className={styles['content-container']}>
          <div className={styles['filter-container']}>
            <Input
              className={styles['search-input']}
              type="text"
              placeholder="Поиск задачи..."
              value={searchValue}
              onChange={handleSearchTask}
            />
            <h1 className={styles['title']}>Список пользователей</h1>
            <Btn className={styles['sort-button']} onClick={sortedTasks}>
              Фильтр А-Я
            </Btn>
          </div>
          <div className={styles['task-input-container']}>
            <form className={styles['task-form']} onSubmit={handleAddTask}>
              <Input
                className={styles['task-input']}
                type="text"
                placeholder="Записать задачу..."
                value={taskValue}
                onChange={handleInputChange}
              />
            </form>
            <Btn
              className={styles['add-button']}
              onClick={addNewTask}
              type={'submit'}
            >
              Добавить
            </Btn>
          </div>
          {errorMessage && <p className={styles['error-text']}>{errorMessage}</p>}
          {tasks.length ? (
            <ol className={styles['task-list']}>
              {filteredTasks.map(({ id, title }) => (
                <li key={id} className={styles['task-item']}>
                  <div className={styles['task-content']}>
                    {idTaskModified === id ? (
                      <form
                        className={styles['edit-form']}
                        onSubmit={handleEditTask}
                      >
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
                      <Btn
                        className={styles['edit-button']}
                        onClick={() => editTask(id, title)}
                      >
                        Редактировать
                      </Btn>
                      <Btn
                        className={styles['delete-button']}
                        onClick={() => deleteTask(id)}
                      >
                        Удалить
                      </Btn>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p className={styles['empty-list-text']}>Список задач пуст</p>
          )}
        </div>
      )}
    </div>
  )
}

export default App
