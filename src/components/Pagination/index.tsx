import Button from "../Button";
import Text from "../Text";

interface PaginationProps {
  page: number;
  perPage: number;
  setPage: (page: number) => void;
  paginatedLength: number;
}

const Pagination = ({page, setPage, perPage, paginatedLength}: PaginationProps) => {
  const totalPages = Math.ceil(paginatedLength / perPage);

  const handlePrevPage = () => {
    const newPage = Math.max(page - 1, 1);
    setPage(newPage);
  };

  const handleNextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
  };


  const goToFirstPage = () => {
    setPage(1);
  };

  const goToLastPage = () => {
    setPage(totalPages);
  };

  return (
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
  );
}

export default Pagination