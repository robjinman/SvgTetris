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


//==========PARAMETERS===========
exports.AR = 0.8;          // Aspect ratio
exports.W = 0.5;           // Game area aspect ratio
exports.FRAME_RATE = 30;

exports.PIECE_A_FILL_COLOUR = "rgb(40, 40, 40)";  // T
exports.PIECE_B_FILL_COLOUR = "rgb(80, 30, 30)";  // |
exports.PIECE_C_FILL_COLOUR = "rgb(30, 30, 80)";  // □
exports.PIECE_D_FILL_COLOUR = "rgb(80, 30, 30)";  // L
exports.PIECE_E_FILL_COLOUR = "rgb(30, 30, 80)";  // L
exports.PIECE_F_FILL_COLOUR = "rgb(80, 30, 30)";  // Z
exports.PIECE_G_FILL_COLOUR = "rgb(40, 40, 40)";  // Z

exports.PIECE_OPACITY = 1.0;
exports.PIECE_STROKE_COLOUR = "white";
exports.PIECE_STROKE_WIDTH = 0;
exports.GUI_STROKE_WIDTH = 0;
exports.GUI_STROKE_COLOUR = "white";
exports.SIDEBAR_FILL_COLOUR = "black";
exports.SIDEBAR_TEXT_COLOUR = "white";
exports.SIDEBAR_OPACITY = 0.45;
exports.GAME_AREA_COLOUR = "black";
exports.GAME_AREA_OPACITY = 0.2;
exports.PREVIEW_WINDOW_FILL_COLOUR = "rgb(180, 180, 180)";
exports.PREVIEW_WINDOW_STROKE_WIDTH = 0;
exports.PREVIEW_WINDOW_STROKE_COLOUR = "black";
exports.PREVIEW_WINDOW_OPACITY = 1.0;
exports.START_BUTTON_FILL_COLOUR = "rgb(30, 30, 80)";
exports.START_BUTTON_OPACITY = "1.0";
exports.START_BUTTON_STROKE_WIDTH = 0;
exports.START_BUTTON_STROKE_COLOUR = "black";
exports.START_BUTTON_TEXT_COLOUR = "white";
exports.GAME_STATUS_COLOUR = "white";

exports.PAUSED_TEXT_SIZE = 0.12;
exports.GAME_OVER_TEXT_SIZE = 0.08;

exports.CASCADE_EFFECT_DELTA = 0.03; // Time delay between adjacent tiles dissolving.
exports.DROP_DELAY = 0.3;
exports.DROP_SPEED = [ 0.2, 0.3, 0.4, 0.5 ]; // Time for tiles to drop 1 row, 2 rows, etc.
//===============================

exports.worldArea = [1000 * exports.W, 950];

//===========================================
// px
//
// Converts world units into pixels
//===========================================
exports.px = function(x) {
  return x * exports.worldArea[1];
};

//===========================================
// wu
//
// Converts pixels into world units
//===========================================
exports.wu = function(x) {
  return x / exports.worldArea[1];
};

