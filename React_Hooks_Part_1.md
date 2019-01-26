# React Hooks - a primer
 
React has benefits out the wazoo, but there are some slightly aggravating architecture principles that need to be addressed while developing larger applications. For instance, using complex higher order components to reuse stateful logic, and relying on lifecycle methods that trigger unrelated logic. Well, hooks help ease that aggravation… let’s get into it.

[There’s a more in-depth explanation on react’s motivation] (https://reactjs.org/docs/hooks-intro.html#motivation)

## Learning Objectives

1. What are Hooks?
1. Why were they implemented in React?
1. How are Hooks used?
1. Are there rules to using Hooks?
1. What is a custom Hook?
1. What are some examples?

## What are hooks?

Hooks allow you to use state and "hook into" the lifecycle methods in functional components. Hooks allow developers to reuse stateful logic between components, which simplifies component logic, and best of all, you can skip writing classes.

## Why were they implemented in React?

If you've developed using React, you know how moody complex, stateful logic can get, right? This happens when applications get several new features added to up the functionality. To try and simplify this problem, the big brains behind React thought they should find a way around this issue.

### Reuse stateful logic between components

Hooks allow developers to write simple, stateful, functional components and spend less time designing and restructuring component hierarchy while developing. How? With hooks, you can *extract* and *share* stateful logic between components.

### Simplifies component logic

When the inevitable exponential growth of logic appears in your application, simple components become a dizzying abyss of stateful logic and side effects. Lifecycle methods become cluttered with unrelated methods. Component's responsibilities grow and become inseparable. In turn, this all makes coding cumbersome and testing difficult.

### You can skip Classes

Classes are a huge part of React architecture. There are many benefits to classes, but they create a barrier to entry for beginners. With classes, you also have to remember bind *this* to event handlers and code becomes lengthy and a bit redundant. The future of coding will also not play nicely with classes as they might encourage patterns that slack behind other design patterns.

## How are hooks used?

React Hooks are available in version 16.7+.

```javascript
import  { useState, useEffect }  from  'react';
```

Simple enough, but how do you actually use these new methods? The following examples will be quite simple, but the abilities of these methods are very powerful.

### The `useState` Hook Method

The best way to use the state hook is to destructure it and set the original value. The first parameter will be used to store the state, the second to update the state.

For example:

```javascript
const [weight, setWeight] = useState(150);

onClick={() => setWeight(weight + 15)}
```

1. `weight` is the state
1. `setWeight` is a method used to update the state
1. `useState(150)` is method used to set the initial value (any primitive type) of the state to 150 at the start

It's worth noting that you can destructure the state hook many times in a single component:

```javascript
const [age, setAge] = useState(42);
const [date, setDate] = useState('with a girl');
const [todos, setTodos] = useState([{ text: 'Date' }]);
```

### The `useEffect` Hook Method

It's best to the effect Hook like you would any common lifecycle method like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.

For example:

```javascript
// similar to the componentDidMount and componentDidUpdate methods
useEffect(() => {
  document.title = `You clicked ${count} times`;
});
```

Anytime the component updates, `useEffect` will be called after render. Now, if you only wanted `useEffect` to update when the variable count was mutated, you simply add that fact to the end of the method in an array, similar to the accumulator at the end of the higher-order `reduce` method.

```javascript
// check out the variable count in the array at the end...
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [ count ]);
```

Let's combine the two examples:

```javascript
const [weight, setWeight] = useState(150);

useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [ count ]);

onClick={() => setWeight(weight + 15)}
```

So, when `onClick` is triggered, the `useEffects` method will also be called and render the new count in the title of the document just slightly after the DOM updates.

`useEffect` is perfect for making API calls.
