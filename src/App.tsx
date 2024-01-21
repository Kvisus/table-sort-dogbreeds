import { useEffect, useState } from "react";
import Table from "./components/Table";

const endpoint = "https://data.webdevinterviews.com/dogBreeds.json";
const App = () => {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(endpoint)
      .then(async (res) => {
        const data = await res.json();
        setBreeds(data);
        setLoading(false);
        // console.log(typeof data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <Table breeds={breeds} />
    </div>
  );
};
export default App;
