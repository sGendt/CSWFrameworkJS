alert('load gallery');

/*(function($) 
{
	$.fn.gallery = function(options)
	{
		// Instance

		return new $.gallery(options, this);
	};
	
	$.gallery = function(options, element)
	{
		// default configuration properties
		
		var defaults = 
		{

		};

		this.options = $.extend(defaults, options);

		// properties

		this.element = $(element);

		alert(' before init');

		this.init();
	}
	
	$.gallery.prototype =
	{
		
		init: function()
		{
			alert('init');
			var size = 0;

			this.element.find('.pict').each
			(
				function(i)
				{
					if(i == 0)
						size = $(this).width();

					$(this).css({'height': size});

					var img = $(this).find('img');

					img.load
					(
						function()
						{
							var width = img.width();

							var height = img.height();

							var proportion = width / height;

							if(proportion >= 1)
							{
								// resize height

								var coef = height / size;

							    var nwidth = width / coef;
							    var nheight = size;
							}
							else
							{
								// resize width

								var coef = width / size;

							    var nwidth = height / coef;
							    var nheight = size;
							}

							img.css
							(
								{
									'width': nwidth+'px',
									'height': nheight+'px',
									'margin-left': -(nwidth/2)+'px',
									'margin-top': -(nheight/2)+'px'
								}
							);
						}
					);
				}
			);
		},
	}	
})(jQuery);*/