# TMPS_LAB №1
### Made using TypeScript
*Simple Factory, Abstract Factory, Builder, Singleton, Prototype.*
___
It is a laboratory work by number 1, where 5 template have been used. 

* This is Singleton, it helps me to show the messages which i print on console. To proof it, i created 2 instances of Logger a and b, then i made a===b, and saw on console true, that means that this is singleton
```
namespace Logger {
  let log = "";
  export function add(msg) {return log += msg + "\n"}
  export function show() {console.log(log); log = "";}
}
```
* This is somepieces of Builder. This is class `Shop` in which i got constuct with 1 argument `builder`. For example i have class `HouseBuilder`, where i got steps  and in my class `Shop` now i can use those steps to create my House (you can see example below of creating new House), i create variable `houseBuilder` which contains instance of `HouseBuilder` then i construct house using `Shop` class and giving there my instance of HouseBuilder
```
export default class Shop {
  construct(builder) {
    builder.step1();
    builder.step2();
    return builder.get();
  }
}
__________________________________________________
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
___________________________________________________
  let houseBuilder = new HouseBuilder();
  let house = shop.construct(houseBuilder);
```

* This is my prototype, class `HousePrototype` has clone method in which i clone class `House` and get the same properties as my original `House`
```
class HousePrototype{
  constructor(private proto: any){};
  clone() {
    let house = new House(doors.createDetail(4),windows.createDetail(4));

    house.doors = this.proto.doors;
    house.windows = this.proto.windows;

    return house;
  };
}
___________________________________________________
  let proto = new House(doors.createDetail(5),windows.createDetail(6));
  let prototype = new HousePrototype(proto);
  let protoHouse = prototype.clone();
```
* Factory pattern: firstly i create interface `Detail` with createDetail method with quantity argument, then i create interface `Factory` and get `createProduct` implementing `Detail`, after this i create class `ProductFactory` which implements `Factory` so i can create products, which can be chosen by switch case. I chose class `Doors` to show how it is implemented,firstly it implements `createDetail` method in this method i have check if i got enought resources it create doors, if not it gets resources and then create doors ( it contains some realization of Abstract Factory)
```
  interface Detail {
    createDetail(quantity): number;
  }
_____________________________________
  interface Factory {
    createProduct(name): Detail;
 }
_________________________________________
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
_______________________________________
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
```
* Abstract Factory, this is just example of WoodFactory, firstly i create Abstract class`Storage`
where i got `refillResources` method which i use to refill my resouces if i need, then i have class `WoodStorage` which extends Storage so i can refill resources, i got `AbstractFactory` which got abstract `Pieces` there i put quantity of items i need (for example wood or glass), then i create class `WoodFactory` which extends methods of `AbstractFactory` so i can create `Pieces` that i need
```
  abstract class Storage {
    abstract refillResources(): void;
  }
_________________________________
  class WoodStorage extends Storage {
    constructor(public value: number) {
    super();
  }
    refillResources(): void {}
	}
_________________________________
  abstract class AbstractFactory {
    abstract Pieces(quantity): Storage;
  }
_________________________________
  class WoodFactory extends AbstractFactory {
    Pieces(quantity): WoodStorage {
      return new WoodStorage(quantity);
    }
  }
```