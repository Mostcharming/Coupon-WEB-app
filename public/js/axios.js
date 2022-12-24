const name = document.querySelector('#j_name');
const email = document.querySelector('#j_username');
const password = document.querySelector('#j_password');
const passwordConfirm = document.querySelector('#j_passwordC');
const Submit = document.querySelector('.btn');
const logout = document.querySelector('#logout');

const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/user/login',
      data: {
        email: email.value,
        password: password.value,
      },
    });
    if (res.data.status === 'success') {
      alert('Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 500);
    }
  } catch (err) {
    alert('error', err.response.data.message);
  }
};

const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/user/signup',
      data: {
        name: name.value,
        email: email.value,
        password: password.value,
        passwordConfirm: passwordConfirm.value,
      },
    });
    if (res.data.status === 'success') {
      alert('Signed Up successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 500);
    }
  } catch (err) {
    alert('error', err.response.data.message);
  }
};

const loggout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/user/logout',
    });

    if (res.data.status === 'success') {
      alert('Logged out successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 5);
    }
  } catch (err) {
    console.log(err.response);
    alert('error', 'Error logging out! Try again.');
  }
};

if (name == null) {
  Submit.addEventListener('click', (e) => {
    e.preventDefault();
    login(email, password);
  });
} else {
  Submit.addEventListener('click', (e) => {
    e.preventDefault();
    signup(name, email, password, passwordConfirm);
  });
}

if (logout) logout.addEventListener('click', loggout);
