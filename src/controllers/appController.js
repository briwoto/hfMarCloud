import { useUSPopulation } from '../hooks/us-population';

const formatPopulationDataByDrilldown = (drilldowns, rawData) => {
  switch (drilldowns.toLowerCase()) {
    case 'state':
      return rawData.map(({ State, Year, Population }) => ({
        State,
        Year,
        Population,
      }));

    default:
      return rawData.map(({ Year, Population }) => ({
        Year,
        Population,
      }));
  }
};

export const getUSPopulationData = (params) => {
  return new Promise((resolve, reject) => {
    useUSPopulation
      .dataUsa({ params })
      .then((res) => {
        const rawData = res.data.data;
        const requiredData = formatPopulationDataByDrilldown(
          params.drilldowns,
          rawData
        );
        resolve({ data: requiredData });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
