import {useState} from 'react'

// Редактировние(обновление) заметок
export const useRequestPut = (setNotes) => {
    const [idNoteModified, setIdTNoteModified] = useState(null)
    const [editNoteValue, setEditNoteValue] = useState('')

    // Инициализация редактирования задачи
    const editNote = (id, title) => {
        setIdTNoteModified(id)
        setEditNoteValue(title)
    }

    // Обработка изменения ввода (редактируемой задачи)
    const handleEditChange = (event) => {
        setEditNoteValue(event.target.value)
    }

    // Обработка отправки формы (редактирования задачи)
    const handleEditNote = (event) => {
        event.preventDefault()

        fetch(`http://localhost:3000/notes/${idNoteModified}`, {
            method: 'PUT',
            headers: {'Content-type': 'application/json; charset=utf-8'},
            body: JSON.stringify({
                title: editNoteValue,
                completed: false,
            }),
        })
            .then((rowResponse) => rowResponse.json())
            .then((updatedNote) => {
                setNotes((prevNotes) =>
                    prevNotes.map((note) =>
                        note.id === idNoteModified ? updatedNote : note
                    )
                );
            })

            .finally(() => {
                setIdTNoteModified(null)
                setEditNoteValue('')
            })
    }

    return {
        editNote,
        idNoteModified,
        setIdTNoteModified,
        handleEditChange,
        editNoteValue,
        handleEditNote,
    }
}
