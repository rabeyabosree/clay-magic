import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { X, Edit, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchProfile, updatedUser } from "../../redux/reducers/userSlice";

const Profile = ({ onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [imagePreview, setImagePreview] = useState("");  // Image preview URL state
  const [imageFile, setImageFile] = useState(null);  // Store the image file
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    bio: "",
  });

  // Fetch user profile data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dispatch(fetchProfile(user?._id)).unwrap();
        setProfileData(data);
        console.log(data)
        setFormData({
          userName: data.userName || "",
          email: data.email || "",
          bio: data.bio || "",
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    if (user?._id) {
      fetchData();
    }
  }, [dispatch, user?._id]);

  const handleEditToggle = () => setEditMode(!editMode);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Please log in to see your profile</div>;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];  // Get the selected file
    setImageFile(file);  // Store the file in the state

    const reader = new FileReader();  // Create a FileReader to read the file

    reader.onloadend = () => {
      setImagePreview(reader.result);  // Set the preview URL when the file is read
    };

    if (file) {
      reader.readAsDataURL(file);  // Convert the file to a URL to show as preview
    }
  };

  // Update profile handler
  const handleSave = async () => {
    const updatedData = new FormData();  // Create a new FormData object
    updatedData.append("userName", formData.userName);  // Add form data
    updatedData.append("email", formData.email);
    updatedData.append("bio", formData.bio);

    if (imageFile) {
      updatedData.append("image", imageFile);  // Append the selected image to FormData
    }

    try {
      await dispatch(updatedUser(user?._id, updatedData));  // Send FormData to backend
      setEditMode(false);  // Exit edit mode after saving
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 100 }}
        className="fixed top-0 right-0 w-full md:w-1/3 h-screen bg-white shadow-lg p-6 flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-2xl font-semibold">Profile</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>

        {/* Profile Content */}
        <div className="flex flex-col items-center mt-6">
          {/* Profile Image */}
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200">
            <img
              src={imagePreview || "https://placehold.co/150x150"}  // Show preview or placeholder image
              alt="Profile"
              className="w-full h-full object-cover"
            />
           
          </div>

          {/* Editable Info */}
          <div className="mt-4 w-full text-center space-y-4">
            {editMode ? (
              <>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                />
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                />
                <div className="mt-2">
                  <label className="cursor-pointer bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600">
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                />
                <button
                  onClick={handleSave}
                  className="w-full bg-blue-500 text-white py-2 rounded-md"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-medium">{profileData?.userName}</h3>
                <p className="text-gray-500">{profileData?.bio || "No bio yet"}</p>
                <p className="text-gray-600">{profileData?.email}</p>
              </>
            )}
          </div>

          {/* Edit Button */}
          <button
            onClick={handleEditToggle}
            className="mt-4 flex items-center text-blue-500 hover:text-blue-700"
          >
            <Edit size={20} className="mr-2" />
            {editMode ? "Cancel Edit" : "Edit Profile"}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Profile;












/**
 * import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { X, Edit, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchProfile, updatedUser } from "../../redux/reducers/userSlice";


const Profile = ({ onClose }) => {
  const [profileData, setprofileData] = useState([])
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // fetch user profile data 
  useEffect(() => {
    const fectData = async () => {
      try {
        const data = await dispatch(fetchProfile(user?._id)).unwrap()
        setprofileData(data)
      } catch (error) {
        console.error(error)
      }
    }
    fectData()
  }, [dispatch, user?._id])

  const handleUpdateUser = async () => {
    const updatedData = await dispatch(updatedUser(user?._id, formData))
  }

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    userName: user?.userName || "",
    email: user?.email || "",
    bio: user?.bio || "Add a bio...",
  });

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Please log in to see your profile</div>;
  }

  const handleEditToggle = () => setEditMode(!editMode);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Dispatch update action if needed
    console.log("Updated Profile Data:", formData);
    setEditMode(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 100 }}
        className="fixed top-0 right-0 w-full md:w-1/3 h-screen bg-white shadow-lg p-6 flex flex-col"
      >
        
        <div className="flex justify-between items-center">
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-2xl font-semibold">Profile</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>

   
        <div className="flex flex-col items-center mt-6">
        
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200">
            <img
              src={user?.profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

     
          <div className="mt-4 w-full text-center space-y-4">
            {editMode ? (
              <>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                />
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                />
                <button onClick={handleSave} className="w-full bg-blue-500 text-white py-2 rounded-md">
                  Save
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-medium">{user.userName}</h3>
                <p className="text-gray-500">{formData.bio}</p>
                <p className="text-gray-600">{user.email}</p>
              </>
            )}
          </div>

          <button
            onClick={handleEditToggle}
            className="mt-4 flex items-center text-blue-500 hover:text-blue-700"
          >
            <Edit size={20} className="mr-2" />
            {editMode ? "Cancel Edit" : "Edit Profile"}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Profile;

 */
