import axios from "axios";
import { useEffect, useState } from "react";
import { CompanyModel } from "./searchModel";

const baseUrl = "https://617c09aad842cf001711c200.mockapi.io/v1";

export const getCompanies: any = () => {
  axios.get(`${baseUrl}/companies`);
};

export const searchCompanies = async (searchValue: string) => {
  return await axios.get(`${baseUrl}/companies/?search=${searchValue}`);
};

const useFetchData = (url: string) => {
  const [data, setData] = useState<CompanyModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(`${baseUrl}${url}`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [url]);

  return {
    data,
    loading,
  };
};

export default useFetchData;
