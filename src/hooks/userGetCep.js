import axios from "axios";
import { useState } from "react";

const useGetCep = () => {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const consultCEP = (cep) => {
    setLoading(true);
    setError(false);

    axios({
      method: "get",
      url: `https://viacep.com.br/ws/${cep}/json/`,
    })
      .then((response) => {
        setAddress(response.data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { address, loading, error, consultCEP };
};

export default useGetCep;
