# Usage

## Example
```javascript
const aClass = require('Surecut');
var c = new aClass();

c.initial()
    .addClass('red', 'target');
```

And then hit the 'Slash' key twice

## The shortcut key/character
the default key to trigger is slash (actually double slash)
but can get activated by another key
You can specify either a character (eg: "/") or key-code (eg: 191)

# Options
it can customized by passing an object to the initial() method

the 'activation_key' can accept either keyCodes (eg: 191 slash (/)) or the key (the character) itself (eg: '/')
```javascript

c.initial({a_key: 191, w_time: 300})
    .addClass('red', 'target');
```