"use client";

import { useMemo, useState } from "react";
import Filter from "../Filter";
import Text from "../Text";
import Loader from "../Loader";
import Pagination from "../Pagination";
import ItemsProductList from "../ItemsProductList";
import useProducts from "@/hooks/useProduct";
import useFilteredProducts from "@/hooks/useFilteredProducts";
import useFieldsFilter from "@/hooks/useFieldsFilter";

export interface Product {
  id: string;
  product: string;
  price: number;
  brand: string;
}

function Products() {
  
  const [filterApplied, setFilterApplied] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 50;
  const {
    products: allProducts,
    loading: productsLoading,
    paginatedLength: paginationAllProducts,
  } = useProducts({filterApplied, page, perPage});
  const {
    filteredProducts,
    loading: filterProductsLoading,
    paginatedLength: paginationFilteredProduct,
    handleFilterSelect,
  } = useFilteredProducts({ filterApplied, page, perPage, setFilterApplied, setPage });
  const { productSet, priceSet, brandSet } = useFieldsFilter({ filterApplied });

  const totalPaginatedLength = filterApplied ? paginationFilteredProduct : paginationAllProducts;
  const showPagination = totalPaginatedLength > perPage;
  const products = filterApplied ? filteredProducts : allProducts;
  const isLoading = productsLoading || filterProductsLoading;

  const productsList = useMemo(() => {
    return (
      <ul className={"mb-[20px] py-[5px] flex flex-col items-center gap-[10px]"}>
         <ItemsProductList products={products} />
      </ul>
    );
  }, [products]);

  return (
    <div className="container py-[50px] min-h-full flex flex-col">
      <Text
        classes={"mb-[10px] font-sans sm:text-[48px] text-[32px] font-medium text-[#333333]"}
        tag={"h1"}
        text={"Список товаров"}
      />
      <div className={"mb-[10px] flex flex-col items-start gap-[10px]"}>
        <Text classes={"font-sans sm:text-[32px] text-[24px] font-medium"} tag={"h2"} text={"Фильтрация:"} />
        <div className={"w-full flex flex-col items-start lg:flex-row gap-[10px]"}>
          <Filter options={productSet} name="product" placeholder="По названию" onSelect={handleFilterSelect} />
          <Filter options={priceSet} name="price" placeholder="По цене" onSelect={handleFilterSelect} />
          <Filter options={brandSet} name="brand" placeholder="По бренду" onSelect={handleFilterSelect} />
        </div>
      </div>

      {isLoading ? <Loader /> : productsList}

      {!isLoading && showPagination && (
        <Pagination page={page} setPage={setPage} perPage={perPage} paginatedLength={totalPaginatedLength} />
      )}
    </div>
  );
}

export default Products;
