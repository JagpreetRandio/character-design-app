import { useState } from 'react';

function Custom() {
  
  const [fields, setFields] = useState([{ label: '', type: 'text', value: '' }]);
  const [formData, setFormData] = useState({});

  const handleAddField = () => {
    setFields([...fields, { label: '', type: 'text', value: '', name: `field-${fields.length}` }]);
  };

  const handleRemoveField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleChangeField = (index, updatedField) => {
    const newFields = [...fields];
    newFields[index] = { ...updatedField, name: `field-${index}` };
    setFields(newFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newFormData = {};
    fields.forEach((field) => {
      newFormData[field.name] = field.value;
    });
    setFormData(newFormData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
      <h2> Create your own character field! </h2>
        {fields.map((field, index) => (
          <div key={index}>
            <label htmlFor={`${index}`}>
              <input
                type="text"
                value={field.label}
                onChange={(event) =>
                  handleChangeField(index, { ...field, label: event.target.value })
                  
                }
              />
              :
            </label>
            <input
              type={field.type}
              name={field.name}
              id={`label-${index}`}
              value={field.value}
              onChange={(event) =>
                handleChangeField(index, { ...field, value: event.target.value })
              }
            />
            <button className= "btn btn-primary" type="button" onClick={() => handleRemoveField(index)}>
              Remove Field
            </button>
          </div>
        ))}
        <button className= "btn margin-10px btn-info" type="button" onClick={handleAddField}>
          Add field
        </button>
        
        <button className= "btn margin-10px btn-danger" type="submit">Submit</button>
      </form>
    </>
  );
}

export default Custom;