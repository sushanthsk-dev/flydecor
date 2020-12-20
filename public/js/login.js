/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alert';
export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/admin/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully');
      window.setTimeout(() => {
        location.assign('/response');
      }, 1500);
    }
  } catch (e) {
    showAlert('error', e.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/admin/logout',
    });
    if (res.data.status === 'success') location.assign('/admin');
  } catch (err) {
    showAlert('error', 'Error logging out! Try again..');
  }
};
