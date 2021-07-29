interface PaginationProps {
  page: number;
  changePage(mode: string): void;
  length: number;
}

function Pagination({ page, changePage, length }: PaginationProps) {
  return (
    <div className="mt-6 text-indigo-50">
      <button onClick={() => changePage("previous")}>Previous</button>
      <span className="mx-8">
        Page <span className="font-bold">{page}</span> of{" "}
        <span className="font-bold">{Math.ceil(length / 10)}</span>
      </span>
      <button onClick={() => changePage("next")}>Next</button>
    </div>
  );
}

export default Pagination;
