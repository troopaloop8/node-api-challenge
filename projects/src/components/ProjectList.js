import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Project from './Project'

const ProjectList = () => {

    const [ projects, setProjects ] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9999/projects')
        .then(res => {
            console.log("projects", res.data);
            setProjects(res.data);
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    console.log("projectslist", projects)

    return (
        <div>
            {projects.map((proj, index) => {
                return <Project proj={proj} key={index} />
            })}
        </div>
    )
}

export default ProjectList