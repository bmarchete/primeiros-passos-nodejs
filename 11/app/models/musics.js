var mongoose = require('mongoose');

var MusicaSchema = new mongoose.Schema({
  nome:  {
    type: String,
    required: true
  },
  artista: {
    type: String,
    required: true
  },
  estrelas:   {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model('Musica', MusicaSchema);
