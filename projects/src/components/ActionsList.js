import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Action from "./Action";

const ActionsList = (props) => {

    const [ actions, setActions ] = useState([]);
    const id = props.id;

    useEffect(() => {
        axios.get(`http://localhost:9999/projects/${id}/actions`)
        .then(res => {
            console.log("actions by project id", res.data)
            setActions(res.data);
        })
        .catch(err => {
            console.log(err)
        })
    }, [])


    return (
        <div>
            
            {actions.map((act, index) => {
                return <Action act={act} key={index} />
            })}
        </div>
    )
}

export default ActionsList
