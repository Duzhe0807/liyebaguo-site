"use client";

import {
  ArrowClockwise, CalendarBlank, CaretRight, CheckCircle, Clock, CurrencyCny,
  MagnifyingGlass, Plus, QrCode, Receipt, ShieldCheck, SignOut, SquaresFour,
  Ticket, WarningCircle, X,
} from "@phosphor-icons/react";
import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Order = {
  orderNo: string; status: string; paymentStatus: string; customerName: string; customerEmail: string;
  customerPhone: string; totalAmountCents: number; createdAt: string;
  show: { date: string; sessionType: string; showStart: string };
  items: Array<{ name: string; quantity: number }>;
};
type Show = {
  id: string; date: string; sessionType: string; showStart: string; showEnd: string;
  gardenStart: string; gardenEnd: string; status: string; onlineCapacity: number;
  heldCount: number; soldCount: number;
  prices: Array<{ priceCents: number; ticketType: { code: string } }>;
};
type AdminView = "overview" | "orders" | "shows" | "checkin";
type Notice = { tone: "success" | "error" | "info"; text: string };
type ShowEditor = { mode: "create" } | { mode: "edit"; show: Show };

const orderStatuses = ["ALL", "PENDING_PAYMENT", "PAID", "REFUNDED", "EXPIRED", "CANCELLED"] as const;
const statusCopy: Record<string, string> = {
  ALL: "全部", PENDING_PAYMENT: "待支付", PAID: "已支付", CANCELLED: "已取消", EXPIRED: "已过期",
  PARTIALLY_REFUNDED: "部分退款", REFUNDED: "已退款", UNPAID: "未支付", PROCESSING: "处理中",
  FAILED: "失败", REFUNDING: "退款中", DRAFT: "草稿", AVAILABLE: "售票中", SOLD_OUT: "已售罄", CLOSED: "已结束",
};
const viewCopy: Record<AdminView, { title: string; description: string }> = {
  overview: { title: "运营总览", description: "查看销售、场次和需要处理的订单" },
  orders: { title: "订单管理", description: "搜索订单、查看详情并处理退款" },
  shows: { title: "场次与票价", description: "管理午宴、晚宴、库存和票价" },
  checkin: { title: "现场核销", description: "选择现场场次后核验电子票" },
};

function money(value: number) {
  return new Intl.NumberFormat("zh-CN", { style: "currency", currency: "CNY", maximumFractionDigits: 0 }).format(value / 100);
}
function sessionLabel(value: string) { return value === "LUNCH" ? "午宴" : "晚宴"; }
function dateLabel(value: string) {
  return new Intl.DateTimeFormat("zh-CN", { month: "2-digit", day: "2-digit", weekday: "short" }).format(new Date(value));
}
function StatusBadge({ value }: { value: string }) {
  return <span className="admin-status" data-state={value}>{statusCopy[value] ?? value}</span>;
}
function Metric({ icon, label, value, detail }: { icon: ReactNode; label: string; value: string; detail: string }) {
  return <article className="admin-metric"><span className="admin-metric-icon">{icon}</span><div><small>{label}</small><strong>{value}</strong><p>{detail}</p></div></article>;
}

export function AdminDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [shows, setShows] = useState<Show[]>([]);
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const [activeView, setActiveView] = useState<AdminView>("overview");
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<(typeof orderStatuses)[number]>("ALL");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [refundTarget, setRefundTarget] = useState<Order | null>(null);
  const [refundReason, setRefundReason] = useState("");
  const [refundConfirmed, setRefundConfirmed] = useState(false);
  const [showEditor, setShowEditor] = useState<ShowEditor | null>(null);
  const [newSession, setNewSession] = useState<"LUNCH" | "DINNER">("LUNCH");

  async function load() {
    setLoading(true);
    const session = await fetch("/api/admin/session", { cache: "no-store" });
    if (!session.ok) { router.replace("/admin/login"); return; }
    setUser((await session.json()).user);
    const [orderResponse, showResponse] = await Promise.all([
      fetch("/api/admin/orders", { cache: "no-store" }), fetch("/api/admin/shows", { cache: "no-store" }),
    ]);
    if (orderResponse.ok) setOrders((await orderResponse.json()).orders);
    if (showResponse.ok) setShows((await showResponse.json()).shows);
    setLoading(false);
  }
  useEffect(() => { void load(); }, []);

  const filteredOrders = useMemo(() => {
    const term = search.trim().toLowerCase();
    return orders.filter((order) => {
      const statusMatches = statusFilter === "ALL" || order.status === statusFilter;
      const searchMatches = !term || [order.orderNo, order.customerName, order.customerEmail, order.customerPhone].some((value) => value.toLowerCase().includes(term));
      return statusMatches && searchMatches;
    });
  }, [orders, search, statusFilter]);
  const metrics = useMemo(() => {
    const paidOrders = orders.filter((order) => order.status === "PAID");
    return {
      activeShows: shows.filter((show) => ["AVAILABLE", "SOLD_OUT"].includes(show.status)).length,
      soldTickets: shows.reduce((sum, show) => sum + show.soldCount, 0),
      pendingOrders: orders.filter((order) => order.status === "PENDING_PAYMENT").length,
      paidRevenue: paidOrders.reduce((sum, order) => sum + order.totalAmountCents, 0),
    };
  }, [orders, shows]);

  function showNotice(tone: Notice["tone"], text: string) {
    setNotice({ tone, text }); window.setTimeout(() => setNotice(null), 5000);
  }
  function switchView(view: AdminView) {
    if (view === activeView) return;
    setActiveView(view);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  }
  async function checkin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget; const data = new FormData(form);
    const response = await fetch("/api/admin/checkin", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token: data.get("token"), showId: data.get("showId") }) });
    const result = await response.json();
    showNotice(response.ok ? "success" : "error", response.ok ? "电子票核销成功" : (result.error ?? "核销失败"));
    if (response.ok) (form.elements.namedItem("token") as HTMLInputElement).value = "";
  }
  async function createShow(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/shows", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
      date: data.get("date"), sessionType: data.get("sessionType"), onlineCapacity: Number(data.get("capacity")),
      prices: { GUEST: Math.round(Number(data.get("guestPrice")) * 100), VIP: Math.round(Number(data.get("vipPrice")) * 100), SVIP: Math.round(Number(data.get("svipPrice")) * 100) },
    }) });
    if (!response.ok) { showNotice("error", (await response.json()).error ?? "发布失败"); return; }
    setShowEditor(null); showNotice("success", "新场次已发布"); await load();
  }
  async function updateShow(event: FormEvent<HTMLFormElement>, show: Show) {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/shows", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
      showId: show.id, onlineCapacity: Number(data.get("capacity")), status: data.get("status"),
      prices: { GUEST: Math.round(Number(data.get("guestPrice")) * 100), VIP: Math.round(Number(data.get("vipPrice")) * 100), SVIP: Math.round(Number(data.get("svipPrice")) * 100) },
    }) });
    if (!response.ok) { showNotice("error", (await response.json()).error ?? "更新失败"); return; }
    setShowEditor(null); showNotice("success", "场次设置已更新"); await load();
  }
  async function refund() {
    if (!refundTarget || refundReason.trim().length < 5 || !refundConfirmed) return;
    const response = await fetch("/api/admin/refunds", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
      orderNo: refundTarget.orderNo, amountCents: refundTarget.totalAmountCents, reason: refundReason.trim(), confirmation: "CONFIRM_REFUND", idempotencyKey: crypto.randomUUID() + crypto.randomUUID(),
    }) });
    if (!response.ok) { showNotice("error", (await response.json()).error ?? "退款失败"); return; }
    setRefundTarget(null); setRefundReason(""); setRefundConfirmed(false); setSelectedOrder(null);
    showNotice("success", "模拟渠道已确认全额退款，电子票已失效"); await load();
  }
  async function logout() { await fetch("/api/admin/logout", { method: "POST" }); router.replace("/admin/login"); }

  const navItems: Array<{ id: AdminView; label: string; icon: ReactNode }> = [
    { id: "overview", label: "运营总览", icon: <SquaresFour /> }, { id: "orders", label: "订单管理", icon: <Receipt /> },
    { id: "shows", label: "场次与票价", icon: <CalendarBlank /> }, { id: "checkin", label: "现场核销", icon: <QrCode /> },
  ];
  const currentCopy = viewCopy[activeView];
  const recentShows = [...shows].sort((a, b) => String(a.date).localeCompare(String(b.date))).slice(0, 5);
  const priceFor = (show: Show, code: string) => show.prices.find((price) => price.ticketType.code === code)?.priceCents ?? 0;

  return <main className="admin-shell">
    <aside className="admin-sidebar">
      <div className="admin-brand"><span className="admin-brand-mark">礼</span><div><strong>礼宴巴国</strong><small>票务运营中心</small></div></div>
      <nav aria-label="后台导航">{navItems.map((item) => <button key={item.id} type="button" className={activeView === item.id ? "active" : ""} onClick={() => switchView(item.id)}>{item.icon}<span>{item.label}</span>{item.id === "orders" && metrics.pendingOrders > 0 ? <b>{metrics.pendingOrders}</b> : null}</button>)}</nav>
      <div className="admin-sidebar-foot"><ShieldCheck /><span><strong>测试环境</strong><small>模拟支付已启用</small></span></div>
    </aside>

    <section className="admin-workspace">
      <header className="admin-topbar"><div><h1>{currentCopy.title}</h1><p>{currentCopy.description}</p></div><div className="admin-top-actions"><span className="admin-env"><i />TEST · MOCK PAY</span><button type="button" className="admin-icon-button" onClick={() => void load()} title="刷新数据"><ArrowClockwise /></button><div className="admin-user"><span>{user?.email}</span><small>{user?.role}</small></div><button type="button" className="admin-icon-button" onClick={() => void logout()} title="退出登录"><SignOut /></button></div></header>
      {notice ? <div className="admin-notice" data-tone={notice.tone} role="status">{notice.tone === "error" ? <WarningCircle /> : <CheckCircle />}<span>{notice.text}</span><button type="button" onClick={() => setNotice(null)}><X /></button></div> : null}

      <div className="admin-content" aria-busy={loading}>
        <div className="admin-view" key={activeView}>
        {activeView === "overview" ? <><section className="admin-metrics" aria-label="关键指标">
          <Metric icon={<CalendarBlank />} label="开放场次" value={String(metrics.activeShows)} detail="当前可售与已售罄场次" />
          <Metric icon={<Ticket />} label="已售电子票" value={String(metrics.soldTickets)} detail="所有测试场次累计" />
          <Metric icon={<Clock />} label="待支付订单" value={String(metrics.pendingOrders)} detail="需关注支付超时状态" />
          <Metric icon={<CurrencyCny />} label="已支付金额" value={money(metrics.paidRevenue)} detail="不含已退款订单" />
        </section><div className="admin-overview-grid">
          <section className="admin-panel"><div className="admin-panel-head"><div><h2>近期场次</h2><p>优先确认库存占用和售票状态</p></div><button type="button" onClick={() => switchView("shows")}>管理场次<CaretRight /></button></div><div className="admin-compact-list">
            {recentShows.length ? recentShows.map((show) => <button type="button" key={show.id} onClick={() => { switchView("shows"); setShowEditor({ mode: "edit", show }); }}><span className="admin-date-tile"><strong>{dateLabel(show.date).split(" ")[0]}</strong><small>{sessionLabel(show.sessionType)}</small></span><span><strong>{show.showStart} - {show.showEnd}</strong><small>线上库存 {show.soldCount + show.heldCount} / {show.onlineCapacity}</small></span><StatusBadge value={show.status} /><CaretRight /></button>) : <div className="admin-empty">暂无场次</div>}
          </div></section>
          <section className="admin-panel"><div className="admin-panel-head"><div><h2>最近订单</h2><p>新订单和状态变化集中在这里</p></div><button type="button" onClick={() => switchView("orders")}>查看全部<CaretRight /></button></div><div className="admin-compact-list orders">
            {orders.slice(0, 5).map((order) => <button type="button" key={order.orderNo} onClick={() => setSelectedOrder(order)}><span><strong>{order.customerName}</strong><small>{order.orderNo}</small></span><span><strong>{money(order.totalAmountCents)}</strong><small>{sessionLabel(order.show.sessionType)} · {String(order.show.date).slice(0, 10)}</small></span><StatusBadge value={order.status} /><CaretRight /></button>)}
          </div></section>
        </div></> : null}

        {activeView === "orders" ? <section className="admin-page-section"><div className="admin-toolbar"><label className="admin-search"><MagnifyingGlass /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="搜索订单号、宾客姓名或联系方式" /></label><span>显示 {filteredOrders.length} / {orders.length} 条</span></div><div className="admin-tabs" role="tablist" aria-label="订单状态">{orderStatuses.map((status) => <button key={status} type="button" className={statusFilter === status ? "active" : ""} onClick={() => setStatusFilter(status)}>{statusCopy[status]}</button>)}</div><div className="admin-order-table"><div className="admin-order-row head"><span>订单与时间</span><span>宾客</span><span>场次</span><span>票种</span><span>金额</span><span>状态</span><span /></div>
          {filteredOrders.map((order) => <button type="button" className="admin-order-row" key={order.orderNo} onClick={() => setSelectedOrder(order)}><span><strong>{order.orderNo}</strong><small>{new Date(order.createdAt).toLocaleString("zh-CN")}</small></span><span><strong>{order.customerName}</strong><small>{order.customerPhone}</small></span><span><strong>{String(order.show.date).slice(0, 10)}</strong><small>{sessionLabel(order.show.sessionType)} · {order.show.showStart}</small></span><span>{order.items.map((item) => <small key={item.name}>{item.name} × {item.quantity}</small>)}</span><span><strong>{money(order.totalAmountCents)}</strong></span><span><StatusBadge value={order.status} /><small>{statusCopy[order.paymentStatus] ?? order.paymentStatus}</small></span><CaretRight /></button>)}
          {!filteredOrders.length ? <div className="admin-empty">没有符合当前条件的订单</div> : null}</div></section> : null}

        {activeView === "shows" ? <section className="admin-page-section"><div className="admin-section-actions"><div><h2>场次列表</h2><p>库存不能低于已锁定与已售数量之和</p></div>{user?.role === "ADMIN" ? <button type="button" className="admin-primary" onClick={() => { setNewSession("LUNCH"); setShowEditor({ mode: "create" }); }}><Plus />发布场次</button> : null}</div><div className="admin-show-list">{shows.map((show) => {
          const used = show.soldCount + show.heldCount; const percent = show.onlineCapacity ? Math.min(100, Math.round((used / show.onlineCapacity) * 100)) : 0;
          return <article key={show.id}><div className="admin-show-main"><span className="admin-date-tile"><strong>{dateLabel(show.date).split(" ")[0]}</strong><small>{dateLabel(show.date).split(" ").slice(1).join(" ")}</small></span><div><h3>{sessionLabel(show.sessionType)} · {show.showStart} - {show.showEnd}</h3><p>游园 {show.gardenStart} - {show.gardenEnd}</p></div></div><div className="admin-inventory"><span><strong>{used}</strong> / {show.onlineCapacity} 张</span><div><i style={{ width: `${percent}%` }} /></div><small>已售 {show.soldCount} · 锁定 {show.heldCount}</small></div><div className="admin-price-stack"><span>嘉宾 {money(priceFor(show, "GUEST"))}</span><span>VIP {money(priceFor(show, "VIP"))}</span><span>SVIP {money(priceFor(show, "SVIP"))}</span></div><StatusBadge value={show.status} />{user?.role === "ADMIN" ? <button type="button" className="admin-secondary" onClick={() => setShowEditor({ mode: "edit", show })}>管理<CaretRight /></button> : null}</article>;
        })}</div></section> : null}

        {activeView === "checkin" ? <section className="admin-checkin-page"><div className="admin-checkin-intro"><span className="admin-checkin-icon"><QrCode /></span><p>ONSITE CHECK-IN</p><h2>电子票现场核销</h2><span>先确认当前现场场次，再扫描宾客电子票。错场票、已退款票和已核销票会被拒绝。</span></div><form onSubmit={checkin}><label>当前现场场次<select name="showId" required defaultValue=""><option value="" disabled>请选择场次</option>{shows.filter((show) => show.status !== "CANCELLED").map((show) => <option key={show.id} value={show.id}>{String(show.date).slice(0, 10)} · {sessionLabel(show.sessionType)} · {show.showStart}</option>)}</select></label><label>电子票内容<div className="admin-ticket-input"><Ticket /><input name="token" required placeholder="扫描二维码或粘贴 LYTICKET:v1..." autoComplete="off" /></div></label><button className="admin-primary" type="submit"><CheckCircle />确认核销</button></form></section> : null}
        </div>
      </div>
    </section>

    {selectedOrder ? <div className="admin-drawer-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedOrder(null); }}><aside className="admin-drawer" role="dialog" aria-modal="true" aria-labelledby="order-detail-title"><header><div><small>ORDER DETAIL</small><h2 id="order-detail-title">订单详情</h2></div><button type="button" onClick={() => setSelectedOrder(null)}><X /></button></header><section className="admin-order-hero"><div><span>订单号</span><strong>{selectedOrder.orderNo}</strong><small>{new Date(selectedOrder.createdAt).toLocaleString("zh-CN")}</small></div><StatusBadge value={selectedOrder.status} /></section><dl className="admin-detail-grid"><div><dt>宾客</dt><dd>{selectedOrder.customerName}<small>{selectedOrder.customerEmail}<br />{selectedOrder.customerPhone}</small></dd></div><div><dt>场次</dt><dd>{String(selectedOrder.show.date).slice(0, 10)}<small>{sessionLabel(selectedOrder.show.sessionType)} · {selectedOrder.show.showStart}</small></dd></div><div><dt>支付状态</dt><dd>{statusCopy[selectedOrder.paymentStatus] ?? selectedOrder.paymentStatus}</dd></div><div><dt>订单金额</dt><dd className="admin-detail-amount">{money(selectedOrder.totalAmountCents)}</dd></div></dl><section className="admin-detail-section"><h3>票务明细</h3>{selectedOrder.items.map((item) => <div key={item.name}><span>{item.name}</span><strong>× {item.quantity}</strong></div>)}</section><section className="admin-detail-section"><h3>状态说明</h3><p>{selectedOrder.status === "PAID" ? "订单已支付并签发电子票，可进行现场核销。" : selectedOrder.status === "REFUNDED" ? "订单已全额退款，关联电子票已全部失效。" : "订单当前不可执行退款，请先核对支付状态。"}</p></section>{user?.role === "ADMIN" && selectedOrder.status === "PAID" ? <footer><button type="button" className="admin-danger" onClick={() => setRefundTarget(selectedOrder)}>发起全额退款</button><small>退款后全部电子票立即失效</small></footer> : null}</aside></div> : null}

    {refundTarget ? <div className="admin-modal-layer"><section className="admin-modal danger" role="dialog" aria-modal="true" aria-labelledby="refund-title"><header><span><WarningCircle /></span><div><h2 id="refund-title">确认全额退款</h2><p>这是一项不可撤销的高风险操作</p></div><button type="button" onClick={() => setRefundTarget(null)}><X /></button></header><div className="admin-refund-summary"><span>订单 {refundTarget.orderNo}</span><strong>{money(refundTarget.totalAmountCents)}</strong></div><label>退款原因<textarea value={refundReason} onChange={(event) => setRefundReason(event.target.value)} placeholder="请填写具体原因，至少 5 个字" rows={4} /></label><label className="admin-confirm-check"><input type="checkbox" checked={refundConfirmed} onChange={(event) => setRefundConfirmed(event.target.checked)} /><span>我已核对订单和金额，确认退款后电子票将立即失效。</span></label><footer><button type="button" className="admin-secondary" onClick={() => setRefundTarget(null)}>取消</button><button type="button" className="admin-danger" disabled={refundReason.trim().length < 5 || !refundConfirmed} onClick={() => void refund()}>确认全额退款</button></footer></section></div> : null}

    {showEditor ? <div className="admin-modal-layer"><section className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="show-editor-title"><header><span><CalendarBlank /></span><div><h2 id="show-editor-title">{showEditor.mode === "create" ? "发布新场次" : "管理场次"}</h2><p>{showEditor.mode === "create" ? "时间按已确认的午宴 / 晚宴安排自动生成" : `${String(showEditor.show.date).slice(0, 10)} · ${sessionLabel(showEditor.show.sessionType)}`}</p></div><button type="button" onClick={() => setShowEditor(null)}><X /></button></header><form onSubmit={showEditor.mode === "create" ? createShow : (event) => updateShow(event, showEditor.show)}>{showEditor.mode === "create" ? <div className="admin-field-row"><label>日期<input name="date" type="date" required /></label><label>场次<select name="sessionType" value={newSession} onChange={(event) => setNewSession(event.target.value as "LUNCH" | "DINNER")}><option value="LUNCH">午宴</option><option value="DINNER">晚宴</option></select></label></div> : <label>售票状态<select name="status" defaultValue={showEditor.show.status}><option value="AVAILABLE">售票中</option><option value="SOLD_OUT">已售罄</option><option value="CLOSED">已结束</option><option value="CANCELLED">已取消</option><option value="DRAFT">草稿</option></select></label>}<label>线上售票数量<input name="capacity" type="number" min="0" max="160" defaultValue={showEditor.mode === "create" ? 20 : showEditor.show.onlineCapacity} required /><small>线下场地容量 160；线上数量不能低于已锁定与已售数量。</small></label><fieldset><legend>票价（人民币）</legend><div className="admin-price-fields" key={showEditor.mode === "create" ? newSession : showEditor.show.id}><label>嘉宾席<input name="guestPrice" type="number" min="1" defaultValue={showEditor.mode === "create" ? (newSession === "LUNCH" ? 238 : 316) : priceFor(showEditor.show, "GUEST") / 100} required /></label><label>VIP<input name="vipPrice" type="number" min="1" defaultValue={showEditor.mode === "create" ? (newSession === "LUNCH" ? 296 : 458) : priceFor(showEditor.show, "VIP") / 100} required /></label><label>SVIP<input name="svipPrice" type="number" min="1" defaultValue={showEditor.mode === "create" ? (newSession === "LUNCH" ? 496 : 596) : priceFor(showEditor.show, "SVIP") / 100} required /></label></div></fieldset><footer><button type="button" className="admin-secondary" onClick={() => setShowEditor(null)}>取消</button><button type="submit" className="admin-primary">{showEditor.mode === "create" ? "确认发布" : "保存更改"}</button></footer></form></section></div> : null}
  </main>;
}
