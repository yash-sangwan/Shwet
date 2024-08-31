import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === "/read/groups") {
    // Hide Sidebar on 'Groups' tab
    return null;
  }

  const handleRedirect = () => {
    navigate("/read/groups");
  };

  return (
    <div className="fixed h-screen w-64 bg-gray-900 text-white flex flex-col justify-between p-4 pt-24">
      <div>
        {/* Top Section */}
        {location.pathname === "/read/notifications" ? (
          <div>
            {/* Custom Sidebar for Notifications */}
            <div className="mb-10 pl-10">
              <h2 className="text-lg font-bold">Filters</h2>
            </div>
            <ul className="space-y-4 pl-2">
              <li>
                <button
                  className="w-full text-left text-sm p-2 hover:text-black bg-primary hover:bg-secondary rounded flex items-center space-x-3"
                
                >
                  <span>All Notifications</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left text-sm p-2 hover:bg-gray-700 rounded flex items-center space-x-3 hover:cursor-not-allowed"
               
                >
                  <span>Groups</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left text-sm p-2 hover:bg-gray-700 rounded flex items-center space-x-3 hover:cursor-not-allowed"
               
                >
                  <span>People updates</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left text-sm p-2 hover:bg-gray-700 rounded flex items-center space-x-3 hover:cursor-not-allowed"
               
                >
                  <span>Comments and mentions</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left text-sm p-2 hover:bg-gray-700 rounded flex items-center space-x-3 hover:cursor-not-allowed"
            
                >
                  <span>Your content</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left text-sm p-2 hover:bg-gray-700 rounded flex items-center space-x-3 hover:cursor-not-allowed"
              
                >
                  <span>Your profile</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left text-sm p-2 hover:bg-gray-700 rounded flex items-center space-x-3 hover:cursor-not-allowed"
                
                >
                  <span>Announcements</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left text-sm p-2 hover:bg-gray-700 rounded flex items-center space-x-3 hover:cursor-not-allowed"
                
                >
                  <span>Subscriptions</span>
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            {/* Default Sidebar */}
            <div className="mb-10 pl-10">
              <button className="flex items-center space-x-2 text-white hover:bg-gray-800 p-2 rounded border-dashed border-gray-300 border hover:cursor-not-allowed">
                <i className="fa-solid fa-square-plus"></i>
                <span className="text-sm">Create Group</span>
              </button>
            </div>

            {/* Links Section */}
            <ul className="space-y-4 pl-2">
              <li>
                <button
                  className="w-full text-left text-sm p-2 bg-gray-800 hover:bg-gray-700 rounded flex items-center space-x-3"
                  onClick={handleRedirect}
                >
                  <img
                    src="https://techcrunch.com/wp-content/uploads/2014/09/facebook-trending.png"
                    alt="icon"
                    className="w-6 h-6"
                  />
                  <span>Trending</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left text-sm p-2 bg-gray-800 hover:bg-gray-700 rounded flex items-center space-x-3"
                  onClick={handleRedirect}
                >
                  <img
                    src="https://cdn.britannica.com/84/203584-050-57D326E5/speed-internet-technology-background.jpg"
                    alt="icon"
                    className="w-6 h-6"
                  />
                  <span>Technology</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left text-sm p-2 bg-gray-800 hover:bg-gray-700 rounded flex items-center space-x-3"
                  onClick={handleRedirect}
                >
                  <img
                    src="https://blog.ipleaders.in/wp-content/uploads/2020/01/Health-Insurance.jpg"
                    alt="icon"
                    className="w-6 h-6"
                  />
                  <span>Health</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left text-sm p-2 bg-gray-800 hover:bg-gray-700 rounded flex items-center space-x-3"
                  onClick={handleRedirect}
                >
                  <img
                    src="https://miro.medium.com/v2/resize:fit:800/1*fXb78_dGqtj7p9QFNo1oFQ.jpeg"
                    alt="icon"
                    className="w-6 h-6"
                  />
                  <span>Politics</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left text-sm p-2 bg-gray-800 hover:bg-gray-700 rounded flex items-center space-x-3"
                  onClick={handleRedirect}
                >
                  <img
                    src="https://static.theprint.in/wp-content/uploads/2019/11/science.jpg"
                    alt="icon"
                    className="w-6 h-6"
                  />
                  <span>Science</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left text-sm p-2 bg-gray-800 hover:bg-gray-700 rounded flex items-center space-x-3"
                  onClick={handleRedirect}
                >
                  <img
                    src="https://myrepublica.nagariknetwork.com/uploads/media/sports_20230518163956.jpg"
                    alt="icon"
                    className="w-6 h-6"
                  />
                  <span>Sports</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left text-sm p-2 bg-gray-800 hover:bg-gray-700 rounded flex items-center space-x-3"
                  onClick={handleRedirect}
                >
                  <img
                    src="https://bsmedia.business-standard.com/_media/bs/img/article/2021-06/05/full/1622854444-6718.jpg"
                    alt="icon"
                    className="w-6 h-6"
                  />
                  <span>Environment</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left text-sm p-2 bg-gray-800 hover:bg-gray-700 rounded flex items-center space-x-3"
                  onClick={handleRedirect}
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAKwVy6hVZ4RBiLTw-ReF7oTeV5L9Eb9xkkQ&s"
                    alt="icon"
                    className="w-6 h-6"
                  />
                  <span>Economy</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="text-xs text-gray-400 pl-4">
        <a href="#" className="hover:underline">About</a> ·
        <a href="#" className="hover:underline">Careers</a> ·
        <a href="#" className="hover:underline">Terms</a> ·
        <a href="#" className="hover:underline">Privacy</a> ·
        <a href="#" className="hover:underline">Acceptable Use</a> ·
        <a href="#" className="hover:underline">Advertise</a> ·
        <a href="#" className="hover:underline">Press</a> ·
        <a href="#" className="hover:underline">Your Ad Choices</a> ·
      </div>
    </div>
  );
};

export default Sidebar;
