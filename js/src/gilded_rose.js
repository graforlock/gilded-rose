class Item {
  constructor(name, sell_in, quality) {
    this.name = name;
    this.sell_in = sell_in;
    this.quality = quality;
  }
}

// I left below as a var due to the requirement
// for globals accross the codebase.
var items = [];

const changeRate = {
  default: 1,
  10: 2,
  5: 3
};

const modifiers = {
  double: x => x * 2,
  identity: x => x,
  increases: x => -x
};

class Inventory {
  constructor() {
    this.lookup = [
      { type: 'ageing', name: 'Aged Brie' },
      { type: 'ageing', name: 'Backstage passes to a TAFKAL80ETC concert' },
      { type: 'legendary', name: 'Sulfuras, Hand of Ragnaros' },
      { type: 'regular', name: '+5 Dexterity Vest' },
      { type: 'regular', name: 'Elixir of the Mongoose' },
      { type: 'conjured', name: 'Conjured Mana Cake' }
    ];
  }

  updateInventory(items) {
    for(const item of items) {
      const { type } = this.lookup.find(x => x.name === item.name);
      switch(type) {
        case 'ageing':
          this.updateItem(item, modifiers.increases);
          break;
        case 'conjured':
          this.updateItem(item, modifiers.double);
          break;
        case 'regular':
          this.updateItem(item, modifiers.identity);
          break;
      }
      item.sell_in -= 1;
    }
  }

  updateItem = (item, modifier = identity) => {
    let rate = changeRate.default;
    if(item.sell_in <= 10) rate = changeRate[10];
    if(item.sell_in <= 5) rate = changeRate[5];
    
    item.quality -= modifier(rate);

    if(item.quality < 0) item.quality = 0;
    if(item.quality > 50) item.quality = 50;
    if(item.sell_in <= 0) item.quality = 0;
  }
}

const inventory = new Inventory(items);

function updateQuality() {
  inventory.updateInventory(items);
}
