import { useState } from 'react'

export const useRequestPost = (setIsUpdating) => {
  const [taskValue, setTaskValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (event) => {
    setTaskValue(event.target.value)
    setErrorMessage('')
  }

  const handleAddTask = (event) => {
    event.preventDefault()

    if (!taskValue) {
      setErrorMessage('Невозможно добавить пустую задачу')
      return
    }

    fetch('http://localhost:3000/notes', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        title: taskValue.charAt(0).toUpperCase() + taskValue.slice(1),
        completed: false,
      }),
    })
      .then((rowResponse) => rowResponse.json())
      .finally(() => {
        setTaskValue('')
        setIsUpdating(false)
      })
  }

  const addNewTask = () => {
    if (!taskValue) {
      setErrorMessage('Невозможно добавить пустую задачу')
      return
    }

    fetch('http://localhost:3000/notes', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        title: taskValue.charAt(0).toUpperCase() + taskValue.slice(1),
        completed: false,
      }),
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
    handleAddTask,
    errorMessage,
  }
}



// import { useState } from 'react';
//
// export const useRequestPost = (setIsUpdating) => {
//   const [taskValue, setTaskValue] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//
//   const handleInputChange = (event) => {
//     setTaskValue(event.target.value);
//     setErrorMessage('');
//   };
//
//   const handleAddTask = async (event) => {
//     event.preventDefault();
//
//     if (!taskValue) {
//       setErrorMessage('Невозможно добавить пустую задачу');
//       return;
//     }
//
//     try {
//       const response = await fetch('http://localhost:3000/notes', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json; charset=utf-8' },
//         body: JSON.stringify({
//           title: taskValue.charAt(0).toUpperCase() + taskValue.slice(1),
//           completed: false,
//         }),
//       });
//
//       if (!response.ok) {
//         throw new Error('Ошибка при добавлении задачи');
//       }
//
//       await response.json();
//     } catch (error) {
//       console.error(error);
//       setErrorMessage(error.message);
//     } finally {
//       setTaskValue('');
//       setIsUpdating(true); // Убедитесь, что состояние обновления установлено в true
//     }
//   };
//
//   return {
//     taskValue,
//     handleInputChange,
//     handleAddTask,
//     errorMessage,
//   };
// };