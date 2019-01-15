# Skipping Class, playing hookie... with hooks!
 &nbsp; &nbsp; &nbsp; &nbsp; by: ajDevs | 1/14/19
## Part 1 - What is this hook all about?
#### Learning Objectives
1. What are Hooks?
2. Why were they implemented in React.js
3. How are hooks used? 
### What are hooks?

> Hooks allow you to use state and other React features in functional components. No need to write class components.

### Why were they implemented in React.js?

> Hooks allow developers to reuse of stateful logic between components. They simplifies component logic, and best of all, you can skip class.

&nbsp; &nbsp; &nbsp; &nbsp; If you've developed using React, you know how moody complex stateful logic can get, right?  This happens when applications get several new features added to up the functionality. To try and simplify this problem the big brains behind React.js thought they should find a way around this issue. 
#### &nbsp;  &nbsp;  Allows reuse of stateful logic between components!
&nbsp; &nbsp; &nbsp; &nbsp; Hooks allow developers to write simple, stateful, functional components and spend less time designing and restructuring component hierarchy while developing. How? With hooks, you can *extract*/*share* stateful logic between components!

#### &nbsp;  &nbsp;  Simplifies component logic!
&nbsp; &nbsp; &nbsp; &nbsp; When the inevitable exponential growth of logic appears in your application, simple components become a dizzying abyss of stateful logic and side effects. Lifecycle methods become cluttered with unrelated methods. Component's responsibilities grow and become inseparable. In turn, this all makes coding cumbersome and testing difficult.

#### &nbsp;  &nbsp;  You can skip *class*!
&nbsp; &nbsp; &nbsp; &nbsp; Classes are a huge part of React architecture. There are many benefits to classes, but they create a barrier to entry for beginners. With classes, you also have to remember bind *this* to event handlers and code becomes lengthy and a bit redundant. The future of coding will also not play nicely with classes as they might encourage patterns that slack behind other design patterns.

### How are hooks used?

> Hooks are used by accessing methods from the most recent React API in your application, v16.7+. How can a developer access these methods?

```import  { useState, useEffect }  from  'react';```

&nbsp; &nbsp; &nbsp; &nbsp; Simple enough, but how do you actually use these new methods? The following examples will be quite simple but, the abilities of these methods are very powerful.

#### &nbsp;  &nbsp; The  useState( ) hook method
&nbsp; &nbsp; &nbsp; &nbsp; The best to use the state hook is to destructure it and set the original value. The first parameter will be used to store the state, the second to update the state. For example:

```const  [weight, setWeight]  =  useState(150);```
 
 - *note:* you can do this many times in a single component like below...
 ```
const [age, setAge] = useState(42);
const [date, setDate] = useState('with a girl');
const [todos, setTodos] = useState([{ text: 'Date' }]);
```
 
weight = the state
setWeight = the method to update the state
useState(150) = the method used to set the state to 150 at the start. This can be any primitive type.

**Example:**
```
onClick={() => setWeight(weight + 15)}
```

#### &nbsp;  &nbsp; The  useEffect( ) hook method
&nbsp; &nbsp; &nbsp; &nbsp; The best to use the effect hook is to use it like you would common lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount, awesome! This is a little more complex than useState, and will take a few examples to demonstrate its power and purpose. For example:

```
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
```

&nbsp; &nbsp; &nbsp; &nbsp; Anytime the component updates, this method will be called after render. Oh, there's more functionality to be had here. For instance, if you only wanted it to update when the variable count was mutated, you simply add that fact to the end of the method in an array, similar to the accumulator at the end of the higher-order reduce method.

```
  // checkout the variable count in the array at the end...
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [ count ]);
```

&nbsp; &nbsp; &nbsp; &nbsp; So how do I trigger it again?

**Example:**
```
onClick={() => setCount(count + 1)}
```
This will trigger the useEffects method and render the new count in the title of the document just slightly after the DOM updates via useState in the previous section. 

- *Note:* this is a great place to put API calls...
