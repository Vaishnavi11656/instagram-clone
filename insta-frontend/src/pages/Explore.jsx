import { useState, useEffect } from "react";
import { searchUsersApi } from "../api/users.api";
import { getPostsApi } from "../api/posts.api";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const Explore = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadAllPosts();
    }, []);

    async function loadAllPosts() {
        try {
            const posts = await getPostsApi();
            setAllPosts(posts);
        } catch (err) {
            console.error("Error loading posts:", err);
        }
    }

    async function handleSearch() {
        if (!searchQuery.trim()) {
            setUsers([]);
            return;
        }

        setLoading(true);
        try {
            const results = await searchUsersApi(searchQuery);
            setUsers(results);
        } catch (err) {
            console.error("Error searching users:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto text-white">
            {/* Search Bar */}
            <div className="sticky top-0 p-6 bg-black/80 backdrop-blur border-b border-gray-800 z-40">
                <div className="relative flex items-center">
                    <IoSearch className="absolute left-4 text-gray-500" size={20} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            if (e.target.value.length > 2) {
                                handleSearch();
                            }
                        }}
                        placeholder="Search users..."
                        className="w-full bg-gray-900 border border-gray-800 rounded-full pl-12 pr-6 py-3 text-white placeholder-gray-500 outline-none focus:border-gray-700 transition-colors"
                    />
                </div>
            </div>

            {/* Search Results */}
            {searchQuery.trim() && (
                <div className="p-6 border-b border-gray-800">
                    {loading ? (
                        <p className="text-gray-400">Searching...</p>
                    ) : users.length > 0 ? (
                        <div>
                            <h2 className="text-xl font-bold mb-4">Users</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {users.map((user) => (
                                    <button
                                        key={user._id}
                                        onClick={() => navigate(`/profile/${user._id}`)}
                                        className="p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-all flex items-center gap-4"
                                    >
                                        <img
                                            src={user.profileImg || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop"}
                                            alt={user.username}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                        <div className="text-left">
                                            <p className="font-bold">{user.username}</p>
                                            <p className="text-gray-400 text-sm">{user.name}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-400">No users found</p>
                    )}
                </div>
            )}

            {/* Explore Grid */}
            {!searchQuery && (
                <div>
                    <h2 className="text-2xl font-bold p-6 pb-0">Explore</h2>
                    <div className="p-6 grid grid-cols-3 gap-4">
                        {allPosts.map((post) => (
                            <div
                                key={post._id}
                                className="aspect-square bg-gray-900 rounded-lg overflow-hidden group cursor-pointer"
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
                </div>
            )}
        </div>
    );
};
