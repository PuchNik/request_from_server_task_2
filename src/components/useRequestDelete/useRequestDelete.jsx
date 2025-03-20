export const useRequestDelete = (setIsUpdating) => {
    const deleteTask = (id) => {
        fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'DELETE'
        })
            .then((rowResponse) => rowResponse.json())
            .finally(() => {
                setIsUpdating(false)
            })
    }
    return {
        deleteTask
    }
}
