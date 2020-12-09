class ImageLoader {
  constructor(src) {
    this._image = new Image();
    this._image.src = src;
  }

  getImage() {
    return this._image;
  }
}

export default ImageLoader;