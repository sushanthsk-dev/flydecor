/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alert';

export const contactResponse = async (name, email, subject, message) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/client/contactForm',
      data: {
        name,
        email,
        subject,
        message,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Response sent successfully..');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (e) {
    showAlert('error', 'Failed to send response.. Please try again!');
  }
};
