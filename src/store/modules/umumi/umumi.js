import { ToastError } from "@/assets/js/vue-toastification";

const umumiHata = "umumiHata";
const sayfaBasligi = "sayfaBasligi";
const restApiApi = "restApiApi";


const state = {
    umumiHata: "",
    sayfaBasligi: "",
    restApiApi: "http://localhost:8080/api/",
};

const getters = {
    [umumiHata]: (state) => {
        return state.umumiHata;
    },
    [sayfaBasligi]: (state) => {
        return state.sayfaBasligi;
    },
    [restApiApi]: (state) => {
        return state.restApiApi;
    },
};

const mutations = {
    [umumiHata]: (state, payload) => {
        state.umumiHata = payload;
        if (payload.length > 0) {
            ToastError(payload);
        }
    },
    [sayfaBasligi]: (state, payload) => {
        state.sayfaBasligi = payload;
    },
    [restApiApi]: (state, payload) => {
        state.restApiApi = payload;
    },
};

const actions = {
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};

