import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
  Select,
  Option,
  CardHeader,
  CardFooter,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { getData } from "../../../services";
import Pagination from "../../../widgets/layout/panigation";

export function BookingList() {
  const [isVisibleSearch, setVisibleSearch] = useState(false);
  const [listBooking, setListBooking] = useState([]);
  const totalRow: number = listBooking.length;
  const [page, setPage] = useState(1);
  const bookingNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLInputElement>(null);

  function handlePageChange(newPage: number) {
    setPage(newPage);
  }
  const handleVisibleSearch = () => {
    setVisibleSearch(!isVisibleSearch);
  };

  const handleSearch = () => {
    const full_name =
      bookingNameRef.current?.querySelector("input")?.value || "";
    const email = emailRef.current?.querySelector("input")?.value || "";
    const role = roleRef.current?.querySelector("input")?.value || "0";
    const status = statusRef.current?.querySelector("input")?.value || "0";
  };

  const handleClearSearch = async () => {
    bookingNameRef.current?.onreset;
    emailRef.current?.onreset;
    roleRef.current?.querySelector("input")?.onreset;
    statusRef.current?.querySelector("input")?.onreset;
  };

  useEffect(() => {
    async function fetchGetlistBooking() {
      try {
        const listBooking = await getData("booking");
        setListBooking(listBooking);
      } catch (error) {
        // Handle errors
      }
    }

    fetchGetlistBooking();
  }, []);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <Typography variant="h4" className="font-medium capitalize">
          Booking
        </Typography>
        <NavLink to="/dashboard/booking/create">
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
        <div className="h-60 bg-white rounded-lg p-6 flex flex-col justify-between">
          <div className="flex flex-row items-center gap-1">
            <XMarkIcon
              strokeWidth={3}
              className="h-4 w-4 text-black-500 cursor-pointer"
              onClick={handleVisibleSearch}
            />
            <Typography className="font-medium capitalize">
              Handle search
            </Typography>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col gap-2">
              <Typography className="font-small capitalize">Name</Typography>
              <Input ref={bookingNameRef} />
            </div>
            <div className="flex flex-col gap-2">
              <Typography className="font-small capitalize">Email</Typography>
              <Input ref={emailRef} />
            </div>
            <div className="flex flex-col gap-2">
              <Typography className="font-small capitalize">Role</Typography>
              <Select ref={roleRef}>
                <Option>0</Option>
                <Option>1</Option>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Typography className="font-small capitalize">Status</Typography>
              <Select ref={statusRef}>
                <Option>0</Option>
                <Option>1</Option>
              </Select>
            </div>
          </div>
          <div className="w-full flex flex-row justify-between">
            <Button onClick={handleSearch}>Search</Button>
            <Button onClick={handleClearSearch} className=" bg-blue-gray-700">
              Cancel
            </Button>
          </div>
        </div>
      )}
      <div className=" mt-10 w-full h-full grid gap-16 grid-cols-4">
        {listBooking.map((booking) => {
          return (
            <Card key={1} className="w-96">
              <CardHeader
                color="blue"
                className="relative h-16 flex justify-center items-center"
              >
                <Typography variant="h4" color="black" className="text-center">
                  Room 3
                </Typography>
              </CardHeader>
              <CardBody className="text-center">
                <Typography variant="h5" className="mb-2">
                  Update
                </Typography>
                <Typography>
                  The place is close to Barceloneta Beach and bus stop just 2
                  min by walk and near to where you can enjoy the main night
                  life in Barcelona.
                </Typography>
              </CardBody>
              <CardFooter
                divider
                className="flex items-center justify-between py-3"
              >
                <Button color="gray">
                  <NavLink to="/dashboard/booking/edit">Update</NavLink>
                </Button>
                <Button className="flex gap-1">Check out</Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default BookingList;
