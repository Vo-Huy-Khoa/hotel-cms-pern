import { Button, CardFooter, Typography } from "@material-tailwind/react";

const Pagination = (props: any) => {
  const { page, totalRow, onPageChange } = props;
  const totalPages = Math.ceil(totalRow / 10);

  const handlePageChange = (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  return (
    <CardFooter divider className="flex items-center justify-between py-3">
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px">
          <li>
            <Button
              disabled={page <= 1}
              onClick={() => handlePageChange(page - 1)}
              className="px-3 py-2 ml-0 leading-tight text-gray-700 bg-white border border-gray-300 rounded-l-lg"
            >
              Previous
            </Button>
          </li>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber, index) => (
              <li key={index}>
                <Button
                  onClick={() => handlePageChange(pageNumber)}
                  className={` ${
                    page === pageNumber
                      ? "bg-gray-700 text-white"
                      : "bg-white border text-gray-800"
                  } px-3 py-2 leading-tight  border-gray-300 `}
                >
                  {pageNumber}
                </Button>
              </li>
            )
          )}

          <li>
            <Button
              disabled={page >= totalPages}
              onClick={() => handlePageChange(page + 1)}
              className="px-3 py-2 leading-tight text-gray-700 bg-white border border-gray-300 rounded-r-lg "
            >
              Next
            </Button>
          </li>
        </ul>
      </nav>
      <Typography className="font-medium">
        Showing 9 to 50 of {totalRow} entries
      </Typography>
    </CardFooter>
  );
};

export default Pagination;
