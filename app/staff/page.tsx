"use client";

import { FormEvent, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Staff = {
  id: string;
  name: string;
  active: boolean;
  auth_user_id: string | null;
  email: string | null;
  phone: string | null;
};

export default function StaffPage() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  async function loadStaff() {
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase
      .from("staff")
      .select("id, name, active, auth_user_id, email, phone")
      .order("name");

    if (error) {
      setMessage(`讀取人員失敗：${error.message}`);
      setStaff([]);
    } else {
      setStaff(data ?? []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadStaff();
  }, []);

  async function handleAddStaff(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      setMessage("請輸入姓名");
      return;
    }

    setMessage("");

    const { error } = await supabase.from("staff").insert({
      name: name.trim(),
      email: email.trim() || null,
      phone: phone.trim() || null,
      active: true,
    });

    if (error) {
      setMessage(`新增失敗：${error.message}`);
      return;
    }

    setName("");
    setEmail("");
    setPhone("");
    setMessage("人員新增成功！");
    await loadStaff();
  }

  async function toggleActive(person: Staff) {
    const { error } = await supabase
      .from("staff")
      .update({ active: !person.active })
      .eq("id", person.id);

    if (error) {
      setMessage(`更新失敗：${error.message}`);
      return;
    }

    await loadStaff();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              TEMPLE MANAGEMENT SYSTEM
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              廟務人員
            </h1>

            <p className="mt-2 text-slate-500">
              管理廟務工作人員資料
            </p>
          </div>

          <a
            href="/"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            ← 回首頁
          </a>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              新增人員
            </h2>

            <form onSubmit={handleAddStaff} className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  姓名
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="例如：王小明"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  電子郵件
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="example@gmail.com"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  電話
                </label>

                <input
                  type="text"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="0912-345-678"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-slate-900 px-4 py-3 font-medium text-white hover:bg-slate-800"
              >
                ＋ 新增人員
              </button>

              {message && (
                <div className="rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-600">
                  {message}
                </div>
              )}
            </form>
          </section>

          <section className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                人員列表
              </h2>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                共 {staff.length} 人
              </span>
            </div>

            {loading ? (
              <div className="py-12 text-center text-slate-500">
                載入中...
              </div>
            ) : staff.length === 0 ? (
              <div className="py-12 text-center text-slate-500">
                目前沒有廟務人員資料
              </div>
            ) : (
              <div className="mt-5 space-y-3">
                {staff.map((person) => (
                  <div
                    key={person.id}
                    className="flex flex-col gap-4 rounded-xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-bold text-slate-900">
                          {person.name}
                        </h3>

                        <span
                          className={`rounded-full px-2 py-1 text-xs ${
                            person.active
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {person.active ? "啟用中" : "已停用"}
                        </span>
                      </div>

                      <div className="mt-2 space-y-1 text-sm text-slate-500">
                        {person.email && <p>📧 {person.email}</p>}
                        {person.phone && <p>📞 {person.phone}</p>}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleActive(person)}
                      className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                    >
                      {person.active ? "停用" : "重新啟用"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
