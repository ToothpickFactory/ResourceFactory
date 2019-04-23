export function ResourcePubSub<T extends {new(...args:any[]):{}}>(constructor:T) {
	return class extends constructor {
		subs = [];

		publish(data: any){
			this.subs.forEach(sub => sub(data))
		}

		unsubscribe(sub: Function) {
			this.subs = this.subs.filter(_sub => _sub !== sub);
		}

		subscribe(sub: Function) {
			this.subs = [...this.subs, sub];
			return () => this.unsubscribe(sub);
		}
	}
}
