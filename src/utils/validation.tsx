import React from 'react';

const validation = {
  name(name: string) {
    const regex = /[^0-9]\s[^0-9]/gi;
    const regexNumber = /[0-9]|[0-9]/gi;

    const checkString = regex.test(name);
    const checkNumber = regexNumber.test(name);
    return checkString && !checkNumber ? true : false;
  },

  email(email: string) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

}

export default validation;
