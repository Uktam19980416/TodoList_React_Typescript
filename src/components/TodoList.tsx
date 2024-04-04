import React from 'react'
import { useState } from 'react'

const TodoList2: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([])
  const [input, setInput] = useState<string>('')
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editIndex, setEditIndex] = useState<number>(-1)

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (input) {
      setTasks([...tasks, input])
      setInput('')
    }
  }

  const deleteTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index)
    setTasks(newTasks)
  }

  const editTask = (index: number) => {
    setInput(tasks[index])
    setIsEditing(true)
    setEditIndex(index)
  }

  const updateTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (input) {
      const newTasks = tasks.map((task, i) => (i === editIndex ? input : task))
      setTasks(newTasks)
      setInput('')
      setIsEditing(false)
      setEditIndex(-1)
    }
  }

  const deleteAll = () => {
    setTasks([])
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white w-1/3 rounded-xl">
        <header className="bg-white py-1 mx-5">
          <h1 className="text-indigo-500 text-xl">My Tasks</h1>
          <hr className="h-[2px] bg-slate-600" />
        </header>
        <form
          className="flex justify-between items-center px-5 gap-2"
          onSubmit={isEditing ? updateTask : addTask}
        >
          <input
            type="text"
            className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Add Item"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="bg-indigo-500 text-white rounded-full p-2 block"
            type="submit"
          >
            {isEditing ? 'Update' : 'Add'}
          </button>
        </form>
        <div className="">
          <ul className="list-none">
            {tasks.map((task, index) => (
              <li key={index}>
                <div className="flex justify-between items-center px-5 py-2">
                  <span>{task}</span>
                  <div className="flex gap-5">
                    <button
                      className="text-indigo-500"
                      onClick={() => editTask(index)}
                    >
                      🖊️
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => deleteTask(index)}
                    >
                      💣
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {tasks.length === 0 && (
            <div className="text-center text-gray-500 py-2">No tasks</div>
          )}
          {isEditing && (
            <div className="text-center text-gray-500 py-2">Editing task</div>
          )}
          {tasks.length > 0 && (
            <div className="text-center text-gray-500 py-2">
              {tasks.length} task{tasks.length > 1 && 's'}
            </div>
          )}
          {tasks.length > 1 && (
            <div className="text-center text-white py-2">
              <button
                className="bg-[red] px-3 py-1 rounded-full hover:-translate-y-1"
                onClick={deleteAll}
              >
                Delete All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TodoList2
