import {useState} from "react";

export const useRequestPost = (setIsUpdating) => {
    const [taskValue, setTaskValue] = useState('')

    const handleInputChange = (event) => {
        setTaskValue(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        fetch('http://localhost:3000/tasks', {
            method: 'POST',
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
    }

    const addNewTask = () => {
        fetch('http://localhost:3000/tasks', {
            method: 'POST',
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
    }

    return {
        addNewTask,
        taskValue,
        handleInputChange,
        handleSubmit
    }
}