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


var math = require('./math');


//===========================================
// Matrix
//
// Creates a 3x3 transformation matrix
//===========================================
var Matrix = function(x, y, a) {
  var rads = math.toRadians(a);
  var cosa = Math.cos(rads);
  var sina = Math.sin(rads);

  this.m = [
    [cosa,  -sina,  x],
    [sina,  cosa,   y],
    [0,     0,      1]
  ];
};

//===========================================
// Matrix.prototype.clone
//===========================================
Matrix.prototype.clone = function() {
  var m = new Matrix(0, 0, 0);

  m.m[0] = this.m[0].slice();
  m.m[1] = this.m[1].slice();

  // SVG doesn't need this row
  //  m.m[2] = this.m[2].slice();

  return m;
};

//===========================================
// Matrix.prototype.at
//===========================================
Matrix.prototype.at = function(row, col) {
  return this.m[row][col];
};

//===========================================
// Matrix.prototype.set
//===========================================
Matrix.prototype.set = function(row, col, x) {
  this.m[row][col] = x;
};

//===========================================
// Matrix.prototype.multiply
//===========================================
Matrix.prototype.multiply = function(m) {
  var A = [[], [], []];
  var B = m.m;

  for (var i = 0; i < 3; i++) {
    A[i] = this.m[i].slice();
  }

  this.m = [
    [
      A[0][0] * B[0][0] + A[0][1] * B[1][0] + A[0][2] * B[2][0],
      A[0][0] * B[0][1] + A[0][1] * B[1][1] + A[0][2] * B[2][1],
      A[0][0] * B[0][2] + A[0][1] * B[1][2] + A[0][2] * B[2][2]
    ],

    [
      A[1][0] * B[0][0] + A[1][1] * B[1][0] + A[1][2] * B[2][0],
      A[1][0] * B[0][1] + A[1][1] * B[1][1] + A[1][2] * B[2][1],
      A[1][0] * B[0][2] + A[1][1] * B[1][2] + A[1][2] * B[2][2]
    ],/*
    [
      A[2][0] * B[0][0] + A[2][1] * B[1][0] + A[2][2] * B[2][0],
      A[2][0] * B[0][1] + A[2][1] * B[1][1] + A[2][2] * B[2][1],
      A[2][0] * B[0][2] + A[2][1] * B[1][2] + A[2][2] * B[2][2]
    ]*/
    [0, 0, 0] // SVG Doesn't need this row
  ];
};

//===========================================
// Matrix.prototype.tx
//===========================================
Matrix.prototype.tx = function() {
  return this.m[0][2];
};

//===========================================
// Matrix.prototype.ty
//===========================================
Matrix.prototype.ty = function() {
  return this.m[1][2];
};

//===========================================
// Matrix.prototype.toSvgString
//===========================================
Matrix.prototype.toSvgString = function() {
  return "matrix(" + this.m[0][0] + ", " + this.m[1][0] + ", " + this.m[0][1] +
    ", " + this.m[1][1] + ", " + this.m[0][2] + ", " + this.m[1][2] + ")";
};


module.exports = Matrix;

