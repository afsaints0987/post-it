import React from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import * as FaIcons from 'react-icons/fa'

const Searchbar: React.FC = () => {
  return (
    <>
    <InputGroup className="w-50">
        <InputGroup.Text>
            <FaIcons.FaSearch/>
        </InputGroup.Text>
        <Form.Control placeholder="Search..."/>
    </InputGroup>
    </>
  )
}

export default Searchbar