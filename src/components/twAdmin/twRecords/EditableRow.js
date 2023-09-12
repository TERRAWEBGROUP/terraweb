import React from "react";

import { Circles } from "react-loader-spinner";

const EditableRow = ({
  handleEditFormSubmit,
  isLoadingSave,

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
          placeholder="Edit product type"
          name="producttype"
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="number"
          required="required"
          placeholder="Edit Weight"
          name="weight"
          onChange={handleEditFormChange}
        ></input>
      </td>

      <td>
        <input
          type="text"
          placeholder="Edit company"
          name="companyname"
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          placeholder="Edit fullname"
          name="fullname"
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
        <button
          onClick={handleEditFormSubmit}
          className="ml2 br-pill bw0 bg-orange hover-bg-yellow white pa2"
        >
          Save
        </button>
        <button
          className="ml2 br-pill bw0 bg-orange hover-bg-yellow white pa2"
          type="button"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
