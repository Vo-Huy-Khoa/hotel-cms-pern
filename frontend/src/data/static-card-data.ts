/* eslint-disable react-hooks/rules-of-hooks */
import {
  BanknotesIcon,
  UserPlusIcon,
  ChartBarIcon,
  UserMinusIcon,
} from "@heroicons/react/24/solid";
import { handleApiGetList } from "../services";

export const statisticsCardsData = [
  {
    color: "blue",
    icon: BanknotesIcon,
    title: "Total Money",
    value: "Loading...",
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
    value: "Loading...",
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
    value: "Loading...",
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
    value: "Loading...",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday",
    },
  },
];

// const updateStatisticsData = async () => {
//   // Create an async function to call the API and update statisticsCardsData
//   const token = sessionStorage.getItem("token");

//   if (token) {
//     try {
//       const response1 = await handleApiGetList("booking/count");
//       const sum = response1.sum;
//       const formattedTotalMoney = sum.toLocaleString("en-US", {
//         style: "currency",
//         currency: "USD",
//       });
//       const totalPrice = formattedTotalMoney.replace(/\.00$/, "");
//       statisticsCardsData[0].value = totalPrice;

//       const response2 = await handleApiGetList("booking/check_in");
//       statisticsCardsData[1].value = response2.count;

//       const response3 = await handleApiGetList("booking/check_out");
//       statisticsCardsData[2].value = response3.count;
//     } catch (error) {
//       console.error(error);
//     }
//   }
// };

// Call the function immediately to update statisticsCardsData
// updateStatisticsData();

export default statisticsCardsData;
