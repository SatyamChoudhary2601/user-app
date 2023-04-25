import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://randomuser.me/api/");
      const {
        name: { first, last },
        email,
      } = response.data.results[0];
      setName(`${first} ${last}`);
      setEmail(email);
      const userData = {
        first: first,
        last: last,
        email: email,
      };
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const cachedUser = localStorage.getItem("user");
    if (cachedUser) {
      const { first, last, email } = JSON.parse(cachedUser);
      setName(`${first} ${last}`);
      setEmail(email);
    } else {
      fetchUser();
    }
  }, []);

  const handleRefresh = () => {
    localStorage.removeItem("user");
    fetchUser();
  };

  return { name, email, loading, handleRefresh };
};

export default useFetch;
