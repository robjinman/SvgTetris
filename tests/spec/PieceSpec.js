describe("Piece", function() {
  var ns = SvgTetris;
  var piece = new ns.Piece("piece", "green", 2, 0.1);

  var a = piece.setCell(1, 0);
  var b = piece.setCell(1, 1);
  var c = piece.setCell(2, 1);
  var d = piece.setCell(1, 2);

  piece.patterns = [
    ns.t([
      [0, a, 0, 0],
      [0, b, c, 0],
      [0, d, 0, 0],
      [0, 0, 0, 0]
    ]),
    ns.t([
      [0, c, 0, 0],
      [a, b, d, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]),
    ns.t([
      [0, d, 0, 0],
      [c, b, 0, 0],
      [0, a, 0, 0],
      [0, 0, 0, 0]
    ]),
    ns.t([
      [0, 0, 0, 0],
      [d, b, a, 0],
      [0, c, 0, 0],
      [0, 0, 0, 0]
    ])
  ];

  it("should change pattern upon rotation", function() {
    var anim = piece.svgItem.anims["spin"];

    expect(piece.state).toEqual(0);

    piece.spin();                     // Spin the piece
    expect(piece.state).toEqual(1);
    while (anim.state == 1) {         // Update until animation is complete
      piece.update();
    }
    piece.update();                   // Make another superfluous update
    expect(piece.state).toEqual(1);

    piece.spin();
    expect(piece.state).toEqual(2);
    while (anim.state == 1) {
      piece.update();
    }
    piece.update();
    expect(piece.state).toEqual(2);

    piece.spin();
    expect(piece.state).toEqual(3);
    while (anim.state == 1) {
      piece.update();
    }
    piece.update();
    expect(piece.state).toEqual(3);

    piece.spin();
    expect(piece.state).toEqual(0);
    while (anim.state == 1) {
      piece.update();
    }
    piece.update();
    expect(piece.state).toEqual(0);
  });
});
