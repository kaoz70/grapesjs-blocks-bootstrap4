const elHasClass = (el, toFind) => {
  let cls = el.className;
  cls = cls && cls.toString();
  if (cls && cls.split(' ').indexOf(toFind) >= 0) return 1;
};

const capitalize = (phrase) => {
  return phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
};

export {
  elHasClass,
  capitalize,
}
