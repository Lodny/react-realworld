import * as React from 'react';

const Errors = ({ errors }) => {
  // console.log('Error() : errors : ', errors);

  const errMsg = [];
  if (errors) {
    // console.log('>>> : ', error);
    Object.keys(errors).forEach((key) => errors[key].forEach((msg) => errMsg.push(key + ': ' + msg)));
  }

  return <ul className='error-messages'>{errors ? errMsg.map((msg) => <li key={msg}>{msg}</li>) : ''}</ul>;
};

export default Errors;
