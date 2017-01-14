import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { inject: { service }, on } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),

  model() {
    return this.get('currentUser').loadCurrentUser()
  },

  actions: {
    error: function(error) {
      if (error.errors[0].status == '404') {
        this.transitionTo('protected.dashboard');
      }
    }
  }
});
