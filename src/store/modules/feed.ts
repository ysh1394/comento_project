import { Module } from 'vuex';
import { RootState } from '@/store/index';

interface FeedModule {
  // data: string;
  count: number;
}

const feed: Module<FeedModule, RootState> = {
  namespaced: true,
  state: {
    // data: 'feedModule',
    count: 0,
  },
  mutations: {
    // setData(state, data: string) {
    //   state.data = data;
    // },
    setCount(state, count: number) {
      state.count = count;
    },
  },
  actions: {
    // setRootData({ commit }, data: string) {
    //   commit('setData', data);
    // },
    increase({ state, commit }) {
      commit('setCount', state.count + 1);
    },
    decrease({ state, commit }) {
      commit('setCount', state.count - 1);
    },
  },
  getters: {
    // data: (state) => state.data,
    count: (state) => state.count,
  },
};

export default feed;
