"use client";

import { ArrowClockwise, SignOut, Ticket } from "@phosphor-icons/react";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Order = {
  orderNo: string; status: string; paymentStatus: string; customerName: string; customerEmail: string;
  customerPhone: string; totalAmountCents: number; createdAt: string;
  show: { date: string; sessionType: string; showStart: string };
  items: Array<{ name: string; quantity: number }>;
};
type Show = {
  id: string; date: string; sessionType: string; showStart: string; status: string;
  onlineCapacity: number; heldCount: number; soldCount: number;
  prices: Array<{ priceCents: number; ticketType: { code: string } }>;
};

export function AdminDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [shows, setShows] = useState<Show[]>([]);
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const [message, setMessage] = useState("");

  async function load() {
    const session = await fetch("/api/admin/session", { cache: "no-store" });
    if (!session.ok) { router.replace("/admin/login"); return; }
    setUser((await session.json()).user);
    const [orderResponse, showResponse] = await Promise.all([
      fetch("/api/admin/orders", { cache: "no-store" }),
      fetch("/api/admin/shows", { cache: "no-store" }),
    ]);
    if (orderResponse.ok) setOrders((await orderResponse.json()).orders);
    if (showResponse.ok) setShows((await showResponse.json()).shows);
  }

  useEffect(() => { void load(); }, []);

  async function checkin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/checkin", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: data.get("token"), showId: data.get("showId") }),
    });
    const result = await response.json();
    setMessage(result.result ?? result.error);
    if (response.ok) (event.currentTarget.elements.namedItem("token") as HTMLInputElement).value = "";
  }

  async function createShow(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const sessionType = String(data.get("sessionType"));
    const defaults = sessionType === "LUNCH" ? { GUEST: 23800, VIP: 29600, SVIP: 49600 } : { GUEST: 31600, VIP: 45800, SVIP: 59600 };
    const response = await fetch("/api/admin/shows", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: data.get("date"), sessionType, onlineCapacity: Number(data.get("capacity")), prices: defaults }),
    });
    setMessage(response.ok ? "场次已发布" : (await response.json()).error ?? "发布失败");
    if (response.ok) await load();
  }

  async function adjustShow(show: Show) {
    const capacity = window.prompt("线上售票数量", String(show.onlineCapacity));
    if (capacity === null) return;
    const prices = Object.fromEntries(show.prices.map((price) => {
      const next = window.prompt(`${price.ticketType.code} 票价（元）`, String(price.priceCents / 100));
      return [price.ticketType.code, Math.round(Number(next ?? price.priceCents / 100) * 100)];
    }));
    const response = await fetch("/api/admin/shows", {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ showId: show.id, onlineCapacity: Number(capacity), prices }),
    });
    setMessage(response.ok ? "场次已更新" : (await response.json()).error ?? "更新失败");
    if (response.ok) await load();
  }

  async function refund(order: Order) {
    const reason = window.prompt("请输入退款原因（至少 5 个字）");
    if (!reason || reason.length < 5 || !window.confirm(`确认全额退款 ¥${(order.totalAmountCents / 100).toFixed(0)}？该操作会使全部电子票失效。`)) return;
    const response = await fetch("/api/admin/refunds", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderNo: order.orderNo, amountCents: order.totalAmountCents, reason, confirmation: "CONFIRM_REFUND", idempotencyKey: crypto.randomUUID() + crypto.randomUUID() }),
    });
    setMessage(response.ok ? "退款已由模拟渠道确认" : (await response.json()).error ?? "退款失败");
    if (response.ok) await load();
  }

  async function logout() { await fetch("/api/admin/logout", { method: "POST" }); router.replace("/admin/login"); }

  return <main className="admin-shell">
    <header><div><strong>礼宴巴国</strong><span>票务运营后台</span></div><nav><span>{user?.email} · {user?.role}</span><button onClick={() => void load()} title="刷新"><ArrowClockwise /></button><button onClick={logout} title="退出"><SignOut /></button></nav></header>
    {message ? <div className="admin-message" role="status">{message}</div> : null}
    <section className="admin-checkin"><div><p>CHECK-IN</p><h1>电子票核销</h1><span>先选择现场场次，再扫描二维码；错场票不能核销，同一张票只能成功一次。</span></div><form onSubmit={checkin}><Ticket /><select name="showId" required defaultValue=""><option value="" disabled>选择现场场次</option>{shows.filter((show) => show.status !== "CANCELLED").map((show) => <option key={show.id} value={show.id}>{String(show.date).slice(0, 10)} · {show.sessionType} · {show.showStart}</option>)}</select><input name="token" required placeholder="LYTICKET:v1..." autoComplete="off" /><button>核销</button></form></section>
    {user?.role === "ADMIN" ? <section className="admin-shows"><div className="admin-section-title"><h2>场次与线上库存</h2><span>新场次默认使用已确认的午宴 / 晚宴时间与真实票价</span></div><form className="show-create" onSubmit={createShow}><input name="date" type="date" required /><select name="sessionType" defaultValue="LUNCH"><option value="LUNCH">午宴</option><option value="DINNER">晚宴</option></select><input name="capacity" type="number" min="0" max="160" defaultValue="20" required /><button>发布场次</button></form><div className="show-list">{shows.map((show) => <article key={show.id}><span><strong>{String(show.date).slice(0, 10)} · {show.sessionType}</strong><small>{show.showStart} · {show.status}</small></span><span>线上 {show.onlineCapacity} / 锁定 {show.heldCount} / 已售 {show.soldCount}</span><button onClick={() => adjustShow(show)}>调整库存与票价</button></article>)}</div></section> : null}
    <section className="admin-orders"><div className="admin-section-title"><h2>最近订单</h2><span>最多显示 100 条，联系方式默认脱敏</span></div><div className="admin-table"><div className="admin-row head"><span>订单</span><span>宾客</span><span>场次</span><span>票种</span><span>金额</span><span>状态</span></div>{orders.map((order) => <div className="admin-row" key={order.orderNo}><span><strong>{order.orderNo}</strong><small>{new Date(order.createdAt).toLocaleString("zh-CN")}</small></span><span>{order.customerName}<small>{order.customerEmail}<br />{order.customerPhone}</small></span><span>{String(order.show.date).slice(0, 10)}<small>{order.show.sessionType} · {order.show.showStart}</small></span><span>{order.items.map((item) => <small key={item.name}>{item.name} × {item.quantity}</small>)}</span><span>¥{(order.totalAmountCents / 100).toFixed(0)}</span><span><b data-state={order.status}>{order.status}</b><small>{order.paymentStatus}</small>{user?.role === "ADMIN" && order.status === "PAID" ? <button className="refund-link" onClick={() => refund(order)}>全额退款</button> : null}</span></div>)}</div></section>
  </main>;
}