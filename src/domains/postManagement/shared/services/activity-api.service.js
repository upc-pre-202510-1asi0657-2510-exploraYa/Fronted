import http from "@/shared/services/http-common.js";
import Cookies from "js-cookie";

export class ActivityApiService {
    // Obtener todas las publicaciones
    async getAllActivities() {
        return http.get('/publications/all-publications');
    }

    // Obtener una publicación específica por ID
    async getActivityById(id) {
        return http.get(`/publications/${id}`);
    }

    // Publicar un comentario en una actividad
    async postComment(publicationId, comment) {
        const token = localStorage.getItem('token') || Cookies.get('token');
        return http.post(
            `/comments/create-comment`,
            { publicationId, ...comment },
            { headers: { Authorization: `Bearer ${token}` } }
        );
    }

    async deleteComment(publicationId, commentId) {
        return response = await http.delete(`comments/delete/${publicationId}`);
    }

    // Obtener todos los comentarios de una publicación
    async getCommentsByActivityId(id) {
        return http.get(`comments/public/publication/${id}`);
    }

    // src/domains/postManagement/shared/services/activity-api.service.js
    async getUserById(userId) {
        return http.get(`/users/${userId}`);
    }

    // Obtener todas las publicaciones de un emprendedor
    async getAllActivitiesByEntrepreneurId(id) {
        return http.get(`/publications/entrepreneur/${id}`);
    }
    async postPublication(publication) {
        return http.post('/publications/create-publication', publication);
    }
    async deletePublication(id) {
        return http.delete(`/publications/delete/${id}`);
    }
    async updatePublication(id, publication) {
        return http.put(`/publications/update/${id}`, publication);
    }

    async getAllEntrepreneurs() {
        // Obtener token desde localStorage o cookies
        const token = localStorage.getItem('token') || Cookies.get('token');

        // Configurar los headers con el token
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        return http.get('/users/entrepreneurs', config);
    }

    async getAllUsers() {
        return http.get('/users');
    }

    async addToFavorites(publicationId) {
        const token = localStorage.getItem('token') || Cookies.get('token');
        return await http.post(
            '/favorites/create-favorite-publication',
            { publicationId }, // <-- Enviar como objeto
            { headers: { Authorization: `Bearer ${token}` } }
        );
    }

    async removeFromFavorites(favoriteId) {
        return http.delete(`/favorites/delete-favorite-publication/${favoriteId}`);
    }

    async getFavoritePublicationsByProfileId(userId) {
        return http.get(`/favorites/getFavoritePublicationByProfileId/${userId}`);
    }

    //statistics
    async getFavoritesCountByPublicationId(publicationId) {
        return http.get(`/favoritess/count-by-publication/${publicationId}`);
    }

    //COMMENTARIES
    async getCommentsCountByPublicationId(publicationId) {
      return http.get(`/publication/${publicationId}/comments/count`);
    }
}