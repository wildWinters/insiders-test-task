"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/store/use-auth-store";
import { auth } from "@/shared/lib/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  User,
} from "firebase/auth";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  RegisterFormValues,
} from "../schema/register-schema";

export function useRegister() {
  const router = useRouter();
  const { setToken } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const registerUser = async (values: RegisterFormValues) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user: User = userCredential.user;

      await updateProfile(user, { displayName: values.name });


      await sendEmailVerification(user, { url: "http://localhost:3000/login" });

      const token = await user.getIdToken();
      setToken(token);

      alert(
        `Реєстрація успішна ✅\nЛист для підтвердження надіслано на вашу пошту: ${values.email}.\nПеревірте папку "Спам", якщо не отримали лист.\nПісля підтвердження email зможете увійти.`
      );

      reset(); 
      router.push("/login");
    } catch (error: any) {
      console.error(error);
      alert("Не вдалося зареєструватися: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    registerUser,
    loading,
    reset,
  };
}
