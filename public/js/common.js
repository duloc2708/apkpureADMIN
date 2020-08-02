jQuery(document).ready(function($) {
  $('.menu__header ul li a').click(function(){
    $('li a').removeClass("active");
    $(this).addClass("active");
	});

  $('.navigation__right ul li a').click(function(){
    $('li a').removeClass("active");
    $(this).addClass("active");
	});
	
});