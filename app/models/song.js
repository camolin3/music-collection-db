import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  genres: DS.attr('string'),
  yearOfRelease: DS.attr('number'),
  artists: DS.hasMany('artist', { async: true, dependent: 'destroy' }),
  album: DS.belongsTo('album', { async: true, autoSave: true }),
});
