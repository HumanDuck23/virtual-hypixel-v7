<template>
  <v-card class="ma-5">
    <v-container fluid>
      <v-row>
        <v-col cols="1">
          <v-btn icon="mdi-chevron-left" color="accent" to="/modules"></v-btn>
        </v-col>
        <v-col cols="11" v-if="module.manifest !== undefined" class="mt-n3">
          <v-card-title>
            {{ module.manifest.name }}
          </v-card-title>
          <v-card-subtitle>
            By {{ module.manifest.author }}
          </v-card-subtitle>
        </v-col>
      </v-row>
    </v-container>
    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-for="c in Object.keys(config).filter((c) => c !== 'enabled')" :key="c">
            <div style="margin-top: 10px">
              <v-text-field v-if="module?.config[c].type === 'text' || module?.config[c].type === 'number'"
                            v-model="config[c]" :label="module?.config[c].label" :type="module?.config[c].type"
                            color="accent"></v-text-field>
              <v-select v-else-if="module?.config[c].type === 'multi'" :items="module?.config[c].options" v-model="config[c]" :label="module?.config[c].label" color="accent"></v-select>
                <v-checkbox v-else-if="module?.config[c].type === 'bool'" v-model="config[c]" :label="module?.config[c].label" color="accent"></v-checkbox>
              </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ModuleSettings",

  data: () => ({
    module: {},
    config: {}
  }),

  mounted() {
    const s = JSON.parse(localStorage.getItem("settings"))
    if (s && s.modules?.path && window.socket) {
      window.socket.emit("getModules", s.modules.path)
      window.socket.on("moduleResponse", (e) => {
        console.log(e)
        for (const module of e) {
          if (module.manifest.id === this.$route.params.id) {
            this.module = module
            const moduleConfigs = JSON.parse(localStorage.getItem("moduleConfigs"))
            for (const moduleID of Object.keys(moduleConfigs)) {
              if (moduleID === module.manifest.id) {
                this.config = moduleConfigs[moduleID]
                console.log(this.configOptions)
              }
            }
            break
          }
        }
      })
    }
  },

  methods: {
    saveModuleConfig() {
      const moduleConfigs = JSON.parse(localStorage.getItem("moduleConfigs"))
      moduleConfigs[this.module.manifest.id] = this.config
      localStorage.setItem("moduleConfigs", JSON.stringify(moduleConfigs))
    }
  },

  watch: {
    config: {
      handler() {
        this.saveModuleConfig()
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>