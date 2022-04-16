<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-for="module in modules">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">
              {{ module.manifest.icon ?? "mdi-package-variant-closed" }}
            </v-icon>
            {{ module.manifest.name }}
          </v-card-title>
          <v-card-subtitle>
            By {{ module.manifest.author }}
          </v-card-subtitle>
          <v-card-text>
            {{ module.manifest.description }}
          </v-card-text>
          <v-card-actions>
            <v-checkbox
              v-model="moduleConfigs[module.manifest.id].enabled"
              label="Enabled"
              color="accent"
              class="mb-n10"
            ></v-checkbox>
            <v-spacer />
            <v-btn icon="mdi-cog-outline" :to="`/module/${module.manifest.id}`"></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",

  data: () => ({
    modules: [],
    moduleConfigs: {}
  }),

  mounted() {
    this.moduleConfigs = JSON.parse(localStorage.getItem("moduleConfigs")) || {}
    if (window.socket !== undefined) {
      const modulePath = JSON.parse(localStorage.getItem("settings")).modules?.path || ""
      if (modulePath !== "") {
        window.socket.emit("getModules", modulePath)
        window.socket.on("moduleResponse", (modules) => {
          if (!modules) {
            alert("The set folder doesn't exist!")
            this.$router.push("/settings")
          } else {
            this.modules = modules
            for (const module of modules) {
              if (!this.moduleConfigs[module.manifest.id]) {
                this.moduleConfigs[module.manifest.id] = {
                  enabled: true
                }
              }
              for (const option of Object.keys(module.config)) {
                if (this.moduleConfigs[module.manifest.id][option] === undefined) {
                  this.moduleConfigs[module.manifest.id][option] = ""
                }
              }
            }
            localStorage.setItem("moduleConfigs", JSON.stringify(this.moduleConfigs))
          }
        })
      } else {
        alert("Please set the path to the modules folder in the settings!")
        this.$router.push("/settings")
      }
    } else {
      console.error("socket doesnt exist")
    }
  },

  methods: {
    saveModuleConfig() {
      localStorage.setItem("moduleConfigs", JSON.stringify(this.moduleConfigs))
    }
  },

  watch: {
    moduleConfigs: {
      handler: function() {
        this.saveModuleConfig()
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>