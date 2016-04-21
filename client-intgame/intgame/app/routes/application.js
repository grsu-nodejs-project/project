import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  authManager: Ember.inject.service('session'),
  actions: {

    login() {
      this.transitionTo('login');
    },

    error: function (error, transition) {
      // Handle the error here
      if (error && error.status === 401) {
        return this.transitionTo('login');
      }
    }
  }
});
