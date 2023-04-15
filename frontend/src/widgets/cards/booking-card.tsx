import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import moment from "moment";
import { Props } from "react-apexcharts";
import { NavLink } from "react-router-dom";

export function BookingCard({ booking, index }: Props) {
  return (
    <Card key={index} className="md:w-full">
      <CardHeader
        color="blue"
        className="relative h-16 flex justify-center items-center"
      >
        <Typography variant="h4" color="white" className="text-center">
          {booking?.room?.name}
        </Typography>
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h5" className="mb-2">
          {moment(booking?.check_in).format("YYYY-MM-DD HH:mm")}
        </Typography>
        <Typography variant="h6">{booking?.client?.name}</Typography>
      </CardBody>
      <CardFooter divider className="flex items-center justify-between py-3">
        <NavLink to={`/dashboard/booking/edit/${booking.id}/`}>
          <Button color="gray">Update</Button>
        </NavLink>
        <NavLink to={`/dashboard/checkout/${booking.id}/`}>
          <Button>Check out</Button>
        </NavLink>
      </CardFooter>
    </Card>
  );
}

export default BookingCard;
