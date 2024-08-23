"use client";
import { Locality, localityData } from "@/lib/localityData";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

const SearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Locality[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filteredSuggestions = localityData
        .filter((locality) =>
          locality.localityName.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 9); // Limit to 5 suggestions
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (locality: Locality) => {
    console.log("Selected locality name:", locality.localityName);
    console.log("Selected locality ID:", locality.localityId);
    setSearchTerm(locality.localityName);
    setShowSuggestions(false);
  };

  const handleClearInput = () => {
    setSearchTerm("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative" ref={searchRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Image src={"search.svg"} width={20} height={20} alt="search" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for a locality"
          className="w-full pl-10 pr-20 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          {searchTerm && (
            <button onClick={handleClearInput} className="p-2">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
          <div className="h-6 w-px bg-gray-300 mx-2"></div>
          <button className="p-2 pr-4">
            <Image src={"googleMic.svg"} width={12} height={12} alt="search" />
          </button>
        </div>
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute w-full bg-white mt-1 border border-gray-300 rounded-md shadow-lg">
          {suggestions.map((locality) => (
            <li
              key={locality.localityId}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex gap-3 items-center"
            >
              <Image src={"search.svg"} width={20} height={20} alt="search" />
              <Link href={`/weather/${locality.localityId}`}>
                {locality.localityName}, {locality.cityName}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;
