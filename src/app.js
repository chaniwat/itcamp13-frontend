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

// Import Debugger
import { debugHelper } from './debug';
// debugHelper.hideDebug();

// Import Main
import { MainApp } from './main';

$(document).ready(() => {
  new MainApp(debugHelper);
});
