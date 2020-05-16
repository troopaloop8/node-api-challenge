import React from 'react'
import ActionsList from './ActionsList'

const Project = (props) => {
    console.log(props.proj)
    return (
        <div className="box">
            <p className="subtitle">Project Name:{props.proj.name}</p>
            <p>Project Description:{props.proj.description}</p>
            {/* <p>Is Project Complete: {props.proj.completed}</p> */}
            <ActionsList id={props.proj.id}/>

        </div>
    )
}

export default Project