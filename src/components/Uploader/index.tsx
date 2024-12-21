import React from 'react';
import { useDropzone } from 'react-dropzone';
import supabase from '../../config/supabaseClient.js';

const dropzoneStyles: React.CSSProperties = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer'
};

const FileUploader = ({ onFileUploadSuccess, onFileUploadError }) => {
  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    try {
      const { data, error } = await supabase.storage
        .from('signatures')
        .upload(file.name, file);
      if (error) throw error;
      onFileUploadSuccess(data);
    } catch (error) {
      console.error('Error uploading file:', error.message);
      onFileUploadError(error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    // @ts-ignore
    // accept: 'image/*' as const // Cast string to required type
  });

  return (
    <div {...getRootProps()} style={dropzoneStyles}>
      <input {...getInputProps()} />
      <p>Drag & drop some files here, or click to select files</p>
    </div>
  );
};

export default FileUploader;
