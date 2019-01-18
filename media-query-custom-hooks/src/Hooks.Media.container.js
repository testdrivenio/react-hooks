import React from 'react';
import useMedia from './Hooks.Media.component'

function MediaHooks() {
    let small = useMedia("(max-width: 400px)")
    let large = useMedia("(min-width: 800px)")
    return (
        <div className='media'>
            <h1>Media Component with hooks</h1>
            <p>
                Small ? {small ? 'YEP' : 'NOPE'}
            </p>
            <p>
                Large ? {large ? 'YEP' : 'NOPE'}
            </p>
        </div>
    )                      
}

export default MediaHooks;