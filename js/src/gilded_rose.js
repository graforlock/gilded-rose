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

const double = x => x * 2;
const identity = x => x;
const increases = x => -x;
const doubleIncrease = x => double(increases(x));
const doubleDecrease = x => double(identity(x));

class Inventory {
  constructor() {
    this.lookup = [
      { type: 'cheese', name: 'Aged Brie' },
      { type: 'ticket', name: 'Backstage passes to a TAFKAL80ETC concert' },
      { type: 'legendary', name: 'Sulfuras, Hand of Ragnaros' },
      { type: 'regular', name: '+5 Dexterity Vest' },
      { type: 'regular', name: 'Elixir of the Mongoose' },
      { type: 'conjured', name: 'Conjured Mana Cake' }
    ];
  }

  getTicketRate(item) {
    if(item.sell_in <= 5) return changeRate[5];
    if(item.sell_in <= 10) return changeRate[10];
    return changeRate.default
  }

  updateInventory(items) {
    for(const item of items) {
      const { type } = this.lookup.find(x => x.name === item.name);
      const isSold = item.sell_in > 0;
      switch(type) {
        case 'cheese':
          this.updateItem(item, isSold ? increases : doubleIncrease);
          break;
        case 'conjured':
          this.updateItem(item, double);
          break;
        case 'regular':
          this.updateItem(item, isSold ? identity : doubleDecrease);
          break;
        case 'ticket':
          this.updateItem(item, increases, this.getTicketRate(item));
          if(!isSold) item.quality = 0;
          break;
      }
    }
  }

  updateItem = (item, operation = identity, rate = changeRate.default) => {    
    item.quality -= operation(rate);
    item.sell_in -= 1;

    if(item.quality < 0) item.quality = 0;
    if(item.quality > 50) item.quality = 50;
  }
}

const inventory = new Inventory(items);

function updateQuality() {
  inventory.updateInventory(items);
}
