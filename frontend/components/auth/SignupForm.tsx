"use client";

import { useState } from "react";
import { FormData, FormErrors, validateForm, validateField } from "./validations";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import Link from "next/link";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    togglePassword,
    showPasswordValue,
  }: {
    id: string;
    label: string;
    name: string;
    type?: string;
    placeholder: string;
    value: string;
    error?: string;
    showError: boolean;
    togglePassword?: () => void;
    showPasswordValue?: boolean;
  }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type === "password" && showPasswordValue ? "text" : type}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
            showError && error
              ? "border-red-500 bg-red-50"
              : "border-gray-300 bg-white"
          }`}
        />
        {type === "password" && togglePassword && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 text-sm"
          >
            {showPasswordValue ? "👁️" : "👁️‍🗨️"}
          </button>
        )}
      </div>
      {showError && error && (
        <p className="mt-1.5 text-sm text-red-600">{error}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="text-gray-600 text-sm mt-2">
              Join us to get started with Intelligent Notes Summarizer
            </p>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm font-medium">
                ✓ Account created successfully! Redirecting to login...
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Full Name */}
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

            {/* Email */}
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

            {/* Password */}
            <div>
              <FormInput
                id="password"
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                error={errors.password}
                showError={touched.password}
                togglePassword={() => setShowPassword(!showPassword)}
                showPasswordValue={showPassword}
              />
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-3">
                  <PasswordStrengthIndicator password={formData.password} />
                  
                  {/* Password Requirements */}
                  <div className="mt-3 space-y-1.5 text-xs">
                    <div className={`flex items-center ${formData.password.length >= 8 ? "text-green-600" : "text-gray-600"}`}>
                      <span className="mr-2">{formData.password.length >= 8 ? "✓" : "○"}</span>
                      At least 8 characters
                    </div>
                    <div className={`flex items-center ${/[a-z]/.test(formData.password) ? "text-green-600" : "text-gray-600"}`}>
                      <span className="mr-2">{/[a-z]/.test(formData.password) ? "✓" : "○"}</span>
                      One lowercase letter
                    </div>
                    <div className={`flex items-center ${/[A-Z]/.test(formData.password) ? "text-green-600" : "text-gray-600"}`}>
                      <span className="mr-2">{/[A-Z]/.test(formData.password) ? "✓" : "○"}</span>
                      One uppercase letter
                    </div>
                    <div className={`flex items-center ${/\d/.test(formData.password) ? "text-green-600" : "text-gray-600"}`}>
                      <span className="mr-2">{/\d/.test(formData.password) ? "✓" : "○"}</span>
                      One number
                    </div>
                    <div className={`flex items-center ${/[@$!%*?&]/.test(formData.password) ? "text-green-600" : "text-gray-600"}`}>
                      <span className="mr-2">{/[@$!%*?&]/.test(formData.password) ? "✓" : "○"}</span>
                      One special character (@$!%*?&)
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <FormInput
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              error={errors.confirmPassword}
              showError={touched.confirmPassword}
              togglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              showPasswordValue={showConfirmPassword}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed mt-6"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-gray-600 text-sm mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
              Sign in
            </Link>
          </p>

          {/* Trust Indicators */}
          <div className="mt-6 pt-6 border-t border-gray-200 space-y-2 text-center text-xs text-gray-600">
            <p>🔒 Your data is secure and encrypted</p>
            <p>✓ No credit card required</p>
          </div>
        </div>
      </div>
    </div>
  );
}
