<<<<<<< HEAD
/* eslint-disable @typescript-eslint/no-explicit-any */
=======
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
import { useState } from 'react';
import { User } from '../assets/types';

interface EditProfileFormProps {
  user: User;
  onSave: (data: any) => Promise<void>;
  onCancel: () => void;
<<<<<<< HEAD
  onDeleteAccount: () => void;
}

export const EditProfileForm = ({ user, onSave, onCancel, onDeleteAccount }: EditProfileFormProps) => {
=======
}

export const EditProfileForm = ({ user, onSave, onCancel }: EditProfileFormProps) => {
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    // Add other fields as needed
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Save Changes
        </button>
      </div>
<<<<<<< HEAD
      <div className="pt-4">
        <button
          type="button"
          onClick={onDeleteAccount}
          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 w-full"
        >
          Delete Account
        </button>
      </div>
=======
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
    </form>
  );
};