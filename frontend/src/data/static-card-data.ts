import {
  BanknotesIcon,
  UserPlusIcon,
  ChartBarIcon,
  UserMinusIcon,
} from "@heroicons/react/24/solid";
import { getData } from "../services";
// const getCount = async () => {
//   const response = await getData("booking/count");
//   const sum = response.sum;
//   return sum;
// };

// const totalMoney = await getCount();

// const getCountCheckIn = async () => {
//   const response = await getData("booking/check_in");
//   return response.count;
// };

// const countCheckIn = await getCountCheckIn();
// const getCountCheckOut = async () => {
//   const response = await getData("booking/check_out");
//   return response.count;
// };

// const countCheckOut = await getCountCheckOut();
// const formattedTotalMoney = totalMoney.toLocaleString("en-US", {
//   style: "currency",
//   currency: "USD",
// });
// const formattedTotalMoneyWithoutDecimal = formattedTotalMoney.replace(
//   /\.00$/,
//   ""
// );

export const statisticsCardsData = [
  {
    color: "blue",
    icon: BanknotesIcon,
    title: "Total Money",
    value: `${1}`,
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
    value: `${2}`,
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
    value: `${3}`,
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
