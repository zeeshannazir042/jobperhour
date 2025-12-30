import { useState } from "react";

export default function Profile() {
  // Mock user data – ideally fetched from your backend
  const [user, setUser] = useState({
    username: "Zeeshan Nazir",
    email: "zeeshan@example.com",
    role: "jobseeker",
    points: 50,
    companyName: "",
    photo: "", // profile photo URL
  });

  const [photoPreview, setPhotoPreview] = useState(user.photo);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Preview the selected image
      setPhotoPreview(URL.createObjectURL(file));

      // Normally you would send 'file' to your backend here
      // For example, via FormData + API call
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      {/* Profile Photo */}
      <div className="mb-6 flex flex-col items-center">
        <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-3">
          {photoPreview ? (
            <img
              src={photoPreview}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl font-bold">
              {user.username[0].toUpperCase()}
            </div>
          )}
        </div>

        <label className="cursor-pointer px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
          Upload Photo
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
        </label>
      </div>

      {/* User Info */}
      <div className="space-y-2">
        <p>
          <span className="font-semibold">Username: </span>
          {user.username}
        </p>
        <p>
          <span className="font-semibold">Email: </span>
          {user.email}
        </p>
        <p>
          <span className="font-semibold">Role: </span>
          {user.role}
        </p>
        <p>
          <span className="font-semibold">Points: </span>
          {user.points}
        </p>
        {user.companyName && (
          <p>
            <span className="font-semibold">Company: </span>
            {user.companyName}
          </p>
        )}
      </div>
    </div>
  );
}
