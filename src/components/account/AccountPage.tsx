import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Package, User, MapPin, Settings, Heart, CheckCircle2, Truck } from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { lastPlacedOrder, formatPrice, wishlist, setActivePage } = useShop();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses' | 'settings'>('orders');

  // Address management state
  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      label: 'Primary Residence',
      name: 'Eleanor Vance',
      street: '142 Boulevard Saint-Germain, Apt 4B',
      city: 'Paris',
      postalCode: '75006',
      country: 'France',
      phone: '+33 1 42 68 00 00',
      isDefault: true
    },
    {
      id: 'addr-2',
      label: 'Milan Pied-à-terre',
      name: 'Eleanor Vance',
      street: 'Via Montenapoleone 8',
      city: 'Milan',
      postalCode: '20121',
      country: 'Italy',
      phone: '+39 02 7600 1234',
      isDefault: false
    }
  ]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({
    label: '',
    name: 'Eleanor Vance',
    street: '',
    city: '',
    postalCode: '',
    country: 'United Kingdom',
    phone: ''
  });

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.street || !newAddr.city) return;
    const added = {
      ...newAddr,
      id: `addr-${Date.now()}`,
      label: newAddr.label || 'Additional Residence',
      isDefault: addresses.length === 0
    };
    setAddresses(prev => [...prev, added]);
    setIsAddingAddress(false);
    setNewAddr({ label: '', name: 'Eleanor Vance', street: '', city: '', postalCode: '', country: 'United Kingdom', phone: '' });
  };

  const handleSetDefault = (id: string) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  // Simulated existing order history
  const demoOrders = [
    ...(lastPlacedOrder ? [lastPlacedOrder] : []),
    {
      id: 'AV-981240',
      date: 'Aug 14, 2026',
      status: 'Delivered' as const,
      trackingNumber: 'DHL-FR-889123041',
      items: [
        {
          productId: 'prod-blazer-02',
          name: 'The Structured Wool Serge Blazer',
          image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80',
          price: 980,
          size: '38',
          color: 'Deep Espresso',
          quantity: 1
        }
      ],
      total: 980,
      shippingAddress: {
        fullName: 'Eleanor Vance',
        street: '142 Boulevard Saint-Germain',
        city: 'Paris',
        postalCode: '75006',
        country: 'France'
      }
    }
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="border-b border-[#E7E2DA] pb-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#8C827A] font-medium block">
              Private Client Salon
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#1A1A1A] mt-2 font-normal">
              Eleanor Vance
            </h1>
            <p className="text-xs text-[#7A726A] mt-1">Client ID: AV-PRIVILEGE-7749 &bull; Member since 2024</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-[0.25em] font-medium">
              VIP Atelier Patron
            </span>
          </div>
        </div>

        {/* 2-Column: Navigation Tabs + Main Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Tabs Menu (3 cols) */}
          <aside className="lg:col-span-3 space-y-2 border-b lg:border-b-0 lg:border-r border-[#E7E2DA] pb-6 lg:pb-0 lg:pr-6">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between p-3 text-xs uppercase tracking-wider font-medium transition-colors ${
                activeTab === 'orders' ? 'bg-[#1A1A1A] text-white' : 'hover:bg-[#F2EDE4] text-[#59514A]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4" />
                <span>Orders &amp; Tracking</span>
              </div>
              <span className="text-[10px]">{demoOrders.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-2.5 p-3 text-xs uppercase tracking-wider font-medium transition-colors ${
                activeTab === 'profile' ? 'bg-[#1A1A1A] text-white' : 'hover:bg-[#F2EDE4] text-[#59514A]'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Patron Profile</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center gap-2.5 p-3 text-xs uppercase tracking-wider font-medium transition-colors ${
                activeTab === 'addresses' ? 'bg-[#1A1A1A] text-white' : 'hover:bg-[#F2EDE4] text-[#59514A]'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Saved Addresses</span>
            </button>

            <button
              onClick={() => setActivePage('wishlist')}
              className="w-full flex items-center justify-between p-3 text-xs uppercase tracking-wider font-medium text-[#59514A] hover:bg-[#F2EDE4] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Heart className="w-4 h-4" />
                <span>Wishlist</span>
              </div>
              <span className="text-[10px]">{wishlist.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-2.5 p-3 text-xs uppercase tracking-wider font-medium transition-colors ${
                activeTab === 'settings' ? 'bg-[#1A1A1A] text-white' : 'hover:bg-[#F2EDE4] text-[#59514A]'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Preferences</span>
            </button>
          </aside>

          {/* Tab Content (9 cols) */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl text-[#1A1A1A]">Acquisition History &amp; Courier Status</h3>
                  <span className="text-xs text-[#8C827A]">{demoOrders.length} Completed / In-Transit Orders</span>
                </div>

                <div className="space-y-6">
                  {demoOrders.map((order, idx) => (
                    <div key={idx} className="bg-white border border-[#E7E2DA] p-6 space-y-6 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E2DA] pb-4 text-xs">
                        <div>
                          <span className="text-[10px] text-[#8C827A] uppercase block">Manifest Number</span>
                          <span className="font-mono font-semibold text-[#1A1A1A] text-sm">{order.id}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#8C827A] uppercase block">Authorization Date</span>
                          <span className="text-[#1A1A1A] font-medium">{order.date}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#8C827A] uppercase block">Consignment Status</span>
                          <span className="inline-flex items-center gap-1.5 font-medium text-[#2B5138]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{order.status}</span>
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#8C827A] uppercase block">Total Settled</span>
                          <span className="font-semibold text-[#1A1A1A]">{formatPrice(order.total)}</span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-4">
                        {order.items.map((it, itemIdx) => (
                          <div key={itemIdx} className="flex items-center gap-4">
                            <img src={it.image} alt={it.name} className="w-14 h-18 object-cover bg-[#ECE8DF]" />
                            <div className="flex-1 text-xs">
                              <h4 className="font-serif text-base text-[#1A1A1A]">{it.name}</h4>
                              <p className="text-[#7A726A] mt-0.5">{it.color} &bull; Size {it.size} &bull; Qty {it.quantity}</p>
                              <span className="font-medium text-[#1A1A1A] mt-1 block">{formatPrice(it.price * it.quantity)}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Tracking Details */}
                      <div className="bg-[#FAF9F6] p-4 border border-[#E7E2DA] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2.5">
                          <Truck className="w-4 h-4 text-[#B89758]" />
                          <div>
                            <span className="font-medium text-[#1A1A1A]">DHL Express Global Tracking: </span>
                            <span className="font-mono text-[#59514A]">{order.trackingNumber}</span>
                          </div>
                        </div>
                        <div className="text-[11px] text-[#8C827A]">
                          Signature Required Upon Delivery
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white p-8 border border-[#E7E2DA] space-y-6">
                <h3 className="font-serif text-2xl text-[#1A1A1A] border-b border-[#E7E2DA] pb-4">
                  Patron Credentials &amp; Measurements
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  <div>
                    <label className="text-[10px] uppercase text-[#8C827A] block mb-1">Full Name</label>
                    <input type="text" readOnly value="Eleanor Vance" className="w-full border border-[#DCD5C9] p-3 bg-[#FAF9F6]" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-[#8C827A] block mb-1">Private Email</label>
                    <input type="text" readOnly value="client@atelier-verite.com" className="w-full border border-[#DCD5C9] p-3 bg-[#FAF9F6]" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-[#8C827A] block mb-1">Default Garment Size</label>
                    <input type="text" readOnly value="IT 38 / Small" className="w-full border border-[#DCD5C9] p-3 bg-[#FAF9F6]" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-[#8C827A] block mb-1">Preferred Currency</label>
                    <input type="text" readOnly value="EUR (€) / USD ($)" className="w-full border border-[#DCD5C9] p-3 bg-[#FAF9F6]" />
                  </div>
                </div>
              </div>
            )}

            {/* Addresses Tab (Shopify standard) */}
            {activeTab === 'addresses' && (
              <div className="bg-white p-6 sm:p-8 border border-[#E7E2DA] space-y-6">
                <div className="flex items-center justify-between border-b border-[#E7E2DA] pb-4">
                  <div>
                    <h3 className="font-serif text-2xl text-[#1A1A1A]">
                      Verified Dispatch Coordinates
                    </h3>
                    <p className="text-xs text-[#7A726A] mt-0.5">Manage your private delivery residences and concierge addresses.</p>
                  </div>
                  <button
                    onClick={() => setIsAddingAddress(!isAddingAddress)}
                    className="px-4 py-2 bg-[#1A1A1A] hover:bg-black text-white text-xs uppercase tracking-wider font-medium transition-colors"
                  >
                    {isAddingAddress ? 'Cancel' : '+ Add New Address'}
                  </button>
                </div>

                {/* New Address Form */}
                {isAddingAddress && (
                  <form onSubmit={handleSaveNewAddress} className="p-5 bg-[#FAF9F6] border border-[#E7E2DA] space-y-4 text-xs">
                    <h4 className="font-serif text-base text-[#1A1A1A]">Add Private Residence</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase text-[#6B635B] mb-1">Residence Label</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. London Townhouse"
                          value={newAddr.label}
                          onChange={e => setNewAddr({ ...newAddr, label: e.target.value })}
                          className="w-full bg-white border border-[#DCD5C9] p-2.5 focus:outline-none focus:border-[#1A1A1A]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase text-[#6B635B] mb-1">Recipient Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Eleanor Vance"
                          value={newAddr.name}
                          onChange={e => setNewAddr({ ...newAddr, name: e.target.value })}
                          className="w-full bg-white border border-[#DCD5C9] p-2.5 focus:outline-none focus:border-[#1A1A1A]"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] uppercase text-[#6B635B] mb-1">Street Address</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 18 Eaton Square, Belgravia"
                          value={newAddr.street}
                          onChange={e => setNewAddr({ ...newAddr, street: e.target.value })}
                          className="w-full bg-white border border-[#DCD5C9] p-2.5 focus:outline-none focus:border-[#1A1A1A]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase text-[#6B635B] mb-1">City</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. London"
                          value={newAddr.city}
                          onChange={e => setNewAddr({ ...newAddr, city: e.target.value })}
                          className="w-full bg-white border border-[#DCD5C9] p-2.5 focus:outline-none focus:border-[#1A1A1A]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase text-[#6B635B] mb-1">Postal Code</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. SW1W 9DA"
                          value={newAddr.postalCode}
                          onChange={e => setNewAddr({ ...newAddr, postalCode: e.target.value })}
                          className="w-full bg-white border border-[#DCD5C9] p-2.5 focus:outline-none focus:border-[#1A1A1A]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase text-[#6B635B] mb-1">Country</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. United Kingdom"
                          value={newAddr.country}
                          onChange={e => setNewAddr({ ...newAddr, country: e.target.value })}
                          className="w-full bg-white border border-[#DCD5C9] p-2.5 focus:outline-none focus:border-[#1A1A1A]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase text-[#6B635B] mb-1">Telephone</label>
                        <input
                          type="text"
                          placeholder="e.g. +44 20 7946 0991"
                          value={newAddr.phone}
                          onChange={e => setNewAddr({ ...newAddr, phone: e.target.value })}
                          className="w-full bg-white border border-[#DCD5C9] p-2.5 focus:outline-none focus:border-[#1A1A1A]"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#1A1A1A] text-white uppercase tracking-wider text-xs hover:bg-black transition-colors"
                    >
                      Save Residence
                    </button>
                  </form>
                )}

                {/* Addresses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div key={addr.id} className="border border-[#DCD5C9] p-5 space-y-2 text-xs text-[#4A433D] bg-[#FAF9F6] relative">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-[#1A1A1A] uppercase tracking-wider text-[11px]">{addr.label}</span>
                        {addr.isDefault && (
                          <span className="text-[10px] bg-[#1A1A1A] text-white px-2 py-0.5 uppercase font-medium">Default</span>
                        )}
                      </div>
                      <p className="font-medium text-[#1A1A1A]">{addr.name}</p>
                      <p>{addr.street}</p>
                      <p>{addr.postalCode} {addr.city}, {addr.country}</p>
                      {addr.phone && <p className="text-[#8C827A] pt-1">{addr.phone}</p>}

                      <div className="pt-3 border-t border-[#E7E2DA] flex items-center justify-between text-[11px]">
                        {!addr.isDefault && (
                          <button
                            onClick={() => handleSetDefault(addr.id)}
                            className="text-[#B89758] hover:underline"
                          >
                            Set as default
                          </button>
                        )}
                        {addresses.length > 1 && (
                          <button
                            onClick={() => handleDeleteAddress(addr.id)}
                            className="text-[#9E978F] hover:text-[#D9534F] ml-auto transition-colors"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white p-8 border border-[#E7E2DA] space-y-6">
                <h3 className="font-serif text-2xl text-[#1A1A1A] border-b border-[#E7E2DA] pb-4">
                  Privacy &amp; Gazette Subscriptions
                </h3>
                <div className="space-y-4 text-xs text-[#4A433D]">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="accent-[#1A1A1A] w-4 h-4" />
                    <span>Receive private collection drop previews prior to public release</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="accent-[#1A1A1A] w-4 h-4" />
                    <span>Receive invitations to private salon viewings in Paris &amp; Milan</span>
                  </label>
                </div>
              </div>
            )}

          </main>

        </div>
      </div>
    </div>
  );
};
