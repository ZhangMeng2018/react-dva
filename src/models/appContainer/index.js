import NAMESPACE from './namespace'
export default {

  namespace: NAMESPACE,

  state: {
    a: '111111111',
    b: '111111111'
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      const res = yield new Promise((reslove, rejice) => {
        setTimeout(() => {
          reslove(payload)
        }, 3000);
      });
      console.log(res)
      yield put({ type: 'changeAB', payload: res });
    },
  },

  reducers: {
    changeAB(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
