class ImageLoader {
  constructor(src, onLoadCallback) {
    this._image = new Image();
    this._image.src = src;
    if (onLoadCallback) {
      this._image.onload = onLoadCallback;
    }
  }

  getImage() {
    return this._image;
  }
}

export default ImageLoader;