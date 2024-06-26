"use client"


import React, { useState } from 'react';

export default function Ideas() {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    category: string;
    contractType: string;
    author: string;
    authors: string[]; 
    referenceLink: string;
    referenceLinks: string[];
    // Esplicitare il tipo di tutti i campi dell'oggetto 'formData' mi e' servito per inserire degli autori di tipo string, altrimenti ricevevo errore "Type 'string' is not assignable to type 'never'." 

  }>({
    title: '', // Campo per l'input del titolo
    description: '', // Campo per l'input della descrizione
    category: 'FUMETTI', // scelta default, giusto per capire cosa trovarci dentro
    contractType: 'PRE-ACQUISTO', // scelta default, giusto per capire cosa trovarci dentro 
    author: '', // Campo per l'input dell'autore
    authors: [], // Lista degli autori
    referenceLink: '', // Campo per l'input del link
    referenceLinks: [],  // Lista dei link 
  });

  // Funzione per cambiare i valori del form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Funzione per aggiungere un autore/autori
  const handleAddAuthor = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.author.trim() !== '') {
      setFormData({
        ...formData,
        authors: [ ...formData.authors,  formData.author],
        author: '',
      });
    }
  };

    //Funzione per inviare il form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form data submitted:', formData);
  };


  return (

    /* FORM CREATION */

    /* IP NAME */
    <div className="max-w-lg mx-auto">
      <h1 className="text-5xl font-bold mb-5 text-center">IDEAS</h1>
      <h2 className="text-2xl font-sans mb-3 text-center w full">Your ideas are safely saved in our database. Share it to our community and find your crewmate now!</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            IP NAME
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Give a name to your idea here!" // Placeholder per guidare l'utente 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* IP CATEGORYTYPE */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            IP CATEGORY TYPE
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="FUMETTI">FUMETTI</option>
            <option value="TRATTAMENTO">TRATTAMENTO</option>
            <option value="LIBRI">LIBRI</option>
            <option value="SCENEGGIATURA">SCENEGGIATURA</option>
            <option value="SINOSSI">SINOSSI</option>
            <option value="SCRIPT TELEVISIVO">SCRIPT TELEVISIVO</option>
            <option value="SOGGETTO">SOGGETTO</option>
            <option value="VIDEOGAME STORY">VIDEOGAME STORY</option>
            <option value="VIDEOGAME MVP">VIDEOGAME MVP</option>
          </select>
        </div>

        {/* IP DESCRIPTION */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            IP DESCRIPTION
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Give hype to your idea here! What is it about?" // Placeholder per guidare l'utente 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>

        {/* IP REFERENCE LINKS */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="referenceLinks">
            IP REFERENCE LINKS
          </label>
          <input
            type="text"
            id="referenceLinks"
            name="referenceLinks"
            value={formData.referenceLinks}
            onChange={handleChange}
            placeholder="Enter your reference links here!"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* CONTRACT TYPE */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contractType">
            CONTRCT   TYPE
          </label>
          <select
            id="contractType"
            name="contractType"
            value={formData.contractType}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="PRE-ACQUISTO">PRE-ACQUISTO</option>
            <option value="OPZIONE">OPZIONE</option>
            <option value="APPALTO-PRODUZIONE-COMMISSIONE">APPALTO-PRODUZIONE-COMMISSIONE</option>
            <option value="ACQUISTO TOTALE DEI DIRITTI PATRIMONIALI">ACQUISTO TOTALE DEI DIRITTI PATRIMONIALI</option>
            <option value="DISTRIBUZIONE">DISTRIBUZIONE</option>
            <option value="ACQUISTO parziale DEI DIRITTI PATRIMONIALI">ACQUISTO parziale DEI DIRITTI PATRIMONIALI</option>
            <option value="COPRODUZIONE">COPRODUZIONE</option>
            <option value="LICENZA">LICENZA</option>
          </select>
        </div>


        {/* IP AUTHOR */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
            ID AUTHOR (discutere su come implementarlo)
          </label>
          <div className="flex">
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="It could be more than one author" // Placeholder per guidare l'utente
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              onClick={handleAddAuthor}
              className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add
            </button>
          </div>
          <ul className="mt-4">
            {formData.authors.map((author, index) => (
              <li key={index} className="bg-gray-200 p-2 rounded mt-2">{author}</li>
            ))}
          </ul>
        </div>


        {/* SUBMIT BUTTON */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}


