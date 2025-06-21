import http from "@/shared/services/http-common.js";
import Cookies from "js-cookie";

export class Profile {

    // ENTREPRENEUR METHODS
    getEntrepreneurProfiles() {
        return http.get('/profiles/entrepreneur');
    }

    getEntrepreneurProfileById(profileId) {
        return http.get(`/profiles/entrepreneur/${profileId}`);
    }

    getEntrepreneurProfileByUserId(userId) {
        return http.get(`/profiles/entrepreneur/user/${userId}`);
    }

    createEntrepreneurProfile(data) {
        const token = localStorage.getItem('token') || Cookies.get('token');
        return http.post('/profiles/entrepreneur/create-entrepreneur', data, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    //ADVENTURER

    // ADVENTURER METHODS
    getAdventurerProfiles() {
        return http.get('/profiles/adventurer');
    }

    getAdventurerProfileById(profileId) {
        return http.get(`/profiles/adventurer/${profileId}`);
    }

    getEntrepreneurProfiles() {
        return http.get('/profiles/entrepreneur');
    }

    // Obtener perfil de aventurero por ID de usuario
    getAdventurerProfileByUserId(userId) {
        return http.get(`/profiles/adventurer/user/${userId}`);
    }

    // Crear perfil
    createAdventurerProfile(data) {
        const token = localStorage.getItem('token') || Cookies.get('token');
        return http.post('/profiles/adventurer/create-adventurer', data, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    /*// Actualizar perfil
    updateAdventurerProfile(profileId, data) {
        return http.put(`/profiles/adventurer/${profileId}`, data);
    }*/
    getUserById(userId) {
        return http.get(`/users/${userId}`);
    }

}