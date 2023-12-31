// Notifications.js
import React from 'react';
import useFunctions from './ChoicesFunctions';

export function Notifications() {
  const {
    getAllChoices,
    handleEdit,
    handleSave,
    handleCancel,
    deleteChoice,
    editingChoice,
    editedChoice,
    editedPrice,
    newChoice,
    newPrice,
    setEditedChoice,
    setEditedPrice,
    setNewChoice,
    setNewPrice,
    addChoice,
  } = useFunctions();

  return (
    <div>
      {getAllChoices.map((choice) => (
        <div key={choice.id}>
          {editingChoice && editingChoice.id === choice.id ? (
            <div>
              <input
                type="text"
                value={editedChoice}
                onChange={(e) => setEditedChoice(e.target.value)}
              />
              <input
                type="text"
                value={editedPrice}
                onChange={(e) => setEditedPrice(e.target.value)}
              />
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <div>
              <p>{choice.price}</p>
              <p>{choice.choice}</p>
              <button onClick={() => handleEdit(choice)}>Edit</button>
              <button onClick={() => deleteChoice(choice.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
      <div>
        <input
          type="text"
          value={newChoice}
          onChange={(e) => setNewChoice(e.target.value)}
          placeholder="New choice"
        />
        <input
          type="text"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          placeholder="Price"
        />
        <button onClick={addChoice}>Add Choice</button>
      </div>
    </div>
  );
}

export default Notifications;
