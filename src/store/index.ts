import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import feed from '@/store/modules/feed';

Vue.use(Vuex);

export interface RootState {
  data: string;
}
const store: StoreOptions<RootState> = {
  modules: {
    feed,
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
    // data: (state) => state.data,
  },
};

export default new Vuex.Store(store);

// 아래는 모듈 없이 스토어 사용 시,
// interface State {
//   isToggleBtn: boolean;
//   count: number;
// }
// const store: StoreOptions<State> = {
//   state: {
//     isToggleBtn: true,
//     count: 0,
//   },
//   mutations: {
//     setCount(state: State, count: number) {
//       state.count = count;
//     },
//   },
//   actions: {
//     increase({ state, commit }: ActionContext<State, State>) {
//       commit('setCount', state.count + 1);
//     },
//     decrease({ state, commit }: ActionContext<State, State>) {
//       commit('setCount', state.count - 1);
//     },
//   },
//   getters: {
//     count: (state: State) => state.count,
//   },
// };

// export default new Vuex.Store(store);

// 아래는 초기 세팅 시, 잡혀있는 스토어 형태
// export default new Vuex.Store({
//   state: {
//     // public isToggleBtn: boolean = true;
//   },
//   mutations: {},
//   actions: {},
//   modules: {},
// });
