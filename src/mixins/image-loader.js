class ImageLoader {
  constructor({ src }) {
    this._image = new Image();
    this._image.src = src;
  }

  setOnLoad(callback) {
    this._image.onload = callback;
  }

  getImage() {
    return this._image;
  }
}

export default ImageLoader;