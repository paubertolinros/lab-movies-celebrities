const mongoose = require('mongoose');
const { Schema } = mongoose;

const celebritySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is mandatory. Please add a name']
  },
  occupation: {
    type: String,
    enum: {
      values: ['actor', 'actress', 'musician', 'comediant', 'singer', 'dancer', 'unknown']
    }, 
    required: [true, 'Occupation is mandatory. Please select occupation']
  },
  catchPhrase: {
    type: String,
    required: [true, 'Catch phrase is mandatory. Please add catch phrase']
  }
},
  {
    timestamps: true
  }
)

const Celebrity = mongoose.model('Celebrity', celebritySchema);
module.exports = Celebrity;