import Ember from 'ember';
import CurrentUserLocalStore from 'frontend/stores/current-user-localstore';

const { inject: { service }, RSVP, on } = Ember;

export default Ember.Service.extend(Ember.Evented, {
  currentUserStore: null,
  session: service('session'),
  store: service(),

  _setup: on('init', function(){
    this.currentUserStore = CurrentUserLocalStore.create();

    let self = this;
    /**
     * This event is triggered when the user object changed in
     * another tab / window. In this case, we need to reload to reflect the
     * changes.
     *
     * This callback triggers two events on this service object. They are,
     *
     * 1. currentUserUpdated - When the current user object was updated
     * in another tab/ window.
     * 2. currentUserChanged - When the current user object was entirely
     * changed in another tab / window.
     */

    this.currentUserStore.on('currentUserChanged', function(){
      let userObject = self.currentUserStore.restore(),
          store = self.get('store');

      Object.keys(userObject).forEach(function (key) {
        userObject[Ember.String.underscore(key)] = userObject[key];
      });

      let user = store.push(store.normalize('user', userObject));
      self.trigger('currentUserUpdated');
      if (user.get('id') !== self.get('account.id')) {
        self.trigger('currentUserChanged');
      }
    });
  }),

  loadCurrentUser() {
    return new RSVP.Promise((resolve, reject) => {
      const isAuthenticated = this.get('session.isAuthenticated');

      if (isAuthenticated) {
        return this.get('store').find('user', 'me').then((user) => {
          this.set('account', user);
          this.currentUserStore.persist(user);
          resolve(user);
        }, reject);
      } else {
        resolve();
      }
    });
  },

  pushCurrentUser(response) {
    let store = this.get('store');
    let user = store.push(store.normalize('user', response));
    this.set('account', user);
    this.currentUserStore.persist(user);
  },

  updateCurrentUser(attributes) {
    let store = this.get('store');
    let user = this.get('account'),
      pushData = $.extend({}, user.toJSON(), {id: user.id}, attributes);
    user = store.push(store.normalize('user', $.extend({}, pushData, attributes)));

    this.set('account', user);
    this.currentUserStore.persist(user);
  },

  invalidate() {
    this.currentUserStore.clear();
    this.get('session').invalidate();
  }
});
