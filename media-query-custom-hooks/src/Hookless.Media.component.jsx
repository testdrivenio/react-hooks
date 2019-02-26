import React from 'react';

class Media extends React.Component {
    // initial state
    state = {
      matches: window.matchMedia(this.props.query).matches
    }

    // initial setup
    componentDidMount(){
      this.setup()
    }

    setup() {
      let media = window.matchMedia(this.props.query)
      // screen size check
      if(media.matches !== this.state.matches) {
        this.setState({matches: media.matches})
      }
      // create a listener
      let listener = () => {
        this.setState({matches: media.matches})
      }
      // add the listener
      media.addListener(listener)
      // remove the listener
      this.removeListener = () => {
        media.removeListener(listener)
      }
    }

    componentDidUpdate(prevProps) {
      // reset and resubscribe if there are any changes
      if(prevProps.query !== this.props.query){
        this.removeListener()
        this.setup()
      }
    }

    // remove listener when unmounted
    componentWillUnmount() {
      this.removeListener()
    }

    //   give them the state!
    render() {
      return this.props.children(this.state.matches)
    }
  }

  export default Media;
