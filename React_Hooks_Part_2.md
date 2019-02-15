# React Hooks - The Rules and Custom Hooks

React hooks look great, but if you take a minute, you may realize that re-initializing multiple hook methods, such as useState and useEffect, in multiple components could slight the DRY principle we all cherish. Well, lets see how we can reuse these wonderful new built in methods by creating custom hooks. Before we dive into some new tricks involving hooks, we’ll dive into the rules using hooks and make our custom hook journey more enjoyable.

[Here is REact’s documentation for hooks] (https://reactjs.org/docs/hooks-custom.html#extracting-a-custom-hook)

## Learning Objectives

1. Are there rules to using hooks?
1. What is a custom hook?
1. When do I use custom hooks?
1. What are the benefits of using hooks? *(comparison)*

## Rules of Hooks

Yes, React Hooks have rules. These rules may seem unconventional at first glance, but once you understand the basics of how React Hooks are initiated the rules are quite easy to follow. Plus, react has a linter to keep you from breaking the rules. 

*Note: We mention custom hooks first. They will be covered in the next section*

### 1. Hooks must be called at the top level, in the same order, always.

React Hooks create an array of hook calls to keep order. This order helps React tell the difference, for example, between multiple ```useState( )``` and ```useEffect( )``` method calls in a single component or across an application. 

For example:

```javascript
//This is good!
function ComponentWithHooks() {
  // top-level!
  const [age, setAge] = useState(42);
  const [date, setDate] = useState('with a girl');
  const [todos, setTodos] = useState([{ text: 'Date' }]);

  return (
      //...
  )                      
}
```

1. On first render,`42`, `with a girl`, `[{ text: 'Date'}]` are all pushed into a state array. 
1. When the component rerenders, the `useState( )` method arguments are ignored, 
1. The values for `age`, `date`, and `todos` are retrieved from the component's state, which is the aforementioned state array.

### 2. Hooks cannot be called within conditional statements or loops.

Because of the way the hooks are initiated, they are not allowed to be used *within* conditional statements or loops. For hooks, if the order of the initializations changes during a rerender, there is a good chance your application will not function properly. You can still use conditional statements and loops in your component, but not with hooks inside thier the code blocks.

For example:

```javascript
// DON'T DO THIS!!
const [DNAMatch, setDNAMatch] = useState(false)

if (name !== '') {
  setDNAMatch(true)
  const [name, setName] = useState(name)

  useEffect(function persistFamily() {
    localStorage.setItem('dad', name);
  }, []);
}
```

```javascript
// DO THIS!!
const [DNAMatch, setDNAMatch] = useState(false)
const [name, setName] = useState(null)

useEffect(() => {
  if (name !== '') {
    setDNAMatch(true)
    setName(name)
    localStorage.setItem('dad', name);
  }
}, []);
```

### 3. Hooks cannot be used in a class component. 

Hooks must be initialized in either a function component or in a custom hook function. Custom hook functions can only be called within a function component and must follow the same rules as non-custom hooks. Take note, you can still use class components within the same application. You can render your function component with hooks as a child of a class component.

### 4. Custom hooks will start with the word *use*, camel-cased.  

This is more of a strong suggestion than a rule. You name the custom hook, you set the parameters, you tell it what it should return, if anything. Following this rule will, you know this code block needs to follow the hook rules listed above. This rule will help with consistency in your application, as well. So again, When you see a ***use***Function, you know its a custom hook, and must follow the rules listed above. This is also caught by react's linter, just a heads up.

## What are custom hooks?

Custom hooks are just functions and follow the same rules as non-custom hooks. The benefit, they allow you to consolidate logic, share data, and reuse hooks across components. 

### When do I use custom hooks?

Custom Hooks are best used when you need to share logic between components. In javascript, when you want share logic between two separate functions, you create another function to support that. Well, components are functions, and so are hooks. You can extract hook logic to be shared between components all around your application. As stated earlier, when writing custom hooks, you name it (start with *use*), you set the parameters, and you tell it what it should return, if anything.

For Example:

```javascript
import { useEffect, useState } from 'react'

const useFetch = ({ url, defaultData = null }) => {
  const [data, setData] = useState(defaultData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(res => {
        setData(res)
        setLoading(false)
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, [])
  
  const fetchResults = {
    data,
    loading,
    error
  }
  
  return fetchResults
}

export default useFetch
```

When you are trying to think about a situation for when you would use a custom hook, use your imagination. Although there are unconventional rules alongside hooks, they are still very flexible and have only begun to display their potential.

## What are the benefits of using hooks?.

Hooks allow you to curb complexity as you app grows and help you write code that is much easier to digest and more approachable. The code below is a comparison of two components that have the same functionality. After the first comparison, we will demonstrate more benefits using a custom hook in a component that is accompanied by a container.

The following class component should be pretty familiar. *(no hooks)* 

```javascript
import React from 'react'

class OneChanceButton extends React.Component  {
  constructor(props){
    super(props) 
    state =  {
      clicked: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    return this.setState({ clicked:  true  });
  }
  
  render()  {
    return  (
      <div>
        <button
          onClick={this.handleClick}
          disabled={this.state.clicked}>
          You Have One Chance to Click
        </button>
      </div>
    );
  }
}
```

In the code that follows we **use hooks** to simplify the code and increase readability. 

```javascript
import React,  { useState }  from  'react'; 

function OneChanceButton(props)  {
  const [clicked, setClicked] = useState(false);

  function doClick() {
    return setClicked(true); 
  } 

  return  (  
    <div>
      <button 
        onClick={clicked ? undefined : doClick} 
        disabled={clicked} > 
        You Have One Chance to Click 
      </button> 
    </div> 
  );  
}
```

### A more complex comparison

This comparison will demonstrate the power of implementing custom hooks by utilizing ```useState( )``` and the ```useEffect( ) ``` methods.

The first two "files" below display a Class Component followed by Container - NO HOOKS

The last two "files" display a Functional Component followed by Container - WITH HOOKS

#### *The Class Component - No Hooks*

*this class component uses state, and lifecycle methods*

```javascript
import  React  from  'react';

class  Media  extends  React.Component {
  // initial state
  state  = {
    matches:  window.matchMedia(this.props.query).matches
  }
  // initial setup
  componentDidMount(){
    this.setup()
  }
  
  setup() {
    let  media  =  window.matchMedia(this.props.query)
    // screen size check
    if(media.matches  !==  this.state.matches) {
      this.setState({matches:  media.matches})
    }
    
    // create a listener
    let  listener  = () => {
      this.setState({matches:  media.matches})
    }

    // add the listener
    media.addListener(listener)

    // add remove listener
    this.removeListener  = () => {
      media.removeListener(listener)
    }
  }
  
  componentDidUpdate(prevProps){
    // reset and re-subscribe if there are any changes
    if(prevProps.query  !==  this.props.query){
      this.removeListener()
      this.setup()
    }	
  }

  // remove listener when unmounted
  componentWillUnmount(){
    this.removeListener()
  }

  // give the app what it wants ...state!
  render() {
    return  this.props.children(this.state.matches)
  }
}

export  default  Media;
```

#### *The Container - No Hooks*

*Notice the perceived hierarchy of the media element*

```javascript
import  React, { Component } from  'react';
import  Media  from  './Hookless.Media.container'

class  MediaHookless  extends  Component {
  render() {
    return (
      <Media  query="(max-width: 400px)">
        {small  => (
          <Media  query="(min-width: 800px)">
            { large  => (
              <div  className='media'>
                <h1>Media</h1>
                  <p>
                    Small ? 
                    {small ? 'YEP' : 'NOPE'}
                  </p>
                  <p>
                    Large ? 
                    {large ? 'YEP' : 'NOPE'}
                  </p>
              </div>
            )}
          </Media>
        )}
      </Media>
    );
  }
}

export  default  MediaHookless;
```

Let's implement a custom hook with ```useState( )``` and ```useEffect( )```.

#### *The Functional Component - With Hooks*

```javascript
import {useState, useEffect} from  'react';

const  useMedia  = (query) => {
  let [matches, setMatches] =  useState(
    window.matchMedia(query).matches
  )

  // abstracts componentDidMount AND componentDidUnmount
  useEffect(() => {
    let  media  =  window.matchMedia(query)

    if(media.matches  !==  matches) {
      setMatches(media.matches)	
    }

    let  listener  = () => setMatches(media.matches)
    media.addListener(listener)

    // abstracts componentWillUnmount
    return () => media.removeListener(listener)
  }, [query])

  return  matches
}

export  default  useMedia
```

#### *The Container - With Custom Hook!*

```javascript
import  React  from  'react';
import  useMedia  from  './Hooks.Media.container'

function  MediaHooks() {
let  small  =  useMedia("(max-width: 400px)")
let  large  =  useMedia("(min-width: 800px)")

  return (
    <div  className='media'>
      <h1>Media</h1>
      <p>
        Small ? {small ? 'YEP' : 'NOPE'}
      </p>
      <p>
        Large ? {large ? 'YEP' : 'NOPE'}
      </p>
    </div>
  )
}

export  default  MediaHooks;
```

[The Media Query repo.](https://github.com/testdrivenio/react-hooks/tree/master/media-query-custom-hooks)

Want more?

[A more complex example using ```useRef( )``` and ```useReducer( )```.](https://github.com/testdrivenio/react-hooks/tree/master/media-query-custom-hooks)

## Conclusion

React hooks will have many benefits when they debut officially.
Hooks will... 
- make it easy to hook into react's life-cycle methods without using a class component
- reduce code by increasing reusability and abstracting complexity 
- help ease the way data is shared between components

I can't wait to see more powerful examples of how react hooks can be utilized. Thanks for reading!
