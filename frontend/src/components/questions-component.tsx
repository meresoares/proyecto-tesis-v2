// src/components/questions-component.tsx

import React from 'react';
import '../styles/estilo.css';

interface Pregunta {
  id: number;
  descripcion: string;
}

interface QuestionProps {
  preguntas: Pregunta[];
  onChangeRespuesta: (preguntaId: number, respuesta: string) => void;
}

const opciones = [
  { label: "Nada", value: 0 },
  { label: "Muy poco", value: 1 },
  { label: "Un poco", value: 2 },
  { label: "Mucho", value: 3 },
  { label: "Demasiado", value: 4 }
];

const Questions: React.FC<QuestionProps> = ({ preguntas, onChangeRespuesta }) => {
  const handleChange = (preguntaId: number, respuesta: string) => {
    onChangeRespuesta(preguntaId, respuesta);
  };;

  return (
    <table>
      <thead>
        <tr>
          <th>ítems</th>
          {opciones.map((opcion, index) => (
            <th key={index}>{opcion.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {preguntas.map((pregunta) => (
          <tr key={pregunta.id}>
            <td>{pregunta.descripcion}</td>
            {opciones.map((opcion) => (
              <td key={opcion.label}>
                <input
                  type="radio"
                  name={`pregunta_${pregunta.id}`}
                  value={opcion.label}
                  onChange={(e) => handleChange(pregunta.id, e.target.value.toString())}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Questions;