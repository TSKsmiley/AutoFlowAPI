/// Imports
import express from 'express';
import { dirname } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';




/// Variables
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();



app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../public')));



app.get('/', (req, res, next) => {
  res.render('index');
})


app.listen(3000, () => {
  console.log('listening on port http://localhost:3000');
});