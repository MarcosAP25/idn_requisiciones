import React, { useState } from 'react';
import { Search, Eye, Edit, Trash2, Plus, User, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, Award, Users } from 'lucide-react';
import { useCandidateProfile } from '../context/CandidateProfileContext';
import { CandidateProfile } from '../types';
import { format } from 'date-fns';

const CandidateProfiles: React.FC = () => {
  const { candidateProfiles, deleteCandidateProfile } = useCandidateProfile();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<CandidateProfile | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredProfiles = candidateProfiles.filter(profile =>
    profile.personalInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.personalInfo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.workExperience.some(exp => 
      exp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.position.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredProfiles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProfiles = filteredProfiles.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (id: string) => {
    if (confirm('¿Está seguro de que desea eliminar este perfil?')) {
      deleteCandidateProfile(id);
    }
  };

  const handleViewProfile = (profile: CandidateProfile) => {
    setSelectedProfile(profile);
  };

  const closeProfileModal = () => {
    setSelectedProfile(null);
  };

  const getYearsOfExperience = (workExperience: any[]) => {
    if (!workExperience.length) return 0;
    
    const totalMonths = workExperience.reduce((total, exp) => {
      const start = new Date(exp.startDate + '-01');
      const end = exp.isCurrentJob ? new Date() : new Date(exp.endDate + '-01');
      const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
      return total + Math.max(0, months);
    }, 0);
    
    return Math.floor(totalMonths / 12);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Perfiles Profesionales</h1>
          <p className="text-gray-600 mt-2">Gestione los perfiles de candidatos registrados</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Nuevo Perfil</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="relative max-w-md">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nombre, email o empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProfiles.map((profile) => (
          <div key={profile.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {profile.personalInfo.fullName}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    {profile.workExperience[0]?.position || 'Sin experiencia registrada'}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="truncate">{profile.personalInfo.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{profile.personalInfo.phone}</span>
                </div>
                {profile.personalInfo.address && (
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="truncate">{profile.personalInfo.address}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <div className="flex items-center">
                  <Briefcase className="w-3 h-3 mr-1" />
                  <span>{getYearsOfExperience(profile.workExperience)} años exp.</span>
                </div>
                <div className="flex items-center">
                  <GraduationCap className="w-3 h-3 mr-1" />
                  <span>{profile.education.length} títulos</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-3 h-3 mr-1" />
                  <span>{profile.certifications.length} cert.</span>
                </div>
              </div>

              {profile.professionalSummary && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {profile.professionalSummary}
                </p>
              )}

              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  profile.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {profile.status === 'active' ? 'Activo' : 'Inactivo'}
                </span>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleViewProfile(profile)}
                    className="text-blue-600 hover:text-blue-900 p-1 rounded"
                    title="Ver perfil completo"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    className="text-yellow-600 hover:text-yellow-900 p-1 rounded"
                    title="Editar"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(profile.id)}
                    className="text-red-600 hover:text-red-900 p-1 rounded"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredProfiles.length)} de {filteredProfiles.length} perfiles
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border border-gray-300 text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded text-sm ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border border-gray-300 text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Detail Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={closeProfileModal}></div>

            <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Perfil Profesional</h3>
                <button
                  onClick={closeProfileModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto space-y-6">
                {/* Personal Information */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Información Personal
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                      <p className="text-sm text-gray-900">{selectedProfile.personalInfo.fullName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                      <p className="text-sm text-gray-900">{selectedProfile.personalInfo.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                      <p className="text-sm text-gray-900">{selectedProfile.personalInfo.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Cédula</label>
                      <p className="text-sm text-gray-900">{selectedProfile.personalInfo.idNumber}</p>
                    </div>
                    {selectedProfile.personalInfo.birthDate && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                        <p className="text-sm text-gray-900">{selectedProfile.personalInfo.birthDate}</p>
                      </div>
                    )}
                    {selectedProfile.personalInfo.nationality && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Nacionalidad</label>
                        <p className="text-sm text-gray-900">{selectedProfile.personalInfo.nationality}</p>
                      </div>
                    )}
                    {selectedProfile.personalInfo.maritalStatus && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Estado Civil</label>
                        <p className="text-sm text-gray-900">{selectedProfile.personalInfo.maritalStatus}</p>
                      </div>
                    )}
                    {selectedProfile.personalInfo.address && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Dirección</label>
                        <p className="text-sm text-gray-900">{selectedProfile.personalInfo.address}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Professional Summary */}
                {selectedProfile.professionalSummary && (
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Resumen Profesional</h4>
                    <p className="text-sm text-gray-700">{selectedProfile.professionalSummary}</p>
                  </div>
                )}

                {/* Work Experience */}
                {selectedProfile.workExperience.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Briefcase className="w-5 h-5 mr-2" />
                      Experiencia Laboral
                    </h4>
                    <div className="space-y-4">
                      {selectedProfile.workExperience.map((exp, index) => (
                        <div key={exp.id} className="border-l-4 border-blue-500 pl-4">
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium text-gray-900">{exp.position}</h5>
                            {exp.isCurrentJob && (
                              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                Actual
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-blue-600 font-medium">{exp.company}</p>
                          <p className="text-xs text-gray-500">
                            {exp.startDate} - {exp.isCurrentJob ? 'Presente' : exp.endDate}
                          </p>
                          {exp.description && (
                            <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {selectedProfile.education.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <GraduationCap className="w-5 h-5 mr-2" />
                      Educación
                    </h4>
                    <div className="space-y-4">
                      {selectedProfile.education.map((edu, index) => (
                        <div key={edu.id} className="border-l-4 border-green-500 pl-4">
                          <h5 className="font-medium text-gray-900">{edu.degree} en {edu.field}</h5>
                          <p className="text-sm text-green-600 font-medium">{edu.institution}</p>
                          <p className="text-xs text-gray-500">
                            {edu.startDate} - {edu.endDate}
                          </p>
                          {edu.gpa && (
                            <p className="text-sm text-gray-700">Promedio: {edu.gpa}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Habilidades</h4>
                  
                  {selectedProfile.skills.technical.length > 0 && (
                    <div className="mb-4">
                      <h5 className="font-medium text-gray-900 mb-2">Técnicas</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedProfile.skills.technical.map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProfile.skills.languages.length > 0 && (
                    <div className="mb-4">
                      <h5 className="font-medium text-gray-900 mb-2">Idiomas</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedProfile.skills.languages.map((lang, index) => (
                          <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {lang.language} - {lang.level}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProfile.skills.soft.length > 0 && (
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Blandas</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedProfile.skills.soft.map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Certifications */}
                {selectedProfile.certifications.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Certificaciones
                    </h4>
                    <div className="space-y-3">
                      {selectedProfile.certifications.map((cert, index) => (
                        <div key={cert.id} className="border-l-4 border-yellow-500 pl-4">
                          <h5 className="font-medium text-gray-900">{cert.name}</h5>
                          <p className="text-sm text-yellow-600 font-medium">{cert.issuer}</p>
                          <p className="text-xs text-gray-500">
                            Emitido: {cert.date}
                            {cert.expiryDate && ` | Expira: ${cert.expiryDate}`}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* References */}
                {selectedProfile.references.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Referencias
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedProfile.references.map((ref, index) => (
                        <div key={ref.id} className="border border-gray-200 rounded-lg p-4">
                          <h5 className="font-medium text-gray-900">{ref.name}</h5>
                          <p className="text-sm text-gray-600">{ref.position}</p>
                          <p className="text-sm text-gray-600">{ref.company}</p>
                          <div className="mt-2 space-y-1">
                            <p className="text-xs text-gray-500">📞 {ref.phone}</p>
                            <p className="text-xs text-gray-500">✉️ {ref.email}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={closeProfileModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cerrar
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                  Editar Perfil
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateProfiles;