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
var utils = require('./utils');
var SvgItem = require('./SvgItem');


//===========================================
// Rect
//===========================================
var Rect = function(name, attr) {
  var tag = {
    name: "rect",
    attribs: [
      {name: "class", value: "ts-rect"}
    ].concat(attr ? attr : [])
  };

  Rect.super_.call(this, name, tag);
};

utils.inherits(Rect, SvgItem);

//===========================================
// Rect.prototype.setSz
//===========================================
Rect.prototype.setSz = function(w, h) {
  Rect.super_.prototype.setSz.call(this, w, h);

  this.element.setAttributeNS(null, "width", cmn.px(w));
  this.element.setAttributeNS(null, "height", cmn.px(h));
};

module.exports = Rect;

