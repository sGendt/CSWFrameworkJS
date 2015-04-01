function Popup()
{
	this.init();
}

Popup.prototype.init = function()
{
	var that = this;

	$(document).ready
	(
		function()
		{
			$('.popup .content img').click
			(
				function(e)
				{
					that.hide();
				}
			);
		}
	);
}

Popup.prototype.show = function(value, cssClass)
{
	this.cssClass = cssClass;

	if(cssClass)
		$('.popup').addClass(cssClass);

	$('.popup .content .value').html(value);
	$('.popup').show();
}

Popup.prototype.hide = function()
{
	$('.popup').removeClass(this.cssClass);
	$('.popup .content .value').html('');
	$('.popup').hide();
}

var popup = new Popup();
