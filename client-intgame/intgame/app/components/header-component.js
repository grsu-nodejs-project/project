import Ember from 'ember';

export default Ember.Component.extend({
  authManager: Ember.inject.service('session'),

  actions: {
    login() {
      this.sendAction('onLogin');
    },

    register() {
      this.sendAction('onRegister');
    },

    logout() {
      this.get('authManager').invalidate();
    }
  }
});
