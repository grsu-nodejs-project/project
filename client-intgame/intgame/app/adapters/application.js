import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTAdapter.extend({
  authManager: Ember.inject.service('auth-manager'),

  headers: Ember.computed('authManager.accessToken', function() {
    return {
      "Authorization": `Bearer ${this.get("authManager.accessToken")}`
    };
  }),

  namespace: 'api',
  host: 'http://localhost:3000'
});
