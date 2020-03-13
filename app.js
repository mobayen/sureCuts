function whatType(el) {

    if (typeof el !== 'string') {
        // TODO throw an exeption
        console.log('it is not a string');

        return undefined;
    }

    // TODO:  what is the best definition for html class and id attributes ?
    if (el.indexOf('.') >= 0) {
        return 'classAtrib';
    } else if (el.indexOf('#') >= 0) {
        return 'idAtrib';
    }

    // by default it consider it as tagName
    return 'tagName';
}

function checkTimeDiff(hitStack, maxT, warnT, warningCallback) {

    for (let i = 1; i < hitStack.length; i++) {
        const el = hitStack[i];
        const prev_el = hitStack[i - 1];

        const timeDiff = el.time - prev_el.time;
        if (timeDiff > maxT) {

            if (timeDiff < maxT + warnT) {
                // warn the user to hit the key faster
                if (typeof warningCallback === 'function') {
                    warningCallback();
                }
            }
            return false
        }
    }

    return true;
}

class Surecut {

    // TODO: make options to be setable!
    constructor() {
        this.options = {
            timeGap  : 300,
            warningTime: 150,
            activationKeys: [191, 191], // 191 = Slash-key
            activationKeysLength: null,
            when: 'keyup',
            a_warn: false,
        }

        // keys history
        this.hitStack = [];
        
        // nextKey
        this.nextKey = this.options.activationKeys[0]

        this.active = false;

        this.targetedElements = [];

    }

    initial (options) {

        if (typeof options === 'object') {
            this.options = { ...this.options, ...options};
        }

        // if the list of activation keys is initialized
        if (Array.isArray(this.options.activationKeys) && this.options.activationKeys.length > 0) {
            this.activationKeysLength = this.options.activationKeys.length;
        }

        this.active = true;

        return this;
    }

    /**
     * Empty the key strock stack
     * and reset the next key expected to the first key expected 
     * 
     * that means it start over 
     * 
     */
    reset() {
        // But first reset the hit-stack array as well as next-match expected
        this.hitStack = [];
        this.nextKey = this.options.activationKeys[0]
    }

    /**
     * this actually runs the code suppose to be run 
     * when the "shortcut" combination satisfied
     * 
     * @param {callable} callback 
     */
    doit(callback) {
        
        // dont do anything if it has not activated
        if (this.active === false) {
            return this;
        }

        let itself = this;

        document.addEventListener(this.options.when, function(event) {

            hitStack_length = itself.hitStack.length;
            
            // next match expected
            let nextKey = itself.options.activationKeys[hitStack_length]

            // if the last key pressed was not the next key expected
            if (event.key !== nextKey && event.keyCode !== nextKey) {
                // But first reset the hit-stack array as well as next-match expected
                itself.reset();
            }

            if (event.key === nextKey || event.keyCode === nextKey) {
                itself.hitStack.push({ key: event.key, time: event.timeStamp });
            }

            let timeDiff = checkTimeDiff(
                itself.hitStack, 
                itself.options.timeGap, 
                itself.options.warningTime,
                itself.a_warn ? () => console.log('Almost there, but should be faster!') : false
                );

            // if the gap between key strocks was too high
            // won't call the callback and reset hit-stack and next-match expected
            if (!timeDiff) {
                // But first reset the hit-stack array as well as next-match expected
                itself.reset();
            }

            // if the two lengthes are equal, the shortcut keys have got hit in the correct sequence
            // and it is time to run the callback()
            if (itself.options.activationKeys.length === itself.hitStack.length) {
                // But first reset the hit-stack array as well as next-match expected
                itself.reset();

                callback();
            }
        });
    }

    /**
     * which dom element is targeted?
     * 
     * @param {string} targetEl html dom
     */
    target(target) {
        target = target.trim();

        let typex = whatType(target);
        
        // TODO make it more efficient
        // remove the "." and "#"
        target = target.slice(1);

        if (typex === 'idAtrib') {
            this.targetedElements.push(document.getElementById(target));
        } else if (typex === 'classAtrib') {
            this.targetedElements.push(...document.getElementsByClassName(target));
        }

        return this;
    }

    /**
     * functional method 
     * 
     * add a cssClassName to the elements that have className class
     * 
     * @param {string} className the class names need to be added
     */
    addClass(className) {

        let myself = this;

        this.doit(function() {

            myself.targetedElements.map(function(el) {
                el.classList.add(className);
            });
        });

        return this;
    }

    /**
     * functional method 
     * 
     * focus on the targeted (the first) element(s)
     * 
     */
    focus() {
        
        let myself = this;

        this.doit(function() {
            if (myself.targetedElements.length == 0) {
                console.log('No target element found!');
            } else if (myself.targetedElements.length >= 2) {
                console.log('more than one element found to focus on!');
            }

            // focus on the first element, if any!
            myself.targetedElements[0].focus();
        });

        return this;
    }

    /**
     * functional method 
     * 
     * keyboard shortcut to simulate click
     */
    click() {
        let myself = this;

        this.doit(function() {
            myself.targetedElements.map(function(el) {
                el.click();
            });
        });

        return this;
    }

}

module.exports = Surecut;
