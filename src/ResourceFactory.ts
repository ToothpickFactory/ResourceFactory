interface IResourceFactory {
	find?: Function;
}

export function ResourceFactory(options: IResourceFactory = {}) {
	const resources: Array<any> = [];
	const subs: Array<Function> = [];

	return function(Clazz) {
		Clazz.resources = resources;
		Clazz.subs = subs;

		// Publish/Subscribe
		Clazz.publish = function(): void {
			Clazz.subs.forEach((sub: Function) => sub(Clazz.resources));
		}

		Clazz.unsubscribe = function(sub: Function): void {
			Clazz.subs = Clazz.subs.filter((_sub: Function) => _sub !== sub);
		}

		Clazz.subscribe = function(sub: Function): Function {
			Clazz.subs.push(sub);
			return () => Clazz.unsubscribe(sub);
		}

		// CRUD Methods
		Clazz.find = options.find || null;

		Clazz.create = function<T>(): T {
			const resource = new Clazz(...arguments);
			Clazz.add(resource);
			return resource;
		}

		Clazz.add = function<T>(resource: T): void {
			Clazz.resources = [...Clazz.resources, resource];
			Clazz.publish();
		}

		Clazz.remove = function<T>(resource: T): void {
			Clazz.resources = Clazz.resources.filter((_resource: T) => _resource !== resource);
			Clazz.publish();
		}
	}
}