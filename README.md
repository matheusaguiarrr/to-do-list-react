# Gerenciador de Tarefas com Etapas  

![image](https://github.com/user-attachments/assets/8ef582e1-7011-47ad-b9d2-d016a155e4ae)

## Sobre o Projeto  

Este é um gerenciador de tarefas desenvolvido com React, que permite criar, editar e organizar tarefas, além de gerenciar etapas para cada uma delas. O projeto utiliza Context API para gerenciar o estado global e localStorage para persistência de dados.  

### Funcionalidades  
- **Adicionar Tarefas**: Insira título e descrição obrigatórios para cada tarefa.  
- **Editar Tarefas**: Atualize os dados de uma tarefa existente.  
- **Excluir Tarefas**: Remova tarefas de maneira simples.  
- **Adicionar Etapas**: Organize tarefas em etapas específicas.  
- **Persistência de Dados**: As tarefas são armazenadas no `localStorage` e persistem entre sessões.  
- **Feedback Visual**: Mensagens de erro caso os campos obrigatórios não sejam preenchidos.  

## Tecnologias Utilizadas  
- **React**: Biblioteca principal para construção da interface.  
- **Context API**: Para gerenciamento de estado global.  
- **TailwindCSS**: Para estilização rápida e responsiva.  
- **Lucide-React**: Conjunto de ícones modernos e personalizáveis.  

## Estrutura do Projeto  
```plaintext
├── src
│   ├── components          # Componentes reutilizáveis
│   │   ├── Header.jsx      
│   │   ├── Input.jsx       
│   │   ├── InputStep.jsx   
│   │   └── Todo.jsx        
│   ├── context             # Context API
│   │   └── TodoContext.jsx 
│   ├── App.jsx             # Componente principal
│   └── main.jsx           # Ponto de entrada da aplicação
└── public
