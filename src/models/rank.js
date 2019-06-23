import {message} from 'antd';

const axios = require('axios');

export default {
  namespace: 'rank',
  state: {
    data: [],
  },
  effects: {
    * syncMovieList({payload}, {call, put}) {
      try {
        let endPointUrl = '/api/rank/';
        endPointUrl += payload.rank;
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
      return {
        data: result
      };
    }
  }
};
