// function called when submit login button pressed
function checkLogin () {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  if (username === 'admin@example.com' && password === 'admin') {
    alert('You have succesfully logged in!')
  } else {
    alert('Incorrect username/password!')
  }
}