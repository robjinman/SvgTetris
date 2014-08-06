describe("Animation", function() {
  var ns = SvgTetris;

  describe("start", function() {
    var callback = jasmine.createSpy("callback");

    var item = new ns.SvgItem("item");
    var anim = new ns.Animation(item, 1.0, 2.0, 20.0, 0, 0, 1.0, 20, [], callback);

    item.transl(5, 7);

    it("should change state from 0 to 1 when started", function() {
      expect(anim.state).toEqual(0);
      anim.start();
      expect(anim.state).toEqual(1);
    });

    it("should not move item upon starting", function() {
      expect(item.x).toEqual(5);
      expect(item.y).toEqual(7);
      expect(item.a).toEqual(0);
    });

    it("should move item by (0.05, 0.10) and rotate 1.00 degrees after 1 update", function() {
      anim.update(item);

      expect(item.x).toBeCloseTo(5.05, 2);
      expect(item.y).toBeCloseTo(7.10, 2);
      expect(item.a).toBeCloseTo(1.00, 2);
    });

    it("should finish after 20 updates and execute callback", function() {
      for (var i = 1; i < 20; ++i) {
        expect(anim.state).toEqual(1);
        expect(callback).not.toHaveBeenCalled();
        anim.update(item);
      }

      expect(anim.state).toEqual(0);
      expect(callback).toHaveBeenCalled();
    });

    it("should have moved item by (1.0, 2.0) and rotate by 20 degrees upon completion", function() {
      expect(item.x).toBeCloseTo(6.00, 2);
      expect(item.y).toBeCloseTo(9.00, 2);
      expect(item.a).toBeCloseTo(20.00, 2);
    });
  });

  describe("finish", function() {
    var item = new ns.SvgItem("item");
    var anim = new ns.Animation(item, 1.0, 2.0, 20.0, 0, 0, 1.0, 20, []);

    it("should have moved item to (5.50, 8.00) with angle 10.00 degrees half way through", function() {
      item.transl(5, 7);

      anim.start();
      for (var i = 0; i < 10; ++i) {
        anim.update(item);
      }

      expect(item.x).toBeCloseTo(5.50, 2);
      expect(item.y).toBeCloseTo(8.00, 2);
      expect(item.a).toBeCloseTo(10.00, 2);
    });

    it("should have moved and rotated item to specified position upon call to finish() method", function() {
      anim.finish(item);

      expect(item.x).toBeCloseTo(6.00, 2);
      expect(item.y).toBeCloseTo(9.00, 2);
      expect(item.a).toBeCloseTo(20.00, 2);
    });
  });
});
