import http from "@/shared/services/http-common.js";
import Cookies from "js-cookie";

export class PublicationCategoryApiService {
    async getAllPublicationsByCategory(categoryId) {
        const token = localStorage.getItem('token') || Cookies.get('token');
        return http.get(`/publication-categories/category/${categoryId}/publications`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
    async assingCategoryToPost(publicationId,categoryId) {
        const token = localStorage.getItem('token') || Cookies.get('token');
        return http.post(
            `/publication-categories/publication/${publicationId}/assign`,
            {  categoryId },
            { headers: { Authorization: `Bearer ${token}` } }
        );
    }
    async getCategoriesForPublicationByPublicationId(publicationId) {
        const token = localStorage.getItem('token') || Cookies.get('token');
        return http.get(`/publication-categories/publication/${publicationId}/categories`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
    
    async deleteCatoegoryForPublicationByPublicationId(publicationId, categoryId) {
        const token = localStorage.getItem('token') || Cookies.get('token');
        return http.delete(`/publication-categories/publication/${publicationId}/category/${categoryId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

}