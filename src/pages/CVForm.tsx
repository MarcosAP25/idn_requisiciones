import React, { useState } from 'react';
import { User, Save, Plus, Trash2, FileText } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

const CVForm: React.FC = () => {
  const { addCandidateProfile } = useData();
  const { user } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      birthDate: '',
      nationality: '',
      maritalStatus: '',
      idNumber: '',
    },
    professionalSummary: '',
    workExperience: [{
      id: '1',
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      isCurrentJob: false,
    }],
    education: [{
      id: '1',
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
    }],
    skills: {
      technical: [''],
      languages: [{
        language: '',
        level: '',
      }],
      soft: [''],
    },
    certifications: [{
      id: '1',
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
    }],
    references: [{
      id: '1',
      name: '',
      position: '',
      company: '',
      phone: '',
      email: '',
    }],
    status: 'active' as const,
  });

  const handlePersonalInfoChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const handleWorkExperienceChange = (index: number, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addWorkExperience = () => {
    setFormData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, {
        id: Date.now().toString(),
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
        isCurrentJob: false,
      }]
    }));
  };

  const removeWorkExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index)
    }));
  };

  const handleEducationChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, {
        id: Date.now().toString(),
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: '',
      }]
    }));
  };

  const removeEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handleSkillChange = (type: 'technical' | 'soft', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [type]: prev.skills[type].map((skill, i) => i === index ? value : skill)
      }
    }));
  };

  const addSkill = (type: 'technical' | 'soft') => {
    setFormData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [type]: [...prev.skills[type], '']
      }
    }));
  };

  const removeSkill = (type: 'technical' | 'soft', index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [type]: prev.skills[type].filter((_, i) => i !== index)
      }
    }));
  };

  const handleLanguageChange = (index: number, field: 'language' | 'level', value: string) => {
    setFormData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        languages: prev.skills.languages.map((lang, i) => 
          i === index ? { ...lang, [field]: value } : lang
        )
      }
    }));
  };

  const addLanguage = () => {
    setFormData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        languages: [...prev.skills.languages, { language: '', level: '' }]
      }
    }));
  };

  const removeLanguage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        languages: prev.skills.languages.filter((_, i) => i !== index)
      }
    }));
  };

  const handleCertificationChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) => 
        i === index ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const addCertification = () => {
    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, {
        id: Date.now().toString(),
        name: '',
        issuer: '',
        date: '',
        expiryDate: '',
      }]
    }));
  };

  const removeCertification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const handleReferenceChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      references: prev.references.map((ref, i) => 
        i === index ? { ...ref, [field]: value } : ref
      )
    }));
  };

  const addReference = () => {
    setFormData(prev => ({
      ...prev,
      references: [...prev.references, {
        id: Date.now().toString(),
        name: '',
        position: '',
        company: '',
        phone: '',
        email: '',
      }]
    }));
  };

  const removeReference = (index: number) => {
    setFormData(prev => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      // Filter out empty skills and clean data
      const cleanedData = {
        ...formData,
        skills: {
          technical: formData.skills.technical.filter(skill => skill.trim() !== ''),
          languages: formData.skills.languages.filter(lang => lang.language.trim() !== '' && lang.level.trim() !== ''),
          soft: formData.skills.soft.filter(skill => skill.trim() !== ''),
        },
        certifications: formData.certifications.filter(cert => cert.name.trim() !== ''),
        references: formData.references.filter(ref => ref.name.trim() !== ''),
        createdBy: user.id,
      };

      addCandidateProfile(cleanedData);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        // Reset form
        setFormData({
          personalInfo: {
            fullName: '',
            email: '',
            phone: '',
            address: '',
            birthDate: '',
            nationality: '',
            maritalStatus: '',
            idNumber: '',
          },
          professionalSummary: '',
          workExperience: [{
            id: '1',
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            description: '',
            isCurrentJob: false,
          }],
          education: [{
            id: '1',
            institution: '',
            degree: '',
            field: '',
            startDate: '',
            endDate: '',
            gpa: '',
          }],
          skills: {
            technical: [''],
            languages: [{
              language: '',
              level: '',
            }],
            soft: [''],
          },
          certifications: [{
            id: '1',
            name: '',
            issuer: '',
            date: '',
            expiryDate: '',
          }],
          references: [{
            id: '1',
            name: '',
            position: '',
            company: '',
            phone: '',
            email: '',
          }],
          status: 'active' as const,
        });
      }, 2000);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Perfil Creado!</h2>
          <p className="text-gray-600">El perfil profesional ha sido registrado exitosamente.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Registro de Perfil Profesional</h1>
        <p className="text-gray-600 mt-2">Complete la información del candidato basada en su CV</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Información Personal */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Información Personal
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                value={formData.personalInfo.fullName}
                onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico *
              </label>
              <input
                type="email"
                value={formData.personalInfo.email}
                onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono *
              </label>
              <input
                type="tel"
                value={formData.personalInfo.phone}
                onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cédula *
              </label>
              <input
                type="text"
                value={formData.personalInfo.idNumber}
                onChange={(e) => handlePersonalInfoChange('idNumber', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                value={formData.personalInfo.birthDate}
                onChange={(e) => handlePersonalInfoChange('birthDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nacionalidad
              </label>
              <input
                type="text"
                value={formData.personalInfo.nationality}
                onChange={(e) => handlePersonalInfoChange('nationality', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado Civil
              </label>
              <select
                value={formData.personalInfo.maritalStatus}
                onChange={(e) => handlePersonalInfoChange('maritalStatus', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Seleccionar...</option>
                <option value="Soltero/a">Soltero/a</option>
                <option value="Casado/a">Casado/a</option>
                <option value="Divorciado/a">Divorciado/a</option>
                <option value="Viudo/a">Viudo/a</option>
                <option value="Unión Libre">Unión Libre</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dirección
              </label>
              <textarea
                value={formData.personalInfo.address}
                onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Resumen Profesional */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Resumen Profesional</h3>
          <textarea
            value={formData.professionalSummary}
            onChange={(e) => setFormData(prev => ({ ...prev, professionalSummary: e.target.value }))}
            rows={4}
            placeholder="Breve descripción del perfil profesional del candidato..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Experiencia Laboral */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Experiencia Laboral</h3>
            <button
              type="button"
              onClick={addWorkExperience}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar</span>
            </button>
          </div>

          {formData.workExperience.map((exp, index) => (
            <div key={exp.id} className="border border-gray-200 rounded-lg p-6 mb-4">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-medium text-gray-900">Experiencia {index + 1}</h4>
                {formData.workExperience.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeWorkExperience(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Empresa *
                  </label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cargo *
                  </label>
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) => handleWorkExperienceChange(index, 'position', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de Inicio *
                  </label>
                  <input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => handleWorkExperienceChange(index, 'startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de Fin
                  </label>
                  <input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => handleWorkExperienceChange(index, 'endDate', e.target.value)}
                    disabled={exp.isCurrentJob}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`current-job-${index}`}
                      checked={exp.isCurrentJob}
                      onChange={(e) => handleWorkExperienceChange(index, 'isCurrentJob', e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor={`current-job-${index}`} className="text-sm text-gray-700">
                      Trabajo actual
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => handleWorkExperienceChange(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Educación */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Educación</h3>
            <button
              type="button"
              onClick={addEducation}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar</span>
            </button>
          </div>

          {formData.education.map((edu, index) => (
            <div key={edu.id} className="border border-gray-200 rounded-lg p-6 mb-4">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-medium text-gray-900">Educación {index + 1}</h4>
                {formData.education.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Institución *
                  </label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título *
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campo de Estudio *
                  </label>
                  <input
                    type="text"
                    value={edu.field}
                    onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Promedio/GPA
                  </label>
                  <input
                    type="text"
                    value={edu.gpa}
                    onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de Inicio
                  </label>
                  <input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de Graduación
                  </label>
                  <input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Habilidades */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Habilidades</h3>

          {/* Habilidades Técnicas */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium text-gray-900">Habilidades Técnicas</h4>
              <button
                type="button"
                onClick={() => addSkill('technical')}
                className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Agregar</span>
              </button>
            </div>
            {formData.skills.technical.map((skill, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleSkillChange('technical', index, e.target.value)}
                  placeholder="Ej: JavaScript, Python, etc."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {formData.skills.technical.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSkill('technical', index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Idiomas */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium text-gray-900">Idiomas</h4>
              <button
                type="button"
                onClick={addLanguage}
                className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Agregar</span>
              </button>
            </div>
            {formData.skills.languages.map((lang, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={lang.language}
                  onChange={(e) => handleLanguageChange(index, 'language', e.target.value)}
                  placeholder="Idioma"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                  value={lang.level}
                  onChange={(e) => handleLanguageChange(index, 'level', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Nivel</option>
                  <option value="Básico">Básico</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzado">Avanzado</option>
                  <option value="Nativo">Nativo</option>
                </select>
                {formData.skills.languages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLanguage(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Habilidades Blandas */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium text-gray-900">Habilidades Blandas</h4>
              <button
                type="button"
                onClick={() => addSkill('soft')}
                className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Agregar</span>
              </button>
            </div>
            {formData.skills.soft.map((skill, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleSkillChange('soft', index, e.target.value)}
                  placeholder="Ej: Liderazgo, Comunicación, etc."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {formData.skills.soft.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSkill('soft', index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Certificaciones */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Certificaciones</h3>
            <button
              type="button"
              onClick={addCertification}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar</span>
            </button>
          </div>

          {formData.certifications.map((cert, index) => (
            <div key={cert.id} className="border border-gray-200 rounded-lg p-6 mb-4">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-medium text-gray-900">Certificación {index + 1}</h4>
                {formData.certifications.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCertification(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de la Certificación
                  </label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => handleCertificationChange(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emisor
                  </label>
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => handleCertificationChange(index, 'issuer', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de Emisión
                  </label>
                  <input
                    type="date"
                    value={cert.date}
                    onChange={(e) => handleCertificationChange(index, 'date', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de Expiración
                  </label>
                  <input
                    type="date"
                    value={cert.expiryDate}
                    onChange={(e) => handleCertificationChange(index, 'expiryDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Referencias */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Referencias</h3>
            <button
              type="button"
              onClick={addReference}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar</span>
            </button>
          </div>

          {formData.references.map((ref, index) => (
            <div key={ref.id} className="border border-gray-200 rounded-lg p-6 mb-4">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-medium text-gray-900">Referencia {index + 1}</h4>
                {formData.references.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeReference(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    value={ref.name}
                    onChange={(e) => handleReferenceChange(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cargo
                  </label>
                  <input
                    type="text"
                    value={ref.position}
                    onChange={(e) => handleReferenceChange(index, 'position', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Empresa
                  </label>
                  <input
                    type="text"
                    value={ref.company}
                    onChange={(e) => handleReferenceChange(index, 'company', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={ref.phone}
                    onChange={(e) => handleReferenceChange(index, 'phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    value={ref.email}
                    onChange={(e) => handleReferenceChange(index, 'email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>Guardar Perfil</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CVForm;