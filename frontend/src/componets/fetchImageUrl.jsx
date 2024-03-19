// fetchImageUrl.js

import axios from 'axios';

import { URIImagenes } from "./Urls";

export async function fetchImageUrl(imageId) {
  try {
    const response = await axios.get(`${URIImagenes}${imageId}`);
    if (response.data && response.data.archivo && response.data.archivo.data) {
      const buffer = new Uint8Array(response.data.archivo.data).buffer;
      const blob = new Blob([buffer], { type: response.data.tipo });
      const url = URL.createObjectURL(blob);
      return url;
    } else {
      throw new Error('Los datos de la imagen no son válidos.');
    }
  } catch (error) {
    console.error('Error al obtener la imagen:', error);
    return null
    throw error;
  }
}
