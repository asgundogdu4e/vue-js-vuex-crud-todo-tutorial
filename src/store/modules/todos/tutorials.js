import { EventBus, talepNevleri, neticeNevleri } from "../../../app/event";
import { ToastSuccess } from "@/assets/js/vue-toastification";
import Ensar from "@/ktb/index";

import store from "../../index";
import { umumiHata } from "../../statics/const_umumi";
import {
  tutorials__Listesi,
  tutorials__BosKayit,
  tutorials__DuzeltilecekKayit,
  tutorials__KaydetTamamMi,
  tutorials__DuzeltmeTamamMi,
  tutorials__SilTamamMi,
  tutorials__Kaydet,
  tutorials__Guncelle,
  tutorials__Sil,
  tutorials__KayitDialog,
  tutorials__DetayDialog,
  tutorials__KayitModu,
  tutorials__KayitDialogKapat,
} from "../../statics/const_tutorials";

const state = {
  tutorials__Listesi: [],
  tutorials__KaydetTamamMi: false,
  tutorials__DuzeltmeTamamMi: false,
  tutorials__SilTamamMi: false,
  tutorials__KayitDialog: false,
  tutorials__DetayDialog: false,
  tutorials__KayitModu: "",
  tutorials__DuzeltilecekKayit: {},
  tutorials__BosKayit: {
    title: "",
    description: "",
    published: false,
  },
};

const getters = {
  [tutorials__BosKayit]: (state) => {
    return state.tutorials__BosKayit;
  },
  [tutorials__DuzeltilecekKayit]: (state) => {
    return state.tutorials__DuzeltilecekKayit;
  },
  [tutorials__Listesi]: (state) => {
    return state.tutorials__Listesi;
  },
  [tutorials__KaydetTamamMi]: (state) => {
    return state.tutorials__KaydetTamamMi;
  },
  [tutorials__SilTamamMi]: (state) => {
    return state.tutorials__SilTamamMi;
  },
  [tutorials__KayitDialog]: (state) => {
    return state.tutorials__KayitDialog;
  },
  [tutorials__DetayDialog]: (state) => {
    return state.tutorials__DetayDialog;
  },
  [tutorials__KayitModu]: (state) => {
    return state.tutorials__KayitModu;
  },
};

const mutations = {
  [tutorials__Listesi]: (state, payload) => {
    state.tutorials__Listesi = payload;
  },
  [tutorials__DuzeltilecekKayit]: (state, payload) => {
    state.tutorials__DuzeltilecekKayit = payload;
  },
  [tutorials__KaydetTamamMi]: (state, payload) => {
    state.tutorials__KaydetTamamMi = payload;
  },
  [tutorials__DuzeltmeTamamMi]: (state, payload) => {
    state.tutorials__DuzeltmeTamamMi = payload;
  },
  [tutorials__SilTamamMi]: (state, payload) => {
    state.tutorials__SilTamamMi = payload;
  },
  [tutorials__KayitDialog]: (state, payload) => {
    state.tutorials__KayitDialog = payload;
  },
  [tutorials__DetayDialog]: (state, payload) => {
    state.tutorials__DetayDialog = payload;
  },
  [tutorials__KayitModu]: (state, payload) => {
    state.tutorials__KayitModu = payload;
  },
  [tutorials__KayitDialogKapat]: (state) => {
    state.tutorials__KayitDialog = false;
    state.tutorials__KayitModu = "";
  },
};

const actions = {
  [tutorials__Listesi]: ({ commit }) => {
    commit(tutorials__Listesi, []);
    EventBus.HttpApiTalebiYapPrms(talepNevleri.Get, "tutorials")
      .then(function (pNetice) {
        if (pNetice.Kayitlar) {
          commit(tutorials__Listesi, pNetice.Kayitlar);
        }
      })
      .catch(function (pHata) {
        store.commit(umumiHata, pHata);
      });
  },
  [tutorials__Kaydet]: ({ commit, getters }, payload) => {
    EventBus.HttpApiTalebiYapPrms(talepNevleri.Post, "tutorials", payload)
      .then(function (pNetice) {
        if (pNetice.Netice == neticeNevleri.Tamam) {
          let yeniKayit = pNetice.Kayitlar;
          commit(
            "tutorials__Listesi",
            Ensar.Diziler.diziyeElemanEkleSirala(
              getters.tutorials__Listesi,
              yeniKayit,
              "title",
              true
            )
          );
          commit(tutorials__KaydetTamamMi, true);
          ToastSuccess("Kayıt yapıldı.");
          commit(tutorials__KayitDialogKapat);
        } else {
          store.commit(umumiHata, "Kayıt yapılamadı!");
          commit(tutorials__KaydetTamamMi, pNetice.Mesaj);
        }
      })
      .catch(function (pHata) {
        store.commit(umumiHata, pHata);
        commit(tutorials__KaydetTamamMi, pHata);
      });
  },
  [tutorials__Guncelle]: ({ commit, getters }, payload) => {
    EventBus.HttpApiTalebiYapPrms(talepNevleri.Put, "tutorials/" + payload.id, payload)
      .then(function (pNetice) {
        if (pNetice.Netice == neticeNevleri.Tamam) {
          console.log(pNetice.Kayitlar);
          commit(
            "tutorials__Listesi",
            Ensar.Diziler.dizininElemaniniGuncelleSirala(
              getters.tutorials__Listesi,
              pNetice.Kayitlar,
              "title", true
            )
          );
          commit(tutorials__DuzeltmeTamamMi, true);
          ToastSuccess("Kayıt güncellendi.");
          commit(tutorials__KayitDialogKapat);
        } else {
          store.commit(umumiHata, "Kayıt Güncellenemedi!");
          commit(tutorials__DuzeltmeTamamMi, pNetice.Mesaj);
        }
      })
      .catch(function (pHata) {
        store.commit(umumiHata, pHata);
        commit(tutorials__DuzeltmeTamamMi, pHata);
      });
  },

  [tutorials__Sil]: ({ commit, getters }, payload) => {
    EventBus.HttpApiTalebiYapPrms(
      talepNevleri.Delete,
      "tutorials/" + payload.id,
      payload
    )
      .then(function (pNetice) {
        if (pNetice.Netice == neticeNevleri.Tamam) {
          commit(
            "tutorials__Listesi",
            Ensar.Diziler.dizidenElemanSil(
              getters.tutorials__Listesi,
              payload,
              "okytno"
            )
          );
          commit(tutorials__SilTamamMi, true);
          ToastSuccess("Kayıt silindi.");
        } else {
          store.commit(umumiHata, "Kayıt Silininemedi!");
          commit(tutorials__SilTamamMi, pNetice.Mesaj);
        }
      })
      .catch(function (pHata) {
        store.commit(umumiHata, pHata);
        commit(tutorials__SilTamamMi, pHata);
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

