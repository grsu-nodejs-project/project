import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:application',
  namespace: 'api',
  host: 'http://localhost:3000',
  registerService: Ember.inject.service()
});
