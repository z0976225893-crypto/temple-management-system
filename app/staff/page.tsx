"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

type Staff = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  role: string | null;
  status: string | null;
  created_at: string;
};

export default function StaffPage() {
  const router = useRouter();

  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkLoginAndLoadStaff() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      const { data, error } = await supabase
        .from("staff")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setStaff(data || []);
      setLoading(false);
    }

    checkLoginAndLoadStaff();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p>載入中...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-slate-500">
              TEMPLE MANAGEMENT SYSTEM
            </p>

            <h1 className="text-3xl font-bold text-slate-900 mt-2">
              廟務人員
            </h1>

            <p className="text-slate-500 mt-2">
              管理廟務工作人員
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-slate-900 text-white px-5 py-3 hover:bg-slate-800"
          >
            登出
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold">人員名單</h2>
          </div>

          {staff.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              目前沒有廟務人員資料
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left p-4">姓名</th>
                    <th className="text-left p-4">電子郵件</th>
                    <th className="text-left p-4">電話</th>
                    <th className="text-left p-4">職務</th>
                    <th className="text-left p-4">狀態</th>
                  </tr>
                </thead>

                <tbody>
                  {staff.map((person) => (
                    <tr
                      key={person.id}
                      className="border-t border-slate-100"
                    >
                      <td className="p-4 font-medium">
                        {person.name}
                      </td>

                      <td className="p-4">
                        {person.email || "-"}
                      </td>

                      <td className="p-4">
                        {person.phone || "-"}
                      </td>

                      <td className="p-4">
                        {person.role || "-"}
                      </td>

                      <td className="p-4">
                        {person.status || "active"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <button
          onClick={() => router.push("/")}
          className="mt-6 text-slate-600 hover:text-slate-900"
        >
          ← 返回系統首頁
        </button>
      </div>
    </main>
  );
}
