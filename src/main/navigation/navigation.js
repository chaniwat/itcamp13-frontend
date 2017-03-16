export class Navigation
{

  /**
   * params:
   *  - navbar: JQuery DOM => Navbar
   *  - sidenav: JQuery DOM => Sidenav
   */
  constructor(navbar, sidenav)
  {
    // associate
    this.navbar = navbar;
    this.sidenav = sidenav;

    // variables
    this.navigation = {navbar: {}, sidenav: {}, isMobileSize: false};
    this.navigation.navbar.all = this.navbar.find('.nav-linker');
    this.navigation.sidenav.all = this.sidenav.find('.nav-linker');

    this.hamburger = this.navbar.find('#nav-hamburger');
    this.sidenav.state = false;

    // All .nav-link => register linking, register block navigation
    this.navigation.navbar.all.each((i, e) => {
      let elem = $(e);
      let target = elem.data('target');
      this.navigation.navbar[target] = elem;
      elem.click(this.navigatieToBlock.bind(this, target));
    });
    this.navigation.sidenav.all.each((i, e) => {
      let elem = $(e);
      let target = elem.data('target');
      this.navigation.sidenav[target] = elem;
      elem.click(this.navigatieToBlock.bind(this, target));
    });

    // Register sidenav overlay area (for hiding the sidenav)
    this.sidenav.find('.overlay').click(this.hideSidenav.bind(this));

    // Register nav-hamburger (mobile - sidenav:off-canvas)
    this.hamburger.click(this.toggleSidenav.bind(this));
  }

  // FIXME let the css3 handle the navbar (show/hide - add/remove class)

  /**
   * Show navbar
   */
  showNavbar(animate = true)
  {
    if(this.debugHelper) this.debugHelper.logf('navbar_toggle', 'showing navbar');

    this.navbar.removeClass('disable-animate');
    if(!animate) this.navbar.addClass('disable-animate');

    this.navbar.addClass('show');
  }

  /**
   * Hide navbar
   */
  hideNavbar(animate = true)
  {
    if(this.debugHelper) this.debugHelper.logf('navbar_toggle', 'hiding navbar');

        this.navbar.removeClass('disable-animate');
        if(!animate) this.navbar.addClass('disable-animate');
        
        this.navbar.removeClass('show');
  }

  /**
   * Toggle show/hide sidenav
   */
  toggleSidenav()
  {
    if(!this.sidenav.state)
    {
      this.showSidenav();
    }
    else
    {
      this.hideSidenav();
    }
  }

  /**
   * Show sidenav
   */
  showSidenav()
  {
    if(this.debugHelper) this.debugHelper.logf('sidenav_toggle', 'showing sidenav');

    // Siding sidenav and fullpage-wrapper
    this.sidenav.addClass('open');
    $('.fullpage-wrapper .section').each((i, e) => {
      $(e).addClass('open-sidenav');
    });
    // Fading in Overlay
    this.sidenav.find('.overlay').fadeIn();
    // Disable fullpage scrolling
    $.fn.fullpage.setKeyboardScrolling(false);
    $.fn.fullpage.setAllowScrolling(false);

    this.sidenav.state = true;
  }

  /**
   * Hide sidenav
   */
  hideSidenav()
  {
    if(this.debugHelper) this.debugHelper.logf('sidenav_toggle', 'hiding sidenav');

    // Hiding sidenav and fullpage-wrapper
    this.sidenav.removeClass('open');
    this.sidenav.addClass('closing');
    $('.fullpage-wrapper .section').each((i, e) => {
      $(e).removeClass('open-sidenav');
    });
    // Fading out Overlay
    let overlayElem = this.sidenav.find('.overlay');
    overlayElem.fadeOut(() => this.sidenav.removeClass('closing'));
    // Disable fullpage scrolling
    $.fn.fullpage.setKeyboardScrolling(true);
    $.fn.fullpage.setAllowScrolling(true);

    this.sidenav.state = false;
  }

  /**
   * Add active class on navbar/sidenav (call when change section)
   */
  setNavActive(index)
  {
    this.navigation.navbar.all.removeClass("active");
    this.navigation.sidenav.all.removeClass("active");

    switch(index) {
      case 1:
        this.navigation.navbar["home-block"].addClass("active");
        this.navigation.sidenav["home-block"].addClass("active");
        break;
      case 2:
        this.navigation.navbar["detail-block"].addClass("active");
        this.navigation.sidenav["detail-block"].addClass("active");
        break;
      case 3:
        this.navigation.navbar["sponsor-block"].addClass("active");
        this.navigation.sidenav["sponsor-block"].addClass("active");
        break;
      case 4:
        this.navigation.navbar["camp-block"].addClass("active");
        this.navigation.sidenav["camp-block"].addClass("active");
        break;
      case 5:
        this.navigation.navbar["timeline-block"].addClass("active");
        this.navigation.sidenav["timeline-block"].addClass("active");
        break;
      case 6:
        this.navigation.navbar["gallery-block"].addClass("active");
        this.navigation.sidenav["gallery-block"].addClass("active");
        break;
      case 7:
        this.navigation.navbar["recommend-block"].addClass("active");
        this.navigation.sidenav["recommend-block"].addClass("active");
        break;
      case 8:
        this.navigation.navbar["faq-block"].addClass("active");
        this.navigation.sidenav["faq-block"].addClass("active");
        break;
    }
  }

  /**
   * Register the onLeave event handler (fullpage.js)
   */
  registerOnLeave(index, nextIndex, direction)
  {
    // Show/Hide Navbar (if not a mobile size)
    if (!this.navigation.isMobileSize)
    {
      if (index == 1 && nextIndex != 1)
      {
        this.showNavbar();
      }
      else if (index != 1 && nextIndex == 1)
      {
        this.hideNavbar();
      }
    }

    // Set active on index
    this.setNavActive(nextIndex);
  }

  /**
   * Register the window resize event
   */
   registerResize(width, height)
   {
     if(width >= 992)
     {
       this.hideSidenav();
       if (window.states.currentSection == 1)
       {
         this.hideNavbar(false);
       }

       this.navigation.isMobileSize = false;
     }
     else if(width < 992)
     {
       this.showNavbar(false);
       this.navigation.isMobileSize = true;
     }
   }

  /**
   * Navigate to block
   */
  navigatieToBlock(target) {
    $.fn.fullpage.moveTo(target);
  }

}
