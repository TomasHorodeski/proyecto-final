import 'dotenv/config';
import { start } from './index.js';

const PORT = Number(process.env.PORT || 4000);

start()
  .then(app => {
    app.listen(PORT, () => {
      console.log(`API escuchando en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al iniciar API:', err);
    process.exit(1);
  });




