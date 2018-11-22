<template>
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
    <v-toolbar color="primary" app absolute clipped-left>
      <v-toolbar-side-icon @click="drawer = !drawer;"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5"
        >Apolo<span class="font-weight-light">Club</span></span
      >
      <v-text-field
        solo-inverted
        flat
        hide-details
        label="Buscar Clientes ApoloClub"
        prepend-inner-icon="search"
      ></v-text-field>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content> <AllOnline /> </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import AllOnline from "./AllOnline";
import colors from "vuetify/es5/util/colors";

export default {
  theme: {
    primary: colors.amber.darken1,
    secondary: colors.amber.lighten1,
    accent: colors.lightGreen.darken3,
    error: colors.red.base,
    warning: colors.yellow.accent2,
    info: colors.teal.lighten1,
    success: colors.lightGreen.darken3
  },
  name: "Homepage",
  components: {
    AllOnline
  },
  data: () => ({
    drawer: null,
    items: [
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
  }
};
</script>

<style lang="stylus">

#keep
  .v-navigation-drawer__border
    display: none
</style>
