import Vue from "vue";
import axios from "axios";
import moment from "moment";
import store from "./../store/index";

Vue.prototype.moment = moment;
Vue.prototype.$http = axios;

axios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("authenticated");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    //console.log("axios.interceptors.request.use...(error)..: ", error);
    return Promise.reject("Hata: " + error);
  }
);

export const talepNevleri = {
  Post: "Post",
  Get: "Get",
  Delete: "Delete",
  Put: "Put",
  Dosya: "Dosya",
};

export const neticeNevleri = {
  Tamam: "Tamam.",
  Hata: "Hata!",
  Ihtar: "İhtar!",
};

export const EventBus = new Vue({
  name: "EventBus",
  methods: {
    HataGoster: function (pHata) {
      store.commit("umumi/umumiHata", pHata);
    },
    /* ************** Promise Http Talepleri ************** */
    HttpApiTalebiYapPrmsNeticeOlustur(pHataVarMi, pResult) {
      let netice = "";
      if (pHataVarMi) {
        this.HataGoster(pResult);
      } else {
        netice = pResult;
      }
      return netice;
    },

    HttpApiTalebiYapPrmsThenNetice(result, pAdres, pBlob = false) {
      //console.log("HttpApiTalebiYapPrmsThenNetice...(Adres, Result)..: ", pAdres + '\n', result);
      let netice = { Durum: "Boş..............." };
      if (result.status == 200) {
        if (result.data.Netice === neticeNevleri.Tamam) {
          //console.log("if (result.data.Netice === neticeNevleri.Tamam) {")
          //console.log("Kayitlar")
          //console.log(result.data.Kayitlar)
          if (result.data.Kayitlar) {
            //console.log("if (result.data.Kayitlar) {  ")
            netice = this.HttpApiTalebiYapPrmsNeticeOlustur(
              false,
              result.data,
              pAdres
            );
          } else {
            netice = this.HttpApiTalebiYapPrmsNeticeOlustur(
              true,
              result,
              pAdres
            );
          }
        } else {//if (result.data.Netice === neticeNevleri.Tamam) {
          if (pBlob == true) {
            if (result) {
              netice = this.HttpApiTalebiYapPrmsNeticeOlustur(
                false,
                result,
                pAdres
              );
            } else {
              netice = this.HttpApiTalebiYapPrmsNeticeOlustur(
                true,
                result,
                pAdres
              );
            }
          } else {
            if (result.data.Netice === neticeNevleri.Hata) {
              console.log("Hatam var!")
              console.log(result.data.Netice)
              if (result.data.Hata == "Bozuk token.") {
                store.dispatch("auth/AUTH_LOGOUT");
                return;
              }
              if (result.data.Hata == "Talebiniz token içermiyor.") {
                store.dispatch("auth/AUTH_LOGOUT");
                return;
              }
              netice = this.HttpApiTalebiYapPrmsNeticeOlustur(
                true,
                result.data.Hata,
                pAdres
              );
            } else {
              netice = this.HttpApiTalebiYapPrmsNeticeOlustur(
                true,
                result.data,
                pAdres
              );
            }
          }
        }
      } else {
        console.log("if (result.status == 200) { } else")
        console.log(result.status)
        netice = this.HttpApiTalebiYapPrmsNeticeOlustur(
          true,
          { Status: result.status },
          pAdres
        );
      }
      return netice;
    },

    HttpApiTalebiYapPrmsCatchNetice(error, pAdres) {
      console.log("HttpApiTalebiYapPrmsCatchNetice(error, Adres)...: ");
      console.log(error);
      console.log(pAdres);

      this.HataGoster(error);
      if (error.response) {
        if (error.response.status === 401) {
          console.log(
            "HttpApiTalebiYapPrmsCatchNetice...: 'error.response.status : 401'"
          );
          //burayı biraz daha düşünmek lazım.
          store.dispatch("GiriseGonder");
        }
      }
      return error;
    },

    HttpApiTalebiYapPrms(pTalepNevi, pAdres, pGidecekVeriler) {
      this.HataGoster("");
      return new Promise((resolve, reject) => {
        let adres = store.getters["umumi/restApiApi"] + pAdres;
        //console.log("HttpApiTalebiYapPrms........(Adres): ", adres);
        //console.log("HttpApiTalebiYapPrms........(pTalepNevi): ", pTalepNevi);
        //console.log("HttpApiTalebiYapPrms........(pVeriler): ", pVeriler);
        switch (pTalepNevi) {
          case talepNevleri.Post:
            EventBus.$http
              .post(adres, pGidecekVeriler)
              .then((result) => {
                {
                  //console.log("post then")
                  resolve(EventBus.HttpApiTalebiYapPrmsThenNetice(result, adres));
                }
              })
              .catch((error) =>
                reject(EventBus.HttpApiTalebiYapPrmsCatchNetice(error, adres))
              );
            break;
          case talepNevleri.Put:
            EventBus.$http
              .put(adres, pGidecekVeriler)
              .then((result) =>
                resolve(EventBus.HttpApiTalebiYapPrmsThenNetice(result, adres))
              )
              .catch(function (mError) {
                reject(EventBus.HttpApiTalebiYapPrmsCatchNetice(mError, adres));
              });

            break;
          case talepNevleri.Get:
            EventBus.$http
              .get(adres)
              .then((result) => {
                //console.log("get then..........................: ")
                resolve(EventBus.HttpApiTalebiYapPrmsThenNetice(result))
              })
              .catch((error) => {
                //console.log(".catch((error) => { ....................................: ")
                reject(EventBus.HttpApiTalebiYapPrmsCatchNetice(error));
              }
              );
            break;
          case talepNevleri.Delete:
            EventBus.$http
              .delete(adres, { data: { id: pGidecekVeriler.id } })
              .then((result) => {
                resolve(EventBus.HttpApiTalebiYapPrmsThenNetice(result, adres));
              })
              .catch((error) => {
                reject(EventBus.HttpApiTalebiYapPrmsCatchNetice(error, adres));
              });
            break;
          case talepNevleri.Dosya:
            EventBus.$http({
              url: adres,
              method: "POST",
              responseType: "blob",
              data: pGidecekVeriler,
            })
              .then((result) =>
                resolve(
                  EventBus.HttpApiTalebiYapPrmsThenNetice(result, adres, true)
                )
              )
              .catch((error) =>
                reject(
                  EventBus.HttpApiTalebiYapPrmsCatchNetice(error, adres, true)
                )
              );
            break;
        }
      });
    },
    /* BİTİŞ ****************************************** Promise Http Talepleri */

    /**
     *
     * @param {*} pTalepNevi
     * @param {*} pAdres
     * @param {*} pGonderilecekVeriler
     * @param {*} callback
     */
    HttpApiTalebiYap: function (
      pTalepNevi,
      pAdres,
      pGonderilecekVeriler,
      callback
    ) {

      this.hataVar = false;
      //console.log("HttpApiTalebiYap");
      //console.log(store.getters["umumi/restApiRoot"]);
      pAdres = store.getters["umumi/restApiApi"] + pAdres;
      //console.log("HttpApiTalebiYap....(adres): ", pAdres);
      switch (pTalepNevi) {
        case talepNevleri.Post:
        case talepNevleri.Put:
          this.PostPutTalebiYap(
            pTalepNevi,
            pAdres,
            pGonderilecekVeriler,
            callback,
            this.HataCallBack
          );
          //console.log("Talep Nevi : " + pTalepNevi);
          break;
        case talepNevleri.Get:
        case talepNevleri.Delete:
          this.GetTalebiYap(pAdres, callback, this.HataCallBack);
          break;
        case talepNevleri.Dosya:
          this.DosyaTalebiYap(
            pAdres,
            pGonderilecekVeriler,
            callback,
            this.HataCallBack
          );
          break;
      }
      return null;
    },
    HataCallBack: function (pTalepNevi, error, callback) {
      //console.log(pTalepNevi + " catch");
      //console.log(error);
      if (error.response) {
        if (error.response.status === 401) {
          //console.log("error.response.status : 401");
          //this.DegiskenleriSifirla();
          window.location.href = "/";
        }
      }
      callback(true, error);
    },
    TalepTamamlandi: function (pTalepNevi, result, callback) {
      //console.log("Vecih........: ", pTalepNevi);
      //console.log("result.status........: ", result.status);
      if (result.status == 200) {
        //console.log(result.data);
        if (result.data.Netice === neticeNevleri.Tamam) {
          //console.log(pTalepNevi, ", Tamam");
          //console.log("result.data.Kayitlar....: ", result.data.Kayitlar);
          if (result.data.Kayitlar) {
            //console.log("if (result.data.Kayitlar)");
            callback(false, result.data.Kayitlar);
          } else {
            callback(false, result);
          }
        } else {
          callback(false, result);
        }
        if (result.data.Netice === neticeNevleri.Hata) {
          //console.log("Post, Hata!");
          callback(true, result.data);
        }
      } else {
        callback(true, result.status);
        //console.log("Post, result.status != 200");
      }
    },
    PostPutTalebiYap: function (
      pTalepNevi,
      pAdres,
      pVeriler,
      callback,
      HataCallBack
    ) {
      if (pTalepNevi === talepNevleri.Post) {
        this.$http
          .post(pAdres, pVeriler)
          .then((result) => this.TalepTamamlandi(pTalepNevi, result, callback))
          .catch((error) => HataCallBack(pTalepNevi, error, callback));
      }
      if (pTalepNevi === talepNevleri.Put) {
        this.$http
          .put(pAdres, pVeriler)
          .then((result) => this.TalepTamamlandi(pTalepNevi, result, callback))
          .catch((error) => HataCallBack(pTalepNevi, error, callback));
      }
    },
    GetTalebiYap: function (pAdres, callback, HataCallBack) {
      this.$http
        .get(pAdres)
        .then((result) =>
          this.TalepTamamlandi(talepNevleri.Get, result, callback)
        )
        .catch((error) => HataCallBack(talepNevleri.Post, error, callback));
    },
    DosyaTalebiYap: function (pAdres, pVeriler, callback, HataCallBack) {
      this.$http({
        url: pAdres,
        method: "POST",
        responseType: "blob",
        data: pVeriler,
      })
        .then((result) =>
          this.TalepTamamlandi(talepNevleri.Dosya, result, callback)
        )
        .catch((error) => HataCallBack(talepNevleri.Post, error, callback));
    },
  },
});
