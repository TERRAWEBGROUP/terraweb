import React, { useState, useRef } from "react";

import { Circles } from "react-loader-spinner";

const EditableRow = ({
  handleEditFormSubmit,
  isLoadingSave,
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  onStatusChange,
  names,
  handleCategoryEdit,
  optionsPreviledges,
  contact,
}) => {
  const [phone, setPhone] = useState(contact.phone);
  const [username, setUsername] = useState(contact.username);
  const [email, setEmail] = useState(contact.email);

  const [category, setCategory] = useState(contact.category);
  const [company, setCompany] = useState(contact.company);

  //store select values in an array
  const options = [
    { value: "", text: "-- select Status --" },
    { value: "active", text: "active" },
    { value: "pending", text: "pending" },
    { value: "disabled", text: "disabled" },
  ];

  const companyRef = useRef(contact.company);

  // const [names, setNames] = useState({
  //   status: options[0].value,
  // });

  return (
    <tr>
      <td>{contact.id}</td>
      <td>
        <input
          type="text"
          placeholder={username}
          // value={username}
          // value={contact.username}
          name="username"
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          // placeholder="Edit email"
          placeholder={email}
          // value={email}
          // value={contact.email}
          name="email"
          onChange={handleEditFormChange}
        ></input>
      </td>

      <td>
        <input
          type="text"
          placeholder="Edit Password"
          name="password"
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          // pattern="[0-9]*"
          pattern="[0-9]*"
          // value={phone}
          placeholder={phone}
          onInput={(e) =>
            setPhone((v) => (e.target.validity.valid ? e.target.value : v))
          }
          name="phone"
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td></td>
      <td>
        <input
          // ref={companyRef}
          type="text"
          placeholder={company}
          // value={company}
          name="company"
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td></td>

      <td>
        <select
          className=" f4 bg-white tracked pa2 "
          value={names.category}
          onChange={handleCategoryEdit}
        >
          {optionsPreviledges.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </td>
      <td>
        <select
          className=" f4 bg-white tracked pa2 "
          value={names.status}
          onChange={onStatusChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </td>

      <td>
        {isLoadingSave ? (
          <div className="dib ml2 mr2">
            <Circles type="Oval" color="#000080" height={20} width={40} />
          </div>
        ) : null}
        <button
          className="ml2 br-pill bw0 bg-orange hover-bg-yellow white pa2"
          onClick={handleEditFormSubmit}
        >
          Save
        </button>
        <button
          type="button"
          className="ml2 br-pill bw0 bg-orange hover-bg-yellow white pa2"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
