import React from 'react';
import './App.css';
import {DATA as slides} from './data'

import {
  FaPlay,
  FaPause,
  FaChevronCircleRight,
  FaChevronCircleLeft,
  FaCircle
} from 'react-icons/fa'

function Slide({
  isCurrent,
  slide,
  id, 
  title,
  children
}){
  return (
    <li
      aria-hidden={!isCurrent}
      tab-index="-1"
      className="Slide"
      style={{backgroundImage:`url(${slide.hdurl})`}}
    >
    <div className="SlideContent">
      <h2 id={id} className="Title">
        {slide.title}
      </h2>
      <div className="Explanation">
        {children}
      </div>
      
    </div>
    </li>
   
  )
}
function Slides(props){
  // props.children: (3)ARRAY
  console.log(props, 'slides');
  return (
    <ul className='Slides' {...props} />
  )
}

function Carousel(props){
  // props: (3)ARRAY
  console.log(slides, 'carousel');
  return (
    <section className='Carousel' {...props} />
  )
}

function Controls(props) {
  return <div className='Controls' {...props}/>
}

function SlideNav(props) {
  return <div className='SlideNav' {...props}/>
}

function SlideNavItem(props) {
  return <button className='SlideNavItem' {...props}/>
}

function IconButton(props) {
  return <button className='IconButton' {...props}/>
}

function SpacerGif({width}){
  return (
    <div
      style={{display:'inline-block', width}}
    />
  )
}

function App() {
  let currentIndex = 0
    return (
      <div className="App">
        <header className="App-header">
        <Carousel>
          <Slides>
            {
              slides.map((slide, index) => {
                return (
                  <Slide 
                    isCurrent={index===currentIndex}
                    key={index}
                    slide={slide}
                    children={slide.explanation}
                  />
                )
              })
            }
          
          </Slides>
          <SlideNav>
            {
              slides.map((slide, index) => {
                return (<SlideNavItem
                  key={index}
                  children={<FaCircle />}
                  isCurrent={index === currentIndex}
                  aria-label={`Slide ${index + 1}`}
                  onClick={() => {}}
                />)
              })
            }
          </SlideNav>

          <Controls>
          {
            false
              ? (
                <IconButton
                  aria-label="pause"
                  onClick={() => {}}
                  children={<FaPause />}
                />
              )
              : (
                <IconButton
                  aria-label="Play"
                  onClick={() => {}}
                  children={<FaPlay />}
                />
              )
          }
          <SpacerGif width="10px"/>
          <IconButton
            aria-label="Previous Slide"
            onClick={() => {}}
            children={<FaChevronCircleLeft />}
          />
          <SpacerGif width="10px"/>
          <IconButton
            aria-label="Next Slide"
            onClick={() => {}}
            children={<FaChevronCircleRight />}
          />
        </Controls>
      
      </Carousel>
        </header>
      </div>
    );
  }


export default App;
