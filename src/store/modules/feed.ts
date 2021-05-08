import { Module } from 'vuex';
import { RootState } from '@/store/index';
import { getList, getCategory, getAds, getView } from '@/api/feed';

interface FeedModule {
  isToggleBtn: boolean;
  listData: string[];
  adData: string[];
  // category_id: number;
  page: number;
  adPage: number;
  ord: string;
  limit: number;
  // adLimit : number;
  category: number;
  total: number;
  loading: boolean;
}

const Feed: Module<FeedModule, RootState> = {
  namespaced: true,
  state: {
    isToggleBtn: true,
    listData: [],
    adData: [],
    page: 1,
    adPage: 1,
    ord: 'asc',
    limit: 10,
    // adLimit : limit % 4;
    category: 1,
    total: 0,
    loading: false, // 원래 초기값 true
  },
  mutations: {
    setToggle(state, isToggleBtn: boolean) {
      state.isToggleBtn = isToggleBtn;
    },
    setListData(state, listData: string[]) {
      state.listData = listData;
    },
    setAdData(state, adData: string[]) {
      state.adData = adData;
    },
    setSort(state, ord: string) {
      state.ord = ord;
    },
    setTotal(state, total: number) {
      state.total = total;
    },
    setAdpage(state, adPage: number) {
      state.adPage = adPage;
    },
    setLimit(state, limit: number) {
      state.limit = limit;
    },
    setLoading(state, loading: boolean) {
      state.loading = loading;
    },
  },
  actions: {
    filterToggleEvent({ state, commit, dispatch }, e: any) {
      if (e.target.className === 'filterBtnOff') {
        commit('setToggle', !state.isToggleBtn);
        if (state.isToggleBtn) {
          commit('setSort', 'asc');
          dispatch('getList');
        } else {
          commit('setSort', 'desc');
          dispatch('getList');
        }
      }
    },
    async getList({ state, commit }) {
      const listResult = await getList(
        state.page,
        state.limit,
        state.ord,
        state.category,
      );
      const adResult = await getAds(state.adPage, 1);

      commit('setListData', listResult.data.data);
      commit('setAdData', adResult.data.data);
      commit('setAdpage', state.page + 1);
      commit('setTotal', listResult.data.total);
    },

    async changeSort({ commit, dispatch }) {
      commit('setSort', 'desc');
      await dispatch('getList');
    },

    infinityScroll({ state, commit, dispatch }) {
      const totalLimit: number = Math.ceil(state.total / 10) * 10;
      const nowScrollData: number = window.scrollY + window.innerHeight;
      const documentHeight: number = document.body.offsetHeight;

      if (nowScrollData >= documentHeight && state.limit <= totalLimit) {
        commit('setLoading', true);
        setTimeout(() => {
          commit('setLimit', state.limit + 10);

          dispatch('getList');
        }, 2000);
      }
      if (state.limit >= totalLimit) {
        commit('setLoading', false);
      }
    },
  },
  getters: {
    listData: (state) => state.listData,
    adData: (state) => state.adData,
  },
};

export default Feed;

// const state = {
//   isToggleBtn: true,
//   listData: [],
//   page: 1,
//   ord: 'asc',
//   limit: 10,
//   category: 1,
//   id: 0,
//   test: '2019-11-11T06:00:52.000000Z',
// };

// const getters = {
//   listData: (state: { listData: string[] }) => state.listData,
// };

// const mutations = {
//   setToggle(state: { isToggleBtn: boolean }, isToggleBtn: boolean) {
//     state.isToggleBtn = isToggleBtn;
//   },
//   setListData(state: { listData: string[] }, listData: string[]) {
//     state.listData = listData;
//   },
//   setSort(state: { ord: string }, ord: string) {
//     state.ord = ord;
//   },
// };

// const actions = {
//   filterToggleEvent(e: any) {
//     if (e.target.className === 'filterBtnOff') {
//       commit('setToggle', !state.isToggleBtn);
//       if (state.isToggleBtn) {
//         commit('setSort', 'asc');
//         dispatch('getList');
//       } else {
//         commit('setSort', 'desc');
//         dispatch('getList');
//       }
//     }
//   },

//   async getList() {
//     const listResult = await getList(
//       state.page,
//       state.limit,
//       state.ord,
//       state.category,
//     );
//     const adResult = await getAds(state.page, state.limit);
//     const categoryResult = await getCategory();
//     commit('setListData', listResult.data.data);
//     console.log('listResult >>>', listResult.data.data);
//     console.log('adResult >>>', adResult.data.data);
//     console.log('categoryResult >>>', categoryResult.data.category);
//     console.log('함수 안 ListData >>>', state.listData.length);
//     return listResult;
//   },

//   async changeSort() {
//     commit('setSort', 'desc');
//     await dispatch('getList');
//   },
// };

// export default {
//   state,
//   getters,
//   mutations,
//   actions,
// };
// function commit(arg0: string, arg1: any) {
//   throw new Error('Function not implemented.');
// }
// function dispatch(arg0: string, arg1?: any) {
//   throw new Error('Function not implemented.');
// }
