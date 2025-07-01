import { useAppContext } from "../context/AppContext";

const Profile = () => {
  const {user} = useAppContext()
  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div className="flex items-center gap-4">
          <img
            src="/assets/profile-avatar.png" // Use a real path or default avatar
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <div>
            <p className="text-xl font-semibold">{user?.userData?.firstName}</p>
            <p className="text-gray-600">{user?.userData?.email}</p>
          </div>
        </div>

        <hr />

        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                defaultValue= {`${user?.userData?.firstName} ${user?.userData?.lastName}` || ""}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder= {user?.userData?.email || ""}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder={user?.userData?.contact || ""}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                placeholder={user?.userData?.address || "Not set yet"}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
