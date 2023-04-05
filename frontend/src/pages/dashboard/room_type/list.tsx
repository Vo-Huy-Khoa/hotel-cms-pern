import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { handleApiGetList, handleApiSearch } from "../../../services";
import Pagination from "../../../widgets/layout/panigation";
import moment from "moment";

export function RoomTypeList() {
  const [isVisibleSearch, setVisibleSearch] = useState(false);
  const [listRoomType, setListRoomType] = useState([]);
  const totalRow: number = listRoomType.length;
  const [page, setPage] = useState(1);

  const nameRef = useRef<HTMLInputElement>(null);
  const countRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  function handlePageChange(newPage: number) {
    setPage(newPage);
  }
  const handleVisibleSearch = () => {
    setVisibleSearch(!isVisibleSearch);
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = Object.fromEntries(formData.entries());
    const response = await handleApiSearch("room_type/search", body);
    setListRoomType(response);
  };

  const handleClearSearch = async () => {
    if (nameRef.current && countRef.current && priceRef.current) {
      const nameInput = nameRef.current?.querySelector("input");
      const emailInput = countRef.current?.querySelector("input");
      const priceInput = priceRef.current?.querySelector("input");

      if (nameInput && emailInput && priceInput) {
        nameInput.value = "";
        emailInput.value = "";
        priceInput.value = "";
      }
    }

    const listRoomType = await handleApiGetList("user");
    setListRoomType(listRoomType);
  };

  useEffect(() => {
    async function fetchGetRoomType() {
      try {
        const listRoomType = await handleApiGetList("room_type");
        setListRoomType(listRoomType);
      } catch (error) {
        // Handle errors
      }
    }

    fetchGetRoomType();
  }, []);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <Typography variant="h4" className="font-medium capitalize">
          Room Type
        </Typography>
        <NavLink to="/dashboard/room-type/create">
          <Button className="w-24">Create</Button>
        </NavLink>
      </div>
      <div
        className="flex flex-row items-center gap-1 cursor-pointer w-20"
        onClick={handleVisibleSearch}
      >
        <MagnifyingGlassIcon
          strokeWidth={3}
          className="h-4 w-4 text-black-500 cursor-pointer"
        />
        <Typography className="font-medium capitalize">Search</Typography>
      </div>
      {isVisibleSearch && (
        <div className="bg-white rounded-lg p-6 flex flex-col justify-between gap-6">
          <div className="flex flex-row items-center gap-1">
            <XMarkIcon
              strokeWidth={3}
              className="h-4 w-4 text-black-500 cursor-pointer"
              onClick={handleVisibleSearch}
            />
            <Typography className="font-medium capitalize">
              Search Box
            </Typography>
          </div>
          <form onSubmit={handleSearch} className="flex flex-col gap-4">
            <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-4">
              <div className="flex flex-col gap-2">
                <Typography className="font-small capitalize">Name</Typography>
                <Input name="name" ref={nameRef} label="Name" />
              </div>
              <div className="flex flex-col gap-2">
                <Typography className="font-small capitalize">Count</Typography>
                <Input name="count" ref={countRef} label="Limit" />
              </div>
              <div className="flex flex-col gap-2">
                <Typography className="font-small capitalize">Price</Typography>
                <Input name="price" ref={priceRef} label="Price" />
              </div>
              {/* <div className="flex flex-col gap-2">
                <Typography className="font-small capitalize">
                  Status
                </Typography>
                <Select ref={statusRef}>
                  <Option>0</Option>
                  <Option>1</Option>
                </Select>
              </div> */}
            </div>
            <div className="w-full flex flex-row justify-between">
              <Button type="submit">Search</Button>
              <Button onClick={handleClearSearch} className=" bg-blue-gray-700">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
      <Card>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "id",
                  "name",
                  "count",
                  "price",
                  "date create",
                  "date update",
                ].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {listRoomType
                .slice(page * 10 - 10, page * 10)
                .map(
                  ({ id, name, count, price, created_at, updated_at }, key) => {
                    const className = "py-3 px-5 border-b border-blue-gray-50";
                    return (
                      <tr key={key}>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {id}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            <NavLink to={`/dashboard/room-type/edit/${id}/`}>
                              {name}
                            </NavLink>
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {count}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {price}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {moment(created_at).format("YYYY-MM-DD")}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {moment(updated_at).format("YYYY-MM-DD")}
                          </Typography>
                        </td>
                      </tr>
                    );
                  }
                )}
            </tbody>
          </table>
        </CardBody>
        <Pagination
          page={page}
          totalRow={totalRow}
          onPageChange={handlePageChange}
        />
      </Card>
    </div>
  );
}

export default RoomTypeList;
