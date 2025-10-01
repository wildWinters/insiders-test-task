"use client";

import { TextField } from "@/shared/ui/text-field";
import { Button } from "@/shared/shad-cn/button";
import { mockFormFields } from "../mock/mock-form-fields";
import { useRegister } from "../hooks/use-register";

export function FormWrapper() {
  const { register, handleSubmit, errors, registerUser, loading } =
    useRegister();

  return (
    <form onSubmit={handleSubmit(registerUser)} className="space-y-5">
      {mockFormFields.map((field) => (
        <TextField
          key={field.name}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          error={errors[field.name as keyof typeof errors]}
          {...register(field.name as keyof typeof register)}
        />
      ))}

      <Button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-indigo-600 text-white py-2 font-medium hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {loading ? "Реєстрація..." : "Зареєструватися"}
      </Button>
    </form>
  );
}
