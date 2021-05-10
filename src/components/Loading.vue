<template>
  <div class="loadingIcon"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const FeedModule = namespace('Feed');

@Component
export default class Loading extends Vue {
  @FeedModule.State('isLoading')
  public readonly 'isLoading': boolean;
}
</script>

<style lang="scss" scoped>
.loadingIcon {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  margin-top: 100px;
  border-radius: 50%;
  border: 5px solid $baseColor;
  opacity: 0.7;
  border-top: 5px solid #fff;
  animation: animate 1.5s infinite linear;
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
