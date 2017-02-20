export class NavigationBar
{

  /**
   * params:
   *  - navbar: JQuery DOM => Navbar
   */
  constructor(navbar)
  {
    // associate
    this.navbar = navbar;

    // variables
    this.isShow = false;

    // setup
    // this.navbar.css('top', '-' + this.navbar.outerHeight()); => set in css

    // register event
    this.registerEvent();
  }

  /**
   * Register the event handler
   */
  registerEvent()
  {
    // Scrolling (Show/Hide navbar)
    $(window).scroll(() => {
      let isScreenBelowFirstBlock = $(window).scrollTop() >= window.innerHeight - (this.navbar.outerHeight() * 2);

      if (!this.isShow && isScreenBelowFirstBlock)
      {
        this.showNavbar();
        this.isShow = true;
      }
      else if (this.isShow && !isScreenBelowFirstBlock)
      {
        this.hideNavbar();
        this.isShow = false;
      }
    });
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
   * Register the debug
   */
  registerDebug(debugHelper)
  {
    this.debugHelper = debugHelper;
  }

}
