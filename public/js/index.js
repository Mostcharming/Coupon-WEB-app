const name = document.querySelector('#j_name');
const email = document.querySelector('#j_username');
const password = document.querySelector('#j_password');
const passwordConfirm = document.querySelector('#j_passwordC');
const Submit = document.querySelector('.btn');

if (name == null) {
  Submit.addEventListener('click', () => {
    fetch('/user/login', {
      method: 'post',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.name) {
          alert('Success');
        } else {
          alert(data);
        }
      });
  });
} else {
  Submit.addEventListener('click', () => {
    fetch('/user/signup', {
      method: 'post',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
        passwordConfirm: passwordConfirm.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.name) {
          alert('Success');
        } else {
          alert(data);
        }
        console.log(data);
      });
  });
}
