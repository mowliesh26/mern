import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';

export default function Upload() {
  const [file, setFile] = useState(null);  
  const [uploadedFiles, setUploadedFiles] = useState([]);  
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setError('');
    
    if (!selectedFile) {
      setError('No file selected.');
      return;
    }

    const validTypes = ['application/pdf', 'image/jpeg', 'image/png','application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    
    if (!validTypes.includes(selectedFile.type)) {
      setError('Invalid file type. Only .pdf, .jpg, and .png are allowed.');
      setFile(null);
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {  
      setError('File size should not exceed 10MB.');
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/files');
      if (response.data.success) {
        setUploadedFiles(response.data.files);
      } else {
        alert('Failed to load files.');
      }
    } catch (error) {
      console.error('Error fetching files:', error);
      alert('Error fetching files.');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.data.success) {
        alert('File uploaded successfully!');
        fetchFiles();   
      } else {
        alert('File upload failed!');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('There was an error uploading the file.');
    }

    setFile(null);
  };

  const handleDelete = async (fileId, index) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/files/delete/${fileId}`);
      if (response.data.success) {
        fetchFiles();   
        alert('File deleted successfully!');
      } else {
        alert('Failed to delete file');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('There was an error deleting the file.');
    }
  };

  const handleDownload = (filePath) => {
    const link = document.createElement('a');
    link.href = `http://localhost:5000/uploads/${filePath}`;
    link.download = filePath;   
    link.click();

     
    fetchFiles();
  };
  const handleShare = (fileName) => {
    const fileURL = `http://localhost:5000/uploads/${fileName}`;
    const emailBody = `Hey, I wanted to share this file with you: ${fileName}. Here's the link to download it: ${fileURL}`;
    const subject = `Check out this file: ${fileName}`;
  
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
  
    console.log("Mailto link:", mailtoLink);  // Debugging
  
     
    setTimeout(() => {
      window.open(mailtoLink, '_blank');
    }, 100);
  };

  useEffect(() => {
    fetchFiles();   
  }, []);

  return (
    <div className="container">
      <h3 className="mt-5">Upload a Document</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <input
          type="file"
          className="form-control"
          accept=".pdf, .jpg, .png , .xls, .xlsx"
          onChange={handleFileChange}
        />
      </div>

      <button className="btn btn-primary" onClick={handleUpload}>Upload</button>

      {file && <div className="mt-3"><p><strong>Selected File:</strong> {file.name}</p></div>}

      {uploadedFiles.length > 0 && (
        <table className="table mt-4">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {uploadedFiles.map((uploadedFile, index) => (
              <tr key={uploadedFile._id}>
                <th scope="row">{index + 1}</th>
                <td>{uploadedFile.filename}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleDownload(uploadedFile.filename)}>
                    Download
                  </button>{' '}
                  <button className="btn btn-success" onClick={() => handleShare(uploadedFile.filename)}>
                    Share
                  </button>{' '}
                  <button className="btn btn-danger" onClick={() => handleDelete(uploadedFile._id, index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>

  );
}
