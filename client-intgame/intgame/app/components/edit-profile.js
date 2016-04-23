import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    edit() {
      const {
        'profile.password': password,
        'profile.name' : name,
        'profile.surname' : surname} = this.getProperties('profile.password', 'profile.name', 'profile.surname');
      this.sendAction('editProfile', {password: password, name: name, surname: surname});
    }
  }

});
