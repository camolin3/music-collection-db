import DS from 'ember-data';

export default DS.Model.extend({
  service: DS.attr('string'),
  url: DS.attr('string'),
  album: DS.belongsTo('album'),
});
