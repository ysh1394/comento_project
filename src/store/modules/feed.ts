import { Module } from 'vuex';
import { RootState } from '@/store/index';
import { getList, getCategory } from '@/api/feed';

interface FeedModule {
  isToggleBtn: boolean;
  test: string;
  count: number;
  params: {
    page: number;
    ord: string[];
    limit: number;
    category: string[];
  };
  id: number;
}

const Feed: Module<FeedModule, RootState> = {
  namespaced: true,
  state: {
    isToggleBtn: true,
    test: 'feedModule',
    count: 0,
    params: {
      page: 1,
      ord: [],
      limit: 0,
      category: [],
    },
    id: 0,
  },
  mutations: {
    setToggle(state, isToggleBtn: boolean) {
      state.isToggleBtn = isToggleBtn;
    },
    setCount(state, count: number) {
      state.count = count;
    },
  },
  actions: {
    filterToggleEvent({ state, commit }, e: any) {
      if (e.target.className === 'filterBtnOff') {
        commit('setToggle', !state.isToggleBtn);
      }
    },
    increase({ state, commit }) {
      commit('setCount', state.count + 1);
    },
    decrease({ state, commit }) {
      commit('setCount', state.count - 1);
    },
    // Object.assign(state.params, { page: state.params.page });
    async getList({ state }) {
      const result = await getList(state.params.category);
      console.log(result);
    },

    // async getCategory({ state }) {
    //   const result = await getCategory(state.params);
    //   console.log(result);
    // },
  },
  getters: {
    test: (state) => state.test,
    count: (state) => state.count,
  },
};

export default Feed;
