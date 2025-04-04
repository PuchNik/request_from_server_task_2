// Удаление заметок
export const useRequestDelete = (setNotes) => {
    const deleteNote = (id) => {
        fetch(`http://localhost:3000/notes/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                setNotes((prevNotes) => prevNotes.filter(note => note.id !== id));
            })
    }

    return {
        deleteNote
    }
}
