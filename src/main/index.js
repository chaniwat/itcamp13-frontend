import { NavigationBar } from './navigation';

export class MainApp
{

  constructor(debugHelper)
  {
    this.debugHelper = debugHelper;

    this.navigationBar = new NavigationBar($('nav.navbar'));

    // Debugging
    this.navigationBar.registerDebug(this.debugHelper);
  }

}
