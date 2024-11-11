export default function InputStep({getStepValue, clickFunction, todoKey}){
    return (
        <div className="mb-8">
            <input onChange={getStepValue} className="bg-slate-200 border-2 border-blue-900 text-blue-900 placeholder-blue-900 font-extrabold px-2 py-2 mr-2" type="text" placeholder="Descrição da etapa"/>
            <button onClick={() => clickFunction(todoKey)} className="bg-blue-900 text-lg font-bold text-slate-300 px-4 py-2 rounded-lg">Adicionar Etapa</button>
        </div>
    )
}