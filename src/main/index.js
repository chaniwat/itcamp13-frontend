import { NavigationBar, SideBar } from './navigation';

export class MainApp
{

  constructor(debugHelper)
  {
    let navbar = $('nav.navbar');
    let sidebar = $('nav.sidebar');

    this.navigationBar = new NavigationBar(navbar);
    this.sideBar = new SideBar(sidebar);

    // Debugging
    this.debugHelper = debugHelper;
    this.debugHelper.registerDebug(this.navigationBar);
    this.debugHelper.registerDebug(this.sideBar);

    let registerOnLeave = (index, nextIndex, direction) => {
      this.navigationBar.registerOnLeave(index, nextIndex, direction);
      this.sideBar.registerOnLeave(index, nextIndex, direction);
    };

    // Initialize FullPage.js
    $(document).ready(() => {
      $('#fullpage').fullpage({
        scrollOverflow: true,
        scrollOverflowReset: false,
        scrollOverflowOptions: {
          //keyBindings: true; // Bug if used with fullpage.js
        },

        onLeave: registerOnLeave
      });
    });

    // ReBuild DOM When resize window
    $(window).resize(() => {
      $.fn.fullpage.reBuild();
    });
  }

}
