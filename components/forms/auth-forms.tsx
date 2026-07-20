"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { loginSchema, registerSchema, type LoginFields, type RegisterFields } from "@/lib/validation/auth";
import { useAuthStore } from "@/stores/auth-store";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? <p id={id} className="mt-1 text-xs font-semibold text-destructive">{message}</p> : null;
}

function PasswordField({ id, label, inputProps, error }: { id: string; label: string; inputProps: UseFormRegisterReturn; error?: string }) {
  const [visible, setVisible] = useState(false);
  return <div className="space-y-2"><Label htmlFor={id}>{label}</Label><div className="relative"><Input id={id} type={visible ? "text" : "password"} autoComplete={id === "password" ? "current-password" : "new-password"} className="h-12 rounded-xl pr-12" aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} {...inputProps} /><Button type="button" variant="ghost" size="icon-sm" onClick={() => setVisible((value) => !value)} className="absolute right-1.5 top-1.5" aria-label={visible ? "Hide password" : "Show password"}>{visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</Button></div><FieldError id={`${id}-error`} message={error} /></div>;
}

function GoogleButton() {
  return <Button asChild variant="outline" size="lg" className="w-full"><a href={`${process.env.NEXT_PUBLIC_API_BASE_URL ?? ""}/api/v1/auth/google/auth`}><svg className="mr-2 size-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84Z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" fill="#EA4335"/></svg>Continue with Google</a></Button>;
}

function FormDivider({ children }: { children: React.ReactNode }) {
  return <div className="my-6 flex items-center gap-3"><Separator className="flex-1" /><span className="text-xs font-bold text-ink-muted">{children}</span><Separator className="flex-1" /></div>;
}

export function LoginForm() {
  const [error, setError] = useState("");
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFields>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFields) => {
    setError("");
    try {
      await login(data.email, data.password);
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Sign in failed. Please try again.");
    }
  };

  return <>
    <div>
      <p className="text-xs font-black uppercase tracking-[.18em] text-ink-muted">Welcome back</p>
      <h1 className="mt-2 text-3xl font-black text-brand">Sign in to your account</h1>
      <p className="mt-3 text-sm leading-6 text-ink-muted">Review orders, addresses and account settings.</p>
    </div>
    <div className="mt-7"><GoogleButton /></div>
    <FormDivider>or use email</FormDivider>
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="login-email">Email address</Label>
        <Input id="login-email" type="email" autoComplete="email" className="h-12 rounded-xl" aria-invalid={!!errors.email} {...register("email")} />
        <FieldError id="login-email-error" message={errors.email?.message} />
      </div>
      <PasswordField id="password" label="Password" inputProps={register("password")} error={errors.password?.message} />
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-h-11 items-center gap-2">
          <Checkbox id="remember-login" />
          <Label htmlFor="remember-login" className="text-ink-muted">Remember me</Label>
        </div>
        <Link href="/account/security" className="text-sm font-bold text-brand hover:underline">Forgot password?</Link>
      </div>
      {error && <p className="text-center text-xs font-bold text-destructive" role="alert">{error}</p>}
      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting && <Loader2 className="size-4 animate-spin" />}Sign in
      </Button>
    </form>
    <p className="mt-5 text-center text-sm text-ink-muted">New to K &amp; LL? <Link href="/register" className="font-black text-brand hover:underline">Create an account</Link></p>
  </>;
}

export function RegisterForm() {
  const [error, setError] = useState("");
  const router = useRouter();
  const registerUser = useAuthStore((state) => state.register);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFields>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterFields) => {
    setError("");
    try {
      await registerUser({
        full_name: data.name,
        email: data.email,
        password: data.password,
      });
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  return <>
    <div>
      <p className="text-xs font-black uppercase tracking-[.18em] text-ink-muted">Create your account</p>
      <h1 className="mt-2 text-3xl font-black text-brand">A simpler way to shop</h1>
      <p className="mt-3 text-sm leading-6 text-ink-muted">Keep orders and delivery details together.</p>
    </div>
    <div className="mt-7"><GoogleButton /></div>
    <FormDivider>or register with email</FormDivider>
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="register-name">Full name</Label>
        <Input id="register-name" className="h-12 rounded-xl" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} />
        <FieldError id="register-name-error" message={errors.name?.message} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="register-email">Email address</Label>
        <Input id="register-email" type="email" className="h-12 rounded-xl" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
        <FieldError id="register-email-error" message={errors.email?.message} />
      </div>
      <PasswordField id="password" label="Password" inputProps={register("password")} error={errors.password?.message} />
      <PasswordField id="confirmPassword" label="Confirm password" inputProps={register("confirmPassword")} error={errors.confirmPassword?.message} />
      <div className="flex items-start gap-2">
        <Checkbox id="register-terms" required className="mt-1" />
        <Label htmlFor="register-terms" className="text-xs leading-5 text-ink-muted">I agree to the <Link href="/terms" className="font-bold text-brand hover:underline">terms</Link> and <Link href="/privacy" className="font-bold text-brand hover:underline">privacy policy</Link>.</Label>
      </div>
      {error && <p className="text-center text-xs font-bold text-destructive" role="alert">{error}</p>}
      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting && <Loader2 className="size-4 animate-spin" />}Create account
      </Button>
    </form>
    <p className="mt-5 text-center text-sm text-ink-muted">Already registered? <Link href="/login" className="font-black text-brand hover:underline">Sign in</Link></p>
  </>;
}
