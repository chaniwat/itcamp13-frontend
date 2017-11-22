export class GalleryBlock {

  /**
   * params:
   *  - block: JQuery DOM => Gallery block DOM
   */
  constructor(block) {
    this.block = block;

    this.gallery = new Masonry('.grid', {
      initLayout: false,

      itemSelector: '.grid-item',
      fitWidth: true,
      columnWidth: 240,
      gutter: 10,
    });
  }

  registerAfterRender() {
    this.gallery.layout();
  }

}
