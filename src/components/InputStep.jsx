import { useContext } from "react"
import { TodoContext } from "../context/TodoContext"

export default function InputStep({ todoKey }){
    const { inputStep, addStepTodo } = useContext(TodoContext);
    return (
        <div className="mb-8">
            <input ref={inputStep} className="bg-slate-200 border-2 border-blue-900 text-blue-900 placeholder-blue-900 font-extrabold px-2 py-2 mr-2" type="text" placeholder="Descrição da etapa"/>
            <button onClick={() => addStepTodo(todoKey)} className="bg-blue-900 text-lg font-bold text-slate-300 px-4 py-2 rounded-lg">Adicionar Etapa</button>
        </div>
    )
}