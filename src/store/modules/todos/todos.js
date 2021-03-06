import { EventBus, talepNevleri, neticeNevleri } from "../../../app/event";
import { ToastSuccess } from "@/assets/js/vue-toastification";
import Ensar from "@/ktb/index";
import store from "../../index";
import { umumiHata } from "../../statics/const_umumi";
import {
  todos__Listesi,
  todos__BosKayit,
  todos__DuzeltilecekKayit,
  todos__KaydetTamamMi,
  todos__DuzeltmeTamamMi,
  todos__SilTamamMi,
  todos__Kaydet,
  todos__Guncelle,
  todos__Sil,
  todos__KayitDialog,
  todos__DetayDialog,
  todos__KayitModu,
  todos__KayitDialogKapat,
} from "../../statics/const_todos";

const state = {
  todos__Listesi: [],
  todos__KaydetTamamMi: false,
  todos__DuzeltmeTamamMi: false,
  todos__SilTamamMi: false,
  todos__KayitDialog: false,
  todos__DetayDialog: false,
  todos__KayitModu: "",
  todos__DuzeltilecekKayit: {},
  todos__BosKayit: {
    task: "",
    description: "",
    completed: false,
  },
};

const getters = {
  [todos__BosKayit]: (state) => {
    return state.todos__BosKayit;
  },
  [todos__DuzeltilecekKayit]: (state) => {
    return state.todos__DuzeltilecekKayit;
  },
  [todos__Listesi]: (state) => {
    return state.todos__Listesi;
  },
  [todos__KaydetTamamMi]: (state) => {
    return state.todos__KaydetTamamMi;
  },
  [todos__SilTamamMi]: (state) => {
    return state.todos__SilTamamMi;
  },
  [todos__KayitDialog]: (state) => {
    return state.todos__KayitDialog;
  },
  [todos__DetayDialog]: (state) => {
    return state.todos__DetayDialog;
  },
  [todos__KayitModu]: (state) => {
    return state.todos__KayitModu;
  },
};

const mutations = {
  [todos__Listesi]: (state, payload) => {
    state.todos__Listesi = payload;
  },
  [todos__DuzeltilecekKayit]: (state, payload) => {
    state.todos__DuzeltilecekKayit = payload;
  },
  [todos__KaydetTamamMi]: (state, payload) => {
    state.todos__KaydetTamamMi = payload;
  },
  [todos__DuzeltmeTamamMi]: (state, payload) => {
    state.todos__DuzeltmeTamamMi = payload;
  },
  [todos__SilTamamMi]: (state, payload) => {
    state.todos__SilTamamMi = payload;
  },
  [todos__KayitDialog]: (state, payload) => {
    state.todos__KayitDialog = payload;
  },
  [todos__DetayDialog]: (state, payload) => {
    state.todos__DetayDialog = payload;
  },
  [todos__KayitModu]: (state, payload) => {
    state.todos__KayitModu = payload;
  },
  [todos__KayitDialogKapat]: (state) => {
    state.todos__KayitDialog = false;
    state.todos__KayitModu = "";
  },
};

const actions = {
  [todos__Listesi]: ({ commit }) => {
    commit(todos__Listesi, []);
    EventBus.HttpApiTalebiYapPrms(talepNevleri.Get, "todos")
      .then(function (pNetice) {
        if (pNetice.Kayitlar) {
          commit(todos__Listesi, pNetice.Kayitlar);
        }
      })
      .catch(function (pHata) {
        store.commit(umumiHata, pHata);
      });
  },
  [todos__Kaydet]: ({ commit, getters }, payload) => {
    EventBus.HttpApiTalebiYapPrms(talepNevleri.Post, "todos", payload)
      .then(function (pNetice) {
        if (pNetice.Netice == neticeNevleri.Tamam) {
          commit(
            "todos__Listesi",
            Ensar.Diziler.diziyeElemanEkleSirala(
              getters.todos__Listesi,
              pNetice.Kayitlar,
              "task",
              true
            )
          );
          commit(todos__KaydetTamamMi, true);
          ToastSuccess("Kay??t yap??ld??.");
          commit(todos__KayitDialogKapat);
        } else {
          store.commit(umumiHata, "Kay??t yap??lamad??!");
          commit(todos__KaydetTamamMi, pNetice.Mesaj);
        }
      })
      .catch(function (pHata) {
        store.commit(umumiHata, pHata);
        commit(todos__KaydetTamamMi, pHata);
      });
  },
  [todos__Guncelle]: ({ commit, getters }, payload) => {
    EventBus.HttpApiTalebiYapPrms(talepNevleri.Put, "todos/" + payload.id, payload)
      .then(function (pNetice) {
        if (pNetice.Netice == neticeNevleri.Tamam) {
          commit(
            "todos__Listesi",
            Ensar.Diziler.dizininElemaniniGuncelleSirala(
              getters.todos__Listesi,
              pNetice.Kayitlar,
              "task", true
            )
          );
          commit(todos__DuzeltmeTamamMi, true);
          ToastSuccess("Kay??t g??ncellendi.");
          commit(todos__KayitDialogKapat);
        } else {
          store.commit(umumiHata, "Kay??t G??ncellenemedi!");
          commit(todos__DuzeltmeTamamMi, pNetice.Mesaj);
        }
      })
      .catch(function (pHata) {
        store.commit(umumiHata, pHata);
        commit(todos__DuzeltmeTamamMi, pHata);
      });
  },

  [todos__Sil]: ({ commit, getters }, payload) => {
    EventBus.HttpApiTalebiYapPrms(
      talepNevleri.Delete, "todos/" + payload.id, payload
    )
      .then(function (pNetice) {
        if (pNetice.Netice == neticeNevleri.Tamam) {
          commit(
            "todos__Listesi",
            Ensar.Diziler.dizidenElemanSil(
              getters.todos__Listesi,
              payload,
              "id"
            )
          );
          commit(todos__SilTamamMi, true);
          ToastSuccess("Kay??t silindi.");
        } else {
          store.commit(umumiHata, "Kay??t Silininemedi!");
          commit(todos__SilTamamMi, pNetice.Mesaj);
        }
      })
      .catch(function (pHata) {
        store.commit(umumiHata, pHata);
        commit(todos__SilTamamMi, pHata);
      });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

