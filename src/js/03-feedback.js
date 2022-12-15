import throttle from 'lodash.throttle';

const FORM_KEY = 'feedback-form-state';

const userForm = document.querySelector('.feedback-form');
let userDataObj;

userForm.addEventListener('submit', handlerSubmitForm);
userForm.addEventListener('input', throttle(handlerInputForm, 500));
handlerUpdateForm();

function handlerInputForm(event) {
  userDataObj = localStorage.getItem(FORM_KEY);
  userDataObj = JSON.parse(userDataObj) || {};
  userDataObj[event.target.name] = event.target.value;
  localStorage.setItem(FORM_KEY, JSON.stringify(userDataObj));
}

function handlerSubmitForm(event) {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;

  if (!email.value || !message.value) {
    alert('Все поля должны быть заполнены!');
    event.currentTarget.reset();
    return;
  } else {
    userDataObj = JSON.parse(localStorage.getItem(FORM_KEY));
    console.log(userDataObj);
    localStorage.removeItem(FORM_KEY);
    event.currentTarget.reset();
  }
}

function handlerUpdateForm() {
  let savedUserData = localStorage.getItem(FORM_KEY);
  if (savedUserData) {
    savedUserData = JSON.parse(savedUserData);
    // Object.entries(savedUserData).forEach(([key, data]) => {
    //   userForm.elements[key].value = data;
    // });
    userForm.elements.email = savedUserData.email.value || '';
    userForm.elements.message = savedUserData.message.value || '';
    console.log(savedUserData);
  }
}

// Выполняй это задание в файлах 03-feedback.html и 03-feedback.js. Разбей его на несколько подзадач:

// Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, в которых сохраняй текущие значения полей формы. Пусть ключом для хранилища будет строка "feedback-form-state".
// При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. В противном случае поля должны быть пустыми.
// При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.
// Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. Для этого добавь в проект и используй библиотеку lodash.throttle.
