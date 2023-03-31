class Counter {
	private static instance: Counter;		
	private count: number = 0;

	private constructor() {}

	public static getInstance(): Counter {
		if (!this.instance) {
			this.instance = new Counter();			
		}						
		return Counter.instance;
	}

	public getCount() {
		return this.count;
	}

	public incCount() {
		return this.count++;
	}
}

const s1 = Counter.getInstance();
console.log(s1);
s1.incCount();
s1.incCount();
console.log('Количество s1: '+s1.getCount());
const s2 = Counter.getInstance();
console.log('Количество s2: '+s2.getCount());
