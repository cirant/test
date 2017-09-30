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

  // Remover user 
  removeUser(user) {
    const index = this.users.indexOf(user);

    if(index!==-1){
      this.users.splice(index,1);
      this.passwords.splice(index,1);
    }
      
  }

  // Check if an user's password is equal to other one
  checkPassword(user, password) {
    const index = this.users.indexOf(user);
    if(index!==-1)
    return this.passwords[index] === password;
  }

  // Update a user's password if oldPassword correct
  updatePassword(user, oldPassword, newPassword) {
    const index = this.users.indexOf(user);

    if (index!==-1) {
      if (this.checkPassword(user, oldPassword)) {
        this.passwords[index] = newPassword;
        return true;
      }
    }
    return false;
  }

  // Add a user to session
  login(user, password) {

    if(this.checkPassword(user, password)){
      this.sessions.push(user);
    }

  }

}

let registeredUsers = {
  user1: 'pass1',
  user2: 'pass2',
  user3: 'pass3'
};

const login = new Login(registeredUsers);

login.registerUser('user4', 'pass4');
login.login('user4', 'pass4');
login.updatePassword('user3', 'pass3', 'pass5');
login.login('user3', 'pass5');
login.removeUser('user45');
login.logout('user3');