import * as actions from '../actions/userAction';

export const userReducer = (user, { type, payload }) => {
  console.log('userReducer() : ', type);

  switch (type) {
    case actions.LOGIN:
      return { ...user, isLogin: true };

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
