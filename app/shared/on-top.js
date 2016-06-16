
$(document).ready(function() {
  $('a.on-top').click(function(e){
    $('html, body').animate({scrollTop:0},200);
    e.preventDefault();
  });




$(document).ready(function() {
  $('a.bktop').click(function(e){
    $('html, body').animate({scrollTop:0}, '1000');
    e.preventDefault();
  });
  $(window).scroll(function() {
    if($(this).scrollTop() > 100){
      $('.bktop').fadeIn('2000');
    } else {
      $('.bktop').fadeOut('500');
    }
  });
});

});