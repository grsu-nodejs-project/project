import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    console.log('in profile');
    return this.store.findAll('profile')
    .then((result) => {
      return result.get('firstObject');
    })
    .catch((err) => {
      console.log(err);
    });
  },
  actions: {
    edit(params) {
      this.store.findAll('profile')
      .then((result) => {
        let profile = result.get('firstObject');
        profile.set('name', params.name);
        profile.set('surname', params.surname);
        profile.set('password', params.password);
        profile.save();
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }
});
