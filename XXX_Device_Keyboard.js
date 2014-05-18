
/*

Events:
	- keydown
	- keypress
	- keyup

*/


// Recognize space characters

var XXX_Device_Keyboard =
{
	parsedKey:
	{
		keyCode: -1,
		characterCode: '',
		key: '',
		keyClass: {}
	},
	
	initialize: function ()
	{
		XXX_DOM_NativeEventDispatcher.addEventListener(document, 'keydown', function (nativeKeyboardEvent)
		{
			XXX_Device_Keyboard.parsedKey = XXX_Device_Keyboard.parseKey(nativeKeyboardEvent);
		});
		
		XXX_DOM_NativeEventDispatcher.addEventListener(document, 'keyup', function (nativeKeyboardEvent)
		{
			XXX_Device_Keyboard.parsedKey =
			{
				keyCode: -1,
				characterCode: '',
				key: '',
				keyClass: {}
			};
		});
	},
	
	parseKey: function (nativeKeyboardEvent)
	{
		var keyCode = 0;
		
		if (keyCode == 0 && nativeKeyboardEvent.charCode)
		{
			keyCode = nativeKeyboardEvent.charCode;
		}
		if (keyCode == 0 && nativeKeyboardEvent.which)
		{
			keyCode = nativeKeyboardEvent.which;
		}
		if (keyCode == 0 && nativeKeyboardEvent.keyCode)
		{
			keyCode = nativeKeyboardEvent.keyCode;
		}
		
		var key = '';
		
		var alpha = false;
		var integer = false;
		var arrow = false;
		var space = false;
		var control = false;
		var f = false;
		var operator = false;
		var punctuation = false;
		
		switch (keyCode)
		{
			case 8:
				key = 'backspace';
				control = true;
				break;
			case 9:
				key = 'tab';
				control = true;
				break;
			case 13:
				key = 'enter';
				control = true;
				break;
			case 16:
				key = 'shift';
				control = true;
				break;
			case 17:
				key = 'control';
				control = true;
				break;
			case 18:
				key = 'alt';
				control = true;
				break;
			case 19:
				key = 'pause';
				control = true;
				break;
			case 20:
				key = 'capsLock';
				control = true;
				break;
			case 27:
				key = 'escape';
				control = true;
				break;
			case 32:
				key = 'space';
				space = true;
				break;
			case 33:
				key = 'pageUp';
				control = true;
				break;
			case 34:
				key = 'pageDown';
				control = true;
				break;
			case 35:
				key = 'end';
				control = true;
				break;
			case 36:
				key = 'home';
				control = true;
				break;
			case 37:
				key = 'leftArrow';
				arrow = true;
				break;
			case 38:
				key = 'upArrow';
				arrow = true;
				break;
			case 39:
				key = 'rightArrow';
				arrow = true;
				break;
			case 40:
				key = 'downArrow';
				arrow = true;
				break;
			case 45:
				key = 'insert';
				control = true;
				break;
			case 46:
				key = 'delete';
				control = true;
				break;
				
			case 48:
				key = 0;
				integer = true;
				break;
			case 49:
				key = 1;
				integer = true;
				break;
			case 50:
				key = 2;
				integer = true;
				break;
			case 51:
				key = 3;
				integer = true;
				break;
			case 52:
				key = 4;
				integer = true;
				break;
			case 53:
				key = 5;
				integer = true;
				break;
			case 54:
				key = 6;
				integer = true;
				break;
			case 55:
				key = 7;
				integer = true;
				break;
			case 56:
				key = 8;
				integer = true;
				break;
			case 57:
				key = 9;
				integer = true;
				break;
				
			case 65:
				key = 'a';
				alpha = true;
				break;
			case 66:
				key = 'b';
				alpha = true;
				break;
			case 67:
				key = 'c';
				alpha = true;
				break;
			case 68:
				key = 'd';
				alpha = true;
				break;
			case 69:
				key = 'e';
				alpha = true;
				break;
			case 70:
				key = 'f';
				alpha = true;
				break;
			case 71:
				key = 'g';
				alpha = true;
				break;
			case 72:
				key = 'h';
				alpha = true;
				break;
			case 73:
				key = 'i';
				alpha = true;
				break;
			case 74:
				key = 'j';
				alpha = true;
				break;
			case 75:
				key = 'k';
				alpha = true;
				break;
			case 76:
				key = 'l';
				alpha = true;
				break;
			case 77:
				key = 'm';
				alpha = true;
				break;
			case 78:
				key = 'n';
				alpha = true;
				break;
			case 79:
				key = 'o';
				alpha = true;
				break;
			case 80:
				key = 'p';
				alpha = true;
				break;
			case 81:
				key = 'q';
				alpha = true;
				break;
			case 82:
				key = 'r';
				alpha = true;
				break;
			case 83:
				key = 's';
				alpha = true;
				break;
			case 84:
				key = 't';
				alpha = true;
				break;
			case 85:
				key = 'u';
				alpha = true;
				break;
			case 86:
				key = 'v';
				alpha = true;
				break;
			case 87:
				key = 'w';
				alpha = true;
				break;
			case 88:
				key = 'x';
				alpha = true;
				break;
			case 89:
				key = 'y';
				alpha = true;
				break;
			case 90:
				key = 'z';
				alpha = true;
				break;
				
			case 96:
				key = 0;
				integer = true;
				break;
			case 97:
				key = 1;
				integer = true;
				break;
			case 98:
				key = 2;
				integer = true;
				break;
			case 99:
				key = 3;
				integer = true;
				break;
			case 100:
				key = 4;
				integer = true;
				break;
			case 101:
				key = 5;
				integer = true;
				break;
			case 102:
				key = 6;
				integer = true;
				break;
			case 103:
				key = 7;
				integer = true;
				break;
			case 104:
				key = 8;
				integer = true;
				break;
			case 105:
				key = 9;
				integer = true;
				break;
			
			case 106:
				key = '*';
				operator = true;
				break;
			case 107:
				key = '+';
				operator = true;
				break;
			case 109:
				key = '-';
				operator = true;
				break;
			case 110:
				key = '.';
				punctuation = true;
				break;
			case 111:
				key = '/';
				operator = true;
				break;
				
			case 112:
				key = 'f1';
				f = true;
				break;
			case 113:
				key = 'f2';
				f = true;
				break;
			case 114:
				key = 'f3';
				f = true;
				break;
			case 115:
				key = 'f4';
				f = true;
				break;
			case 116:
				key = 'f5';
				f = true;
				break;
			case 117:
				key = 'f6';
				f = true;
				break;
			case 118:
				key = 'f7';
				f = true;
				break;
			case 119:
				key = 'f8';
				f = true;
				break;
			case 120:
				key = 'f9';
				f = true;
				break;
			case 121:
				key = 'f10';
				f = true;
				break;
			case 122:
				key = 'f11';
				f = true;
				break;
			case 123:
				key = 'f12';
				f = true;
				break;
				
				
			case 144:
				key = 'numLock';
				control = true;
				break;
			case 145:
				key = 'scrollLock';
				control = true;
				break;
				
				
			case 186:
				key = ';';
				punctuation = true;
				break;
			case 187:
				key = '=';
				punctuation = true;
				break;
			case 189:
				key = '-';
				punctuation = true;
				break;
			case 190:
				key = '.';
				punctuation = true;
				break;
			case 191:
				key = '/';
				operator = true;
				break;
			case 192:
				key = 'graveAccent';
				punctuation = true;
				break;
			case 219:
				key = '[';
				punctuation = true;
				break;
			case 220:
				key = '\\';
				punctuation = true;
				break;
			case 221:
				key = ']';
				punctuation = true;
				break;
			case 222:
				key = '\'';
				punctuation = true;
				break;
		}
		
		var keyClass =
		{
			alpha: alpha,
			integer: integer,
			space: space,
			arrow: arrow,
			control: control,
			f: f,
			operator: operator,
			punctuation: punctuation
		};
		
		var result =
		{
			keyCode: keyCode,
			key: key,
			keyClass: keyClass
		};
		
		return result;
	},
	
	isKey: function (nativeKeyboardEvent, key)
	{
		var result = false;
		
		var parsedKey = this.parseKey(nativeKeyboardEvent);
		
		if (parsedKey.key == key)
		{
			result = true;
		}
		
		return result;
	},
	
	isKeyClass: function (nativeKeyboardEvent, keyClass)
	{
		var result = false;
		
		var parsedKey = this.parseKey(nativeKeyboardEvent);
		
		if (parsedKey.keyClass[keyClass])
		{
			result = true;
		}
		
		return result;
	},
	
	isKeyPressed: function (key)
	{
		var result = false;
		
		if (this.parsedKey.key == key)
		{
			result = true;
		}
		
		return result;
	},
	
	isKeyClassPressed: function (keyClass)
	{
		var result = false;
		
		if (this.parsedKey.keyClass[keyClass])
		{
			result = true;
		}
		
		return result;
	}
};

XXX_DOM_Ready.addEventListener(function ()
{
	XXX_Device_Keyboard.initialize();
});