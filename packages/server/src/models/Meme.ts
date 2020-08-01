import mongoose from '@database/mongoose';

/*interface Meme {
  id: string;
  imagem: string;
  username: string;
}*/

const MemeSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
  }, 

  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Meme', MemeSchema);