import type { Metadata } from "next";
import { AdminLogin } from "./AdminLogin";

export const metadata: Metadata = { title: "管理后台 | 礼宴巴国", robots: { index: false, follow: false } };
export default function LoginPage() { return <AdminLogin />; }