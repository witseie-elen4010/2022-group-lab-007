// function called when submit button pressed during sign up
function checkRegister () {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  if (username === 'admin@example.com' && password === 'admin') {
    alert('You have succesfully logged in!')
  } else {
    alert('Incorrect username/password!')
  }
}

// contains columns of the AccountTable
class createAccount {
  constructor (id, username, password) {
    this.id = id
    this.username = username
    this.password = password
  }
}

module.exports = createAccount