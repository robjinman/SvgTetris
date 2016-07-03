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
var Item = require('./Item');


//===========================================
// SvgItem
//===========================================
var SvgItem = function(name, tag) {
  SvgItem.super_.call(this);

  this.name = name;
  this.children = [];

  this.anims = {};

  this.g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  this.g.setAttribute("id", name);

  if (tag) {
    this.element = document.createElementNS("http://www.w3.org/2000/svg", tag.name);

    for (var i = 0; i < tag.attribs.length; i++) {
      this.element.setAttribute(tag.attribs[i].name, tag.attribs[i].value);
    }

    if (tag.text) {
      this.textNode = document.createTextNode(tag.text);
      this.element.appendChild(this.textNode);
    }

    this.g.appendChild(this.element);
  }
};

utils.inherits(SvgItem, Item);

//===========================================
// SvgItem.prototype.addChild
//===========================================
SvgItem.prototype.addChild = function(child) {
  this.g.appendChild(child.g);
  this.children.push(child);
};

//===========================================
// SvgItem.prototype.removeChild
//===========================================
SvgItem.prototype.removeChild = function(child) {
  for (var i = 0; i < this.children.length; i++) {
    if (this.children[i] == child) {
      this.children.splice(i, 1);
      break;
    }
  }
};

//===========================================
// SvgItem.prototype.setSz
//===========================================
SvgItem.prototype.setSz = function(w, h) {
  this.g.setAttributeNS(null, "width", cmn.px(w));
  this.g.setAttributeNS(null, "height", cmn.px(h));

  this.w = w;
  this.h = h;
};

//===========================================
// SvgItem.prototype.transl
//===========================================
SvgItem.prototype.transl = function(dx, dy) {
  SvgItem.super_.prototype.transl.call(this, dx, dy);

  this.g.setAttributeNS(null, "transform", this.matrix.toSvgString());
};

//===========================================
// SvgItem.prototype.rot
//===========================================
SvgItem.prototype.rot = function(a, x, y) {
  SvgItem.super_.prototype.rot.call(this, a, x, y);

  this.g.setAttributeNS(null, "transform", this.matrix.toSvgString());
};

//===========================================
// SvgItem.prototype.resetTransform
//===========================================
SvgItem.prototype.resetTransform = function() {
  SvgItem.super_.prototype.resetTransform.call(this);

  this.g.setAttributeNS(null, "transform", this.matrix.toSvgString());
};

//===========================================
// SvgItem.prototype.update
//===========================================
SvgItem.prototype.update = function() {
  for (var i in this.anims) {
    this.anims[i].update(this);
  }
};

//===========================================
// SvgItem.prototype.erase
//===========================================
SvgItem.prototype.erase = function() {
  this.g.remove();
  this.children = [];
};

module.exports = SvgItem;

