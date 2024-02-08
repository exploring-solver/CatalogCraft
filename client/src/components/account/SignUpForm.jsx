import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import renderFormGroupField from "../../helpers/renderFormGroupField";

import renderFormField from "../../helpers/renderFormField";
import {
  required,
  maxLength20,
  minLength8,
  maxLengthMobileNo,
  minLengthMobileNo,
  digit,
  name,
} from "../../helpers/validation";
import { ReactComponent as IconPhone } from "bootstrap-icons/icons/phone.svg";
import { ReactComponent as IconShieldLock } from "bootstrap-icons/icons/shield-lock.svg";
import { useState } from "react";

const SignUpForm = (props) => {
  const { submitting, onSubmit, submitFailed } = props;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    number: '',
    role: 'SELLER',
  });
  const handleSubmit = (e) => {
    // Send registration request to the backend
    fetch('http://localhost:8000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Registration successful:', data);
        // Handle successful registration (e.g., redirect, show success message)
        navigate('/signin')

      })
      .catch((error) => {
        console.error('Error registering user:', error);
        // Handle error (e.g., display error message)
      });
  };

  return (
    <form
      onSubmit={handleSubmit()}
      className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
      noValidate
    >
      <div className="row mb-3">
        <div className="col-md-6">
          <Field
            name="name"
            type="text"
            label="Name"
            component={renderFormField}
            placeholder="Name"
            validate={[required, name]}
            required={true}
            value={formData.name}
          />
        </div>
        <div className="col-md-6">
          <Field
            name="email"
            type="email"
            value={formData.email}
            label="Email"
            component={renderFormField}
            placeholder="Email"
            validate={[required, name]}
            required={true}
          />
        </div>
      </div>
      <Field
        name="number"
        type="number"
        label="Mobile no"
        component={renderFormGroupField}
        placeholder="Mobile no without country code"
        icon={IconPhone}
        validate={[required, maxLengthMobileNo, minLengthMobileNo, digit]}
        value={formData.number}
        required={true}
        max="999999999999999"
        min="9999"
        className="mb-3"
      />
      <Field
        name="password"
        type="password"
        label="Your password"
        component={renderFormGroupField}
        placeholder="******"
        icon={IconShieldLock}
        validate={[required, maxLength20, minLength8]}
        required={true}
        maxLength="20"
        value={formData.password}
        minLength="8"
        className="mb-3"
      />
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary mb-3"
          disabled={submitting}
        >
          Create
        </button>
      </div>
      <Link className="float-start" to="/account/signin" title="Sign In">
        Sing In
      </Link>
      <Link
        className="float-end"
        to="/account/forgotpassword"
        title="Forgot Password"
      >
        Forgot password?
      </Link>
      <div className="clearfix"></div>
      <hr></hr>
      {/* <div className="row">
        <div className="col- text-center">
          <p className="text-muted small">Or you can join with</p>
        </div>
        <div className="col- text-center">
          <Link to="/" className="btn btn-light text-white bg-twitter me-3">
            <i className="bi bi-twitter-x" />
          </Link>
          <Link to="/" className="btn btn-light text-white me-3 bg-facebook">
            <i className="bi bi-facebook mx-1" />
          </Link>
          <Link to="/" className="btn btn-light text-white me-3 bg-google">
            <i className="bi bi-google mx-1" />
          </Link>
        </div>
      </div> */}
    </form>
  );
};

export default compose(
  reduxForm({
    form: "signup",
  })
)(SignUpForm);
