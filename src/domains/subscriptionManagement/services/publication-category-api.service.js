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
}