function Card(stack, value, family, player) {
    'use strict';
    
    this.xmlns  = 'http://www.w3.org/2000/svg';
    
    this.value      = value;
    this.family     = family;
    this.color      = family === 1 || family === 3 ? 'black' : 'red';
    this.image      = document.createElementNS(this.xmlns, 'image');
    this.backName   = player === 1 ? 'black_joker' : 'red_joker';
    this.name       = 'red_joker';
    this.stack      = stack;
    
    
    this.getName = function () {
        
        var valueName = this.value.toString();
        
        if (valueName === '1') {
            valueName = 'ace';
            
        } else if (valueName === '11') {
            valueName = 'jack';
        
        } else if (valueName === '12') {
            valueName = 'queen';
            
        } else if (valueName === '13') {
            valueName = 'king';
            
        }
        
        var familyName = this.family.toString();
        
        if (familyName === '1') {
            familyName = 'spades';
            
        } else if (familyName === '2') {
            familyName = 'hearts';
        
        } else if (familyName === '3') {
            familyName = 'clubs';
            
        } else if (familyName === '4') {
            familyName = 'diamonds';
            
        }
        
        this.name = valueName + '_of_' + familyName;
        
    };
    this.getName();
    
    
    
    this.selection = function () {
        
        console.log('select');

        game.selected = this;
        this.image.setAttribute('class', 'selected');
        
        
        console.log(game.selected);
    };
    
    
    this.deselect = function () {
        
        console.log('deselect');
        
        game.selected = 0;
        this.image.setAttribute('class', 'unselected');
        
        if (game.deck[game.player].isEmpty()) {
            game.binToDeck();
            
        }
        
    };
    
    
    this.createCard = function () {
        
        this.image.setAttribute('width', 14 / 130 * document.getElementById('game').getAttribute('viewBox').split(' ')[2]);
        this.image.setAttribute('height', 14 / 130 * document.getElementById('game').getAttribute('viewBox').split(' ')[3]);
        
        this.image.setAttribute('class', 'unselected');
        
        var self = this;
                
        document.getElementById('unclickable').appendChild(this.image);
        
    };
    this.createCard();
    
    
    this.display = function (x, y, side, effect) {
        
        if (this === game.selected) {
            side = 'Up';
            
        } else if (effect) {
            this.image.setAttribute('style', 'animation: pop 10s ease infinite;animation-delay: ' + (effect / 40) + 's;');
            
        } else {
            this.image.setAttribute('style', '');
            
        }
        
        this.image.setAttribute('x', x - this.image.getAttribute('width') / 2);
        this.image.setAttribute('y', y - this.image.getAttribute('height') / 2);
        
        if (side === 'Down') {
            this.image.setAttribute('href', 'Playing Cards/SVG-cards-1.3/' + this.backName + '.svg');
            
        } else {
            this.image.setAttribute('href', 'Playing Cards/SVG-cards-1.3/' + this.name + '.svg');
            
        }
        
        document.getElementById('unclickable').appendChild(this.image);
        
    };
    
}