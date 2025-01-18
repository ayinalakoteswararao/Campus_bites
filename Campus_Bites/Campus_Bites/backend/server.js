const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000', // or whatever your frontend URL is
  credentials: true
})); 