import express from 'express';
import { getUSPopulationData } from '../controllers/appController.js';

const router = express.Router();

router.get('/usdata', (req, res) => {
  const params = {
    drilldowns: req.query.drilldowns || 'Nation',
    measures: req.query.measures || 'Population',
  };
  getUSPopulationData(params).then((populationData) => {
    res.json(populationData);
  });
});

export default router;
