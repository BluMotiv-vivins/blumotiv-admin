import React, { useState, useEffect } from "react";
import { C, FONT, R, SHADOW } from "../../shared/tokens";
import { Search, Filter, MoreVertical, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { api } from "../../shared/api";

interface User {
  id: string;
  name: string;
  role: string;
  phone: string;
  city: string;
  kycStatus: "Verified" | "Pending" | "Rejected";
  joinDate: string;
}

export const UsersScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/v1/auth/users');
        // Map backend UserProfile format to our UI User format
        const fetchedUsers = response.data.map((u: any) => ({
          id: u.id.toString(),
          name: u.name || "Unknown",
          role: u.role.charAt(0).toUpperCase() + u.role.slice(1),
          kycStatus: u.profile_complete ? "Verified" : "Pending",
          phone: u.phone,
          city: u.city || "N/A",
          joinDate: new Date(u.created_at).toISOString().split('T')[0]
        }));
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontFamily: FONT.condensed, fontSize: "32px", fontWeight: 800, color: C.navy, margin: 0 }}>User Management</h1>
          <p style={{ color: C.slate, margin: "4px 0 0 0" }}>View and manage all registered platform users.</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={{ padding: "8px 16px", borderRadius: R.sm, background: C.navy, color: C.white, fontWeight: 600 }}>
            Export CSV
          </button>
        </div>
      </div>

      <div style={{ background: C.white, borderRadius: R.lg, border: `1px solid ${C.border}`, boxShadow: SHADOW.card }}>
        {/* Toolbar */}
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", gap: "16px", alignItems: "center" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px", background: C.offWhite, padding: "8px 16px", borderRadius: R.md, border: `1px solid ${C.border}` }}>
            <Search size={18} color={C.slate} />
            <input 
              type="text" 
              placeholder="Search by name, phone, or ID..." 
              style={{ border: "none", background: "transparent", width: "100%", color: C.navy, fontSize: "14px" }}
            />
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: R.md, border: `1px solid ${C.border}`, background: C.white, color: C.navy, fontWeight: 500, fontSize: "14px" }}>
            <Filter size={16} /> Filter by Role
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: C.offWhite, color: C.slate, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>User ID</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Name / Business</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Role</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Contact & City</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>KYC Status</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Joined</th>
                <th style={{ padding: "12px 20px", fontWeight: 600, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ padding: "40px", textAlign: "center", color: C.slate }}>Loading users...</td>
                </tr>
              ) : (
                users.map((user, i) => (
                  <tr key={user.id} style={{ borderBottom: i !== users.length - 1 ? `1px solid ${C.border}` : "none", transition: "background 0.2s" }}>
                    <td style={{ padding: "16px 20px", color: C.slate, fontWeight: 500, fontSize: "14px" }}>{user.id}</td>
                    <td style={{ padding: "16px 20px", color: C.navy, fontWeight: 700, fontSize: "14px" }}>{user.name}</td>
                    <td style={{ padding: "16px 20px" }}>
                      <span style={{ padding: "4px 8px", borderRadius: R.sm, fontSize: "12px", fontWeight: 600, background: C.navyLight, color: C.white }}>
                        {user.role}
                      </span>
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "14px" }}>
                      <div style={{ color: C.navy, fontWeight: 500 }}>{user.phone}</div>
                      <div style={{ color: C.slate, fontSize: "12px", marginTop: "2px" }}>{user.city}</div>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        {user.kycStatus === "Verified" ? <CheckCircle size={16} color={C.green} /> : 
                         user.kycStatus === "Rejected" ? <XCircle size={16} color={C.red} /> : 
                         <AlertCircle size={16} color={C.orange} />}
                        <span style={{ 
                          fontSize: "13px", fontWeight: 600,
                          color: user.kycStatus === "Verified" ? C.green : user.kycStatus === "Rejected" ? C.red : C.orange
                        }}>
                          {user.kycStatus}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "16px 20px", color: C.slate, fontSize: "14px" }}>{user.joinDate}</td>
                    <td style={{ padding: "16px 20px", textAlign: "right" }}>
                      <button style={{ padding: "4px", color: C.slate }}>
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
