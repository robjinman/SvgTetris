var Matrix = require('../../app/js/dev/Matrix');

describe("Matrix", function() {
  var A;
  var B;

  beforeEach(function() {
    A = new Matrix(0, 0, 0);
    B = new Matrix(0, 0, 0);
  });

  it("should construct the identity matrix", function() {
    expect(A.at(0, 0)).toBeCloseTo(1, 3);
    expect(A.at(0, 1)).toBeCloseTo(0, 3);
    expect(A.at(0, 2)).toBeCloseTo(0, 3);
    expect(A.at(1, 0)).toBeCloseTo(0, 3);
    expect(A.at(1, 1)).toBeCloseTo(1, 3);
    expect(A.at(1, 2)).toBeCloseTo(0, 3);
  });

  it("should clone a matrix", function() {
    A.m = [
      [7, 8, 9],
      [1, 2, 3],
      [6, 5, 4]
    ];

    var B = A.clone();

    expect(A.at(0, 0)).toEqual(7);
    expect(A.at(0, 1)).toEqual(8);
    expect(A.at(0, 2)).toEqual(9);
    expect(A.at(1, 0)).toEqual(1);
    expect(A.at(1, 1)).toEqual(2);
    expect(A.at(1, 2)).toEqual(3);
  });

  it("should convert to string", function() {
    A.m = [
      [7, 8, 9],
      [1, 2, 3],
      [6, 5, 4]
    ];

    expect(A.toSvgString()).toEqual("matrix(7, 1, 8, 2, 9, 3)");
  });

  it("should multiply two matrices", function() {
    A.m = [
      [7, 8, 9],
      [1, 2, 3],
      [6, 5, 4]
    ];

    B.m = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];

    A.multiply(B);

    expect(A.at(0, 0)).toBeCloseTo(102, 3);
    expect(A.at(0, 1)).toBeCloseTo(126, 3);
    expect(A.at(0, 2)).toBeCloseTo(150, 3);
    expect(A.at(1, 0)).toBeCloseTo(30, 3);
    expect(A.at(1, 1)).toBeCloseTo(36, 3);
    expect(A.at(1, 2)).toBeCloseTo(42, 3);
  });

  // Rotation matrix
  it("should construct a transformation matrix (1)", function() {
    A = new Matrix(0, 0, 90);

    expect(A.at(0, 0)).toBeCloseTo(0, 3);
    expect(A.at(0, 1)).toBeCloseTo(-1, 3);
    expect(A.at(0, 2)).toBeCloseTo(0, 3);
    expect(A.at(1, 0)).toBeCloseTo(1, 3);
    expect(A.at(1, 1)).toBeCloseTo(0, 3);
    expect(A.at(1, 2)).toBeCloseTo(0, 3);
  });

  // Translation matrix
  it("should construct a transformation matrix (2)", function() {
    A = new Matrix(12, 19, 0);

    expect(A.at(0, 0)).toBeCloseTo(1, 3);
    expect(A.at(0, 1)).toBeCloseTo(0, 3);
    expect(A.at(0, 2)).toBeCloseTo(12, 3);
    expect(A.at(1, 0)).toBeCloseTo(0, 3);
    expect(A.at(1, 1)).toBeCloseTo(1, 3);
    expect(A.at(1, 2)).toBeCloseTo(19, 3);
  });

  // Translation and rotation
  it("should construct a transformation matrix (3)", function() {
    A = new Matrix(11, 2, 174);

    expect(A.at(0, 0)).toBeCloseTo(-0.9945, 4);
    expect(A.at(0, 1)).toBeCloseTo(-0.1045, 4);
    expect(A.at(0, 2)).toBeCloseTo(11, 3);
    expect(A.at(1, 0)).toBeCloseTo(0.1045, 4);
    expect(A.at(1, 1)).toBeCloseTo(-0.9945, 4);
    expect(A.at(1, 2)).toBeCloseTo(2, 3);
  });
});
