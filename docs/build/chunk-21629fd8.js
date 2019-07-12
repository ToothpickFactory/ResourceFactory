function ResourceFactory(options = {}) {
    const resources = [];
    const subs = [];
    return function (Clazz) {
        Clazz.resources = resources;
        Clazz.subs = subs;
        // Publish/Subscribe
        Clazz.publish = function () {
            Clazz.subs.forEach((sub) => sub(Clazz.resources));
        };
        Clazz.unsubscribe = function (sub) {
            Clazz.subs = Clazz.subs.filter((_sub) => _sub !== sub);
        };
        Clazz.subscribe = function (sub) {
            Clazz.subs.push(sub);
            sub(this.resources);
            return () => Clazz.unsubscribe(sub);
        };
        // CRUD Methods
        Clazz.find = options.find || null;
        Clazz.create = function () {
            const resource = new Clazz(...arguments);
            Clazz.add(resource);
            return resource;
        };
        Clazz.add = function (resource) {
            Clazz.resources = [...Clazz.resources, resource];
            Clazz.publish();
        };
        Clazz.remove = function (resource) {
            Clazz.resources = Clazz.resources.filter((_resource) => _resource !== resource);
            Clazz.publish();
        };
    };
}

function ResourcePubSub(constructor) {
    return class extends constructor {
        constructor() {
            super(...arguments);
            this.subs = [];
        }
        publish(data) {
            this.subs.forEach(sub => sub(data));
        }
        unsubscribe(sub) {
            this.subs = this.subs.filter(_sub => _sub !== sub);
        }
        subscribe(sub) {
            this.subs = [...this.subs, sub];
            return () => this.unsubscribe(sub);
        }
    };
}

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let Todo = class Todo {
    constructor(text) {
        this.text = text;
    }
};
Todo = __decorate([
    ResourceFactory()
], Todo);

export { Todo as T };
