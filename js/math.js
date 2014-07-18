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
  // toRadians
  //===========================================
  var toRadians = function(a) {
    return a * (Math.PI / 180.0);
  };

  //===========================================
  // t
  //
  // Returns the transpose of a 2d array.
  //===========================================
  var t = function(a) {
    return a[0].map(function(col, i) {
      return a.map(function(row) { return row[i]; });
    });
  };

  ns.toRadians = toRadians;
  ns.t = t;

})(SvgTetris);
