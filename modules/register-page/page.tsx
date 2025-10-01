"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { useAuthStore } from "@/shared/store/use-auth-store";
import { TextField } from "@/shared/ui/text-field";
import { Button } from "@/shared/shad-cn/button";

const registerSchema = z.object({
  name: z.string().min(2, "Мінімум 2 символи"),
  email: z.string().email("Некоректний email"),
  password: z.string().min(6, "Мінімум 6 символів"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const router = useRouter(); 
  const { setToken } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Помилка реєстрації");

      const data = await res.json();
      setToken(data.token);
      alert("Реєстрація успішна ✅");

      
      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("Не вдалося зареєструватися");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Реєстрація</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <TextField
            label="Ім’я"
            type="text"
            placeholder="Введіть ваше ім’я"
            error={errors.name}
            {...register("name")}
          />

          <TextField
            label="Email"
            type="email"
            placeholder="your@email.com"
            error={errors.email}
            {...register("email")}
          />

          <TextField
            label="Пароль"
            type="password"
            placeholder="********"
            error={errors.password}
            {...register("password")}
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 text-white py-2 font-medium hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Реєстрація..." : "Зареєструватися"}
          </Button>
        </form>
      </div>
    </div>
  );
}
