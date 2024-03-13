/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === 'success') {
      showAlert(
        'success',
        'Signed Up successful! You will be redirected to login page!',
      );
      window.setTimeout(() => {
        location.assign('/login');
      }, 2000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
