import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    addGame() {
      this.set('errorMessage', null);
      const {title, link, duration} = this.getProperties('title', 'link', 'duration');
      if (isNaN(duration) || !title || !link || !duration) {
        console.log(title + " " + link + " " + duration);
        this.set('errorMessage', 'incorrect values');
        return;
      }
      this.sendAction('onAddGame', {
        title: title,
        link: link,
        duration: duration
      });
    }
  }
});
