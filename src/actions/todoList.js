export const RECEIVE_TODO_LIST = 'RECEIVE_TODO_LIST';
export const DELETE_TODO = 'DELETE_TODO';
export const ADD_TODO = 'ADD_TODO';


export function recvTodoList(data) {
  return {
    type: RECEIVE_TODO_LIST,
    data
  }
}

export function deleteToDo(data) {
  return{
    type: DELETE_TODO,
    data
  }
}

export function addToDo(data) {
  return {
    type: ADD_TODO,
    data
  }
}