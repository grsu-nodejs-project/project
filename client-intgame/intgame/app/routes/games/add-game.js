import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    addGame(param) {
      let record = this.store.createRecord('game', {
        name: param.title,
        questionTime: param.duration,
        link: param.link,
        questions: [],
        id: Math.random()
      });
      record.save()
        .then((result) => {
          this.store.findAll('game', {reload: true});
          record.destroyRecord();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
});
