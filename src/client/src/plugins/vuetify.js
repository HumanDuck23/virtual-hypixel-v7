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
        primary: "#470FF4",
        secondary: "#4056F4",
        accent: "#FFFD82"
    }
}

const darkTheme = {
    dark: true,
    colors: {
        background: "#393939",
        surface: "#393939",
        primary: "#470FF4",
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
