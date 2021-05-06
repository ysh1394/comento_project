<template>
  <main id="feedPage">
    <!-- 테스트 후 삭제 예정 -->
    <button type="button" @click="increase">증가</button>
    <button type="button" @click="decrease">감소</button>
    <div>{{ count }}</div>
    <!-- <div @click="getList">asdasd</div> -->
    <div>{{ isToggleBtn }}</div>
    <!-- 테스트 후 삭제 예정 -->
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
        <article class="articleSection">
          <div class="categoryPart">
            <p>category_name</p>
            <p>id</p>
          </div>
          <div class="authorPart">
            <p>user_id</p>
            <p>create_at(2020-02-02)</p>
          </div>
          <!-- {list.description.length > 25
                  ? `${list.description.slice(0, 25)}...`
                  : list.description} -->
          <h1>
            Title Title Title Title Title Title Title Title Title Title Title
            Title Title Title
          </h1>
          <h2>content content content content content</h2>
        </article>
        <article class="adSection">
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
        </article>
      </section>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import axios from 'axios';

const FeedModule = namespace('Feed');

@Component
export default class Feed extends Vue {
  // [x: string]: any;
  @FeedModule.State('isToggleBtn')
  public readonly 'isToggleBtn': boolean;

  @FeedModule.Getter('count')
  public readonly 'count': number;

  @FeedModule.Action('filterToggleEvent')
  public readonly 'filterToggleEvent': any;
  @FeedModule.Action('increase')
  public readonly 'increase': any;
  @FeedModule.Action('decrease')
  public readonly 'decrease': any;
  @FeedModule.Action('getList')
  public readonly 'getList': any;

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
  public created() {
    this.getList();
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
          background-color: violet;
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
