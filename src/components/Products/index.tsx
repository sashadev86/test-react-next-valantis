"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { callAPI } from "@/api/callAPI";
import Filter from "../Filter";
import Text from "../Text";
import Link from "next/link";
import Button from "../Button";

export interface Product {
  id: string;
  product: string;
  price: number;
  brand: string;
}

interface Option {
  value: string;
  label: string;
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productSet, setProductSet] = useState<Option[]>([]);
  const [priceSet, setPriceSet] = useState<Option[]>([]);
  const [brandSet, setBrandSet] = useState<Option[]>([]);
  const [filterApplied, setFilterApplied] = useState(false);
  const [productInputValue, setProductInputValue] = useState("");
  const [priceInputValue, setPriceInputValue] = useState("");
  const [brandInputValue, setBrandInputValue] = useState("");
  const [paginatedLength, setPaginatedLength] = useState(0);
  const [page, setPage] = useState(1);
  const perPage = 50;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const ids = await callAPI("get_ids");
        const uniqueIds = Array.from(new Set(ids));
        setPaginatedLength(uniqueIds.length);
        const paginatedIds = uniqueIds.slice((page - 1) * perPage, page * perPage);
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
    };

    const fields = async () => {
      try {
        const productResponse: string[] | null = await callAPI("get_fields", { field: "product" });
        const priceResponse: number[] | null = await callAPI("get_fields", { field: "price" });
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
    };

    const filtered = async () => {
      try {
        setLoading(true);
        const filterParams = { offset: (page - 1) * perPage, limit: perPage };
        let combinedFilterIds: string[] = [];

        if (productInputValue !== "") {
          const filterIds = await callAPI("filter", { product: productInputValue, ...filterParams });
          combinedFilterIds = [...combinedFilterIds, ...filterIds];
        }

        if (priceInputValue !== "") {
          const filterIds = await callAPI("filter", { price: parseFloat(priceInputValue), ...filterParams });
          combinedFilterIds = [...combinedFilterIds, ...filterIds];
        }

        if (brandInputValue !== "") {
          const filterIds = await callAPI("filter", { brand: brandInputValue, ...filterParams });
          combinedFilterIds = [...combinedFilterIds, ...filterIds];
        }

        const uniqueFilterIds: string[] = Array.from(new Set(combinedFilterIds));
        const filterItems = await callAPI("get_items", { ids: uniqueFilterIds });
        setPaginatedLength(filterItems.length);
        const paginatedIds = filterItems.slice((page - 1) * perPage, page * perPage);

        setProducts(paginatedIds);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!filterApplied) {
      fetchData();
      fields();
    } else {
      filtered();
    }
  }, [filterApplied, page, perPage, productInputValue, priceInputValue, brandInputValue]);

  const handleFilterSelect = (value: string, inputName: string) => {
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
  };

  const productsList = useMemo(() => {
    return (
      <ul className={"mb-[20px] py-[5px] flex flex-col items-center gap-[10px]"}>
        {products.map((product) => (
          <li
            className={
              "w-full border-solid border-[2px] border-violet-300 rounded-[5px] bg-white hover:border-blue-700 hover:shadow-xl transition-all duration-300 ease-in-out"
            }
            key={product.id}
          >
            <Link href={"#"} className={"p-[10px] sm:p-[20px] flex flex-col items-start justify-between gap-[5px]"}>
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-[5px]">
                <Text classes={"font-sans font-semibold text-[16px]"} tag={"h3"} text={"ID товара: "} />
                <Text classes={"font-sans font-normal text-[20px]"} tag={"p"} text={product.id} />
              </div>
              <div className={"w-full border-dotted border-[1px] border-indigo-100 rounded"}></div>
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-[5px]">
                <Text classes={"font-sans font-semibold text-[16px]"} tag={"h3"} text={"Наименование товара: "} />
                <Text classes={"font-sans font-normal text-[20px]"} tag={"p"} text={product.product} />
              </div>
              <div className={"w-full border-dotted border-[1px] border-indigo-100 rounded"}></div>
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-[5px]">
                <Text classes={"font-sans font-semibold text-[16px]"} tag={"h3"} text={"Цена товара: "} />
                <Text classes={"font-sans font-normal text-[20px]"} tag={"p"} text={product.price.toString() + " руб"} />
              </div>
              <div className={"w-full border-dotted border-[1px] border-indigo-100 rounded"}></div>
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-[5px]">
                <Text classes={"font-sans font-semibold text-[16px]"} tag={"h3"} text={"Бренд товара: "} />
                <Text
                  classes={"font-sans font-normal text-[20px]"}
                  tag={"p"}
                  text={product.brand ? product.brand : "Бренд не указан"}
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    );
  }, [products]);

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const showPagination = paginatedLength > perPage;
  const totalPages = Math.ceil(paginatedLength / perPage);

  const goToFirstPage = () => {
    setPage(1);
  };

  const goToLastPage = () => {
    setPage(totalPages);
  };

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

      {loading ? (
        <div className={"flex items-center justify-center grow"}>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="120px"
              height="120px"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
            >
              <g>
                <circle cx="60" cy="50" r="4" fill="#9336f6">
                  <animate
                    attributeName="cx"
                    repeatCount="indefinite"
                    dur="1s"
                    values="95;35"
                    keyTimes="0;1"
                    begin="-0.67s"
                  ></animate>
                  <animate
                    attributeName="fill-opacity"
                    repeatCount="indefinite"
                    dur="1s"
                    values="0;1;1"
                    keyTimes="0;0.2;1"
                    begin="-0.67s"
                  ></animate>
                </circle>
                <circle cx="60" cy="50" r="4" fill="#9336f6">
                  <animate
                    attributeName="cx"
                    repeatCount="indefinite"
                    dur="1s"
                    values="95;35"
                    keyTimes="0;1"
                    begin="-0.33s"
                  ></animate>
                  <animate
                    attributeName="fill-opacity"
                    repeatCount="indefinite"
                    dur="1s"
                    values="0;1;1"
                    keyTimes="0;0.2;1"
                    begin="-0.33s"
                  ></animate>
                </circle>
                <circle cx="60" cy="50" r="4" fill="#9336f6">
                  <animate
                    attributeName="cx"
                    repeatCount="indefinite"
                    dur="1s"
                    values="95;35"
                    keyTimes="0;1"
                    begin="0s"
                  ></animate>
                  <animate
                    attributeName="fill-opacity"
                    repeatCount="indefinite"
                    dur="1s"
                    values="0;1;1"
                    keyTimes="0;0.2;1"
                    begin="0s"
                  ></animate>
                </circle>
              </g>
              <g transform="translate(-15 0)">
                <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#333333" transform="rotate(90 50 50)"></path>
                <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#333333">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    repeatCount="indefinite"
                    dur="1s"
                    values="0 50 50;45 50 50;0 50 50"
                    keyTimes="0;0.5;1"
                  ></animateTransform>
                </path>
                <path d="M50 50L20 50A30 30 0 0 1 80 50Z" fill="#333333">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    repeatCount="indefinite"
                    dur="1s"
                    values="0 50 50;-45 50 50;0 50 50"
                    keyTimes="0;0.5;1"
                  ></animateTransform>
                </path>
              </g>
            </svg>
          </div>
        </div>
      ) : (
        productsList
      )}

      {!loading && showPagination && (
        <div className={"w-full flex items-center justify-center gap-[5px]"}>
          {page !== 1 && (
            <Button
              className={
                "p-[5px] font-sans font-medium text-[14px] text-[#333333] border-solid border-[1px] border-violet-300 rounded-[5px] bg-white hover:text-white hover:bg-[#333333] transition-colors duration-300"
              }
              text={"Начало"}
              onClick={goToFirstPage}
            />
          )}
          {page > 1 && (
            <Button
              className={
                "p-[5px] font-sans font-medium text-[14px] text-[#333333] border-solid border-[1px] border-violet-300 rounded-[5px] bg-white hover:text-white hover:bg-[#333333] transition-colors duration-300"
              }
              text={"<"}
              onClick={handlePrevPage}
            />
          )}
          {page > 1 && (
            <Button
              className={
                "p-[5px] font-sans font-medium text-[14px] text-[#333333] border-solid border-[1px] border-violet-300 rounded-[5px] bg-white hover:text-white hover:bg-[#333333] transition-colors duration-300"
              }
              text={`${page - 1}`}
              onClick={handlePrevPage}
            />
          )}

          <Text
            classes={
              "p-[5px] font-sans font-medium text-[14px] text-[#333333] border-solid border-[1px] border-violet-300 rounded-[5px] bg-zinc-300"
            }
            tag={"span"}
            text={page.toString()}
          />

          {page < totalPages && (
            <Button
              className={
                "p-[5px] font-sans font-medium text-[14px] text-[#333333] border-solid border-[1px] border-violet-300 rounded-[5px] bg-white hover:text-white hover:bg-[#333333] transition-colors duration-300"
              }
              text={`${page + 1}`}
              onClick={handleNextPage}
            />
          )}
          {page < totalPages && (
            <Button
              className={
                "p-[5px] font-sans font-medium text-[14px] text-[#333333] border-solid border-[1px] border-violet-300 rounded-[5px] bg-white hover:text-white hover:bg-[#333333] transition-colors duration-300"
              }
              text={">"}
              onClick={handleNextPage}
            />
          )}
          {page !== totalPages && (
            <Button
              className={
                "p-[5px] font-sans font-medium text-[14px] text-[#333333] border-solid border-[1px] border-violet-300 rounded-[5px] bg-white hover:text-white hover:bg-[#333333] transition-colors duration-300"
              }
              text={"Конец"}
              onClick={goToLastPage}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Products;
