import React, { useState } from 'react';
import axios from 'axios';
import './style/video.css';

const VideoUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [objectName, setObjectName] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [downloadLink, setDownloadLink] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Validate the file type
    if (file && file.type === 'video/mp4') {
      setSelectedFile(file);
      setUploadStatus('');
    } else {
      setSelectedFile(null);
      setUploadStatus('Please select a valid MP4 video file');
    }
  };

  const handleObjectNameChange = (event) => {
    setObjectName(event.target.value);
  };

  const handleUpload = () => {
    // Proceed with the upload if the file is valid
    if (selectedFile && objectName.trim() !== '') {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('object_name', objectName);

      axios
        .post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          responseType: 'blob' // Change this to 'arraybuffer'
        })
        .then((response) => {
          // Handle successful upload
          console.log('Video uploaded and processed successfully.');

          // Create a download URL for the response blob (output video)
          const downloadUrl = URL.createObjectURL(new Blob([response.data], { type: 'video/mp4' }));

          // Update the download link
          setDownloadLink(downloadUrl);

          // Update the upload status
          setUploadStatus('Video uploaded and processed successfully.');
          setLoading(false);
        })
        .catch((error) => {
          // Handle upload error
          console.error('Error uploading video:', error);
          // Update the upload status
          setUploadStatus('Error uploading or processing video');
          setLoading(false);
        });
    } else {
      setUploadStatus('Please select a valid MP4 video file and enter an object name.');
    }
  };

  return (
    <div className='container'>
      <div className="content">
        <h2>Choose a Video File of mp4 format</h2>
        <input type="file" accept="video/mp4" onChange={handleFileChange} />
        <h2>Enter the object name you want to detect</h2>
        <div className='in'>
        <input  type="text" value={objectName} onChange={handleObjectNameChange} placeholder="" />
        </div>
        <button onClick={handleUpload}>Upload</button>
        
        {loading ? (
          <p>Processing video, please wait...</p>
        ) : (
          <p>{uploadStatus}</p>
        )}
        <h2>The  uploaded video is shown below</h2>
      </div>

        {selectedFile && (
          <div className='player'>
            <video controls style={{ maxWidth: '400px' }}>
              <source src={URL.createObjectURL(selectedFile)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {downloadLink && (
          <div className='out'>
            <h2>Output Video Player:</h2>
            <video controls>
              <source src={downloadLink} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <p>Download link for output video:</p>
            <a href={downloadLink} download="output_video.mp4">Download Output Video</a>
          </div>
        )}
    </div>
    
  );
};

export default VideoUploadForm;
