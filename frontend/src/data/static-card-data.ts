/* eslint-disable react-hooks/rules-of-hooks */
import {
  BanknotesIcon,
  UserPlusIcon,
  ChartBarIcon,
  UserMinusIcon,
} from "@heroicons/react/24/solid";
import { getData } from "../services";

const token = sessionStorage.getItem("token");
let totalPrice = 1;
let countCheckIn = 1;
let countCheckOut = 1;

if (token) {
  const getCount = async () => {
    const response = await getData("booking/count");
    const sum = response.sum;
    return sum;
  };

  const totalMoney = await getCount();
  const formattedTotalMoney = totalMoney.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  totalPrice = formattedTotalMoney.replace(/\.00$/, "");

  const getCountCheckIn = async () => {
    const response = await getData("booking/check_in");
    return response.count;
  };

  countCheckIn = await getCountCheckIn();
  const getCountCheckOut = async () => {
    const response = await getData("booking/check_out");
    return response.count;
  };

  countCheckOut = await getCountCheckOut();
}

export const statisticsCardsData = [
  {
    color: "blue",
    icon: BanknotesIcon,
    title: "Total Money",
    value: `${totalPrice}`,
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last week",
    },
  },
  {
    color: "green",
    icon: UserPlusIcon,
    title: "Check In",
    value: `${countCheckIn}`,
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },
  {
    color: "red",
    icon: UserMinusIcon,
    title: "Check Out",
    value: `${countCheckOut}`,
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },
  {
    color: "orange",
    icon: ChartBarIcon,
    title: "Sales",
    value: `${4}`,
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday",
    },
  },
];

export default statisticsCardsData;
