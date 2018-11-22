<template>
  <div class="searchbar">
    <div>
      <vue-bootstrap-typeahead
        class="mb-4"
        v-model="query"
        :data="users"
        :serializer="item => item.nome"
        placeholder="Pesquisar usuários no estabelecimento"
        prepend="Nome:"
        @hit="searchRepositories"
      >
        <!-- Append a button -->
        <template slot="append">
          <button @click="searchRepositories" class="btn btn-primary">
            Pesquisar
          </button>
        </template>

        <!-- Begin custom suggestion slot -->
        <template slot="suggestion" slot-scope="{ data, htmlText }">
          <div class="d-flex align-items-center">
            <img
              class="rounded-circle"
              :src="data.foto"
              style="width: 40px; height: 40px;"
            />

            <!--
              Note: the v-html binding is used, as htmlText contains
              the suggestion text highlighted with <strong> tags
            -->
            <span class="ml-4" v-html="htmlText"></span>
            <i class="ml-auto fab fa-certificate fa-2x"></i>
          </div>
        </template>
      </vue-bootstrap-typeahead>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SearchBar",
  props: {
    msg: String
  },
  components: {
    VueBootstrapTypeahead: VueBootstrapTypeahead
  },
  data: function data() {
    return {
      query: "",
      userRepositories: {},
      users: []
    };
  },
  methods: {
    searchUsers: function searchUsers(newQuery) {
      var _this = this;
      axios
        .get(
          "https://m9963ywzsg.execute-api.us-east-1.amazonaws.com/default/queryInHouse?nome=" +
            newQuery
        )
        .then(function(res) {
          console.log(res.data.message);
          _this.users = res.data.message;
        });
    },
    searchRepositories: function searchRepositories() {
      var _this2 = this;
      axios
        .get(
          "https://m9963ywzsg.execute-api.us-east-1.amazonaws.com/default/FluxListOnline"
        )
        .then(function(res) {
          _this2.userRepositories = res.data;
        });
    }
  },

  watch: {
    // When the query value changes, fetch new results from
    // the API - debounce the search to avoid hitting the API limits
    query: _.debounce(function(newQuery) {
      this.searchUsers(newQuery);
    }, 250)
  },

  filters: {
    stringify: function stringify(value) {
      return JSON.stringify(value, null, 2);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
