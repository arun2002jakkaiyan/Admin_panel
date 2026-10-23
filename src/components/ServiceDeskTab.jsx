import React, { useState } from 'react';
import { 
  Wrench, 
  Phone, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  UserCheck, 
  Shield, 
  Kanban, 
  List, 
  KeyRound, 
  Clock, 
  Star,
  Check,
  X
} from 'lucide-react';

export default function ServiceDeskTab({ serviceRequests, onUpdateServiceStatus }) {
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' or 'list'
  const [assigningId, setAssigningId] = useState(null);
  const [techName, setTechName] = useState('Rahul Verma (Certified Master RO Tech)');
  const [techPhone, setTechPhone] = useState('+91 98765 11223');
  const [verifyingOtpId, setVerifyingOtpId] = useState(null);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState(false);

  const certifiedTechs = [
    { name: 'Rahul Verma', phone: '+91 98765 11223', rating: 4.9, activeJobs: 2 },
    { name: 'Manoj Kumar', phone: '+91 98111 23456', rating: 4.8, activeJobs: 1 },
    { name: 'Suresh Raina', phone: '+91 98222 67890', rating: 4.7, activeJobs: 0 },
    { name: 'Girish Sharma', phone: '+91 98333 44556', rating: 4.9, activeJobs: 3 },
  ];

  const handleAssign = (id) => {
    onUpdateServiceStatus(id, 'Assigned', {
      technicianName: techName,
      technicianPhone: techPhone,
    });
    setAssigningId(null);
  };

  const handleVerifyOtp = (ticket) => {
    if (enteredOtp.trim() === ticket.otp) {
      onUpdateServiceStatus(ticket.id, 'Completed');
      setVerifyingOtpId(null);
      setEnteredOtp('');
      setOtpError(false);
    } else {
      setOtpError(true);
    }
  };

  const columns = [
    { id: 'Scheduled', label: '1. Scheduled & Unassigned', color: 'border-amber-400 bg-amber-500/10' },
    { id: 'Assigned', label: '2. Technician Assigned', color: 'border-blue-400 bg-blue-500/10' },
    { id: 'In-Progress', label: '3. In-Progress / On-Site', color: 'border-purple-400 bg-purple-500/10' },
    { id: 'Completed', label: '4. Service Completed', color: 'border-emerald-400 bg-emerald-500/10' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header & View Controls */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight">RO Service Desk & Technician Dispatch</h3>
          <p className="text-xs text-slate-500">Real-time scheduling, on-site technician tracking, and OTP-secured completion</p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'kanban' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 text-xs font-extrabold">
            4 Certified Field Techs Active
          </div>
        </div>
      </div>

      {/* KANBAN BOARD VIEW */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((col) => {
            const colTickets = serviceRequests.filter(s => {
              if (col.id === 'Assigned') return s.status === 'Assigned';
              if (col.id === 'In-Progress') return s.status === 'In-Progress';
              if (col.id === 'Completed') return s.status === 'Completed';
              return s.status === 'Scheduled';
            });

            return (
              <div key={col.id} className="bg-slate-100/70 p-4 rounded-3xl border border-slate-200/60 flex flex-col min-h-[500px]">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/80">
                  <span className="font-extrabold text-xs text-slate-800">{col.label}</span>
                  <span className="text-xs font-black px-2 py-0.5 rounded-full bg-white text-slate-700 shadow-2xs">
                    {colTickets.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto">
                  {colTickets.length === 0 ? (
                    <div className="h-32 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 text-xs font-medium">
                      No active tickets
                    </div>
                  ) : (
                    colTickets.map((t) => (
                      <div
                        key={t.id}
                        className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-xs text-slate-900">{t.id}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-100">
                            {t.purifierBrand}
                          </span>
                        </div>

                        <h5 className="font-bold text-xs text-slate-800 leading-snug">{t.serviceType}</h5>
                        <p className="text-[11px] text-slate-500 line-clamp-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                          {t.problem}
                        </p>

                        <div className="space-y-1 text-[11px] text-slate-600 pt-1">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{t.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5 truncate">
                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="truncate">{t.address}</span>
                          </div>
                        </div>

                        {/* Technician Pill */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <div className="text-[10px] text-slate-500">
                            <span className="block font-bold text-slate-700 truncate max-w-[130px]">
                              {t.technicianName || 'Unassigned'}
                            </span>
                            {t.technicianPhone && <span className="text-slate-400">{t.technicianPhone}</span>}
                          </div>

                          {t.status === 'Scheduled' && (
                            <button
                              onClick={() => setAssigningId(t.id)}
                              className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-[10px] font-bold transition-colors"
                            >
                              Assign
                            </button>
                          )}

                          {t.status === 'Assigned' && (
                            <button
                              onClick={() => {
                                setVerifyingOtpId(t.id);
                                setEnteredOtp('');
                                setOtpError(false);
                              }}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold transition-colors flex items-center gap-1"
                            >
                              <KeyRound className="w-3 h-3" />
                              <span>Verify OTP</span>
                            </button>
                          )}

                          {t.status === 'Completed' && (
                            <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Done
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE LIST VIEW */
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Ticket ID & Brand</th>
                  <th className="py-3.5 px-4">Service Required</th>
                  <th className="py-3.5 px-4">Customer Details</th>
                  <th className="py-3.5 px-4">Assigned Engineer</th>
                  <th className="py-3.5 px-4">Scheduled Slot</th>
                  <th className="py-3.5 px-4">Status & OTP</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {serviceRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4">
                      <span className="font-extrabold text-slate-900">{req.id}</span>
                      <p className="text-[10px] text-sky-600 font-bold">{req.purifierBrand}</p>
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-800">
                      {req.serviceType}
                      <p className="text-[10px] text-slate-400 line-clamp-1">{req.problem}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-bold text-slate-800">{req.customerName}</p>
                      <p className="text-[10px] text-slate-500">{req.customerPhone}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-bold text-slate-800">{req.technicianName || 'Pending'}</p>
                      <p className="text-[10px] text-slate-400">{req.technicianPhone}</p>
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-700">
                      {req.date}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          req.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {req.status}
                        </span>
                        {req.otp && req.status !== 'Completed' && (
                          <span className="font-mono text-[10px] bg-amber-100 text-amber-900 font-black px-1.5 py-0.5 rounded">
                            OTP: {req.otp}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      {req.status === 'Scheduled' && (
                        <button
                          onClick={() => setAssigningId(req.id)}
                          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-colors"
                        >
                          Assign Tech
                        </button>
                      )}
                      {req.status === 'Assigned' && (
                        <button
                          onClick={() => {
                            setVerifyingOtpId(req.id);
                            setEnteredOtp('');
                            setOtpError(false);
                          }}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors"
                        >
                          Verify OTP
                        </button>
                      )}
                      {req.status === 'Completed' && (
                        <span className="text-emerald-600 font-bold text-xs flex items-center justify-end gap-1">
                          <Check className="w-3.5 h-3.5" /> Completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Technician Assignment Modal */}
      {assigningId && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200">
            <h4 className="font-extrabold text-base text-slate-900">Dispatch Certified RO Technician</h4>
            <p className="text-xs text-slate-500">
              Select an available engineer in this city quadrant for on-site diagnosis and repair.
            </p>

            <div className="space-y-2 pt-1">
              {certifiedTechs.map((tech, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setTechName(tech.name);
                    setTechPhone(tech.phone);
                  }}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    techName === tech.name ? 'border-purple-600 bg-purple-50/60 ring-2 ring-purple-100' : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <p className="font-bold text-xs text-slate-900">{tech.name}</p>
                    <p className="text-[11px] text-slate-500">{tech.phone}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {tech.rating}
                    </span>
                    <p className="text-[10px] text-slate-400">{tech.activeJobs} active jobs</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setAssigningId(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAssign(assigningId)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                Confirm Dispatch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      {verifyingOtpId && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 border border-slate-200 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <KeyRound className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-base text-slate-900">Verify Customer Completion OTP</h4>
            <p className="text-xs text-slate-500">
              Ask the customer for the 4-digit security OTP shown in their AquaFlow mobile app to confirm service completion.
            </p>

            <div className="pt-2">
              <input
                type="text"
                maxLength={4}
                placeholder="4-digit OTP"
                value={enteredOtp}
                onChange={(e) => {
                  setEnteredOtp(e.target.value);
                  setOtpError(false);
                }}
                className="w-40 mx-auto text-center font-mono font-black text-2xl tracking-widest p-2 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600"
              />
              {otpError && (
                <p className="text-xs text-rose-600 font-bold mt-1">Invalid OTP. Please check with customer.</p>
              )}
            </div>

            <div className="flex justify-center gap-2 pt-3">
              <button
                onClick={() => setVerifyingOtpId(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const ticket = serviceRequests.find(s => s.id === verifyingOtpId);
                  if (ticket) handleVerifyOtp(ticket);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                Verify & Close Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
