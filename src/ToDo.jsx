import { useState } from 'react';

import PropTypes from 'prop-types';

function ToDo({ addToDo }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [statusCode, setStatusCode] = useState('');

    const handleAddToDo = () => {
        if (name && description) {
            addToDo({
                Name: name,
                Description: description,
                statusCode: "Not Completed"
            });
            setName('');
            setDescription('');
            setStatusCode('');
        }
        else {
            alert('Please fill all fields');
        }
    };

    return (
        <div>
            <h3 className="HeadingToDo">My ToDo</h3>
            <input
                type="text"
                className="inputToDo"
                placeholder="Add ToDo"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                className="DescriptionToDo"
                placeholder="ToDo Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button className="AddToDobtn" onClick={handleAddToDo}>Add ToDo</button>
        </div>
    );
}

ToDo.propTypes = {
    addToDo: PropTypes.func.isRequired
};


export default ToDo;
