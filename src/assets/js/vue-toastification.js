import Vue from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const options = {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true,
    position: "top-right",
    timeout: 5000,
    closeOnClick: false,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: false,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false
}

export const ToastSuccess = function (pMessage) {
    Vue.$toast.success(pMessage)
}

export const ToastError = function (pMessage) {
    Vue.$toast.error(pMessage)
}

Vue.use(Toast, options);