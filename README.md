# ResourceFactory
Super light weight, drop dead easy to use, class based state managment store.

No more cenertlized store. Instead every class is responsible for keeping track of ever new instance created. Kinda like a good parent should be doing.

Each ResourceFactory class will store new instances created. It will also publish to all subscribers of the class when a new instance is added or removed.

ResourceFactory also has the ability to give each new instance a pubsub interface. This makes it super nice when multiple entintes rely on knowing when data is changed on a given instance.

## Why ResourceFactory?
I was tired of having to setup large and complex state managment systems just to hold on to some data and let other entintes/componets know when something changed. I loved the idea of a Class being incharge of holding onto any new instance it created and allowing others to subscribe to it. So the idea of ResourceFactory was born.

## How to use
The most simplest way to use ResourceFactory is to use ES decorators to decorate any class with ResourceFactory that you want to maintain state and be subscriable

```javascript
import { ResourceFactory } from 'ResourceFactory';

@ResourceFactory()
export class Person {
	constructor(firstName, lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
	}
}
```

and then...

```javascript
import { Person } from 'where/people/come/from/Person';

// Subscribe returns a function to call to unsubscribe
const unsub = Person.subscribe((people) => {
	// This function will be called every
	// time a new Person is created or removed
	console.log(people);
});

// Create a new person
const newPerson = Person.create('John', 'Doe');

// Pass in the resource to have it removed from the store
Person.remove(newPerson);

// Unsubscribe when done with this component or entity
unsub();

```

## Want to help?

```
To build run `npm run build`.
To server run `http-server dist/`
```