import React from 'react'
import { Link } from 'react-router-dom'

const Error404: React.FC = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-center text-center m-auto text-align">
        <h3>Oopppss!!! Something went wrong</h3>
        <p>Error 404 Not Found</p>
        <Link to='/'>&larr; Go back to Home page.</Link>
    </div>
  )
}

export default Error404