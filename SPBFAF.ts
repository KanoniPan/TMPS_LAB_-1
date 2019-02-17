
	let resourceStorage = { wood: 10, glass: 10}
	abstract class Storage {
		abstract refillResources(): void;
	}
	
	class WoodStorage extends Storage {
		constructor(public value: number) {
			super();
		}
		refillResources(): void {}
	}
	
	class GlassStorage extends Storage {
		constructor(public value: number) {
			super();
		}
		refillResources(): void {
			
		}
	}
	
	abstract class AbstractFactory {
		abstract Pieces(quantity): Storage;
	}
	
	class WoodFactory extends AbstractFactory {
		Pieces(quantity): WoodStorage {
			return new WoodStorage(quantity);
		}
	}
	
	class GlassFactory extends AbstractFactory {
		Pieces(quantity): GlassStorage {
			return new GlassStorage(quantity);
		}
	}
	const woodFactory = new WoodFactory();
	const glassFactory = new GlassFactory();
	console.log(woodFactory.Pieces(4).value)
	console.log(glassFactory.Pieces(7).value)
	interface Detail {
    createDetail(quantity): number;
  }
  
  interface Factory {
		createProduct(name): Detail;
  }
  class Doors implements Detail {

    createDetail(quantity): number {
			if(resourceStorage.wood >= quantity){
				console.log(`${quantity} doors were created`)
				resourceStorage.wood -= quantity;
				console.log('wood remain',resourceStorage.wood)
				return quantity;
			}	else {
				resourceStorage.wood += woodFactory.Pieces(quantity).value;
				console.log('wood added',resourceStorage.wood)
				resourceStorage.wood -= quantity;
				console.log(`${quantity} doors were created`)
				console.log('wood remain',resourceStorage.wood)
				return quantity
			}
    }
  }
  
  class Windows implements Detail {
    createDetail(quantity): number {
			if(resourceStorage.glass >= quantity){
				console.log(`${quantity} windows were created`)
				resourceStorage.glass -= quantity;
				console.log('glass remain',resourceStorage.glass)
				return quantity;
			}	else {
				resourceStorage.glass += glassFactory.Pieces(quantity).value;
				console.log('glass added',resourceStorage.wood)
				resourceStorage.glass -= quantity;
				console.log(`${quantity} windows were created`)
				console.log('glass remain',resourceStorage.glass)
				return quantity
			}
		}
  }
  class ProductFactory implements Factory {
    createProduct(name): Detail {
      switch(name) {
        case 'doors':
          return new Doors();
        case 'windows':
          return new Windows();
        default:
          return null;
      }
    }
	}



	const factory = new ProductFactory();
	let doors = factory.createProduct('doors');
	let windows = factory.createProduct('windows');
export default class Shop {
	construct(builder) {
		builder.step1();
		builder.step2();
		return builder.get();
	}
}
class HouseBuilder {
	house : any;
	step1(){
		this.house = new House(4,4);
	};
	step2() {
		this.house.addParts();
	};
	get() {
		return this.house;
	};
}

class PenthHouseBuilder {
	house : any;
	step1(){
		this.house = new PenthHouse(6,6);
	};
	step2() {
		this.house.addParts();
	};
	get() {
		return this.house;
	};
}
class House {
	constructor(public doors: number, public windows: number) {}
	addParts() {
		this.doors = doors.createDetail(4),
		this.windows = windows.createDetail(5)
	}
	say() {
		Logger.add(`I am a ${this.doors} - door house with ${this.windows} windows`)
	}
}

class PenthHouse {
	constructor(public doors: number,public windows: number) {}
	addParts() {
		this.doors = doors.createDetail(7),
		this.windows = windows.createDetail(8)
	}
	say() {
		Logger.add(`I am a ${this.doors} - door penthhouse with ${this.windows} windows`)
	}
}

namespace Logger {
	let log = "";
	export function add(msg) {return log += msg + "\n"}
	export function show() {console.log(log); log = "";}
}
let a = Logger;
let b = Logger;
console.log(a===b);

class HousePrototype{
	constructor(private proto: any){};
	clone() {
		let house = new House(doors.createDetail(4),windows.createDetail(4));

		house.doors = this.proto.doors;
		house.windows = this.proto.windows;

		return house;
	};
}

function run() {
	
	let proto = new House(doors.createDetail(5),windows.createDetail(6));
	let prototype = new HousePrototype(proto);
	let protoHouse = prototype.clone();
	protoHouse.say();
	let shop = new Shop();
	let houseBuilder = new HouseBuilder();
	let penthhouseBuilder = new PenthHouseBuilder();
	let house = shop.construct(houseBuilder);
	let penthhouse = shop.construct(penthhouseBuilder);

	house.say();
	penthhouse.say();

	Logger.show();
	console.log(`resources remained: ${JSON.stringify(resourceStorage)}`)
	if(resourceStorage.wood < 10) {
		console.log('refilling wood Storage')
		resourceStorage.wood = resourceStorage.wood + (10 - resourceStorage.wood)
		console.log(`wood Storage refilled, the quantity is: ${resourceStorage.wood}`)
	}
	if(resourceStorage.glass < 10) {
		console.log('refilling glass Storage')
		resourceStorage.glass = resourceStorage.glass + (10 - resourceStorage.glass)
		console.log(`glass Storage refilled, the quantity is: ${resourceStorage.glass}`)
	}
};
run();