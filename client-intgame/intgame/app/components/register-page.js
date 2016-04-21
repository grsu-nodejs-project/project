import Ember from 'ember';

export default Ember.Component.extend({
  registerService: Ember.inject.service('register-service'),

  actions: {
    register() {
      const {login, password} = this.getProperties('login', 'password');
      console.log(login, password);
      this.get('registerService').register(login, password)
        .then(null, (err) => {
          console.log(err);
        });
    }
  }
});
