import { useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios"

function Home() {
  useEffect(() => {
    getTest();
  }, [])
  async function getTest() {
    const response = await axios.get("http://localhost:3000/test")
    console.log(response)
  }

    return (
      <div className="home">
        <Navbar />
        <h1>Home</h1>
      </div>
    );
  }
  
  export default Home;