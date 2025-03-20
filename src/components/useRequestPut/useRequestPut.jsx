import {useState} from "react";

export const useRequestPut = (setIsUpdating) => {
    const [isEdit, setIsEdit] = useState(false)

    fetch('http://localhost:3000/tasks', {
        method: 'PUT',
        headers: {'Content-type': 'applications/json; charset=utf-8'},
        body: JSON.stringify({
            title: taskValue,
            completed: false
        })
    })
        .then((rowResponse) => rowResponse.json())
        .finally(() => {
            setTaskValue('')
            setIsUpdating(false)
        })
    return {}
}