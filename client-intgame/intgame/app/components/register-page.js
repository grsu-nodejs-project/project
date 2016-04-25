import Ember from 'ember';

export default Ember.Component.extend({
  registerService: Ember.inject.service('register-service'),

  actions: {
    register() {
      const {login, password} = this.getProperties('login', 'password');
      if (login === "" || login === undefined || password === "" || password === undefined) {
        this.set('errorMessage', 'login or password is empty');
        return;
      }
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
