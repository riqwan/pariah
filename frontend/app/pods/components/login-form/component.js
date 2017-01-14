import Ember from 'ember';

export default Ember.Component.extend({
  setCurrentUser() {
    let _this = this;

    Ember.$.ajax({
      url: '/api/v1/users/me',
      type: 'GET',
      headers: {
        "Authorization": "Bearer " + this.get('session.data.authenticated.access_token')
      }
    }).then(function(user) {
      _this.get('store').pushPayload(user);
      var user = _this.get('store').peekRecord('user', user.data.id)
      _this.get('currentUser').set('account', user);
      _this.get('router').transitionTo('protected.dashboard');
    });
  },

  actions: {
    authenticate() {
      let { identification, password } = this.getProperties('identification', 'password');
      let _this = this;

      this.get('session').authenticate('authenticator:oauth2', identification, password).then(function (argument) {
        _this.setCurrentUser();
      }).catch((reason) => {
        this.set('errorMessage', 'Unauthorized Access. Please check your credentials.');
      });
    }
  }
});
