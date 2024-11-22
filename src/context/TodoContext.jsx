import { useRef, useState, createContext } from "react";
import { ClipboardPlus, RefreshCcw } from "lucide-react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const inputTitle = useRef('');
    const inputDescription = useRef('');
    const inputStep = useRef('');
    const [titleFeedback, setTitleFeedback] = useState('');
    const [descriptionFeedback, setDescriptionFeedback] = useState('');
    const [listTodo, setListTodo] = useState([]);
    const [keyTodo, setKeyTodo] = useState(0);
    const [editTodo, setEditTodo] = useState({});
    const [buttonText, setButtonText] = useState({
        icon: <ClipboardPlus/>,
        text: "Adicionar Tarefa",
    })
    
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
        <TodoContext.Provider value={{ inputTitle, inputDescription, inputStep, descriptionFeedback, titleFeedback, listTodo, setListTodo, setKeyTodo, getTodoValues, getTodoEdit, editTodoList, deleteTodo, addStepTodo, deleteStepTodo, buttonText }}>
            {children}
        </TodoContext.Provider>
    )
}