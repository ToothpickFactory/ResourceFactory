export function ResourceFactory(test) {
	const resources: Array<any> = [];
	const subs: Array<Function> = [];

	return (Clazz) => {
		Clazz.resources = resources;
		Clazz.subs = subs;

		// Publish/Subscribe
		Clazz.publish = () => Clazz.subs.forEach(sub => {
			sub(Clazz.resources)
		});

		Clazz.unsubscribe = (sub: Function) => {
			Clazz.subs = Clazz.subs.filter(_sub => _sub !== sub);
		}

		Clazz.subscribe = (sub: Function) => {
			Clazz.subs.push(sub);
			return () => Clazz.unsubscribe(sub);
		}


		// CRUD Methods
		Clazz.find = (guid) => {
			return Clazz.resources.find(resource => resource.guid === guid);
		}

		Clazz.add = (resource) => {
			if(!resource.guid) resource.guid = Math.random().toString(36).substr(2, 9);
			Clazz.resources = [...Clazz.resources, new Clazz(resource)];
			Clazz.publish();
		}

		Clazz.remove = (resource) => {
			Clazz.resources = Clazz.resources.filter(_resource => _resource.guid !== resource.guid);
			Clazz.publish();
		}

		// This should be a property of a single resource
		// Clazz.update = (resource) => {
		// 	const idx = Clazz.resources.findIndex(_resource => _resource.guid === resource.guid);
		// 	const newResource = Object.assign({}, Clazz.resources[idx], resource);
		// 	Clazz.resources.splice(idx, 1, newResource);
		// 	Clazz.publish();
		// }
	}
}