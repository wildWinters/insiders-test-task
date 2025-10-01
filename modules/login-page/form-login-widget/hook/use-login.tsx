"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { auth } from "@/shared/lib/firebase";
import { useAuthStore } from "@/shared/store/use-auth-store";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import {
  loginSchema,
  LoginFormValues,
} from "../schema/login-schema";


export function useLogin() {
  const { setToken, setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.emailVerified) {
        const token = await user.getIdToken();
        setToken(token);
        setUser({ uid: user.uid, email: user.email, name: user.displayName });
      } else {
        setToken(null);
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [setToken, setUser]);


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
        await sendEmailVerification(user, {
          url: "http://localhost:3000/me/books",
        });
        alert(
          `Ваш email ще не підтверджений. Лист для підтвердження надіслано повторно на ${user.email}.`
        );
        setLoading(false);
        return;
      }

      const token = await user.getIdToken();
      setToken(token);
      setUser({ uid: user.uid, email: user.email, name: user.displayName });

      alert("Вхід успішний ✅");
      router.push("/me/books");
    } catch (error: any) {
      console.error(error);
      alert("Помилка авторизації: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    loading,
  };
}
