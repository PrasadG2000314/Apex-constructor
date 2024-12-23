import Swal from 'sweetalert2';

export const userTypes = {
  ADMIN: 'admin',
  CUSTOMER: "customer",
  EMPLOYEE: "employee",
  HR_MANAGER: "hr manager",
  FINANCE_MANAGER: "finance manager",
  FLEET_MANAGER: "fleet manager",
  INVENTORY_CONTROLLER: "inventory controller",
  SITE_MANAGER: "site manager",
  PROJECT_MANAGER: "project manager",
  CUSTOMER_RELATIONSHIP_MANAGER: "customer relationship manager",
  DRIVER: "driver",
  WORKER: "worker"
};

const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

export function timedSuccessAlert(content) {
  Toast.fire({
    icon: "success",
    title: content
  });
}

export function errorAlert(content) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: content,
    confirmButtonColor: "#ff5200"
  });
}