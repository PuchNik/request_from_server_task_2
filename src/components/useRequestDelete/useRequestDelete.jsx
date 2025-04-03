export const useRequestDelete = (notes, setNotes) => {
    const deleteTask = (id) => {
        fetch(`http://localhost:3000/notes/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                setNotes((prevNotes) => prevNotes.filter(note => note.id !== id));
            })

    }
    return {
        deleteTask
    }
}
