'use strict';

// This class is used for logins
class Login {
  constructor(hash) {
    this.sessions = [];
    this.users = [];
    this.passwords = typeof hash === 'object'? Object.keys(hash).map(k => {
      this.users = this.users.concat([k]);
      return hash[k];
    }) : [];
  }

  logout(user) {
    const index = this.sessions.indexOf(user);
    if(index!==-1)
      this.sessions.splice(index,1);
  }

  // Checks if user exists
  userExists(user) {
    return this.users.indexOf(user)!==-1;
  }

  // Register user
  registerUser(user, password) {
    try{

      if(typeof user !=='string')
        throw "el usuario debe ser texto";

      if(user.trim()==='')
        throw "el usuario no puede ser vac\u00edo";

      if(typeof password !=='string')
        throw "el password debe ser texto";

      if(password.trim()==='')
        throw "el password no puede ser vac\u00edo";

      this.users.push(user);
      this.passwords.push(password);

    }catch(e) {
      console.error("error:",e);
    };
    
  }

  removeUser(user) {
    const index = this.idx(user, this.users);

    this.users.splice(index,1);
    this.passwords.splice(index,1);
  }

  checkPassword(user, password) {
    let index = this.idx(user, this.users);
    let passwordCorrect = this.passwords[index] === password;
    return passwordCorrect;
  }

  updatePassword(user, oldPassword, newPassword) {
    // First we check if the user exists
    const index = this.users.indexOf(user);

    if (index) {
      if (this.checkPassword(user, oldPassword)) {
        this.passwords[index] = newPassword;
        return true;
      }
    }
    return false;
  }

  login(user, password) {

    if(this.checkPassword(user, password)){
      this.sessions.push(user);
    }

  }

  // Gets index of an element in an array
  idx(element, array) {
    return array.indexOf(element);
  }
}

let registeredUsers = {
  user1: 'pass1',
  user2: 'pass2',
  user3: 'pass3'
};

let login = new Login(registeredUsers);

login.registerUser('user4', 'pass4');
login.login('user4', 'pass4');
login.updatePassword('user3', 'pass3', 'pass5');
login.login('user3', 'pass5');
login.logout('user4');