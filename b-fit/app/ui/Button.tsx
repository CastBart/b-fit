import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export default function Button({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
  className = "",
}: ButtonProps) {
  // Base styles
  const baseStyles = `inline-flex items-center justify-center font-medium rounded transition duration-300 focus:outline-none focus:ring`;

  // Variant styles
  const variantStyles = {
    primary: `bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300`,
    secondary: `bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300`,
    danger: `bg-red-500 text-white hover:bg-red-600 focus:ring-red-300`,
  };

  // Size styles
  const sizeStyles = {
    small: `px-3 py-1 text-sm`,
    medium: `px-4 py-2 text-base`,
    large: `px-6 py-3 text-lg`,
  };

  // Combine styles
  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  return (
    <button
      className={styles}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
