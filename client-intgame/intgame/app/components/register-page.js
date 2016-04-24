import Ember from 'ember';

export default Ember.Component.extend({
  registerService: Ember.inject.service('register-service'),

  actions: {
    register() {
      const {login, password} = this.getProperties('login', 'password');
      this.get('registerService').register(login, password)
        .then(() => {
          this.set('errorMessage', null);
        },
          (err) => {
          this.set('errorMessage', 'not unique login');
        });
    }
  }
});
