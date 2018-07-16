import Route from '@ember/routing/route';
import RSVP from 'rsvp';

const addModel = (id, type, attributes, array) => {
  array.push({ id, type, attributes });
  return array;
};

let artistId = 1;
const ARTISTS = [];
const addArtist = (attributes) => {
  return addModel(artistId++, 'artist', attributes, ARTISTS);
};

addArtist({ name: 'blink-182' });
addArtist({ name: 'Ed Sheeran' });
addArtist({ name: 'Andrea Bocelli' });

let songsId = 1;
const SONGS = [];
const addSong = (attributes) => {
  return addModel(songsId++, 'song', attributes, SONGS);
};

addSong({ name: 'All the Small Things', genres: 'pop punk, power pop', yearOfRelease: 1999 });
addSong({ name: 'Anthem Part Two', genres: 'punk', yearOfRelease: 2001 });
addSong({ name: 'Perfect Symphony', genres: 'pop', yearOfRelease: 2017 });

let albumsId = 1;
const ALBUMS = [];
const addAlbum = (attributes) => {
  return addModel(albumsId++, 'album', attributes, ALBUMS);
};

addAlbum({ name: 'Take Off Your Pants & Jacket', cover: 'https://vignette.wikia.nocookie.net/lyricwiki/images/4/45/Blink-182_-_TakeOffYourPantsAndJacket.jpg/revision/latest/scale-to-width-down/180?cb=20130508032257' });
addAlbum({ name: '÷', cover: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Divide_-_Ed_Sheeran_2017_album_logo.svg/1920px-Divide_-_Ed_Sheeran_2017_album_logo.svg.png' });

let linksId = 1;
const LINKS = [];
const addLink = (attributes) => {
  return addModel(linksId++, 'album-link', attributes, LINKS);
};

addLink({ service: 'Spotify', url: 'https://open.spotify.com/album/3nHpBmW5wJXGeC3ojBkpey' });
addLink({ service: 'Spotify', url: 'https://open.spotify.com/album/3T4tUhGYeRNVUGevb0wThu' });

export default Route.extend({
  model() {
    this.get('store').push({
      data: [
        ...ARTISTS,
        ...SONGS,
        ...ALBUMS,
        ...LINKS,
      ],
    });
    const blink = this.get('store').peekRecord('artist', 1);
    const blinkSong1 = this.get('store').peekRecord('song', 1);
    const blinkSong2 = this.get('store').peekRecord('song', 2);
    blinkSong1.get('artists').pushObject(blink);
    blinkSong2.get('artists').pushObject(blink);
    blinkSong1.save().then(() => blink.save());
    blinkSong2.save().then(() => blink.save());

    const ed = this.get('store').peekRecord('artist', 2);
    const andrea = this.get('store').peekRecord('artist', 3);
    const perfectSong = this.get('store').peekRecord('song', 3);
    perfectSong.get('artists').pushObjects([ed, andrea]);
    perfectSong.save().then(() => RSVP.resolve([ed.save(), andrea.save()]));

    const album1 = this.get('store').peekRecord('album', 1);
    const album2 = this.get('store').peekRecord('album', 2);
    album1.get('songs').pushObjects([blinkSong1, blinkSong2]);
    album2.get('songs').pushObject(perfectSong);
    album1.save().then(() => RSVP.resolve([blinkSong1.save(), blinkSong2.save()]));
    album2.save().then(() => perfectSong.save());

    const link1 = this.get('store').peekRecord('album-link', 1);
    const link2 = this.get('store').peekRecord('album-link', 2);
    album1.get('links').pushObject(link1);
    album2.get('links').pushObject(link2);
    album1.save().then(() => link1.save());
    album2.save().then(() => link2.save());
  },
});
