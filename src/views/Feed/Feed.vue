<template>
  <main id="feedPage">
    <section class="mainSection">
      <aside class="sideBar">
        <button type="button" class="loginBtn">로그인</button>
      </aside>
      <section class="listSection">
        <Sort />
        <div class="articleSection">
          <div v-for="(list, idx) in listData" :key="list.id">
            <article class="article" v-if="(idx + 1) % 4 !== 0">
              <div class="categoryPart">
                <div>length : {{ idx + 1 }}</div>
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
            </article>

            <div v-else>
              <article class="adSection" v-for="ad in adData" :key="ad.id">
                <p>sponsored</p>
                <div>
                  <img
                    :src="`https://cdn.comento.kr/assignment/${ad.img}`"
                    :alt="`https://cdn.comento.kr/assignment/${ad.img}`"
                  />
                  <div>
                    <h1>
                      {{
                        ad.title.length > 25
                          ? `${ad.title.slice(0, 50)}...`
                          : ad.title
                      }}
                    </h1>
                    <h2>
                      {{
                        ad.contents.length > 25
                          ? `${ad.contents.slice(0, 50)}...`
                          : ad.contents
                      }}
                    </h2>
                  </div>
                </div>
              </article>
            </div>
          </div>
          <div class="loadingIcon" v-if="loading"></div>
        </div>
      </section>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import Sort from '@/components/Sort.vue';

const FeedModule = namespace('Feed');

@Component({
  components: {
    Sort,
  },
  // watch: {
  //   adtest(text: string): string {
  //     return text.length > 25 ? `${text.slice(0, 50)}...` : text;
  //   },
  // },
})
export default class Feed extends Vue {
  private test: boolean = true;

  @FeedModule.State('loading')
  private readonly 'loading': boolean;

  @FeedModule.Getter('listData')
  private readonly 'listData': string[];

  @FeedModule.Getter('adData')
  private readonly 'adData': string[];

  @FeedModule.Action('getList')
  private readonly 'getList': any;

  @FeedModule.Action('infinityScroll')
  private readonly 'infinityScroll': any;

  // get pageCount() {
  //   return Math.ceil(this.limit);
  // }
  // get pageOffset() {
  //   return (this as any).maxPerPage * (this as any).currentPage;
  // }
  public created() {
    this.getList();
  }
  public mounted() {
    window.addEventListener('scroll', this.infinityScroll);
  }
  public destroyed() {
    // window.removeEventListener('scroll', this.infinityScroll);
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

      .loadingIcon {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        margin: 50px 0px;
        border-radius: 50%;
        border: 5px solid $baseColor;
        opacity: 0.7;
        border-top: 5px solid #fff;
        animation: animate 1.5s infinite linear;
      }

      .articleSection {
        /* @include size(inherit, fit-content); */

        .article {
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
            object-fit: cover;
          }

          div {
            display: block;
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
@keyframes animate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
