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
var Rect = require('./Rect');
var SvgItem = require('./SvgItem');


//===========================================
// Piece
//===========================================
var Piece = function(name, fill, stroke, blockSz) {
  this.name = name;

  this.x = 0;
  this.y = 0; // Ignore animation deltas

  this.state = 0;
  this.svgItem = new SvgItem(name);

  Piece.prototype.blockSz = blockSz;

  this.fill = fill;
  this.stroke = stroke;

  this.patterns = [
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  ];

  this.pivot = [2, 2];

  this.svgItem.setSz(blockSz * 4, blockSz * 4);

  this.svgItem.anims.spin =
    new Animation(this.svgItem, 0, 0, -90, blockSz * 2, blockSz * 2, 0.2, cmn.FRAME_RATE);

  this.svgItem.anims.left =
    new Animation(this.svgItem, -blockSz, 0, 0, 0, 0, 0.15, cmn.FRAME_RATE);

  this.svgItem.anims.right =
    new Animation(this.svgItem, blockSz, 0, 0, 0, 0, 0.15, cmn.FRAME_RATE);
};

//===========================================
// Piece.prototype.resetTransform
//===========================================
Piece.prototype.resetTransform = function() {
  this.x = 0;
  this.y = 0;
  this.svgItem.resetTransform();
};

//===========================================
// Piece.prototype.transl
//===========================================
Piece.prototype.transl = function(dx, dy) {
  this.x += dx;
  this.y += dy;
  this.svgItem.transl(dx, dy);
};

//===========================================
// Piece.prototype.setCell
//===========================================
Piece.prototype.setCell = function(i, j) {
  var w = this.blockSz;
  var x = i * w;
  var y = j * w;

  var r =
    new Rect((this.name + "-" + i) + j, [
      { name: "stroke", value: this.stroke },
      { name: "stroke-width", value: cmn.PIECE_STROKE_WIDTH },
      { name: "fill", value: this.fill },
      { name: "opacity", value: cmn.PIECE_OPACITY }
    ]);

  r.anims.dissolve =
    new Animation(r, 0, 0, 180, this.blockSz / 2, this.blockSz / 2, 0.5, cmn.FRAME_RATE, [
      { name: "opacity", value: "0.0" }
    ]);

  r.setSz(w, w);
  r.transl(x, y);
  this.svgItem.addChild(r);

  return r;
};

//===========================================
// Piece.prototype.update
//===========================================
Piece.prototype.update = function() {
  this.svgItem.update();
};

//===========================================
// Piece.prototype.moveLeft
//===========================================
Piece.prototype.moveLeft = function() {
  var anim = this.svgItem.anims.left;

  if (anim.start()) {
    this.x += anim.DX;
    this.y += anim.DY;
  }
};

//===========================================
// Piece.prototype.moveRight
//===========================================
Piece.prototype.moveRight = function() {
  var anim = this.svgItem.anims.right;

  if (anim.start()) {
    this.x += anim.DX;
    this.y += anim.DY;
  }
};

//===========================================
// Piece.prototype.spin
//===========================================
Piece.prototype.spin = function() {
  var anim = this.svgItem.anims.spin;

  if (anim.state === 0) {
    anim.ax = this.pivot[0] * this.blockSz;
    anim.ay = this.pivot[1] * this.blockSz;

    if (anim.start()) {
      this.x += anim.DX;
      this.y += anim.DY;

      this.state = (this.state + 1) % 4;
    }
  }
};

//===========================================
// Piece.prototype.erase
//===========================================
Piece.prototype.erase = function() {
  this.svgItem.erase();
  this.children = [];
};

module.exports = Piece;

