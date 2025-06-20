import http from "@/shared/services/http-common.js";

export class SubscriptionApiService {
    async getAllCategories() {
        return http.get(`/categories`);
    }
    async getCategoryById(categoryId) {
        return http.get(`/categories/${categoryId}`);
    }

}