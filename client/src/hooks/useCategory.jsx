import { useState } from "react";
import API from "../utils/API";
import { URLS } from "../constants";

const useCategory = () => {
  const [ error, setError ] = useState("");
  const [ loading, setLoading ] = useState(false);

  const list = async() => {
    try {
      setLoading(true);
      const {data} = await API.get(URLS.CATEGORIES)
    
      return data.data
    } catch (e) {
        setError(e)
    }finally{
        setLoading(false)
    }
  };

  return {list}
};

export default useCategory;
