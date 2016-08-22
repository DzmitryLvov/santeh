$(document)
  .ready(function () {
    var triggerBttn = document.getElementById('trigger-overlay'),
      overlay = document.querySelector('div.overlay'),
      closeBttn = overlay.querySelector('button.overlay-close');

    function toggleOverlay() {
      if ($(overlay).hasClass('open')) {
        $(overlay).removeClass('open');
        $(overlay).addClass('close');
        var onEndTransitionFn = function (ev) {

          if (ev.propertyName !== 'visibility') return;
          this.removeEventListener('transitionend', onEndTransitionFn);

          $(overlay).removeClass('close');
        };

        overlay.addEventListener('transitionend', onEndTransitionFn);
      }
      else if (!$(overlay).hasClass('close')) {
        $(overlay).addClass('open');
      }
    }

    $('div.overlay a').click(toggleOverlay);
  
    triggerBttn.addEventListener('click', toggleOverlay);
    closeBttn.addEventListener('click', toggleOverlay);
  });