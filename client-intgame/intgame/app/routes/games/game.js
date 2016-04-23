import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
  model(params) {
    return this.store.find('game', params.game_id)
  },
  checkAnswer(playerAnswer, correctAnswer) {
    if (playerAnswer == "" || playerAnswer == undefined) return false;
    let length1 = playerAnswer.length;
    let length2 = correctAnswer.length;
    let dp = new Array();
    for(let i = 0; i <= length1; ++i) {
      dp[i] = new Array();
      for(let j = 0; j <= length2; ++j)
        dp[i][j] = 1000000000;
    }
    for(let i = 0; i < length1; ++i) dp[i][0] = i;
    for(let j = 0; j < length2; ++j) dp[0][j] = j;
    for(let i = 1; i <= length1; ++i) {
      for(let j = 1; j <= length2; ++j) {
        if (playerAnswer.charAt(i - 1) === correctAnswer.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1];
        else dp[i][j] = Math.min(dp[i - 1][j], Math.min(dp[i][j - 1], dp[i - 1][j - 1])) + 1;
      }
    }
    let value = dp[length1][length2];
    console.log(value);
    if (value * 3 >= length2) return false;
    return true;
  },

  actions: {
    answer(param) {
      let controller = this.controllerFor('games.game');
      let nextQuestion = controller.get('questionsNumber') + 1;
      let allQuestion = this.currentModel.get('questionsNumber');
      let playerAnswer = param.answer;
      console.log(playerAnswer);
      let correctAnswer = this.currentModel.get('questions')[nextQuestion - 1]['answer'];
      console.log(correctAnswer);
      console.log(this.get('checkAnswer')(playerAnswer, correctAnswer));
      if (nextQuestion == allQuestion) {
        this.transitionTo('profile');
      } else {
        controller.set('questionsNumber', nextQuestion);
      }
      console.log(nextQuestion);
    }
  }
});
