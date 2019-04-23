export function ResourcePubSub<T extends {new(...args:any[]):{}}>(constructor:T) {
	return class extends constructor {
		private subs = [];

		public publish(data: any){
			this.subs.forEach(sub => sub(data))
		}

		public unsubscribe(sub: Function) {
			this.subs = this.subs.filter(_sub => _sub !== sub);
		}

		public subscribe(sub: Function) {
			this.subs = [...this.subs, sub];
			return () => this.unsubscribe(sub);
		}
	}
}
