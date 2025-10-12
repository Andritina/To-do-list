import { useEffect, useState } from "react"
import TodoItem from "./components/TodoItem"
import { Construction } from "lucide-react"

type Priority = 'Bas' | 'Moyen' | 'Urgent'

type Todo = {
  id: number,
  text: string,
  priority: Priority
}

function App() {

  const [input, setInput] = useState<string>("")

  const [priority, setPriority] = useState<Priority>('Moyen')

  const savedTodos = localStorage.getItem("todos")

  const initialTodos = savedTodos ? JSON.parse(savedTodos) : []

  const [todos, setTodos] = useState<Todo[]>(initialTodos)

  const [filter, setFilter] = useState<Priority | "Tous">("Tous")

  useEffect( () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos]  )

  function addTodo() {
    if (input.trim() === "") {
      return
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      priority: priority
    }

    const newTodos = [newTodo, ...todos]
    setTodos(newTodos)
    setInput("")
    setPriority("Moyen")
    console.log(newTodos)
  }


  let filteredTodos : Todo[] = []

  if (filter === "Tous") {
    filteredTodos = todos
  } else {
    filteredTodos = todos.filter( (todo) => todo.priority === filter)  
  }

  const urgenrCount = todos.filter( (t) => t.priority === "Urgent" ).length
  const moyenCount = todos.filter( (t) => t.priority === "Moyen" ).length
  const basCount = todos.filter( (t) => t.priority === "Bas" ).length
  const totalCount = todos.length

  function deleteTodo(id: number) {
    const newTodos = todos.filter( (todo) => todo.id !== id )
    setTodos(newTodos)
  }

  const [selectedTodos, setSelectedTodos] = useState<Set<number>>(new Set())

  function toggleSelectTodos (id : number) {
    const newSelected = new Set(selectedTodos)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedTodos(newSelected)
  }

  function finishSelected () {
    const newTodos = todos.filter( (todo) => {
      if (selectedTodos.has(todo.id)) {
        return false
      } else {
        return true
      }
    } )

    setTodos(newTodos)
    setSelectedTodos(new Set())
  }

  return (
    <div className="flex justify-center">
      <div className="w-2/3 flex-col gap-4 my-15 bg-base-300 p-5 rounded-lg">
        <div className="flex gap-4">

          <input
            type="text"
            className="input w-full"
            placeholder="Ajouter une tâhce..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <select
            className="select w-full"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="Urgent">Urgent</option>
            <option value="Moyen">Moyen</option>
            <option value="Bas">Bas</option>

          </select>

          <button
            className="btn btn-primary"
            onClick={addTodo}>
            Ajouter
          </button>

        </div>

        <div className="space-y-2 flex-1 h-fit">

          <div className="flex justify-between items-center">

            <div className="flex flex-wrap gap-4 m-4">

            <button
              className = {`btn btn-soft ${filter === "Tous" ? "btn-primary" : ""}`}
              onClick = { () => setFilter("Tous") }
            >
              Tous({totalCount})
            </button>

            <button
              className = {`btn btn-soft ${filter === "Urgent" ? "btn-error" : ""}`}
              onClick = { () => setFilter("Urgent") }
            >
              Urgent({urgenrCount})
            </button>

            <button
              className = {`btn btn-soft ${filter === "Moyen" ? "btn-primary" : ""}`}
              onClick = { () => setFilter("Moyen") }
            >
              Moyen({moyenCount})
            </button>

            <button
              className = {`btn btn-soft ${filter === "Bas" ? "btn-success" : ""}`}
              onClick = { () => setFilter("Bas") }
            >
              Bas({basCount})
            </button>

          </div>


          <button
            className="btn btn-dash btn-info"
            disabled = {selectedTodos.size === 0}
            onClick={finishSelected}
          >
            Finir la tâche({selectedTodos.size})
          </button>
        </div>


          {filteredTodos.length > 0 ? (
            <ul className="divide-y divide-primary/20">
              {filteredTodos.map( (todo) => (
                <li key={todo.id}>
                  <TodoItem 
                    todo = {todo}
                    onDelete = { () => deleteTodo(todo.id)} 
                    isSelected = {selectedTodos.has(todo.id)}
                    onToggleSelect = { () => toggleSelectTodos(todo.id) }
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex justify-center items-center flex-col p-5 h-32">
              <div>
                <Construction 
                  className="w-40 h-40 text-primary"
                  strokeWidth={1}
                />
                <p className="text-sm">Aucune tâche pour ce filtre</p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  )

}

export default App
