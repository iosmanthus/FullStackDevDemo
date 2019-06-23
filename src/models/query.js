import {message} from 'antd';

const axios = require('axios');

export default {
  namespace: 'query',
  state: {
    data: [],
  },
  effects: {
    * syncMovieList({payload}, {call, put}) {
      try {
        let endPointUrl = '/api/query?';
        endPointUrl += 'name=' + payload.name;
        const {data} = yield call(axios.get, endPointUrl);
        if (data.status !== 200) {
          throw data.msg;
        }
        yield put({type: 'updateMovieList', payload: data.payload});
      } catch (err) {
        message.error(`Failed: ${err}`);
      }
    }
  },
  reducers: {
    updateMovieList(state, {payload: result}) {
      if (!result.length) {
        message.error('Movie not found');
      }
      return {
        data: result
      };
    }
  }
};
