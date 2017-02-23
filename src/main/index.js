import { NavigationBar, SideBar } from './navigation';

export class MainApp
{

  constructor(debugHelper)
  {
    let navbar = $('nav.navbar');
    let sidebar = $('nav.sidebar');

    this.navigationBar = new NavigationBar(navbar);
    this.sideBar = new SideBar(sidebar, navbar);

    // Debugging
    this.debugHelper = debugHelper;
    this.navigationBar.registerDebug(this.debugHelper);
    this.sideBar.registerDebug(this.debugHelper);

    // Initialize FullPage.js
    $(document).ready(() => {
      $('#fullpage').fullpage({
        scrollOverflow: true,
        scrollOverflowReset: false,
        scrollOverflowOptions: {
          //keyBindings: true; // Bug if used with fullpage.js
        }
      });
    });

    // ReBuild DOM When resize window
    $(window).resize(() => {
      $.fn.fullpage.reBuild();
    });
  }

}
