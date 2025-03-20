import {useEffect, useState} from "react";

export const useRequestGet = ({isUpdating, setIsUpdating}) => {
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        setIsUpdating(true)

        fetch('http://localhost:3000/tasks')
            .then((loadedData) => loadedData.json())
            .then((taskData) => setTasks(taskData))

            .finally(() => {
                setIsLoading(false)
            })
    }, [isUpdating])

    return {
        isLoading,
        tasks
    }
}