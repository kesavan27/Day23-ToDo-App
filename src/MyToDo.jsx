import { useState } from 'react';
import ToDo from './ToDo'; 

const initialToDoContent = [ ];

function MyToDo() {
  const [toDoContent, setToDoContent] = useState(initialToDoContent);
  const [statusFilter, setStatusFilter] = useState('All');
  const [editIndex, setEditIndex] = useState(null);
  const [editToDo, setEditToDo] = useState({ Name: '', Description: '', statusCode: '' });

  const addToDo = (newToDo) => {
    setToDoContent([...toDoContent, newToDo]);
  };

  const deleteToDo = (indexToDelete) => {
    setToDoContent(toDoContent.filter((_, index) => index !== indexToDelete));
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditToDo(toDoContent[index]);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditToDo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveEdit = (index) => {
    const updatedToDoContent = [...toDoContent];
    updatedToDoContent[index] = editToDo;
    setToDoContent(updatedToDoContent);
    setEditIndex(null);
    setEditToDo({ Name: '', Description: '', statusCode: '' });
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditToDo({ Name: '', Description: '', statusCode: '' });
  };

  const filteredToDoContent = statusFilter === 'All'
    ? toDoContent
    : toDoContent.filter(toDo => toDo.statusCode === statusFilter);

  return (
    <>
      <ToDo addToDo={addToDo} />

      <h4>My Todo <span style={{ float: 'right', textAlign: 'end' }}>
        Status filter:<select
          style={{ marginLeft: '3px', height: '20px' }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
          <option value="Yet to start">Yet to start</option>
          <option value="On Hold">On Hold</option>
        </select>
      </span>
      </h4>
      <div className="container">
        {filteredToDoContent.map((val, index) => (
          <div className='card' key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  name="Name"
                  value={editToDo.Name}
                  onChange={handleEditChange}
                  style={{ margin: '5px' }}
                />
                <input
                  type="text"
                  name="Description"
                  value={editToDo.Description}
                  onChange={handleEditChange}
                  style={{ margin: '5px' }}
                />
                <select
                  name="statusCode"
                  value={editToDo.statusCode}
                  onChange={handleEditChange}
                  style={{ margin: '5px' }}
                >
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Yet to start">Yet to start</option>
                  <option value="On Hold">On Hold</option>
                </select>
                <button onClick={() => saveEdit(index)} style={{ margin: '5px', background: '#00ab41' }}>Save</button>
                <button onClick={cancelEdit} style={{ margin: '5px', background: '#A24857' }}>Cancel</button>
              </>
            ) : (
              <>
                <p style={{ color: 'black', margin: '5px' }}><b>Name: </b>{val.Name}</p>
                <p style={{ color: 'black', margin: '5px' }}><b>Description: </b> {val.Description}</p>
                <p style={{ color: 'black', margin: '5px' }}><b>Status: </b>{val.statusCode}</p>
                <p>
                  <button onClick={() => startEditing(index)} style={{ margin: '1em', background: '#00ab41' }}>Edit</button>
                  <button
                    style={{ background: '#A24857' }}
                    onClick={() => deleteToDo(index)}
                  >
                    Delete
                  </button>
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default MyToDo;
