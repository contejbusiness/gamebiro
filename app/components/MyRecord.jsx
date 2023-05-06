import React from "react";

const MyRecord = () => {
  const data = [
    { period: 23123123, price: 30212, number: 1, result: "green" },
    { period: 41312435, price: 30213, number: 1, result: "red" },
    { period: 33123126, price: 30215, number: 1, result: "both" },
    { period: 42123134, price: 30213, number: 1, result: "green" },
    { period: 12123154, price: 30215, number: 1, result: "red" },
    { period: 43123123, price: 30216, number: 1, result: "both" },
    { period: 54123123, price: 30217, number: 1, result: "red" },
    { period: 64123123, price: 30218, number: 1, result: "green" },
    { period: 26123123, price: 30212, number: 1, result: "both" },
    { period: 23123123, price: 30212, number: 1, result: "green" },
  ];

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Period
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Number
            </th>
            <th scope="col" className="px-6 py-3">
              Result
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.period}
              </th>
              <td className="px-6 py-4">{item.price}</td>
              <td className="px-6 py-4">{item.number}</td>
              <td className="px-6 py-4">{item.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyRecord;
