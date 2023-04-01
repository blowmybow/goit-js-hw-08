import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input[name="email"]'),
  message: document.querySelector('textarea[name="message"]'),
};

let dataForm = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
reloadSavedPage();

refs.form.addEventListener(
  'input',
  throttle(e => {
    const onSavedFormValue = {
      email: refs.email.value,
      message: refs.message.value,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(onSavedFormValue));
  }, 500)
);

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  console.log({ email: refs.email.value, message: refs.message.value });
  if (refs.email.value === '' || refs.message.value === '') {
    return alert('Всі поля повинні бути заповнені!');
  }
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
});

function reloadSavedPage() {
  if (dataForm) {
    refs.email.value = dataForm.email || '';
    refs.message.value = dataForm.message || '';
  }
}

// трішки по іншому переписав рішення задачі
// const form = document.querySelector('.feedback-form');

// form.addEventListener('input', throttle(onFormInput, 500));
// form.addEventListener('submit', onFormSubmit);

// let dataForm = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
// const { email, message } = form.elements;
// reloadSavedPage();

// function onFormInput() {
//   const onSavedFormValue = {
//     email: email.value,
//     message: message.value,
//   };
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(onSavedFormValue));
// }
// function onFormSubmit(e) {
//   e.preventDefault();

//   console.log({ email: email.value, message: message.value });

//   if (email.value === '' || message.value === '') {
//     return alert('Всі поля повинні бути заповнені!');
//   }

//   e.currentTarget.reset();
//   localStorage.removeItem(STORAGE_KEY);
// }
// function reloadSavedPage() {
//   if (dataForm) {
//     email.value = dataForm.email || '';
//     message.value = dataForm.message || '';
//   }
// }
