import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import swal from "sweetalert2";

Vue.use(VueSweetalert2);

export const Toast3 = swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  confirmButtonText: 'Tamam',
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", swal.stopTimer);
    toast.addEventListener("mouseleave", swal.resumeTimer);
  },
});

export const Toast5 = swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: true,
  confirmButtonText: 'Tamam',
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", swal.stopTimer);
    toast.addEventListener("mouseleave", swal.resumeTimer);
  },
});
