import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  genres: DS.attr('string'),
  yearOfRelease: DS.attr('number'),
  artists: DS.hasMany('artist'),
  album: DS.belongsTo('album'),
});
