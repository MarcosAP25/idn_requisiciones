import React from 'react';
import { Users, FileText, TrendingUp, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useData } from '../context/DataContext';

const Dashboard: React.FC = () => {
  const { users, requisitions } = useData();

  const monthlyData = [
    { month: 'Ene', solicitudes: 12 },
    { month: 'Feb', solicitudes: 8 },
    { month: 'Mar', solicitudes: 15 },
    { month: 'Abr', solicitudes: 10 },
    { month: 'May', solicitudes: 18 },
    { month: 'Jun', solicitudes: 14 },
    { month: 'Jul', solicitudes: 22 },
    { month: 'Ago', solicitudes: 16 },
    { month: 'Sep', solicitudes: 20 },
    { month: 'Oct', solicitudes: 19 },
    { month: 'Nov', solicitudes: 25 },
    { month: 'Dic', solicitudes: 21 }
  ];

  const totalThisYear = monthlyData.reduce((sum, month) => sum + month.solicitudes, 0);

  const stats = [
    {
      title: 'Usuarios Registrados',
      value:  users.length, //users.length,
      icon: Users,
      color: 'bg-blue-500',
      change: '0%',
      changeType: 'neutral' as const
    },
    {
      title: 'Total de solicitudes',
      value: totalThisYear,
      icon: FileText,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'positive' as const
    },
    {
      title: 'Solicitudes Pendientes',
      value: requisitions.filter(r => r.status === 'pending').length,
      icon: Calendar,
      color: 'bg-yellow-500',
      change: '-5%',
      changeType: 'negative' as const
    },
   
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Resumen del sistema de requisiciones de personal</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Solicitudes por Mes</h3>
            <p className="text-gray-600">Tendencia de solicitudes durante el año</p>
          </div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="solicitudes" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Actividad Reciente</h3>
        <div className="space-y-4">
          {requisitions.slice(0, 5).map((req) => (
            <div key={req.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{req.position}</p>
                  <p className="text-sm text-gray-500">{req.department}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  req.status === 'approved' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {req.status === 'pending' ? 'Pendiente' :
                   req.status === 'approved' ? 'Aprobada' : 'Rechazada'}
                </span>
                <p className="text-xs text-gray-500 mt-1">{req.requestDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;