// Import styles
import '../assets/scss/app.scss';
// Import HTML
import './index.html';

// Import JS Dependencies
// Bootstrap
import 'bootstrap';
// GSAP
import { TweenMax } from 'gsap';
import 'gsap/jquery.gsap';
import 'gsap/ModifiersPlugin';
// FullPage
import 'fullpage.js/vendors/jquery.easings.min';
import 'fullpage.js/vendors/scrolloverflow';
import 'fullpage.js';

// Import Debugger
import { debugHelper } from './debug';
// debugHelper.hideDebug();

// Import Main
import { MainApp } from './main';

$(document).ready(() => {
  let main = new MainApp();

  main.setDebug(debugHelper);
});
