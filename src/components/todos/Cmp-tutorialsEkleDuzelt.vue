<template>
  <b-card
    border-variant="primary"
    header-bg-variant="primary"
    header-text-variant="white"
  >
    <template v-slot:header>
      <h4 class="text-center">{{ formTitle }}</h4>
    </template>
    <b-form @submit.prevent="kaydet">
      <b-row>
        <b-col cols="12">
          <b-form-group
            id="input-group-title"
            label="Title** :"
            label-for="input-title"
          >
            <b-form-input
              id="input-title"
              v-model="$v.kayit.title.$model"
              required
              placeholder="Title"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-description"
            label="Description:"
            label-for="input-description"
          >
            <b-form-input
              id="input-description"
              v-model="kayit.description"
              placeholder="Description"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-published">
            <b-form-checkbox v-model="$v.kayit.published.$model">
              Published
            </b-form-checkbox>
          </b-form-group>
        </b-col>
      </b-row>
      <b-button class="butonlar" type="submit" variant="primary"
        >Kaydet</b-button
      >
      <b-button class="butonlar" @click="formuKapat()" variant="danger"
        >İptal</b-button
      >
    </b-form>
  </b-card>
</template>
<script>
import Ensar from "@/ktb/index";
import { required } from "vuelidate/lib/validators";
import {
  modKayitEkleme,
  modKayitDuzeltme,
} from "./../../store/statics/const_umumi";

import {
  tutorials__KayitModu,
  tutorials__KayitDialog,
  tutorials__BosKayit,
  tutorials__Listesi,
  tutorials__DuzeltilecekKayit,
} from "./../../store/statics/const_tutorials";
import { mapGetters } from "vuex";
export default {
  name: "Cmp-tutorials_EkleDuzelt.vue",
  data: () => ({
    kayit: {},
  }),
  computed: {
    ...mapGetters("tutorials", [
      tutorials__Listesi,
      tutorials__KayitDialog,
      tutorials__KayitModu,
      tutorials__BosKayit,
      tutorials__DuzeltilecekKayit,
    ]),
    formTitle() {
      if (this.tutorials__KayitModu == modKayitEkleme) {
        this.yeniKayitHazirla();
        return "Yeni  Kayıt";
      }
      if (this.tutorials__KayitModu == modKayitDuzeltme) {
        this.kaydiDuzenlemeyeHazirla();
        return " Kayıt Düzeltme";
      }
      return "Kayıt Modu Tesbit Edilemedi!!!";
    },
  },
  methods: {
    formuKapat() {
      this.$store.commit("tutorials/tutorials__KayitDialogKapat");
    },
    iptal() {
      this.formuKapat();
    },
    tarihGetir: (pTarih) => {
      const mTarih = /*moment*/ pTarih.format("DD.MM.YYYY");
      return mTarih == "Invalid date" ? "" : mTarih;
    },
    tarihValidEt: (pStrTarih) => {
      return Ensar.Tarih.strStandartTarihiTeyidEt(pStrTarih);
    },
    yeniKayitHazirla() {
      this.kayit = Ensar.Nesne.klonla(this.tutorials__BosKayit);
    },
    kaydiDuzenlemeyeHazirla() {
      this.kayit = Ensar.Nesne.klonla(this.tutorials__DuzeltilecekKayit);
    },
    kaydiSil(cevab) {
      if (cevab.silinsinMi == true) {
        this.$store.dispatch("tutorials/tutorials__Sil", cevab.kayit);
      }
    },
    kaydet(evt) {
      evt.preventDefault();
      if (this.tutorials__KayitModu == modKayitEkleme) {
        this.$store.dispatch("tutorials/tutorials__Kaydet", this.kayit);
      }
      if (this.tutorials__KayitModu == modKayitDuzeltme) {
        this.$store.dispatch("tutorials/tutorials__Guncelle", this.kayit);
      }
    },
  },
  validations: {
    kayit: {
      title: {
        required,
      },
      published: {
        required,
      },
    },
  },
};
</script>
<style scoped>
.butonlar {
  margin-right: 5px;
  width: 150px;
}
</style>
