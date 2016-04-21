import Ember from 'ember';

export default Ember.Service.extend({
  register(login, password) {
    return Ember.$.ajax({
      method: "POST",
      url: "http://localhost:3000/register",
      data: {username: login, password: password}
    });
  }
});
