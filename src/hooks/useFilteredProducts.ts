import { callAPI } from "@/api/callAPI";
import { Product } from "@/components/Products";
import { useCallback, useEffect, useState } from "react";

interface UseFilteredProductsProps {
  filterApplied: boolean;
  page: number;
  perPage: number;
  setFilterApplied: (value: boolean) => void;
  setPage: (value: number) => void;
}

const useFilteredProducts = ({filterApplied, page, perPage, setFilterApplied, setPage}: UseFilteredProductsProps) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [productInputValue, setProductInputValue] = useState("");
  const [priceInputValue, setPriceInputValue] = useState("");
  const [brandInputValue, setBrandInputValue] = useState("");
  const [paginatedLength, setPaginatedLength] = useState<number>(0);

  const filtered = useCallback(async () => {
    try {
      setLoading(true);
      const filterParams = { offset: (page - 1) * perPage, limit: perPage };
      let combinedFilterIds: string[] = [];

      if (productInputValue !== "") {
        console.log("b1");
        const filterIds = await callAPI("filter", { product: productInputValue, ...filterParams });
        combinedFilterIds = [...combinedFilterIds, ...filterIds];
      }

      if (priceInputValue !== "") {
        console.log("b2");
        const filterIds = await callAPI("filter", { price: parseFloat(priceInputValue), ...filterParams });
        combinedFilterIds = [...combinedFilterIds, ...filterIds];
      }

      if (brandInputValue !== "") {
        console.log("b3");
        const filterIds = await callAPI("filter", { brand: brandInputValue, ...filterParams });
        combinedFilterIds = [...combinedFilterIds, ...filterIds];
      }

      const uniqueFilterIds: string[] = Array.from(new Set(combinedFilterIds));
      console.log("b4");
      const filterItems = await callAPI("get_items", { ids: uniqueFilterIds });
      setPaginatedLength(filterItems.length);
      const paginatedIds = filterItems.slice((page - 1) * perPage, page * perPage);

      setFilteredProducts(paginatedIds);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [page, perPage, productInputValue, priceInputValue, brandInputValue]);

  const handleFilterSelect = useCallback((value: string, inputName: string) => {
    setFilterApplied(true);
    setPage(1);

    if (inputName === "product") {
      setProductInputValue(value);
      if (value === "") {
        if (priceInputValue === "" && brandInputValue === "") {
          setFilterApplied(false);
        }
      }
    } else if (inputName === "price") {
      setPriceInputValue(value);
      if (value === "") {
        if (productInputValue === "" && brandInputValue === "") {
          setFilterApplied(false);
        }
      }
    } else if (inputName === "brand") {
      setBrandInputValue(value);
      if (value === "") {
        if (productInputValue === "" && priceInputValue === "") {
          setFilterApplied(false);
        }
      }
    }
  }, [setFilterApplied, setPage, priceInputValue, brandInputValue, productInputValue]);

  useEffect(() => {
    if (filterApplied) {
      filtered();
    }
  }, [filterApplied, filtered])

  return {
    filteredProducts,
    loading,
    paginatedLength,
    handleFilterSelect,
  };
};

export default useFilteredProducts;
