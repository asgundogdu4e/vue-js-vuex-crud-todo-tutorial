import Vue from "vue";
import Vuex from "vuex";
import createLogger from "./../plugins/logger";
//Umumi
import todos from "./modules/todos/todos";
import tutorials from "./modules/todos/tutorials";
import umumi from "./modules/umumi/umumi";
Vue.use(Vuex);
const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({

    modules: {
        umumi,
        todos,
        tutorials
    },
    strict: debug,
    plugins: debug ? [createLogger()] : [],
});
