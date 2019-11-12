<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center">Awesome Todo</q-toolbar-title>
        <q-btn
          to="/auth"
          v-if="!loggedIn"
          flat
          class="absolute-right"
          icon-right="account_circle"
          label="Login"
        />
        <q-btn
          v-else
          flat
          @click="logoutUser"
          class="absolute-right"
          icon-right="account_circle"
          label="Logout"
        />
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab
          v-for="(nav, index) in navs"
          :to="nav.to"
          :icon="nav.icon"
          :label="nav.label"
          :key="index"
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-primary"
      :breakpoint="767"
      :width="250"
    >
      <q-list dark>
        <q-item-label header>Navigation</q-item-label>
        <q-item
          exact
          clickable
          v-for="(nav, index) in navs"
          :to="nav.to"
          :key="index"
          class="text-grey-4"
        >
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          v-if="$q.platform.is.electron"
          @click="quitApp()"
          clickable
          class="text-grey-4 absolute-bottom"
        >
          <q-item-section avatar>
            <q-icon name="power_settings_new" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Quit</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { openURL } from 'quasar';

/* eslint-disable */
export default {
  name: 'MyLayout',

  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      navs: [
        {
          label: 'Todo',
          icon: 'list',
          to: '/'
        },
        {
          label: 'Settings',
          icon: 'settings',
          to: '/settings'
        },
        {
          label: 'About',
          icon: 'info',
          to: '/about'
        }
      ]
    };
  },
  computed: {
    ...mapState('auth', ['loggedIn'])
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
    openURL,
    quitApp() {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Really quit Awesome Todo?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          if (this.$q.platform.is.electron) {
            require('electron').ipcRenderer.send('quit-app');
          }
        });
    }
  }
};
</script>
<style lang="scss">
@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }
}

.q-drawer {
  .q-router-link--exact-active {
    color: yellowgreen !important;
  }
}
</style>
