"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { loginSchema, registerSchema, type LoginFields, type RegisterFields } from "@/lib/validation/auth";
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
  return <Button asChild variant="outline" size="lg" className="w-full"><a href={`${process.env.NEXT_PUBLIC_API_BASE_URL ?? ""}/api/v1/auth/google/auth`}><span className="flex size-6 items-center justify-center rounded-full border border-border text-xs font-black">G</span>Continue with Google</a></Button>;
}

function FormDivider({ children }: { children: React.ReactNode }) {
  return <div className="my-6 flex items-center gap-3"><Separator className="flex-1" /><span className="text-xs font-bold text-ink-muted">{children}</span><Separator className="flex-1" /></div>;
}

export function LoginForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFields>({ resolver: zodResolver(loginSchema) });
  return <><div><p className="text-xs font-black uppercase tracking-[.18em] text-ink-muted">Welcome back</p><h1 className="mt-2 text-3xl font-black text-brand">Sign in to your account</h1><p className="mt-3 text-sm leading-6 text-ink-muted">Review orders, addresses and account settings.</p></div><div className="mt-7"><GoogleButton /></div><FormDivider>or use email</FormDivider><form className="space-y-4" onSubmit={handleSubmit(async () => { setStatus("loading"); await new Promise((resolve) => window.setTimeout(resolve, 500)); setStatus("success"); })}><div className="space-y-2"><Label htmlFor="login-email">Email address</Label><Input id="login-email" type="email" autoComplete="email" className="h-12 rounded-xl" aria-invalid={!!errors.email} {...register("email")} /><FieldError id="login-email-error" message={errors.email?.message} /></div><PasswordField id="password" label="Password" inputProps={register("password")} error={errors.password?.message} /><div className="flex items-center justify-between gap-4"><div className="flex min-h-11 items-center gap-2"><Checkbox id="remember-login" /><Label htmlFor="remember-login" className="text-ink-muted">Remember me</Label></div><Link href="/account/security" className="text-sm font-bold text-brand hover:underline">Forgot password?</Link></div><Button type="submit" size="lg" disabled={status === "loading"} className="w-full">{status === "loading" && <Loader2 className="size-4 animate-spin" />}Sign in</Button><p className="min-h-5 text-center text-xs font-bold text-emerald-700" aria-live="polite">{status === "success" ? "Mock sign-in validated. API connection is the next step." : ""}</p></form><p className="mt-5 text-center text-sm text-ink-muted">New to K &amp; LL? <Link href="/register" className="font-black text-brand hover:underline">Create an account</Link></p></>;
}

export function RegisterForm() {
  const [status, setStatus] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFields>({ resolver: zodResolver(registerSchema) });
  return <><div><p className="text-xs font-black uppercase tracking-[.18em] text-ink-muted">Create your account</p><h1 className="mt-2 text-3xl font-black text-brand">A simpler way to shop</h1><p className="mt-3 text-sm leading-6 text-ink-muted">Keep orders and delivery details together.</p></div><div className="mt-7"><GoogleButton /></div><FormDivider>or register with email</FormDivider><form className="space-y-4" onSubmit={handleSubmit(async () => { await new Promise((resolve) => window.setTimeout(resolve, 500)); setStatus(true); })}><div className="space-y-2"><Label htmlFor="register-name">Full name</Label><Input id="register-name" className="h-12 rounded-xl" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} /><FieldError id="register-name-error" message={errors.name?.message} /></div><div className="space-y-2"><Label htmlFor="register-email">Email address</Label><Input id="register-email" type="email" className="h-12 rounded-xl" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} /><FieldError id="register-email-error" message={errors.email?.message} /></div><PasswordField id="password" label="Password" inputProps={register("password")} error={errors.password?.message} /><PasswordField id="confirmPassword" label="Confirm password" inputProps={register("confirmPassword")} error={errors.confirmPassword?.message} /><div className="flex items-start gap-2"><Checkbox id="register-terms" required className="mt-1" /><Label htmlFor="register-terms" className="text-xs leading-5 text-ink-muted">I agree to the <Link href="/terms" className="font-bold text-brand hover:underline">terms</Link> and <Link href="/privacy" className="font-bold text-brand hover:underline">privacy policy</Link>.</Label></div><Button type="submit" size="lg" disabled={isSubmitting} className="w-full">{isSubmitting && <Loader2 className="size-4 animate-spin" />}Create account</Button><p className="min-h-5 text-center text-xs font-bold text-emerald-700" aria-live="polite">{status ? "Registration form validated. Ready for API integration." : ""}</p></form><p className="mt-5 text-center text-sm text-ink-muted">Already registered? <Link href="/login" className="font-black text-brand hover:underline">Sign in</Link></p></>;
}
