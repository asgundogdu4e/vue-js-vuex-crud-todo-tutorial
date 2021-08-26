<template>
  <div>
    <b-modal v-model="todos__KayitDialog" hide-footer>
      <todosEkleDuzelt></todosEkleDuzelt>
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
        :items="todos__Listesi"
        :fields="fields"
        :filter="aranacak"
        sticky-header
        style="min-height: 600px"
      >
        <template #cell(completed)="row">
          <b-form-checkbox
            v-model="row.item.completed"
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
import Ensar from "./../../ktb";
import todosEkleDuzelt from "./Cmp-todosEkleDuzelt.vue";
import {
  modKayitEkleme,
  modKayitDuzeltme,
} from "./../../store/statics/const_umumi";
import {
  todos__Listesi,
  todos__BosKayit,
  todos__KayitDialog,
} from "./../../store/statics/const_todos";

import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Cmp-todos.vue",
  components: {
    todosEkleDuzelt,
  },
  data: () => ({
    aranacak: "",
    fields: [
      { key: "task", label: "" },
      { key: "description", label: "" },
      { key: "completed", label: "" },
      { key: "actions", label: "İşlemler" },
    ],
  }),
  computed: {
    ...mapGetters("todos", [
      todos__Listesi,
      todos__BosKayit,
      todos__KayitDialog,
    ]),
  },
  created: function () {
    this.initialize();
  },
  mounted() {},
  methods: {
    ...mapMutations("todos", [todos__KayitDialog]),

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
            this.$store.dispatch("todos/todos__Sil", kayit);
          } /*else if (result.isDismissed) {
            this.$swal.fire("Silinmedi.", "", "success");
          }*/
        });
    },
    turkceTarih(pTrh) {
      return Ensar.Tarih.tarihStandartDanTurkce(pTrh);
    },
    initialize() {
      this.$store.dispatch("todos/todos__Listesi");
    },
    formuGosterGizle(pDialog, pMod) {
      this.todos__KayitDialog(pDialog);
      this.$store.commit("todos/todos__KayitModu", pMod);
    },
    yeniKayitHazirla() {
      this.$store.commit(
        "todos/todos__DuzeltilecekKayit",
        this.todos__BosKayit
      );
      this.formuGosterGizle(true, modKayitEkleme);
    },
    kaydiDuzenlemeyeHazirla(item) {
      this.$store.commit("todos/todos__DuzeltilecekKayit", item);
      this.formuGosterGizle(true, modKayitDuzeltme);
    },
  },
};
</script>
