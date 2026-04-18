import { useState } from 'react';
import { Users, TrendingUp, Package, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { MICRO_GROUPS, PENDING_ORDERS } from '../data/mockData';

export default function MicroIndustry() {
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [appliedOrders, setAppliedOrders] = useState([]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white border-b border-gray-100 px-4 py-4 lg:px-6 sticky top-0 z-20">
        <h1 className="text-lg font-bold text-gray-900">Start a Group Business</h1>
        <p className="text-xs text-gray-500">समूह व्यवसाय शुरू करें</p>
      </div>

      <div className="px-4 py-5 lg:px-6 space-y-6">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-5 text-white">
          <div className="text-2xl mb-2">🏭</div>
          <p className="text-sm font-bold leading-relaxed">If 5–10 people have the same skill in your area, you can start a small business together!</p>
          <p className="text-xs opacity-80 mt-1">अगर आपके क्षेत्र में 5-10 लोगों के पास एक ही स्किल है, तो मिलकर व्यापार शुरू करें!</p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-gray-900 mb-3">Suggested Groups (सुझाए गए समूह)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MICRO_GROUPS.map(group => (
              <div key={group.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{group.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{group.name}</h3>
                    <div className="flex items-center gap-1 mt-0.5"><MapPin size={11} className="text-gray-400" /><span className="text-xs text-gray-500">{group.area}</span></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-blue-50 rounded-lg px-3 py-2">
                    <div className="flex items-center gap-1 text-blue-600"><Users size={11} /> Members</div>
                    <p className="font-bold text-blue-800 mt-0.5">{group.members} people</p>
                  </div>
                  <div className="bg-green-50 rounded-lg px-3 py-2">
                    <div className="flex items-center gap-1 text-green-600"><TrendingUp size={11} /> Income</div>
                    <p className="font-bold text-green-800 mt-0.5">₹{(group.incomeMin / 1000).toFixed(0)}k–{(group.incomeMax / 1000).toFixed(0)}k/mo</p>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-xl px-3 py-2">
                  <p className="text-xs text-orange-600 font-semibold">Suggested Business</p>
                  <p className="text-xs text-orange-800 font-bold mt-0.5">{group.suggestion}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {joinedGroups.includes(group.id) ? (
                    <button disabled className="col-span-2 py-2.5 bg-green-50 text-green-700 font-bold rounded-xl text-xs flex items-center justify-center gap-2">
                      <CheckCircle size={13} /> Joined!
                    </button>
                  ) : (
                    <>
                      <button onClick={() => setJoinedGroups(p => [...p, group.id])} className="py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-xs transition">Join Group</button>
                      <button className="py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs transition">View Details</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold text-gray-900 mb-1">Pending Orders (लंबित ऑर्डर)</h2>
          <p className="text-xs text-gray-500 mb-3">Real orders waiting for skilled groups to fulfill</p>
          <div className="space-y-3">
            {PENDING_ORDERS.map(order => (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Package size={16} className="text-blue-600 flex-shrink-0" />
                      <h3 className="font-bold text-gray-900 text-sm">{order.product}</h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-xs">
                      <div className="bg-gray-50 rounded-lg px-3 py-2"><p className="text-gray-500">Quantity</p><p className="font-bold text-gray-900 mt-0.5">{order.quantity}</p></div>
                      <div className="bg-gray-50 rounded-lg px-3 py-2"><div className="flex items-center gap-1 text-gray-500"><MapPin size={10} /> Buyer</div><p className="font-bold text-gray-900 mt-0.5">{order.buyer}</p></div>
                      <div className="bg-green-50 rounded-lg px-3 py-2"><p className="text-green-600">Advance</p><p className="font-bold text-green-700 mt-0.5">{order.advance}</p></div>
                      <div className="bg-orange-50 rounded-lg px-3 py-2"><div className="flex items-center gap-1 text-orange-600"><Calendar size={10} /> Deadline</div><p className="font-bold text-orange-800 mt-0.5">{order.deadline}</p></div>
                    </div>
                  </div>
                </div>
                {appliedOrders.includes(order.id) ? (
                  <button disabled className="mt-3 px-5 py-2 bg-green-50 text-green-700 font-bold rounded-xl text-xs flex items-center gap-1.5"><CheckCircle size={13} /> Applied!</button>
                ) : (
                  <button onClick={() => setAppliedOrders(p => [...p, order.id])} className="mt-3 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition">Apply for Order</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
