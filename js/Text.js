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
  // Text
  //===========================================
  var Text = function(name, str, fontSz, attr) {
    var tag = {
      name: "text",
      text: str,
      attribs: [
        { name: "class", value: "ts-text" },
        { name: "font-size", value: "" + ns.px(fontSz) + "px" }
      ].concat(attr ? attr : [])
    };

    this.fontSz = fontSz;

    Text.super_.call(this, name, tag);
  };

  ns.Text = Text;
  inherits(Text, ns.SvgItem);

  //===========================================
  // Text.prototype.setText
  //===========================================
  Text.prototype.setText = function(text) {
    if (this.textNode) this.textNode.remove();

    this.textNode = document.createTextNode(text);
    this.element.appendChild(this.textNode);
  };
})(SvgTetris);
