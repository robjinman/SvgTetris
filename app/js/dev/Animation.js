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


var Matrix = require('./Matrix');
var Vector = require('./Vector');


//===========================================
// Animation
//
// Animates a SvgItem, or possibly just a Item if attribs are omitted.
//===========================================
var Animation = function(item, dx, dy, da, ax, ay, t, frameRate, attribs, callback) {
  this.tmpCallback = this.callback = callback;

  this.n = this.numFrames = Math.round(t * frameRate);

  this.DY = dy;
  this.DX = dx;
  this.DA = da;
  this.T = t;

  this.dx = dx / this.n;
  this.dy = dy / this.n;
  this.da = da / this.n;

  this.ax = ax;
  this.ay = ay;

  this.attribs = [];

  for (var i in attribs) {
    var val = attribs[i].value;
    var curVal = Number(item.element.getAttribute(attribs[i].name));

    this.attribs.push({
      name: attribs[i].name,
      value: attribs[i].value,
      delta: (val - curVal) / this.n
    });
  }

  this.state = 0;
};

//===========================================
// Animation.prototype.start
//===========================================
Animation.prototype.start = function(callback) {
  if (this.state === 0) {
    this.tmpCallback = callback ? callback : this.callback;

    this.n = this.numFrames;
    this.state = 1;

    return true;
  }

  return false;
};

//===========================================
// Animation.prototype.update
//===========================================
Animation.prototype.update = function(item) {
  if (this.state == 1) {
    item.rot(this.da, this.ax, this.ay);

    var v = new Vector(this.dx, this.dy);
    v.transform(new Matrix(0, 0, item.a));

    item.transl(v.at(0), v.at(1));

    for (var i in this.attribs) {
      var val = Number(item.element.getAttribute(this.attribs[i].name));
      val += this.attribs[i].delta;
      item.element.setAttributeNS(null, this.attribs[i].name, val);
    }

    this.n--;

    if (this.n <= 0) {
      this.state = 0;

      if (this.tmpCallback) {
        this.tmpCallback();
      }
    }
  }
};

//===========================================
// Animation.prototype.finish
//===========================================
Animation.prototype.finish = function(item) {
  while (this.state == 1) {
    this.update(item);
  }
};

module.exports = Animation;

