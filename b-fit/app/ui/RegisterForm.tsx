"use client";
import React, { FC, ReactNode, useState } from "react";
import { registerUser } from "../lib/actions/create-user";
import { useFormState } from "react-dom";

export default function RegisterForm(): React.ReactNode { 
  const initialFormState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(registerUser, initialFormState);

  return (
    <form className="mt-8 space-y-6" action={dispatch}>
      <div className="rounded-md shadow-sm space-y-4">
        <div>
          <label htmlFor="fullName" className="sr-only">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Full Name"
            aria-describedby="fullName-error"
          />
          <div id="fullName-error" aria-live="polite" aria-atomic="true">
            {state.errors?.fullName &&
              state.errors.fullName.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
            aria-describedby="email-error"
          />
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            aria-describedby="password-error"
          />
          <div id="password-error" aria-live="polite" aria-atomic="true">
            {state.errors?.password &&
              state.errors.password.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div>
          <label htmlFor="confirmPassword" className="sr-only">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Confirm Password"
            aria-describedby="confirmPassword-error"
          />
          <div id="confirmPassword-error" aria-live="polite" aria-atomic="true">
            {state.errors?.confirmPassword &&
              state.errors.confirmPassword.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      {/*error && <p className="text-red-500 text-sm">{error}</p>*/}
      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            {/* Heroicon name: lock-closed */}
            <svg
              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M2 5a3 3 0 013-3h10a3 3 0 013 3v9a3 3 0 01-3 3H5a3 3 0 01-3-3V5zm3-2a1 1 0 00-1 1v9a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1H5z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M4 10a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zm4-4a1 1 0 00-2 0v2a1 1 0 102 0V6zm6 0a1 1 0 10-2 0v2a1 1 0 102 0V6z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          Create an account
        </button>
      </div>
    </form>
  );
}
