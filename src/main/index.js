import { NavigationBar, SideBar } from './navigation';

// blocks
import { CampBlock } from './block';

export class MainApp {

  constructor() {
    this.initNavigation();
    this.initBlocks();
    this.initFullPageJS();
  }

  initNavigation() {
    let navbar = $('nav.navbar');
    let sidebar = $('nav.sidebar');

    this.navigationBar = new NavigationBar(navbar);
    this.sideBar = new SideBar(sidebar);
  }

  initBlocks() {
    this.blocks = {
      camp: new CampBlock($(".camp-block"))
    };
  }

  initFullPageJS() {
    let registerOnLeave = (index, nextIndex, direction) => {
      this.navigationBar.registerOnLeave(index, nextIndex, direction);
      this.sideBar.registerOnLeave(index, nextIndex, direction);
    };

    let registerOnSlideLeave = (anchorLink, index, slideIndex, direction, nextSlideIndex) => {
      this.blocks.camp.registerOnSlideLeave(anchorLink, index, slideIndex, direction, nextSlideIndex);
    };

    // Initialize FullPage.js
    $(document).ready(() => {
      $('#fullpage').fullpage({
        controlArrows: false,

        scrollOverflow: true,
        scrollOverflowReset: false,
        scrollOverflowOptions: {
          //keyBindings: true; // Bug if used with fullpage.js
        },

        onLeave: registerOnLeave,
        onSlideLeave: registerOnSlideLeave
      });
    });

    // ReBuild DOM When resize window
    $(window).resize(() => {
      $.fn.fullpage.reBuild();
    });
  }

  setDebug(debugHelper) {
    // Debugging
    this.debugHelper = debugHelper;

    // Navigation
    this.debugHelper.registerDebug(this.navigationBar);
    this.debugHelper.registerDebug(this.sideBar);

    // Blocks
    this.debugHelper.registerDebug(this.blocks.camp);
  }

}
