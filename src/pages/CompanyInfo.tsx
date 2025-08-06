import React from 'react';
import { Building2, Phone, Mail, MapPin, Globe, Calendar } from 'lucide-react';

const CompanyInfo: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Información de la Institución</h1>
        <p className="text-gray-600 mt-2">Datos de contacto y ubicación</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header with Logo */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12 text-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Departamento Nacional de Investigación
          </h2>
        </div>

        <div className="p-8 space-y-8">
          {/* Contact Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Información de Contacto</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Teléfono</p>
                    <p className="text-gray-600">(809) 695-8000</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Móvil</p>
                    <p className="text-gray-600">-</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">WhatsApp</p>
                    <p className="text-gray-600">-</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Correo Electrónico</p>
                    <p className="text-gray-600">rrhh@dni.gov.do</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ubicación</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-red-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Dirección</p>
                    <p className="text-gray-600">C/Moisés García Esq. C/Uruguay, Gazcue</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-red-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Ciudad</p>
                    <p className="text-gray-600">Santo Domingo</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-red-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Dirección del Estado</p>
                    <p className="text-gray-600">Distrito Nacional</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-red-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Código Postal</p>
                    <p className="text-gray-600">10204</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Information */}
          <div className="border-t pt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Información Legal</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <Building2 className="w-5 h-5 text-gray-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">RNC</p>
                  <p className="text-gray-600">-</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="border-t pt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Redes Sociales</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Globe className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Google+</p>
                    <p className="text-gray-600">-</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Globe className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Facebook</p>
                    <p className="text-gray-600">-</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Globe className="w-5 h-5 text-blue-400 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Twitter</p>
                    <p className="text-gray-600">@</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Globe className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Instagram</p>
                    <p className="text-gray-600">@</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Globe className="w-5 h-5 text-blue-700 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">LinkedIn</p>
                    <p className="text-gray-600">-</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="border-t pt-8 text-center">
            <div className="inline-flex items-center space-x-2 text-gray-500">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Última actualización: 2021-03-04 11:10:56</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Actualizado por: -</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;