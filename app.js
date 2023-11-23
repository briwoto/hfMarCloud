import express from 'express';
import routes from './src/routes/apiRoutes';

const app = express();
const PORT = 3000;
app.use(express.json());

// routes
app.use('/api', routes);

// error handlers
app.use((req, res, next) => {
  res.status(404).send('Route not found');
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Hello! Listening on port ${PORT}`);
});
