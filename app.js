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

        this.targetEl = null;
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
    target(targetEl) {
        this.targetEl = targetEl;

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

            let elements = document.getElementsByClassName(myself.targetEl);

            for (const i of elements) {
                i.classList.add(className);
            }
        });

        return this;
    }
}


module.exports = Surecut;
