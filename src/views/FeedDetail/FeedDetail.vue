<template>
  <section id="feedDetailPage">
    <div class="mainSection">
      <div class="listSection">
        <div class="articleSection">
          <div v-for="list in detailPageList" :key="list.id">
            <article class="article">
              <h1>
                {{
                  list.title.length > 150
                    ? `${list.title.slice(0, 150)}...`
                    : list.title
                }}
              </h1>
              <h3>
                {{
                  list.contents.length > 250
                    ? `${list.contents.slice(0, 250)}...`
                    : list.contents
                }}
              </h3>
              <p>
                created_at :
                {{ list.created_at.slice(0, list.created_at.indexOf('T')) }}
              </p>
            </article>
          </div>
        </div>
        <section class="replySection">
          <div class="replyCount">
            <span>답변 </span>
            <span>{{ replyData.length }}</span>
          </div>
          <div v-for="list in replyData" :key="list.id">
            <article class="reply">
              <p class="userName">{{ list.user.name }}</p>
              <div class="underLine"></div>
              <div class="replyContent">
                {{
                  list.contents.length > 250
                    ? `${list.contents.slice(0, 250)}...`
                    : list.contents
                }}
              </div>
              <p class="createdAt">
                created_at :
                {{ list.created_at.slice(0, list.created_at.indexOf('T')) }}
              </p>
            </article>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import Sort from '@/views/Feed/components/Sort.vue';
import Modal from '@/views/Feed/components/Modal.vue';
import Loading from '@/components/Loading.vue';

const FeedModule = namespace('Feed');

@Component({
  components: {
    Sort,
    Modal,
    Loading,
  },
})
export default class Feed extends Vue {
  @FeedModule.State('detailPageList')
  private readonly 'detailPageList': any;

  @FeedModule.State('replyData')
  private readonly 'replyData': any;

  @FeedModule.Action('getView')
  private readonly 'getView': any;

  public created() {
    this.getView(this.$route.params.id);
  }
}
</script>

<style lang="scss" scoped>
#feedDetailPage {
  @include flex(center, center);
  @include size(1920px);

  .mainSection {
    @include size(1140px);
    display: flex;

    .listSection {
      $listSectionWidth: 865px;
      @include size($listSectionWidth);
      margin-top: 50px;

      .articleSection {
        .article {
          @include size(1140px, 211px);
          margin-bottom: 30px;
          border: 1px solid $baseColor;
          border-radius: 5px;
          padding: 20px 30px;

          h1 {
            @include flex(flex-start, center);
            @include size($h: 55px);
            @include font(18px, bold);
            margin-bottom: 6px;
            color: #282c30;
          }

          h3 {
            @include flex(flex-start, center);
            @include size($h: 74px);
            @include font(16px);
            margin-bottom: 15px;
            color: $darkGrayColor;
          }

          p {
            @include font(13px);
            color: #adb5bd;
          }
        }
      }

      .replySection {
        .replyCount {
          @include size(max-content, 24px);
          margin-bottom: 10px;

          span:first-child {
            @include font(16px);
            color: #495057;
          }
          span:last-child {
            @include font(16px);
            color: $baseColor;
          }
        }

        div {
          .reply {
            @include size(1140px, 201px);
            margin-bottom: 30px;
            border: 1px solid $lightGrayColor;
            border-radius: 5px;
            padding: 20px 30px;

            .userName {
              @include font(16px);
              margin-bottom: 10px;
              color: #7e848a;
            }

            .underLine {
              @include size(inherit - 40px, 1px);
              border-bottom: 1px solid $lightGrayColor;
              margin-bottom: 16px;
            }

            .replyContent {
              @include flex(flex-start, center);
              @include size($h: 74px);
              @include font(16px);
              margin-bottom: 15px;
              color: $darkGrayColor;
              line-height: 25px;
            }
            .createdAt {
              @include font(13px);
              color: #adb5bd;
            }
          }
        }
      }
    }
  }
}
</style>
