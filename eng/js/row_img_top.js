// Скрипт для прокручивания изображения под шапкой при скроллинге 
jQuery(document).ready(function(){
	$objWindow=jQuery(window);
	jQuery('div[data-type="background"]').each(function(){
		var $bgObj=jQuery(this);
			jQuery(window).scroll(function(){
				var yPos=-($objWindow.scrollTop()/$bgObj.data('speed'));
				var coords='100% '+yPos+'px';$bgObj.css({backgroundPosition:coords});
		});
	});
});