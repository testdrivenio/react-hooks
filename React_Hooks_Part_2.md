# Hooks, line and simple!
 &nbsp; &nbsp; &nbsp; &nbsp; by: ajDevs | 1/16/19
## Part 2 - Ok, I see. What else?
#### Learning Objectives
1. Are there rules to using hooks?
2. What is a custom hook?
3. What are some examples of great use cases?
### Are there rules to using hooks?

> Yes. Hooks have rules. A hook's functionality is not completely unique to React, but the implementation of hooks in react creates some unconventional rules.
> 
#### 1. Hooks cannot be used in a class component. 
&nbsp; &nbsp; &nbsp; &nbsp; Hooks must be used in either a function component or in a custom hook, which will be discussed later. 

What happens?? and more details why?

#### 2. Hooks must be called at the top level. 
> Once you have a decent grasp on the basics of hooks, you will develop an *unconditional love* for them!

&nbsp; &nbsp; &nbsp; &nbsp;  That's just a line to remember not to use hooks in conditional statements. They wont work consistently. Hooks don't play well with conditionals, loops or nested functions. This is due to the way they are initiated (instantiated?) when called in our function components. Hooks need to be called in the same order every time. That's how React can tell the difference, for example, between multiple ```useState( )``` and ```useEffect( )``` method calls in a single component. 
```
// better examples here. what not to do. top level?
const [table, setTable] = useState(false)
const [drinks, setDrinks] = useState(12)
``` 
&nbsp; &nbsp; &nbsp; &nbsp; When the above is rendered for the second time, the useState method ignores the arguments, in the is case: false, and 12, and uses the components state to read the values.
```
// DON'T DO THIS!!
if (name !== '') {
    useEffect(function persistForm() {
      localStorage.setItem('loser', name);
    });
  }
``` 
```
// DO THIS!!
useEffect(function store() {
    if (name !== '') {
      localStorage.setItem('dude', name);
    }
  });
```

#### 3. Custom hooks will start with the word *use*, camel-cased.  
> This is more of a strong suggestion than a rule. You name it, you set the parameters, you tell it what it should return, if anything. 

&nbsp; &nbsp; &nbsp; &nbsp; Following this rule will help two things. First, you know this function needs to follow the hook rules listed above. Second, consistency. When hooks become more prevalent, this consistency may help increase adoption and compatibility in the near future. Also, React has released a linter for your editors to help you avoid mistakes when developing with hooks. This linter applies the rules pertaining to hooks to custom hook functions by identifying those functions by looking for, you guessed it... *use* as the pretext to your function name, so, start your custom functions with the word use. Thanks!


### Wait, so what are custom hooks?

> Custom hooks are just functions. They have the same functionality of hooks inside your function component, and also follow the same rules. Yet, they allow you to consolidate logic and reuse hooks to again, reduce duplicate code. 

&nbsp; &nbsp; &nbsp; &nbsp; When you want share logic is two separate functions, you usually create another function to support that. Well, components are functions, and so are hooks. You can extract hook logic to be shared between components and/or functions. As stated earlier, when writing custom hooks, you name it, you set the parameters, you tell it what it should return, if anything. below is an example of a custom hook for a fetch called, useFetch.
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
&nbsp; &nbsp; &nbsp; &nbsp; One concern developers may have is what happens when ```useFetch( )``` is called all over the place in an app. Does a developer need to keep track of details of each ```useFetch( )``` call? Short answer, no. React keeps track of the calls made to ```useFetch( )``` . Each custom hook will have its own state and will not share state with other instances of the same hook. Each call to ```useState( )``` is independent from another.

### Common and useful examples of hooks

> There are many ways to use hooks. Use your imagination. Although there are unconventional rules alongside hooks, they are still very flexible and have only begun to display their potential. 

#### Simple example of comparing a Class component to a Function component.

&nbsp; &nbsp; &nbsp; &nbsp; The examples below demonstrates ```useState( )``` saving space and complexity on a very simple level.  After we show what an *old school* class component would look like without hooks, we will show the same example with hooks. 

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

&nbsp; &nbsp; &nbsp; &nbsp; In the code that follows we use hooks to simplify the code tremendously. 

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
&nbsp; &nbsp; &nbsp; &nbsp; Line count is not that important, but it went from 29 to 21. As the code gets more complex you can save a lot of space and, with that, have code that is much easier to digest and much more approachable.

#### A more complex comparison example using useEffect and useState

&nbsp; &nbsp; &nbsp; &nbsp; This will demonstrate the power of the ```useState( )``` and the ```useEffect( ) ``` functions. The first will show a component and container written using current React, without hooks.

&nbsp; &nbsp; &nbsp; &nbsp;**The Component**
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
	// reset and resubscribe if there are any changes
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
&nbsp; &nbsp; &nbsp; &nbsp;**The Container**
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

&nbsp; &nbsp; &nbsp; &nbsp; Lets implement some hooks... check it out.

&nbsp; &nbsp; &nbsp; &nbsp; **The Component**
```
import {useState, useEffect} from  'react';

const  useMedia  = (query) => {
	let [matches, setMatches] =  useState(
		window.matchMedia(query).matches
	)
	
	// componentDidMount AND componentDidUnount
	useEffect(() => {
		let  media  =  window.matchMedia(query)
		if(media.matches  !==  matches) {
			setMatches(media.matches)	
		}
		
		let  listener  = () => setMatches(media.matches)
		media.addListener(listener)
		return  media.removeListener(listener)
	}, [query])

	return  matches
}

export  default  useMedia
```
&nbsp; &nbsp; &nbsp; &nbsp;**The Container**
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

The difference... Jesus...