<template>
  <div id="app">
    <Modal v-if="isModal" />
    <Nav msg="[210508]유승현" />
    <router-view />
  </div>
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
</style>
