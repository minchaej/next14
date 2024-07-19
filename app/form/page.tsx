'use client';

import { useState } from 'react';
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

export default function Page() {
  const [data, setData] = useState<FormData>({});
  const [isLoading, setLoading] = useState<boolean>(false);
  const [touched, setTouched] = useState<TouchedFields>({});
  const [errors, setErrors] = useState<string[]>([]);

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
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

  const handleChange = ({ errors, data }: JsonFormsCore) => {
    setData(data as FormData);
    setTouched({ ...touched, ...Object.keys(data).reduce((acc, key) => ({ ...acc, [key]: true }), {}) });
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