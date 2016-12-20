import Ember from 'ember';
import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  namespace: 'api/v1',

  pathForType: function(type) {
    let underscored = Ember.String.underscore(type);

    return Ember.String.pluralize(underscored);
  }
});
