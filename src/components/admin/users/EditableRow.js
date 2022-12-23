import React from "react";

import { Circles } from "react-loader-spinner";

const EditableRow = ({
  handleEditFormSubmit,
  isLoadingSave,
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td></td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a username..."
          name="username"
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="email"
          required="required"
          placeholder="Enter an email..."
          name="email"
          onChange={handleEditFormChange}
        ></input>
      </td>

      <td>
        <input
          type="text"
          placeholder="Edit Password..."
          name="password"
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td></td>
      <td></td>

      <td></td>

      <td>
        {isLoadingSave ? (
          <div className="dib ml2 mr2">
            <Circles type="Oval" color="#000080" height={20} width={40} />
          </div>
        ) : null}
        <button onClick={handleEditFormSubmit}>Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
