const toggleBars = document.getElementById('collapsibleNavbar');
const navbarToggler = document.getElementById('navbar-toggler');

toggleBars.addEventListener('click', function () {
  // const toggleClass = document.querySelector('.navbar-collapse');
  toggleBars.classList.remove(toggleBars.classList[2]);
  navbarToggler.classList.add('collapsed');
  // eslint-disable-next-line no-undef
  document
    .getElementById('navbar-toggler')
    .setAttribute('aria-expanded', false);
});
// var bool = false;
// const showError = (errorSpan, text) => {
//   bool = true;
//   errorSpan.textContent = text;
//   errorSpan.classList.remove(errorSpan.classList[1]);
//   errorSpan.classList.add('show-error');
// };
// const hideError = (errorSpan) => {
//   bool = false;
//   errorSpan.classList.remove(errorSpan.classList[1]);
//   errorSpan.classList.add('hide-error');
//   console.log(bool);
// };

// const validateForm = (data, letters, idName, attr) => {
//   const errorSpan = document.querySelector(`.error${attr}`);
//   if (data) {
//     console.log(data.length);

//     if (!data.match(letters)) {
//       let text =
//         idName === 'name'
//           ? 'Please enter alphabet'
//           : 'Please enter a valid email address';
//       showError(errorSpan, text);
//     } else if (data.length < 5) {
//       text = 'Please enter atleast 5 character';
//       showError(errorSpan, text);
//     } else {
//       hideError(errorSpan);
//     }
//   } else {
//     let type;
//     if (idName === 'name') type = 'name';
//     else if (idName === 'email') type = 'email';
//     else if (idName === 'subject') type = 'subject';
//     else type = 'message';
//     errorSpan.textContent = `Please enter ${type}`;
//     errorSpan.classList.remove(errorSpan.classList[1]);
//     errorSpan.classList.add('show-error');
//   }
// };

// document.querySelector('.sendMessage').addEventListener('click', (e) => {
//   let text;
//   const name = document.getElementById('name').value.trim();
//   const email = document.getElementById('email').value.trim();
//   const subject = document.getElementById('subject').value.trim();
//   const messge = document.getElementById('message').value.trim();
//   e.preventDefault();
//   const nameLetter = /^[A-Za-z ]+$/;
//   const subjectLetter = /^[A-Za-z0-9\\,\\.\\; ]+$/;
//   const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//   validateForm(name, nameLetter, 'name', 1);
//   validateForm(email, emailFormat, 'email', 2);
//   validateForm(subject, subjectLetter, 'subject', 3);
//   validateForm(messge, subjectLetter, 'message', 4);
// });
