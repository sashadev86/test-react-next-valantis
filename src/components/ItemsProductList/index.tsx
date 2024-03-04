import Link from "next/link";
import Text from "../Text";
import { Product } from "../Products/index";

interface ProductListProps {
  products: Product[];
}

const ItemsProductList = ({ products }: ProductListProps) => {
  return (
    <>
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
    </>
  );
};

export default ItemsProductList;
