import React from 'react'
import withAuth from '../utils/withAuth'

function Home() {
    return (
        <div>
            <h1>ello</h1>
        </div>
    )
}

export default withAuth(Home);
