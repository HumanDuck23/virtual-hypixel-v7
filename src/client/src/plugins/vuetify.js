// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

const lightTheme = {
    dark: false,
    colors: {
        background: "#fff",
        surface: "#fff",
        primary: "#5d25fd",
        secondary: "#4056F4",
        accent: "#FFFD82"
    }
}

const darkTheme = {
    dark: true,
    colors: {
        background: "#393939",
        surface: "#4e4e4e",
        primary: "#5d25fd",
        secondary: "#4056F4",
        accent: "#FFFD82"
    }
}

export default createVuetify(
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
    {
        theme: {
            defaultTheme: "darkTheme",
            themes: {
                lightTheme,
                darkTheme
            }
        }
    }
)
