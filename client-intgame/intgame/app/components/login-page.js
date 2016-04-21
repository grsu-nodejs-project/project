import Ember from 'ember';

export default Ember.Component.extend({
  authManager: Ember.inject.service('auth-manager'),

  actions: {
    authenticate() {
      const {login, password} = this.getProperties('login', 'password');
      this.get('authManager').authenticate(login, password)
      .then(() => {
        alert('OK!!!');
      }, (err) => {
        alert(`Errors: ${err.responseText}`);
      });
    }
  }
});
