var game;

var init = function () {
    'use strict';
     
    while (document.getElementById('clickable').childElementCount !== 0) {
        document.getElementById('clickable').removeChild(document.getElementById('clickable').childNodes[0]);
    }
    
    while (document.getElementById('unclickable').childElementCount !== 0) {
        document.getElementById('unclickable').removeChild(document.getElementById('unclickable').childNodes[0]);
    }
    
    game = new Game();
    
    game.begin();
};
