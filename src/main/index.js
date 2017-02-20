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
  }

}
