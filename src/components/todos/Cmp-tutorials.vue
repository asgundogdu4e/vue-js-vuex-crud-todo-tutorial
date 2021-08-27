<template>
  <div>
    <b-modal v-model="tutorials__KayitDialog" hide-footer>
      <tutorialsEkleDuzelt></tutorialsEkleDuzelt>
    </b-modal>
    <b-card
      border-variant="secondary"
      header-bg-variant="secondary"
      header-text-variant="white"
    >
      <template v-slot:header>
        <b-row>
          <b-col class="float-left" cols="6">
            <span class="spanBaslik"></span>
          </b-col>
          <b-col class="float-right" cols="6">
            <b-row>
              <b-col cols="8">
                <b-form-input
                  v-model="aranacak"
                  type="text"
                  placeholder="Arama..."
                ></b-form-input>
              </b-col>
              <b-col cols="4">
                <b-button
                  variant="dark"
                  class="pull-right"
                  @click="yeniKayitHazirla()"
                >
                  <b-icon icon="file-plus-fill"></b-icon>
                  Yeni Kayıt</b-button
                >
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </template>
      <template v-slot:footer></template>
      <b-table
        striped
        hover
        :items="tutorials__Listesi"
        :fields="fields"
        :filter="aranacak"
        sticky-header
        style="min-height: 600px"
      >
        <template #cell(published)="row">
          <b-form-checkbox
            v-model="row.item.published"
            onclick="return false;"
          ></b-form-checkbox>
        </template>
        <template #cell(actions)="row">
          <div class="svgler">
            <b-icon
              icon="pencil-square"
              variant="primary"
              @click="kaydiDuzenlemeyeHazirla(row.item)"
            ></b-icon>
            <b-icon
              icon="trash"
              variant="danger"
              @click="kaydiSilmeyeHazirla(row.item)"
            ></b-icon>
          </div>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
import Ensar from "@/ktb/index";
import tutorialsEkleDuzelt from "./Cmp-tutorialsEkleDuzelt.vue";

import {
  tutorials__Listesi,
  tutorials__DetayDialog,
  tutorials__BosKayit,
} from "./../../store/statics/const_tutorials";

import {
  modKayitEkleme,
  modKayitDuzeltme,
} from "./../../store/statics/const_umumi";

import { mapGetters } from "vuex";
export default {
  name: "Cmp-tutorials.vue",
  components: {
    tutorialsEkleDuzelt,
  },
  data: () => ({
    aranacak: "",
    fields: [
      { key: "title", label: "" },
      { key: "description", label: "" },
      { key: "published", label: "" },
      { key: "actions", label: "İşlemler" },
    ],
  }),
  computed: {
    ...mapGetters("tutorials", [
      tutorials__Listesi,
      tutorials__DetayDialog,
      tutorials__BosKayit,
    ]),
    tutorials__KayitDialog: {
      get: function () {
        return this.$store.getters["tutorials/tutorials__KayitDialog"];
      },
      set: function (newValue) {
        this.$store.commit("tutorials/tutorials__KayitDialog", newValue);
      },
    },
  },
  created: function () {
    this.initialize();
  },
  mounted() {},
  methods: {
    kaydiSilmeyeHazirla(kayit) {
      this.$swal
        .fire({
          text: 'Bu kaydı "DETAY KAYITLARIYLA BERABER" silmek istediğinizden emin misiniz?',
          title: "Emin misiniz?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: `Evet !`,
          confirmButtonColor: "#d33",
          cancelButtonText: `Hayır`,
          cancelButtonColor: "#3085d6",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$store.dispatch("tutorials/tutorials__Sil", kayit);
          } /*else if (result.isDismissed) {
            this.$swal.fire("Silinmedi.", "", "success");
          }*/
        });
    },
    turkceTarih(pTrh) {
      return Ensar.Tarih.tarihStandartDanTurkce(pTrh);
    },
    initialize() {
      this.$store.dispatch("tutorials/tutorials__Listesi");
    },
    formuGosterGizle(pDialog, pMod) {
      this.$store.commit("tutorials/tutorials__KayitDialog", pDialog);
      this.$store.commit("tutorials/tutorials__KayitModu", pMod);
    },
    yeniKayitHazirla() {
      this.$store.commit(
        "tutorials/tutorials__DuzeltilecekKayit",
        this.tutorials__BosKayit
      );
      this.formuGosterGizle(true, modKayitEkleme);
    },
    kaydiDuzenlemeyeHazirla(item) {
      this.$store.commit("tutorials/tutorials__DuzeltilecekKayit", item);
      this.formuGosterGizle(true, modKayitDuzeltme);
    },
  },
};
</script>
