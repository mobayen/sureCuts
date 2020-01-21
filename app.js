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
            a_warn: true,
        }

        this.active = false;
    }

    initial () {
        document.addEventListener(options.when, function(event) {
            // activating the shortcut mode
            // hitting Slash-key twice will activate the shortcut mode

            // console.log('x1', event.code);
            // console.log('x2', event);
            // console.log(event.keyCode , options.a_key)

            if (event.keyCode == options.a_key) {

                let diff = Math.round(event.timeStamp - options.h_last);

                if (diff < options.a_time) {
                    // activating...
                    this.active = true;

                    console.log('-x- activating the sortcut mode...', diff);

                } else if ((options.a_warn === true) && (diff < options.a_time + options.w_time)) {
                    // warn the user to hit the key faster
                    console.log('Almost there! hit faster');
                }

                // store the last time the key got hit!
                options.h_last = event.timeStamp;
            }
        });
    }

}

// exporting looks different from Node.js but is almost as simple
// export default class { Surecut };
module.exports = Surecut;
