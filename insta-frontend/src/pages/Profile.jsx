import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import {
    getUserProfileApi,
    followUserApi,
    unfollowUserApi,
    getUserPostsApi,
} from "../api/users.api";

import {
    IoArrowBack,
    IoPersonAdd,
    IoPersonRemove,
    IoSettingsSharp,
    IoGridOutline,
    IoHeart,
    IoChatbubble,
} from "react-icons/io5";

export const Profile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { user: currentUser } = useContext(AuthContext);

    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const isOwnProfile = currentUser?._id === userId;

    useEffect(() => {
        async function loadProfile() {
            setLoading(true);

            try {
                const profileData = await getUserProfileApi(userId);
                const postsData = await getUserPostsApi(userId);

                setProfile(profileData);
                setPosts(postsData);

                setIsFollowing(
                    profileData.followers?.includes(currentUser?._id)
                );
            } catch (err) {
                console.error("Error loading profile:", err);
            } finally {
                setLoading(false);
            }
        }

        loadProfile();
    }, [userId, currentUser]);

    const handleFollowToggle = async () => {
        try {
            if (isFollowing) {
                await unfollowUserApi(userId);
            } else {
                await followUserApi(userId);
            }

            setIsFollowing(!isFollowing);
        } catch (err) {
            console.error("Error toggling follow:", err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050509] text-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin" />
                    <p className="text-gray-400 text-sm">
                        Loading profile...
                    </p>
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen bg-[#050509] text-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl font-semibold mb-2">
                        Profile not found
                    </p>

                    <button
                        onClick={() => navigate(-1)}
                        className="text-blue-400 hover:text-blue-300 transition"
                    >
                        Go back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-[#050509] text-white relative overflow-hidden">

            {/* Ambient background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">

                <div
                    className="
                        absolute
                        w-[500px]
                        h-[500px]
                        rounded-full
                        bg-blue-600/10
                        blur-[140px]
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
                        w-[400px]
                        h-[400px]
                        rounded-full
                        bg-fuchsia-600/5
                        blur-[130px]
                        bottom-0
                        left-[30%]
                    "
                />

            </div>

            <div className="relative w-full max-w-5xl mx-auto">

                {/* ================= HEADER ================= */}

                <div
                    className="
                        sticky
                        top-0
                        z-40
                        h-[72px]
                        px-5
                        flex
                        items-center
                        gap-4
                        border-b
                        border-white/[0.07]
                        bg-[#050509]/85
                        backdrop-blur-2xl
                    "
                >

                    <button
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
                        <IoArrowBack size={21} />
                    </button>

                    <div className="min-w-0">
                        <h2 className="text-lg font-bold truncate">
                            {profile.username}
                        </h2>

                        <p className="text-xs text-gray-500">
                            {posts.length} {posts.length === 1 ? "post" : "posts"}
                        </p>
                    </div>

                </div>

                {/* ================= PROFILE CARD ================= */}

                <div
                    className="
                        mx-4
                        mt-6
                        rounded-3xl
                        border
                        border-white/[0.08]
                        bg-white/[0.025]
                        backdrop-blur-2xl
                        overflow-hidden
                        shadow-[0_20px_80px_rgba(0,0,0,0.35)]
                    "
                >

                    {/* Top glow */}
                    <div className="relative h-28 overflow-hidden">

                        <div
                            className="
                                absolute
                                inset-0
                                bg-gradient-to-r
                                from-blue-600/20
                                via-purple-600/15
                                to-fuchsia-600/20
                            "
                        />

                        <div
                            className="
                                absolute
                                w-64
                                h-64
                                rounded-full
                                bg-blue-500/15
                                blur-[100px]
                                -top-40
                                left-1/4
                            "
                        />

                    </div>

                    {/* Profile content */}
                    <div className="px-6 md:px-10 pb-8">

                        <div className="relative -mt-16">

                            {/* Avatar */}
                            <div
                                className="
                                    w-32
                                    h-32
                                    rounded-full
                                    p-[3px]
                                    bg-gradient-to-br
                                    from-blue-500
                                    via-purple-500
                                    to-fuchsia-500
                                    shadow-[0_0_35px_rgba(99,102,241,0.25)]
                                "
                            >
                                <img
                                    src={
                                        profile.profileImg ||
                                        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop"
                                    }
                                    alt={profile.username}
                                    className="
                                        w-full
                                        h-full
                                        rounded-full
                                        object-cover
                                        border-4
                                        border-[#09090d]
                                    "
                                />
                            </div>

                        </div>

                        {/* User info */}
                        <div className="mt-5">

                            <div
                                className="
                                    flex
                                    flex-col
                                    md:flex-row
                                    md:items-center
                                    md:justify-between
                                    gap-5
                                "
                            >

                                <div>

                                    <div className="flex items-center gap-3">

                                        <h1 className="text-3xl font-bold tracking-tight">
                                            {profile.username}
                                        </h1>

                                        <span
                                            className="
                                                px-2
                                                py-1
                                                text-[10px]
                                                font-semibold
                                                uppercase
                                                tracking-wider
                                                rounded-full
                                                bg-blue-500/10
                                                text-blue-400
                                                border
                                                border-blue-500/20
                                            "
                                        >
                                            Profile
                                        </span>

                                    </div>

                                    <p className="text-gray-400 mt-1">
                                        {profile.name}
                                    </p>

                                </div>

                                {/* Action */}
                                {isOwnProfile ? (
                                    <button
                                        onClick={() => navigate("/settings")}
                                        className="
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            px-5
                                            py-2.5
                                            rounded-xl
                                            bg-white/[0.06]
                                            border
                                            border-white/[0.08]
                                            hover:bg-white/[0.1]
                                            hover:border-white/[0.14]
                                            transition-all
                                            font-semibold
                                        "
                                    >
                                        <IoSettingsSharp size={18} />
                                        Edit Profile
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleFollowToggle}
                                        className={`
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            px-6
                                            py-2.5
                                            rounded-xl
                                            font-semibold
                                            transition-all
                                            ${
                                                isFollowing
                                                    ? "bg-white/[0.06] border border-white/[0.1] hover:bg-white/[0.1]"
                                                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/20"
                                            }
                                        `}
                                    >
                                        {isFollowing ? (
                                            <>
                                                <IoPersonRemove size={18} />
                                                Following
                                            </>
                                        ) : (
                                            <>
                                                <IoPersonAdd size={18} />
                                                Follow
                                            </>
                                        )}
                                    </button>
                                )}

                            </div>

                            {/* Bio */}
                            <div className="mt-5 max-w-2xl">

                                <p className="text-gray-300 leading-relaxed">
                                    {profile.bio || "No bio added"}
                                </p>

                            </div>

                            {/* Stats */}
                            <div
                                className="
                                    mt-7
                                    grid
                                    grid-cols-3
                                    max-w-xl
                                    rounded-2xl
                                    border
                                    border-white/[0.06]
                                    bg-black/20
                                    overflow-hidden
                                "
                            >

                                {/* Posts */}
                                <div className="py-5 text-center border-r border-white/[0.06]">

                                    <span className="block text-2xl font-bold">
                                        {posts.length}
                                    </span>

                                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                                        Posts
                                    </span>

                                </div>

                                {/* Followers */}
                                <button
                                    onClick={() =>
                                        alert("Followers list coming soon!")
                                    }
                                    className="
                                        py-5
                                        text-center
                                        border-r
                                        border-white/[0.06]
                                        hover:bg-white/[0.03]
                                        transition
                                    "
                                >

                                    <span className="block text-2xl font-bold">
                                        {profile.followers?.length || 0}
                                    </span>

                                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                                        Followers
                                    </span>

                                </button>

                                {/* Following */}
                                <button
                                    onClick={() =>
                                        alert("Following list coming soon!")
                                    }
                                    className="
                                        py-5
                                        text-center
                                        hover:bg-white/[0.03]
                                        transition
                                    "
                                >

                                    <span className="block text-2xl font-bold">
                                        {profile.following?.length || 0}
                                    </span>

                                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                                        Following
                                    </span>

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ================= POSTS ================= */}

                <div className="px-4 mt-8 pb-12">

                    {/* Posts heading */}
                    <div
                        className="
                            flex
                            items-center
                            gap-3
                            mb-5
                            px-2
                        "
                    >

                        <div
                            className="
                                w-9
                                h-9
                                rounded-xl
                                flex
                                items-center
                                justify-center
                                bg-blue-500/10
                                border
                                border-blue-500/15
                                text-blue-400
                            "
                        >
                            <IoGridOutline size={19} />
                        </div>

                        <div>
                            <h2 className="text-lg font-bold">
                                Posts
                            </h2>

                            <p className="text-xs text-gray-500">
                                {posts.length} shared{" "}
                                {posts.length === 1 ? "post" : "posts"}
                            </p>
                        </div>

                    </div>

                    {/* Grid */}
                    {posts.length > 0 ? (

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">

                            {posts.map((post) => (

                                <div
                                    key={post._id}
                                    className="
                                        aspect-square
                                        rounded-xl
                                        overflow-hidden
                                        bg-white/[0.03]
                                        border
                                        border-white/[0.05]
                                        cursor-pointer
                                        relative
                                        group
                                    "
                                >

                                    <img
                                        src={post.imageUrl}
                                        alt={post.caption}
                                        className="
                                            w-full
                                            h-full
                                            object-cover
                                            transition-transform
                                            duration-500
                                            group-hover:scale-105
                                        "
                                    />

                                    {/* Hover overlay */}
                                    <div
                                        className="
                                            absolute
                                            inset-0
                                            bg-black/65
                                            opacity-0
                                            group-hover:opacity-100
                                            transition-opacity
                                            duration-300
                                            flex
                                            items-center
                                            justify-center
                                        "
                                    >

                                        <div className="flex items-center gap-7">

                                            <span
                                                className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                    font-semibold
                                                    text-sm
                                                "
                                            >
                                                <IoHeart
                                                    size={20}
                                                    className="text-white"
                                                />

                                                {post.likes?.length || 0}
                                            </span>

                                            <span
                                                className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                    font-semibold
                                                    text-sm
                                                "
                                            >
                                                <IoChatbubble
                                                    size={19}
                                                    className="text-white"
                                                />

                                                {post.commentCount || 0}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    ) : (

                        <div
                            className="
                                rounded-2xl
                                border
                                border-white/[0.06]
                                bg-white/[0.02]
                                py-20
                                text-center
                            "
                        >

                            <div
                                className="
                                    w-16
                                    h-16
                                    mx-auto
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                    bg-white/[0.04]
                                    border
                                    border-white/[0.06]
                                    mb-4
                                "
                            >
                                <IoGridOutline
                                    size={28}
                                    className="text-gray-500"
                                />
                            </div>

                            <p className="text-gray-300 font-semibold">
                                No posts yet
                            </p>

                            <p className="text-gray-600 text-sm mt-1">
                                Posts shared by this user will appear here.
                            </p>

                        </div>

                    )}

                </div>

            </div>
        </div>
    );
};