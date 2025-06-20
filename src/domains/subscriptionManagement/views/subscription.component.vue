<template>
  <div class="subscription-container">
    <h1 class="main-title">Categorías</h1>
    <div class="tabs">
      <button class="tab" :class="{inactive: activeTab !== 'my', active: activeTab === 'my'}" @click="activeTab = 'my'">Mis categorías</button>
      <button class="tab" :class="{inactive: activeTab !== 'explore', active: activeTab === 'explore'}" @click="activeTab = 'explore'">Explora categorías</button>
    </div>
    <div class="categories-section">
      <h2 class="section-title">
        {{ activeTab === 'my' ? 'Mis categorías' : 'Todas las categorías' }}
      </h2>
      <div v-if="loading" class="loading-state">
        <span>Cargando...</span>
      </div>
      <div v-else-if="activeTab === 'my' && myCategories.length === 0" class="empty-state">
        <i class="pi pi-heart-fill empty-icon"></i>
        <h2>No tienes categorías suscritas</h2>
        <p>Suscríbete a tus categorías favoritas para encontrarlas aquí</p>
      </div>
      <div v-else class="cards-grid">
        <SubscriptionCard
          v-for="category in shownCategories"
          :key="category.id"
          :id="category.id"
          :name="category.name"
          :image="category.image"
          :subscribed="isSubscribed(category.id)"
          @subscribe="handleSubscribe(category)"
          @unsubscribe="onUnsubscribe(category)"
        />
      </div>
    </div>
    <div v-if="showAlreadySubscribedPopup" class="popup-overlay">
      <div class="popup">
        <p>Ya estás suscrito a esta categoría.</p>
        <button @click="showAlreadySubscribedPopup = false">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import SubscriptionCard from '../components/subscription-card.component.vue';
import { SubscriptionCategoryApiService } from '../services/subscription-category-api.service.js';

const CATEGORY_DATA = [
  {
    id: 1,
    name: 'Senderismo y Trekking',
    subscribersCount: 0,
    image: 'https://cdn-icons-png.flaticon.com/512/684/684908.png' // hiking boots
  },
  {
    id: 2,
    name: 'Montañismo y Escalada',
    subscribersCount: 0,
    image: 'https://cdn-icons-png.flaticon.com/512/2935/2935359.png' // mountain
  },
  {
    id: 3,
    name: 'Aventuras Acuáticas',
    subscribersCount: 0,
    image: 'https://cdn-icons-png.flaticon.com/512/616/616494.png' // water/waves
  },
  {
    id: 4,
    name: 'Cicloturismo y Mountain Bike',
    subscribersCount: 0,
    image: 'https://cdn-icons-png.flaticon.com/512/201/201818.png' // bicycle
  },
  {
    id: 5,
    name: 'Viajes por Tierra y Overland',
    subscribersCount: 0,
    image: 'https://cdn-icons-png.flaticon.com/512/854/854878.png' // offroad car
  },
  {
    id: 6,
    name: 'Deportes Aéreos',
    subscribersCount: 0,
    image: 'https://cdn-icons-png.flaticon.com/512/616/616601.png' // parachute
  },
  {
    id: 7,
    name: 'Aventuras de Invierno',
    subscribersCount: 0,
    image: 'https://cdn-icons-png.flaticon.com/512/616/616490.png' // snowflake
  },
  {
    id: 8,
    name: 'Exploración y Descubrimiento',
    subscribersCount: 0,
    image: 'https://cdn-icons-png.flaticon.com/512/854/854894.png' // compass
  },
  {
    id: 9,
    name: 'Ecoturismo y Observación de Fauna',
    subscribersCount: 0,
    image: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' // binoculars
  },
  {
    id: 10,
    name: 'Cultural y Experiencias Locales',
    subscribersCount: 0,
    image: 'https://cdn-icons-png.flaticon.com/512/854/854929.png' // culture mask
  }
];

export default {
  name: 'SubscriptionComponent',
  components: { SubscriptionCard },
  data() {
    return {
      categories: CATEGORY_DATA,
      myCategories: [],
      loading: false,
      activeTab: 'explore',
      showAlreadySubscribedPopup: false
    };
  },
  computed: {
    shownCategories() {
      return this.activeTab === 'my' ? this.myCategories : this.categories;
    }
  },
  methods: {
    isSubscribed(categoryId) {
      return this.myCategories.some(cat => cat.id === categoryId);
    },
    async fetchMyCategories() {
      this.loading = true;
      try {
        const api = new SubscriptionCategoryApiService();
        const response = await api.getAllMySubscriptions();
        // Assuming response.data is an array of category objects or ids
        // Map to full category objects for display
        const myIds = response.data.map(sub => sub.categoryId || sub.id || sub.category?.id);
        this.myCategories = this.categories.filter(cat => myIds.includes(cat.id));
      } catch (e) {
        this.myCategories = [];
      } finally {
        this.loading = false;
      }
    },
    async handleSubscribe(category) {
      if (this.isSubscribed(category.id)) {
        this.showAlreadySubscribedPopup = true;
        return;
      }
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('Debes iniciar sesión para suscribirte.');
        return;
      }
      this.loading = true;
      try {
        const api = new SubscriptionCategoryApiService();
        await api.createSubscription(userId, category.id);
        await this.fetchMyCategories();
      } catch (e) {
        alert('No se pudo suscribir. Intenta de nuevo.');
      } finally {
        this.loading = false;
      }
    },
    async onUnsubscribe(category) {
      this.loading = true;
      try {
        const api = new SubscriptionCategoryApiService();
        await api.unsubscribeFromCategory(category.id);
        await this.fetchMyCategories();
      } catch (e) {
        alert('No se pudo cancelar la suscripción. Intenta de nuevo.');
      } finally {
        this.loading = false;
      }
    }
  },
  watch: {
    activeTab(newTab) {
      if (newTab === 'my') {
        this.fetchMyCategories();
      }
    }
  },
  mounted() {
    this.fetchMyCategories();
  }
};
</script>

<style scoped>
.subscription-container {
  background: #faf7f2;
  min-height: 100vh;
  padding: 0 0 40px 0;
}
.main-title {
  text-align: center;
  color: #7a5630;
  font-size: 3rem;
  margin: 32px 0 0 0;
  font-weight: bold;
}
.tabs {
  display: flex;
  justify-content: center;
  margin: 32px 0 0 0;
  gap: 16px;
}
.tab {
  font-size: 2rem;
  padding: 16px 32px;
  border-radius: 24px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  background: #f5f5f5;
  color: #7a869a;
  transition: background 0.2s, color 0.2s;
}
.tab.active {
  background: #7a5630;
  color: #fff;
}
.tab.inactive {
  background: #fff;
  color: #7a869a;
}
.categories-section {
  background: #fff;
  margin: 32px auto 0 auto;
  border-radius: 18px;
  max-width: 95vw;
  box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  padding: 32px 24px 24px 24px;
}
.section-title {
  color: #7a5630;
  font-size: 2.5rem;
  margin-bottom: 32px;
  font-weight: bold;
}
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 32px 16px;
  justify-items: center;
}
.loading-state, .empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 5rem 2rem;
  min-height: 30vh;
  background: linear-gradient(to bottom right, #ffffff, #f9f3e5);
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(118, 85, 50, 0.08);
  border: 1px solid rgba(118, 85, 50, 0.1);
}
.empty-icon {
  font-size: 4rem;
  color: #7a5630;
  margin-bottom: 1.5rem;
  opacity: 0.8;
}
.empty-state h2 {
  color: #7a5630;
  font-size: 1.7rem;
  margin-bottom: 0.8rem;
  font-weight: 600;
}
.empty-state p {
  color: #7a869a;
  margin-bottom: 2rem;
  max-width: 400px;
}
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.popup {
  background: #fff;
  padding: 2rem 2.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(118, 85, 50, 0.15);
  text-align: center;
}
.popup button {
  margin-top: 1.5rem;
  background: #7a5630;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
.popup button:hover {
  background: #5a3e22;
}
@media (max-width: 900px) {
  .main-title { font-size: 2.2rem; }
  .section-title { font-size: 1.5rem; }
  .categories-section { padding: 18px 6px; }
}
</style>
