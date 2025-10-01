import { TextField } from "@/shared/ui/text-field";
import { Button } from "@/shared/shad-cn/button";
import { mockAuthFormFields } from "../mock/mock-auth";
import { useLogin } from "../hook/use-login";

export function FormLogin() {
  const { register, handleSubmit, onSubmit, errors, loading } = useLogin();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {mockAuthFormFields.map((field) => (
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
        {loading ? "Вхід..." : "Увійти"}
      </Button>
    </form>
  );
}
