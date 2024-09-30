"use client";

import React, { useState } from "react";
import "./Form.css"; // Importing the CSS file

const Form = ({ schema }) => {
  const [formData, setFormData] = useState({});
  const [fileData, setFileData] = useState({});
  const [colorValue, setColorValue] = useState("#000000"); // For color field

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFileData({ ...fileData, [name]: files[0] }); // File handling
    } else if (type === "color") {
      setColorValue(value); // Handle color field
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted: ", formData);
    console.log("File data: ", fileData);
  };

  const renderInputField = (field) => {
    switch (field.type) {
      case "textarea":
        return (
          <textarea
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            value={formData[field.name] || ""}
            onChange={handleChange}
          />
        );
      case "select":
        return (
          <select
            name={field.name}
            required={field.required}
            value={formData[field.name] || ""}
            onChange={handleChange}
          >
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "radio":
        return field.options.map((option) => (
          <label key={option.value} className="radio-group">
            <input
              type="radio"
              name={field.name}
              value={option.value}
              checked={formData[field.name] === option.value}
              onChange={handleChange}
            />
            {option.label}
          </label>
        ));
      case "checkbox":
        return (
          <label className="checkbox-group">
            <input
              type="checkbox"
              name={field.name}
              checked={formData[field.name] || false}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [field.name]: e.target.checked,
                })
              }
            />
            {field.label}
          </label>
        );
      case "range":
        return (
          <>
            <input
              type="range"
              name={field.name}
              min={field.min}
              max={field.max}
              value={formData[field.name] || field.min}
              onChange={handleChange}
            />
            <span>{formData[field.name] || field.min}</span>
          </>
        );
      case "color":
        return (
          <>
            <input
              type="color"
              name={field.name}
              value={formData[field.name] || colorValue}
              onChange={handleChange}
            />
            <span
              className="color-box"
              style={{ backgroundColor: formData[field.name] || colorValue }}
            ></span>
          </>
        );
      case "file":
        return (
          <input
            type="file"
            name={field.name}
            accept={field.accept}
            onChange={handleChange}
          />
        );

      case "number":
        return (
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            min="0"
            value={formData[field.name] || ""}
            onChange={handleChange}
          />
        );
      default:
        return (
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            value={formData[field.name] || ""}
            onChange={handleChange}
          />
        );
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="styled-form">
        <h2>{schema.title}</h2>
        {schema.fields.map((field) => (
          <div key={field.name} className="form-group">
            <label>{field.label}</label>
            {renderInputField(field)}
          </div>
        ))}
        <button type="submit" className="form-button">
          {schema.submitLabel || "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Form;
