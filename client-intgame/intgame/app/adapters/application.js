import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import Ember from 'ember';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:application',
  namespace: 'api',
  host: 'http://localhost:3000',
  registerService: Ember.inject.service()
});
