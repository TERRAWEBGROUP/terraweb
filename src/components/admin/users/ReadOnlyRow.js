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
      <td>{contact.username}</td>
      <td>{contact.email}</td>
      <td>{contact.password}</td>
      <td>{contact.joined}</td>
      <td>{contact.company}</td>

      <td>{contact.lastactive}</td>

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
