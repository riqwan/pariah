import Ember from 'ember';

const { on } = Ember;

export default Ember.Object.extend(Ember.Evented, {
  key: 'frontend:current-user',

  _setup: on('init', function() {
    this._bindToStorageEvents();
  }),

  persist(user) {
    let data = user.toJSON();
    data.id = user.id;

    data = JSON.stringify(data || {});
    try {
      localStorage.setItem(this.key, data);
      this._lastData = this.restore();
    } catch(e) {
      console.log('looks like the browser does not support localstore.');
    }
  },

  restore() {
    let data = localStorage.getItem(this.key);
    return JSON.parse(data) || {};
  },

  clear() {
    try {
      localStorage.removeItem(this.key);
      this._lastData = {};
    } catch(e) {
      console.log('looks like the browser does not support localstore.');
    }
  },

  _bindToStorageEvents() {
    Ember.$(window).bind('storage', () => {
      let data = this.restore();
      this._lastData = data;
      this.trigger('currentUserChanged', data);
    });
  }
});
