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
    async postComment(id, comment) {
        return http.post(`/publications/${id}/add-comment`, comment);
    }

    async deleteComment(publicationId, commentId) {
        if (!publicationId || !commentId) {
            throw new Error('Publication ID and Comment ID are required');
        }

        try {
            console.log(`Deleting comment ${commentId} from publication ${publicationId}`);

            // Make sure to use the correct endpoint format
            const response = await http.delete(`/publication/${publicationId}/comments/${commentId}`);

            console.log('Delete comment response:', response);
            return response;
        } catch (error) {
            console.error('Error deleting comment:', error);
            throw error;
        }
    }

    // Obtener todos los comentarios de una publicación
    async getCommentsByActivityId(id) {
        return http.get(`/publications/${id}/comments`);
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

    async addToFavorites(favoritePublication) {
        return http.post('/favorites/create-favorite-publication', favoritePublication);
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