export class CampBlock {

  /**
   * params:
   *  - block: JQuery DOM => Camp block DOM
   */
  constructor(block) {
    this.block = block;

    // Navigation bar for camp-block
    this.navigation = block.find('.camp-nav');
    this.navigation.all = this.navigation.find('li');
    this.navigation.app = this.navigation.find('.app');
    this.navigation.game = this.navigation.find('.game');
    this.navigation.network = this.navigation.find('.network');
    this.navigation.iot = this.navigation.find('.iot');
    this.navigation.datasci = this.navigation.find('.datasci');

    // All .slide-linker => register inner-link
    this.linker = block.find('.slide-link');
    this.linker.each((i, e) => { $(e).click(this.navigateToSlide.bind(this, $(e).data('target'))); });
  }

  registerOnSlideLeave(anchorLink, index, slideIndex, direction, nextSlideIndex) {
    // Hide/Show the navigation
    if(nextSlideIndex == 0) {
      this.navigation.addClass('hide');
    } else {
      this.navigation.removeClass('hide');
    }

    // Remove active & current camp slide class to block
    this.block.removeClass((i, className) => {
        return (className.match(/[a-zA-Z]+-camp/g) || []).join(' ');
    });
    this.navigation.all.removeClass('active');

    // Add active & current camp slide class to block
    switch (nextSlideIndex) {
      case 1:
        this.navigation.app.addClass('active');
        this.block.addClass('app-camp');
        break;
      case 2:
        this.navigation.game.addClass('active');
        this.block.addClass('game-camp');
        break;
      case 3:
        this.navigation.network.addClass('active');
        this.block.addClass('network-camp');
        break;
      case 4:
        this.navigation.iot.addClass('active');
        this.block.addClass('iot-camp');
        break;
      case 5:
        this.navigation.datasci.addClass('active');
        this.block.addClass('datasci-camp');
        break;
    }
  }

  navigateToSlide(target) {
    $.fn.fullpage.moveTo('camp-block', target);
  }

}
