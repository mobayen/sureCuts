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
    // h_ hit

    // TODO: make options to be setable!
    constructor() {
        this.options = {
            h_last  : 0,
            a_time  : 300,
            w_time: 150,
            a_key   : 191, // 191 = Slash-key
            when: 'keyup',
            a_warn: false,
        }

        this.active = false;

        this.targetedElements = [];
    }

    initial () {
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

            if (event.keyCode == myself.options.a_key) {

                let diff = Math.round(event.timeStamp - myself.options.h_last);

                if (diff < myself.options.a_time) {
                    // actually run the callback
                    callback();

                } else if ((myself.options.a_warn === true) && (diff < myself.options.a_time + myself.options.w_time)) {
                    // warn the user to hit the key faster
                    console.log('Almost there! hit faster');

                    // TODO: engage some notification to show the end-user
                }

                // store the last time the key got hit!
                myself.options.h_last = event.timeStamp;
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

            // TODO move it to a separated private function
            // TODO.. apply() for example
            for (const i of myself.targetedElements) {
                i.classList.add(className);
            }
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
}


module.exports = Surecut;
