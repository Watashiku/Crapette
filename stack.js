function Stack(type, player) {
    'use strict';
    
    this.type       = type;
    this.cards      = [];
    this.represent  = 0;
    this.owner      = player;
    
    var i, j;
    
    if (this.type === 'Deck') {
        
        for (i = 1; i <= 13; i += 1) {
            
            for (j = 1; j <= 4; j += 1) {
                
                this.cards.push(new Card(this, i, j, this.owner));
                
            }
            
        }
        
    }
    
    
    this.shuffle = function () {
        
        var m = this.cards.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m);

            m -= 1;
            
            // And swap it with the current element.
            t = this.cards[m];
            this.cards[m] = this.cards[i];
            this.cards[i] = t;
        }
        
    };
    
    
    this.display   = function (x, y, step) {
        
        var i;
        
        if (this.cards.length === 0) {
            // Empty 
        
        } else if (this.type === 'Row') {
            for (i = 0; i < this.cards.length; i += 1) {
                this.cards[i].display(x + i * step, y, 'Up');
            }
            
        } else if (this.type === 'Deck' || this.type === 'Crapette') {
            for (i = 0; i < this.cards.length; i += 1) {
                if (this === game.drawStack() && game.selected === 0) {
                    this.cards[i].display(x - i / 20, y, 'Down', this.cards.length - i);
                    
                } else {
                    this.cards[i].display(x - i / 20, y, 'Down', false);
                    
                }
            }
        
        } else if (this.type === 'Bin' || this.type === 'Ace') {
            for (i = 0; i < this.cards.length; i += 1) {
                this.cards[i].display(x - i / 20, y, 'Up');
            }
            
        } else {
            // Error
            
        }
        
    };
    
    
    this.handleClick = function (evt) {
        
        // Is it a card selection or a card push ?
        
        var added;
        
        if (game.selected === 0) {
            // Selection
            
            if (this.represent !== 0) {
                // If this stack is not empty
                
                if (this.type === 'Row') {
                    this.represent.selection();
                
                } else if (this === game.drawStack()) {
                    this.represent.selection();
                    
                }
                
            }
            
        } else if (game.selected !== 0) {
            // Push try
            
            added = this.add(game.selected);
            
            if (game.selected !== game.drawStack().represent || added) {
                game.selected.deselect();
            }
        }
        
        game.display();
    };
    
    
    
    
    this.updateRepresent = function () {
        
        if (this.cards.length === 0) {
            this.represent = 0;
        
        } else {
            this.represent = this.cards[this.cards.length - 1];
        
        }
        
    };
    
    
    this.push  = function (c) {
        
        var d = c;
        
        if (c === false) {
            return c;
        }
        
        this.cards.push(c);
        
        this.cards[this.cards.length - 1].stack = this;
        this.updateRepresent();
        
        return true;
    };
    
    
    this.pop  = function () {
        var out;
        
        if (this.cards.length === 0) {
            return false;
            
        } else {
            out = this.cards.pop();
            this.updateRepresent();
            
            return out;
            
        }
        
    };
    
    
    this.add  = function (c) {
        console.log('add');
        
        if (c.constructor === Array) {
            console.log('Not yet implemented');
            
        }
        
        switch (this.type) {
                
        case 'Bin':
            console.log(game.player, this.owner);
            if (game.player === this.owner) {
                if (game.selected.stack === game.drawStack()) {
                    game.changeTurn();
                    return game.moveSelected(this);
                    
                } else {
                    return false;
                    
                }
            } else if (c.family === this.represent.family && Math.abs(c.value - this.represent.value) <= 1) {
                return game.moveSelected(this);

            } else {
                return false;

            }


        case 'Deck':
            return false;


        case 'Crapette':
            return false;

        case 'Ace':
            if (this.cards.length === 0 && c.value === 1) {
                return game.moveSelected(this);

            } else if (this.represent.value === c.value - 1 && this.represent.family === c.family) {
                return game.moveSelected(this);

            } else {
                return false;

            }


        case 'Row':
            console.log('try move row');
                
            if (this.cards.length === 0) {
                console.log('empty row');
                
                return game.moveSelected(this);

            } else if (this.represent.value === c.value + 1 && this.represent.color !== c.color) {
                console.log('accepted');
                
                return game.moveSelected(this);

            } else {
                console.log('refused');
                
                return false;

            }

        }
        
    };
    
    
    this.isEmpty = function () {
        
        if (this.cards.length === 0) {
            return true;
            
        }
        
        return false;
    };
    
    
    this.remove   = function () {
        
        if (this.type === 'Row') {
            return this.pop();

        } else if (game.hasCase() && this.type === 'Crapette' && this.owner === game.player) {
            return this.pop();
            
        } else if (!game.hasCase() && this.type === 'Deck' && this.owner === game.player) {
            return this.pop();
        
        } else {
            return false;
            
        }
    };
    
}