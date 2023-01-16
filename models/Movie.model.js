const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is mandatory. Please add a title']
  },
  genre: {
    type: String,
    enum: {
      values: ['action', 'comedy', 'drama', 'fantasy', 'horror', 'mystery', 'romance', 'thriller', 'western']
    },
    required: [true, 'Genre is mandatory. Please select genre']
  },
  plot: {
    type: String,
    required: [true, 'Plot is mandatory. Please add a plot']
  },
  cast: {
    type: [Schema.Types.ObjectId],
    ref: 'Celebrity.model'
  }
},
  {
    timestamps: true
  });

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;