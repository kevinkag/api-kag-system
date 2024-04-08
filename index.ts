import config from './config'
import mongoose from 'mongoose';
import app from './app'

mongoose.connect(config.mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    })
    // Resto del código de inicio del servidor...
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


