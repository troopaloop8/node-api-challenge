import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Action = (props) => {

    const action = props.act

    console.log("action.js", action)
    console.log(typeof(action))

    if (!action) {
        return (
            <div>...waiting</div>
        )
    } else {
        return (
            <div>
                <ul>
                        <li>Description:{action.description}</li>
                        <li>Notes: {action.notes}</li>
                        {/* <li>{action.completed}</li> */}
                </ul>
                
            </div>
        )
    }
}

export default Action