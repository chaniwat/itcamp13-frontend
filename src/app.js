// Import styles
import '../assets/scss/app.scss';
// Import HTML
import './index.html';
import './landing.html';

// Import JS Dependencies
// Bootstrap
import 'bootstrap';
// GSAP
import { TweenMax } from 'gsap';
import 'gsap/jquery.gsap';
import 'gsap/ModifiersPlugin';
// FullPage
import 'fullpage.js/vendors/scrolloverflow';
import 'fullpage.js';

// Import Debugger
// import { debugHelper } from './debug';

// Import GlobalOption
import { AppOptions } from './option'

$(document).ready(() => {
  var options;
  try {
    GlobalOption;
    options = new AppOptions(GlobalOption);
  } catch(ignored) {
    var options = new AppOptions();
  }

  if (options.mode == 'MAIN_APP')
  {
    let MainApp = require('./main').MainApp;
    let main = new MainApp();
  }
  else if (options.mode == 'LANDING_PAGE')
  {
    let LandingApp = require('./landing').LandingApp;
    let landing = new LandingApp();
  }

  // main.setDebug(debugHelper);
  // debugHelper.hideDebug();
});
