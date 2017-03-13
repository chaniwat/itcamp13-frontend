import { Navigation, SideBar } from './navigation';

// blocks
import { CampBlock, GalleryBlock } from './block';

export class MainApp {

  constructor() {
    this.initNavigation();
    this.initBlocks();
    this.initFullPageJS();

    window.states = {currentSection: 1};
  }

  initNavigation() {
    let navbar = $('nav.navbar');
    let sidenav = $('nav.sidenav');
    let sidebar = $('nav.sidebar');

    this.navigation = new Navigation(navbar, sidenav);
    this.sideBar = new SideBar(sidebar);
  }

  initBlocks() {
    this.blocks = {
      camp: new CampBlock($(".camp-block")),
      gallery: new GalleryBlock($(".gallery-block"))
    };
  }

  initFullPageJS() {
    let resizeHandler = () => {
      let wWidth = window.innerWidth;
      let wHeight = window.innerHeight;

      // Call navigation resize
      this.navigation.registerResize(wWidth, wHeight);

      // ReBuild DOM when resize window
      // Because some of handler change the DOM structure
      // so its need to rebuild the fullpage
      $.fn.fullpage.reBuild();
    }

    let registerAfterRender = () => {
      this.blocks.gallery.registerAfterRender();

      // Call resize for once for trigger anything that need dimension recalculate
      resizeHandler();
    };

    let registerOnLeave = (index, nextIndex, direction) => {
      window.states.currentSection = nextIndex;

      this.navigation.registerOnLeave(index, nextIndex, direction);
      this.sideBar.registerOnLeave(index, nextIndex, direction);
    };

    let registerOnSlideLeave = (anchorLink, index, slideIndex, direction, nextSlideIndex) => {
      this.blocks.camp.registerOnSlideLeave(anchorLink, index, slideIndex, direction, nextSlideIndex);
    };

    // Initialize FullPage.js
    $(document).ready(() => {
      $('#fullpage').fullpage({
        controlArrows: false,

        easingcss3: 'cubic-bezier(0.770, 0.000, 0.175, 1.000)',
        scrollingSpeed: 1200,
        scrollOverflow: true,
        scrollOverflowReset: false,
        scrollOverflowOptions: {
          //keyBindings: true; // Bug if used with fullpage.js
        },

        afterRender: registerAfterRender,
        onLeave: registerOnLeave,
        onSlideLeave: registerOnSlideLeave
      });
    });

    // window is resize
    $(window).resize(resizeHandler.bind(this));
  }

  setDebug(debugHelper) {
    // Debugging
    this.debugHelper = debugHelper;

    // Navigation
    this.debugHelper.registerDebug(this.navigation);
    this.debugHelper.registerDebug(this.sideBar);

    // Blocks
    this.debugHelper.registerDebug(this.blocks.camp);
  }

}
