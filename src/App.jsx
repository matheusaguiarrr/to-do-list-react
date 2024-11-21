import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import Todo from "./components/Todo";
import { ClipboardPlus, RefreshCcw } from "lucide-react";
import InputStep from "./components/InputStep";

export default function App() {
  const [listTodo, setListTodo] = useState([]);
  const [keyTodo, setKeyTodo] = useState(0);
  const [editTodo, setEditTodo] = useState({});
  const inputTitle = useRef('');
  const inputDescription = useRef('');
  const inputStep = useRef('');
  const [titleFeedback, setTitleFeedback] = useState('');
  const [descriptionFeedback, setDescriptionFeedback] = useState('');
  const [buttonText, setButtonText] = useState({
    icon: <ClipboardPlus/>,
    text: "Adicionar Tarefa",
  })

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

  function getTodoValues(){
    let title = inputTitle?.current?.value.trim();
    let description = inputDescription?.current?.value.trim();
    if(title == ''){
      setTitleFeedback('Titúlo é obrigatório');
    }
    if(description == ''){
      setDescriptionFeedback('Descrição é obrigatório');
    }
    if(title != '' && description != ''){
      setListTodo((_listTodo) => {
        let todo = {
          key: keyTodo,
          title: title,
          description: description,
        };
        localStorage.setItem(todo.key, JSON.stringify(todo));
        return [...listTodo, todo];
      });
      setKeyTodo(keyTodo + 1);
      inputTitle.current.value = '';
      inputDescription.current.value = '';
      setTitleFeedback('');
      setDescriptionFeedback('');
    }
  }

  function getTodoEdit(key){
    let todo = JSON.parse(localStorage.getItem(key));
    inputTitle.current.value = todo.title;
    inputDescription.current.value = todo.description;
    setButtonText({icon: <RefreshCcw />, text: "Editar Tarefa"})
    setEditTodo(todo);
    document.querySelector('#header').scrollIntoView({ behavior: "instant", block: "start" });
  }

  function editTodoList(){
    let title = inputTitle?.current?.value.trim();
    let description = inputDescription?.current?.value.trim();
    if(title == ''){
      setTitleFeedback('Titúlo é obrigatório');
    }
    if(description == ''){
      setDescriptionFeedback('Descrição é obrigatório');
    }
    if(title != '' && description != ''){
      setListTodo(listTodo.map(todo => {
        if(todo.key == editTodo.key){
          const updatedTodo = { ...todo, title: title, description: description };
          localStorage.setItem(todo.key, JSON.stringify(updatedTodo));
          return updatedTodo;
        }
        return todo;
      }))
      inputTitle.current.value = '';
      inputDescription.current.value = '';
      setTitleFeedback('');
      setDescriptionFeedback('');
      setButtonText({icon: <ClipboardPlus/>, text: "Adicionar Tarefa"});
    }
  }

  function deleteTodo(key){
    localStorage.removeItem(key);
    setListTodo(listTodo.filter(todo => todo.key != key));
  }

  function addStepTodo(key) {
    let step = inputStep?.current?.value.trim();
    if (step !== '') {
      setListTodo(listTodo.map(todo => {
        if (todo.key === key) {
          const updatedSteps = [...(todo.steps || []), step];
          const updatedTodo = { ...todo, steps: updatedSteps };
          localStorage.setItem(todo.key, JSON.stringify(updatedTodo));
          return updatedTodo;
        }
        return todo;
      }));
      inputStep.current.value = '';
    }
  }

  function deleteStepTodo(key, step){
    console.log(key);
    console.log(step);
    setListTodo(listTodo.map(todo => {
      if (todo.key === key) {
        const updatedSteps = todo.steps.filter(stepTodo => stepTodo !== step);
        const updatedTodo = { ...todo, steps: updatedSteps };
        localStorage.setItem(todo.key, JSON.stringify(updatedTodo));
        return updatedTodo;
      }
      return todo;
    }));
  }

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
                editFunction={getTodoEdit}
                deleteFunction={deleteTodo}
                deleteStepTodo={deleteStepTodo}
                stepInput={
                  <InputStep
                    inputRef={inputStep}
                    clickFunction={addStepTodo}
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