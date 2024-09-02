import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaBell,
  FaGlobe,
  FaUsers,
  FaCopy,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import Notification from "../Notification";
import LoginComponent from "../Auth/Login"; // Assuming this is your login component
import { getProgram } from "../../Utils/anchorClient"; // Import your program helper

const NavbarDB = () => {
  const { connected, connect, select, disconnect, wallets, publicKey } =
    useWallet();
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    visible: false,
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [isWalletLoading, setIsWalletLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login 
  const [showLogin, setShowLogin] = useState(false); // State to show login component
  const [walletAction, setWalletAction] = useState(""); // State to track wallet action
  const [isUserInitialized, setIsUserInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const dropdownRef = useRef(null);
  const navigate = useNavigate();


  const handleNavigateToWrite = () => {
    navigate("/addpost");
  };

  // Useffect for login
  useEffect(()=>{
    if(!(localStorage.getItem('jwtToken'))){
      setIsLoggedIn(false);
    }else{
      setIsLoggedIn(true)
    }
      }, [localStorage.getItem('jwtToken')])
    

  // useffect for wallet
  useEffect(() => {
    setIsWalletLoading(false);
  }, [connected]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };


    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogin = () => {
    setShowLogin(true); // Show login component when login button is clicked
  }; 

  const handleLoginSuccess = async() => {
    try {
      
      setIsLoading(true);
      if(localStorage.getItem('jwtToken')){
  
        setShowLogin(false); // Hide login component after successful login
        showNotification("Login successful!", "success");
        navigate('/read/home'); // Navigate to the desired route after login
        setIsLoggedIn(true);
      }
    } catch (error) {
      showNotification(error.message);
    }finally{
      setIsLoading(false);
    }
  };
  
  // Logout 
  const handleLogout = async() => {
    try {
      setIsLoading(true);
      localStorage.removeItem('jwtToken'); // Clear the JWT token
      await handleDisconnect();
      setIsLoggedIn(false); // Update isLoggedIn state to false
      showNotification("Logout successful!", "success");
      navigate('/read/home'); // Redirect to the login page after logout
      
    } catch (error) {
      showNotification(error.message);
    }finally{
      setIsLoading(false);
    }
  };




  useEffect(() => {
    if (
      walletAction === "connect" &&
      connected &&
      !isConnecting &&
      !isWalletLoading
    ) {
      showNotification("Wallet connected successfully!", "success");
    } else if (
      walletAction === "disconnect" &&
      !connected &&
      !isConnecting &&
      !isWalletLoading
    ) {
      showNotification("Wallet disconnected successfully!", "success");
    }
  }, [connected, isConnecting, isWalletLoading, walletAction]);

  const handleConnect = async () => {
    try {
      const token = localStorage.getItem("jwtToken")
      if(token){

        setIsConnecting(true);
        setWalletAction("connect"); // Set action to connect
        console.log("Connecting...");
        
      if (wallets.length > 0) {
        const wallet = wallets[0]; // Select the first wallet for now
        console.log("Selected wallet:", wallet.adapter.name);
        await select(wallet.adapter.name);

        // Wait a bit to ensure the wallet selection is processed
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Check if the wallet is selected and connected
        if (publicKey) {
          console.log("Selected public key:", publicKey.toBase58());

          // Attempt to connect
          await connect();

          // Check if the connection was successful
          if (!connected) {
            showNotification(
              "Failed to connect wallet. Please try again.",
              "error"
            );
            return;
          }

          console.log("Connected:", connected);
          
          // Initialize user account after wallet is connected
          await initializeUserAccount(); // This function will ensure the user account is created if it doesn't exist
        } else {
          showNotification(
            "Wallet not selected. Please select a wallet.",
            "error"
          );
        }
      } else {
        showNotification("No wallets found. Please install a wallet.", "error");
      }
      }else{
        showNotification("Please login before connecting wallet!","error")
      }

    } catch (error) {
      console.error("Failed to connect wallet:", error);
      showNotification(`Failed to connect wallet: ${error.message}`, "error");
    } finally {
      setIsConnecting(false);
    }
  };
  const initializeUserAccount = async () => {
    try {
      setIsLoading(true);
      console.log("Initializing user account...");
  
      const program = getProgram(wallets[0]?.adapter); // Ensure correct wallet adapter is passed
  
      if (!publicKey) {
        console.error("Public key is not available.");
        return;
      }
  
      // Derive user account PDA (make sure this matches your program's logic)
      const [userPda] = await PublicKey.findProgramAddressSync(
        [Buffer.from("user"), publicKey.toBuffer()],
        program.programId
      );
  
      console.log("Derived user account:", userPda.toBase58());
  
      const accountInfo = await program.provider.connection.getAccountInfo(userPda);

      if (!accountInfo) {
        console.log("User account not found, initializing...");
        // Initialize the user account only if it doesn't exist
        await program.methods.initUser("Your Name")
          .accounts({
            userAccount: userPda,
            authority: publicKey,
            systemProgram: SystemProgram.programId,
          })
          .signers([]) // Add signers if required by your program
          .rpc();
  
        showNotification("User account initialized successfully!", "success");
        console.log("User account initialized successfully.");
        setIsUserInitialized(true); // Set the user as initialized
      } else {
        setIsUserInitialized(true); // Set the user as initialized
        console.log("User account already exists.");
        // mtlb logic lga to skte h pr complex hota jaega aise sun ek sec
        // Fetch the user account data
        const userAccount = await program.account.user.fetch(userPda);
        console.log("User account data:", userAccount);
  
        // Access the lastPostId field
        const lastPostId = userAccount.lastPostId; // Directly use the u8 value
        console.log("Last Post ID:", lastPostId);
  
        // Access other fields if needed
        const postCount = userAccount.postCount; // Directly use the u8 value
        console.log("Post Count:", postCount);
      }
  
    } catch (error) {
      console.error("Failed to initialize user account:", error);
      showNotification(
        "Failed to initialize user account. Please try again.",
        "error"
      );
    }finally{
      setIsLoading(false);
    }
  };
  
  
  const handleDisconnect = async () => {
    try {
      setIsLoading(true);
      setWalletAction("disconnect"); // Set action to disconnect
      await disconnect();
      showNotification("Wallet disconnected successfully!", "success");
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
      showNotification(
        "Failed to disconnect wallet. Please try again.",
        "error"
      );
    }finally{
      setIsLoading(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type, visible: true });
  };

  const closeNotification = () => {
    setNotification({ ...notification, visible: false });
  };

  const handleCopyPublicKey = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toBase58());
      showNotification("Public key copied to clipboard!", "success");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const shortenPublicKey = (publicKey) => {
    if (!publicKey) return "";
    const publicKeyStr = publicKey.toBase58();
    return `${publicKeyStr.slice(0, 3)}...${publicKeyStr.slice(-3)}`;
  };
  return (
    <nav className="bg-gray-900 text-white flex items-center justify-between px-8 py-2 fixed top-0 left-0 w-full z-50">
      {notification.visible && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}


      {/* Show login component when showLogin is true */}
      {showLogin && (
        <LoginComponent
          onSuccess={handleLoginSuccess}
          onClose={() => setShowLogin(false)}
        />
      )}

      <div className="flex items-center space-x-32 flex-1 justify-center">
        <div className="text-primary text-3xl font-bold">Shwet</div>

        <div className="flex items-center space-x-8">
          <NavLink
            to="/read/home"
            className={({ isActive }) =>
              `relative cursor-pointer text-xl ${isActive ? 'text-yellow-400 border-b-2 border-yellow-400 pb-1' : 'hover:text-gray-300'}`
            }
          >
            <FaHome title="Home" />
          </NavLink>
          <NavLink
            to="/read/following"
            className={({ isActive }) =>
              `relative cursor-pointer text-xl ${isActive ? 'text-yellow-400 border-b-2 border-yellow-400 pb-1' : 'hover:text-gray-300'}`
            }
          >
            <FaClipboardList title="Following" />
          </NavLink>
          <NavLink
            to="/read/groups"
            className={({ isActive }) =>
              `relative cursor-pointer text-xl ${isActive ? 'text-yellow-400 border-b-2 border-yellow-400 pb-1' : 'hover:text-gray-300'}`
            }
          >
            <FaUsers title="Groups" />
          </NavLink>
          <NavLink
            to="/read/notifications"
            className={({ isActive }) =>
              `relative cursor-pointer text-xl ${isActive ? 'text-yellow-400 border-b-2 border-yellow-400 pb-1' : 'hover:text-gray-300'}`
            }
          >
            <FaBell title="Notifications" />
          </NavLink>
        </div>
      </div>


      <div className="flex items-center bg-gray-800 rounded-full px-1 py-1 flex-1 justify-center">
        <FiSearch className="text-gray-400 mr-2 text-xl" />
        <input
          type="text"
          placeholder="Search Shwet"
          className="bg-transparent outline-none text-white placeholder-gray-400"
        />
      </div>

        <div className="flex items-center space-x-4 flex-1 justify-center relative">
        {isLoggedIn ? (
      <button
        className="bg-primary text-black px-4 py-1 rounded-full hover:bg-secondary"
        onClick={handleLogout}
      >
        Logout 

      </button>
): (<button
className="bg-primary text-black px-4 py-1 rounded-full hover:bg-secondary"
onClick={handleLogin}
>
  Login
</button>)}
    
    {isWalletLoading ? (
      <span className="text-white">Loading...</span>
    ) : (
      <>
        {!connected && !isConnecting ? (
          <button
            className="bg-primary text-black px-4 py-1 rounded-full hover:bg-secondary"
            onClick={handleConnect}
          >
            Connect
          </button>
        ) : connected && !isConnecting ? (
          <>
            <button className="bg-gray-700 text-white px-4 py-1 rounded-full hover:bg-gray-600 hover:cursor-not-allowed">
              Try Shwet+
            </button>

            <div className="relative" ref={dropdownRef}>
              <div
                className="bg-[#8C6D62] w-8 h-8 rounded-full flex items-center justify-center text-white cursor-pointer"
                onClick={toggleDropdown}
              >
                {publicKey ? publicKey.toBase58().charAt(0).toUpperCase() : "Y"}
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg p-2 z-50">
                  <div className="flex items-center justify-between px-2 py-1">
                    <span
                      className="text-white text-sm cursor-pointer"
                      onClick={handleCopyPublicKey}
                      title="Click to copy public key"
                    >
                      {publicKey ? shortenPublicKey(publicKey) : "N/A"}
                    </span>
                    <FaCopy
                      className="text-white cursor-pointer hover:text-gray-300"
                      onClick={handleCopyPublicKey}
                      title="Copy Public Key"
                    />
                  </div>
                  <hr className="border-gray-700 my-2" />
                  <button
                    className="w-full text-left px-2 py-1 text-white hover:bg-gray-700 rounded"
                    onClick={handleDisconnect}
                  >
                    Disconnect Wallet
                  </button>
                </div>
              )}
            </div>

            <FaGlobe
              title="Languages"
              className="hover:text-gray-300 cursor-pointer text-xl"
            />

            {isUserInitialized ? (
              <button
                className="bg-primary text-black px-4 py-1 rounded-full hover:bg-secondary"
                onClick={handleNavigateToWrite}
              >
                Add post
              </button>
            ) : (
              <button
                className="bg-primary text-black px-4 py-1 rounded-full hover:bg-secondary"
                onClick={initializeUserAccount}
              >
                Initialize User
              </button>
            )}
          </>
        ) : (
          <span className="text-white">Connecting...</span>
        )}
      </>
    )}
  </div>

      </nav>
    );
  };

  export default NavbarDB;
