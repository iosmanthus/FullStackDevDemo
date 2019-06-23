import {message} from 'antd';

const axios = require('axios');

export default {
  namespace: 'edit',
  state: {
    data: [],
    counter: 0,
  },
  effects: {
    * syncMovieList({payload}, {call, put}) {
      try {
        const {data} = yield call(axios.post, '/api/insert', payload);
        if (data.status !== 200) {
          throw data.msg;
        }
        yield put({type: 'updateMovieList', payload: payload});
      } catch (err) {
        message.error(`Failed: ${err}`);
      }
    }
  },
  reducers: {
    updateMovieList(state, {payload: newMovie}) {
      // TODO: Send new movie to backend.
      const nextCounter = state.counter + 1;
      const newMovieWithId = {id: nextCounter, ...newMovie};
      const nextData = state.data.concat(newMovieWithId);
      return {
        data: nextData,
        counter: nextCounter,
      }
    }
  }
};
