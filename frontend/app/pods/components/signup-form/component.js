import Ember from 'ember';

export default Ember.Component.extend({
  agent: false,

  actions: {
    signup() {
      let { email, password } = this.getProperties('email', 'password');
      var _this = this;
      var role = 'customer';

      if (this.get('agent')) {
        role = 'agent'
      }

      Ember.$.ajax({
        url: '/api/v1/users',
        type: 'POST',
        data: { user: { email: email, password: password, role: role } }
      }).then(function(user) {
        _this.get('store').pushPayload(user);
        _this.get('session').authenticate('authenticator:oauth2', email, password);
        _this.get('router').transitionTo('protected.dashboard');
      }, (function(error) {
        if (error.responseJSON.status == 500) {
          _this.set('errorMessage', 'Already Exists')
        } else {
          _this.set('errorMessage', a.responseText)
        }
      }));
    }
  }
});
