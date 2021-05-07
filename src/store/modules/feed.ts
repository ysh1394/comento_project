import { Module } from 'vuex';
import { RootState } from '@/store/index';
import { getList, getCategory, getAds, getView } from '@/api/feed';

interface FeedModule {
  isToggleBtn: boolean;
  listData: string[];
  // category_id: number;
  page: number;
  ord: string;
  limit: number;
  category: number;
  id: number;
  test: string;
  total: number;
}

const Feed: Module<FeedModule, RootState> = {
  namespaced: true,
  state: {
    isToggleBtn: true,
    listData: [],
    page: 1,
    ord: 'asc',
    limit: 10,
    category: 1,
    id: 0,
    test: '2019-11-11T06:00:52.000000Z',
    total: 0,
  },
  mutations: {
    setToggle(state, isToggleBtn: boolean) {
      state.isToggleBtn = isToggleBtn;
    },
    setListData(state, listData: string[]) {
      state.listData = listData;
    },
    setSort(state, ord: string) {
      state.ord = ord;
    },
    setTotal(state, total: number) {
      state.total = total;
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
    // Object.assign(state.params, { page: state.params.page });
    // async getList({ state }) {
    //   // https://problem.comento.kr/api/ads?page=1&limit=10&ord=asc&category_id=2
    //   const result = await getList(state.category);
    //   console.log(result);
    // },

    // async getCategory({ state }) {
    //   const result = await getCategory(state.params);
    //   console.log(result);
    // },

    async getList({ state, commit }) {
      // https://problem.comento.kr/api/ads?page=1&limit=10&ord=asc&category_id=2
      // const result = await getList(2, 10, 'asc', 1);

      const listResult = await getList(
        state.page,
        state.limit,
        state.ord,
        state.category,
      );
      const adResult = await getAds(state.page, state.limit);
      const categoryResult = await getCategory();
      commit('setListData', listResult.data.data);
      commit('setTotal', listResult.data.total);
      // if (state.listData.length % 4 === 0) {
      // }
      console.log('listResult >>>', listResult.data.data);
      console.log('total >>>', state.total);
      console.log('adResult >>>', adResult.data.data);
      console.log('categoryResult >>>', categoryResult.data.category);
      console.log('함수 안 ListData >>>', state.listData.length);
      return listResult;
    },

    async changeSort({ commit, dispatch }) {
      commit('setSort', 'desc');
      await dispatch('getList');
    },
    // async getTest({ state }) {
    //   // https://problem.comento.kr/api/ads?page=1&limit=10&ord=asc&category_id=2
    //   const result = await getTest(state.id);
    //   console.log(result);
    // },
  },
  getters: {
    listData: (state) => state.listData,
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
