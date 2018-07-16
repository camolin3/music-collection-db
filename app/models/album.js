import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  cover: DS.attr('string'),
  songs: DS.hasMany('song', { async: true, dependent: 'destroy' }),
  links: DS.hasMany('album-link', { async: true, dependent: 'destroy' }),
});
