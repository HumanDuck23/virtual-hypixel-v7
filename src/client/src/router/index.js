import { createRouter, createWebHashHistory } from "vue-router"
import Home from "../views/Home.vue"
import Modules from "../views/Modules.vue"
import ModuleSettings from "../views/ModuleSettings.vue"
import Settings from "../views/Settings.vue"

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/modules",
        name: "Modules",
        component: Modules,
    },
    {
        path: "/module/:id",
        name: "Modules Settings",
        component: ModuleSettings,
    },
    {
        path: "/settings",
        name: "Settings",
        component: Settings,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router