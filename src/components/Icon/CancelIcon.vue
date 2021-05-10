<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13.414"
    height="13.414"
    viewBox="0 0 13.414 13.414"
    @click="modalEvent"
  >
    <g transform="translate(-277.793 -16.793)" @click="modalEvent">
      <line
        class="cancelIcon"
        x2="12"
        y2="12"
        transform="translate(278.5 17.5)"
        @click="modalEvent"
      />
      <line
        class="cancelIcon"
        x1="12"
        y2="12"
        transform="translate(278.5 17.5)"
        @click="modalEvent"
      />
    </g>
  </svg>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const FeedModule = namespace('Feed');

@Component({})
export default class CancelIcon extends Vue {
  @FeedModule.Action('modalEvent')
  public readonly 'modalEvent': any;
}
</script>

<style lang="scss" scoped></style>
