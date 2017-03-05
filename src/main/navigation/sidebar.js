export class SideBar
{

  /**
   * params:
   *  - sidebar: JQuery DOM => Sidebar (Sharing bar)
   *  - navbar: JQuery DOM => Navbar #need to reference the height
   */
  constructor(sidebar)
  {
    // associate
    this.sidebar = sidebar;

    // variables
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
   * Register the onLeave event handler (fullpage.js)
   */
  registerOnLeave(index, nextIndex, direction)
  {
    // Show/Hide Navbar
    if (index == 1 && nextIndex != 1)
    {
      this.showSidebar();
    }
    else if (index != 1 && nextIndex == 1)
    {
      this.hideSidebar();
    }
  }

}
