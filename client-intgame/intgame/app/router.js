import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('profile');
  this.route('games', function() {
    this.route('game', {path: ':game_id'});
    this.route('add-game');
  });
  this.route('login');
  this.route('register');
});

export default Router;
