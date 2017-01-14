export function initialize(application) {
  application.inject('component', 'currentUser', 'service:currentUser');
  application.inject('controller', 'currentUser', 'service:currentUser');

  // dependencies
  application.inject('component', 'session', 'service:session');
  application.inject('component', 'store', 'service:store');
}

export default {
  name: 'current-user-injector',
  initialize: initialize
};