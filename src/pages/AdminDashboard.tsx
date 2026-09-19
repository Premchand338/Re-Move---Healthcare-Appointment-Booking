import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Users, Calendar, Stethoscope, ClipboardList, TrendingUp, Clock, LayoutDashboard, LogOut , Menu , X} from 'lucide-react';
import { api } from '../lib/api';

interface DashboardStats {
  totalPatients: number;
  totalTherapists: number;
  todayAppointments: number;
}

const sidebarItems = [
  { label: 'Overview', icon: LayoutDashboard, path: '/admin', enabled: true },
  { label: 'Therapists', icon: Stethoscope, path: '/admin/therapists', enabled: true },
  { label: 'Patients', icon: Users, path: '/admin/patients', enabled: false },       // future
  { label: 'Appointments', icon: Calendar, path: '/admin/appointments', enabled: false }, // future
  { label: 'Services', icon: ClipboardList, path: '/admin/services', enabled: false },    // future
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    window.location.href = '/';  
  };

   const handleNavClick = (path: string) => {
    navigate(path);
    setSidebarOpen(false); // link-click-pe mobile-sidebar-auto-close
  };

  return (
    <div className="min-h-screen bg-[#F9F8F5] flex">

         {/* Mobile top-bar — sirf small-screens-pe dikhega */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-[#E5E1D8] h-14 flex items-center px-4 gap-3">
        <button
          onClick={() => setSidebarOpen((open) => !open)}
          className="p-2 text-[#4A4843] hover:bg-[#EFECE3] rounded-xl transition-colors"
          aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={sidebarOpen}
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <span className="font-editorial-serif text-lg font-bold text-[#181816] tracking-widest">
          KINETIC
        </span>
      </div>

      {/* Overlay — sidebar-open-hone-pe background-dim */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`w-64 shrink-0 bg-white border-r border-[#E5E1D8] flex flex-col fixed inset-y-0 left-0 z-50 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
       <div className="px-6 py-5 border-b border-[#E5E1D8] flex items-center justify-between">
          <div>
            <span className="font-editorial-serif text-xl font-bold text-[#181816] tracking-widest">
              KINETIC
            </span>
            <p className="text-[10px] font-clinical-mono uppercase tracking-wider text-[#7A766E] mt-0.5">
              Admin Panel
            </p>
          </div>
          {/* Close-button sirf-mobile-pe */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 text-[#4A4843] hover:bg-[#EFECE3] rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => item.enabled && handleNavClick(item.path)}
                disabled={!item.enabled}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#181816] text-white'
                    : item.enabled
                    ? 'text-[#4A4843] hover:bg-[#EFECE3]'
                    : 'text-neutral-300 cursor-not-allowed'
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
                {!item.enabled && (
                  <span className="ml-auto text-[9px] font-clinical-mono uppercase text-neutral-300">Soon</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[#E5E1D8]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
       <main className="flex-1 overflow-y-auto pt-14 lg:pt-0">{children}</main>
    </div>
  );
}

export function AdminDashboardOverview() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPatients: 0,
    totalTherapists: 0,
    todayAppointments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [patients, therapists, appointments] = await Promise.all([
          api.get<any[]>('/patients').catch(() => []),
          api.get<any[]>('/therapists'),
          api.get<any[]>('/appointments'),
        ]);

        const today = new Date().toISOString().split('T')[0];
        const todayAppointments = appointments.filter(
          (apt) => apt.appointmentAt.startsWith(today) && apt.status === 'booked'
        ).length;

        setStats({
          totalPatients: patients.length,
          totalTherapists: therapists.length,
          todayAppointments,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#C59E5F] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-8 py-8">
      <h1 className="font-editorial-serif text-3xl font-bold text-[#181816] mb-1">Overview</h1>
      <p className="text-sm text-neutral-600 font-clinical-mono mb-8">Welcome back, Administrator</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border-2 border-[#E5E1D8] hover:border-[#C59E5F] transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-neutral-400" />
          </div>
          <p className="text-3xl font-bold text-[#181816] font-editorial-serif">{stats.totalPatients}</p>
          <p className="text-xs font-clinical-mono text-neutral-600 mt-1 uppercase tracking-wider">Total Patients</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-[#E5E1D8] hover:border-[#C59E5F] transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-emerald-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-neutral-400" />
          </div>
          <p className="text-3xl font-bold text-[#181816] font-editorial-serif">{stats.totalTherapists}</p>
          <p className="text-xs font-clinical-mono text-neutral-600 mt-1 uppercase tracking-wider">Active Therapists</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-[#E5E1D8] hover:border-[#C59E5F] transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-amber-600" />
            </div>
            <Clock className="w-5 h-5 text-neutral-400" />
          </div>
          <p className="text-3xl font-bold text-[#181816] font-editorial-serif">{stats.todayAppointments}</p>
          <p className="text-xs font-clinical-mono text-neutral-600 mt-1 uppercase tracking-wider">Today's Bookings</p>
        </div>
      </div>
    </div>
  );
}