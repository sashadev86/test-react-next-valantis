import { callAPI } from "@/api/callAPI";
import { useCallback, useEffect, useState } from "react";

interface Option {
  value: string;
  label: string;
}

const useFieldsFilter = () => {
  const [productSet, setProductSet] = useState<Option[]>([]);
  const [priceSet, setPriceSet] = useState<Option[]>([]);
  const [brandSet, setBrandSet] = useState<Option[]>([]);

  const getFields = useCallback(async () => {
    try {
      console.log("c1");
      const productResponse: string[] | null = await callAPI("get_fields", { field: "product" });
      console.log("c2");
      const priceResponse: number[] | null = await callAPI("get_fields", { field: "price" });
      console.log("c3");
      const brandResponse: string[] | null = await callAPI("get_fields", { field: "brand" });

      const product = productResponse ? productResponse.filter((item) => item !== null) : [];
      const price = priceResponse ? priceResponse.filter((item) => item !== null) : [];
      const brand = brandResponse ? brandResponse.filter((item) => item !== null) : [];

      const productOptions = Array.from(new Set(product)).map((option) => ({ value: option, label: option }));
      const priceOptions = Array.from(new Set(price.map((price) => price.toString()))).map((option) => ({
        value: option,
        label: option,
      }));
      const brandOptions = Array.from(new Set(brand)).map((option) => ({ value: option, label: option }));

      setProductSet(productOptions);
      setPriceSet(priceOptions);
      setBrandSet(brandOptions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    // getFields();
    console.log("render");
  }, [getFields]);

  return {
    productSet,
    priceSet,
    brandSet,
  };
};

export default useFieldsFilter;
