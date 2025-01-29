"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { AutoSizer, List } from "react-virtualized";
import { useTheme } from "next-themes";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import SkeletonSuperhero from "@/components/skeleton";

// Define Yup validation schema
const superheroSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  superpower: yup.string().required("Superpower is required"),
  humilityScore: yup
    .number()
    .typeError("Must be a number")
    .required("Humility Score is required")
    .min(1, "Must be at least 1")
    .max(10, "Cannot be more than 10"),
});

// Superhero Interface (Updated)
interface Superhero {
  name: string;
  superpower: string;
  humilityScore: number;
}

// API Response Interface
interface SuperheroResponse {
  data: Superhero[];
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "dsc">("asc");
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [addError, setAddError] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Superhero>({
    resolver: yupResolver(superheroSchema),
  });

  const fetchSuperheroes = async (order: "asc" | "dsc") => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const response = await axios.get<SuperheroResponse>(
        `http://localhost:5000/superheroes?order=${order}`
      );
      setSuperheroes(response.data.data);
    } catch (error: any) {
      console.error("Failed to fetch superheroes:", error);
      setFetchError(
        error.response?.data?.message || "Failed to fetch superheroes."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    const orderParam = searchParams.get("order");
    if (orderParam === "asc" || orderParam === "dsc") {
      setSortOrder(orderParam);
      fetchSuperheroes(orderParam);
    } else {
      setSortOrder("asc");
      fetchSuperheroes("asc");
    }
  }, []);

  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("order", sortOrder);
    router.replace(`?${currentParams.toString()}`);
    fetchSuperheroes(sortOrder);
  }, [sortOrder]);

  const onSubmit = async (data: Superhero) => {
    setAddError(null);
    try {
      const response = await axios.post(
        "http://localhost:5000/superheroes",
        data
      );

      if (response.status === 201) {
        fetchSuperheroes(sortOrder);
        reset();
      } else {
        console.error("Failed to add superhero:", response.data.message);
        setAddError(response.data.message || "Failed to add superhero.");
      }
    } catch (error: any) {
      console.error("Error adding superhero:", error);
      setAddError(error.response?.data?.message || "Error adding superhero.");
    }
  };

  if (!mounted) return null;

  const rowRenderer = ({ index, key, style }: any) => (
    <motion.div
      key={key}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-3 border-b border-neutral-300 dark:border-neutral-700 h-24"
    >
      <h3 className="text-lg font-semibold text-teal-600 dark:text-teal-400">
        Name: {superheroes[index].name}
      </h3>
      <p className="text-slate-500 dark:text-slate-400">
        Super Power: {superheroes[index].superpower}
      </p>
      <p className="text-neutral-600 dark:text-neutral-400">
        Humility: {superheroes[index].humilityScore}
      </p>
    </motion.div>
  );

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "dsc" : "asc"));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 flex flex-col md:flex-row gap-8 p-4"
    >
      {/* Left Column: Form */}
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full md:w-96 p-5 bg-neutral-100 dark:bg-neutral-800 rounded-md shadow-md flex-none"
      >
        {/* Display addError if exists */}
        {addError && (
          <div className="mb-4 p-3 bg-rose-100 text-rose-700 rounded">
            {addError}
          </div>
        )}

        <div className="mb-5">
          <label className="block mb-2 text-teal-600 dark:text-teal-400">
            Name
          </label>
          <input
            {...register("name")}
            className="w-full p-3 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-teal-600"
            type="text"
            placeholder="Superhero Name"
          />
          {errors.name && (
            <p className="text-rose-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-teal-600 dark:text-teal-400">
            Superpower
          </label>
          <input
            {...register("superpower")}
            className="w-full p-3 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-teal-600"
            type="text"
            placeholder="Superpower"
          />
          {errors.superpower && (
            <p className="text-rose-500 text-sm mt-1">
              {errors.superpower.message}
            </p>
          )}
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-teal-600 dark:text-teal-400">
            Humility Score
          </label>
          <input
            {...register("humilityScore")}
            className="w-full p-3 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-teal-600"
            type="number"
            min="1"
            max="10"
            placeholder="1-10"
          />
          {errors.humilityScore && (
            <p className="text-rose-500 text-sm mt-1">
              {errors.humilityScore.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
        >
          Add Superhero
        </button>

        <button
          type="button"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="w-full mt-4 p-3 bg-neutral-700 text-white rounded-md hover:bg-neutral-800 dark:bg-neutral-200 dark:text-neutral-900 dark:hover:bg-neutral-300 transition-colors"
        >
          Toggle Theme
        </button>
      </motion.form>

      {/* Right Column: Superhero List */}
      <div className="flex-1 bg-neutral-100 dark:bg-neutral-800 rounded-md shadow-md p-5 flex flex-col">
        {/* Sorting Controls */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-teal-600 dark:text-teal-400">
            Superhero List
          </h2>
          <button
            onClick={toggleSortOrder}
            className="p-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            Sort: {sortOrder === "asc" ? "Ascending" : "Descending"}
          </button>
        </div>

        {/* Display fetchError if exists */}
        {fetchError && (
          <div className="mb-4 p-3 bg-rose-100 text-rose-700 rounded">
            {fetchError}
          </div>
        )}

        {/* Superhero List */}
        <div className="flex-1 p-5 overflow-auto">
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <SkeletonSuperhero key={index} />
              ))}
            </div>
          ) : superheroes.length > 0 ? (
            <motion.div
              style={{ height: "100%" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <AutoSizer>
                {({ height, width }) => (
                  <List
                    height={height}
                    width={width}
                    rowCount={superheroes.length}
                    rowHeight={100}
                    rowRenderer={rowRenderer}
                  />
                )}
              </AutoSizer>
            </motion.div>
          ) : (
            <>
              {!fetchError && (
                <div className="h-full flex flex-col gap-4 items-center justify-center text-center text-neutral-500 dark:text-neutral-400">
                  <p>No superheroes added yet!</p>
                  <p>Add some to see the list here.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
