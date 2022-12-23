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
          placeholder="Enter product"
          name="product"
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter Weight"
          name="weight"
          onChange={handleEditFormChange}
        ></input>
      </td>

      <td>
        <input
          type="text"
          placeholder="Edit company"
          name="company"
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          placeholder="Edit fullname"
          name="username"
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td></td>

      <td>
        {/* switch rendering */}
        {isLoadingSave ? (
          <div className="dib ml2 mr2">
            <Circles type="Oval" color="#000080" height={20} width={40} />
          </div>
        ) : null}
        <button onClick={handleEditFormSubmit} className="mr2">
          Save
        </button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
