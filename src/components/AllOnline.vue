<template>
  <v-layout wrap>
    <v-flex xs12 md6>
      <v-list two-line>
        <template v-for="(item, index) in results">
          <v-subheader v-if="item.header" :key="item.header">
            {{ item.header }}
          </v-subheader>

          <v-divider
            v-else-if="item.divider"
            :inset="item.inset"
            :key="index"
          ></v-divider>

          <v-list-tile
            v-else
            :key="item.nome"
            avatar
            @click="pushOrder(item.nome);"
          >
            <v-list-tile-avatar> <img :src="item.foto" /> </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="item.nome"></v-list-tile-title>
              <v-list-tile-sub-title
                v-html="item.subtitle"
              ></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";

export default {
  name: "AllOnline",
  props: {
    msg: String
  },
  data: function data() {
    return {
      item: {
        divider: true
      },
      query: "",
      results: []
    };
  },
  methods: {
    pushOrder(id) {
      this.$router.push("/order");
    }
  },
  mounted() {
    axios
      .get(
        "https://m9963ywzsg.execute-api.us-east-1.amazonaws.com/default/FluxListOnline"
      )
      .then(response => {
        this.results = response.data.message;
        console.log(this.results);
      });
  },
  filters: {
    stringify: function stringify(value) {
      return JSON.stringify(value, null, 2);
    }
  }
};
</script>
