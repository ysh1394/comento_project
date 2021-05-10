import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import Feed from '@/store/modules/feed';

Vue.use(Vuex);

export interface RootState {
  data: string;
}
const store: StoreOptions<RootState> = {
  modules: {
    Feed,
  },
  state: {
    data: 'root',
  },
  mutations: {
    setData(state, data: string) {
      state.data = data;
    },
  },
  actions: {
    setRootData({ commit }, data: string) {
      commit('setData', data);
    },
  },
  getters: {
    data: (state) => state.data,
  },
};

export default new Vuex.Store(store);
