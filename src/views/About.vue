<template>
  <article>
    <section v-for="(n, index) in pageOffset" :key="index">
      <img src="https://picsum.photos/400/400?image='+index'" alt="" />
      <p>
        asdasfdsgerbfgrthfgdfghsdfgsdfgsdfgsdfgsdf
        asdasfdsgerbfgrthfgdfghsdfgsdfgsdfgsdfgsdf
        asdasfdsgerbfgrthfgdfghsdfgsdfgsdfgsdfgsdf
        asdasfdsgerbfgrthfgdfghsdfgsdfgsdfgsdfgsdf
        asdasfdsgerbfgrthfgdfghsdfgsdfgsdfgsdfgsdf
        asdasfdsgerbfgrthfgdfghsdfgsdfgsdfgsdfgsdf
        asdasfdsgerbfgrthfgdfghsdfgsdfgsdfgsdfgsdf
      </p>
      <div>{{ n }}</div>
    </section>
    <footer>
      <div ref="infinitescrolltrigger" id="scroll-trigger"></div>
      <div class="circle-loader" v-if="showLoader"></div>
    </footer>
  </article>
</template>

<script>
import { getList } from '@/api/feed';
export default {
  data() {
    return {
      currentPage: 1,
      maxPerpage: 2,
      totalResults: 100,
      showLoader: false,
      listData: [],
      page: 1,
      ord: 'asc',
      limit: 10,
      category: 1,
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.totalResults / this.maxPerPage);
    },
    pageOffset() {
      return this.maxPerpage * this.currentPage;
    },
  },
  methods: {
    scrollTrigger() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (
            entry.intersectionRatio > 0 &&
            this.currentPage < this.pageCount
          ) {
            this.showLoader = true;
            setTimeout(() => {
              this.currentPage += 1;
              this.showLoader = false;
            }, 2000);
          }
        });
      });

      observer.observe(this.$refs.infinitescrolltrigger);
    },

    async list() {
      const listResult = await getList(1, 10, 'asc', 1);
      console.log('listResult >>>>>', listResult.data.data);
      this.listData = listResult.data.data;
      console.log('listData >>>>>', this.listData);
    },
  },
  created() {
    console.log('page >>>>>', this.page);
    console.log('listData >>>>>', this.listData);
    this.list();
  },

  mounted() {
    this.scrollTrigger();
  },
};
</script>

<style lang="scss" scoped>
article {
  margin: 0 auto;
  width: 400px;

  section {
    width: 400px;
    margin-bottom: 20px;
    border-radius: 10px;
    background-color: #efefef;
    color: #04525a;
    overflow: hidden;

    p {
      margin: 0;
      padding: 10px 20px;
    }
  }

  footer {
    position: relative;
    width: 400px;

    #scroll-trigger {
      height: 100px;
    }

    .circle-loader {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 5px solid rgba(0, 255, 255, 0.2);
      border-top: 5px solid #fff;
      animation: animate 1.5s infinite linear;
    }
  }
}

@keyframes animate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
