<template>
  <div>
    <div v-for="item in json" :key="item.Id">
      <p>Id: {{ item.Id }}</p>
      <p>Name: {{ item.Name }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  data() {
    return {
      json: [],
    };
  },
  methods: {
    requestPost() {
      const query = `
    {
      people {
        items {
          Id
          Name
        }
      }
    }`;

      const endpoint = "/data-api/graphql";
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query }),
      })
        .then((response) => response.json())
        .then((data) => (this.json = data.data.people.items))
        .then(() => console.log(this.json));
    },
  },
  mounted() {
    this.requestPost();
  },
};
</script>
