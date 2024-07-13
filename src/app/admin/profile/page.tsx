'use client';

import React, { useEffect, useState } from 'react';
import TextInput from '@/components/inputs/TextInput';
import TextareaInput from '@/components/inputs/TextareaInput';
import Loading from '@/components/Loading';
import ImageUploader from '@/components/ImageUploader';
import Image from 'next/image';

export default function ProfilePage() {
  const [formData, setFormData] = useState<{
    photo: File | null;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    about: string;
    address: string;
    vatNumber: string;
    birthDate: string;
    fiscalCode: string;
    companyName: string;
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  }>({
    photo: null,
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    about: '',
    address: '',
    vatNumber: '',
    birthDate: '',
    fiscalCode: '',
    companyName: '',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
  });
  const [loading, setLoading] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState<string>('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/admin/profile');
        const data = await response.json();

        // Fix socials urls
        data[0].twitter = data[0].socials?.twitter || '';
        data[0].instagram = data[0].socials?.instagram || '';
        data[0].linkedin = data[0].socials?.linkedin || '';
        data[0].facebook = data[0].socials?.facebook || '';
        delete data[0].socials;

        // Fix birthdate format, get only YYYY-MM-DD
        data[0].birthDate = data[0].birthDate
          ? new Date(data[0].birthDate).toISOString().split('T')[0]
          : '';

        setFormData(data[0]);
        setCurrentPhoto(data[0].photo);
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

  const handleImageUpload = (photo: File | null) => {
    setFormData({ ...formData, photo });
  };

  const validateForm = () => {
    if (formData.firstName.trim() === '' || formData.lastName.trim() === '') {
      return false;
    }
    return true;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    setShowErrorMessage(false);
    setErrorMessage('');
    if (!validateForm()) {
      setErrorMessage('Please fill in all required fields.');
      setShowErrorMessage(true);
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append('firstName', formData.firstName);
      data.append('lastName', formData.lastName);
      data.append('mobile', formData.mobile || '');
      data.append('about', formData.about || '');
      data.append('address', formData.address || '');
      data.append('vatNumber', formData.vatNumber || '');
      data.append('fiscalCode', formData.fiscalCode || '');
      data.append('companyName', formData.companyName || '');
      data.append('twitter', formData.twitter || '');
      data.append('facebook', formData.facebook || '');
      data.append('instagram', formData.instagram || '');
      data.append('linkedin', formData.linkedin || '');
      data.append('birthDate', formData.birthDate || '');
      if (formData.photo) {
        data.append('photo', formData.photo as File);
      }

      const response = await fetch('/api/admin/profile', {
        method: 'PUT',
        body: data,
      });

      if (response.ok) {
        console.log('Profile updated successfully');

        // Show success message
        setShowErrorMessage(false);
        setErrorMessage('');

        // Reload page
        setTimeout(() => {
          // window.location.reload();
        }, 1000);
      } else {
        console.error('Error updating profile');

        // Error handling
        const errorData = await response.json();
        setShowErrorMessage(true);
        setErrorMessage(errorData.message);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mx-auto max-w-4xl p-4'>
      {loading && <Loading />}

      <h1 className='mb-2 text-center text-4xl font-bold'>Your profile</h1>
      <h2 className='w full mb-3 text-center font-sans text-xl'>
        Here you can update your profile.
      </h2>

      {!loading && formData && (
        <div>
          <div className='mb-8 flex space-x-4'>
            {currentPhoto && (
              <Image
                src={currentPhoto || ''}
                alt='Profile image'
                width={80}
                height={80}
              />
            )}

            <ImageUploader
              name='photo'
              onFileSelect={handleImageUpload}
              label='Upload new profile image'
            />
          </div>
          <p className='mb-4 text-sm text-gray-500'>
            <small>Fields with * are required</small>
          </p>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <TextInput
              label='First name *'
              name='firstName'
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder='Enter your first name'
              required={true}
            />

            <TextInput
              label='Last name *'
              name='lastName'
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder='Enter your last name'
              required={true}
            />

            <TextInput
              label='Email address *'
              name='email'
              disabled={true}
              value={formData.email}
              onChange={handleInputChange}
              placeholder='Enter your email address'
            />

            <TextInput
              label='Mobile number'
              name='mobile'
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder='Enter your mobile number'
            />

            <TextInput
              label='Company Name'
              name='companyName'
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder='Enter your company name'
            />

            <TextInput
              label='Date of Birth'
              name='birthDate'
              type='date'
              value={formData.birthDate}
              onChange={handleInputChange}
              placeholder='Enter your birthdate'
            />

            <TextInput
              label='VAT Number'
              name='vatNumber'
              value={formData.vatNumber}
              onChange={handleInputChange}
              placeholder='Enter your VAT number'
            />

            <TextInput
              label='Fiscal Code'
              name='fiscalCode'
              value={formData.fiscalCode}
              onChange={handleInputChange}
              placeholder='Enter your fiscal code'
            />
          </div>
          <div>
            <TextInput
              label='Address'
              name='address'
              value={formData.address}
              onChange={handleInputChange}
              placeholder='Enter your complete address (stree name, street number, city, province, country)'
            />

            <TextareaInput
              label='About'
              name='about'
              value={formData.about}
              onChange={handleInputChange}
              placeholder='Tell us about yourself'
            />
          </div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <TextInput
              label='LinkedIn'
              name='linkedin'
              value={formData.linkedin}
              onChange={handleInputChange}
              placeholder='Enter your LinkedIn profile link'
            />
            <TextInput
              label='Instagram'
              name='instagram'
              value={formData.instagram}
              onChange={handleInputChange}
              placeholder='Enter your Instagram profile link'
            />
            <TextInput
              label='Facebook'
              name='facebook'
              value={formData.facebook}
              onChange={handleInputChange}
              placeholder='Enter your Facebook profile link'
            />
            <TextInput
              label='Twitter'
              name='twitter'
              value={formData.twitter}
              onChange={handleInputChange}
              placeholder='Enter your Twitter/X profile link'
            />
          </div>

          <div className='mt-8 flex justify-center'>
            <button
              className='focus:shadow-outline mb-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
              onClick={handleSave}
              type='submit'
            >
              Save
            </button>
          </div>
          <div className='flex justify-center'>
            {showErrorMessage && errorMessage && (
              <p className='mt-4 text-red-500'>{errorMessage}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
