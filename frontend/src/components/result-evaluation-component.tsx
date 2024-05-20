import React from 'react';


interface ResultEvaluationProps {
  resultado: string; // Especifica el tipo de la prop resultado como string
}

const ResultEvaluation: React.FC<ResultEvaluationProps> = ({ resultado }) => {
  // Función para generar el mensaje y los consejos según el resultado
  const generarMensaje = (resultado: string) => {
    let mensaje = '';
    let consejos = '';

    switch (resultado) {
      case 'Ansiedad Social Baja':
        mensaje = 'El resultado de la evaluación es: Ansiedad Social Baja';
        consejos = 'Aquí tienes algunos consejos para manejar la ansiedad social baja: Ejercicios de respiración';
        break;
      case 'Ansiedad Social Moderada':
        mensaje = 'El resultado de la evaluación es: Ansiedad Social Moderada';
        consejos = 'Aquí tienes algunos consejos para manejar la ansiedad social moderada: Ir a terapia, realizar ejercicios fisicos';
        break;
        case 'Ansiedad Social Alta':
          mensaje = 'El resultado de la evaluación es: Ansiedad Social Alta';
          consejos = 'Aquí tienes algunos consejos para manejar la ansiedad social alta: Ir a terapia y contar con acompañamiento psiquiatrico';
          break;
    }

    return { mensaje, consejos };
  };

  const { mensaje, consejos } = generarMensaje(resultado);

  return (
    <div>
      <h2>{mensaje}</h2>
      <p>{consejos}</p>
    </div>
  );
};

export default ResultEvaluation;
