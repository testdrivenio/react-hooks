import React, { Component } from 'react';
import Media from './Hookless.Media.component';

class MediaHookless extends Component {
  render() {
    return (
      <Media query="(max-width: 400px)">
        {
          small => (
            <Media query="(min-width: 800px)">
              {
                large => (
                  <div className="media">
                    <h1>Media Component without hooks</h1>
                    <p>
                      Small ?&nbsp;
                      {small ? 'YEP' : 'NOPE'}
                    </p>
                    <p>
                      Large ?&nbsp;
                      {large ? 'YEP' : 'NOPE'}
                    </p>
                  </div>
                )
              }
            </Media>
          )
        }
      </Media>
    );
  }
}


export default MediaHookless;
