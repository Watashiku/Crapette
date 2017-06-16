function Game() {
    'use strict';
    
    this.xmlns  = 'http://www.w3.org/2000/svg';
    
    this.xScale = document.getElementById('game').getAttribute('viewBox').split(' ')[2] / 130;
    this.yScale = document.getElementById('game').getAttribute('viewBox').split(' ')[3] / 130;
    
    // Size of the cards
    this.cardWidth  =   14 * this.xScale;
    this.cardHeight =   14 * this.yScale;
    
    // Limits of the game boxes
    this.x0         =   0 * this.xScale;
    this.y0         =   0 * this.yScale;
    
    // Board inside divisions
    this.rowWidth   =   45 * this.xScale;
    this.deckHeight =   20 * this.yScale;
    this.aceWidth   =   15 * this.xScale;
    this.rowHeight  =   15 * this.yScale;
    
    // Limit of the game boxes modulo card size
    this.y0deck     =   2 * this.rowHeight + this.deckHeight / 2;
    
    this.deck       = [];
    this.crapette   = [];
    this.bin        = [];
    
    this.deck[0]      =   new Stack('Deck', 0);
    this.crapette[0]  =   new Stack('Crapette', 0);
    this.bin[0]       =   new Stack('Bin', 0);
    
    this.deck[1]      =   new Stack('Deck', 1);
    this.crapette[1]  =   new Stack('Crapette', 1);
    this.bin[1]       =   new Stack('Bin', 1);
    
    this.row        =   [];
    this.ace        =   [];
    this.zones      =   [];
    
    this.selected   =   0;
    this.player     =   0;
    
    var i, j, line, self = this;
    
    for (i = 0; i < 8; i += 1) {
        this.row.push(new Stack('Row'));
        this.ace.push(new Stack('Ace'));
    
    }
    
    this.createBoard = function () {
        
        var x1, x2, y1, y2, rect;

        rect = document.createElementNS(this.xmlns, 'rect');

        x1 = -document.getElementById('game').getAttribute('viewBox').split(' ')[2] * 0.48;
        y1 = -document.getElementById('game').getAttribute('viewBox').split(' ')[3] * 0.48;
        x2 = document.getElementById('game').getAttribute('viewBox').split(' ')[2] * 0.96;
        y2 = document.getElementById('game').getAttribute('viewBox').split(' ')[3] * 0.96;

        rect.setAttribute('x', x1);
        rect.setAttribute('y', y1);
        rect.setAttribute('width', x2);
        rect.setAttribute('height', y2);
        rect.setAttribute('rx', 200);
        rect.setAttribute('ry', 30);
        rect.setAttribute('style', 'fill:rgb(0,200,0);stroke:red;stroke-width:1;opacity:0.9');

        document.getElementById('unclickable').appendChild(rect);


        for (i = 0; i < 3; i += 1) {
            for (j = 0; j < 2; j += 1) {

                rect = document.createElementNS(this.xmlns, 'rect');

                x1 = (i - 1.5) * 2 * this.aceWidth;
                y1 = (2 * j - 1) * (this.deckHeight + 2 * this.rowHeight) - j * (this.deckHeight);
                x2 = 2 * this.aceWidth;
                y2 = this.deckHeight;

                rect.setAttribute('x', x1);
                rect.setAttribute('y', y1);
                rect.setAttribute('width', x2);
                rect.setAttribute('height', y2);
                rect.setAttribute('style', 'fill:rgb(50,50,200);stroke:pink;stroke-width:1;opacity:0.1');

                document.getElementById('clickable').appendChild(rect);
                this.zones.push(rect);
            }
        }

        for (i = 0; i < 4; i += 1) {
            for (j = 0; j < 2; j += 1) {

                rect = document.createElementNS(this.xmlns, 'rect');

                x1 = (2 * j - 1) * (this.rowWidth + this.aceWidth) - j * (this.rowWidth);
                y1 = (i - 2) * this.rowHeight;
                x2 = this.rowWidth;
                y2 = this.rowHeight;

                rect.setAttribute('x', x1);
                rect.setAttribute('y', y1);
                rect.setAttribute('width', x2);
                rect.setAttribute('height', y2);
                rect.setAttribute('style', 'fill:rgb(200,50,50);stroke:pink;stroke-width:1;opacity:0.1');

                document.getElementById('clickable').appendChild(rect);
                this.zones.push(rect);

                rect = document.createElementNS(this.xmlns, 'rect');

                x1 = (j - 1) * this.aceWidth;
                y1 = (i - 2) * this.rowHeight;
                x2 = this.aceWidth;
                y2 = this.rowHeight;

                rect.setAttribute('x', x1);
                rect.setAttribute('y', y1);
                rect.setAttribute('width', x2);
                rect.setAttribute('height', y2);
                rect.setAttribute('style', 'fill:rgb(100,150,150);stroke:pink;stroke-width:1;opacity:0.1');

                document.getElementById('clickable').appendChild(rect);
                this.zones.push(rect);
            }
        }

        for (i = 0; i < 2; i += 1) {

            line = document.createElementNS(this.xmlns, 'line');

            x1 = -(this.rowWidth + this.aceWidth) * 0.95;
            y1 = -2 * this.rowHeight + i * 4 * this.rowHeight;
            x2 = -x1;
            y2 = y1;

            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute('style', 'stroke:rgb(0,0,0);stroke-width:0.4;opacity:0.5');
            document.getElementById('unclickable').appendChild(line);

            line = document.createElementNS(this.xmlns, 'line');


            x1 = (i * 2 - 1) * this.aceWidth;
            y1 = -2 * this.rowHeight;
            x2 = x1;
            y2 = -y1;

            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute('style', 'stroke:rgb(0,0,0);stroke-width:0.4;opacity:0.5');
            document.getElementById('unclickable').appendChild(line);

        }


        this.zones[0].addEventListener('mousedown', function (evt) {self.deck[0].handleClick(evt); }, false);
        this.zones[1].addEventListener('mousedown', function (evt) {self.crapette[1].handleClick(evt); }, false);
        this.zones[2].addEventListener('mousedown', function (evt) {self.bin[0].handleClick(evt); }, false);
        this.zones[3].addEventListener('mousedown', function (evt) {self.bin[1].handleClick(evt); }, false);
        this.zones[4].addEventListener('mousedown', function (evt) {self.crapette[0].handleClick(evt); }, false);
        this.zones[5].addEventListener('mousedown', function (evt) {self.deck[1].handleClick(evt); }, false);

        this.zones[6].addEventListener('mousedown', function (evt) {self.row[0].handleClick(evt); }, false);
        this.zones[7].addEventListener('mousedown', function (evt) {self.ace[0].handleClick(evt); }, false);
        this.zones[8].addEventListener('mousedown', function (evt) {self.row[4].handleClick(evt); }, false);
        this.zones[9].addEventListener('mousedown', function (evt) {self.ace[4].handleClick(evt); }, false);

        this.zones[10].addEventListener('mousedown', function (evt) {self.row[1].handleClick(evt); }, false);
        this.zones[11].addEventListener('mousedown', function (evt) {self.ace[1].handleClick(evt); }, false);
        this.zones[12].addEventListener('mousedown', function (evt) {self.row[5].handleClick(evt); }, false);
        this.zones[13].addEventListener('mousedown', function (evt) {self.ace[5].handleClick(evt); }, false);

        this.zones[14].addEventListener('mousedown', function (evt) {self.row[2].handleClick(evt); }, false);
        this.zones[15].addEventListener('mousedown', function (evt) {self.ace[2].handleClick(evt); }, false);
        this.zones[16].addEventListener('mousedown', function (evt) {self.row[6].handleClick(evt); }, false);
        this.zones[17].addEventListener('mousedown', function (evt) {self.ace[6].handleClick(evt); }, false);

        this.zones[18].addEventListener('mousedown', function (evt) {self.row[3].handleClick(evt); }, false);
        this.zones[19].addEventListener('mousedown', function (evt) {self.ace[3].handleClick(evt); }, false);
        this.zones[20].addEventListener('mousedown', function (evt) {self.row[7].handleClick(evt); }, false);
        this.zones[21].addEventListener('mousedown', function (evt) {self.ace[7].handleClick(evt); }, false);

    };
    this.createBoard();
    
    this.state      =   'start';
    
    this.begin      =   function () {
        
        var i, j;
        
        for (i = 0; i < 2; i += 1) {
            
            this.deck[i].shuffle();

            for (j = 0; j < 13; j += 1) {
                this.crapette[i].push(this.deck[i].pop());

            }

            for (j = 0; j < 4; j += 1) {
                this.row[j + 4 * i].push(this.deck[i].pop());

            }
        }
        
        this.display();
        
        this.state = 'set up';
        
    };
    
    
    this.drawStack = function () {
        
        if (this.hasCase() && !this.crapette[this.player].isEmpty()) {
            return this.crapette[this.player];
            
        } else {
            return this.deck[this.player];
            
        }
    };
    
    
    this.moveSelected = function (stack) {
        
        return stack.push(this.selected.stack.pop());
        
    };
    
    
    this.move = function (stack1, stack2) {
        
        return stack1.push(stack2.pop());
        
    };
    
    
    this.hasCase = function () {
        var i;
        
        for (i = 0; i < 8; i += 1) {
            if (this.row[i].cards.length === 0) {
                return true;
                
            }
            
        }
        return false;
        
    };
    
    
    this.binToDeck = function () {
        
        console.log('Bin to deck');
        
        while (!this.bin[this.player].isEmpty()) {
            this.deck[this.player].push(this.bin[this.player].pop());
            
        }
        
        if (this.deck[this.player].isEmpty()) {
            this.victory();
            
        }
        
    };
    
    
    this.victory = function () {
        
        console.log('Victory');
        
        this.display();
        
        if (confirm("Rejouez ?") === true) {
            init();
            
        } else {
            // RIP
            
        }
    };
    
    
    
    this.changeTurn = function () {
        
        this.player += 1;
        this.player %= 2;
        
        if (this.deck[this.player].isEmpty()) {
            this.binToDeck();
                        
        }
        
    };
    
    this.display    =   function () {
        
        var i;
        
        this.deck[0].display(-2 * this.aceWidth, -this.y0deck);
        this.bin[0].display(0, -this.y0deck);
        this.crapette[0].display(2 * this.aceWidth, -this.y0deck);
        
        for (i = 0; i < 4; i += 1) {
            this.row[i].display(-this.aceWidth - this.cardWidth / 1.7, this.rowHeight * (i - 1.5), -(5 - 0.4 * (Math.min(8, this.row[i].cards.length))));
            this.ace[i].display(-this.aceWidth / 2, this.rowHeight * (i - 1.5));
            this.ace[4 + i].display(this.aceWidth / 2, this.rowHeight * (i - 1.5));
            this.row[4 + i].display(this.aceWidth + this.cardWidth / 1.7, this.rowHeight * (i - 1.5), 5 - 0.4 * (Math.min(8, this.row[i + 4].cards.length)));
        }
            
        this.crapette[1].display(-2 * this.aceWidth, this.y0deck);
        this.bin[1].display(0, this.y0deck);
        this.deck[1].display(2 * this.aceWidth, this.y0deck);
        
    };
    
}