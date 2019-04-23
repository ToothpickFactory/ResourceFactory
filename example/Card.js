var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ResourceFactory } from '../dist/ResourceFactory.js';
import { ResourcePubSub } from '../dist/ResourcePubSub.js';
let Card = class Card {
    constructor(data) {
        this.name = data.name;
        this.guid = data.guid || Math.random().toString(36).substr(2, 9);
    }
};
Card = __decorate([
    ResourceFactory({
        find: (guid) => Card.resources.find((resource) => resource.guid === guid)
    }),
    ResourcePubSub
], Card);
export { Card };
