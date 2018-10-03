import { RECEIVE_TODO_LIST, DELETE_TODO, ADD_TODO } from '../actions/todoList';

const defaultState = [];

export default todoList = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_TODO_LIST: {
      return action.data
    }
    case ADD_TODO: {
      return [
        ...state,
        action.data
      ];
    }
    case DELETE_TODO: {
      const newList = state.filter(
        (item, i) => `${action.data.id}` !== `${item.id}`
      );
      return newList;
    }
    default:
      return state;
  }
};
