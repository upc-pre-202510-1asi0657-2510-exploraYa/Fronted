import http from "@/shared/services/http-common.js";

export class SubscriptionCategoryApiService {
    async createSubscription(userId,categoryId) {
        const token = localStorage.getItem('token') || Cookies.get('token');
        return http.post(
            `/category-subscriptions/create`,
            {  userId, categoryId },
            { headers: { Authorization: `Bearer ${token}` } }
        );
    }

    
    async getAllMySubscriptions() {
        return http.get(`/category-subscriptions/my-subscriptions`);
    }
    
    async unsubscribeFromCategory(categoryId) {
        const token = localStorage.getItem('token') || Cookies.get('token');
        return http.delete(
            `/category-subscriptions/unsubscribe/${categoryId}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
    }
}