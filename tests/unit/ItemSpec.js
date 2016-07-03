var Item = require('../../app/js/dev/Item');

describe("Item", function() {
  var item;

  beforeEach(function() {
    item = new Item();
  });

  it("should perform translation", function() {
    item.transl(6.4, 3.1);

    expect(item.x).toEqual(6.4);
    expect(item.y).toEqual(3.1);

    item.transl(2.2, 0.8);

    expect(item.x).toEqual(8.6);
    expect(item.y).toEqual(3.9);
  });

  it("should perform simple rotation", function() {
    item.rot(45, 0, 0);

    expect(item.a).toEqual(45);

    item.rot(20, 0, 0);

    expect(item.a).toEqual(65);
  });

  it("should perform rotation about pivot", function() {
    // Imagine rotating a 4x4 square around its centre
    item.rot(90, 2, 2);

    expect(item.a).toEqual(90);
    expect(item.x).toBeCloseTo(4.0, 1);
    expect(item.y).toBeCloseTo(0.0, 1);

    // Rotate the square around its top-right corner
    item.rot(90, 4, 4);

    expect(item.a).toEqual(180);
    expect(item.x).toBeCloseTo(4.0, 1);
    expect(item.y).toBeCloseTo(8.0, 1);
  });

  it("should reset transform", function() {
    item.rot(64, 4.5, 1.1);
    item.transl(0.8, 8.5);

    item.resetTransform();

    expect(item.x).toEqual(0);
    expect(item.y).toEqual(0);
    expect(item.a).toEqual(0);
  });
});
