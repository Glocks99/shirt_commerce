
const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-16 w-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        <p className="text-white text-lg font-semibold">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loader;
