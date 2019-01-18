# Hooks, line and simple!
by: ajDevs | 1/16/19
## Part 2 - Ok, I see. What else?
#### Learning Objectives
1. Are there rules to using hooks?
2. What is a custom hook?
3. What are some examples of great use cases?
### Are there rules to using hooks?

> TLDR: Yes, hooks have rules. Hooks must be initiated at the top level of a function component and cannot reside inside conditionals, loops, or nested components.

#### 1. Hooks must be called at the top level, in the same order, always. 
Repeat, Hooks don't play well with conditionals, loops, or nested functions. These rules are unconventional, but make sense once you understand how hooks work under the hood. Hooks need to be called in the same order within a function every time to work properly. This is because React creates an array of these hook calls to keep that order. This order helps React tell the difference, for example, between multiple ```useState( )``` and ```useEffect( )``` method calls in a single component or across an application. 
```
//This is good!
function ComponentWithHooks() {
	// top-level!
	const [table, setTable] = useState(false)
	const [drinks, setDrinks] = useState(12)

    return (
        //...
    )                      
}
``` 
When the above component is rendered for the second time, the useState method ignores the arguments, in the is case: false, and 12, and uses the component's state to retrieve the values. If the order of that changes during another render it can have adverse effects on your application's functionality. 
```
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
```
// DO THIS!!
const [DNAMatch, setDNAMatch] = useState(false)
const [name, setName] = useState(null)
useEffect(function store() {
    if (name !== '') {
		setDNAMatch(true)
	  	setName(name)
      	localStorage.setItem('dad', name);
    }
  }, []);
```

#### 2. Hooks cannot be used in a class component. 
Hooks must be initialized in either a function component or in a custom hook function. Custom hook functions can only be called within a function component and must follow the same rules as non-custom hooks do in functional components. Take note, you can still use class components within the same application. You can render your function component with hooks as a child of a class component.

#### 3. Custom hooks will start with the word *use*, camel-cased.  
> This is more of a strong suggestion than a rule. You name it, you set the parameters, you tell it what it should return, if anything. 

Following this rule will help two things. 
 * First, you know this code block needs to follow the hook rules listed above. 

 * Second, consistency with in your application. When you see ***use***Function, you know its a custom hook, and must follow the rules listed above. 
 
When hooks become more prevalent, consistency should help increase adoption and compatibility in the future. Also, React has released a linter for you to use in your text editor of choice to help you avoid mistakes when developing with hooks. This linter applies the rules pertaining to hooks to custom hook functions by identifying those functions by looking for, you guessed it... the *use* keyword as the pretext to your camel-cased function name. Start your custom functions with the word ***use***. Thanks!

### Wait, so what are custom hooks?

> TLDR: Custom hooks are just functions and follow the same rules as non-custom hooks initialized inside function components. The benefit, they allow you to consolidate logic, share data, and reuse hooks across components.

In javascript, when you want share logic between two separate functions, you create another function to support that. Well, components are functions, and so are hooks. You can extract hook logic to be shared between components. As stated earlier, when writing custom hooks, you name it (start with *use*), you set the parameters, you tell it what it should return, if anything. below is an example of a custom fetch hook.
```
import { useEffect, useState } from 'react'

const useFetch = ({ url, defaultData = null }) => {
  const [data, setData] = useState(defaultData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(url).then(res => res.json())
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
### Common and useful examples of hooks

> There are many ways to use hooks. Use your imagination. Although there are unconventional rules alongside hooks, they are still very flexible and have only begun to display their potential . 

#### Simple example of comparing a Class component to a Function component.

The examples below demonstrate the difference between a class component without hooks, first code black, and a function component with hooks, ```useState( )```. 

This class component should be pretty familiar. 

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
			this.props.onClick();
			this.setState({ clicked:  true  });  
		}  
	
		render()  {  
			return  (
				<div>
					<h1>{this.props.name}, click it!</h1>  
					<button 
						onClick={this.handleClick} 
						disabled={this.state.clicked}> 
						You Have One Chance to Click 
					</button> 
				</div> 
			);
		}  
	}

In the code that follows we use hooks to simplify the code tremendously. 

	import React,  { useState }  from  'react'; 
	 
	function OneChanceButton(props)  {
		const [clicked, setClicked] = useState(false);
		
		function doClick() { 
			props.onClick();  
			setClicked(true); 
		} 
		 
		return  (  
			<div>
				<h1>{this.props.name}, click it!</h1>
				<button 
					onClick={clicked ? undefined : doClick} 
					disabled={clicked} > 
					You Have One Chance to Click 
				</button> 
			</div> 
		);  
	}

When you implement hooks you decrease the amount of code and increase readability. As the code gets more complex, you can curb that complexity with hooks and have code that is much easier to digest and more approachable. Next, we'll compare a more complex class component with a refactored function component using a custom hook function.

This will demonstrate the power of the ```useState( )``` and the ```useEffect( ) ``` methods. The first example will show a class component and container, without hooks.

**The Class Component**
```
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
**The Container**
Notice the perceived hierarchy of the media element
```
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

Let's implement a custom hook with ```useState``` and ```useEffect```.

**The Component**
```
import {useState, useEffect} from  'react';

const  useMedia  = (query) => {
	let [matches, setMatches] =  useState(
		window.matchMedia(query).matches
	)
	
	// componentDidMount AND componentDidUnmount
	useEffect(() => {
		let  media  =  window.matchMedia(query)
		if(media.matches  !==  matches) {
			setMatches(media.matches)	
		}
		
		let  listener  = () => setMatches(media.matches)
		media.addListener(listener)
		return () => media.removeListener(listener)
	}, [query])

	return  matches
}

export  default  useMedia
```
**The Container**
```
import  React  from  'react';
import  useMedia  from  './Hooks.Media.container'

function  MediaHookless() {
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

export  default  MediaHookless;
```
[Here is a link to the Media Query repo.](https://github.com/testdrivenio/react-hooks/tree/master/media-query-custom-hooks)

### Conclusion

React hooks will have many benefits when they debut officially.
Hooks will... 
- make it easy to hook into react's life-cycle methods without using a class component
- reduce code by increasing reusability and abstracting complexity 
- help ease the way data is shared between components

I can't wait to see more powerful examples of how react hooks can be utilized. Thanks for reading!