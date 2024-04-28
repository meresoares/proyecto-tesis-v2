import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";
// Cambia esto según la URL de tu API

// Función para obtener todas las personas
export const getAllPersons = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/persons`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las personas:", error);
    throw error;
  }
};

// Función para crear una persona
export const createPerson = async (personData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/persons`, personData);
    return response.data;
  } catch (error) {
    console.error("Error al crear la persona:", error);
    throw error;
  }
};

// Función para actualizar un producto existente
export const updatePerson = async (id: number, personData: any) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/persons/${id}`,
      personData
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la persona:", error);
    throw error;
  }
};

export const deletePerson = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/persons/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la persona:", error);
    throw error;
  }
};
