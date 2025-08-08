import React, { useState } from 'react';
import { Building2, Save, FileText } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import FormField from '../components/Form/FormField';
import { Requisition } from '../types';

const RequisitionForm: React.FC = () => {

  const requestDate: string = new Date().toISOString().split('T')[0];
  const blankRequisition: Requisition = {
    id:' 1',
    number: '',
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
    createdAt: new Date().toISOString().split('T')[0],
    createdBy: '',
    status: 'approved',
  };

  const { addRequisition } = useData();
  const { user } = useAuth();
  const [formData, setFormData]  = useState<Requisition>(blankRequisition);

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
      addRequisition(formData);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData(blankRequisition);
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
            <img src="/images/dni_logo.png" alt="" className='w-32 h-32'/>
          </div>   

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Departamento Nacional de Investigaciones
          </h1>
          <h2 className="text-lg font-semibold text-gray-700 mb-1">Recursos Humanos</h2>
          <h3 className="text-xl font-bold text-blue-600">REQUISICIÓN DE PERSONAL</h3>
        </div>

        {/* Datos de Solicitud */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
           <h3 className="text-xl font-bold text-gray-900 mb-6">Datos de Solicitud</h3>
           {/* <h3 className="text-lg text-gray-400 mb-6 justify-self-end">Fecha de la solicitud: {formData.requestDate}</h3> */}
         </div>
          
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

            <FormField
              onChange={handleChange}
              value={formData.department}
              title="Departamento *"
              type="text"
              name="department"
              required={true}
            />

            <FormField
              onChange={handleChange}
              value={formData.section}
              title="Sección *"
              type="text"
              name="section"
              required={true}
            />

            <FormField
              onChange={handleChange}
              value={formData.unit}
              title="Unidad *"
              type="text"
              name="unit"
              required={true}
            />

            <FormField
              onChange={handleChange}
              value={formData.position}
              title="Puesto *"
              type="text"
              name="position"
              required={true}
            />

            <FormField
              onChange={handleChange}
              value={formData.quantity}
              title="Cantidad *"
              type="number"
              name="quantity"
              required={true}
              min='1'
            />

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

            <FormField
              onChange={handleChange}
              value={formData.substitutes}
              title="Sustituye a"
              type="text"
              name="substitutes"
              required={false}
            />

            <FormField
              onChange={handleChange}
              value={formData.internalCandidate}
              title="Candidato Interno a Considerar"
              type="text"
              name="internalCandidate"
              required={false}
            />

            <FormField
              onChange={handleChange}
              value={formData.schedule}
              title="Horario *"
              type="text"
              name="schedule"
              placeholder="Ej: 8:00 AM - 5:00 PM"
              required={true}
            />
          </div>
        </div>

        {/* Perfil del Puesto */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Perfil del Puesto</h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FormField
                onChange={handleChange}
                value={formData.academicLevel}
                title="Nivel Académico *"
                type="text"
                name="academicLevel"
                required={true}
              />
              <FormField
                onChange={handleChange}
                value={formData.specialStudies}
                title="Estudios Especiales"
                type="text"
                name="specialStudies"
                required={false}
              />
              <FormField
                onChange={handleChange}
                value={formData.languages}
                title="Idiomas"
                type="text"
                name="languages"
                required={false}
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
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <FormField
                onChange={handleChange}
                value={formData.softwareSkills}
                title="Manejo de Equipos/Software"
                type="text"
                name="softwareSkills"
                required={false}
              />
              <FormField
                onChange={handleChange}
                value={formData.otherKnowledge}
                title="Otros Conocimientos"
                type="text"
                name="otherKnowledge"
                required={false}
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