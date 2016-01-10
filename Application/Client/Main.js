var di = require('./DependencyInversionWireUp.js').init();
var game = di.resolve('game');

game.init();

var setCanvas = function() {
    game.setCanvas();
};
setCanvas();

window.addEventListener('resize', setCanvas, false);

game.start();

var pressed = {};
window.addEventListener('keydown', function(event) {
    if (pressed[event.keyCode]) {
        return;
    }
    pressed[event.keyCode] = true;

    switch (event.keyCode) {
    case 38:
        game.remoteStartBoost();
        break;
    case 37:
        game.remoteSteerLeft();
        break;
    case 39:
        game.remoteSteerRight();
        break;
    case 32:
        game.remoteShoot();
        break;
    }
});

window.addEventListener('keyup', function(event) {
    pressed[event.keyCode] = false;
    switch (event.keyCode) {
    case 38:
        game.remoteStopBoost();
        break;
    case 37:
    case 39:
        game.remoteStopSteer();
        break;
    }
});

var initialTouch = null;
var shooting = function(touch) {
    return touch.pageX > window.innerWidth / 2;
};
window.addEventListener('touchstart', function(event) {
    var touch = event.changedTouches[0];
    if (shooting(touch)) {
        game.remoteShoot();
    } else {
        initialTouch = initialTouch || { x: touch.pageX, y: touch.pageY };
    }
}, false);

var overTreshold = function(amount) {
    // Todo: treshold should be relative to window.innerWidth and height.
    var treshold = 20;
    return Math.abs(amount) > treshold;
};
window.addEventListener('touchmove', function(event) {
    event.preventDefault();
    var touch = event.changedTouches[0];
    if (shooting(touch) || !initialTouch) {
        return;
    }

    var vector = { x: touch.pageX - initialTouch.x, y: touch.pageY - initialTouch.y };

    if (overTreshold(vector.x)) {
        if (vector.x > 0) {
            game.remoteSteerRight();
        } else {
            game.remoteSteerLeft();
        }
    }

    if (overTreshold(vector.y)) {
        if (vector.y < 0) {
            game.remoteStartBoost();
        } else {
            game.remoteStopBoost();
        }
    }
}, false);

var onTouchEnd = function(event) {
    // Todo: is [0] really the right touch?
    var touch = event.changedTouches[0];
    if (!shooting(touch)) {
        initialTouch = null;
        game.remoteStopBoost();
        game.remoteStopSteer();
    }
};
window.addEventListener('touchend', onTouchEnd, false);
window.addEventListener('touchcancel', onTouchEnd, false);