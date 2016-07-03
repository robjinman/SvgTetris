var math = require('../../app/js/dev/math');
var Piece = require('../../app/js/dev/Piece');
var Pile = require('../../app/js/dev/Pile');

describe("Pile", function() {
  var mockRoot = {
    removeChild: function(c) {}
  };

  var pile = new Pile(mockRoot, 10, 15, 0.1);

  var piece = new Piece("piece", "green", 2, 0.1);

  var a = piece.setCell(1, 0);
  var b = piece.setCell(1, 1);
  var c = piece.setCell(2, 1);
  var d = piece.setCell(1, 2);

  piece.patterns = [
    math.t([
      [0, a, 0, 0],
      [0, b, c, 0],
      [0, d, 0, 0],
      [0, 0, 0, 0]
    ]),
    math.t([
      [0, c, 0, 0],
      [a, b, d, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]),
    math.t([
      [0, d, 0, 0],
      [c, b, 0, 0],
      [0, a, 0, 0],
      [0, 0, 0, 0]
    ]),
    math.t([
      [0, 0, 0, 0],
      [d, b, a, 0],
      [0, c, 0, 0],
      [0, 0, 0, 0]
    ])
  ];

  it("should correctly add piece", function() {
    piece.transl(0, 0);

    piece.spin();
    while (piece.svgItem.anims["spin"].state == 1) {
      piece.update();
    }

    pile.add(piece);

    expect(pile.grid[0][1].piece).toEqual(piece);
    expect(pile.grid[0][1].cell).toEqual(a);
    expect(pile.grid[1][1].piece).toEqual(piece);
    expect(pile.grid[1][1].cell).toEqual(b);
    expect(pile.grid[1][0].piece).toEqual(piece);
    expect(pile.grid[1][0].cell).toEqual(c);
    expect(pile.grid[2][1].piece).toEqual(piece);
    expect(pile.grid[2][1].cell).toEqual(d);

    piece.transl(0.2, 0.5);

    piece.spin();
    while (piece.svgItem.anims["spin"].state == 1) {
      piece.update();
    }

    pile.add(piece);

    expect(pile.grid[3][7].piece).toEqual(piece);
    expect(pile.grid[3][7].cell).toEqual(a);
    expect(pile.grid[3][6].piece).toEqual(piece);
    expect(pile.grid[3][6].cell).toEqual(b);
    expect(pile.grid[2][6].piece).toEqual(piece);
    expect(pile.grid[2][6].cell).toEqual(c);
    expect(pile.grid[3][5].piece).toEqual(piece);
    expect(pile.grid[3][5].cell).toEqual(d);
  });

  it("should detect intersections", function() {
    pattern = math.t([
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0]
     ]);

    expect(pile.intersects(0.0, 0.2, pattern)).toEqual(false);
    expect(pile.intersects(0.4, 0.5, pattern)).toEqual(false);
    expect(pile.intersects(0.1, 0.1, pattern)).toEqual(true);
  });

  it("should erase cell", function() {
    pile.eraseCell(pile.grid[3][6]);

    // Should still remain in grid
    expect(pile.grid[3][6].piece).toEqual(piece);
    expect(pile.grid[3][6].cell).toEqual(b);

    // Cell should be removed from piece
    expect(piece.svgItem.children).toEqual([a, c, d]);
  });
});
