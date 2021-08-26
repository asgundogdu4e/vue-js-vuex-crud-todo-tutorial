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
        <b-col cols="4">
          <b-form-group
            id="input-group-task"
            label="** :"
            label-for="input-task"
          >
            <b-form-input
              id="input-task"
              v-model="$v.kayit.task.$model"
              required
              placeholder="** "
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-description"
            label=":"
            label-for="input-description"
          >
            <b-form-input
              id="input-description"
              v-model="kayit.description"
              placeholder=""
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group id="input-group-completed">
            <b-form-checkbox v-model="$v.kayit.completed.$model"
              >**
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
import Ensar from "./../../ktb";
import { required } from "vuelidate/lib/validators";
import {
  //modKayitEkleme,
  modKayitDuzeltme,
} from "./../../store/statics/const_umumi";
import {
  todos__KayitModu,
  todos__KayitDialog,
  todos__BosKayit,
  todos__Listesi,
  todos__DuzeltilecekKayit,
} from "./../../store/statics/const_todos";
import { mapGetters } from "vuex";
export default {
  name: "Cmp-todos_EkleDuzelt.vue",
  data: () => ({
    kayit: {},
  }),
  computed: {
    ...mapGetters("todos", [
      todos__Listesi,
      todos__KayitDialog,
      todos__KayitModu,
      todos__BosKayit,
      todos__DuzeltilecekKayit,
    ]),
    formTitle() {
      console.log("this.todos__KayitModu");
      console.log(this.todos__KayitModu);
      /* if (this.todos__KayitModu == modKayitEkleme) {
        this.yeniKayitHazirla();
        return "Yeni  Kayıt";
      }
      if (this.todos__KayitModu == modKayitDuzeltme) {
        this.kaydiDuzenlemeyeHazirla();
        return " Kayıt Düzeltme";
      }
  */
      return "Kayıt Modu Tesbit Edilemedi!!!";
    },
  },
  methods: {
    formuKapat() {
      this.$store.commit("todos/todos__KayitDialogKapat");
    },
    iptal() {
      this.formuKapat();
    },
    tarihValidEt: (pStrTarih) => {
      return Ensar.Tarih.strStandartTarihiTeyidEt(pStrTarih);
    },
    yeniKayitHazirla() {
      this.kayit = Ensar.Nesne.klonla(this.todos__BosKayit);
    },
    kaydiDuzenlemeyeHazirla() {
      this.kayit = Ensar.Nesne.klonla(this.todos__DuzeltilecekKayit);
    },
    kaydiSil(cevab) {
      if (cevab.silinsinMi == true) {
        this.$store.dispatch("todos/todos__Sil", cevab.kayit);
      }
    },
    kaydet(evt) {
      evt.preventDefault();
      if (this.todos__KayitModu == "umumiHata") {
        this.$store.dispatch("todos/todos__Kaydet", this.kayit);
      }
      if (this.todos__KayitModu == modKayitDuzeltme) {
        this.$store.dispatch("todos/todos__Guncelle", this.kayit);
      }
    },
  },
  validations: {
    kayit: {
      task: {
        required,
      },
      completed: {
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
