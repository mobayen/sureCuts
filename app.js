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

class Surecut {

    // prefiexes_
    // w_ warning
    // a_ active/acvate/activation

    // TODO: make options to be setable!
    constructor() {
        this.options = {
            a_time  : 300,
            w_time: 150,
            a_key   : 191, // 191 = Slash-key
            a_kies: null,
            a_kies_length: null,
            when: 'keyup',
            a_warn: false,
        }

        // keeps the last time the key got hit!
        this.last_hit = 0;
        this.hitStack = [];

        this.active = false;

        this.targetedElements = [];
    }

    initial (options) {

        if (typeof options === 'object') {
            this.options = { ...this.options, ...options};
        }

        // if the list of activation kies is initialized
        if (Array.isArray(this.options.a_kies) && this.options.a_kies.length > 0) {
            this.a_kies_length = this.options.a_kies.length;
        }

        this.active = true;

        return this;
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
        
        let myself = this;

        document.addEventListener(this.options.when, function(event) {

            if (
                (event.keyCode !== myself.options.a_key)
                && (event.key !== myself.options.a_key)
            ) {
                return ;
            }

            let diff = Math.round(event.timeStamp - this.last_hit);

            if (diff < myself.options.a_time) {
                // actually run the callback
                callback();

            } else if ((myself.options.a_warn === true) && (diff < myself.options.a_time + myself.options.w_time)) {
                // warn the user to hit the key faster
                console.log('Almost there! hit faster');

                // TODO: engage some notification to show the end-user
            }

            // store the last time the key got hit!
            this.last_hit = event.timeStamp;
        
        });
    }

    doitx(callback) {
        
        // dont do anything if it has not activated
        if (this.active === false) {
            return this;
        }

        let itself = this;

        document.addEventListener(this.options.when, function(event) {

            hitStack_length = itself.hitStack.length;
            
            // current match:
            let current_match = itself.options.a_kies[hitStack_length]

            if (event.key === current_match || event.keyCode === current_match) {
                itself.hitStack.push({ key: event.key, time: event.timeStamp });
            }

            // if the two length are equal, the shortcut kies have got hit in the right sequence
            if (itself.options.a_kies.length === itself.hitStack.length) {
                itself.hitStack = [];
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
     * keyboard shortcut to simulate click
     */
    click() {
        let myself = this;

        this.doitx(function() {
            myself.targetedElements.map(function(el) {
                el.click();
            });
        });

        return this;
    }

}

module.exports = Surecut;
