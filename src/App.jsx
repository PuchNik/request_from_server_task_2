import styles from './App.module.css' // Предполагается, что стили находятся в App.module.css
import { useState } from 'react'

import {
  UseSortNotes,
  UseSearchNote,
  useRequestDelete,
  useRequestGet,
  useRequestPost,
  useRequestPut,
  Btn,
} from './components/index.js'


function App() {
  const [notes, setNotes] = useState([])

  // Hook для получения заметок (GET)
  const { isLoading } = useRequestGet(setNotes)

  // Hook для добавления заметок (POST)
  const {
    addNewNote,
    noteValue,
    handleInputChange,
    handleAddNote,
    errorMessage,
  } = useRequestPost(setNotes)

  // Hook для обновления заметок (PUT)
  const {
    editNote,
    idNoteModified,
    setIdTNoteModified,
    handleEditChange,
    editNoteValue,
    handleEditNote,
  } = useRequestPut(setNotes)

  // Hook для удаления заметок (DELETE)
  const { deleteNote } = useRequestDelete(setNotes)

  // Hook поиска заметок
  const { searchValue, handleSearchNote, filteredNotes } = UseSearchNote(notes)

  // Hook сортировки заметок
  const { sortedNotes } = UseSortNotes(notes, setNotes)

  return (
    <div className={styles['app-container']}>
      {isLoading ? (
        <p className={styles['loading-text']}>
          Пожалуйста, подождите, идет загрузка данных...
        </p>
      ) : (
        <div className={styles['content-container']}>
          <div className={styles['filter-container']}>
            <input
              className={styles['search-input']}
              type="text"
              placeholder="Поиск задачи..."
              value={searchValue}
              onChange={handleSearchNote}
            />
            <h1 className={styles['title']}>Список пользователей</h1>
            <Btn className={styles['sort-button']} onClick={sortedNotes}>
              Фильтр А-Я
            </Btn>
          </div>
          <div className={styles['task-input-container']}>
            <form className={styles['task-form']} onSubmit={handleAddNote}>
              <input
                className={styles['task-input']}
                type="text"
                placeholder="Записать задачу..."
                value={noteValue}
                onChange={handleInputChange}
              />
            </form>
            <Btn
              className={styles['add-button']}
              onClick={addNewNote}
              type={'submit'}
            >
              Добавить
            </Btn>
          </div>
          {errorMessage && (
            <p className={styles['error-text']}>{errorMessage}</p>
          )}
          {notes.length ? (
            <ol className={styles['task-list']}>
              {filteredNotes.map(({ id, title }) => (
                <li key={id} className={styles['task-item']}>
                  <div className={styles['task-content']}>
                    {idNoteModified === id ? (
                      <form
                        className={styles['edit-form']}
                        onSubmit={handleEditNote}
                      >
                        <input
                          className={styles['edit-input']}
                          type="text"
                          value={editNoteValue}
                          onBlur={() => setIdTNoteModified(null)}
                          onChange={handleEditChange}
                        />
                      </form>
                    ) : (
                      <span className={styles['task-title']}>{title}</span>
                    )}
                    <div className={styles['buttons-container']}>
                      <Btn
                        className={styles['edit-button']}
                        onClick={() => editNote(id, title)}
                      >
                        Редактировать
                      </Btn>
                      <Btn
                        className={styles['delete-button']}
                        onClick={() => deleteNote(id)}
                      >
                        Удалить
                      </Btn>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p className={styles['empty-list-text']}>
              Добавьте Ваши новые задачи
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default App
