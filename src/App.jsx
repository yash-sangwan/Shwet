import React, { useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/LandingPage/Home";
import "./App.css";
import HomeDB from "./Pages/Dashboard/HomeDB";
import FollowingDB from "./Pages/Dashboard/FollowingDB";
import NotificationDB from "./Pages/Dashboard/NotificationDB";
import GroupsDB from "./Pages/Dashboard/GroupsDB";
import PostDetail from "./Components/Dashboard/HomeDB/PostDetail";
import AddPost from "./Pages/AddPost";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => `https://api.devnet.solana.com`, []);

  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/read/home" element={<HomeDB />} />
                <Route path="/read/home/:postId" element={<PostDetail />} />
                <Route path="/read/following" element={<FollowingDB />} />
                <Route path="/read/groups" element={<GroupsDB />} />
                <Route path="/read/notifications" element={<NotificationDB />} />
                <Route path="/addpost" element={<AddPost />} />
              </Routes>
            </div>
          </Router>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
