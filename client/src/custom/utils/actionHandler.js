import Swal from 'sweetalert2';

export const confirmAction = (message, icon = 'warning', onConfirm = () => {}, onCancel = () => {}) =>
  Swal.fire({
    title: 'Are you sure?',
    text: message || ' This action cannot be undone.',
    icon: icon || 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
  }).then((result) => {
    if (result.isConfirmed) {
      return onConfirm();
    } else {
      return onCancel();
    }
  });

export const success = (message) => {
  Swal.fire({
    title: 'Success',
    text: message,
    icon: 'success',
  });
};

export const error = (message) => {
  Swal.fire({
    title: 'Error',
    text: message,
    icon: 'error',
  });
};

export const info = (message) => {
  Swal.fire({
    title: 'Info',
    text: message,
    icon: 'info',
  });
};

export const warning = (message) => {
  Swal.fire({
    title: 'Warning',
    text: message,
    icon: 'warning',
  });
};

export const confirmDelete = (...rest) => {
  confirmAction('You are about to delete this record.', 'error', ...rest);
};

export const infoDelete = () => {
  info('Record deleted successfully.');
};

export const confirmSave = (...rest) => {
  confirmAction('You are about to save changes.', 'info', ...rest);
};

export const successSave = () => {
  success('Changes saved successfully.');
};

export const confirmLogout = (...rest) => {
  confirmAction('Leaving so soon?', 'info', ...rest);
};

export const confirmReset = (...rest) => {
  confirmAction('Resetting will clear all data.', 'info', ...rest);
};

