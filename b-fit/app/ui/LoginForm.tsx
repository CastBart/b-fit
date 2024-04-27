'use client'
import React, { FC, ReactNode } from "react";
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';

export default function LoginForm(): React.ReactNode {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch} className="space-y-4">
      <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-1"
          htmlFor="username"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-1"
          htmlFor="password"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
      >
        Log In
      </button>
    </form>
  );
}
