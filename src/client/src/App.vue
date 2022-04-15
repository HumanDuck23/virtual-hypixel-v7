<template>
  <v-app style="height: 100vh">
    <v-main>
      <v-app-bar color="primary">
        <v-icon class="mr-2">
          mdi-cable-data
        </v-icon>
        <v-app-bar-title>
          Virtual Hypixel
        </v-app-bar-title>
        <v-spacer/>
        <v-btn icon="mdi-brightness-4" @click="toggleTheme">Hi</v-btn>
      </v-app-bar>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),

  mounted() {
    this.$vuetify.theme.current = localStorage.getItem("theme") ?? "darkTheme"
  },

  methods: {
    toggleTheme() {
      this.$vuetify.theme.current = this.$vuetify.theme.current === "lightTheme" ? "darkTheme" : "lightTheme"
      localStorage.setItem("theme", this.$vuetify.theme.current)
    }
  }
}
</script>
<style>
#app {
  height: 100vh;
}
</style>