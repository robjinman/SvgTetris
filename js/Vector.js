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

var SvgTetris = SvgTetris || {};

(function(ns) {
  "use strict";

  //===========================================
  // Vector
  //===========================================
  var Vector = function(x, y) {
    this.v = [x, y, 1];
  };

  ns.Vector = Vector;

  //===========================================
  // Vector.prototype.at
  //===========================================
  Vector.prototype.at = function(i) {
    return this.v[i];
  };

  //===========================================
  // Vector.prototype.transform
  //
  // Returns new vector
  //===========================================
  Vector.prototype.transform = function(mat) {
    var mat_ = mat.clone();

    var m = new ns.Matrix(0, 0, 0);
    m.m[0][0] = this.v[0];
    m.m[1][0] = this.v[1];
    m.m[2][0] = this.v[2];

    mat_.multiply(m);

    var v = new Vector(0, 0);
    v.v[0] = mat_.m[0][0];
    v.v[1] = mat_.m[1][0];
    v.v[2] = mat_.m[2][0];

    return v;
  };
})(SvgTetris);
