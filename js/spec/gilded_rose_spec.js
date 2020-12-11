describe('Gilded Rose', () => {

  describe('Regular Item', () => {
    beforeEach(() => {
      items = [new Item('+5 Dexterity Vest', 1, 100)];
    });

    it('trims down an overly high value', () => {
      [item] = items;
      updateQuality();
      expect(item.quality).toEqual(50);
    });

    it('does not go below 0', () => {
      items[0].quality = 0;
      [item] = items;
      updateQuality();
      updateQuality();
      updateQuality();
      expect(item.quality).toEqual(0);
    });

    it('decreases quality by 1 at all times', () => {
      items[0].sell_in = 13;
      items[0].quality = 5;
      [item] = items;
      updateQuality();
      updateQuality();
      updateQuality();
      expect(item.quality).toEqual(2);
    });
  });

  describe('Cheese Item', () => {
    beforeEach(() => {
      items = [new Item('Aged Brie', 1, 100)];
    });

    it('trims down an overly high value', () => {
      [item] = items;
      updateQuality();
      expect(item.quality).toEqual(50);
    });

    it('does not go above 50', () => {
      items[0].sell_in = 5;
      items[0].quality = 48;
      [item] = items;
      updateQuality();
      updateQuality();
      updateQuality();
      expect(item.quality).toEqual(50);
    });

    it('increases quality by 1', () => {
      items[0].sell_in = 13;
      items[0].quality = 5;
      [item] = items;
      updateQuality();
      updateQuality();
      updateQuality();
      expect(item.quality).toEqual(8);
    });

    it('increases quality by 2 when after sell date', () => {
      items[0].sell_in = 1;
      items[0].quality = 7;
      [item] = items;
      updateQuality();
      updateQuality();
      updateQuality();
      expect(item.quality).toEqual(12);
    });

  });

  describe('Legendary Item', () => {
    beforeEach(() => {
      items = [new Item('Sulfuras, Hand of Ragnaros', 1, 100)];
    });

    it('does not trim down an overly high value', () => {
      [item] = items;
      updateQuality();
      expect(item.quality).toEqual(100);
    });

    it('does not change', () => {
      items[0].sell_in = 5;
      items[0].quality = 48;
      [item] = items;
      updateQuality();
      updateQuality();
      updateQuality();
      expect(item.quality).toEqual(48);
      expect(item.sell_in).toEqual(5);
    });

  });

  describe('Conjured Item', () => {
    beforeEach(() => {
      items = [new Item('Conjured Mana Cake', 1, 100)];
    });

    it('trims down an overly high value', () => {
      [item] = items;
      updateQuality();
      expect(item.quality).toEqual(50);
    });

    it('does not go below 0', () => {
      items[0].quality = 0;
      [item] = items;
      updateQuality();
      updateQuality();
      updateQuality();
      expect(item.quality).toEqual(0);
    });

    it('decreases quality by 2 in all circumstances', () => {
      items[0].sell_in = 13;
      items[0].quality = 10;
      [item] = items;
      updateQuality();
      updateQuality();
      updateQuality();
      expect(item.quality).toEqual(4);
    });

  });

  describe('Ticket Item', () => {
    beforeEach(() => {
      items = [new Item('Backstage passes to a TAFKAL80ETC concert', 1, 100)];
    });

    it('trims down an overly high value', () => {
      [item] = items;
      updateQuality();
      expect(item.quality).toEqual(50);
    });

    it('does not go below 0', () => {
      items[0].quality = 0;
      [item] = items;
      updateQuality();
      updateQuality();
      updateQuality();
      expect(item.quality).toEqual(0);
    });

    it('increases quality by 1 when more than 10 days', () => {
      items[0].sell_in = 20;
      items[0].quality = 7;
      [item] = items;
      updateQuality();
      updateQuality();
      updateQuality();
      expect(item.quality).toEqual(10);
    });

    it('increases quality by 2 when less or equal 10 days', () => {
      items[0].sell_in = 10;
      items[0].quality = 7;
      [item] = items;
      updateQuality();
      updateQuality();
      updateQuality();
      expect(item.quality).toEqual(13);
    });

    it('increases quality by 3 when less or equal 5 days', () => {
      items[0].sell_in = 5;
      items[0].quality = 10;
      [item] = items;
      updateQuality();
      updateQuality();
      updateQuality();
      expect(item.quality).toEqual(19);
    });

  });
});
