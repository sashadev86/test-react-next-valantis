import { callAPI } from "@/api/callAPI";
import { Product } from "@/components/Products";
import { useCallback, useEffect, useState } from "react"

interface UseProductsProps {
  filterApplied: boolean;
  page: number;
  perPage: number;
}

const useProducts = ({ filterApplied, page, perPage }: UseProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [paginatedLength, setPaginatedLength] = useState<number>(0);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      console.log("a1");
      const ids = await callAPI("get_ids");
      const uniqueIds = Array.from(new Set(ids));
      setPaginatedLength(uniqueIds.length);
      const paginatedIds = uniqueIds.slice((page - 1) * perPage, page * perPage);
      console.log("a2");
      const items = await callAPI("get_items", { ids: paginatedIds });
      const uniqueItems = Array.from(new Set(items.map((item: Product) => item.id))).map((id) =>
        items.find((item: Product) => item.id === id)
      );
      setProducts(uniqueItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [page, perPage]);

  useEffect(() => {
    if (!filterApplied) {
      fetchData();
    }
  }, [fetchData, filterApplied, paginatedLength]);

  return {
    products,
    loading,
    paginatedLength,
  };
};

export default useProducts;
