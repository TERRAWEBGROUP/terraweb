import React from "react";

const ReadOnlyRow = ({
  isLoadingDelete,
  contact,
  handleEditClick,
  handleDeleteClick,
}) => {
  return (
    <tr className="hover-red bg-white">
      <td>{contact.id}</td>
      <td>{contact.farmerid}</td>
      <td>{contact.producttype}</td>
      <td>{contact.weight}</td>
      <td>{contact.companyname}</td>
      <td>{contact.fullname}</td>
      <td>{contact.daterecorded}</td>

      <td>
        <button
          className=" br-pill bw0 bg-orange white hover-bg-yellow tc pa3"
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>

        <button
          className="ml2 br-pill bw0 bg-dark-red hover-bg-red white pa2 "
          type="button"
          onClick={() => handleDeleteClick(contact.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
