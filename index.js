const rootEndpoint = 'https://62dd15f879b9f8c30aa1cb75.mockapi.io/todos';

document.body.style.padding = '32px'

let editId = undefined;
// Util Method For CRUD opertaions
// Create / POST
const createTodo = async (todoObj) => {
  const response = await fetch(
    rootEndpoint,
    {
      method: 'POST',
      body: JSON.stringify(todoObj),
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    }
  );
  return response.json();
};

// Update / PUT
const editTodo = async (newTodoObj) => {
  const response = await fetch(
    `${rootEndpoint}/${newTodoObj['id']}`,
    {
      method: 'PUT',
      body: JSON.stringify(newTodoObj),
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    }
  );
  return response.json();
}

// Delete
const deleteTodo = async (todoId) => {
  const response = await fetch(
    `${rootEndpoint}/${todoId}`,
    {
      method: 'DELETE'
    }
  );
  return response.json();
}


// Form
const formElement = document.createElement('form');

const fields = [
  { type: 'date', name: "dueDate", id: 'dueDate', label: "Due Date"  },
  { type: 'text', name: 'description', id: 'description', label: "Todo Description" },
];

fields.map((obj) => {
  const field = document.createElement('div');
  field.classList.add('mb-3');

  const labelElement = document.createElement('label');
  labelElement.setAttribute('for', obj.id);
  labelElement.classList.add('form-lable');
  labelElement.innerText = obj.label

  field.appendChild(labelElement);

  const inputElement = document.createElement('input');
  inputElement.setAttribute('type', obj.type);
  inputElement.setAttribute('id', obj.id);
  inputElement.setAttribute('name', obj.name);
  inputElement.classList.add('form-control');

  field.appendChild(inputElement);

  formElement.appendChild(field);
})

const btnElement = document.createElement('button');

btnElement.setAttribute('type', 'submit');
btnElement.setAttribute('class', 'btn btn-primary');
btnElement.innerText = "Submit";

formElement.appendChild(btnElement,);

document.body.appendChild(formElement);

// Table
const tableElement = document.createElement('table');
tableElement.setAttribute('class', 'table');
tableElement.style.marginTop = '32px'

const createTableElement = (tagName, content) => {
  const tableElement = document.createElement(tagName);
  tableElement.innerHTML = content;
  return tableElement;
}

const thId = createTableElement('th', 'Id');
const thDesc = createTableElement('th', 'Description');
const thDueDate = createTableElement('th', 'Due Date');
const thActions = createTableElement('th', 'Actions');

const headTrElement = createTableElement('tr', '');
headTrElement.append(thId, thDesc, thDueDate, thActions);

const tHead = createTableElement('thead', '');
tHead.append(headTrElement);

const tBody = createTableElement('tbody', '');

tableElement.append(tHead, tBody);

document.body.append(tableElement);

formElement.addEventListener('submit', async (e) => {

  e.preventDefault();
  const inputs = e.target.elements;
  let data = {};
  for (i = 0; i < inputs.length; i++) {
    if ( inputs[i].nodeName === "INPUT" )
      data[inputs[i].name] = inputs[i].value;
  }

  if (data.dueDate && data.description) {
    if (editId) 
      editTodo({ id: editId, ...data });
    else
      generateRow(await createTodo(data));
  }
});

const generateRow = (todo) => {
  const trElement = createTableElement('tr', '');
  trElement.setAttribute('id', `todo-${todo['id']}`); // id -> todo-1, todo-2
  const tdId = createTableElement('td', todo['id']);
  const tdDueDate = createTableElement('td', todo['dueDate']);
  const tdDescription = createTableElement('td', todo['description']);

  const editBtn = document.createElement('i');
  editBtn.setAttribute('class', 'fa fa-pencil');
  editBtn.setAttribute('aria-hidden', "true");
  editBtn.style.cursor = "pointer";

  const deleteBtn = document.createElement('i');
  deleteBtn.setAttribute('class', 'fa fa-trash-o');
  deleteBtn.setAttribute('aria-hidden', "true");
  deleteBtn.style.cursor = "pointer";
  deleteBtn.style.marginLeft = "8px";

  editBtn.addEventListener('click', async () => {
    document.getElementById('dueDate').value = todo['dueDate'].slice(0, 10);
    document.getElementById('description').value = todo['description'];
    editId = todo['id'];
  });

  deleteBtn.addEventListener('click', async () => {
    await deleteTodo(todo['id']);
    document.getElementById(`todo-${todo['id']}`).remove();
  })

  const tdActions = createTableElement('td', '');

  tdActions.append(editBtn, deleteBtn);

  trElement.append(tdId, tdDescription, tdDueDate, tdActions);

  tBody.appendChild(trElement);
}


const fetchTodos = async () => {
  const response = await fetch(rootEndpoint);
  const responseJson = await response.json();
  responseJson.forEach((todo) => generateRow(todo));
}


fetchTodos();