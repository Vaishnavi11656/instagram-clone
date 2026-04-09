import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { getUserProfileApi, followUserApi, unfollowUserApi, getUserPostsApi } from "../api/users.api";
import { IoArrowBack, IoPersonAdd, IoPersonRemove, IoSettingsSharp } from "react-icons/io5";

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
                setIsFollowing(profileData.followers?.includes(currentUser?._id));
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

    if (loading) return <div className="text-white p-8">Loading...</div>;
    if (!profile) return <div className="text-white p-8">Profile not found</div>;

    return (
        <div className="w-full max-w-4xl mx-auto text-white">
            {/* Profile Header */}
            <div className="sticky top-0 p-4 border-b border-gray-800 bg-black/80 backdrop-blur flex items-center gap-4 z-40">
                <button onClick={() => navigate(-1)} className="hover:bg-gray-900 p-2 rounded-full">
                    <IoArrowBack size={24} />
                </button>
                <div>
                    <h2 className="text-lg font-bold">{profile.username}</h2>
                    <p className="text-xs text-gray-400">{posts.length} posts</p>
                </div>
            </div>

            <div className="p-6 border-b border-gray-800">
                <div className="flex gap-8 mb-8">
                    <img
                        src={profile.profileImg || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop"}
                        alt={profile.username}
                        className="w-40 h-40 rounded-full object-cover border-2 border-gray-700"
                    />

                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                            <h1 className="text-3xl font-bold">{profile.username}</h1>
                            {isOwnProfile ? (
                                <button
                                    onClick={() => navigate("/settings")}
                                    className="flex items-center gap-2 px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold transition-all"
                                >
                                    <IoSettingsSharp size={20} />
                                    Edit Profile
                                </button>
                            ) : (
                                <button
                                    onClick={handleFollowToggle}
                                    className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all ${isFollowing
                                        ? "bg-gray-800 text-white hover:bg-gray-700"
                                        : "bg-blue-600 text-white hover:bg-blue-700"
                                        }`}
                                >
                                    {isFollowing ? (
                                        <>
                                            <IoPersonRemove size={20} />
                                            Following
                                        </>
                                    ) : (
                                        <>
                                            <IoPersonAdd size={20} />
                                            Follow
                                        </>
                                    )}
                                </button>
                            )}
                        </div>

                        <p className="text-lg font-semibold text-white mb-2">{profile.name}</p>
                        <p className="text-gray-300 mb-6">{profile.bio || "No bio added"}</p>

                        <div className="flex gap-12">
                            <div className="text-center">
                                <span className="block font-bold text-2xl">{posts.length}</span>
                                <span className="text-gray-400 text-sm">Posts</span>
                            </div>
                            <button onClick={() => alert("Followers list coming soon!")} className="text-center hover:opacity-70">
                                <span className="block font-bold text-2xl">{profile.followers?.length || 0}</span>
                                <span className="text-gray-400 text-sm">Followers</span>
                            </button>
                            <button onClick={() => alert("Following list coming soon!")} className="text-center hover:opacity-70">
                                <span className="block font-bold text-2xl">{profile.following?.length || 0}</span>
                                <span className="text-gray-400 text-sm">Following</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Posts Grid */}
            <div className="p-6">
                <h2 className="text-xl font-bold mb-6">Posts</h2>
                {posts.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4">
                        {posts.map((post) => (
                            <div
                                key={post._id}
                                className="aspect-square bg-gray-900 rounded-lg overflow-hidden group cursor-pointer relative"
                            >
                                <img
                                    src={post.imageUrl}
                                    alt={post.caption}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                    <div className="flex gap-6 text-white">
                                        <span className="flex items-center gap-2 font-bold">
                                            ❤️ {post.likes?.length || 0}
                                        </span>
                                        <span className="flex items-center gap-2 font-bold">
                                            💬 {post.commentCount || 0}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-gray-400 text-center py-16">
                        <p className="text-lg">No posts yet</p>
                    </div>
                )}
            </div>
        </div>
    );
};
