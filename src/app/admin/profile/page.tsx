'use client';

import React, { useEffect, useState } from 'react';
import TextInput from '@/components/inputs/TextInput';
import TextareaInput from '@/components/inputs/TextareaInput';
import SelectInput from '@/components/inputs/SelectInput';
import Loading from '@/components/Loading';
import FileUploader from '@/components/FileUploader';

interface UserProfile {
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
}

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
    facebook: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch user profile data from API
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
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
    <div className="max-w-2xl mx-auto p-4">
      {loading && <Loading />}
      <h1 className="mb-4 text-2xl font-bold">Settings</h1>
      <p className="mb-4">Here are your personal and company details</p>

    <div className="mb-4">
      <FileUploader
        name="profileImage"
        onFileSelect={(file) => console.log(file)}
        label="Upload new image"
      />
      <button className="bg-red-500 text-white px-4 py-2 mt-2">Delete</button>
  </div>


      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold">Personal details</h2>
          <p className="mb-4">
            Complete these questions to start requesting IPs and other manuscripts from our pool of talents.
          </p>

          <TextInput
            label="First name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Enter your first name"
            required={true}
          />
          <TextInput
            label="Last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Enter your last name"
            required={true}
          />
          <TextInput
            label="Email address"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            required={true}
          />
          <TextInput
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Enter your username"
            required={true}
          />
          <TextInput
            label="Mobile number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            placeholder="Enter your mobile number"
            required={true}
          />
          <TextareaInput
            label="About"
            name="about"
            value={formData.about}
            onChange={handleInputChange}
            placeholder="Tell us about yourself"
            required={true}
          />
          <SelectInput
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            options={[
              { value: 'Address 1', label: 'Address 1' },
              { value: 'Address 2', label: 'Address 2' }
            ]}
            required={true}
          />
        </div>

        <div>
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
      </div>

      <div className="mt-4">
        <button
          className="bg-orange-500 text-white px-4 py-2"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}
