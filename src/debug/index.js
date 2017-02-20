class DebugHelper
{

  /**
   * Debugger
   * params:
   *  - debugBox: JQuery (DOM) => Debug box
   */
  constructor ()
  {
    $('<section id="debug-box"><ul><li><b>Debug Box:</b></li></ul></section>').prependTo('body');
    this.debugBox = $("#debug-box");
  }

  /**
   * Toggle hide/show the debug box
   */
  toggleDebug()
  {
    this.debugBox.toggle();
  }

  /**
   * Show the debug box
   */
  showDebug()
  {
    this.debugBox.show();
  }

  /**
   * Hide the debug box
   */
  hideDebug()
  {
    this.debugBox.hide();
  }

  /**
   * Show fading log
   */
  logf(tag, message, time = 2000)
  {
    let tagElem = this.debugBox.find('li.' + tag);

    if (tagElem.length)
    {
      tagElem.stop(true);
      tagElem.html('- ' + message);
    }
    else
    {
      $('<li class=' + tag + '>- ' + message + '</li>').appendTo(this.debugBox.find('ul'));
    }

    tagElem = this.debugBox.find('li.' + tag);
    tagElem.css('opacity', 1);
    tagElem.fadeOut(2500, function () {
      this.remove();
    });
  }

}

var debugHelper = new DebugHelper();

// Register event
$(window).keypress((e) => {
  if(e.which == 92)
  {
    debugHelper.toggleDebug();
  }
});

exports.debugHelper = debugHelper;
