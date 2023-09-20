// import React, { useCallback } from 'react';
// import { useDropzone, DropzoneOptions } from 'react-dropzone';

// interface ImageUploadProps {
//   onImageUpload: (acceptedFiles: File[]) => void;
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
//   const onDrop = useCallback(
//     (acceptedFiles: File[]) => {
//       // Call the callback function with the accepted files
//       onImageUpload(acceptedFiles);
//     },
//     [onImageUpload]
//   );

//   const dropzoneOptions: DropzoneOptions = {
//     onDrop: onDrop,
//     accept: 'image/*' as const, // Specify 'image/*' as a string
//   };

//   const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);

//   return (
//     <div {...getRootProps()} style={dropzoneStyles}>
//       <input {...getInputProps()} />
//       <p>Drag & drop an image here, or click to select one</p>
//     </div>
//   );
// };

// const dropzoneStyles: React.CSSProperties = {
//   border: '2px dashed #cccccc',
//   borderRadius: '4px',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   alignItems: 'center',
//   padding: '20px',
//   cursor: 'pointer',
// };

// export default ImageUpload;
