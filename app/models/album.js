import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  cover: DS.attr('string'),
  songs: DS.hasMany('song'),
  links: DS.hasMany('album-link'),
});
