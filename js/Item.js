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
  // Item
  //===========================================
  var Item = function() {
    this.matrix = new ns.Matrix(0, 0, 0);

    this.x = 0;
    this.y = 0; // Transformed origin

    this.a = 0;
  }

  ns.Item = Item;

  //===========================================
  // Item.prototype.rot
  //===========================================
  Item.prototype.rot = function(a, x, y) {
    var m1 = new ns.Matrix(ns.px(x), ns.px(y), 0);
    var m2 = new ns.Matrix(0, 0, a);
    var m3 = new ns.Matrix(-ns.px(x), -ns.px(y), 0);

    this.matrix.multiply(m1);
    this.matrix.multiply(m2);
    this.matrix.multiply(m3);

    this.a += a;
    this.x = ns.wu(this.matrix.tx());
    this.y = ns.wu(this.matrix.ty());
  };

  //===========================================
  // Item.prototype.transl
  //===========================================
  Item.prototype.transl = function(dx, dy) {
    // 1  0  x
    // 0  1  y
    // 0  0  1

    var v = new ns.Vector(dx, dy);
    v = v.transform(new ns.Matrix(0, 0, -this.a));

    var m = new ns.Matrix(ns.px(v.at(0)), ns.px(v.at(1)), 0);
    this.matrix.multiply(m);

    this.x = ns.wu(this.matrix.tx());
    this.y = ns.wu(this.matrix.ty());
  };

  //===========================================
  // Item.prototype.resetTransform
  //===========================================
  Item.prototype.resetTransform = function() {
    this.matrix = new ns.Matrix(0, 0, 0);

    this.a = 0;
    this.x = 0;
    this.y = 0;
  };
})(SvgTetris);
