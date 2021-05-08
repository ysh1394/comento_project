<template>
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
    <button type="button" class="filterBtn">필터</button>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const FeedModule = namespace('Feed');

@Component
export default class Sort extends Vue {
  @FeedModule.State('isToggleBtn')
  public readonly 'isToggleBtn': boolean;

  @FeedModule.Action('filterToggleEvent')
  public readonly 'filterToggleEvent': any;

  @FeedModule.Action('changeSort')
  public readonly 'changeSort': any;
}
</script>

<style lang="scss" scoped>
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

  .filterBtn {
    @include size(48px, 24px);
    @include font(13px);
    border: 1px solid $lightGrayColor;
    border-radius: 3px;
    color: #adb5bd;
  }
}
</style>
