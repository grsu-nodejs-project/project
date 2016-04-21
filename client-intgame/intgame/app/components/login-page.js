import Ember from 'ember';

export default Ember.Component.extend({
  authManager: Ember.inject.service('session'),

  actions: {
    authenticate() {
      const {login, password} = this.getProperties('login', 'password');
      this.get('authManager').authenticate('authenticator:oauth2', login, password)
        .catch((err) => {
          this.set('errorMessage', 'incorrect login or password');
        });
    }
  }
});
