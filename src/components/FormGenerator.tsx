import React, { useState, useEffect } from 'react';
import {
  FormField,
  FormStyle,
  PredefinedField,
} from '../types/form';
import {
  Mail,
  Phone,
  User,
  MapPin,
  Home,
  Building,
  Map,
  Hash,
  FileText,
  MessageSquare,
} from 'lucide-react';

// Estilo padrão
const defaultStyle: FormStyle = {
  backgroundColor: '#ffffff',
  textColor: '#333333',
  borderColor: '#cccccc',
  borderRadius: 4,
  formBackground: '#f3f4f6',
  placeholderColor: '#9ca3af',
  iconColor: '#6b7280',
  fontSize: 16,
};

// Campos predefinidos
const predefinedFields: PredefinedField[] = [
  {
    id: 'name',
    name: 'Nome',
    type: 'text',
    defaultLabel: 'Nome Completo',
    defaultPlaceholder: 'Digite seu nome completo',
    defaultIcon: 'user',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    type: 'number',
    defaultLabel: 'WhatsApp',
    defaultPlaceholder: 'Digite seu WhatsApp',
    defaultIcon: 'phone',
  },
  {
    id: 'cpf',
    name: 'CPF',
    type: 'number',
    defaultLabel: 'CPF',
    defaultPlaceholder: 'Digite seu CPF',
    defaultIcon: 'hash',
  },
  {
    id: 'cep',
    name: 'CEP',
    type: 'number',
    defaultLabel: 'CEP',
    defaultPlaceholder: 'Digite seu CEP',
    defaultIcon: 'map-pin',
  },
  {
    id: 'email',
    name: 'Email',
    type: 'email',
    defaultLabel: 'Email',
    defaultPlaceholder: 'Digite seu email',
    defaultIcon: 'mail',
  },
  {
    id: 'state',
    name: 'Estado',
    type: 'text',
    defaultLabel: 'Estado',
    defaultPlaceholder: 'Digite seu estado',
    defaultIcon: 'map',
  },
  {
    id: 'city',
    name: 'Cidade',
    type: 'text',
    defaultLabel: 'Cidade',
    defaultPlaceholder: 'Digite sua cidade',
    defaultIcon: 'building',
  },
  {
    id: 'neighborhood',
    name: 'Bairro',
    type: 'text',
    defaultLabel: 'Bairro',
    defaultPlaceholder: 'Digite seu bairro',
    defaultIcon: 'home',
  },
  {
    id: 'street',
    name: 'Rua',
    type: 'text',
    defaultLabel: 'Rua',
    defaultPlaceholder: 'Digite sua rua',
    defaultIcon: 'map-pin',
  },
  {
    id: 'number',
    name: 'Número',
    type: 'number',
    defaultLabel: 'Número',
    defaultPlaceholder: 'Digite o número',
    defaultIcon: 'hash',
  },
  {
    id: 'complement',
    name: 'Complemento',
    type: 'text',
    defaultLabel: 'Complemento',
    defaultPlaceholder: 'Digite o complemento',
    defaultIcon: 'file-text',
  },
];

// Ícones disponíveis
const availableIcons = {
  user: User,
  phone: Phone,
  mail: Mail,
  'map-pin': MapPin,
  home: Home,
  building: Building,
  map: Map,
  hash: Hash,
  'file-text': FileText,
  'message-square': MessageSquare,
};

// Função para obter o valor de um parâmetro da URL
function getParameterByName(name: string, url: string = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export default function FormGenerator() {
  const [step, setStep] = useState<'fields' | 'configure' | 'style' | 'preview'>('fields');
  const [selectedFieldIds, setSelectedFieldIds] = useState<string[]>([]);
  const [fields, setFields] = useState<FormField[]>([]);
  const [style, setStyle] = useState<FormStyle>(defaultStyle);
  const [formId, setFormId] = useState<string | null>(null); // Estado para armazenar o ID
  const [submitButtonLabel, setSubmitButtonLabel] = useState<string>('Enviar');
  const [submitButtonColor, setSubmitButtonColor] = useState<string>('green');
  const [submitButtonFontSize, setSubmitButtonFontSize] = useState<number>(16);

  useEffect(() => {
    // Obtém o ID da URL ao montar o componente
    const id = getParameterByName('id');
    setFormId(id);
  }, []); // O array vazio garante que isso só rode uma vez (na montagem)

  // Criar configurações de campo com base nos campos selecionados
  const createFieldConfigs = () => {
    const selectedFields = selectedFieldIds.map((id) => {
      const predefined = predefinedFields.find((f) => f.id === id)!;
      return {
        id: predefined.id,
        type: predefined.type,
        label: predefined.defaultLabel,
        placeholder: predefined.defaultPlaceholder,
        icon: predefined.defaultIcon,
        required: false,
        fontSize: 16,
      };
    });
    setFields(selectedFields);
    setStep('configure');
  };

  // Atualizar um campo específico
  const updateField = (index: number, field: Partial<FormField>) => {
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], ...field };
    setFields(newFields);
  };

  // Obter componente de ícone com base no nome
  const getIconComponent = (iconName: string) => {
    const IconComponent = availableIcons[iconName as keyof typeof availableIcons];
    return IconComponent ? <IconComponent size={20} color={style.iconColor} /> : null;
  };

  const generateFormHTML = () => {
    let formHTML = `<form>`;
    fields.forEach(field => {
      formHTML += `
        <div style="margin-bottom: 1rem;">
          <label style="display: flex; align-items: center; gap: 0.5rem; font-size: ${field.fontSize}px; color: ${style.textColor};">
            ${availableIcons[field.icon] ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${style.iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>` : ''}
            ${field.label}
            ${field.required ? '<span style="color: red;">*</span>' : ''}
          </label>
          <input
            type="${field.type}"
            placeholder="${field.placeholder}"
            style="width: 100%; padding: 0.5rem; font-size: ${field.fontSize}px; border: 1px solid ${style.borderColor}; border-radius: ${style.borderRadius}px; background-color: ${style.backgroundColor}; color: ${style.textColor};"
          />
        </div>
      `;
    });
    formHTML += `<button type="submit" style="width: 100%; background-color: ${submitButtonColor}; color: white; padding: 0.5rem; border: none; border-radius: 4px; cursor: pointer; font-size: ${submitButtonFontSize}px;">${submitButtonLabel}</button></form>`;
    return formHTML;
  };

  return (
    <div className="flex flex-col items-center p-4">
      {/* Painel de Configuração */}
      <h1 className="text-2xl font-bold mb-4">Configuração do Formulário</h1>

      {/* Etapa 1: Selecionar Campos */}
      {step === 'fields' && (
        <div className="w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Selecione os Campos do Formulário</h2>
          {predefinedFields.map((field) => (
            <div key={field.id} className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={selectedFieldIds.includes(field.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedFieldIds([...selectedFieldIds, field.id]);
                  } else {
                    setSelectedFieldIds(selectedFieldIds.filter((id) => id !== field.id));
                  }
                }}
                className="w-4 h-4"
              />
              <label>{field.name}</label>
            </div>
          ))}
          <button
            onClick={() => createFieldConfigs()}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            Continuar para a Configuração
          </button>
        </div>
      )}

      {/* Etapa 2: Configurar Campos */}
      {step === 'configure' && (
        <div className="w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Configuração dos Campos</h2>
          {fields.map((field, index) => (
            <div key={field.id} className="mb-4">
              <h3 className="text-lg font-medium mb-2">{predefinedFields.find((f) => f.id === field.id)?.name}</h3>
              <div className="mb-2">
                <label className="block text-sm font-medium">Rótulo</label>
                <input
                  type="text"
                  value={field.label}
                  onChange={(e) => updateField(index, { label: e.target.value })}
                  placeholder="Digite o rótulo do campo"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Placeholder</label>
                <input
                  type="text"
                  value={field.placeholder}
                  onChange={(e) => updateField(index, { placeholder: e.target.value })}
                  placeholder="Digite o texto do placeholder"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) => updateField(index, { required: e.target.checked })}
                  className="w-4 h-4"
                />
                <label>Campo Obrigatório</label>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Tamanho da Fonte ({field.fontSize}px)</label>
                <input
                  type="range"
                  min="10"
                  max="24"
                  value={field.fontSize}
                  onChange={(e) => updateField(index, { fontSize: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>
          ))}
           <div className="mb-4">
              <label className="block text-sm font-medium">Texto do Botão Submit</label>
              <input
                type="text"
                value={submitButtonLabel}
                onChange={(e) => setSubmitButtonLabel(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
             <div className="mb-2">
                <label className="block text-sm font-medium">Tamanho da Fonte do Botão Submit ({submitButtonFontSize}px)</label>
                <input
                  type="range"
                  min="10"
                  max="24"
                  value={submitButtonFontSize}
                  onChange={(e) => setSubmitButtonFontSize(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
          <button
            onClick={() => setStep('style')}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            Continuar para a Estilização
          </button>
        </div>
      )}

      {/* Etapa 3: Configurar Estilos */}
      {step === 'style' && (
        <div className="w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Configuração de Estilo</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium">Cor de Fundo do Formulário</label>
            <input
              type="color"
              value={style.formBackground}
              onChange={(e) => setStyle({ ...style, formBackground: e.target.value })}
              className="w-full h-10"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Cor de Fundo da Entrada</label>
            <input
              type="color"
              value={style.backgroundColor}
              onChange={(e) => setStyle({ ...style, backgroundColor: e.target.value })}
              className="w-full h-10"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Cor do Texto</label>
            <input
              type="color"
              value={style.textColor}
              onChange={(e) => setStyle({ ...style, textColor: e.target.value })}
              className="w-full h-10"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Cor do Placeholder</label>
            <input
              type="color"
              value={style.placeholderColor}
              onChange={(e) => setStyle({ ...style, placeholderColor: e.target.value })}
              className="w-full h-10"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Cor do Ícone</label>
            <input
              type="color"
              value={style.iconColor}
              onChange={(e) => setStyle({ ...style, iconColor: e.target.value })}
              className="w-full h-10"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Cor da Borda</label>
            <input
              type="color"
              value={style.borderColor}
              onChange={(e) => setStyle({ ...style, borderColor: e.target.value })}
              className="w-full h-10"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Cor do Botão Submit</label>
            <input
              type="color"
              value={submitButtonColor}
              onChange={(e) => setSubmitButtonColor(e.target.value)}
              className="w-full h-10"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Raio da Borda</label>
            <input
              type="range"
              min="0"
              max="20"
              value={style.borderRadius}
              onChange={(e) => setStyle({ ...style, borderRadius: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Tamanho da Fonte Padrão ({style.fontSize}px)</label>
            <input
              type="range"
              min="10"
              max="24"
              value={style.fontSize}
              onChange={(e) => setStyle({ ...style, fontSize: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
          <button
            onClick={() => setStep('preview')}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            Visualizar Formulário
          </button>
        </div>
      )}

      {/* Etapa 4: Pré-visualização */}
      {step === 'preview' && (
        <div
          className="w-full max-w-md p-4 rounded-md form-preview"
          style={{ backgroundColor: style.formBackground }}
        >
          <h2 className="text-xl font-semibold mb-4">Pré-visualização do Formulário</h2>
          <div dangerouslySetInnerHTML={{ __html: generateFormHTML() }} />
          <button
            onClick={() => {
              // Lógica para enviar o HTML do formulário e as configurações para o webhook
              const formHtml = generateFormHTML(); // Obtém o HTML do formulário
              const id = formId; // Obtém o ID do estado

              if (formHtml && id) {
                // Inclui as configurações de estilo e campos no objeto a ser enviado
                const formData = {
                  id: id,
                  html: formHtml,
                  style: style,
                  fields: fields,
                  submitButtonLabel: submitButtonLabel,
                  submitButtonColor: submitButtonColor,
                  submitButtonFontSize: submitButtonFontSize
                };

                fetch('https://n8n.atendimentoaocliente.shop/webhook-test/get-form', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json' // Envia como JSON
                  },
                  body: JSON.stringify(formData) // Envia o objeto com HTML, estilo e campos
                })
                  .then(response => {
                    console.log('Response Status:', response.status);
                    console.log('Response Headers:', response.headers);
                    if (response.ok) {
                      alert('Formulário enviado com sucesso!');
                    } else {
                      alert(`Erro ao enviar o formulário: ${response.status} - ${response.statusText}`);
                    }
                  })
                  .catch(error => {
                    console.error('Erro:', error);
                    alert('Erro ao enviar o formulário.');
                  });
              } else {
                alert('Não foi possível obter o HTML do formulário ou o ID.');
              }
            }}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2 mt-6"
          >
            Concluir
          </button>
        </div>
      )}
    </div>
  );
}
