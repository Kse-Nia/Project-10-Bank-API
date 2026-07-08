import { useState } from "react";
import type { FormEvent } from "react";

interface UserProfile {
  firstName: string;
  lastName: string;
}

interface FormEditProfileProps {
  user: UserProfile;
  onSubmit: (profile: UserProfile) => void;
  onCancel?: () => void;
}

export default function FormEditProfile({
  user,
  onSubmit,
  onCancel,
}: FormEditProfileProps) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  //  const [error, setError] = useState("");
  const [error, setError] = useState("" || null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      setError("Tous les champs sont requis.");
      return;
    }
    setError("");
    onSubmit({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    });
  };

  return (
    <form className="form-edit-profile" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          id="firstName"
          className="form-group-input"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Prénom"
          required
        />
        <input
          id="lastName"
          className="form-group-input"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Nom"
          required
        />
      </div>
      {error && <p className="form-error">{error}</p>}
      <div className="form-actions">
        <button type="submit" className="btn btn-primary save-btn">
          Save
        </button>
        {onCancel && (
          <button
            type="button"
            className="btn btn-secondary cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
