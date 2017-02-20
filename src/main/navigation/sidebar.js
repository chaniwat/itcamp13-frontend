export class SideBar
{

  /**
   * params:
   *  - sidebar: JQuery DOM => Sidebar (Sharing bar)
   *  - navbar: JQuery DOM => Navbar #need to reference the height
   */
  constructor(sidebar, navbar)
  {
    // associate
    this.sidebar = sidebar;
    this.navbar = navbar;

    // variables
    this.isShow = false;

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
        this.showSidebar();
        this.isShow = true;
      }
      else if (this.isShow && !isScreenBelowFirstBlock)
      {
        this.hideSidebar();
        this.isShow = false;
      }
    });
  }

  /**
   * Show navbar
   */
  showSidebar()
  {
    if(this.debugHelper) this.debugHelper.logf('sidebar_toggle', 'showing sidebar');
    this.sidebar.animate({right: 0}, 750);
  }

  /**
   * Hide navbar
   */
  hideSidebar()
  {
    if(this.debugHelper) this.debugHelper.logf('sidebar_toggle', 'hiding sidebar');
    this.sidebar.animate({right: -this.sidebar.outerWidth()}, 750);
  }

  /**
   * Register the debug
   */
  registerDebug(debugHelper)
  {
    this.debugHelper = debugHelper;
  }

}
