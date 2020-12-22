function MultiMixins(mixins) {
  let _mixins = mixins;
  if (!Array.isArray(mixins)) {
    _mixins = [ mixins ];
  }

  let _class = class {};
  _mixins.forEach(mixin => {
    _class = mixin(_class);
  });

  return _class;
}

export default MultiMixins;