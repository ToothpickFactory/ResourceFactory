# ResourceFactory
Super lightweight, drop dead easy to use, class based state management store.

No more centralised store. Instead, every class is responsible for keeping track of ever new instance created. Kinda like a good parent should be doing.

Each ResourceFactory class will store new instances created. It will also publish to all subscribers of the class when a new instance is added or removed.

ResourceFactory also has the ability to give each new instance a pubsub interface. This makes it super nice when multiple ententes rely on knowing when data is changed on a given instance.

## Why ResourceFactory?
I was tired of having to set up large and complex state management systems just to hold on to some data and let other ententes/components know when something changed. I loved the idea of a Class being in charge of holding onto any new instance it created and allowing others to subscribe to it. So the idea of ResourceFactory was born.

## How to use
The most simplest way to use ResourceFactory is to use ES decorators to decorate any class with ResourceFactory that you want to maintain state and be subscribable

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


## API - Static Methods
#### \<Class>.create( classArguments ) ⇒ <code>classInstance</code>
Creates a new class instance. Also adds the instance to the class store and notifies all subscribers.

#### \<Class>.add( classInstance ) ⇒ <code>classInstance</code>
Manually adds a class instance to the class store and notifies all subscribers.

#### \<Class>.remove( classInstance ) ⇒ <code>void</code>
Removes the given in class instance from the class store and notifies all subscribers.

#### \<Class>.publish() ⇒ <code>void</code>
Calls all subscribers and sends the resources array

#### \<Class>.subscribe(function) ⇒ <code>unsubscribeFunction</code>
Registers a function to the class to be called any time publish is called. Returns a function to be invoked when unregistering from the class. Also immediatly calls the passed in function and sends the current state of resources.

#### \<Class>.unsubscribe(function) ⇒ <code>void</code>
Removes a registered function from the subscriber array.


## Public static properties
#### \<Class>.resources
Array containing all instances of the given class.

#### \<Class>.subs
Array containing all registered callback functions to be called any time publish is called.



### Adding custom methods
```javascript
import { ResourceFactory } from 'ResourceFactory';

@ResourceFactory()
export class Person {
	// Custom find method
	static find(guid){
		return Person.resources.find((resource) => resource.guid === guid);
	}

	// Custom reset method
	static reset(guid){
		Person.resources = [];
		// Notifies all subscribers
		Person.publish();
	}

	constructor(firstName, lastName) {
		this.guid = Math.random().toString(36).substr(2, 9);
		this.firstName = firstName;
		this.lastName = lastName;
	}
}
```


## Want to help?

```
To build run `npm run build`.
To server run `http-server dist/`
```