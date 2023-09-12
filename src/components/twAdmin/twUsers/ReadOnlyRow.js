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
      <td>{contact.username}</td>
      <td>{contact.email}</td>
      <td>{contact.password}</td>
      <td>{contact.phone}</td>
      <td>{contact.joined}</td>
      <td>{contact.company}</td>

      <td>{contact.lastactive}</td>
      <td>{contact.category}</td>
      <td>{contact.status}</td>

      <td>
        <button
          className=" br-pill bw0 bg-orange white hover-bg-yellow tc pa3"
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          <label className="center">Edit</label>
        </button>

        <button
          className="ml2 br-pill bw0 bg-dark-red hover-bg-red white pa2 "
          type="button"
          onClick={() => handleDeleteClick(contact.email, contact.category)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
