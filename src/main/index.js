import { Navigation, SideBar } from './navigation';

// blocks
import { CampBlock, GalleryBlock } from './block';

export class MainApp {

  constructor() {
    console.log('%c Eiei ^-^!!\n Develop by ITCAMP12&13 Web team w/ Lov3 <3 ', 'background: #222; color: #f442c5; font-size: 24px;');

    // Set detault
    window.default.scrollingSpeed = 1200;

    this.initNavigation();
    this.initBlocks();
    this.initFullPageJS();
    this.initSharer();

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
    this.sections = [
      $(".home-block"),
      $(".detail-block"),
      $(".supporter-block"),
      $(".camp-block"),
      $(".timeline-block"),
      $(".gallery-block"),
      $(".recommend-block"),
      $(".faq-block"),
    ];

    this.blocks = {
      camp: new CampBlock($(".camp-block")),
      gallery: new GalleryBlock($(".gallery-block"))
    };

    this.blocks.OnLeave = (index, nextIndex, direction) => {
      if(direction == 'down') {
        let nextSection = this.sections[nextIndex - 1];
        let iscroll = nextSection.find('.fp-scrollable').data('iscrollInstance');

        if (iscroll && typeof iscroll !== undefined) {
          iscroll.scrollTo(0, 0, 0);
        }
      } else if(direction == 'up') {
        let nextSection = this.sections[nextIndex - 1];
        let iscroll = nextSection.find('.fp-scrollable').data('iscrollInstance');
        let contentHeight = nextSection.find('.content').outerHeight();
        let offset = contentHeight - window.innerHeight;

        if (iscroll && typeof iscroll !== undefined) {
          if (offset > 0) {
            iscroll.scrollTo(0, -offset, 0);
          } else {
            iscroll.scrollTo(0, 0, 0);
          }
        }
      }
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

    let registerAfterLoad = (anchorLink, index) => {

    }

    let registerAfterRender = () => {
      this.blocks.gallery.registerAfterRender();

      // Call resize for once for trigger anything that need dimension recalculate
      resizeHandler();

      // FadeOut the loading screen
      $("#loadingScreen").fadeOut(() => {
        $("#loadingScreen").remove();
      });
    };

    let registerOnLeave = (index, nextIndex, direction) => {
      window.states.currentSection = nextIndex;

      // Adjust iScroll should to scroll to top or bottom of section
      this.blocks.OnLeave(index, nextIndex, direction);

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
        scrollingSpeed: window.default.scrollingSpeed,
        // autoScrolling: false,
        // fitToSection: false,
        scrollOverflow: true,
        scrollOverflowReset: false,
        scrollOverflowOptions: {
          //keyBindings: true; // Bug if used with fullpage.js
          probeType: 3
        },
        afterLoad: registerAfterLoad,
        afterRender: registerAfterRender,
        onLeave: registerOnLeave,
        onSlideLeave: registerOnSlideLeave
      });
    });

    // window is resize
    $(window).resize(resizeHandler.bind(this));
  }

  initSharer() {
    $('.fb-share').click(function(e) {
        e.preventDefault();
        window.open($(this).attr('href'), 'fbShareWindow', 'height=450, width=550, top=' + ($(window).height() / 2 - 275) + ', left=' + ($(window).width() / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
        return false;
    });

    $('.twit-share').click(function(e) {
        e.preventDefault();
        window.open($(this).attr('href'), 'twitShareWindow', 'height=450, width=550, top=' + ($(window).height() / 2 - 275) + ', left=' + ($(window).width() / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
        return false;
    });
  }

}
