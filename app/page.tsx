const modules = [
  { icon: "📊", title: "系統首頁", text: "查看廟務整體狀況" },
  { icon: "📅", title: "排班／值班", text: "管理值班與人員排班" },
  { icon: "📝", title: "請假管理", text: "申請與審核請假" },
  { icon: "🙏", title: "法會／活動", text: "管理法會與廟務活動" },
  { icon: "📦", title: "庫存管理", text: "管理物品與庫存數量" },
  { icon: "👥", title: "廟務人員", text: "管理廟務工作人員" },
  { icon: "📢", title: "廟務公告", text: "發布與管理內部公告" },
  { icon: "⚙️", title: "系統管理／權限", text: "管理帳號與系統權限" },
];

export default function Home() {
  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">🏯</div>
          <div>
            <strong>廟務管理系統</strong>
            <span>Temple Management</span>
          </div>
        </div>

        <nav>
          <button className="nav-item active">📊 <span>系統首頁</span></button>
          {modules.slice(1).map((item) => (
            <button className="nav-item" key={item.title}>
              {item.icon} <span>{item.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      <section className="content">
        <header className="topbar">
          <div>
            <p className="eyebrow">TEMPLE MANAGEMENT SYSTEM</p>
            <h1>廟務管理系統</h1>
          </div>
          <div className="user-pill">管理員</div>
        </header>

        <section className="welcome">
          <div>
            <p className="eyebrow">管理後台</p>
            <h2>歡迎使用廟務管理系統</h2>
            <p>目前先完成網站介面，接下來將逐一串接 Supabase 資料。</p>
          </div>
          <div className="status">● 系統準備中</div>
        </section>

        <section className="grid">
          {modules.map((item) => (
            <article className="card" key={item.title}>
              <div className="card-icon">{item.icon}</div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              <span className="arrow">→</span>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
