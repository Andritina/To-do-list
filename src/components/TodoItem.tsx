import { Trash } from "lucide-react"

type Priority = 'Bas' | 'Moyen' | 'Urgent'

type Todo = {
  id: number,
  text: string,
  priority: Priority
}

type Props = {
    todo : Todo
    onDelete: () => void
    isSelected : boolean
    onToggleSelect : (id : number) => void
}

const TodoItem = ({todo, onDelete, isSelected, onToggleSelect} : Props) => {
  return (
    <li className="p-4">
        <div className="flex justify-between items-center">
            
            <div className="flex items-center gap-2">
                <input 
                    type="checkbox"
                    checked={isSelected}
                    onChange={ () => onToggleSelect(todo.id) }
                    className="checkbox checkbox-primary checkbox-sm" 
                />
                <span className="text-md font-bold">
                    <span className="p-5">{todo.text}</span>
                    <span 
                        className={`badge badge-sm badge-dash
                            ${todo.priority === 'Urgent' ? 'badge-error' 
                                : todo.priority === 'Moyen' ? 'badge-warning' 
                                : 'badge-success'}`}
                    >{todo.priority}</span>
                </span>
            </div>

            <div>
                <button
                    onClick={onDelete}
                    className="btn btn-sm btn-error btn-circle btn-dash"
                >
                    <Trash className="w-4 h-4"/>
                </button>
            </div>

        </div>
    </li>
  )
}

export default TodoItem
