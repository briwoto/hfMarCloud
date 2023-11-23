import axios from 'axios';

export const useUSPopulation = {
  dataUsa: (args) =>
    axios({
      method: 'GET',
      baseURL: 'https://datausa.io/api',
      url: `/data`,
      params: args.params,
    }),
};
