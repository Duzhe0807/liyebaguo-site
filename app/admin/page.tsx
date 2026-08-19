import type { Metadata } from "next";
import { AdminDashboard } from "./AdminDashboard";

export const metadata: Metadata = { title: "票务运营后台 | 礼宴巴国", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";
export default function AdminPage(){return <AdminDashboard/>;}