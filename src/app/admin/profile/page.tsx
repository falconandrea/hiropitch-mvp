'use client';

import React, { useEffect, useState } from 'react';
import TextInput from '@/components/inputs/TextInput';
import TextareaInput from '@/components/inputs/TextareaInput';
import Loading from '@/components/Loading';
import FileUploader from '@/components/FileUploader';

type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  mobileNumber: string;
  about: string;
  address: string;
  vatNumber: string;
  companyName: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  birthdate: string;
  fiscalCode: string;
  profileImage?: {
    file: File;
    validTypes: string[];
  };
};

export default function ProfilePage() {
  const [formData, setFormData] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    mobileNumber: '',
    about: '',
    address: '',
    vatNumber: '',
    companyName: '',
    linkedin: '',
    instagram: '',
    facebook: '',
    birthdate: '',
    fiscalCode: ''
  });
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/user/profile');
        const data: UserProfile = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        setFileError('Only JPG, JPEG, and PNG files are allowed');
      } else {
        setFileError(null);
      }
    } else {
      setFileError(null);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const formDataToSend = { ...formData };

      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataToSend)
      });

      if (response.ok) {
        console.log('Profile updated successfully');
      } else {
        console.error('Error updating profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {loading && <Loading />}
      <h1 className="mb-4 text-2xl font-bold">Settings</h1>
      <p className="mb-4">Here are your personal and company details</p>

      <div className="mb-8">
        <FileUploader
          name="profileImage"
          onFileSelect={handleFileSelect}
          label="Upload new image"
        />
        {fileError && <p className="text-red-500">{fileError}</p>}
        <button className="bg-red-500 text-white px-4 py-2 mt-2">Delete</button>
      </div>

      <h2 className="text-xl font-bold mb-4">Personal details</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <TextInput
            label="First name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Enter your first name"
            required={true}
          />
        </div>
        <div>
          <TextInput
            label="Mobile number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            placeholder="Enter your mobile number"
            required={true}
          />
        </div>
        <div>
          <TextInput
            label="Last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Enter your last name"
            required={true}
          />
        </div>
        <div>
          <TextInput
            label="Email address"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            required={true}
          />
        </div>
        <div>
          <TextInput
            label="Date of Birth"
            name="birthdate"
            type="date"
            value={formData.birthdate}
            onChange={handleInputChange}
            placeholder="Enter your address"
            required={true}
          />
        </div>
        <div>
          <TextInput
            label="Fiscal Code"
            name="fiscalCode"
            value={formData.fiscalCode}
            onChange={handleInputChange}
            placeholder="Enter your fiscal code"
            required={true}
          />
        </div>
        <div>
          <TextInput
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Enter your username"
            required={true}
          />
        </div>
        <div>
          <TextInput
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter your address"
            required={true}
          />
        </div>
        <div className="col-span-2">
          <TextareaInput
            label="About"
            name="about"
            value={formData.about}
            onChange={handleInputChange}
            placeholder="Tell us about yourself"
            required={true}
          />
        </div>
      </div>

      <h2 className="text-xl font-bold mt-8 mb-4">Company details</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextInput
          label="VAT Number"
          name="vatNumber"
          value={formData.vatNumber}
          onChange={handleInputChange}
          placeholder="Enter your VAT number"
          required={true}
        />
        <TextInput
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          placeholder="Enter your company name"
          required={true}
        />
        <TextInput
          label="LinkedIn"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleInputChange}
          placeholder="Enter your LinkedIn profile link"
          required={true}
        />
        <TextInput
          label="Instagram"
          name="instagram"
          value={formData.instagram}
          onChange={handleInputChange}
          placeholder="Enter your Instagram profile link"
          required={true}
        />
        <TextInput
          label="Facebook"
          name="facebook"
          value={formData.facebook}
          onChange={handleInputChange}
          placeholder="Enter your Facebook profile link"
          required={true}
        />
      </div>

      <div className="mt-8 flex justify-center">
        <button
          className="bg-orange-500 text-white px-6 py-3 text-lg"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}
