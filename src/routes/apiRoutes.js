import express from 'express';
import { useUSPopulation } from '../hooks/us-population.js';

const router = express.Router();

router.get('/usdata', (req, res) => {
  const params = {
    drilldowns: 'Nation',
    measures: 'Population',
  };
  useUSPopulation
    .dataUsa({ params })
    .then((resUSData) => {
      res.send(resUSData.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

export default router;
