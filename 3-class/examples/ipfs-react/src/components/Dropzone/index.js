import React, { useCallback, useState } from 'react';
import { Spinner, DisplayText } from '@shopify/polaris';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiImage, FiFileText, FiHeadphones, FiVideo, FiFile } from 'react-icons/fi';

import detect from 'detect-file-type';

import ipfs from '../../ipfs';
import './styles.css';

function detectMime(mime) {
    if (mime.includes('image')) {
        return <FiImage />;
    }
    if (mime.includes('text')) {
        return <FiFileText />;
    }
    if (mime.includes('audio')) {
        return <FiHeadphones />;
    }
    if (mime.includes('video')) {
        return <FiVideo />;
    }
    return <FiFile />;
}

const Dropzone = ({ onFileUploaded }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState('');
    const [selectedFileIcon, setSelectedFileIcon] = useState();

    const onDrop = useCallback(acceptedFiles => {
        setIsLoading(isLoading => !isLoading);
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.readAsArrayBuffer(file)
        reader.onload = () => {
            const fileBuffer = Buffer(reader.result);

            detect.fromBuffer(fileBuffer,
                async (err, res) => {
                    if (err) {
                        console.log(err);
                    }

                    for await (const fileIPFS of ipfs.add(fileBuffer)) {
                        onFileUploaded(fileIPFS.path);
                    }

                    setSelectedFileName(file.name);
                    setSelectedFileIcon(detectMime(res.mime));
                    setIsLoading(isLoading => !isLoading);
                });
        }
    }, [onFileUploaded]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop
    })

    return (
        <div className='dropzone' {...getRootProps()}>
            <input {...getInputProps()} />
            {!selectedFileIcon ?
                <div>
                    <FiUpload />
                    <DisplayText size="small">Drag 'n' drop a file here, or click to select a file</DisplayText>
                </div>
                :
                <div>
                    {isLoading ? <Spinner size="large" color="inkLightest" /> : selectedFileIcon}
                    <strong>File {selectedFileName} added</strong>
                    <DisplayText size="small">Drag 'n' drop here or click to select another file</DisplayText>
                </div>
            }
        </div>
    )
}

export default Dropzone;