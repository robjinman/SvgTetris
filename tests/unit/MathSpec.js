var math = require('../../app/js/dev/math');

describe("math", function() {
  it("should compute transpose of 2d array", function() {
    var arr = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];

    var tArr = math.t(arr);

    expect(tArr[0]).toEqual([1, 4, 7]);
    expect(tArr[1]).toEqual([2, 5, 8]);
    expect(tArr[2]).toEqual([3, 6, 9]);
  });
});
