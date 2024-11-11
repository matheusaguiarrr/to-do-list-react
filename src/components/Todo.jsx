import { Pencil, Trash2, X } from "lucide-react";

export default function Todo({todoKey, title, description, steps, editFunction, deleteFunction, stepInput, deleteStepTodo}){
    return (
        <div className="bg-slate-300 text-blue-900 w-1/4 my-6 p-4">
            <h1 className="text-3xl font-semibold my-4">{title}</h1>
            <p className="text-lg">{description}</p>
            <div className="my-4">
                {stepInput}
                <button onClick={() => editFunction(todoKey)} title="Editar Tarefa" className="mr-4">
                    <Pencil />
                </button>
                <button onClick={() => deleteFunction(todoKey)} title="Deletar Tarefa" className="mr-4">
                    <Trash2 />
                </button>
            </div>
            {
                steps && steps.length > 0 && (
                    <>
                        <h3 className="text-3xl font-semibold my-4">Etapas:</h3>
                        <ol>
                        {steps.map((step, index) => (
                            <li key={index} className="flex justify-between">
                                <span className="text-xl">{step}</span>
                                <button onClick={() => deleteStepTodo(todoKey, step)} title="Deletar"><X color="#ef4444" /></button>
                            </li>
                        ))}
                        </ol>
                    </>
                )
            }
        </div>
    )
}