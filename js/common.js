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

  //==========PARAMETERS===========
  ns.AR = 0.8;          // Aspect ratio
  ns.W = 0.5;           // Game area aspect ratio
  ns.FRAME_RATE = 30;

  ns.PIECE_A_FILL_COLOUR = "rgb(40, 40, 40)";  // T
  ns.PIECE_B_FILL_COLOUR = "rgb(80, 30, 30)";  // |
  ns.PIECE_C_FILL_COLOUR = "rgb(30, 30, 80)";  // □
  ns.PIECE_D_FILL_COLOUR = "rgb(80, 30, 30)";  // L
  ns.PIECE_E_FILL_COLOUR = "rgb(30, 30, 80)";  // L
  ns.PIECE_F_FILL_COLOUR = "rgb(80, 30, 30)";  // Z
  ns.PIECE_G_FILL_COLOUR = "rgb(40, 40, 40)";  // Z

  ns.PIECE_OPACITY = 1.0;
  ns.PIECE_STROKE_COLOUR = "white";
  ns.PIECE_STROKE_WIDTH = 0;
  ns.GUI_STROKE_WIDTH = 0;
  ns.GUI_STROKE_COLOUR = "white";
  ns.SIDEBAR_FILL_COLOUR = "black";
  ns.SIDEBAR_TEXT_COLOUR = "white";
  ns.SIDEBAR_OPACITY = 0.45;
  ns.GAME_AREA_COLOUR = "black";
  ns.GAME_AREA_OPACITY = 0.2;
  ns.PREVIEW_WINDOW_FILL_COLOUR = "rgb(180, 180, 180)";
  ns.PREVIEW_WINDOW_STROKE_WIDTH = 0;
  ns.PREVIEW_WINDOW_STROKE_COLOUR = "black";
  ns.PREVIEW_WINDOW_OPACITY = 1.0;
  ns.START_BUTTON_FILL_COLOUR = "rgb(30, 30, 80)";
  ns.START_BUTTON_OPACITY = "1.0";
  ns.START_BUTTON_STROKE_WIDTH = 0;
  ns.START_BUTTON_STROKE_COLOUR = "black";
  ns.START_BUTTON_TEXT_COLOUR = "white";
  ns.GAME_STATUS_COLOUR = "white";

  ns.PAUSED_TEXT_SIZE = 0.12;
  ns.GAME_OVER_TEXT_SIZE = 0.08;

  ns.CASCADE_EFFECT_DELTA = 0.03; // Time delay between adjacent tiles dissolving.
  ns.DROP_DELAY = 0.3;
  ns.DROP_SPEED = [ 0.2, 0.3, 0.4, 0.5 ]; // Time for tiles to drop 1 row, 2 rows, etc.
  //===============================

  ns.worldArea = [1000 * ns.W, 950];

  //===========================================
  // px
  //
  // Converts world units into pixels
  //===========================================
  ns.px = function(x) {
    return x * ns.worldArea[1];
  };

  //===========================================
  // wu
  //
  // Converts pixels into world units
  //===========================================
  ns.wu = function(x) {
    return x / ns.worldArea[1];
  };
})(SvgTetris);
