import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { updateProfileApi } from "../api/users.api";
import { MdArrowBack } from "react-icons/md";

export const Settings = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: user?.name || "",
        bio: user?.bio || "",
        username: user?.username || "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updated = await updateProfileApi(user._id, formData);
            setUser(updated);
            setMessage("Profile updated successfully!");
            setTimeout(() => {
                navigate(`/profile/${user._id}`);
            }, 1500);
        } catch (err) {
            setMessage(err.response?.data?.message || "Error updating profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-black text-white">
            <div className="sticky top-0 p-4 border-b border-gray-800 flex items-center gap-4 z-40">
                <button onClick={() => navigate(-1)} className="hover:bg-gray-900 p-2 rounded-full">
                    <MdArrowBack size={24} />
                </button>
                <h2 className="text-xl font-bold">Edit Profile</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                    <label className="block text-sm font-semibold mb-2">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
                        disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">Username cannot be changed</p>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
                        placeholder="Enter your name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">Bio</label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows="4"
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none resize-none"
                        placeholder="Write something about yourself..."
                    />
                    <p className="text-xs text-gray-500 mt-1">{formData.bio.length}/150 characters</p>
                </div>

                {message && (
                    <div className={`p-4 rounded-lg ${message.includes("success") ? "bg-green-900/30 text-green-400 border border-green-700" : "bg-red-900/30 text-red-400 border border-red-700"}`}>
                        {message}
                    </div>
                )}

                <div className="flex gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex-1 py-2 px-4 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-lg font-semibold transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg font-semibold transition-colors"
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
};
