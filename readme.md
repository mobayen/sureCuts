# Usage

## Example
```javascript
require('./bootstrap');

const aClass = require('Surecut');

let a = new aClass();
a.initial({ activationKeys: ['/', '/', 'a']})
    .target('.add_class_red')
    .addClass('red');

let b = new aClass();
b.initial({ activationKeys: ['/', '/', 'b']})
    .target('#focus_on_me')
    .focus();

let d = new aClass();
d.initial({ activationKeys: ['/', '/', 'd']})
    .target('#clickme')
    .click();
```

And then hit '/' + '/' + ('a' or 'c' or 'd')

## The shortcut key/character
The default key to trigger is slash (actually double slash), but can get bind to other list of characters
You can specify either a character (eg: "/") or key-code (eg: 191)
```
[191, 191, 65]
```

# Options
it can customized by passing the object of options to the `initial()` method

The 'activation_key' can accept either keyCodes (eg: 191 slash (/)) or the key (the character) itself (eg: '/')
```javascript

c.initial({activationKeys: [191, 191, 65], gapTime: 500})
    .addClass('red', 'target');
```