import { Button, TextField } from '@radix-ui/themes';
import { useState } from 'react';
import Link from 'next/link';

export default function Demo3() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      // Get the input value directly from the form
      const formElement = e.target as HTMLFormElement;
      const fileNameInput = formElement.querySelector('input[type="text"]') as HTMLInputElement;
      const inputtedFileName = fileNameInput.value;

      formData.append('fileName', inputtedFileName);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      console.log('Upload successful:', result);

      // Set the uploaded image URL and filename
      setUploadedImageUrl(URL.createObjectURL(file));
      setUploadedFileName(inputtedFileName);

      // Clear form
      setFile(null);
      formElement.reset();
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Demo 3</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} required />

          <TextField.Root type="text" placeholder="File Name" />

          <Button type="submit" disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </div>
      </form>

      {uploadedImageUrl && (
        <div style={{ marginTop: '20px' }}>
          <h2>{uploadedFileName}</h2>
          <img
            src={uploadedImageUrl}
            alt={uploadedFileName}
            style={{ maxWidth: '100%', maxHeight: '300px' }}
          />
        </div>
      )}

      <div style={{ marginTop: '40px' }}>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
