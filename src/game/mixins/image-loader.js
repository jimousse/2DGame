const ImageLoader = base => {
    return class extends base {
      constructor(config) {
        super(config);
        this._image = new Image();
        this._image.src = config.src;
      }

      getImage() {
        return this._image;
      }
  };
};

export default ImageLoader;