"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import * as yup from "yup";
import { AutoSizer, List } from "react-virtualized";
import { useTheme } from "next-themes";

interface Superhero {
  name: string;
  superpower: string;
  humilityScore: number;
}

const superheroSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  superpower: yup.string().required("Superpower is required"),
  humilityScore: yup
    .number()
    .required("Humility Score is required")
    .min(1, "Must be at least 1")
    .max(10, "Must be at most 10"),
});

export default function Home() {
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Superhero>({
    resolver: yupResolver(superheroSchema),
  });
  const { theme, setTheme } = useTheme();

  const onSubmit = (data: Superhero) => {
    setSuperheroes((prev) => [...prev, data]);
    reset();
  };

  const rowRenderer = ({ index, key, style }: any) => (
    <motion.div
      key={key}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-3 border-b border-neutral-300 dark:border-neutral-700"
    >
      <h3 className="text-lg font-semibold text-teal-600 dark:text-teal-400">
        {superheroes[index].name}
      </h3>
      <p className="text-slate-500 dark:text-slate-400">
        {superheroes[index].superpower}
      </p>
      <p className="text-neutral-600 dark:text-neutral-400">
        Humility: {superheroes[index].humilityScore}
      </p>
    </motion.div>
  );

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
          className="w-full p-3 bg-teal-600 text-white rounded-md hover:bg-teal-700"
        >
          Add Superhero
        </button>

        <button
          type="button"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="w-full mt-4 p-3 bg-neutral-700 text-white rounded-md hover:bg-neutral-800 dark:bg-neutral-200 dark:text-neutral-900 dark:hover:bg-neutral-300"
        >
          Toggle Theme
        </button>
      </motion.form>

      {/* Right Column: Superhero List */}
      <div className="flex-1 bg-neutral-100 dark:bg-neutral-800 rounded-md shadow-md p-5 overflow-auto h-[50vh] md:h-auto">
        {superheroes.length > 0 ? (
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
                  rowHeight={80}
                  rowRenderer={rowRenderer}
                />
              )}
            </AutoSizer>
          </motion.div>
        ) : (
          <div className="h-full flex items-center justify-center text-center text-neutral-500 dark:text-neutral-400">
            <p>No superheroes added yet!</p>
            <p>Add some to see the list here.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
