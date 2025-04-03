import {useEffect, useState} from 'react'

export const useRequestGet = (setNotes) => {
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetch('http://localhost:3000/notes')
            .then((loadedData) => loadedData.json())
            .then((taskData) => setNotes(taskData))

            .finally(() => {
                setIsLoading(false)
            })
    }, [setNotes])

    return {
        isLoading
    }
}
