<template>
  <header>
    <nav>
      {{ msg }}
    </nav>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Nav extends Vue {
  @Prop() private msg!: string;
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

header {
  @include flex(center, center);
  width: 1920px;
  box-shadow: 0px 1px 5px #00000012;

  nav {
    display: flex;
    align-items: center;
    width: 1140px;
    height: 70px;
    background-color: #ffffff;
    font: normal normal normal 16px/25px Noto Sans CJK KR;
    color: #212529;
    text-align: left;
    letter-spacing: 0px;
  }
}
</style>
