<template>
  <div>
    <div :class="isModal ? 'modalOn' : 'modalOff'" @click="modalEvent">
      <div class="filterModal" v-if="isLoading">
        <Loading />
      </div>
      <section class="filterModal" v-else>
        <div class="cancelBtn">
          <CancelIcon class="cancelIcon" />
        </div>
        <h3>필터</h3>
        <div
          class="checkboxSection"
          v-for="list in categoryList"
          :key="list.id"
        >
          <div>
            <input :id="list.id" type="checkbox" checked />

            <label :id="list.id" :for="list.id" @click="checkboxEvent">{{
              list.name
            }}</label>
          </div>
        </div>
        <div class="errorMsg" v-if="isError">필터를 선택해 주세요</div>
        <div class="btnWrap">
          <button class="saveBtn" type="submit" @click="filterEvent">
            저장하기
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import CancelIcon from '@/components/Icon/CancelIcon.vue';
import Loading from '@/components/Loading.vue';

const FeedModule = namespace('Feed');

@Component({
  components: {
    CancelIcon,
    Loading,
  },
})
export default class Modal extends Vue {
  @FeedModule.State('isModal')
  public readonly 'isModal': boolean;

  @FeedModule.State('isLoading')
  public readonly 'isLoading': boolean;

  @FeedModule.State('isError')
  public readonly 'isError': boolean;

  @FeedModule.State('category')
  public readonly 'category': string;

  @FeedModule.State('categoryFilter')
  public readonly 'categoryFilter': string;

  @FeedModule.State('categoryList')
  public readonly 'categoryList': any[];

  @FeedModule.Action('modalEvent')
  public readonly 'modalEvent': any;

  @FeedModule.Action('getCategory')
  public readonly 'getCategory': any;

  @FeedModule.Action('checkboxEvent')
  public readonly 'checkboxEvent': any;

  @FeedModule.Action('filterEvent')
  public readonly 'filterEvent': any;

  public created() {
    this.getCategory();
  }
}
</script>

<style lang="scss">
.modalOff {
  display: none;
}

.modalOn {
  @include flex(center, center);
  @include size(1920px, 100%);
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  overflow: hidden !important;
  touch-action: none;

  .filterModal {
    @include size(460px, 268px);

    position: absolute;
    z-index: 1;
    background-color: white;

    .loadingIcon {
      position: absolute;
      top: 30px;
    }

    .cancelBtn {
      @include flex(flex-end, center);
      margin: 15px 15px 0px 0px;

      .cancelIcon {
        fill: none;
        stroke: #adb5bd;
        stroke-width: 2px;
        cursor: pointer;
      }
    }

    h3 {
      @include flex(center, center);
      @include size(40px, 33px);
      @include font(22px, bold);
      margin: 3px 0px 0px 30px;
      color: #212529;
    }
    .checkboxSection {
      margin: 15px 0px 0px 30px;

      div {
        @include flex(flex-start, center);
        position: relative;
        margin-bottom: 15px;

        &:last-child {
          margin: 0;
        }

        input[type='checkbox'] {
          display: none;
        }

        input[type='checkbox'] + label {
          padding-left: 25px;
          line-height: 20px;
          cursor: pointer;
        }

        input[type='checkbox'] + label:before {
          @include size(20px, 20px);
          position: absolute;
          left: 0;
          box-sizing: border-box;
          border: 1px solid #e1e4e7;
          content: '';
        }
        input[type='checkbox']:checked + label:before {
          content: '\2714';
          text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
          font-size: 13px;
          font-weight: 100;
          color: #fff;
          background: $baseColor;
          text-align: center;
        }
      }
    }
    .errorMsg {
      @include flex(flex-end, center);
      @include font(16px, bold);
      position: absolute;
      margin: 45px 30px;
      animation: animate 2.5s forwards linear;
      animation-name: error;
    }
    @keyframes error {
      from {
        color: rgba(255, 0, 255, 1);
      }
      to {
        color: rgba(255, 0, 255, 0.1);
      }
    }

    .btnWrap {
      @include flex(flex-end, center);
      margin: 30px 30px 30px 0px;

      .saveBtn {
        @include size(99px, 40px);
        @include font(16px);
        background: $baseColor;
        color: #ffffff;
        border-radius: 3px;
        cursor: pointer;
      }
    }
  }
}
</style>
