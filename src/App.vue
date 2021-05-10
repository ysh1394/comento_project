<template>
  <div id="app">
    <Modal v-if="isModal" />
    <!-- <Icon /> -->
    <Nav msg="[210508]유승현" />
    <router-view />
    <!-- </Modal> -->
    <!-- <div id="nav"> -->
    <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
  </div>
  <!-- </div> -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Nav from '@/components/Nav.vue';
import Modal from '@/views/Feed/components/Modal.vue';
import { namespace } from 'vuex-class';

const FeedModule = namespace('Feed');

@Component({
  components: {
    Nav,
    Modal,
  },
})
export default class App extends Vue {
  @FeedModule.State('isModal')
  public readonly 'isModal': boolean;
}
</script>

<style lang="scss">
@import '@/assets/scss/reset.scss';

/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  &::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }
} */

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
