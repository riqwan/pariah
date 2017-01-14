import Ember from 'ember';

export default Ember.Route.extend({
  currentUser: Ember.inject.service(),

  beforeModel() {
    this.get('currentUser').invalidate();
    this.transitionTo('login')
  }
});
