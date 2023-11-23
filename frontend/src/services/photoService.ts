import api from "./api";

class PhotoService {
  async uploadPhotos(files: File[]): Promise<number[]> {
    const formData = new FormData();

    files.forEach((file, index) => {
      formData.append(`photo${index}`, file);
    });

    const { data } = await api.post("/photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data.photoIds; // Supondo que o backend retorne os IDs das fotos após o upload
  }
}

const photoService = new PhotoService();
export default photoService;
