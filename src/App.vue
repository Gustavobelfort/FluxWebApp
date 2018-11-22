<template>
  <div id="app">
    <v-app id="keep">
      <v-navigation-drawer
        v-model="drawer"
        fixed
        clipped
        class="grey lighten-4"
        app
      >
        <v-list dense class="grey lighten-4">
          <template v-for="(item, i) in items">
            <v-layout v-if="item.heading" :key="i" row align-center>
              <v-flex xs6>
                <v-subheader v-if="item.heading">
                  {{ item.heading }}
                </v-subheader>
              </v-flex>
              <v-flex xs6 class="text-xs-right">
                <v-btn small flat>edit</v-btn>
              </v-flex>
            </v-layout>
            <v-divider
              v-else-if="item.divider"
              :key="i"
              dark
              class="my-3"
            ></v-divider>
            <v-list-tile v-else :key="i" @click="">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="grey--text">
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar style="z-index: 2" color="primary" prominent tabs>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title class="title mr-4">ApoloClub</v-toolbar-title>
        <v-autocomplete
          v-model="model"
          :items="items"
          :loading="isLoading"
          :search-input.sync="search"
          chips
          solo-inverted
          flat
          clearable
          hide-details
          hide-selected
          item-text="name"
          item-value="symbol"
          label="Pesquisar Usuários"
          solo
        >
          <template slot="no-data">
            <v-list-tile>
              <v-list-tile-title>Pesquisar Usuários</v-list-tile-title>
            </v-list-tile>
          </template>
          <template slot="selection" slot-scope="{ item, selected }">
            <v-chip :selected="selected" color="blue-grey" class="white--text">
              <v-icon left>mdi-coin</v-icon>
              <span v-text="item.name"></span>
            </v-chip>
          </template>
          <template slot="item" slot-scope="{ item, tile }">
            <v-list-tile-avatar
              color="indigo"
              class="headline font-weight-light white--text"
            >
              {{ item.name.charAt(0) }}
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.name"></v-list-tile-title>
              <v-list-tile-sub-title
                v-text="item.symbol"
              ></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action> <v-icon>mdi-coin</v-icon> </v-list-tile-action>
          </template>
        </v-autocomplete>
      </v-toolbar>
      <v-content style="z-index: 1">
        <transition name="slide"><router-view></router-view></transition>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import colors from "vuetify/es5/util/colors";
import axios from "axios";

export default {
  name: "App",
  theme: {
    primary: colors.amber.darken1,
    secondary: colors.amber.lighten1,
    accent: colors.lightGreen.darken3,
    error: colors.red.base,
    warning: colors.yellow.accent2,
    info: colors.teal.lighten1,
    success: colors.lightGreen.darken3
  },
  data: () => ({
    drawer: null,
    isLoading: false,
    items: [],
    model: null,
    search: null,
    items22: [
      { icon: "lightbulb_outline", text: "Notes" },
      { icon: "touch_app", text: "Reminders" },
      { divider: true },
      { icon: "add", text: "Create new label" },
      { divider: true },
      { icon: "archive", text: "Archive" },
      { icon: "delete", text: "Trash" },
      { divider: true },
      { icon: "settings", text: "Settings" },
      { icon: "chat_bubble", text: "Trash" },
      { icon: "help", text: "Help" },
      { icon: "phonelink", text: "App downloads" },
      { icon: "keyboard", text: "Keyboard shortcuts" }
    ]
  }),
  props: {
    source: String
  },
  watch: {
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return;
      this.isLoading = true;
      // Lazily load input items
      axios
        .get("https://api.coinmarketcap.com/v2/listings/")
        .then(res => {
          this.items = res.data.data;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    }
  }
};
</script>

<style>
.slide-leave-active {
  transition: opacity 1s ease;
  opacity: 0;
  animation: slide-out 1s ease-out forwards;
}

.slide-leave {
  opacity: 1;
  transform: translateX(0);
}

.slide-enter-active {
  animation: slide-in 1s ease-out forwards;
}

@keyframes slide-out {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-30px);
  }
}

@keyframes slide-in {
  0% {
    transform: translateY(-30px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
<style lang="stylus">

#keep
  .v-navigation-drawer__border
    display: none
</style>
