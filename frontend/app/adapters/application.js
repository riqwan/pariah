import Ember from 'ember';
import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  namespace: 'api/v1',
  authorizer: 'authorizer:oauth2',

  pathForType: function(type) {
    let underscored = Ember.String.underscore(type);

    return Ember.String.pluralize(underscored);
  }
});
