import React, { useState } from "react";

interface FormEditProfileProps {
  firstName: string;
  lastName: string;
  onSubmit: (firstName: string, lastName: string) => void;
  onCancel: () => void;
}

const FormEditProfile: React.FC<FormEditProfileProps> = ({
  firstName,
  lastName,
  onSubmit,
  onCancel,
}) => {
  // Form state to manage the values input
  const [formData, setFormData] = useState({
    firstName,
    lastName,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData.firstName, formData.lastName);
  };

  return (
    <form className="form-edit-profile" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-save">
          Save Profile
        </button>
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default FormEditProfile;
