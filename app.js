// TODO: (a_warn OR activation_warn) set a warning zone - when someone trying to activate he/she is not ast enought but close
// some warning can help to warn him/her to hit the Key faster !!!
// 

// w_ warning
// a_ active/acvate/activation
// h_ hit

let options = {
    h_last  : 0,
    a_time  : 300,
    w_time: 150,
    a_key   : 191, // 191 = Slash-key
    when: 'keyup',
    a_warn: true,

}

function activate() {
    // do whatever needed to activate shortcut mode
}

exports.initial = function() {
    console.log('my new package to handdle shortcuts');

    document.addEventListener(options.when, function(e) {
        // activating the shortcut mode
        // hitting Slash-key twice will activate the shortcut mode

        // console.log('x1', e.code);
        console.log('x2', e);
        // console.log(e.keyCode , options.a_key)

        if (e.keyCode == options.a_key) {

            let diff = Math.round(e.timeStamp - options.h_last);

            if (diff < options.a_time) {
                // activating...
                activate();
                console.log('-x- activating the sortcut mode...', diff);
            } else if ((options.a_warn === true) && (diff < options.a_time + options.w_time)) {
                // warn the user to hit the key faster
                console.log('Almost there! hit faster');
            }

            // store the last time the key got hit!
            options.h_last = e.timeStamp;
        }
    });
    
    // document.addEventListener('keydown', function(e) {
    //     console.log('x2', e);
    // });
}