import { useState, FormEvent } from 'react';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
}

interface FormEditProfileProps {
  user: UserProfile;
  onSubmit: (profile: UserProfile) => void;
  onCancel?: () => void;
}

export default function FormEditProfile({ user, onSubmit, onCancel }: FormEditProfileProps) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError('Tous les champs sont requis.');
      return;
    }
    setError('');
    onSubmit({ firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim() });
  };

  return (
    <form className="form-edit-profile" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="firstName">Prénom</label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Prénom"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Nom</label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Nom"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Adresse e-mail</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Enregistrer
        </button>
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}
