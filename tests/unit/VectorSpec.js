var Matrix = require('../../app/js/dev/Matrix');
var Vector = require('../../app/js/dev/Vector');

describe("Vector", function() {
  it("should compute transformed result", function() {
    var v = new Vector(1, 6);
    var M = new Matrix(11, 2, 174);
    v = v.transform(M);

    expect(v.at(0)).toBeCloseTo(9.3783, 4);
    expect(v.at(1)).toBeCloseTo(-3.8626, 4);
  });
});
