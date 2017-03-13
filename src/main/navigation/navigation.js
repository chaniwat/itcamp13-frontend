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
    this.navigation = {navbar: {}, sidenav: {}};
    this.navigation.navbar.all = this.navbar.find('.nav-linker');
    this.navigation.sidenav.all = this.sidenav.find('.nav-linker');

    this.hamburger = this.navbar.find('#nav-hamburger');
    this.sidenav.state = false;

    // All .nav-link => register block navigation
    this.navigation.navbar.all.each((i, e) => { $(e).click(this.navigatieToBlock.bind(this, $(e).data('target'))); });
    this.navigation.sidenav.all.each((i, e) => { $(e).click(this.navigatieToBlock.bind(this, $(e).data('target'))); });

    // Register nav-hamburger (mobile - side:off-canvas)
    this.hamburger.click(this.toggleSidenav.bind(this));
  }

  /**
   * Show navbar
   */
  showNavbar()
  {
    if(this.debugHelper) this.debugHelper.logf('navbar_toggle', 'showing navbar');
    this.navbar.animate({top: 0}, 750);
  }

  /**
   * Hide navbar
   */
  hideNavbar()
  {
    if(this.debugHelper) this.debugHelper.logf('navbar_toggle', 'hiding navbar');
    this.navbar.animate({top: -this.navbar.outerHeight()}, 750);
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
    // Disable fullpage scrolling
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
    $('.fullpage-wrapper .section').each((i, e) => {
      $(e).removeClass('open-sidenav');
    });
    // Disable fullpage scrolling
    $.fn.fullpage.setAllowScrolling(true);

    this.sidenav.state = false;
  }

  /**
   * Register the onLeave event handler (fullpage.js)
   */
  registerOnLeave(index, nextIndex, direction)
  {
    // Show/Hide Navbar
    if (index == 1 && nextIndex != 1)
    {
      this.showNavbar();
    }
    else if (index != 1 && nextIndex == 1)
    {
      this.hideNavbar();
    }
  }

  /**
   * Register the window resize event
   */
   registerResize(width, height)
   {
     if(width >= 992)
     {
       this.hideSidenav();
     }
   }

  /**
   * Navigate to block
   */
  navigatieToBlock(target) {
    $.fn.fullpage.moveTo(target);
  }

}
