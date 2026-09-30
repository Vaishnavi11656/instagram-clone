import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { updateProfileApi } from "../api/users.api";

import {
    MdArrowBack,
    MdPersonOutline,
    MdEdit,
    MdInfoOutline,
    MdCheckCircle,
    MdErrorOutline,
} from "react-icons/md";

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
            setMessage(
                err.response?.data?.message ||
                "Error updating profile"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#050509] text-white relative overflow-hidden">

            {/* ================= AMBIENT BACKGROUND ================= */}

            <div className="fixed inset-0 pointer-events-none overflow-hidden">

                <div
                    className="
                        absolute
                        w-[500px]
                        h-[500px]
                        rounded-full
                        bg-blue-600/10
                        blur-[150px]
                        -top-40
                        -left-40
                    "
                />

                <div
                    className="
                        absolute
                        w-[500px]
                        h-[500px]
                        rounded-full
                        bg-purple-600/10
                        blur-[150px]
                        top-[35%]
                        -right-60
                    "
                />

                <div
                    className="
                        absolute
                        w-[350px]
                        h-[350px]
                        rounded-full
                        bg-fuchsia-600/5
                        blur-[130px]
                        bottom-0
                        left-[35%]
                    "
                />

            </div>

            {/* ================= MAIN ================= */}

            <div className="relative w-full max-w-4xl mx-auto px-4 py-6">

                {/* ================= HEADER ================= */}

                <div
                    className="
                        sticky
                        top-4
                        z-40
                        mb-6
                        rounded-2xl
                        border
                        border-white/[0.08]
                        bg-[#09090d]/85
                        backdrop-blur-2xl
                        shadow-[0_15px_50px_rgba(0,0,0,0.3)]
                    "
                >

                    <div className="px-5 py-4 flex items-center gap-4">

                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="
                                w-10
                                h-10
                                rounded-full
                                flex
                                items-center
                                justify-center
                                bg-white/[0.05]
                                border
                                border-white/[0.06]
                                hover:bg-white/[0.1]
                                hover:border-white/[0.12]
                                transition-all
                            "
                        >
                            <MdArrowBack size={21} />
                        </button>

                        <div>
                            <h1 className="text-xl font-bold">
                                Edit Profile
                            </h1>

                            <p className="text-xs text-gray-500 mt-0.5">
                                Manage your profile information
                            </p>
                        </div>

                    </div>

                </div>

                {/* ================= PROFILE SETTINGS ================= */}

                <div
                    className="
                        rounded-3xl
                        border
                        border-white/[0.08]
                        bg-white/[0.025]
                        backdrop-blur-2xl
                        overflow-hidden
                        shadow-[0_20px_80px_rgba(0,0,0,0.35)]
                    "
                >

                    {/* Profile intro */}
                    <div
                        className="
                            px-6
                            md:px-10
                            py-7
                            border-b
                            border-white/[0.06]
                            bg-gradient-to-r
                            from-blue-500/[0.04]
                            via-transparent
                            to-purple-500/[0.04]
                        "
                    >

                        <div className="flex items-center gap-4">

                            <div
                                className="
                                    w-16
                                    h-16
                                    rounded-full
                                    p-[2px]
                                    bg-gradient-to-br
                                    from-blue-500
                                    via-purple-500
                                    to-fuchsia-500
                                "
                            >
                                <img
                                    src={
                                        user?.profileImg ||
                                        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop"
                                    }
                                    alt={user?.username}
                                    className="
                                        w-full
                                        h-full
                                        rounded-full
                                        object-cover
                                        border-2
                                        border-[#09090d]
                                    "
                                />
                            </div>

                            <div>

                                <h2 className="text-lg font-bold">
                                    {user?.username}
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Update your personal information
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="px-6 md:px-10 py-8 space-y-7"
                    >

                        {/* ================= USERNAME ================= */}

                        <div>

                            <label className="flex items-center gap-2 text-sm font-semibold mb-2.5">
                                <MdPersonOutline
                                    size={19}
                                    className="text-blue-400"
                                />

                                Username
                            </label>

                            <div className="relative">

                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    disabled
                                    className="
                                        w-full
                                        h-12
                                        bg-white/[0.035]
                                        border
                                        border-white/[0.07]
                                        rounded-xl
                                        px-4
                                        text-gray-500
                                        outline-none
                                        cursor-not-allowed
                                    "
                                />

                                <span
                                    className="
                                        absolute
                                        right-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-[10px]
                                        uppercase
                                        tracking-wider
                                        text-gray-600
                                        font-semibold
                                    "
                                >
                                    Locked
                                </span>

                            </div>

                            <p className="flex items-center gap-1.5 text-xs text-gray-600 mt-2">
                                <MdInfoOutline size={15} />
                                Username cannot be changed
                            </p>

                        </div>

                        {/* ================= NAME ================= */}

                        <div>

                            <label className="flex items-center gap-2 text-sm font-semibold mb-2.5">
                                <MdEdit
                                    size={18}
                                    className="text-purple-400"
                                />

                                Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="
                                    w-full
                                    h-12
                                    bg-white/[0.035]
                                    border
                                    border-white/[0.08]
                                    rounded-xl
                                    px-4
                                    text-white
                                    placeholder-gray-600
                                    outline-none
                                    focus:border-blue-500/50
                                    focus:bg-white/[0.05]
                                    focus:ring-2
                                    focus:ring-blue-500/10
                                    transition-all
                                "
                            />

                        </div>

                        {/* ================= BIO ================= */}

                        <div>

                            <div className="flex items-center justify-between mb-2.5">

                                <label className="flex items-center gap-2 text-sm font-semibold">
                                    <MdEdit
                                        size={18}
                                        className="text-fuchsia-400"
                                    />

                                    Bio
                                </label>

                                <span
                                    className={`
                                        text-xs
                                        ${formData.bio.length >= 140
                                            ? "text-orange-400"
                                            : "text-gray-600"
                                        }
                                    `}
                                >
                                    {formData.bio.length}/150
                                </span>

                            </div>

                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows="5"
                                maxLength={150}
                                placeholder="Write something about yourself..."
                                className="
                                    w-full
                                    bg-white/[0.035]
                                    border
                                    border-white/[0.08]
                                    rounded-xl
                                    px-4
                                    py-3
                                    text-white
                                    placeholder-gray-600
                                    outline-none
                                    focus:border-blue-500/50
                                    focus:bg-white/[0.05]
                                    focus:ring-2
                                    focus:ring-blue-500/10
                                    transition-all
                                    resize-none
                                    leading-relaxed
                                "
                            />

                            <div className="flex justify-between mt-2">

                                <p className="text-xs text-gray-600">
                                    Tell people a little about yourself.
                                </p>

                                {formData.bio.length >= 140 && (
                                    <span className="text-xs text-orange-400">
                                        Near character limit
                                    </span>
                                )}

                            </div>

                        </div>

                        {/* ================= MESSAGE ================= */}

                        {message && (

                            <div
                                className={`
                                    flex
                                    items-center
                                    gap-3
                                    p-4
                                    rounded-xl
                                    border
                                    ${message.includes("success")
                                        ? "bg-emerald-500/[0.07] text-emerald-400 border-emerald-500/[0.15]"
                                        : "bg-red-500/[0.07] text-red-400 border-red-500/[0.15]"
                                    }
                                `}
                            >

                                {message.includes("success") ? (
                                    <MdCheckCircle size={21} />
                                ) : (
                                    <MdErrorOutline size={21} />
                                )}

                                <span className="text-sm font-medium">
                                    {message}
                                </span>

                            </div>

                        )}

                        {/* ================= ACTIONS ================= */}

                        <div
                            className="
                                flex
                                flex-col-reverse
                                sm:flex-row
                                gap-3
                                pt-3
                                border-t
                                border-white/[0.06]
                            "
                        >

                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="
                                    flex-1
                                    h-12
                                    px-5
                                    bg-white/[0.04]
                                    hover:bg-white/[0.08]
                                    border
                                    border-white/[0.08]
                                    rounded-xl
                                    font-semibold
                                    transition-all
                                "
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="
                                    flex-1
                                    h-12
                                    px-5
                                    bg-gradient-to-r
                                    from-blue-600
                                    to-indigo-600
                                    hover:from-blue-500
                                    hover:to-indigo-500
                                    disabled:from-gray-700
                                    disabled:to-gray-700
                                    disabled:cursor-not-allowed
                                    rounded-xl
                                    font-semibold
                                    shadow-lg
                                    shadow-blue-500/15
                                    transition-all
                                "
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">

                                        <span
                                            className="
                                                w-4
                                                h-4
                                                rounded-full
                                                border-2
                                                border-white/30
                                                border-t-white
                                                animate-spin
                                            "
                                        />

                                        Saving...

                                    </span>
                                ) : (
                                    "Save Changes"
                                )}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};