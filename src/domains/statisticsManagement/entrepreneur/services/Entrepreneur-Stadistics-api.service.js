import http from "@/shared/services/http-common.js";

export class EntrepreneurStadisticsApiService {
    async getStatsByPublicationId(id) {
        return http.get(`/stats/publications/${id}`);
    }
    async getAllActivitiesByEntrepreneurId(id) {
        return http.get(`/publications/entrepreneur/${id}`);
    }
}