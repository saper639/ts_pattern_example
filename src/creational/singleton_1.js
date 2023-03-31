class Counter {

	constructor() {
		if (Counter.instance) {
			return Counter.instance;
		}
		this.count = 0;
		Counter.instance = this;
		return this;
	}
  
	getCount() {
		return this.count;
	}
  
	increaseCount() {
		return this.count++;
	}

}

let c1 = new Counter();
console.log('c1', c1.getCount());
c1.increaseCount();
c1.increaseCount();
console.log('c1', c1.getCount());
let c2 = new Counter();
console.log('c2', c2.getCount());

