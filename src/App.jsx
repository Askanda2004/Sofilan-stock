import { useState, useEffect } from "react";

// ===== LOCAL STORAGE HOOK =====
// อ่านข้อมูลจาก localStorage ตอนโหลด และบันทึกทุกครั้งที่ state เปลี่ยน
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage full หรือ private mode — ไม่ทำอะไร
    }
  }, [key, value]);

  return [value, setValue];
}

// ===== SOFILAN SHOP THEME =====
// Primary: #F5A623 (golden amber - from logo circle)
// Accent:  #E05C3A (coral red - awning stripes)
// Dark:    #3D2B1F (dark brown - logo text)
// Mid:     #C4865A (warm brown)
// Bg:      #FFF8F0 (warm cream)
// Surface: #FFFFFF
// Green:   #3A8C5C (stock in)
// Red:     #C0392B (stock out / alert)

const T = {
  primary: "#F5A623",
  primaryDark: "#D4891A",
  primaryLight: "#FEF3DC",
  accent: "#E05C3A",
  accentLight: "#FDE8E3",
  dark: "#3D2B1F",
  mid: "#C4865A",
  midLight: "#F5E6D8",
  bg: "#FFF8F0",
  surface: "#FFFFFF",
  green: "#3A8C5C",
  greenLight: "#D6F0E4",
  red: "#C0392B",
  redLight: "#FDECEA",
  textPrimary: "#3D2B1F",
  textSecondary: "#7A5C44",
  textMuted: "#B8926A",
  border: "rgba(196,134,90,0.2)",
  borderMed: "rgba(196,134,90,0.35)",
};

const CLOUDINARY_UPLOAD_PRESET = "ml_default";
const CLOUDINARY_CLOUD_NAME = "demo";

const USERS = [
  { id: 1, username: "admin", password: "admin123", role: "admin", name: "ผู้ดูแลระบบ" },
  { id: 2, username: "staff", password: "staff123", role: "staff", name: "พนักงาน" },
];

const INITIAL_CATEGORIES = [
  { id: 1, name: "อิเล็กทรอนิกส์", description: "สินค้าอิเล็กทรอนิกส์และอุปกรณ์" },
  { id: 2, name: "เครื่องใช้สำนักงาน", description: "อุปกรณ์สำนักงานทั่วไป" },
  { id: 3, name: "เครื่องดื่ม", description: "เครื่องดื่มทุกประเภท" },
  { id: 4, name: "อาหารแห้ง", description: "อาหารแห้งและของใช้ประจำวัน" },
];

const INITIAL_PRODUCTS = [
  { id: 1, sku: "EL-001", name: "MacBook Pro 14\"", description: "โน้ตบุ๊คสำหรับมืออาชีพ", buyPrice: 55000, sellPrice: 65000, quantity: 8, minStock: 3, unit: "เครื่อง", categoryId: 1, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop" },
  { id: 2, sku: "EL-002", name: "iPhone 15 Pro", description: "สมาร์ทโฟนระดับพรีเมียม", buyPrice: 35000, sellPrice: 42000, quantity: 2, minStock: 5, unit: "เครื่อง", categoryId: 1, image: "https://images.unsplash.com/photo-1696426101688-f3ea5a48f52d?w=200&h=200&fit=crop" },
  { id: 3, sku: "OF-001", name: "กระดาษ A4", description: "กระดาษขาว 80g 500 แผ่น/รีม", buyPrice: 100, sellPrice: 130, quantity: 50, minStock: 20, unit: "รีม", categoryId: 2, image: "https://images.unsplash.com/photo-1568952433726-3896e3881c65?w=200&h=200&fit=crop" },
  { id: 4, sku: "OF-002", name: "ปากกาลูกลื่น", description: "ปากกาลูกลื่นสีน้ำเงิน", buyPrice: 5, sellPrice: 8, quantity: 3, minStock: 50, unit: "ด้าม", categoryId: 2, image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=200&h=200&fit=crop" },
  { id: 5, sku: "DR-001", name: "กาแฟดำ 3in1", description: "กาแฟสำเร็จรูป กล่อง 50 ซอง", buyPrice: 85, sellPrice: 115, quantity: 30, minStock: 10, unit: "กล่อง", categoryId: 3, image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=200&h=200&fit=crop" },
  { id: 6, sku: "FD-001", name: "มาม่า รสต้มยำ", description: "บะหมี่กึ่งสำเร็จรูป แพ็ค 30 ซอง", buyPrice: 100, sellPrice: 140, quantity: 1, minStock: 10, unit: "แพ็ค", categoryId: 4, image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&h=200&fit=crop" },
];

const INITIAL_HISTORY = [
  { id: 1, type: "IN", productId: 1, quantity: 10, note: "รับสินค้าจาก Supplier A", userId: 1, date: new Date(Date.now() - 86400000 * 3).toISOString() },
  { id: 2, type: "OUT", productId: 3, quantity: 5, note: "เบิกใช้ฝ่ายบัญชี", userId: 2, date: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: 3, type: "IN", productId: 5, quantity: 20, note: "รับสินค้าเพิ่มเติม", userId: 1, date: new Date(Date.now() - 86400000).toISOString() },
  { id: 4, type: "OUT", productId: 2, quantity: 3, note: "ขายให้ลูกค้า", userId: 2, date: new Date(Date.now() - 3600000 * 5).toISOString() },
  { id: 5, type: "IN", productId: 4, quantity: 100, note: "รับสินค้าครั้งใหม่", userId: 1, date: new Date(Date.now() - 3600000 * 2).toISOString() },
];

const fmtDate = (d) => new Date(d).toLocaleString("th-TH", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
const fmtPrice = (n) => Number(n).toLocaleString("th-TH", { minimumFractionDigits: 0 });

// ===== SHOP LOGO SVG =====
function ShopLogo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill={T.primary} />
      {/* Shop building */}
      <rect x="22" y="42" width="56" height="38" rx="2" fill="#4ECDC4" />
      {/* Awning stripes */}
      <path d="M18 42 Q50 30 82 42" fill={T.accent} />
      <path d="M22 42 L28 36 L34 42" fill={T.surface} opacity="0.5" />
      <path d="M34 42 L40 36 L46 42" fill={T.accent} />
      <path d="M46 42 L52 36 L58 42" fill={T.surface} opacity="0.5" />
      <path d="M58 42 L64 36 L70 42" fill={T.accent} />
      {/* Window */}
      <rect x="26" y="50" width="22" height="18" rx="2" fill="#A8EDDE" />
      <rect x="27" y="51" width="20" height="16" rx="1" fill="#C5F2E9" />
      {/* Door */}
      <rect x="56" y="56" width="14" height="24" rx="2" fill="#E8A87C" />
      <circle cx="68" cy="68" r="1.5" fill={T.dark} />
      {/* Sign */}
      <rect x="30" y="28" width="40" height="10" rx="2" fill={T.surface} />
      <text x="50" y="36" textAnchor="middle" fontSize="7" fontWeight="700" fill={T.dark}>SHOP</text>
    </svg>
  );
}

// ===== APP SHELL =====
export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");
  // ── ข้อมูลที่ต้องการให้คงอยู่ใช้ useLocalStorage ──
  const [categories, setCategories] = useLocalStorage("sofilan_categories", INITIAL_CATEGORIES);
  const [products, setProducts] = useLocalStorage("sofilan_products", INITIAL_PRODUCTS);
  const [history, setHistory] = useLocalStorage("sofilan_history", INITIAL_HISTORY);
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  if (!user) return <Login onLogin={(u) => { setUser(u); setPage("dashboard"); }} />;

  const props = { user, categories, setCategories, products, setProducts, history, setHistory, showToast };

  const nav = [
    { id: "dashboard", icon: "ti-layout-dashboard", label: "แดชบอร์ด" },
    { id: "products", icon: "ti-box", label: "สินค้า" },
    { id: "categories", icon: "ti-category", label: "หมวดหมู่" },
    { id: "stockin", icon: "ti-package-import", label: "รับสินค้าเข้า" },
    { id: "stockout", icon: "ti-package-export", label: "เบิกสินค้าออก" },
    { id: "history", icon: "ti-history", label: "ประวัติ" },
    { id: "alerts", icon: "ti-alert-triangle", label: "แจ้งเตือน" },
    { id: "reports", icon: "ti-report-analytics", label: "รายงาน" },
  ];

  const lowStockCount = products.filter(p => p.quantity <= p.minStock).length;

  return (
    <div style={{ display: "flex", height: "100vh", background: T.bg, fontFamily: "var(--font-sans)", overflow: "hidden" }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? 230 : 64,
        background: T.dark,
        transition: "width 0.25s cubic-bezier(.4,0,.2,1)",
        display: "flex", flexDirection: "column", flexShrink: 0, overflow: "hidden",
        boxShadow: "4px 0 20px rgba(61,43,31,0.18)"
      }}>
        {/* Logo */}
        <div style={{ padding: "16px 14px 14px", display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid rgba(255,255,255,0.1)`, background: "rgba(0,0,0,0.15)" }}>
          <div style={{ flexShrink: 0, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}>
            <ShopLogo size={38} />
          </div>
          {sidebarOpen && (
            <div>
              <div style={{ color: T.primary, fontSize: 15, fontWeight: 500, lineHeight: 1.2, letterSpacing: "0.02em" }}>Sofilan Shop</div>
              <div style={{ color: "rgba(245,166,35,0.5)", fontSize: 10, letterSpacing: "0.05em" }}>SINCE 2023</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "10px 0", overflowY: "auto" }}>
          {nav.map(n => {
            const active = page === n.id;
            return (
              <button key={n.id} onClick={() => setPage(n.id)} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: sidebarOpen ? "10px 14px" : "10px 0",
                justifyContent: sidebarOpen ? "flex-start" : "center",
                border: "none",
                background: active ? `linear-gradient(90deg, rgba(245,166,35,0.25) 0%, rgba(245,166,35,0.05) 100%)` : "transparent",
                color: active ? T.primary : "rgba(255,255,255,0.55)",
                cursor: "pointer", fontSize: 13,
                borderLeft: active ? `3px solid ${T.primary}` : "3px solid transparent",
                position: "relative",
                transition: "all 0.15s"
              }}>
                <i className={`ti ${n.icon}`} style={{ fontSize: 18, flexShrink: 0, color: active ? T.primary : "rgba(255,255,255,0.5)" }} aria-hidden="true" />
                {sidebarOpen && <span style={{ whiteSpace: "nowrap", fontWeight: active ? 500 : 400 }}>{n.label}</span>}
                {n.id === "alerts" && lowStockCount > 0 && (
                  <span style={{ marginLeft: "auto", background: T.accent, color: "#fff", borderRadius: 10, fontSize: 10, padding: "1px 6px", fontWeight: 700, flexShrink: 0 }}>{lowStockCount}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User footer */}
        <div style={{ padding: "12px 14px", borderTop: `1px solid rgba(255,255,255,0.08)` }}>
          {sidebarOpen && (
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%",
                background: user.role === "admin" ? T.primary : T.green,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, color: user.role === "admin" ? T.dark : "#fff", fontWeight: 700, flexShrink: 0
              }}>{user.name[0]}</div>
              <div>
                <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: 500 }}>{user.name}</div>
                <div style={{ fontSize: 10, color: user.role === "admin" ? T.primary : "#69db7c" }}>
                  {user.role === "admin" ? "ผู้ดูแลระบบ" : "พนักงาน"}
                </div>
              </div>
            </div>
          )}
          <button onClick={() => setUser(null)} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 8,
            padding: "7px 10px", border: `1px solid rgba(245,166,35,0.25)`,
            background: "rgba(245,166,35,0.06)", color: "rgba(255,255,255,0.5)",
            cursor: "pointer", borderRadius: 8, fontSize: 12,
            justifyContent: sidebarOpen ? "flex-start" : "center"
          }}>
            <i className="ti ti-logout" style={{ fontSize: 15 }} aria-hidden="true" />
            {sidebarOpen && "ออกจากระบบ"}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <div style={{
          background: T.surface, borderBottom: `1px solid ${T.border}`,
          padding: "0 24px", height: 56,
          display: "flex", alignItems: "center", gap: 14, flexShrink: 0,
          boxShadow: "0 2px 8px rgba(196,134,90,0.08)"
        }}>
          <button onClick={() => setSidebarOpen(v => !v)} style={{ border: "none", background: "transparent", cursor: "pointer", color: T.textSecondary, padding: 4, display: "flex", borderRadius: 6 }}>
            <i className="ti ti-menu-2" style={{ fontSize: 20 }} aria-hidden="true" />
          </button>

          {/* Awning decoration on topbar */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 3, height: 18, background: T.accent, borderRadius: 2 }} />
            <div style={{ width: 3, height: 18, background: T.primary, borderRadius: 2 }} />
            <div style={{ width: 3, height: 18, background: T.accent, borderRadius: 2 }} />
          </div>

          <span style={{ fontWeight: 500, fontSize: 15, color: T.textPrimary }}>
            {nav.find(n => n.id === page)?.label}
          </span>

          {lowStockCount > 0 && page !== "alerts" && (
            <button onClick={() => setPage("alerts")} style={{
              marginLeft: "auto", display: "flex", alignItems: "center", gap: 6,
              background: T.redLight, border: `1px solid rgba(192,57,43,0.25)`,
              borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontSize: 12, color: T.red
            }}>
              <i className="ti ti-alert-triangle" style={{ fontSize: 14 }} aria-hidden="true" />
              สินค้าใกล้หมด {lowStockCount} รายการ
            </button>
          )}
        </div>

        {/* Page content */}
        <div style={{ flex: 1, overflow: "auto", padding: "22px 24px" }}>
          {page === "dashboard" && <Dashboard {...props} setPage={setPage} />}
          {page === "products" && <Products {...props} />}
          {page === "categories" && <Categories {...props} />}
          {page === "stockin" && <StockIn {...props} />}
          {page === "stockout" && <StockOut {...props} />}
          {page === "history" && <History {...props} />}
          {page === "alerts" && <Alerts {...props} />}
          {page === "reports" && <Reports {...props} user={user} />}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 24, right: 24,
          background: toast.type === "success" ? T.green : toast.type === "error" ? T.red : T.dark,
          color: "#fff", padding: "11px 18px", borderRadius: 10, fontSize: 13,
          zIndex: 9999, display: "flex", alignItems: "center", gap: 9,
          boxShadow: "0 6px 20px rgba(0,0,0,0.18)"
        }}>
          <i className={`ti ${toast.type === "success" ? "ti-circle-check" : toast.type === "error" ? "ti-circle-x" : "ti-info-circle"}`} style={{ fontSize: 17 }} aria-hidden="true" />
          {toast.msg}
        </div>
      )}
    </div>
  );
}

// ===== LOGIN =====
function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handle = () => {
    const u = USERS.find(u => u.username === username && u.password === password);
    if (u) onLogin(u);
    else setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
  };

  return (
    <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-sans)", position: "relative", overflow: "hidden" }}>
      {/* Decorative awning stripes background */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 8, background: `repeating-linear-gradient(90deg, ${T.accent} 0px, ${T.accent} 20px, ${T.primary} 20px, ${T.primary} 40px)` }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 8, background: `repeating-linear-gradient(90deg, ${T.primary} 0px, ${T.primary} 20px, ${T.accent} 20px, ${T.accent} 40px)` }} />

      <div style={{ background: T.surface, borderRadius: 20, padding: "40px 40px 36px", width: 380, border: `1px solid ${T.border}`, boxShadow: "0 12px 48px rgba(61,43,31,0.12)", position: "relative" }}>
        {/* Top awning accent */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, borderRadius: "20px 20px 0 0", background: `repeating-linear-gradient(90deg, ${T.accent} 0px, ${T.accent} 15px, ${T.primary} 15px, ${T.primary} 30px)` }} />

        {/* Logo + Title */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 28, marginTop: 8 }}>
          <ShopLogo size={72} />
          <div style={{ fontSize: 22, fontWeight: 500, color: T.dark, marginTop: 14, letterSpacing: "0.01em" }}>Sofilan Shop</div>
          <div style={{ fontSize: 12, color: T.textMuted, marginTop: 2 }}>ระบบบริหารจัดการสต็อกสินค้า</div>
          <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
            {["●", "●", "●"].map((d, i) => <span key={i} style={{ fontSize: 8, color: i === 1 ? T.primary : T.accent }}>{d}</span>)}
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, color: T.textSecondary, display: "block", marginBottom: 5, fontWeight: 500 }}>ชื่อผู้ใช้</label>
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="admin หรือ staff"
            style={{ width: "100%", boxSizing: "border-box", borderRadius: 10, border: `1.5px solid ${T.border}`, padding: "9px 12px", fontSize: 13, color: T.textPrimary, outline: "none", background: T.bg }} />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: 12, color: T.textSecondary, display: "block", marginBottom: 5, fontWeight: 500 }}>รหัสผ่าน</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="รหัสผ่าน"
            style={{ width: "100%", boxSizing: "border-box", borderRadius: 10, border: `1.5px solid ${T.border}`, padding: "9px 12px", fontSize: 13, color: T.textPrimary, outline: "none", background: T.bg }}
            onKeyDown={e => e.key === "Enter" && handle()} />
        </div>
        {error && (
          <div style={{ background: T.redLight, border: `1px solid rgba(192,57,43,0.25)`, borderRadius: 8, padding: "8px 12px", fontSize: 12, color: T.red, marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
            <i className="ti ti-alert-circle" style={{ fontSize: 14 }} aria-hidden="true" />{error}
          </div>
        )}
        <button onClick={handle} style={{
          width: "100%", background: `linear-gradient(135deg, ${T.primary} 0%, ${T.primaryDark} 100%)`,
          color: T.dark, border: "none", borderRadius: 10, padding: "11px", fontSize: 14,
          cursor: "pointer", fontWeight: 500, letterSpacing: "0.02em",
          boxShadow: `0 4px 14px rgba(245,166,35,0.4)`
        }}>
          เข้าสู่ระบบ
        </button>
        <div style={{ marginTop: 14, fontSize: 11, color: T.textMuted, background: T.primaryLight, borderRadius: 8, padding: "8px 12px", border: `1px solid rgba(245,166,35,0.2)` }}>
          <div>Admin: admin / admin123</div>
          <div>Staff: staff / staff123</div>
        </div>
      </div>
    </div>
  );
}

// ===== SHARED COMPONENTS =====
function Card({ children, style }) {
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "16px 20px", ...style }}>
      {children}
    </div>
  );
}

function SectionTitle({ icon, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <i className={`ti ${icon}`} style={{ fontSize: 16, color: T.primary }} aria-hidden="true" />
      </div>
      <span style={{ fontWeight: 500, fontSize: 15, color: T.textPrimary }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: T.border, marginLeft: 4 }} />
    </div>
  );
}

function StatCard({ icon, label, value, color, sub }) {
  return (
    <div style={{
      background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "16px 18px",
      display: "flex", alignItems: "flex-start", gap: 14,
      borderTop: `3px solid ${color}`
    }}>
      <div style={{ width: 46, height: 46, borderRadius: 12, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <i className={`ti ${icon}`} style={{ fontSize: 22, color }} aria-hidden="true" />
      </div>
      <div>
        <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 3, fontWeight: 500 }}>{label}</div>
        <div style={{ fontSize: 22, fontWeight: 500, color: T.textPrimary }}>{value}</div>
        {sub && <div style={{ fontSize: 11, color: T.textMuted, marginTop: 1 }}>{sub}</div>}
      </div>
    </div>
  );
}

function Btn({ onClick, children, variant = "primary", small, disabled, icon }) {
  const styles = {
    primary: { background: `linear-gradient(135deg, ${T.primary}, ${T.primaryDark})`, color: T.dark, border: "none", boxShadow: `0 3px 10px rgba(245,166,35,0.3)` },
    danger: { background: T.redLight, color: T.red, border: `1px solid rgba(192,57,43,0.2)` },
    ghost: { background: "transparent", color: T.textSecondary, border: `1px solid ${T.borderMed}` },
    green: { background: `linear-gradient(135deg, ${T.green}, #2e7349)`, color: "#fff", border: "none", boxShadow: `0 3px 10px rgba(58,140,92,0.3)` },
    red: { background: `linear-gradient(135deg, ${T.red}, #a93226)`, color: "#fff", border: "none", boxShadow: `0 3px 10px rgba(192,57,43,0.3)` },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
      padding: small ? "5px 12px" : "8px 16px",
      borderRadius: 9, fontSize: small ? 12 : 13, cursor: disabled ? "not-allowed" : "pointer",
      fontWeight: 500, whiteSpace: "nowrap", opacity: disabled ? 0.5 : 1,
      ...styles[variant]
    }}>
      {icon && <i className={`ti ${icon}`} style={{ fontSize: small ? 14 : 16 }} aria-hidden="true" />}
      {children}
    </button>
  );
}

function BadgeType({ type }) {
  const isIn = type === "IN";
  return (
    <span style={{
      background: isIn ? T.greenLight : T.redLight,
      color: isIn ? T.green : T.red,
      fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 5,
      border: `1px solid ${isIn ? "rgba(58,140,92,0.2)" : "rgba(192,57,43,0.2)"}`,
      whiteSpace: "nowrap"
    }}>
      {isIn ? "รับเข้า" : "เบิกออก"}
    </span>
  );
}

function ModalOverlay({ children, onClose, title }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(61,43,31,0.45)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
      onClick={onClose}>
      <div style={{ background: T.surface, borderRadius: 18, width: "100%", maxWidth: 540, maxHeight: "88vh", overflowY: "auto", position: "relative", boxShadow: "0 20px 60px rgba(61,43,31,0.25)" }}
        onClick={e => e.stopPropagation()}>
        {/* Modal header awning */}
        <div style={{ height: 5, borderRadius: "18px 18px 0 0", background: `repeating-linear-gradient(90deg, ${T.accent} 0px, ${T.accent} 12px, ${T.primary} 12px, ${T.primary} 24px)` }} />
        <div style={{ padding: "18px 24px 24px" }}>
          {title && <div style={{ fontWeight: 500, fontSize: 16, color: T.textPrimary, marginBottom: 18, paddingRight: 28 }}>{title}</div>}
          <button onClick={onClose} style={{ position: "absolute", top: 14, right: 16, border: "none", background: T.midLight, cursor: "pointer", color: T.textSecondary, fontSize: 16, lineHeight: 1, borderRadius: 6, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <i className="ti ti-x" aria-hidden="true" />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <div>
      <label style={{ fontSize: 12, color: T.textSecondary, display: "block", marginBottom: 4, fontWeight: 500 }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = { width: "100%", boxSizing: "border-box", borderRadius: 9, border: `1.5px solid ${T.border}`, padding: "8px 11px", fontSize: 13, color: T.textPrimary, background: T.bg, outline: "none" };

// ===== DASHBOARD =====
function Dashboard({ products, categories, history, setPage }) {
  const lowStock = products.filter(p => p.quantity <= p.minStock);
  const recent = [...history].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 8);
  const totalValue = products.reduce((s, p) => s + p.quantity * p.buyPrice, 0);

  return (
    <div>
      {/* Welcome banner */}
      <div style={{
        background: `linear-gradient(135deg, ${T.dark} 0%, #5a3d28 100%)`,
        borderRadius: 16, padding: "20px 24px", marginBottom: 20,
        display: "flex", alignItems: "center", gap: 16,
        border: `1px solid rgba(245,166,35,0.15)`,
        overflow: "hidden", position: "relative"
      }}>
        <div style={{ position: "absolute", right: -20, top: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(245,166,35,0.08)" }} />
        <div style={{ position: "absolute", right: 40, bottom: -30, width: 80, height: 80, borderRadius: "50%", background: "rgba(224,92,58,0.1)" }} />
        <ShopLogo size={52} />
        <div>
          <div style={{ color: T.primary, fontWeight: 500, fontSize: 18 }}>ยินดีต้อนรับสู่ Sofilan Shop</div>
          <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, marginTop: 2 }}>ระบบบริหารจัดการสต็อกสินค้า · Since 2023</div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>มูลค่าสต็อกรวม</div>
          <div style={{ color: T.primary, fontSize: 20, fontWeight: 500 }}>฿{fmtPrice(totalValue)}</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 12, marginBottom: 20 }}>
        <StatCard icon="ti-box" label="สินค้าทั้งหมด" value={products.length} color={T.primary} sub={`${products.reduce((s, p) => s + p.quantity, 0)} ชิ้น`} />
        <StatCard icon="ti-category" label="หมวดหมู่" value={categories.length} color={T.mid} sub="หมวดหมู่ที่ใช้งาน" />
        <StatCard icon="ti-alert-triangle" label="สินค้าใกล้หมด" value={lowStock.length} color={T.red} sub="ต่ำกว่าขั้นต่ำ" />
        <StatCard icon="ti-currency-baht" label="มูลค่าสต็อก" value={`฿${fmtPrice(totalValue)}`} color={T.green} sub="ราคาซื้อรวม" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <SectionTitle icon="ti-activity">ความเคลื่อนไหวล่าสุด</SectionTitle>
          {recent.map(h => {
            const p = products.find(p => p.id === h.productId) || { name: "?" };
            return (
              <div key={h.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: `1px solid ${T.border}` }}>
                <BadgeType type={h.type} />
                <span style={{ flex: 1, fontSize: 13, color: T.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: h.type === "IN" ? T.green : T.red, flexShrink: 0 }}>{h.type === "IN" ? "+" : "-"}{h.quantity}</span>
              </div>
            );
          })}
        </Card>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: T.redLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <i className="ti ti-alert-triangle" style={{ fontSize: 16, color: T.red }} aria-hidden="true" />
              </div>
              <span style={{ fontWeight: 500, fontSize: 15, color: T.textPrimary }}>สินค้าใกล้หมด</span>
            </div>
            {lowStock.length > 0 && (
              <button onClick={() => setPage("alerts")} style={{ fontSize: 12, color: T.primary, background: "transparent", border: "none", cursor: "pointer", padding: 0, fontWeight: 500 }}>ดูทั้งหมด →</button>
            )}
          </div>
          {lowStock.length === 0 ? (
            <div style={{ textAlign: "center", padding: "28px 0", color: T.textMuted, fontSize: 13 }}>
              <i className="ti ti-circle-check" style={{ fontSize: 36, color: T.green, display: "block", marginBottom: 8 }} aria-hidden="true" />
              สินค้าทุกรายการมีสต็อกเพียงพอ
            </div>
          ) : lowStock.map(p => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: `1px solid ${T.border}` }}>
              <i className="ti ti-alert-circle" style={{ fontSize: 16, color: T.red, flexShrink: 0 }} aria-hidden="true" />
              <span style={{ flex: 1, fontSize: 13, color: T.textPrimary }}>{p.name}</span>
              <span style={{ fontSize: 13, color: T.red, fontWeight: 500 }}>{p.quantity} {p.unit}</span>
              <span style={{ fontSize: 11, color: T.textMuted }}>/ {p.minStock}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ===== PRODUCTS =====
function Products({ user, products, setProducts, categories, showToast }) {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState(null);
  const [uploading, setUploading] = useState(false);
  const perPage = 6;

  const filtered = products.filter(p =>
    (p.name.includes(search) || p.sku.includes(search)) &&
    (!catFilter || p.categoryId === parseInt(catFilter))
  );
  const total = filtered.length;
  const paged = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
  const pages = Math.ceil(total / perPage);

  const empty = { sku: "", name: "", description: "", buyPrice: "", sellPrice: "", quantity: "", minStock: "", unit: "ชิ้น", categoryId: "", image: "" };
  const [form, setForm] = useState(empty);

  const openAdd = () => { setForm(empty); setModal("add"); };
  const openEdit = (p) => { setForm({ ...p }); setModal("edit"); };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: "POST", body: fd });
      const data = await res.json();
      if (data.secure_url) setForm(f => ({ ...f, image: data.secure_url }));
      else {
        const reader = new FileReader();
        reader.onload = (ev) => setForm(f => ({ ...f, image: ev.target.result }));
        reader.readAsDataURL(file);
      }
    } catch {
      const reader = new FileReader();
      reader.onload = (ev) => setForm(f => ({ ...f, image: ev.target.result }));
      reader.readAsDataURL(file);
    }
    setUploading(false);
  };

  const save = () => {
    if (!form.name || !form.sku) return showToast("กรุณากรอก SKU และชื่อสินค้า", "error");
    if (modal === "add") {
      setProducts(prev => [...prev, { ...form, id: Date.now(), buyPrice: parseFloat(form.buyPrice) || 0, sellPrice: parseFloat(form.sellPrice) || 0, quantity: parseInt(form.quantity) || 0, minStock: parseInt(form.minStock) || 0, categoryId: parseInt(form.categoryId) }]);
      showToast("เพิ่มสินค้าสำเร็จ");
    } else {
      setProducts(prev => prev.map(p => p.id === form.id ? { ...form, buyPrice: parseFloat(form.buyPrice) || 0, sellPrice: parseFloat(form.sellPrice) || 0, quantity: parseInt(form.quantity) || 0, minStock: parseInt(form.minStock) || 0, categoryId: parseInt(form.categoryId) } : p));
      showToast("แก้ไขสินค้าสำเร็จ");
    }
    setModal(null);
  };

  const del = (id) => {
    if (!confirm("ยืนยันการลบสินค้า?")) return;
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast("ลบสินค้าสำเร็จ");
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ flex: 1, minWidth: 180, position: "relative" }}>
          <i className="ti ti-search" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: T.textMuted }} aria-hidden="true" />
          <input value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} placeholder="ค้นหาสินค้า..."
            style={{ ...inputStyle, paddingLeft: 32 }} />
        </div>
        <select value={catFilter} onChange={e => { setCatFilter(e.target.value); setCurrentPage(1); }}
          style={{ ...inputStyle, width: 160 }}>
          <option value="">ทุกหมวดหมู่</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        {user.role === "admin" && <Btn onClick={openAdd} icon="ti-plus">เพิ่มสินค้า</Btn>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14, marginBottom: 16 }}>
        {paged.map(p => {
          const cat = categories.find(c => c.id === p.categoryId);
          const low = p.quantity <= p.minStock;
          return (
            <div key={p.id} style={{ background: T.surface, border: `1px solid ${low ? "rgba(192,57,43,0.25)" : T.border}`, borderRadius: 14, overflow: "hidden", borderTop: `3px solid ${low ? T.red : T.primary}` }}>
              <div style={{ height: 140, background: T.midLight, overflow: "hidden", position: "relative" }}>
                {p.image
                  ? <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: T.textMuted }}>
                    <i className="ti ti-photo" style={{ fontSize: 40 }} aria-hidden="true" />
                  </div>}
                {low && (
                  <span style={{ position: "absolute", top: 8, right: 8, background: T.red, color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 5 }}>ใกล้หมด</span>
                )}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(61,43,31,0.5))", height: 40 }} />
              </div>
              <div style={{ padding: "12px 14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                  <div style={{ fontWeight: 500, fontSize: 14, color: T.textPrimary, flex: 1 }}>{p.name}</div>
                  <div style={{ fontSize: 10, color: T.textMuted, marginLeft: 6, background: T.bg, borderRadius: 4, padding: "1px 5px" }}>{p.sku}</div>
                </div>
                {cat && (
                  <div style={{ fontSize: 11, color: T.primaryDark, background: T.primaryLight, padding: "2px 8px", borderRadius: 5, display: "inline-block", marginBottom: 8, fontWeight: 500 }}>{cat.name}</div>
                )}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, fontSize: 12, marginBottom: 10 }}>
                  <div style={{ color: T.textMuted }}>ซื้อ: <span style={{ color: T.textPrimary, fontWeight: 500 }}>฿{fmtPrice(p.buyPrice)}</span></div>
                  <div style={{ color: T.textMuted }}>ขาย: <span style={{ color: T.textPrimary, fontWeight: 500 }}>฿{fmtPrice(p.sellPrice)}</span></div>
                  <div style={{ color: T.textMuted }}>คงเหลือ: <span style={{ color: low ? T.red : T.green, fontWeight: 500 }}>{p.quantity} {p.unit}</span></div>
                  <div style={{ color: T.textMuted }}>ขั้นต่ำ: <span style={{ color: T.textPrimary }}>{p.minStock}</span></div>
                </div>
                {user.role === "admin" && (
                  <div style={{ display: "flex", gap: 6 }}>
                    <Btn onClick={() => openEdit(p)} variant="ghost" small icon="ti-edit">แก้ไข</Btn>
                    <Btn onClick={() => del(p.id)} variant="danger" small icon="ti-trash">ลบ</Btn>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {pages > 1 && (
        <div style={{ display: "flex", gap: 6, alignItems: "center", justifyContent: "center" }}>
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
            style={{ padding: "6px 12px", borderRadius: 7, border: `1px solid ${T.borderMed}`, background: "transparent", cursor: "pointer", color: T.textSecondary }}>←</button>
          {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setCurrentPage(p)}
              style={{ padding: "6px 12px", borderRadius: 7, border: `1px solid ${p === currentPage ? T.primary : T.borderMed}`, background: p === currentPage ? T.primary : "transparent", color: p === currentPage ? T.dark : T.textSecondary, cursor: "pointer", fontWeight: p === currentPage ? 500 : 400 }}>{p}</button>
          ))}
          <button onClick={() => setCurrentPage(p => Math.min(pages, p + 1))} disabled={currentPage === pages}
            style={{ padding: "6px 12px", borderRadius: 7, border: `1px solid ${T.borderMed}`, background: "transparent", cursor: "pointer", color: T.textSecondary }}>→</button>
          <span style={{ fontSize: 12, color: T.textMuted }}>รวม {total} รายการ</span>
        </div>
      )}

      {modal && (
        <ModalOverlay onClose={() => setModal(null)} title={modal === "add" ? "เพิ่มสินค้าใหม่" : "แก้ไขสินค้า"}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[["sku", "SKU *"], ["name", "ชื่อสินค้า *"], ["unit", "หน่วยนับ"], ["buyPrice", "ราคาซื้อ"], ["sellPrice", "ราคาขาย"], ["quantity", "จำนวนคงเหลือ"], ["minStock", "จำนวนขั้นต่ำ"]].map(([k, lbl]) => (
              <FormField key={k} label={lbl}>
                <input value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
                  type={["buyPrice", "sellPrice", "quantity", "minStock"].includes(k) ? "number" : "text"}
                  style={inputStyle} />
              </FormField>
            ))}
            <FormField label="หมวดหมู่">
              <select value={form.categoryId} onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))} style={inputStyle}>
                <option value="">-- เลือกหมวดหมู่ --</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </FormField>
          </div>
          <div style={{ marginTop: 10 }}>
            <FormField label="รายละเอียด">
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} style={{ ...inputStyle, resize: "vertical" }} />
            </FormField>
          </div>
          <div style={{ marginTop: 10 }}>
            <FormField label="รูปภาพสินค้า (Cloudinary)">
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: 4 }}>
                {form.image ? (
                  <img src={form.image} alt="" style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 10, border: `1px solid ${T.border}` }} />
                ) : (
                  <div style={{ width: 64, height: 64, borderRadius: 10, background: T.midLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <i className="ti ti-photo" style={{ fontSize: 24, color: T.textMuted }} aria-hidden="true" />
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <input type="file" accept="image/*" onChange={handleUpload} style={{ fontSize: 12 }} />
                  {uploading && <div style={{ fontSize: 12, color: T.primary, marginTop: 4 }}>กำลังอัปโหลด...</div>}
                  <div style={{ fontSize: 11, color: T.textMuted, marginTop: 4 }}>Cloudinary cloud: {CLOUDINARY_CLOUD_NAME}</div>
                </div>
              </div>
            </FormField>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 20, justifyContent: "flex-end" }}>
            <Btn onClick={() => setModal(null)} variant="ghost">ยกเลิก</Btn>
            <Btn onClick={save}>บันทึก</Btn>
          </div>
        </ModalOverlay>
      )}
    </div>
  );
}

// ===== CATEGORIES =====
function Categories({ user, categories, setCategories, showToast }) {
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name: "", description: "" });

  const filtered = categories.filter(c => c.name.includes(search) || c.description?.includes(search));
  const save = () => {
    if (!form.name) return showToast("กรุณากรอกชื่อหมวดหมู่", "error");
    if (modal === "add") {
      setCategories(prev => [...prev, { ...form, id: Date.now() }]);
      showToast("เพิ่มหมวดหมู่สำเร็จ");
    } else {
      setCategories(prev => prev.map(c => c.id === form.id ? form : c));
      showToast("แก้ไขหมวดหมู่สำเร็จ");
    }
    setModal(null);
  };
  const del = (id) => {
    if (!confirm("ยืนยันการลบหมวดหมู่?")) return;
    setCategories(prev => prev.filter(c => c.id !== id));
    showToast("ลบหมวดหมู่สำเร็จ");
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 18, alignItems: "center" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <i className="ti ti-search" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: T.textMuted }} aria-hidden="true" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ค้นหาหมวดหมู่..." style={{ ...inputStyle, paddingLeft: 32 }} />
        </div>
        {user.role === "admin" && <Btn onClick={() => { setForm({ name: "", description: "" }); setModal("add"); }} icon="ti-plus">เพิ่มหมวดหมู่</Btn>}
      </div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: T.primaryLight }}>
              {["#", "ชื่อหมวดหมู่", "รายละเอียด", ...(user.role === "admin" ? ["จัดการ"] : [])].map(h => (
                <th key={h} style={{ padding: "11px 16px", textAlign: "left", fontWeight: 500, color: T.primaryDark, borderBottom: `2px solid ${T.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={c.id} style={{ borderBottom: `1px solid ${T.border}`, background: i % 2 === 0 ? T.surface : T.bg }}>
                <td style={{ padding: "11px 16px", color: T.textMuted, fontWeight: 500 }}>{i + 1}</td>
                <td style={{ padding: "11px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 7, background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <i className="ti ti-tag" style={{ fontSize: 14, color: T.primary }} aria-hidden="true" />
                    </div>
                    <span style={{ fontWeight: 500, color: T.textPrimary }}>{c.name}</span>
                  </div>
                </td>
                <td style={{ padding: "11px 16px", color: T.textSecondary }}>{c.description}</td>
                {user.role === "admin" && (
                  <td style={{ padding: "11px 16px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <Btn onClick={() => { setForm({ ...c }); setModal("edit"); }} variant="ghost" small icon="ti-edit">แก้ไข</Btn>
                      <Btn onClick={() => del(c.id)} variant="danger" small icon="ti-trash">ลบ</Btn>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {modal && (
        <ModalOverlay onClose={() => setModal(null)} title={modal === "add" ? "เพิ่มหมวดหมู่" : "แก้ไขหมวดหมู่"}>
          <div style={{ marginBottom: 10 }}>
            <FormField label="ชื่อหมวดหมู่ *">
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} />
            </FormField>
          </div>
          <div style={{ marginBottom: 18 }}>
            <FormField label="รายละเอียด">
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} style={{ ...inputStyle, resize: "vertical" }} />
            </FormField>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <Btn onClick={() => setModal(null)} variant="ghost">ยกเลิก</Btn>
            <Btn onClick={save}>บันทึก</Btn>
          </div>
        </ModalOverlay>
      )}
    </div>
  );
}

// ===== STOCK IN =====
function StockIn({ user, products, setProducts, history, setHistory, showToast }) {
  const [productId, setProductId] = useState("");
  const [qty, setQty] = useState("");
  const [note, setNote] = useState("");

  const submit = () => {
    if (!productId || !qty || parseInt(qty) <= 0) return showToast("กรุณาเลือกสินค้าและระบุจำนวน", "error");
    const n = parseInt(qty);
    setProducts(prev => prev.map(p => p.id === parseInt(productId) ? { ...p, quantity: p.quantity + n } : p));
    setHistory(prev => [{ id: Date.now(), type: "IN", productId: parseInt(productId), quantity: n, note, userId: user.id, date: new Date().toISOString() }, ...prev]);
    showToast(`รับสินค้าเข้า ${n} ชิ้น สำเร็จ`);
    setProductId(""); setQty(""); setNote("");
  };

  const p = products.find(p => p.id === parseInt(productId));

  return (
    <div style={{ maxWidth: 560 }}>
      <Card style={{ border: `1px solid ${T.border}`, borderTop: `4px solid ${T.green}` }}>
        <SectionTitle icon="ti-package-import">รับสินค้าเข้า</SectionTitle>
        <div style={{ marginBottom: 14 }}>
          <FormField label="เลือกสินค้า">
            <select value={productId} onChange={e => setProductId(e.target.value)} style={inputStyle}>
              <option value="">-- เลือกสินค้า --</option>
              {products.map(p => <option key={p.id} value={p.id}>{p.sku} - {p.name}</option>)}
            </select>
          </FormField>
        </div>
        {p && (
          <div style={{ background: T.greenLight, borderRadius: 10, padding: "12px 14px", marginBottom: 14, border: `1px solid rgba(58,140,92,0.2)`, display: "flex", gap: 10, alignItems: "center" }}>
            {p.image && <img src={p.image} alt="" style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 8 }} />}
            <div>
              <div style={{ fontWeight: 500, fontSize: 13, color: T.dark }}>{p.name}</div>
              <div style={{ fontSize: 12, color: T.green }}>คงเหลือ: <b>{p.quantity} {p.unit}</b></div>
            </div>
          </div>
        )}
        <div style={{ marginBottom: 14 }}>
          <FormField label="จำนวนที่รับเข้า">
            <input type="number" min="1" value={qty} onChange={e => setQty(e.target.value)} placeholder="ระบุจำนวน" style={inputStyle} />
          </FormField>
        </div>
        <div style={{ marginBottom: 20 }}>
          <FormField label="หมายเหตุ">
            <textarea value={note} onChange={e => setNote(e.target.value)} rows={2} placeholder="เช่น รับจาก Supplier A" style={{ ...inputStyle, resize: "vertical" }} />
          </FormField>
        </div>
        <Btn onClick={submit} variant="green" icon="ti-package-import">
          <span style={{ flex: 1 }}>บันทึกการรับสินค้าเข้า</span>
        </Btn>
      </Card>
    </div>
  );
}

// ===== STOCK OUT =====
function StockOut({ user, products, setProducts, history, setHistory, showToast }) {
  const [productId, setProductId] = useState("");
  const [qty, setQty] = useState("");
  const [note, setNote] = useState("");

  const submit = () => {
    if (!productId || !qty || parseInt(qty) <= 0) return showToast("กรุณาเลือกสินค้าและระบุจำนวน", "error");
    const n = parseInt(qty);
    const p = products.find(p => p.id === parseInt(productId));
    if (!p) return;
    if (n > p.quantity) return showToast(`ไม่สามารถเบิกได้ คงเหลือเพียง ${p.quantity} ${p.unit}`, "error");
    setProducts(prev => prev.map(pp => pp.id === parseInt(productId) ? { ...pp, quantity: pp.quantity - n } : pp));
    setHistory(prev => [{ id: Date.now(), type: "OUT", productId: parseInt(productId), quantity: n, note, userId: user.id, date: new Date().toISOString() }, ...prev]);
    showToast(`เบิกสินค้าออก ${n} ชิ้น สำเร็จ`);
    setProductId(""); setQty(""); setNote("");
  };

  const p = products.find(p => p.id === parseInt(productId));
  const tooMany = p && parseInt(qty) > p.quantity;

  return (
    <div style={{ maxWidth: 560 }}>
      <Card style={{ border: `1px solid ${T.border}`, borderTop: `4px solid ${T.accent}` }}>
        <SectionTitle icon="ti-package-export">เบิกสินค้าออก</SectionTitle>
        <div style={{ marginBottom: 14 }}>
          <FormField label="เลือกสินค้า">
            <select value={productId} onChange={e => setProductId(e.target.value)} style={inputStyle}>
              <option value="">-- เลือกสินค้า --</option>
              {products.map(p => <option key={p.id} value={p.id}>{p.sku} - {p.name} (คงเหลือ: {p.quantity})</option>)}
            </select>
          </FormField>
        </div>
        {p && (
          <div style={{ background: p.quantity <= p.minStock ? T.redLight : T.midLight, borderRadius: 10, padding: "12px 14px", marginBottom: 14, border: `1px solid ${p.quantity <= p.minStock ? "rgba(192,57,43,0.2)" : T.border}`, display: "flex", gap: 10, alignItems: "center" }}>
            {p.image && <img src={p.image} alt="" style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 8 }} />}
            <div>
              <div style={{ fontWeight: 500, fontSize: 13, color: T.dark }}>{p.name}</div>
              <div style={{ fontSize: 12, color: p.quantity > p.minStock ? T.green : T.red }}>คงเหลือ: <b>{p.quantity} {p.unit}</b></div>
            </div>
          </div>
        )}
        <div style={{ marginBottom: 14 }}>
          <FormField label="จำนวนที่เบิก">
            <input type="number" min="1" value={qty} onChange={e => setQty(e.target.value)} placeholder="ระบุจำนวน"
              style={{ ...inputStyle, borderColor: tooMany ? T.red : T.border }} />
            {tooMany && <div style={{ fontSize: 12, color: T.red, marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
              <i className="ti ti-alert-circle" style={{ fontSize: 13 }} aria-hidden="true" />
              จำนวนเบิกเกินสต็อกที่มี ({p.quantity} {p.unit})
            </div>}
          </FormField>
        </div>
        <div style={{ marginBottom: 20 }}>
          <FormField label="หมายเหตุ">
            <textarea value={note} onChange={e => setNote(e.target.value)} rows={2} placeholder="เช่น เบิกใช้ฝ่ายการตลาด" style={{ ...inputStyle, resize: "vertical" }} />
          </FormField>
        </div>
        <Btn onClick={submit} variant={tooMany ? "ghost" : "red"} disabled={tooMany} icon="ti-package-export">
          บันทึกการเบิกสินค้าออก
        </Btn>
      </Card>
    </div>
  );
}

// ===== HISTORY =====
function History({ products, history }) {
  const [typeFilter, setTypeFilter] = useState("");
  const [search, setSearch] = useState("");
  const filtered = history.filter(h => {
    const p = products.find(p => p.id === h.productId);
    return (!typeFilter || h.type === typeFilter) && (!search || p?.name.includes(search) || p?.sku.includes(search));
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 18, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 160, position: "relative" }}>
          <i className="ti ti-search" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: T.textMuted }} aria-hidden="true" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ค้นหาสินค้า..." style={{ ...inputStyle, paddingLeft: 32 }} />
        </div>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ ...inputStyle, width: 140 }}>
          <option value="">ทุกประเภท</option>
          <option value="IN">รับเข้า</option>
          <option value="OUT">เบิกออก</option>
        </select>
        <div style={{ fontSize: 12, color: T.textMuted }}>ทั้งหมด {filtered.length} รายการ</div>
      </div>
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: T.primaryLight }}>
              {["ประเภท", "สินค้า", "จำนวน", "หมายเหตุ", "วันที่", "ผู้ดำเนินการ"].map(h => (
                <th key={h} style={{ padding: "11px 16px", textAlign: "left", fontWeight: 500, color: T.primaryDark, borderBottom: `2px solid ${T.border}`, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((h, i) => {
              const p = products.find(p => p.id === h.productId);
              const u = USERS.find(u => u.id === h.userId);
              return (
                <tr key={h.id} style={{ borderBottom: `1px solid ${T.border}`, background: i % 2 === 0 ? T.surface : T.bg }}>
                  <td style={{ padding: "10px 16px" }}><BadgeType type={h.type} /></td>
                  <td style={{ padding: "10px 16px", fontWeight: 500, color: T.textPrimary }}>{p?.name || "?"}</td>
                  <td style={{ padding: "10px 16px", fontWeight: 500, color: h.type === "IN" ? T.green : T.red }}>{h.type === "IN" ? "+" : "-"}{h.quantity}</td>
                  <td style={{ padding: "10px 16px", color: T.textSecondary, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{h.note || "-"}</td>
                  <td style={{ padding: "10px 16px", color: T.textMuted, whiteSpace: "nowrap", fontSize: 12 }}>{fmtDate(h.date)}</td>
                  <td style={{ padding: "10px 16px", color: T.textSecondary }}>{u?.name || "?"}</td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr><td colSpan={6} style={{ padding: "32px", textAlign: "center", color: T.textMuted }}>ไม่พบข้อมูล</td></tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ===== ALERTS =====
function Alerts({ products, categories }) {
  const low = products.filter(p => p.quantity <= p.minStock);
  return (
    <div>
      <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 9, background: T.redLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <i className="ti ti-alert-triangle" style={{ fontSize: 18, color: T.red }} aria-hidden="true" />
        </div>
        <div>
          <div style={{ fontWeight: 500, fontSize: 15, color: T.textPrimary }}>สินค้าใกล้หมด</div>
          <div style={{ fontSize: 12, color: T.textMuted }}>{low.length} รายการที่ต้องเติมสต็อก</div>
        </div>
      </div>
      {low.length === 0 ? (
        <Card style={{ textAlign: "center", padding: "48px 20px", border: `1px solid ${T.border}`, borderTop: `4px solid ${T.green}` }}>
          <i className="ti ti-circle-check" style={{ fontSize: 52, color: T.green, display: "block", marginBottom: 12 }} aria-hidden="true" />
          <div style={{ fontWeight: 500, fontSize: 15, color: T.textPrimary, marginBottom: 4 }}>สินค้าทุกรายการมีสต็อกเพียงพอ</div>
          <div style={{ fontSize: 13, color: T.textMuted }}>ไม่มีสินค้าที่ต่ำกว่าจำนวนขั้นต่ำ</div>
        </Card>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
          {low.map(p => {
            const cat = categories.find(c => c.id === p.categoryId);
            const pct = Math.round((p.quantity / Math.max(p.minStock, 1)) * 100);
            const color = pct < 30 ? T.red : T.accent;
            return (
              <Card key={p.id} style={{ border: `1px solid rgba(192,57,43,0.2)`, borderTop: `3px solid ${color}` }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
                  {p.image
                    ? <img src={p.image} alt="" style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 10, flexShrink: 0 }} />
                    : <div style={{ width: 50, height: 50, borderRadius: 10, background: T.midLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <i className="ti ti-box" style={{ fontSize: 22, color: T.textMuted }} aria-hidden="true" />
                    </div>}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 500, fontSize: 14, color: T.textPrimary, marginBottom: 2 }}>{p.name}</div>
                    <div style={{ fontSize: 11 }}>
                      <span style={{ color: T.primaryDark, background: T.primaryLight, padding: "1px 7px", borderRadius: 4, fontWeight: 500 }}>{cat?.name || ""}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
                  <span style={{ color: T.textMuted }}>คงเหลือ: <b style={{ color: T.red }}>{p.quantity} {p.unit}</b></span>
                  <span style={{ color: T.textMuted }}>ขั้นต่ำ: {p.minStock} {p.unit}</span>
                </div>
                <div style={{ background: T.bg, borderRadius: 6, height: 8, overflow: "hidden", border: `1px solid ${T.border}` }}>
                  <div style={{ width: `${Math.min(100, pct)}%`, height: "100%", background: color, borderRadius: 6, transition: "width 0.3s" }} />
                </div>
                <div style={{ fontSize: 11, color, marginTop: 4, textAlign: "right", fontWeight: 500 }}>{pct}% ของขั้นต่ำ</div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ===== REPORTS =====
function Reports({ products, categories, history, setProducts, setCategories, setHistory, showToast, user }) {
  const exportCSV = () => {
    const rows = [
      ["SKU", "ชื่อสินค้า", "หมวดหมู่", "ราคาซื้อ", "ราคาขาย", "จำนวนคงเหลือ", "จำนวนขั้นต่ำ", "หน่วย", "สถานะ"],
      ...products.map(p => {
        const cat = categories.find(c => c.id === p.categoryId);
        return [p.sku, p.name, cat?.name || "", p.buyPrice, p.sellPrice, p.quantity, p.minStock, p.unit, p.quantity <= p.minStock ? "ใกล้หมด" : "ปกติ"];
      })
    ];
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "sofilan_stock.csv"; a.click();
  };

  const exportHistoryCSV = () => {
    const rows = [
      ["ประเภท", "SKU", "ชื่อสินค้า", "จำนวน", "หมายเหตุ", "วันที่", "ผู้ดำเนินการ"],
      ...history.sort((a, b) => new Date(b.date) - new Date(a.date)).map(h => {
        const p = products.find(p => p.id === h.productId);
        const u = USERS.find(u => u.id === h.userId);
        return [h.type === "IN" ? "รับเข้า" : "เบิกออก", p?.sku || "", p?.name || "", h.quantity, h.note || "", fmtDate(h.date), u?.name || ""];
      })
    ];
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "sofilan_history.csv"; a.click();
  };

  const exportPDF = () => {
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Sofilan Shop - รายงานสต็อก</title><style>
body{font-family:sans-serif;padding:24px;font-size:12px;color:#3D2B1F}
.header{display:flex;align-items:center;gap:12px;margin-bottom:4px;border-bottom:3px solid #F5A623;padding-bottom:12px}
h1{font-size:20px;margin:0;color:#3D2B1F}
.sub{font-size:11px;color:#C4865A}
table{width:100%;border-collapse:collapse;margin-top:16px}
th,td{border:1px solid #F5E6D8;padding:7px 10px;text-align:left}
th{background:#FEF3DC;font-weight:600;color:#D4891A}
tr:nth-child(even){background:#FFF8F0}
.low{color:#C0392B;font-weight:600}.ok{color:#3A8C5C}
</style></head><body>
<div class="header">
  <div style="width:48px;height:48px;background:#F5A623;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px">🏪</div>
  <div><h1>Sofilan Shop</h1><div class="sub">รายงานสต็อกสินค้า · พิมพ์วันที่ ${new Date().toLocaleString("th-TH")}</div></div>
</div>
<table><thead><tr><th>SKU</th><th>ชื่อสินค้า</th><th>หมวดหมู่</th><th>ราคาซื้อ</th><th>ราคาขาย</th><th>คงเหลือ</th><th>ขั้นต่ำ</th><th>สถานะ</th></tr></thead><tbody>
${products.map(p => {
      const cat = categories.find(c => c.id === p.categoryId);
      const low = p.quantity <= p.minStock;
      return `<tr><td>${p.sku}</td><td>${p.name}</td><td>${cat?.name || ""}</td><td>฿${fmtPrice(p.buyPrice)}</td><td>฿${fmtPrice(p.sellPrice)}</td><td class="${low ? "low" : "ok"}">${p.quantity} ${p.unit}</td><td>${p.minStock}</td><td class="${low ? "low" : "ok"}">${low ? "⚠ ใกล้หมด" : "✓ ปกติ"}</td></tr>`;
    }).join("")}
</tbody></table></body></html>`;
    const w = window.open("", "_blank");
    w.document.write(html); w.document.close(); w.print();
  };

  const resetData = () => {
    if (!confirm("⚠️ ยืนยันการรีเซ็ตข้อมูลทั้งหมด?\nสินค้า หมวดหมู่ และประวัติจะกลับเป็นค่าเริ่มต้น")) return;
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setHistory(INITIAL_HISTORY);
    showToast("รีเซ็ตข้อมูลเรียบร้อยแล้ว");
  };

  const storageSize = (() => {
    try {
      const keys = ["sofilan_products", "sofilan_categories", "sofilan_history"];
      const bytes = keys.reduce((s, k) => s + (localStorage.getItem(k) || "").length * 2, 0);
      return bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} KB`;
    } catch { return "N/A"; }
  })();

  const totalValue = products.reduce((s, p) => s + p.quantity * p.buyPrice, 0);
  const totalSellValue = products.reduce((s, p) => s + p.quantity * p.sellPrice, 0);
  const inCount = history.filter(h => h.type === "IN").reduce((s, h) => s + h.quantity, 0);
  const outCount = history.filter(h => h.type === "OUT").reduce((s, h) => s + h.quantity, 0);

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 20 }}>
        <StatCard icon="ti-currency-baht" label="มูลค่าสต็อก (ราคาซื้อ)" value={`฿${fmtPrice(totalValue)}`} color={T.primary} />
        <StatCard icon="ti-trending-up" label="มูลค่าสต็อก (ราคาขาย)" value={`฿${fmtPrice(totalSellValue)}`} color={T.green} />
        <StatCard icon="ti-package-import" label="รับเข้าทั้งหมด" value={inCount} color={T.mid} sub="ชิ้น" />
        <StatCard icon="ti-package-export" label="เบิกออกทั้งหมด" value={outCount} color={T.accent} sub="ชิ้น" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <SectionTitle icon="ti-download">ดาวน์โหลดรายงาน</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "Export สินค้า (Excel/CSV)", sub: "รายการสินค้าทั้งหมด", icon: "ti-file-spreadsheet", color: T.green, onClick: exportCSV },
              { label: "Export ประวัติ (Excel/CSV)", sub: "ประวัติการรับ/เบิกสินค้า", icon: "ti-file-spreadsheet", color: T.mid, onClick: exportHistoryCSV },
              { label: "Export PDF", sub: "รายงานสต็อกพร้อมพิมพ์", icon: "ti-file-type-pdf", color: T.red, onClick: exportPDF },
            ].map(b => (
              <button key={b.label} onClick={b.onClick} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                border: `1px solid ${T.border}`, borderRadius: 10, cursor: "pointer",
                background: T.bg, textAlign: "left"
              }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: b.color + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <i className={`ti ${b.icon}`} style={{ fontSize: 18, color: b.color }} aria-hidden="true" />
                </div>
                <div>
                  <div style={{ fontWeight: 500, fontSize: 13, color: T.textPrimary }}>{b.label}</div>
                  <div style={{ fontSize: 11, color: T.textMuted }}>{b.sub}</div>
                </div>
                <i className="ti ti-download" style={{ marginLeft: "auto", fontSize: 15, color: T.textMuted }} aria-hidden="true" />
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle icon="ti-chart-pie">สรุปตามหมวดหมู่</SectionTitle>
          {categories.map(cat => {
            const ps = products.filter(p => p.categoryId === cat.id);
            const qty = ps.reduce((s, p) => s + p.quantity, 0);
            const val = ps.reduce((s, p) => s + p.quantity * p.buyPrice, 0);
            return (
              <div key={cat.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: `1px solid ${T.border}`, fontSize: 13 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 6, background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <i className="ti ti-tag" style={{ fontSize: 13, color: T.primary }} aria-hidden="true" />
                  </div>
                  <span style={{ fontWeight: 500, color: T.textPrimary }}>{cat.name}</span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: T.textMuted }}>{ps.length} รายการ / {qty} ชิ้น</div>
                  <div style={{ color: T.primaryDark, fontWeight: 500 }}>฿{fmtPrice(val)}</div>
                </div>
              </div>
            );
          })}
        </Card>
      </div>

      {/* LocalStorage status card */}
      <Card style={{ marginTop: 16, borderTop: `3px solid ${T.mid}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 9, background: T.midLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <i className="ti ti-device-floppy" style={{ fontSize: 18, color: T.mid }} aria-hidden="true" />
            </div>
            <div>
              <div style={{ fontWeight: 500, fontSize: 14, color: T.textPrimary }}>จัดเก็บใน LocalStorage</div>
              <div style={{ fontSize: 12, color: T.textMuted, marginTop: 2 }}>
                ข้อมูลบันทึกในเครื่องนี้อัตโนมัติ · ขนาด: <b style={{ color: T.textSecondary }}>{storageSize}</b>
                &nbsp;·&nbsp;{products.length} สินค้า · {categories.length} หมวดหมู่ · {history.length} รายการประวัติ
              </div>
            </div>
          </div>
          {user?.role === "admin" && (
            <button onClick={resetData} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "7px 14px", border: `1px solid rgba(192,57,43,0.3)`,
              borderRadius: 8, background: T.redLight, color: T.red,
              cursor: "pointer", fontSize: 12, fontWeight: 500, flexShrink: 0
            }}>
              <i className="ti ti-trash" style={{ fontSize: 14 }} aria-hidden="true" />
              รีเซ็ตข้อมูลทั้งหมด
            </button>
          )}
        </div>
      </Card>
    </div>
  );
}