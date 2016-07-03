// Copyright Rob Jinman 2014
//
// This file is part of SvgTetris.
//
// SvgTetris is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// SvgTetris is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with SvgTetris.  If not, see <http://www.gnu.org/licenses/>.


var cmn = require('./common');
var Animation = require('./Animation');
var Matrix = require('./Matrix');
var Vector = require('./Vector');


//===========================================
// Pile
//===========================================
var Pile = function(root, w, h, cellSz) {
  this.root = root;
  this.w = w;
  this.h = h;
  this.cs = cellSz;

  this.updateables = {};

  this.grid = new Array(w);
  for (var i = 0; i < w; i++) {
    this.grid[i] = new Array(h);
  }
};

//===========================================
// Pile.prototype.update
//===========================================
Pile.prototype.update = function() {
  for (var k in this.updateables) {
    this.updateables[k].update();
  }
};

//===========================================
// Pile.prototype.add
//===========================================
Pile.prototype.add = function(piece) {
  var i, j;
  var x = piece.x + this.cs * 0.5;
  var y = piece.y + this.cs * 0.5;
  var cx = Math.floor(x / this.cs);
  var cy = Math.floor(y / this.cs);

  var pat = piece.patterns[piece.state];

  for (i = 0; i < pat.length; i++) {
    if (cx + i < 0) continue;
    if (cx + i >= this.w) break;

    for (j = 0; j < pat[i].length; j++) {
      if (cy + j < 0) continue;
      if (cy + j >= this.h) break;

      if (pat[i][j]) {
        this.grid[cx + i][cy + j] = { piece: piece, cell: pat[i][j] };
      }
    }
  }

  var n = 0;
  var toErase = [];
  for (i = 0; i < this.h; i++) {
    var row = [];
    for (var c = 0; c < this.grid.length; ++c) {
      row.push(this.grid[c][i]);
    }

    if (row.filter(Boolean).length == row.length) {
      toErase.push(i);
      n++;
    }
  }

  // Drop rows
  if (toErase.length > 0) {
    var foo = function(num) { return function(x) { return x > num; }; };

    for (j = 0; j < this.h; j++) {
      if (toErase.indexOf(j) != -1) continue;

      // Number of rows below this one being erased
      var d = toErase.filter(foo(j)).length;

      if (d > 0) {
        for (i = 0; i < this.w; i++) {
          if (this.grid[i][j]) {
            var obj = this.grid[i][j];

            var v = (new Vector(0, d * this.cs)).transform(new Matrix(0, 0, -obj.piece.svgItem.a));
            var anim = new Animation(obj.cell, v.at(0), v.at(1), 0, 0, 0, cmn.DROP_SPEED[d - 1], cmn.FRAME_RATE);

            obj.cell.anims.drop = anim;

            this.updateables[obj.cell.name] = obj.cell;

            var makeNonUpdateable = function(obj) { delete this.updateables[obj]; }.bind(this, obj.cell.name);
            var animStart = anim.start.bind(anim, makeNonUpdateable);

            setTimeout(animStart, cmn.DROP_DELAY * 1000);
          }
        }
      }
    }
  }

  for (i = 0; i < toErase.length; i++) {
    this.eraseRow(toErase[i]);
  }

  return n;
};

//===========================================
// Pile.prototype.intersects
//===========================================
Pile.prototype.intersects = function(x, y, pattern) {
  var cx = Math.floor((x + this.cs * 0.5) / this.cs);
  var cy = Math.floor((y + this.cs * 0.5) / this.cs);

  for (var i = 0; i < pattern.length; i++) {
    if (cx + i < 0) continue;
    if (cx + i >= this.w) break;

    for (var j = 0; j < pattern[i].length; j++) {
      if (cy + j < 0) continue;
      if (cy + j >= this.h) break;

      if (this.grid[cx + i][cy + j] && pattern[i][j]) {
        return true;
      }
    }
  }

  return false;
};

//===========================================
// Pile.prototype.clear
//===========================================
Pile.prototype.clear = function() {
  for (var i = 0; i < this.w; i++) {
    for (var j = 0; j < this.h; j++) {
      var cell = this.grid[i][j];

      if (cell) {
        this.eraseCell(cell);
        this.grid[i][j] = null;
      }
    }
  }
};

//===========================================
// Pile.prototype.eraseCell
//===========================================
Pile.prototype.eraseCell = function(t) {
  t.piece.svgItem.removeChild(t.cell);
  t.cell.erase();

  if (t.piece.svgItem.children.length === 0) {
    this.root.removeChild(t.piece.svgItem);
    t.piece.erase();
  }

  delete this.updateables[t.cell.name];
};

//===========================================
// Pile.prototype.eraseRow
//===========================================
Pile.prototype.eraseRow = function(r) {
  var i;

  for (i = 0; i < this.w; i++) {

    var obj = this.grid[i][r];
    var anim = obj.cell.anims.dissolve;

    var eraseCell = this.eraseCell.bind(this, obj);
    var animStart = anim.start.bind(anim, eraseCell);

    this.updateables[obj.cell.name] = obj.cell;

    setTimeout(animStart, cmn.CASCADE_EFFECT_DELTA * 1000 * i);
  }

  for (i = r; i > 0; i--) {
    for (var j = 0; j < this.w; j++) {
      var above = this.grid[j][i - 1];
      this.grid[j][i] = above;
    }
  }
};

module.exports = Pile;

