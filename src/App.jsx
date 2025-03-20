import './App.css'
import {useRequestDelete, useRequestGet, useRequestPost, useRequestPut} from './components/index.js'
import {useState} from "react";

function App() {
    const [isUpdating, setIsUpdating] = useState(false)

    const {isLoading, tasks} = useRequestGet({isUpdating, setIsUpdating})
    const {addNewTask, taskValue, handleInputChange, handleSubmit} = useRequestPost(setIsUpdating)
    const {} = useRequestPut(setIsUpdating)
    const {deleteTask} = useRequestDelete(setIsUpdating)

    return (
        <>
            {isLoading ?
                <p>Пожалуйста, подождите, идет загрузка данных...</p> :
                <div>
                    <h1>Список пользователей</h1>
                    <input type="text"
                           placeholder='Поиск задачи...'
                    />
                    <div>
                        <form onSubmit={handleSubmit}>
                            <input type="text"
                                   placeholder='Записать задачу...'
                                   value={taskValue}
                                   onChange={handleInputChange}
                            />
                        </form>
                        <button
                            onClick={addNewTask}
                            type={"submit"}
                        >
                            Добавить
                        </button>
                    </div>
                    <ol>
                        {tasks.map(({id, title}) => (
                            <li key={id}>
                                <div>
                                    {title}
                                    <button>Редактировать</button>
                                    <button
                                        onClick={() => deleteTask(id)}
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            }
        </>
    )
}

export default App