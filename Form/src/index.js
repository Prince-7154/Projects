import React from "react";
import ReactDOM from "react-dom/client";
import "./Form.css";
import Form from "./form";
import reportWebVitals from "./reportWebVitals";

const formSchema = {
  title: "Example Form",
  fields: [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "Enter your first name",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      required: true,
    },
    {
      name: "age",
      label: "Age",
      type: "number",
      placeholder: "Enter your age",
    },
    {
      name: "website",
      label: "Website",
      type: "url",
      placeholder: "Enter your website URL",
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "Enter your phone number",
    },
    { name: "birthDate", label: "Birth Date", type: "date" },
    { name: "meetingTime", label: "Meeting Time", type: "time" },
    { name: "favoriteColor", label: "Favorite Color", type: "color" },
    {
      name: "bio",
      label: "Biography",
      type: "textarea",
      placeholder: "Tell us about yourself",
    },
    {
      name: "jobRole",
      label: "Job Role",
      type: "select",
      options: [
        { label: "Developer", value: "developer" },
        { label: "Designer", value: "designer" },
        { label: "Manager", value: "manager" },
      ],
    },
    {
      name: "gender",
      label: "Gender",
      type: "radio",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
    },
    { name: "subscribe", label: "Subscribe to Ankamala ", type: "checkbox" },
    {
      name: "rating",
      label: "Rating of Programming",
      type: "range",
      min: 0,
      max: 10,
    }, // Rating field (0 to 10)
    { name: "resume", label: "Upload Resume", type: "file", accept: ".pdf" },
  ],
  submitLabel: "Submit",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Form schema={formSchema} />);

reportWebVitals();
