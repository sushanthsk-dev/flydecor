/* eslint-disable */
import '@babel/polyfill';
import { login } from './login';
import { logout } from './login';
import { contactResponse } from './contact';
import { validate } from './validateForm';
// import axios from 'axios';
const loginForm = document.querySelector('.form-data');
const logoutBtn = document.querySelector('.nav-logout');
const contactForm = document.querySelector('.sendMessage');
console.log('HEllo1');
console.log(loginForm);
if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    console.log('Hello');
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}
if (contactForm) {
  contactForm.addEventListener('click', (e) => {
    validate(e);
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    // if(bool == false) {
    //     e.target.textContent = 'Sending...';
    //     contactResponse(name,email,subject,message,e);

    // }
    const sendMessage = document.querySelector('.sendMessage');
    console.log(sendMessage.classList);
    if (sendMessage.classList[3] == 'send-response') {
      // e.target.textContent = 'Sending...';
      contactResponse(name, email, subject, message);
    }
  });
}
