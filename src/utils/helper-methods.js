const objects = {
  deleteEmptyProps(obj = {}) {
    obj.keys(obj).forEach(
      (key) => (
        obj[key] == null || obj[key] === '' || obj[key] === false
      )
        && delete obj[key]
    );
  }
};

export default { objects };
