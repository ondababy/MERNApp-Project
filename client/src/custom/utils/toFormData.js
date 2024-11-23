const toFormData = (values) => {
  const formData = new FormData();

  const appendFormData = (data, root = '') => {
    if (data instanceof File) {
      formData.append(root, data);
    } else if (data instanceof FileList) {
      Array.from(data).forEach((file, index) => {
        formData.append(`${root}`, file);
      });
    } else if (Array.isArray(data)) {
      data.forEach((item, index) => {
        appendFormData(item, `${root}`);
      });
    } else if (data && typeof data === 'object') {
      formData.append(root, JSON.stringify(data));
    } else {
      formData.append(root, data);
    }
  };

  Object.entries(values).forEach(([key, value]) => {
    appendFormData(value, key);
  });

  return formData;
};

export { toFormData };
