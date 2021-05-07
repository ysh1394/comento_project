<template>
  <main id="feedPage">
    <section class="mainSection">
      <aside class="sideBar">
        <button type="button" class="loginBtn">로그인</button>
      </aside>
      <section class="listSection">
        <section class="filterSection">
          <ul>
            <li
              @click="filterToggleEvent"
              :class="isToggleBtn ? 'filterBtnOn' : 'filterBtnOff'"
            >
              <div class="circleIcon" />
              오름차순
            </li>
            <li
              @click="filterToggleEvent"
              :class="isToggleBtn ? 'filterBtnOff' : 'filterBtnOn'"
            >
              <div class="circleIcon" />
              내림차순
            </li>
          </ul>
          <button type="button">필터</button>
        </section>
        <div>
          <article
            class="articleSection"
            v-for="(list, idx) in listData"
            :key="list.id"
            ref="test"
          >
            <!-- v-on="scroll:scrollFunction" -->
            <!-- <template v-if="(idx + 1) % 4 !== 0"> -->
            <div class="categoryPart">
              <div>length : {{ idx + 1 }}</div>
              <div>el : {{}}</div>
              <p>categoy_id : {{ list.category_id }}</p>
              <p>id : {{ list.id }}</p>
            </div>
            <div class="authorPart">
              <p>user_id : {{ list.user_id }}</p>
              <p>
                created_at :
                {{ list.created_at.slice(0, list.created_at.indexOf('T')) }}
              </p>
            </div>
            <h1>
              {{
                list.title.length > 25
                  ? `${list.title.slice(0, 25)}...`
                  : list.title
              }}
            </h1>
            <h2>
              {{
                list.contents.length > 25
                  ? `${list.contents.slice(0, 25)}...`
                  : list.contents
              }}
            </h2>
            <!-- </template> -->
          </article>
          <!-- <article class="adSection">
          <p>sponsored</p>
          <div>
            <img src="@/assets/images/style1.png" alt="sample" />
            <div>
              <h1>
                Title Title Title Title Title Title Title Title Title Title
                Title Title Title Title Title Title Title Title Title Title
                Title Title
              </h1>
              <h2>
                contents contents contents contents contents contents contents
                contents contents contents contents contents contents contents
                contents contents contents contents contents contents contents
                contents contents contents contents contents contents contents
                contents contents contents contents contents contents contents
                contents contents contents contents contents contents contents
              </h2>
            </div>
          </div>
        </article> -->
        </div>
      </section>

      <template id="container"></template>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import Vue from 'vue';
import { namespace } from 'vuex-class';
import { mapState, mapGetters, mapActions } from 'vuex';

const FeedModule = namespace('Feed');

// export default Vue.extend({
//   data() {
//     return {};
//   },
//   computed: {
//     ...mapState('feed', ['isToggleBtn']),
//     ...mapGetters('feed', ['listData']),
//   },

//   methods: {
//     ...mapActions('feed', ['filterToggleEvent', 'getList', 'changeSort']),
//   },
//   created() {
//     this.getList();
//     console.log('listData >>>', this.listData);
//   },
// });

@Component({
  computed: {},
})
export default class Feed extends Vue {
  // [x: string]: any;

  @FeedModule.State('isToggleBtn')
  public readonly 'isToggleBtn': boolean;

  // @FeedModule.State('listData')
  // public readonly 'listData': object;

  @FeedModule.Getter('listData')
  public readonly 'listData': string[];

  @FeedModule.Action('filterToggleEvent')
  public readonly 'filterToggleEvent': any;
  @FeedModule.Action('getList')
  public readonly 'getList': any;
  @FeedModule.Action('changeSort')
  public readonly 'changeSort': any;

  // public getList<T>(url = `${BaseURL}/api/list`): Promise<T> {
  //   return fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //     },
  //     // params: {
  //     //   page: int,
  //     //   ord: string(asc, desc),
  //     //   category: array(category_id),
  //     //   limit: int(perPage),
  //     // },
  //   }).then((res) => {
  //     console.log(res);
  //     return res.json();
  //   });
  // }
  public aaa(e: any) {
    console.log('e >>>', e);
    console.log('sd');
    console.log('sd');

    // if (this.$el.scrollTop)
  }

  public handleNotificationListScroll(e: any) {
    const { scrollHeight, scrollTop, clientHeight } = e.target;
    const isAtTheBottom = scrollHeight === scrollTop + clientHeight;
    // 일정 한도 밑으로 내려오면 함수 실행
    // if (isAtTheBottom) this.handleLoadMore();
    console.log('isAtTheBottom >>.', isAtTheBottom);
    console.log('scrollHeight >>.', scrollHeight);
    console.log('scrollTop >>.', scrollTop);
    console.log('clientHeight >>.', clientHeight);
  }

  // 내려오면 api 호출하여 아래에 더 추가, total값 최대이면 호출 안함
  //  public handleLoadMore() {
  //     if (this.listData.length < this.total) {
  //       const params = {
  //         limit: this.params.limit,
  //         page: this.params.page + 1
  //       };
  //       this.$store.commit(
  //         "notification/SET_PARAMS",
  //         this.filterValue ? { ...params, type: this.filterValue } : params
  //       );
  //       this.dispatchGetNotifications(false);
  //     }
  //   },

  public handleScroll(event: any) {
    // Any code to be executed when the window is scrolled
    // console.log('event >>>', event.srcElement.scrollingElement.scrollHeight);
    // console.log('event >>>', event.target.ownerDocument.defaultView.scrollY);
    if (window.scrollY !== window.pageYOffset) {
      console.log('event >>>', event.target);
      console.log('window >>>', window.scrollY);
      console.log('window >>>', window.pageYOffset);
      console.log('this.$el.scrollTop >>>', this.$el.scrollTop);
      console.log('this.$el.scrollHeight >>>', this.$el.scrollHeight);
      console.log('this.$el >>>', this.$el);
    }
    // console.log('document >>>', window.document.scrollingElement.scrollHeight);
    return window.scrollY;
  }

  public created() {
    this.getList();
    window.addEventListener('scroll', this.handleScroll);

    // console.log('listData >>>', this.listData);
    // console.log('this.$refs >>>', this.$refs);
    // console.log('window.scroll >>>', window);
  }
  public destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
    console.log('디스트로이드 this.$el.scrollTop >>>', this.$el.scrollTop);
  }
  public mounted() {
    // window.addEventListener('scroll', function(e: any) {
    //   if (e.pageY > window.innerHeight * 0.05) {
    //     console.log('over 5%'); //use your function here
    //   }
    // });
    // console.log('this.$el.scrollHeight >>>', this.$el.scrollHeight);
    // console.log('this.$el.scrollTop >>>', this.$el.scrollTop);
  }
}
</script>

<style lang="scss" scoped>
/* @import '@/assets/scss/_variables.scss'; */

#feedPage {
  @include flex(center, center);
  @include size(1920px);

  .mainSection {
    @include size(1140px);
    display: flex;

    .sideBar {
      @include size(235px);
      margin : {
        top: 50px;
        right: 40px;
      }

      .loginBtn {
        @include flex(center, center);
        @include size(235px, 60px);
        @include font(22px, bold);
        border-radius: 5px;
        background: $baseColor;
        color: #ffffff;
        text-align: center;
        cursor: pointer;
      }
    }

    .listSection {
      $listSectionWidth: 865px;
      @include size($listSectionWidth);
      margin-top: 50px;

      .filterSection {
        @include size(inherit, 24px);
        @include flex(space-between, center);
        margin-bottom: 11px;

        ul {
          @include flex($align-items: center);

          @mixin toggleStyle() {
            @include size(59px, 19px);
            @include font(13px);
            margin-right: 10px;
            cursor: pointer;

            & .circleIcon {
              @include size(6px, 6px);
              margin-right: 5px;
              border-radius: 3px;
            }
          }

          .filterBtnOn {
            @include flex(center, center);
            @include toggleStyle;
            color: $darkGrayColor;

            .circleIcon {
              background-color: $baseColor;
            }
          }

          .filterBtnOff {
            @include flex(center, center);
            @include toggleStyle;
            color: #adb5bd;

            .circleIcon {
              background-color: $lightGrayColor;
            }
          }
        }
      }

      button {
        @include size(48px, 24px);
        @include font(13px);
        border: 1px solid $lightGrayColor;
        border-radius: 3px;
        color: #adb5bd;
      }

      .articleSection {
        @include size(inherit, 179px);
        margin-bottom: 30px;
        border: 1px solid $lightGrayColor;
        border-radius: 5px;
        padding: 20px 30px;

        .categoryPart {
          @include flex(space-between, flex-start);
          @include size($listSectionWidth - 60px, 19px + 11px);
          @include font(13px);
          margin-bottom: 15px;
          border-bottom: 1px solid $lightGrayColor;

          p:first-child {
            color: #7e848a;
          }
          p:last-child {
            color: #adb5bd;
          }
        }

        .authorPart {
          @include flex($align-items: flex-start);
          @include font(13px);
          margin-bottom: 17px;

          p:first-child {
            margin-right: 10px;
            color: $baseColor;
          }
          p:last-child {
            color: $darkGrayColor;

            &::before {
              content: '|';
              color: $lightGrayColor;
              margin-right: 10px;
            }
          }
        }

        h1 {
          @include flex(flex-start, center);
          @include size($h: 27px);
          @include font(18px, bold);
          color: #282c30;
          margin-bottom: 6px;
        }

        h2 {
          @include flex(flex-start, center);
          @include size($h: 24px);
          @include font(16px);
          color: $darkGrayColor;
        }
      }

      .adSection {
        @include size(inherit, 255px);
        margin-bottom: 30px;
        border: 1px solid $lightGrayColor;
        border-radius: 5px;
        padding: 20px 30px;

        p {
          @include size($h: 19px);
          @include font(13px);
          margin-bottom: 16.5px;
          text-align: left;
          color: #adb5bd;
        }
        div {
          @include flex(flex-start, flex-start);
          img {
            @include size(310px, 179px);
            margin-right: 29.5px;
            object-fit: contain;
            border: 1px solid $lightGrayColor;
          }

          div {
            display: block;
            background-color: yellow;
            h1 {
              @include size(465px, 55px);
              @include font(18px, bold);
              margin-bottom: 11px;
            }

            h2 {
              @include size(465px, 100px);
              @include font(16px);
            }
          }
        }
      }
    }
  }
}
</style>
