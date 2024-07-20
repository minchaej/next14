'use client';

import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { schema, uischema } from './formSchema';
import { JsonFormsCore } from '@jsonforms/core';

interface FormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  linkedin?: string;
  visasInterested?: string;
  resume?: string;
  openInput?: string;
}

interface TouchedFields {
  [key: string]: boolean;
}

// todo fix email linkedin validation json forms
export default function Page() {
  const [data, setData] = useState<FormData>({});
  const [isLoading, setLoading] = useState<boolean>(false);
  const [touched, setTouched] = useState<TouchedFields>({});
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = ({ data }: JsonFormsCore) => {
    setData(data as FormData);
    const updatedTouched = Object.keys(data).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {...touched});
    setTouched(updatedTouched);
  };

  const handleSubmit = async () => {
    const newErrors = [];
    if (!data.firstName) newErrors.push("First Name is required.");
    if (!data.lastName) newErrors.push("Last Name is required.");
    if (!data.email) newErrors.push("Email is required.");
    if (!data.linkedin) newErrors.push("LinkedIn URL is required.");
    if (!data.visasInterested) newErrors.push("Visa interest is required.");
    if (!data.resume) newErrors.push("Resume is required.");
    if (!data.openInput) newErrors.push("Open input is required.");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Failed to submit the form:', error);
      alert('Failed to submit the form.');
    }
    setLoading(false);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setLoading(true);
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      try {
        const response = await fetch('http://localhost:3000/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });
        const result = await response.json();
        setData(prev => ({ ...prev, resume: result.key }));
        alert('File uploaded successfully!');
      } catch (error) {
        console.error('Failed to upload file:', error);
        alert('Failed to upload file.');
      }
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-xl w-full">
        <div className="p-8">
          <JsonForms
            schema={schema}
            uischema={uischema}
            data={data}
            onChange={handleChange}
            renderers={materialRenderers}
            cells={materialCells}
            validationMode={Object.keys(touched).length > 0 ? 'ValidateAndShow' : 'NoValidation'}
          />
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileChange}
            disabled={isLoading}
            className="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0 file:text-sm file:font-semibold
                      file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
          {errors.map(error => (
            <div key={error} className="text-red-500">{error}</div>
          ))}
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-xl">Submitting...</span>
          </div>
        )}
      </div>
    </main>
  );
}
