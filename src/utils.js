const elHasClass = (el, toFind) => {
  let cls = el.className;
  cls = cls && cls.toString();
  if (cls && cls.split(' ').indexOf(toFind) >= 0) return 1;
}

export {
  elHasClass
}
