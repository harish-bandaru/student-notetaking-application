// Fetch method implementation:
async function fetchData(route = '', data = {}, methodType) {
    const response = await fetch(`http://localhost:3000${route}`, {
      method: methodType, // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    if(response.ok) {
      return await response.json(); // parses JSON response into native JavaScript objects
    } else {
      throw await response.json();
    }
  }

//user constructor, get and set methods for users
function User(fname, lname, userName, password){
    this.fullName = `${fname} ${lname}`;
    this.userName = userName;
    this.password = password;
}
User.prototype.getFullName = function() {
    return this.fullName;
}
User.prototype.getUserName = function(){
    return this.userName;
}
User.prototype.getPassword = function(){
    return this.password;
}

User.prototype.setFullName = function(newFullName){
    this.fullName = newFullName;
}
User.prototype.setUserName = function(newUserName){
    this.userName = newUserName;
}
User.prototype.setPassword = function(newPassword){
    this.password = newPassword;
}

//Note constructor,  get and set methods for note
function Note(note){
    this.noteContent = note;
}
Note.prototype.getNoteContent = function(){
    return this.noteContent;
}

Note.prototype.getNoteContent = function(newNote){
    this.noteContent = newNote;
}


// Login functionality
const login = document.getElementById("loginForm");
if(login) login.addEventListener('submit',loginPageFunction)
function loginPageFunction(e){
    e.preventDefault();
    let uname=document.getElementById('username').value;
    let pword=document.getElementById('password').value;
    const user = new User('', '', uname, pword);
    console.log(user);
    console.log(fetchData("/user/login", user, "POST"));
    fetchData("/user/login", user, "POST")
    .then((data) => {
      setCurrentUser(data);
      window.location.href = "note.html";
    })
    .catch((err) => {
      console.log(`Error!!! ${err.message}`)
    }) 

    document.getElementById("loginForm").reset();
}

//Register functionality
const register = document.getElementById("registerForm");
if(register) register.addEventListener('submit',registerPageFunction)
function registerPageFunction(e){
    e.preventDefault();
    let firstName=document.getElementById('firstname').value;
    let lastName=document.getElementById('lastname').value;
    let userName=document.getElementById('username').value;
    let password=document.getElementById('password').value;

    const user = new User(firstName, lastName, userName, password);
    console.log(user);
    fetchData("/user/register", user, "POST")
    .then((data) => {
      setCurrentUser(data);
      window.location.href = "login.html";
    })
    .catch((err) =>{
      console.log(err);
    })
    document.getElementById("registerForm").reset();
}

//Note Functionality
const note = document.getElementById("noteForm");
if(note) note.addEventListener('submit',notePageFunction)
function notePageFunction(e){
    e.preventDefault();
    let notes = document.getElementById('note').value;

    const note = new Note(notes);
    console.log(note);
    fetchData("/note/edit", note, "POST")
    .then((data) => {
      setCurrentUser(data);
      window.location.href = "note.html";
    })
    .catch((err) =>{
      console.log(err);
    })
    document.getElementById("noteForm").reset();
}

/*
// logout event listener
let logout = document.getElementById("logout-btn");
if(logout) logout.addEventListener('click', removeCurrentUser)

*/


// stateful mechanism for user
// logging in a user
function setCurrentUser(user) {
    console.log("adding ${user} to local storage");
    localStorage.setItem('user', JSON.stringify(user));
    console.log("added")
  }
  
  // getting current user function
  // FIX this next class
  function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
  
  // logout function for current user
  function removeCurrentUser() {
    localStorage.removeItem('user')
  }


/*---------------------------
const usersBtn = document.getElementById("loginForm");
document.getElementById("users-btn").addEventListener('click', getUsers);

function getUsers() {
  //e.preventDefault();
  if(getUsers.innerText === "") {
    fetch('http://localhost:3000/users')
    .then((res) => res.json()) //JSON.parse(res)
    .then((data) => {
        let ul = document.getElementById("allUsers");
        console.log(ul)
        data.forEach((user) => {
            let li = document.createElement('li');
            let text = document.createTextNode(user.userName);
            li.appendChild(text);
            ul.appendChild(li);
            /*let section = `
            <div class="user">
              <h2>${user.uname}</h2>
              <p>${user.pword}</p>
            </div>
          `
          getUsers.innerHTML+=section;
        })

    .catch(err => {
      console.log(err);
    })
    })
}} */