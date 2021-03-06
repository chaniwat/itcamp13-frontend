// Import favicon
import '../assets/favicon/favicon-16x16.png';
import '../assets/favicon/favicon-32x32.png';
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

// Declare window default (GLOBAL)
window.default = {};

// Import GlobalOption
import { AppOptions } from './option'

// Set viewport
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
  var ww = ( $(window).width() < window.screen.width ) ? $(window).width() : window.screen.width; //get proper width
  var mw = 500; // min width of site
  var ratio =  ww / mw; // calculate ratio
  var mxw = 768; // max width of site
  var mxratio = ww / mxw; // calculate max ratio
  if( ww < mw){ // smaller than minimum size
    $('#Viewport').attr('content', 'initial-scale=' + ratio + ', maximum-scale=' + ratio + ', minimum-scale=' + ratio + ', user-scalable=no, width=' + ww);
  }else{ // regular size
    $('#Viewport').attr('content', 'initial-scale=' + mxratio + ', maximum-scale=' + mxratio + ', minimum-scale=' + mxratio + ', user-scalable=no, width=' + mxw);
  }
}

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
});
