import React, { useState } from 'react';
import { storage } from '../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const ImageUpload = ({ onUploadSuccess, initialImage = '' }) => {
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(initialImage);
    const [error, setError] = useState('');

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Reset state
        setError('');
        setProgress(0);

        // Create storage ref
        // Create a unique filename: timestamp_filename
        const storageRef = ref(storage, `tours/${Date.now()}_${file.name}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.error("Upload error:", error);
                setError('Error al subir la imagen. Intenta de nuevo.');
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImage(downloadURL);
                    onUploadSuccess(downloadURL);
                });
            }
        );
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-700 hover:border-gray-500 dark:border-gray-600 dark:hover:border-gray-500">
                    {image ? (
                        <img src={image} alt="Preview" className="h-full w-full object-cover rounded-lg" />
                    ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click para subir</span> o arrastra y suelta</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 2MB)</p>
                        </div>
                    )}
                    <input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={handleUpload} />
                </label>
            </div>

            {progress > 0 && progress < 100 && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default ImageUpload;
