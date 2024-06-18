// src/components/questions-component.tsx

import React from 'react';
import '../styles/estilo.css';
import '../styles/test.css'

interface Pregunta {
  id: number;
  descripcion: string;
}

interface QuestionProps {
  pregunta: Pregunta;
  onChangeRespuesta: (preguntaId: number, respuesta: string) => void;
  respuestaActual: string;
}

const opciones = [
  { label: "Nada", value: 0 },
  { label: "Muy poco", value: 1 },
  { label: "Un poco", value: 2 },
  { label: "Mucho", value: 3 },
  { label: "Demasiado", value: 4 }
];

const Questions: React.FC<QuestionProps> = ({ pregunta, onChangeRespuesta, respuestaActual }) => {
  const handleChange = (respuesta: string) => {
    onChangeRespuesta(pregunta.id, respuesta);
  };

  return (
    <div className="question-container">
      <h5 className="text-center">{pregunta.descripcion}</h5>
      <div className="options">
        {opciones.map((opcion) => (
          <button
            key={opcion.value}
            className={`option-button ${respuestaActual === opcion.label ? 'selected' : ''}`}
            onClick={() => handleChange(opcion.label)}
          >
            {opcion.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Questions;