import React, { useState, useEffect } from "react";
import { C, FONT, R, SHADOW } from "../../shared/tokens";
import { Search, Filter, Eye, PauseCircle, Trash2 } from "lucide-react";
import { api } from "../../shared/api";

interface Listing {
  id: string;
  title: string;
  owner: string;
  type: "Rent" | "Sale";
  price: string;
  status: "Active" | "Draft" | "Rented" | "Sold";
  axonScore: number;
}

export const MarketplaceScreen: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"listings" | "rentals">("listings");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await api.get('/api/v1/marketplace/listings');
        // Map backend ListingResponse to UI Listing format
        const fetchedListings = response.data.map((l: any) => ({
          id: l.listing_id.split('-')[0].toUpperCase(),
          title: `${l.brand || ''} ${l.machine_name}`.trim(),
          owner: l.seller_name,
          type: l.is_for_sale ? "Sale" : "Rent",
          price: l.is_for_sale ? `₹${(l.price_buy / 100000).toFixed(1)}L` : `₹${l.price_rent_day}/day`,
          status: l.status === "active" ? "Active" : l.status.charAt(0).toUpperCase() + l.status.slice(1),
          axonScore: Math.floor(Math.random() * 20) + 80 // Mock axon score
        }));
        setListings(fetchedListings);
      } catch (error) {
        console.error("Failed to fetch listings", error);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontFamily: FONT.condensed, fontSize: "32px", fontWeight: 800, color: C.navy, margin: 0 }}>Marketplace Admin</h1>
          <p style={{ color: C.slate, margin: "4px 0 0 0" }}>Manage listings, active rentals, and marketplace integrity.</p>
        </div>
        <div style={{ display: "flex", gap: "8px", background: C.border, padding: "4px", borderRadius: R.md }}>
          <button 
            onClick={() => setActiveTab("listings")}
            style={{ padding: "8px 16px", borderRadius: R.sm, background: activeTab === "listings" ? C.white : "transparent", color: activeTab === "listings" ? C.navy : C.slate, fontWeight: 600, boxShadow: activeTab === "listings" ? SHADOW.card : "none" }}>
            All Listings
          </button>
          <button 
            onClick={() => setActiveTab("rentals")}
            style={{ padding: "8px 16px", borderRadius: R.sm, background: activeTab === "rentals" ? C.white : "transparent", color: activeTab === "rentals" ? C.navy : C.slate, fontWeight: 600, boxShadow: activeTab === "rentals" ? SHADOW.card : "none" }}>
            Active Rentals
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
              placeholder="Search listings by ID, Title, or Owner..." 
              style={{ border: "none", background: "transparent", width: "100%", color: C.navy, fontSize: "14px" }}
            />
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: R.md, border: `1px solid ${C.border}`, background: C.white, color: C.navy, fontWeight: 500, fontSize: "14px" }}>
            <Filter size={16} /> Filter by Type
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: C.offWhite, color: C.slate, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Listing ID</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Machine Details</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Owner</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Type & Price</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Axon Score</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Status</th>
                <th style={{ padding: "12px 20px", fontWeight: 600, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ padding: "40px", textAlign: "center", color: C.slate }}>Loading listings...</td>
                </tr>
              ) : (
                listings.map((item, i) => (
                  <tr key={item.id} style={{ borderBottom: i !== listings.length - 1 ? `1px solid ${C.border}` : "none", transition: "background 0.2s" }}>
                    <td style={{ padding: "16px 20px", color: C.slate, fontWeight: 500, fontSize: "14px" }}>{item.id}</td>
                    <td style={{ padding: "16px 20px", color: C.navy, fontWeight: 700, fontSize: "14px" }}>{item.title}</td>
                    <td style={{ padding: "16px 20px", color: C.slate, fontSize: "14px" }}>{item.owner}</td>
                    <td style={{ padding: "16px 20px", fontSize: "14px" }}>
                      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                        <span style={{ padding: "2px 6px", borderRadius: R.sm, fontSize: "11px", fontWeight: 700, background: item.type === "Rent" ? C.orangeDim : "rgba(232,76,30,0.15)", color: item.type === "Rent" ? C.orange : C.orange }}>{item.type}</span>
                        <span style={{ fontWeight: 600, color: C.navy }}>{item.price}</span>
                      </div>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <div style={{ width: "32px", height: "4px", background: C.border, borderRadius: "2px", overflow: "hidden" }}>
                          <div style={{ width: `${item.axonScore}%`, height: "100%", background: item.axonScore > 90 ? C.green : C.orange }} />
                        </div>
                        <span style={{ fontSize: "13px", fontWeight: 600, color: C.navy }}>{item.axonScore}</span>
                      </div>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <span style={{ padding: "4px 8px", borderRadius: R.sm, fontSize: "12px", fontWeight: 600, 
                        background: item.status === "Active" ? "rgba(22,163,74,0.1)" : item.status === "Draft" ? C.border : "rgba(13,148,136,0.1)", 
                        color: item.status === "Active" ? C.green : item.status === "Draft" ? C.slate : C.orange 
                      }}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ padding: "16px 20px", textAlign: "right", display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                      <button title="View Listing" style={{ padding: "4px", color: C.orange }}><Eye size={18} /></button>
                      <button title="Pause/Delist" style={{ padding: "4px", color: C.orange }}><PauseCircle size={18} /></button>
                      <button title="Delete" style={{ padding: "4px", color: C.red }}><Trash2 size={18} /></button>
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
