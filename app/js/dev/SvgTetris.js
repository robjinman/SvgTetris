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
var pieces = require('./pieces');
var Pile = require('./Pile');
var Rect = require('./Rect');
var SvgItem = require('./SvgItem');
var Text = require('./Text');


var _root = null,
  _svgRoot = null,
  _nxtPieceWin = null,
  _scoreCounter = null,
  _lvlCounter = null,
  _mainMessage = null,
  _btnStart = null,
  _btnStartText = null,

  _prevPiece = null,
  _activePiece = null,
  _nextPiece = null,

  _pieceNum = 0,

  _pile = null,
  _interval = null,
  _blockSz = 0,

  _gameState = 0,
  _speed = 0,
  _highSpeed = 0.05,
  _dy = 0,
  _level = 0,
  _levels = [
    {
      speed: 0.4,
      rowValues: [ 20, 50, 90, 140],
      numRows: 10 // Cumulative
    },
    {
      speed: 0.35,
      rowValues: [ 20, 50, 90, 140],
      numRows: 25
    },
    {
      speed: 0.3,
      rowValues: [ 20, 50, 90, 140],
      numRows: 45
    },
    {
      speed: 0.2,
      rowValues: [ 20, 50, 90, 140],
      numRows: 65
    },
    {
      speed: 0.15,
      rowValues: [ 20, 50, 90, 140],
      numRows: 90
    },
    {
      speed: 0.15,
      rowValues: [ 40, 100, 180, 240],
      numRows: 99999
    }
  ],
  _score = 0,
  _rowsCleared = 0,

  _keyStates = {
    left: false,
    up: false,
    right: false,
    down: false
  };

//===========================================
// _onResize
//===========================================
function _onResize(event) {
  var h = _svgRoot.parentNode.clientHeight;

  _root.resetTransform();
  _root.transl(cmn.wu(0.5 * (1000 - 1000 * cmn.AR)), cmn.wu(h * 0.9 * 0.05));
}

//===========================================
// _update
//===========================================
function _update() {
  if (_prevPiece) _prevPiece.update();
  _activePiece.update();

  _pile.update();

  _step();
}

//===========================================
// _minX
//===========================================
function _minX(pattern) {
  for (var i = 0; i < pattern.length; i++) {
    for (var j = 0; j < pattern[i].length; j++) {
      if (pattern[i][j]) return i * _blockSz;
    }
  }

  return 0;
}

//===========================================
// _maxX
//===========================================
function _maxX(pattern) {
  for (var i = pattern.length - 1; i >= 0; i--) {
    for (var j = 0; j < pattern[i].length; j++) {
      if (pattern[i][j]) return (i + 1) * _blockSz;
    }
  }

  return 0;
}

//===========================================
// _minY
//===========================================
function _minY(pattern) {
  for (var j = 0; j < pattern.length; j++) {
    for (var i = 0; i < pattern[j].length; i++) {
      if (pattern[i][j]) return j * _blockSz;
    }
  }

  return 0;
}

//===========================================
// _maxY
//===========================================
function _maxY(pattern) {
  for (var j = pattern.length - 1; j >= 0; j--) {
    for (var i = 0; i < pattern[j].length; i++) {
      if (pattern[i][j]) return (j + 1) * _blockSz;
    }
  }

  return 0;
}

//===========================================
// _keyUp
//===========================================
function _keyUp() {
  if (_gameState !== 0) return true;

  var pc = _activePiece;
  var bs = _blockSz * 0.9;
  var pat = pc.patterns[pc.state];
  var nxtPat = pc.patterns[(pc.state + 1) % 4];

  if (!_pile.intersects(pc.x, pc.y, nxtPat)) {
    if (pc.x + _minX(nxtPat) > 0) {
      if (pc.x + _maxX(nxtPat) < cmn.W + bs) {
        pc.spin();
      }
    }
  }

  return false;
}

//===========================================
// _keyLeft
//===========================================
function _keyLeft() {
  if (_gameState !== 0) return true;

  var pc = _activePiece;
  var bs = _blockSz * 0.9;
  var pat = pc.patterns[pc.state];

  if (pc.x + _minX(pat) > bs) {
    if (!_pile.intersects(pc.x - bs, pc.y, pat)) {
      pc.moveLeft();
    }
  }

  return false;
}

//===========================================
// _keyRight
//===========================================
function _keyRight() {
  if (_gameState !== 0) return true;

  var pc = _activePiece;
  var bs = _blockSz * 0.9;
  var pat = pc.patterns[pc.state];

  if (pc.x + _maxX(pat) < cmn.W - bs) {
    if (!_pile.intersects(pc.x + bs, pc.y, pat)) {
      pc.moveRight();
    }
  }

  return false;
}

//===========================================
// _updateScore
//===========================================
function _updateScore(rows) {
  if (rows === 0) return;

  _rowsCleared += rows;
  var lvl = _levels[_level];

  _score += lvl.rowValues[rows - 1];
  _scoreCounter.setText("Score: " + _score);

  if (_rowsCleared >= lvl.numRows) {
    _level++;

    if (_level >= _levels.length) {
      _gameOver();
      return;
    }

    lvl = _levels[_level];

    _lvlCounter.setText("Level: " + (_level + 1));
    _speed = lvl.speed;
    _setSpeed(_speed);
  }
}

//===========================================
// _setSpeed
//===========================================
function _setSpeed(s) {
  _dy = _blockSz / (s * cmn.FRAME_RATE);

  // Collision with pile is compromised when _dy gets too large
  if (_dy > _blockSz * 0.5 * 0.9) {
    _dy = _blockSz * 0.5 * 0.9;
  }
}

//===========================================
// _step
//===========================================
function _step() {
  var pc = _activePiece;
  var pat = pc.patterns[pc.state];

  if (pc.y + _maxY(pat) > 1.0 - _dy) {
    _updateScore(_pile.add(pc));
    _newPiece();

    return;
  }
  else {
    if (_pile.intersects(pc.x, pc.y + _dy + _blockSz * 0.5, pat)) {
      _updateScore(_pile.add(pc));
      _newPiece();

      return;
    }
    else {
      pc.transl(0, _dy);
    }
  }

  if (_keyStates.up) {
    _keyUp();
  }

  if (_keyStates.left) {
    _keyLeft();
  }

  if (_keyStates.right) {
    _keyRight();
  }
}

//===========================================
// _clipToGrid
//===========================================
function _clipToGrid(pc) {
  var dx = Math.round(pc.x / _blockSz) * _blockSz - pc.x;
  var dy = Math.round(pc.y / _blockSz) * _blockSz - pc.y;
  pc.transl(dx, dy);
}

//===========================================
// _newPiece
//===========================================
function _newPiece() {
  var bs = _blockSz;

  if (_nextPiece) {
    if (_activePiece) {
      _clipToGrid(_activePiece);
    }

    _prevPiece = _activePiece;
    _activePiece = _nextPiece;
    _root.addChild(_activePiece.svgItem);

    var x = bs * 4 - _minX(_activePiece.patterns[0]);
    var y = 0 - _minY(_activePiece.patterns[0]);

    _activePiece.resetTransform();
    _activePiece.transl(x, y);

    if (_pile.intersects(x, y, _activePiece.patterns[0])) {
      _root.removeChild(_activePiece.svgItem);
      _activePiece.svgItem.erase();

      _gameOver();
    }

    _nxtPieceWin.removeChild(_nextPiece.svgItem);
  }

  var n = Math.floor(Math.random() * 7);
  var piece = null;
  var name = "ts-piece" + _pieceNum;

  // Choose the next piece
  switch (n) {
    case 0: piece = new pieces.APiece(name, bs); break;
    case 1: piece = new pieces.BPiece(name, bs); break;
    case 2: piece = new pieces.CPiece(name, bs); break;
    case 3: piece = new pieces.DPiece(name, bs); break;
    case 4: piece = new pieces.EPiece(name, bs); break;
    case 5: piece = new pieces.FPiece(name, bs); break;
    case 6: piece = new pieces.GPiece(name, bs); break;
  }

  var piv = piece.pivot;
  var minX = _minX(piece.patterns[0]);
  var maxX = _maxX(piece.patterns[0]);
  var minY = _minY(piece.patterns[0]);
  var maxY = _maxY(piece.patterns[0]);
  var midX = minX + (maxX - minX) / 2;
  var midY = minY + (maxY - minY) / 2;
  var winW = _nxtPieceWin.w;
  var winH = _nxtPieceWin.h;

  piece.transl(winW / 2 - midX, winH / 2 - midY);

  _nextPiece = piece;
  _nxtPieceWin.addChild(piece.svgItem);

  _pieceNum++;
}

//===========================================
// _gameOver
//===========================================
function _gameOver() {
  clearInterval(_interval);
  _interval = null;

  var txt = new Text("ts-gameOver",
    "Game Over",
    cmn.GAME_OVER_TEXT_SIZE,
    [
      { name: "fill", value: cmn.GAME_STATUS_COLOUR }
    ]);

  txt.transl(cmn.W * 0.1, 0.5);
  txt.setSz(cmn.W * 0.8, 0.4);

  _root.addChild(txt);
  _mainMessage = txt;

  _btnStartText.setText("Restart");
  _btnStartText.element.onclick = function() { _restartGame(); _resumeGame(); }.bind(this);
  _btnStart.element.onclick = function() { _restartGame(); _resumeGame(); }.bind(this);

  _gameState = 2;
}

//===========================================
// _resumeGame
//===========================================
function _resumeGame() {
  _interval = setInterval(_update.bind(this), 1000 / cmn.FRAME_RATE);

  if (_mainMessage) {
    _root.removeChild(_mainMessage);
    _mainMessage.erase();
  }

  _btnStartText.setText("Pause");
  _btnStartText.element.onclick = _pauseGame.bind(this);
  _btnStart.element.onclick = _pauseGame.bind(this);

  _gameState = 0;
}

//===========================================
// _pauseGame
//===========================================
function _pauseGame() {
  clearInterval(_interval);
  _interval = null;

  var txt = new Text("ts-gamePaused",
    "Paused",
    cmn.PAUSED_TEXT_SIZE,
    [
      { name: "fill", value: cmn.GAME_STATUS_COLOUR }
    ]);

  txt.transl(cmn.W * 0.1, 0.5);
  txt.setSz(cmn.W * 0.8, 0.4);

  _root.addChild(txt);
  _mainMessage = txt;

  _btnStartText.setText("Resume");
  _btnStartText.element.onclick = _resumeGame.bind(this);
  _btnStart.element.onclick = _resumeGame.bind(this);

  _gameState = 1;
}

//===========================================
// _restartGame
//===========================================
function _restartGame() {
  var i;

  for (i = 0; i < _root.children.length; i++) {
    _root.children[i].erase();
  }
  _root.children = [];

  _pieceNum = 0;
  _level = 0;
  _score = 0;
  _rowsCleared = 0;
  _speed = _levels[_level].speed;
  _setSpeed(_speed);
  _gameState = 1;

  for (i in _keyStates) {
    _keyStates[i] = false;
  }

  _prevPiece = null;
  _activePiece = null;
  _nextPiece = null;

  _pile = new Pile(_root, cmn.W / _blockSz, 1.0 / _blockSz, _blockSz);

  var border = new Rect("ts-border", [
    { name: "fill", value: cmn.GAME_AREA_COLOUR },
    { name: "stroke", value: cmn.GUI_STROKE_COLOUR },
    { name: "stroke-width", value: cmn.GUI_STROKE_WIDTH },
    { name: "fill-opacity", value: cmn.GAME_AREA_OPACITY }
  ]);
  border.setSz(cmn.AR, 1.0);

  var sidebar = new Rect("ts-sidebar", [
    { name: "fill", value: cmn.SIDEBAR_FILL_COLOUR },
    { name: "fill-opacity", value: cmn.SIDEBAR_OPACITY },
    { name: "stroke", value: cmn.UI_STROKE_COLOUR },
    { name: "stroke-width", value: cmn.GUI_STROKE_WIDTH }
  ]);
  sidebar.transl(cmn.W, 0.0);
  sidebar.setSz(cmn.AR - cmn.W, 1.0);

  var b = sidebar.w * 0.1;

  _nxtPieceWin = new Rect("ts-nxtPieceWin", [
    { name: "fill", value: cmn.PREVIEW_WINDOW_FILL_COLOUR },
    { name: "stroke", value: cmn.PREVIEW_WINDOW_STROKE_COLOUR },
    { name: "fill-opacity", value: cmn.PREVIEW_WINDOW_OPACITY },
    { name: "stroke-width", value: cmn.PREVIEW_WINDOW_STROKE_WIDTH }
  ]);
  _nxtPieceWin.transl(b, b);
  _nxtPieceWin.setSz(sidebar.w * 0.8, sidebar.w * 0.8);

  sidebar.addChild(_nxtPieceWin);

  var txt1 = new Text("ts-text1",
    "SVG Tetris",
    0.04,
    [
      { name: "fill", value: cmn.SIDEBAR_TEXT_COLOUR }
    ]);

  txt1.transl(b, 0.4);
  txt1.setSz(sidebar.w * 0.8, 0.6);

  sidebar.addChild(txt1);

  var txt2 = new Text("ts-text2",
    "By Rob Jinman",
    0.03,
    [
      { name: "fill", value: cmn.SIDEBAR_TEXT_COLOUR }
    ]);

  txt2.transl(b, 0.44);
  txt2.setSz(sidebar.w * 0.8, 0.6);

  sidebar.addChild(txt2);

  _lvlCounter = new Text("ts-lvlCounter",
    "Level: 1",
    0.03,
    [
      { name: "fill", value: cmn.SIDEBAR_TEXT_COLOUR }
    ]);

  _lvlCounter.transl(b, 0.6);
  _lvlCounter.setSz(sidebar.w * 0.8, 0.1);

  sidebar.addChild(_lvlCounter);

  _scoreCounter = new Text("ts-scoreCounter",
    "Score: 0",
    0.03,
    [
      { name: "fill", value: cmn.SIDEBAR_TEXT_COLOUR }
    ]);

  _scoreCounter.transl(b, 0.65);
  _scoreCounter.setSz(sidebar.w * 0.8, 0.1);

  sidebar.addChild(_scoreCounter);

  var btnUp = new Rect("ts-btnUp", [
    { name: "opacity", value: "0" }
  ]);
  btnUp.transl(0, 0);
  btnUp.setSz(cmn.W, 0.5);
  btnUp.element.onclick = _keyUp.bind(this);

  var btnLeft = new Rect("ts-btnLeft", [
    { name: "opacity", value: "0" }
  ]);
  btnLeft.transl(0, 0.2);
  btnLeft.setSz(cmn.W * 0.4, cmn.W * 0.8);
  btnLeft.element.onclick = _keyLeft.bind(this);

  var btnDown = new Rect("ts-btnDown", [
    { name: "opacity", value: "0" }
  ]);
  btnDown.transl(0, 0.5);
  btnDown.setSz(cmn.W, 0.5);
  btnDown.element.onmousedown = function() { _onKeyDown({ keyCode: 40 }); }.bind(this);
  btnDown.element.onmouseup = function() { _onKeyUp({ keyCode: 40 }); }.bind(this);

  var btnRight = new Rect("ts-btnRight", [
    { name: "opacity", value: "0" }
  ]);
  btnRight.transl(cmn.W * 0.6, 0.2);
  btnRight.setSz(cmn.W * 0.4, cmn.W * 0.8);
  btnRight.element.onclick = _keyRight.bind(this);

  sidebar.addChild(btnRight);

  _btnStart = new Rect("ts-btnStart", [
    { name: "fill", value: cmn.START_BUTTON_FILL_COLOUR },
    { name: "stroke", value: cmn.START_BUTTON_STROKE_COLOUR },
    { name: "fill-opacity", value: cmn.START_BUTTON_OPACITY },
    { name: "stroke-width", value: cmn.START_BUTTON_STROKE_WIDTH }
  ]);
  _btnStart.transl(b, 0.7 + 6 * b);
  _btnStart.setSz(b * 8, b * 2);
  _btnStart.element.onclick = _resumeGame.bind(this);

  sidebar.addChild(_btnStart);

  _btnStartText = new Text("ts-btnStartText",
    "Start", 0.04,
    [
      { name: "fill", value: cmn.START_BUTTON_TEXT_COLOUR }
    ]);
  _btnStartText.transl(b * 2, 0.04);
  _btnStartText.setSz(b * 8, b * 2);
  _btnStartText.element.onclick = _resumeGame.bind(this);

  _btnStart.addChild(_btnStartText);

  _root.addChild(border);
  _root.addChild(sidebar);

  _root.addChild(btnUp);
  _root.addChild(btnDown);
  _root.addChild(btnLeft);
  _root.addChild(btnRight);

  _newPiece();
  _newPiece();
}

//===========================================
// _onKeyDown
//===========================================
function _onKeyDown(e) {
  if (e.keyCode == 80) {
    if (_gameState === 0) {
      _pauseGame();
    }
    else if (_gameState == 1) {
      _resumeGame();
    }

    return false;
  }

  if (_gameState === 0) {
    switch (e.keyCode) {
      case 37:
        _keyStates.left = true;
        return false;
      case 38:
        _keyStates.up = true;
        return false;
      case 39:
        _keyStates.right = true;
        return false;
      case 40:
        _setSpeed(_highSpeed);
        return false;
    }
  }

  return true;
}

//===========================================
// _onKeyUp
//===========================================
function _onKeyUp(e) {
  if (_gameState === 0) {
    switch (e.keyCode) {
      case 37:
        _keyStates.left = false;
        return false;
      case 38:
        _keyStates.up = false;
        return false;
      case 39:
        _keyStates.right = false;
        return false;
      case 40:
        _setSpeed(_speed);
        return false;
    }
  }

  return true;
}

//===========================================
// SvgTetris.init
//===========================================
exports.init = function() {
  window.onresize = _onResize.bind(this);
  window.onkeydown = _onKeyDown.bind(this);
  window.onkeyup = _onKeyUp.bind(this);

  _blockSz = cmn.W / 10.0;

  _root = new SvgItem("ts-root");
  _svgRoot = document.getElementById("svg-tetris");
  _svgRoot.setAttributeNS(null, "viewBox", [0, 0, 1000, 1000]);
  _svgRoot.appendChild(_root.g);

  _onResize();
  _restartGame();
  _onResize();
};

