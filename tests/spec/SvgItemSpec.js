describe("SvgItem", function() {
  var ns = SvgTetris;
  var item = new ns.SvgItem("item");
  var ch0 = new ns.SvgItem("child0");
  var ch1 = new ns.SvgItem("child1");
  var ch2 = new ns.SvgItem("child2");
  var ch3 = new ns.SvgItem("child3");
  var ch4 = new ns.SvgItem("child4");

  it("should add children", function() {
    item.addChild(ch0);
    item.addChild(ch1);
    item.addChild(ch2);
    item.addChild(ch3);
    item.addChild(ch4);

    expect(item.children).toEqual([ch0, ch1, ch2, ch3, ch4]);

    var ch0_g = item.g.firstChild;
    var ch1_g = ch0_g.nextSibling;
    var ch2_g = ch1_g.nextSibling;
    var ch3_g = ch2_g.nextSibling;
    var ch4_g = ch3_g.nextSibling;

    expect(ch0_g.getAttribute("id")).toEqual("child0");
    expect(ch1_g.getAttribute("id")).toEqual("child1");
    expect(ch2_g.getAttribute("id")).toEqual("child2");
    expect(ch3_g.getAttribute("id")).toEqual("child3");
    expect(ch4_g.getAttribute("id")).toEqual("child4");
  });

  it("should remove children", function() {
    item.removeChild(ch2);

    expect(item.children).toEqual([ch0, ch1, ch3, ch4]);
  });
});
