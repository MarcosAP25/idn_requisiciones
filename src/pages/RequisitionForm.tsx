import React, { useState } from 'react';
import { Building2, Save, FileText } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

const RequisitionForm: React.FC = () => {
  const { addRequisition } = useData();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    requestDate: new Date().toISOString().split('T')[0],
    receptionDate: '',
    department: '',
    section: '',
    unit: '',
    position: '',
    quantity: 1,
    recruitmentType: 'civil' as 'military' | 'civil',
    recruitmentCause: '',
    substitutes: '',
    internalCandidate: '',
    schedule: '',
    academicLevel: '',
    specialStudies: '',
    workExperience: '',
    languages: '',
    softwareSkills: '',
    otherKnowledge: '',
    positionObjective: '',
    dependentPositions: '',
    requiredEquipment: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      addRequisition({
        ...formData,
        createdBy: user.id,
        status: 'pending',
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          requestDate: new Date().toISOString().split('T')[0],
          receptionDate: '',
          department: '',
          section: '',
          unit: '',
          position: '',
          quantity: 1,
          recruitmentType: 'civil',
          recruitmentCause: '',
          substitutes: '',
          internalCandidate: '',
          schedule: '',
          academicLevel: '',
          specialStudies: '',
          workExperience: '',
          languages: '',
          softwareSkills: '',
          otherKnowledge: '',
          positionObjective: '',
          dependentPositions: '',
          requiredEquipment: '',
        });
      }, 2000);
    }
  };

  const recruitmentCauses = [
    'Creacion', 'Promocion', 'Transferencia', 'Cancelacion', 
    'Renuncia', 'Cambio institucional', 'Incremento de labores', 'Otros'
  ];

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Requisición Enviada!</h2>
          <p className="text-gray-600">La solicitud ha sido creada exitosamente.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center">
          <div className="flex items-center justify-center mb-4 ">
            <img src="/images/dni_logo.png" alt="" className='w-48 h-48'/>
          </div>   

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Departamento Nacional de Investigaciones
          </h1>
          <h2 className="text-lg font-semibold text-gray-700 mb-1">Recursos Humanos</h2>
          <h3 className="text-xl font-bold text-blue-600">REQUISICIÓN DE PERSONAL</h3>
        </div>

        {/* Datos de Solicitud */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Datos de Solicitud</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Solicitud *
              </label>
              <input
                type="date"
                name="requestDate"
                value={formData.requestDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Recepción *
              </label>
              <input
                type="date"
                name="receptionDate"
                value={formData.receptionDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Departamento *
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sección *
              </label>
              <input
                type="text"
                name="section"
                value={formData.section}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unidad *
              </label>
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Puesto *
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cantidad *
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Reclutamiento *
              </label>
              <select
                name="recruitmentType"
                value={formData.recruitmentType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="civil">Civil</option>
                <option value="military">Militar</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Causa del Reclutamiento *
              </label>
              <select
                name="recruitmentCause"
                value={formData.recruitmentCause}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="" disabled>Seleccionar...</option>
                {recruitmentCauses.map(cause => (
                  <option key={cause} value={cause}>{cause}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sustituye a
              </label>
              <input
                type="text"
                name="substitutes"
                value={formData.substitutes}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Candidato Interno a Considerar
              </label>
              <input
                type="text"
                name="internalCandidate"
                value={formData.internalCandidate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Horario *
              </label>
              <input
                type="text"
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                placeholder="Ej: 8:00 AM - 5:00 PM"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        {/* Perfil del Puesto */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Perfil del Puesto</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nivel Académico *
              </label>
              <textarea
                name="academicLevel"
                value={formData.academicLevel}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estudios Especiales
              </label>
              <textarea
                name="specialStudies"
                value={formData.specialStudies}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experiencia Laboral *
              </label>
              <textarea
                name="workExperience"
                value={formData.workExperience}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Idiomas
              </label>
              <textarea
                name="languages"
                value={formData.languages}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Manejo de Equipos/Software
              </label>
              <textarea
                name="softwareSkills"
                value={formData.softwareSkills}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Otros Conocimientos
              </label>
              <textarea
                name="otherKnowledge"
                value={formData.otherKnowledge}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Información Adicional */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Información Adicional</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Objetivo del Puesto *
              </label>
              <textarea
                name="positionObjective"
                value={formData.positionObjective}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Posiciones que Dependen de Este Puesto
              </label>
              <textarea
                name="dependentPositions"
                value={formData.dependentPositions}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Equipos de Trabajo Requeridos por el Puesto
              </label>
              <textarea
                name="requiredEquipment"
                value={formData.requiredEquipment}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>Enviar Requisición</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequisitionForm;