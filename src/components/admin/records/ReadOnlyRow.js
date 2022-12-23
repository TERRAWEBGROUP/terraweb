import React from "react";

const ReadOnlyRow = ({
  isLoadingDelete,
  contact,
  handleEditClick,
  handleDeleteClick,
}) => {
  return (
    <tr className="hover-red">
      <td>{contact.id}</td>
      <td>{contact.producttype}</td>
      <td>{contact.weight}</td>
      <td>{contact.companyname}</td>
      <td>{contact.fullname}</td>
      <td>{contact.daterecorded}</td>

      <td>
        <button
          className="mr2"
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>

        <button type="button" onClick={() => handleDeleteClick(contact.email)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
