<template>
  <v-card class="ma-5">
    <v-card-title>Accounts</v-card-title>
    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3" v-for="(account, index) in settings.accounts">
            <v-card variant="outlined">
              <v-card-text>
                <v-text-field
                    label="Username"
                    v-model="account.username"
                    prepend-icon="mdi-minecraft"
                    color="accent"
                />
                <v-text-field
                    label="Email"
                    v-model="account.email"
                    prepend-icon="mdi-at"
                    color="accent"
                />
                <v-text-field
                    label="Password"
                    v-model="account.password"
                    prepend-icon="mdi-key-outline"
                    :append-inner-icon="typePassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                    @click:append-inner="typePassword = !typePassword"
                    :type="typePassword ? 'password' : 'text'"
                    color="accent"
                />
              </v-card-text>
              <v-card-actions class="mt-n10">
                <v-spacer/>
                <v-btn icon="mdi-delete-outline" color="error" @click="deleteAccount(index)"></v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn elevation="1" block @click="addAccount">Add Account</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Home",

  data: () => ({
    settings: {
      accounts: [
        {
          username: "",
          email: "",
          password: ""
        }
      ]
    },

    typePassword: true
  }),

  mounted() {
    if (localStorage.getItem("settings")) {
      this.settings = JSON.parse(localStorage.getItem("settings"))
    }
  },

  methods: {
    addAccount() {
      this.settings.accounts.push({
        username: "",
        email: "",
        password: ""
      })
    },
    deleteAccount(index) {
      this.settings.accounts.splice(index, 1)
    }
  },

  watch: {
    settings: {
      handler() {
        localStorage.setItem("settings", JSON.stringify(this.settings))
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>