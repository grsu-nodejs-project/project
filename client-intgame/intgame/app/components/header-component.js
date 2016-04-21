import Ember from 'ember';

export default Ember.Component.extend({
  authManager: Ember.inject.service('session'),

  actions: {
    login() {
      this.sendAction('onLogin');
      return true;
    },

    logout() {
      this.get('authManager').invalidate();
    }
  }
});
