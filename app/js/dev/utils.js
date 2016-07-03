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


//===========================================
// Function.prototype.bind
//===========================================
Function.prototype.bind = function() {
  "use strict";

  var fn = this, args = Array.prototype.slice.call(arguments), object = args.shift();

  return function() {
    return fn.apply(object, args.concat(Array.prototype.slice.call(arguments)));
  };
};

//===========================================
// inherits
//===========================================
exports.inherits = function(ctor, superCtor) {
  "use strict";

  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype);
};

