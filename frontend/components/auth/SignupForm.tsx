"use client";

import { useState } from "react";
import { FormData, FormErrors, validateForm, validateField } from "./validations";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

export default function SignupForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Real-time validation for touched fields
    if (touched[name]) {
      const error = validateField(name as keyof FormData, value, {
        ...formData,
        [name]: value,
      });
      setErrors((prev) => ({
        ...prev,
        [name]: error || undefined,
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name as keyof FormData, value, formData);
    setErrors((prev) => ({
      ...prev,
      [name]: error || undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);

    // Validate all fields
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (Object.keys(newErrors).length === 0) {
      try {
        // Submit to your API
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            password: formData.password,
          }),
        });

        if (response.ok) {
          setSubmitSuccess(true);
          setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          setTouched({});
          setErrors({});
          // Redirect or show success message
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        } else {
          const data = await response.json();
          setErrors((prev) => ({
            ...prev,
            email: data.message || "Registration failed. Please try again.",
          }));
        }
      } catch (error) {
        console.error("Registration error:", error);
        setErrors((prev) => ({
          ...prev,
          email: "An error occurred. Please try again.",
        }));
      }
    }

    setIsSubmitting(false);
  };

  const FormInput = ({
    id,
    label,
    name,
    type = "text",
    placeholder,
    value,
    error,
    showError,
  }: {
    id: string;
    label: string;
    name: string;
    type?: string;
    placeholder: string;
    value: string;
    error?: string;
    showError: boolean;
  }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
          showError && error
            ? "border-red-500 bg-red-50"
            : "border-gray-300"
        }`}
      />
      {showError && error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-600 text-sm mt-2">Join us to get started</p>
        </div>

        {submitSuccess && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-sm font-medium">
              ✓ Account created successfully! Redirecting to login...
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <FormInput
            id="name"
            label="Full Name"
            name="name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            error={errors.name}
            showError={touched.name}
          />

          <FormInput
            id="email"
            label="Email Address"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            error={errors.email}
            showError={touched.email}
          />

          <FormInput
            id="password"
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            error={errors.password}
            showError={touched.password}
          />
          <PasswordStrengthIndicator password={formData.password} />

          <FormInput
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            error={errors.confirmPassword}
            showError={touched.confirmPassword}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
