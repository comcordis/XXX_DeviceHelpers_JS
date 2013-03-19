
/*

- Mouse:
	- events:	
		- mouseover (Hover)
		- mouseout
		- mousedown
		- mouseup
		- click (followed after a mousedown, mouseup without a mousemove in between)
		- mousemove
		- mouseWheel
	- properties
		- pageX & pageY (Relative to the page)
		- clientX & clientY (Relative to the viewPort)
		- targetElement (The element it got triggered on)

When using mouseOver and mouseOut events, whenever mouse over a child element, the parent element gets mouse out

*/

// TODO mouseWheel class

var XXX_Device_Mouse =
{
	getPositionRelativeToPage: function (nativeMouseEvent)
	{
		var result = 
		{
			x: 0,
			y: 0
		};
			
		if (nativeMouseEvent.pageX || nativeMouseEvent.pageY)
		{
			result =
			{
				x: nativeMouseEvent.pageX,
				y: nativeMouseEvent.pageY
			};
		}
		else if (nativeMouseEvent.clientX || nativeMouseEvent.clientY)
		{
			var viewPortPosition = XXX_HTTP_Browser_ViewPort.getPosition();
			
			result =
			{
				x: nativeMouseEvent.clientX + viewPortPosition.x,
				y: nativeMouseEvent.clientY + viewPortPosition.y
			};
		}
		
		return result;
	},
	
	getPositionWithinPage: function (nativeMouseEvent)
	{
		var positionRelativeToPage = this.getPositionRelativeToPage(nativeMouseEvent);
		
		var pageSize = XXX_HTTP_Browser_Page.getSize();
		
		var x = 0;
		
		if (positionRelativeToPage.x < 0)
		{
			x = 0;
		}
		else if (positionRelativeToPage.x > pageSize.width)
		{
			x = pageSize.width;
		}
		else
		{
			x = positionRelativeToPage.x;
		}
		
		var y = 0;
		
		if (positionRelativeToPage.y < 0)
		{
			y = 0;
		}
		else if (positionRelativeToPage.y > pageSize.height)
		{
			y = pageSize.height;
		}
		else
		{
			y = positionRelativeToPage.y;
		}
		
		var horizontalFraction = x / pageSize.width;
		var verticalFraction = y / pageSize.height;
		
		var result =
		{
			x: x,
			y: y,
			horizontalFraction: horizontalFraction,
			verticalFraction: verticalFraction,
			horizontalPercentage: horizontalFraction * 100,
			verticalPercentage: verticalFraction * 100
		};
		
		return result;
	},
	
	getPositionRelativeToViewPort: function (nativeMouseEvent)
	{
		var result = this.getPositionRelativeToPage(nativeMouseEvent);
		
		var viewPortPosition = XXX_HTTP_Browser_ViewPort.getPosition();
		
		result.x -= viewPortPosition.x;
		result.y -= viewPortPosition.y;
		
		return result;
	},
		
	getPositionWithinViewPort: function (nativeMouseEvent)
	{
		var positionRelativeToViewPort = this.getPositionRelativeToViewPort(nativeMouseEvent);
		
		var viewPortSize = XXX_HTTP_Browser_ViewPort.getSize();
		
		var x = 0;
		
		if (positionRelativeToViewPort.x < 0)
		{
			x = 0;
		}
		else if (positionRelativeToViewPort.x > viewPortSize.width)
		{
			x = viewPortSize.width;
		}
		else
		{
			x = positionRelativeToViewPort.x;
		}
		
		var y = 0;
		
		if (positionRelativeToViewPort.y < 0)
		{
			y = 0;
		}
		else if (positionRelativeToViewPort.y > viewPortSize.height)
		{
			y = viewPortSize.height;
		}
		else
		{
			y = positionRelativeToViewPort.y;
		}
		
		var horizontalFraction = x / viewPortSize.width;
		var verticalFraction = y / viewPortSize.height;
		
		var result =
		{
			x: x,
			y: y,
			horizontalFraction: horizontalFraction,
			verticalFraction: verticalFraction,
			horizontalPercentage: horizontalFraction * 100,
			verticalPercentage: verticalFraction * 100
		};
		
		return result;
	},
	
	// top left
	getPositionRelativeToElement: function (nativeMouseEvent, element)
	{
		var result = 
		{
			x: 0,
			y: 0
		};
			
		element = XXX_DOM.get(element);
		
		var result = this.getPositionRelativeToPage(nativeMouseEvent);
		
		var elementPosition = XXX_CSS_Position.getRelativeToPage(element);
		
		result.x -= elementPosition.x;
		result.y -= elementPosition.y;
		
		return result;
	},
	
	getPositionWithinElement: function (nativeMouseEvent, element)
	{
		var positionRelativeToElement = this.getPositionRelativeToElement(nativeMouseEvent, element);
		
		var elementSize = XXX_CSS_Size.get(element);
		
		var x = 0;
		
		if (positionRelativeToElement.x < 0)
		{
			x = 0;
		}
		else if (positionRelativeToElement.x > elementSize.width)
		{
			x = elementSize.width;
		}
		else
		{
			x = positionRelativeToElement.x;
		}
		
		var y = 0;
		
		if (positionRelativeToElement.y < 0)
		{
			y = 0;
		}
		else if (positionRelativeToElement.y > elementSize.height)
		{
			y = elementSize.height;
		}
		else
		{
			y = positionRelativeToElement.y;
		}
		
		var horizontalFraction = x / elementSize.width;
		var verticalFraction = y / elementSize.height;
		
		var result =
		{
			x: x,
			y: y,
			horizontalFraction: horizontalFraction,
			verticalFraction: verticalFraction,
			horizontalPercentage: horizontalFraction * 100,
			verticalPercentage: verticalFraction * 100
		};
		
		return result;
	},
	
	// Positive delta is scrolling up, and negative delta is scrolling down
	getMouseWheelDelta: function (nativeMouseEvent)
	{
		var delta = 0;
			
		// Internet Explorer / Opera
		if (nativeMouseEvent.wheelDelta)
		{
			delta = nativeMouseEvent.wheelDelta / 120;
			
			// In Opera, delta differs in sign as compared to Internet Explorer
			if (window.opera)
			{
				delta = -delta;
			}
		}
		// Mozilla and others
		else if (nativeMouseEvent.detail)
		{
			// In mozilla, delta differs in sign as compared to Internet Explorer, and is a multiple of 3
			delta = -nativeMouseEvent.detail / 3;
		}
		
		nativeMouseEvent.preventDefault();
		
		return delta;
	},
	
	elementHitTest: function (nativeMouseEvent, element)
	{
		var result = false;
		
		var mousePositionRelativeToElement = this.getPositionRelativeToElement(nativeMouseEvent, element);
		
		var elementSize = XXX_CSS_Size.get(element);
		
		if ((mousePositionRelativeToElement.x >= 0 && mousePositionRelativeToElement.x <= elementSize.width) && (mousePositionRelativeToElement.y >= 0 && mousePositionRelativeToElement.y <= elementSize.height))
		{
			result = true;
		}
		
		return result;
	}
};





