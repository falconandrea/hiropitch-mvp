'use client';

import SelectInput from '@/components/inputs/SelectInput';
import MultiSelect from '@/components/inputs/MultiSelect';
import TextInput from '@/components/inputs/TextInput';
import TextareaInput from '@/components/inputs/TextareaInput';
import React, { useEffect, useState } from 'react';

import { IPContractTypes, IPCategories } from '@/lib/constants';
import MultipleTexts from '@/components/inputs/MultipleTexts';
import FileUploader from '@/components/FileUploader';
import Loading from '../loading';
import NumberInput from '@/components/inputs/NumberInput';

export default function Ideas() {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    category: string;
    contractType: string;
    authors: { value: string; label: string }[];
    referenceLink: string;
    referenceLinks: string[];
    file: File | null;
    fileStructure: any;
    nftQty: string;
    nftPrice: string;
    post?: string;
  }>({
    title: '',
    description: '',
    category: '',
    contractType: '',
    authors: [],
    referenceLink: '',
    referenceLinks: [],
    nftQty: '1',
    nftPrice: '1',
    file: null,
    fileStructure: null,
    post: '',
  });

  /* For MultipleTexts */
  const [inputValue, setInputValue] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleAddReferenceLink = () => {
    if (inputValue.trim() !== '') {
      setFormData({
        ...formData,
        referenceLinks: [...formData.referenceLinks, inputValue],
      });
      setInputValue('');
    }
  };
  const handleRemoveReferenceLink = (index: number) => {
    const updatedLinks = [...formData.referenceLinks];
    updatedLinks.splice(index, 1);
    setFormData({ ...formData, referenceLinks: updatedLinks });
  };

  /* For MultiSelect */
  const [users, setUsers] = useState<{ value: string; label: string }[]>([]);
  useEffect(() => {
    // Fetch users from API
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users');
        const data = await response.json();
        const userOptions = data.map(
          (user: { _id: string; firstName: string; lastName: string }) => ({
            value: user._id,
            label: `${user.firstName} ${user.lastName}`,
          })
        );
        setUsers(userOptions);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);
  const handleMultiSelectChange = (
    selectedValues: { value: string; label: string }[]
  ) => {
    setFormData({ ...formData, authors: selectedValues });
  };

  /* For upload file */
  const handleFileUpload = (file: File | null, structure: any) => {
    setFormData({ ...formData, file, fileStructure: structure });
  };

  /* General form handling */
  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* Validation form */
  const validateForm = () => {
    if (
      formData.title.trim() === '' ||
      formData.description.trim() === '' ||
      formData.category.trim() === '' ||
      formData.contractType.trim() === '' ||
      formData.authors.length === 0 ||
      formData.referenceLinks.length === 0 ||
      formData.nftQty.trim() === '' ||
      formData.nftPrice.trim() === ''
    ) {
      return false;
    }
    return true;
  };
  /* Submit form */
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setShowErrorMessage(false);
    setShowSuccessMessage(false);
    if (!validateForm()) {
      setShowErrorMessage(true);
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('contractType', formData.contractType);
    if (formData.file) {
      data.append('file', formData.file as File);
      data.append('fileStructure', JSON.stringify(formData.fileStructure));
    }
    data.append('authors', JSON.stringify(formData.authors));
    data.append('referenceLinks', JSON.stringify(formData.referenceLinks));
    if (formData.post) {
      data.append('post', formData.post);
    }
    data.append('nftQty', formData.nftQty);
    data.append('nftPrice', formData.nftPrice);

    try {
      const response = await fetch('/api/admin/ideas', {
        method: 'POST',
        body: data,
      });
      if (response.ok) {
        // Success handling
        console.log('Form submitted successfully!');
      } else {
        // Error handling
        console.error('Form submission failed.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);

      // Show success message
      setShowSuccessMessage(true);

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        contractType: '',
        authors: [],
        referenceLink: '',
        referenceLinks: [],
        file: null,
        fileStructure: null,
        nftQty: '1',
        nftPrice: '1',
        post: '',
      });

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }
  };

  return (
    <div className='max-w-2lg mx-auto'>
      {loading && <Loading />}
      <h1 className='mb-2 text-center text-4xl font-bold'>IDEAS</h1>
      <h2 className='w full mb-3 text-center font-sans text-xl'>
        Your ideas are safely saved in our database. Share it to our community
        and find your crewmate now!
      </h2>
      <form className='mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md'>
        <div className='flex flex-col xl:flex-row xl:gap-x-4'>
          {/* Column Left */}
          <div className='w-full xl:w-1/2'>
            <TextInput
              label='IP name'
              name='title'
              required={true}
              value={formData.title}
              onChange={handleFormChange}
              placeholder='Give a name to your idea here!'
            />

            <SelectInput
              label='Contract Type'
              name='contractType'
              required={true}
              onChange={handleFormChange}
              options={IPContractTypes.map((contractType) => ({
                value: contractType,
                label: contractType,
              }))}
              value={formData.contractType}
            />

            <SelectInput
              label='IP category'
              name='category'
              required={true}
              onChange={handleFormChange}
              options={IPCategories.map((category) => ({
                value: category,
                label: category,
              }))}
              value={formData.category}
            />

            <TextareaInput
              label='IP description'
              name='description'
              required={true}
              value={formData.description}
              onChange={handleFormChange}
              placeholder='Give hype to your idea here! What is it about?'
            />
          </div>

          {/* Column Right */}
          <div className='w-full xl:w-1/2'>
            <MultipleTexts
              label='IP reference links'
              name='referenceLink'
              onChange={handleChange}
              inputValue={inputValue}
              values={formData.referenceLinks}
              onAddValue={handleAddReferenceLink}
              onRemoveValue={handleRemoveReferenceLink}
              placeholder='Enter your reference links here!'
            />

            <MultiSelect
              label='Authors'
              options={users}
              selectedValues={formData.authors}
              onChange={handleMultiSelectChange}
            />

            <FileUploader
              onFileSelect={handleFileUpload}
              name='file'
              label='Upload ZIP file (for now Max 2MB)'
            />
          </div>
        </div>

        <hr className='mb-8 mt-4' />

        <TextareaInput
          label='If you want to create a post to share with the community, please write it here!'
          name='post'
          value={formData.post || ''}
          onChange={handleFormChange}
          placeholder='Write your post here!'
        />

        <hr className='my-8' />

        <p className='mb-4'>
          Your idea will be saved on the blockchain. Choose how many NFTs you
          want to create and what the price of each will be.
        </p>
        <div className='flex flex-col xl:flex-row xl:gap-x-4'>
          {/* Column Left */}
          <div className='w-full xl:w-1/2'>
            <NumberInput
              step='1'
              label='Quantity of NFTs'
              name='nftQty'
              required={true}
              value={formData.nftQty}
              onChange={handleFormChange}
              placeholder='Quantity of NFTs you want create'
            />
          </div>
          <div className='w-full xl:w-1/2'>
            <NumberInput
              step='1'
              label='Price of NFTs (SOL)'
              name='nftPrice'
              required={true}
              value={formData.nftPrice}
              onChange={handleFormChange}
              placeholder='Price of single NFT in Solana'
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className='mt-8 flex flex-col items-center justify-center'>
          <button
            type='submit'
            disabled={loading}
            onClick={handleSubmit}
            className='focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
          >
            Submit
          </button>

          {showErrorMessage && (
            <p className='mt-4 text-red-500'>Please fill in all fields</p>
          )}

          {showSuccessMessage && (
            <p className='mt-4 text-green-500'>Form submitted successfully!</p>
          )}
        </div>
      </form>
    </div>
  );
}
