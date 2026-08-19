"use client";

import { LockKey, ShieldCheck } from "@phosphor-icons/react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLogin() {
  const router = useRouter(); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError(""); const data = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: data.get("email"), password: data.get("password"), otp: data.get("otp") }) });
    if (response.ok) router.replace("/admin"); else setError("登录失败，请检查账号、密码和 6 位动态验证码。"); setLoading(false);
  }
  return <main className="admin-login"><form onSubmit={submit}><div className="admin-mark"><ShieldCheck /><span><strong>礼宴巴国</strong><small>SECURE OPERATIONS</small></span></div><h1>管理后台</h1><p>使用管理员账号、强密码与验证器动态码登录。</p><label>邮箱<input type="email" name="email" required autoComplete="username" /></label><label>密码<input type="password" name="password" required autoComplete="current-password" /></label><label>6 位动态验证码<input name="otp" required inputMode="numeric" pattern="[0-9]{6}" maxLength={6} autoComplete="one-time-code" /></label><button disabled={loading}><LockKey />{loading ? "正在验证..." : "安全登录"}</button>{error ? <p className="checkout-error">{error}</p> : null}</form></main>;
}