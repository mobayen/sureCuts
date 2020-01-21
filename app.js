// TODO: (a_warn OR activation_warn) set a warning zone - when someone trying to activate he/she is not ast enought but close
// some warning can help to warn him/her to hit the Key faster !!!
// 

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
     * add a cssClassName to the elements that have className class
     * 
     * @param {string} className the class names need to be added
     * @param {string} target the target element
     */
    addClass(className, target) {
        this.doit(function() {
            let el = document.getElementsByClassName(target);

            for (let i=0; i<el.length; i++) {
                console.log('x', i, el[i]);
                el[i].classList.add(className);
            }
        });

        return this;
    }
}


module.exports = Surecut;
