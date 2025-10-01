"use client";
import { FormLogin } from "./form-login-widget/components/form-login";

export function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Вхід</h1>
        <FormLogin />
      </div>
    </div>
  );
}
