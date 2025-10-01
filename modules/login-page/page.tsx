"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useAuthStore } from "@/shared/store/use-auth-store";
import { TextField } from "@/shared/ui/text-field";
import { Button } from "@/shared/shad-cn/button";
import { auth } from "@/shared/lib/firebase";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const loginSchema = z.object({
  email: z.string().email("Некоректний email"),
  password: z.string().min(6, "Мінімум 6 символів"),
});


type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const { setToken } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const user = userCredential.user;

      if (!user.emailVerified) {
        await sendEmailVerification(user);
        alert("Ваш email ще не підтверджений. Лист надіслано.");
        return;
      }


      const token = await user.getIdToken();
      setToken(token);

      alert("Вхід успішний ✅");
    } catch (error: any) {
      console.error(error);
      alert("Помилка авторизації: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Вхід</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
            {loading ? "Вхід..." : "Увійти"}
          </Button>
        </form>
      </div>
    </div>
  );
}
