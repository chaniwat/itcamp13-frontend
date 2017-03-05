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
    this.navigation = {};
    this.navigation.all = this.navbar.find('.nav-linker');

    // All .nav-link => register block navigation
    this.navigation.all.each((i, e) => { $(e).click(this.navigatieToBlock.bind(this, $(e).data('target'))); });
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
   * Navigate to block
   */
  navigatieToBlock(target) {
    $.fn.fullpage.moveTo(target);
  }

}
