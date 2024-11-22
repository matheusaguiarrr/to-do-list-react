import Header from "./components/Header";
import Input from "./components/Input";
import Todo from "./components/Todo";
import InputStep from "./components/InputStep";
import { useEffect, useContext } from "react";
import { TodoContext } from "./context/TodoContext";

export default function App() {
  const 
  { 
    listTodo, setListTodo, setKeyTodo, inputTitle, inputDescription, titleFeedback, 
    descriptionFeedback, buttonText, getTodoValues, editTodoList
  } 
  = useContext(TodoContext);

  useEffect(() => {
    const todos = [];
    if(localStorage.length > 0){
    for(let i = 0; i < localStorage.length; i++){
        const todo = JSON.parse(localStorage.getItem(i));
        todos.push(todo);
    }
    setListTodo(todos);
    setKeyTodo(todos.length);
    }
  }, []);

  return (
    <>
      <Header />
      <main className="text-slate-300 flex flex-col items-center">
        <h1 className="text-3xl my-16">
          Crie e organizer suas tarefas
        </h1>
        {<h1 className="text-red-600 w-1/4">{titleFeedback}</h1>}
        <Input
          label="Título"
          input=
          {
            <input ref={inputTitle} type="text" name="title" id="name" 
            className={`text-blue-900 text-xl font-semibold bg-slate-300 h-10 ${titleFeedback ? "border-red" : ""}`} 
            />
          }
        />
        <h1 className="text-red-600 w-1/4">{descriptionFeedback}</h1>
        <Input 
          label="Descrição"
          input=
          {
            <textarea ref={inputDescription} name="description" id="" 
              className="text-blue-900 text-xl font-semibold bg-slate-300 h-40">
            </textarea>
          }
        />
        <button onClick={buttonText.text == "Adicionar Tarefa" ? getTodoValues : editTodoList} title={buttonText.text}
          className="text-blue-900 text-xl font-extrabold bg-slate-300 px-6 py-2 my-4 rounded-md flex items-center gap-2"
        >
          {buttonText.icon}
          {buttonText.text}
        </button>
        {
          listTodo.map((todo) =>
            (
              <Todo
                key={todo.key}
                todoKey={todo.key}
                title={todo.title}
                description={todo.description}
                steps={todo.steps}
                stepInput={
                  <InputStep
                    todoKey={todo.key}
                  />
                }
              />
            )
          )
        }
      </main>
    </>
  )
}