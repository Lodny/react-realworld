import * as actions from '../actions/feedAction';

export const feedReducer = (feeds, { type, payload }) => {
  console.log('feedReducer() : ', type);

  switch (type) {
    case actions.SET_FEEDS:
      return payload;

    // case 'ADD_TODO':
    //   return [...todos, { title: payload, id: todos.length, status: 'todo' }];

    // case 'CHANGE_TODO_STATUS':
    //   return todos.map((todo) => {
    //     if (todo.id === +payload) {
    //       if (todo.status === 'done') todo.status = 'todo';
    //       else todo.status = 'done';
    //     }
    //     return todo;
    //   });

    default:
      break;
  }
};
