
/*

TODO http://articles.sitepoint.com/article/adapting-an-interface-for-touch-devices

- Touch:(One touch events)
	- events
		- touchstart - equivalent to mousedown
		- touchmove - equivalent to mousemove
		- touchend - equivalent to mouseup
		- touchcancel (When a touch becomes a gesture...)
		- click (followed after a mousedown, mouseup without a mousemove in between)
		
			
	- properties
		- touches (Every point currently touching)
		- targetTouches (Only touches within the target DOM element)
		- changedTouches (Only points that have changed state, or in other words the touches that triggered the event)
		
		- list/numeric array
			- properties
				- clientX & clientY (Relative to the viewPort)
				- pageX & pageY (Relative to the page)
				- screenX & screenY (Relative to the screen)
				- identifier (Unique ID for the touch)
				- target (the DOM element the finger is touching)

	One of the annoyances of writing Web applications for smartphones has been that even if you set a viewport for your application, dragging your finger around will move the page. Fortunately, the touchmove event object has a preventDefault method that can be used to keep the page still.
	
	Examples:
	
		When you put 1 finger down:
			- All 3 lists will provide the same information
		When you add a 2nd finger:
			- [touches] will contain 2 items, one for each finger
			- [targetTouches]
				- will have 2 items if the second finger was placed in the same DOM element
				- will have 1 item if the second finger was placed in a different DOM element (It will contain the SECOND finger, NOT the first)
			- [changedTouches]
				- will contain 1 item, the second finger, because that triggered the event.
		
		When you put down 2 fingers at exactly the same time:
			- [changedTouches] will contain 2 items, because they both triggered the event.
		If you move your fingers:
			- [changedTouches] will only contain the moved fingers.
		When you lift a finger:
			- [touches], the lifted finger gets removed
			- [targetTouches], the lifted finger gets removed
			- [changedTouches], will contain the lifted finger
		Removing the last finger:
			- [touches], the lifted finger gets removed
			- [targetTouches], the lifted finger gets removed
			- [changedTouches], will contain the lifted finger
	
- Gesture: (Multi touch events, pinching, rotating)
	- events
		- gesturestart
		- gesturechange
		- gestureend
	- properties
		- scale (fraction)
			- < 1 = pinch (zoom out)
			- > 1 = Push (zoom in)
		- rotation (in degrees)

	
	Examples:
		
		When listening for both gesture events and touch events, the chain looks like this:
			
			1. touchstart for finger 1
			2. gesturestart when the second finger touches the surface
			3. touchstart for finger 2
			4. gesturechange, when moved
			5. gestureend, when the second finger leaves
			6. touchend for finger 2
			7. touchend for finger 1

* When using touch events, preventDefault and returning false will block the default touch behavior of the device/browser like scrolling.





TODO:
- Arch:
	- 1 finger
	- 2 finger
- Finger lay-down, shove -> Resulting in line instead of a touch point
- Pinch
	- Enlarge
	- Smaller
	- Swipe together a group of items on a pile or pull them out.
- Rotate
- Multitouch:
	- 3 fingers to a side
	- 4 fingers to a side
	- 5 fingers to a side


*/

var XXX_Device_TouchSurface =
{
	getPositionRelativeToPage: function (nativeTouchEvent, touchIndex, touchType)
	{
		touchIndex = XXX_Default.toPositiveInteger(touchIndex, 0);
		touchType = XXX_Default.toOption(touchType, ['touches', 'targetTouches', 'changedTouches'], 'touches');
		
		var result = 
		{
			x: 0,
			y: 0
		};
		
		var nativeTouch = false;
		
		switch (touchType)
		{
			case 'touches':
				nativeTouch = nativeTouchEvent.touches[touchIndex];
				break;
			case 'targetTouches':
				nativeTouch = nativeTouchEvent.targetTouches[touchIndex];
				break;
			case 'changedTouches':
				nativeTouch = nativeTouchEvent.changedTouches[touchIndex];
				break;
		}
		
		if (nativeTouch)
		{
			if (nativeTouch.pageX || nativeTouch.pageY)
			{
				result =
				{
					x: nativeTouch.pageX,
					y: nativeTouch.pageY
				};
			}
			else if (nativeTouch.clientX || nativeTouch.clientY)
			{
				var viewPortPosition = XXX_HTTP_Browser_ViewPort.getPosition();
				
				result =
				{
					x: nativeTouch.clientX + viewPortPosition.x,
					y: nativeTouch.clientY + viewPortPosition.y
				};
			}
		}
		
		return result;
	},
	
	getPositionWithinPage: function (nativeTouchEvent, touchIndex, touchType)
	{
		var positionRelativeToPage = this.getPositionRelativeToPage(nativeTouchEvent, touchIndex, touchType);
		
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
	
	getPositionRelativeToViewPort: function (nativeTouchEvent, touchIndex, touchType)
	{
		var result = this.getPositionRelativeToPage(nativeTouchEvent, touchIndex, touchType);
				
		var viewPortPosition = XXX_HTTP_Browser_ViewPort.getPosition();
		
		result.x -= viewPortPosition.x;
		result.y -= viewPortPosition.y;
		
		return result;
	},
	
	getPositionWithinViewPort: function (nativeTouchEvent, touchIndex, touchType)
	{
		var positionRelativeToViewPort = this.getPositionRelativeToViewPort(nativeTouchEvent, touchIndex, touchType);
		
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
	
	getPositionRelativeToElement: function (nativeTouchEvent, element, touchIndex, touchType)
	{
		var result = 
		{
			x: 0,
			y: 0
		};
		
		var result = this.getPositionRelativeToPage(nativeTouchEvent, touchIndex, touchType);
		
		var elementPosition = XXX_CSS_Position.getRelativeToPage(element);
		
		result.x -= elementPosition.x;
		result.y -= elementPosition.y;
		
		return result;
	},
	
	getPositionWithinElement: function (nativeTouchEvent, element, touchIndex, touchType)
	{
		var positionRelativeToElement = this.getPositionRelativeToElement(nativeTouchEvent, element, touchIndex, touchType);
		
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
	
	getTouchCount: function (nativeTouchEvent, touchType)
	{
		touchType = XXX_Default.toOption(touchType, ['touches', 'targetTouches', 'changedTouches'], 'touches');
		
		var result = 0;
		
		switch (touchType)
		{
			case 'touches':
				result = XXX_Array.getFirstLevelItemTotal(nativeTouchEvent.touches);
				break;
			case 'targetTouches':
				result = XXX_Array.getFirstLevelItemTotal(nativeTouchEvent.targetTouches);
				break;
			case 'changedTouches':
				result = XXX_Array.getFirstLevelItemTotal(nativeTouchEvent.changedTouches);
				break;
		}
		
		return result;
	}
	
	
};

