import React from 'react'
import {FaRegSadTear} from 'react-icons/fa'

export default function NoResult() {
    return (
        <div className="no-result">
            <FaRegSadTear />
            <h1>No results found.</h1>
            <span>Try searching for something else.</span>
        </div>
    )
}
