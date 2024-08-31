import assets from "../../../assets/assets";

const Header = () => {
    return (
      <div className="bg-gray-900 p-6 flex justify-center items-center relative">
        <div
          className="bg-gray-800 p-4 w-1/2 h-1/2 mt-4 relative"
          style={{
            backgroundImage: `url(${assets.HeaderGroupBg})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right' 
          }}
        >

          <div className="text-white space-y-4 z-10 relative">
            <h1 className="text-2xl font-bold">Welcome to Groups!</h1>
            <p className="text-lg">Follow Groups to explore your interests on Shwet.</p>
            <div className="space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded hover:cursor-not-allowed">
                <span className="flex items-center">
                  <i className="fa-solid fa-circle-plus mr-2"></i>
                  Create a Space
                </span>
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded hover:cursor-not-allowed">
                <span className="flex items-center">
                  <i className="fa-regular fa-compass mr-2"></i>
                  Discover Spaces
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
export default Header;
