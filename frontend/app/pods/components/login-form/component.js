import Ember from 'ember';

export default Ember.Component.extend({
  setCurrentUser() {
    let _this = this;
    let store = this.get('store');
    let currentUser = this.get('currentUser');
    let router = this.get('router');

    Ember.$.ajax({
      url: '/api/v1/users/me',
      type: 'GET',
      headers: {
        "Authorization": "Bearer " + this.get('session.data.authenticated.access_token')
      }
    }).then((user) => {
      store.pushPayload(user);
      currentUser.set('account', store.peekRecord('user', user.data.id));

      router.transitionTo('protected.index');
    });
  },

  actions: {
    authenticate() {
      let { identification, password } = this.getProperties('identification', 'password');
      let _this = this;

      this.get('session').authenticate('authenticator:oauth2', identification, password).then(function (argument) {
        _this.setCurrentUser();
      }).catch((reason) => {
        _this.set('errorMessage', 'Unauthorized Access. Please check your credentials.');
      });
    }
  }
});
