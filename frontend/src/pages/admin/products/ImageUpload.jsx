import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadImage, clearImage } from "../../../redux/reducers/imageSlice";
import PropTypes from "prop-types";

const ImageUpload = ({ onImageUpload }) => {
  const dispatch = useDispatch();
  const { imageUrl, status, error } = useSelector((state) => state.images);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      dispatch(uploadImage(selectedFile));
    }
  };

  const handleClear = () => {
    dispatch(clearImage());
    setSelectedFile(null);
    document.getElementById("fileInput").value = null;
  };

  useEffect(() => {
    if (imageUrl) {
      onImageUpload(imageUrl);
    }
  }, [imageUrl, onImageUpload]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <input
        id="fileInput"
        type="file"
        onChange={handleFileChange}
        className="block w-full mb-4"
        accept="image/*"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        disabled={!selectedFile || status === "loading"}
      >
        {status === "loading" ? "Uploading..." : "Upload"}
      </button>
      <button
        onClick={handleClear}
        className="bg-gray-500 text-white py-2 px-4 ml-2 rounded hover:bg-gray-600"
        disabled={!imageUrl}
      >
        Clear
      </button>

      {imageUrl && (
        <div className="mt-4">
          <p className="text-green-500">Image uploaded successfully!</p>
          <img
            src={imageUrl}
            alt="Uploaded"
            className="mt-4 max-w-full rounded-lg shadow-lg border border-gray-300"
          />
        </div>
      )}
      {error && (
        <p className="text-red-500 mt-4">
          {error.message || "Failed to upload the image. Please try again."}
        </p>
      )}
    </div>
  );
};

ImageUpload.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
};

export default ImageUpload;
