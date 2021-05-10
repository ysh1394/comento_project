import { Module } from 'vuex';
import { RootState } from '@/store/index';
import { getList, getCategory, getAds, getView } from '@/api/feed';

interface FeedModule {
  isToggleBtn: boolean;
  listData: any[];
  adData: any[];
  categoryList: any;
  page: number;
  adPage: number;
  ord: string;
  limit: number;
  category: any;
  total: number;
  isLoading: boolean;
  isModal: boolean;
  query: string;
  isError: boolean;
  categoryFilter: any;
  detailPageList: any;
  replyData: any;
}

const Feed: Module<FeedModule, RootState> = {
  namespaced: true,
  state: {
    isToggleBtn: true,
    listData: [],
    adData: [],
    categoryList: [],
    page: 1,
    adPage: 1,
    ord: 'asc',
    limit: 10,
    category: '',
    total: 0,
    isLoading: false,
    isModal: false,
    query: '',
    isError: false,
    categoryFilter: '',
    detailPageList: [],
    replyData: [],
  },

  mutations: {
    setToggle(state, isToggleBtn: boolean) {
      state.isToggleBtn = isToggleBtn;
    },
    setListData(state, listData: any[]) {
      state.listData = listData;
    },
    setAdData(state, adData: any[]) {
      state.adData = adData;
    },
    setCategoryList(state, categoryList: any[]) {
      state.categoryList = categoryList;
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
    setLoading(state, isLoading: boolean) {
      state.isLoading = isLoading;
    },
    setIsModal(state, isModal: boolean) {
      state.isModal = isModal;
    },
    setCategory(state, category: string) {
      state.category = category;
    },
    setQuery(state, query: string) {
      state.query = query;
    },
    setError(state, isError: boolean) {
      state.isError = isError;
    },
    setCategoryFilter(state, categoryFilter: any) {
      state.categoryFilter = categoryFilter;
    },
    setDetailPageList(state, detailPageList: any) {
      state.detailPageList = detailPageList;
    },
    setReplyData(state, replyData: any) {
      state.replyData = replyData;
    },
  },

  actions: {
    async getList({ state, commit }): Promise<void> {
      document.body.classList.remove('scrollChange');
      const categoryResult = await getCategory();
      const categoryData = categoryResult.data.category;
      let queryString: string = '';

      for (const i of categoryData) {
        const categoryObj: any = {};
        categoryObj[`&category[${i.name}]`] = i.id;
        const cateArr = Object.entries(categoryObj);
        const mapArr = cateArr.map((e: any) => e.join('=')).join('');
        queryString += mapArr;
      }

      commit('setCategory', queryString);
      commit('setCategoryFilter', state.category);

      const listResult = await getList(
        state.page,
        state.limit,
        state.ord,
        state.category,
      );
      const adResult = await getAds(state.adPage, 1);
      commit('setListData', listResult.data.data);
      commit('setAdData', adResult.data.data);
      commit('setTotal', listResult.data.total);
    },

    checkboxEvent({ state, commit }, e: any) {
      const { innerText, id } = e.target;
      const { categoryFilter } = state;
      const queryStr: string = `&category[${innerText}]=${id}`;

      if (categoryFilter.includes(innerText)) {
        commit('setCategoryFilter', categoryFilter.split(queryStr).join(''));
      } else {
        commit('setCategoryFilter', categoryFilter + queryStr);
      }
    },

    async filterEvent({ state, commit }, e: any) {
      const { category, categoryFilter, page, limit, ord } = state;
      commit('setCategoryFilter', categoryFilter);

      if (categoryFilter.length <= 0) {
        commit('setError', true);
        setTimeout(() => {
          commit('setError', false);
        }, 2000);
        return;
      }

      const filterResult = await getList(page, limit, ord, categoryFilter);
      commit('setLoading', false);
      setTimeout(() => {
        commit('setListData', filterResult.data.data);
        commit('setIsModal', !state.isModal);
        document.body.classList.remove('scrollChange');
      }, 2000);
      commit('setLoading', true);
      commit('setCategoryFilter', category);
    },

    modalEvent({ state, commit }, e: any) {
      commit('setLoading', false);
      if (e.target === e.currentTarget) {
        commit('setIsModal', !state.isModal);
        if (state.isModal) {
          document.body.classList.add('scrollChange');
        } else {
          document.body.classList.remove('scrollChange');
          commit('setCategoryFilter', state.category);
        }
      }
    },

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

    async getCategory({ commit }): Promise<void> {
      const result = await getCategory();
      commit('setCategoryList', result.data.category);
    },

    async changeSort({ commit, dispatch }): Promise<void> {
      commit('setSort', 'desc');
      await dispatch('getList');
    },

    // Y축 스크롤을 계산하여 무한스크롤
    // infinityScroll({ state, commit, dispatch }) {
    //   const totalLimit: number = Math.ceil(state.total / 10) * 10;
    //   const nowScrollData: number = window.scrollY + window.innerHeight;
    //   const documentHeight: number = document.body.offsetHeight;
    //   if (nowScrollData >= documentHeight && state.limit <= totalLimit) {
    //     commit('setLoading', true);
    //     setTimeout(() => {
    //       commit('setLimit', state.limit + 10);
    //       // if (state.category === state.categoryFilter) {
    //       dispatch('getList');
    //       // } else {
    //       // dispatch('filterEvent');
    //       // }
    //     }, 2000);
    //   }
    //   if (state.limit >= totalLimit) {
    //     commit('setLoading', false);
    //   }
    //   console.log(nowScrollData);
    // },

    infinityScroll({ state, commit, dispatch }, e: any) {
      const {
        scrollHeight,
        scrollTop,
        clientHeight,
      } = e.target.scrollingElement;

      if (scrollTop + clientHeight === scrollHeight) {
        commit('setLoading', true);
        setTimeout(() => {
          commit('setLimit', state.limit + 10);
          dispatch('getList');
        }, 2000);
      }

      const totalLimit: number = Math.ceil(state.total / 10) * 10;

      if (state.limit >= totalLimit) {
        commit('setLoading', false);
      }
    },

    async getView({ commit }, id: number) {
      document.body.classList.remove('scrollChange');
      const detailResult = await getView(id);
      console.log('id >>>', id);

      commit('setDetailPageList', detailResult.data);
      commit('setReplyData', detailResult.data.data.reply);
    },
  },
  getters: {
    listData: (state) => state.listData,
    adData: (state) => state.adData,
  },
};

export default Feed;
