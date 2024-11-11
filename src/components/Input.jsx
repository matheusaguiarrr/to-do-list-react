export default function Input({label, input}){
    return (
        <div className="flex flex-col w-1/4 mb-6">
            <label htmlFor="" className="text-slate-300 text-4xl mb-3">{label}</label>
            {input}
        </div>
    )
}