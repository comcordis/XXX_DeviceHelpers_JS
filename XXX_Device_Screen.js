var XXX_Device_Screen =
{
	get: function ()	
	{
		return this.getSize();
	},

	getSize: function ()
	{
		return {x: 0, y: 0, width: window.screen.width, height: window.screen.height};
	},
		
	getOrientation: function ()
	{
		var orientation = 'landscape';
					
		if (window.orientation == undefined || !XXX_Type.isInteger(window.orientation))
		{
			var viewPortSize = XXX_HTTP_Browser_ViewPort.getSize();
			
			orientation = (viewPortSize.width > viewPortSize.height) ? 'landscape' : 'portrait';
		}
		else
		{
			orientation = (window.orientation == -90 || window.orientation == 90) ? 'landscape' : 'portrait';
		}
		
		return orientation;
	}
};


 