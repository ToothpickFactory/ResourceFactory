export function Resource() {
	const resources: Array<any> = [];
	const subs: Array<Function> = [];

	return (clazz) => {
		clazz.resources = resources;
		clazz.subs = subs;

		// Publish/Subscribe
		clazz.publish = () => clazz.subs.forEach(sub => {
			sub(clazz.resources)
		});

		clazz.unsubscribe = (sub: Function) => {
			clazz.subs = clazz.subs.filter(_sub => _sub !== sub);
		}

		clazz.subscribe = (sub: Function) => {
			clazz.subs.push(sub);
			return () => clazz.unsubscribe(sub);
		}


		// CRUD Methods
		clazz.find = (guid) => {
			return clazz.resources.find(resource => resource.guid === guid);
		}

		clazz.add = (resource) => {
			if(!resource.guid) resource.guid = Math.random().toString(36).substr(2, 9);
			clazz.resources = [...clazz.resources, resource];
			clazz.publish();
		}

		clazz.remove = (resource) => {
			clazz.resources = clazz.resources.filter(_resource => _resource.guid !== resource.guid);
			clazz.publish();
		}

		//This will need some TLC
		// clazz.update = (resource) => {
		// 	const idx = clazz.resources.findIndex(_resource => _resource.guid === resource.guid);
		// 	const newResource = Object.assign({}, clazz.resources[idx], resource);
		// 	clazz.resources.splice(idx, 1, newResource);
		// 	clazz.publish();
		// }
	}
}