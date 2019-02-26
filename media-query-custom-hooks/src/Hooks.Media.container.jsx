import React from 'react';
import useMedia from './Hooks.Media.component';

function MediaHooks() {
  const small = useMedia('(max-width: 400px)');
  const large = useMedia('(min-width: 800px)');
  return (
    <div className="media">
      <h1>Media Component with hooks</h1>
      <p>
        Small ?&nbsp;
        {small ? 'YEP' : 'NOPE'}
      </p>
      <p>
        Large ?&nbsp;
        {large ? 'YEP' : 'NOPE'}
      </p>
    </div>
  );
}

export default MediaHooks;
