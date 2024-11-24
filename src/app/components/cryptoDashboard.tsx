"use client";

import { useState, useEffect } from "react";
import axios from "axios";


interface Coin {
  id: string;
  name: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

const CryptoDashboard = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCoinsRates = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`,
          {
            headers: {
              Authorization: `Bearer v2VnuaTz6KuLxnPKM3xLNFlTP3dkHQRt`,
            },
          }
        );
        setCoins(response.data);
      } catch (error) {
        console.error("error fetching coin data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoinsRates();
  }, []);
  if (loading) {
    return (
      <div className="text-ecnter text-xl text-red-800">Loading Data.... </div>
    );
  }
  return (
    <div className="max-w-7 mx-auto p-4">
      <h1 className="text-4xl font-semibold text-center text-black mb-8">
        Crypto Currency Deshboard
      </h1>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {coins.map((coins) => (
          <div
            key={coins.id}
            className="bg-white p-6 rounded-lg shadow-xl transform transi-300 hover:scale-105 hover:shadow-2xl"
          >
            <h2 className="text-xl font-bold text-center text-red-600 mb-4 uppercase">
              {coins.name}
            </h2>
            <div className="mb-4">
              <p className="text-lg text-blue-600"> Price (USD):</p>
              <p> ${coins.current_price.toFixed(2)}</p>
            </div>
            <div className="mb-4">
              <p className="text-lg text-slate-600">Market Cap:</p>
              <p className="text-xl font-bold text-slate-800"></p>
            </div>
            <div>
              <p className="text-lg text-blue-600 ">24h Change: </p>
              <p
                className={`text-xl font-semiold ${
                  coins.price_change_percentage_24h < 0
                    ? "text-red-500"
                    : "text-gray-500"
                } `}
              >
                {coins.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoDashboard;
