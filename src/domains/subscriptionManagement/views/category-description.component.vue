<template>
  <div class="category-description-container">
    <div v-if="loading" class="loading-state">
      <span>Cargando actividades...</span>
    </div>
    <template v-else>
      <div class="category-header">
        <div class="category-info">
          <div class="category-text">
            <h1>{{ category.name }}</h1>
            <div class="subscription-status">
              <span class="status-badge">{{ isSubscribed ? 'Suscrito' : 'No suscrito' }}</span>
              <button v-if="!isSubscribed" class="subscribe-btn" @click="handleSubscribe">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="activities-section">
        <h2>Actividades de categoría</h2>
        
        <div v-if="error" class="error-state">
          <i class="pi pi-exclamation-circle error-icon"></i>
          <h3>Error al cargar actividades</h3>
          <p>{{ error }}</p>
          <button class="retry-btn" @click="loadData">Reintentar</button>
        </div>

        <div v-else-if="activities.length === 0" class="empty-state">
          <i class="pi pi-info-circle empty-icon"></i>
          <h3>No hay actividades disponibles</h3>
          <p>Aún no hay actividades publicadas en esta categoría.</p>
        </div>

        <div v-else class="activities-grid">
          <ActivityCard
            v-for="activity in validActivities"
            :key="activity.id"
            :id="activity.id"
            :title="activity.nameActivity"
            :image="activity.image"
            :people="activity.cantPeople"
            :description="activity.description"
            :price="activity.cost"
            :timeDuration="activity.timeDuration"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import ActivityCard from '@/domains/postManagement/adventurer/components/activity-card.component.vue';
import { PublicationCategoryApiService } from '../services/publication-category-api.service.js';
import { SubscriptionCategoryApiService } from '../services/subscription-category-api.service.js';
import { SubscriptionApiService } from '../services/subscription-api.service.js';
import { ActivityApiService } from '@/domains/postManagement/shared/services/activity-api.service.js';
import { ActivityEntity } from '../models/activity.entity.js';
import { Category } from '../models/Category.entity.js';

export default {
  name: 'CategoryDescription',
  components: { ActivityCard },
  props: {
    categoryId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      category: new Category(),
      activities: [],
      loading: true,
      isSubscribed: false,
      error: null
    };
  },
  computed: {
    validActivities() {
      return this.activities.filter(activity => 
        activity && 
        activity.id && 
        activity.nameActivity && 
        typeof activity.cost === 'number' && 
        typeof activity.cantPeople === 'number'
      );
    }
  },
  methods: {
    async loadData() {
      this.loading = true;
      this.error = null;
      
      try {
        await Promise.all([
          this.loadCategory(),
          this.loadActivities(),
          this.checkSubscriptionStatus()
        ]);
      } catch (error) {
        console.error('Error loading data:', error);
        this.error = 'Ocurrió un error al cargar los datos. Por favor, intenta de nuevo.';
      } finally {
        this.loading = false;
      }
    },
    async loadCategory() {
      try {
        const api = new SubscriptionApiService();
        const response = await api.getCategoryById(this.categoryId);
        const categoryData = response.data;
        this.category = new Category(
          categoryData.id,
          categoryData.name,
          categoryData.subscribersCount
        );
      } catch (error) {
        console.error('Error loading category:', error);
        throw error;
      }
    },
    async loadActivities() {
      try {
        // Primero obtenemos los IDs de las publicaciones de la categoría
        const categoryApi = new PublicationCategoryApiService();
        const publicationsResponse = await categoryApi.getAllPublicationsByCategory(this.categoryId);
        const publicationIds = publicationsResponse.data;

        // Luego obtenemos los detalles de cada actividad
        const activityApi = new ActivityApiService();
        const activitiesPromises = publicationIds.map(pubId => activityApi.getActivityById(pubId));
        const activitiesResponses = await Promise.all(activitiesPromises);

        // Mapeamos las respuestas a entidades de actividad
        this.activities = activitiesResponses.map(response => {
          const activity = response.data;
          try {
            return new ActivityEntity(
              activity.id,
              activity.entrepreneurId,
              activity.nameActivity,
              activity.description,
              activity.timeDuration,
              activity.image,
              activity.cantPeople || 0,
              activity.cost || 0
            );
          } catch (e) {
            console.error('Error mapping activity:', e);
            return null;
          }
        }).filter(Boolean);
      } catch (error) {
        console.error('Error loading activities:', error);
        throw error;
      }
    },
    async checkSubscriptionStatus() {
      try {
        const api = new SubscriptionCategoryApiService();
        const response = await api.getAllMySubscriptions();
        const mySubscriptions = response.data.map(sub => sub.categoryId || sub.id || sub.category?.id);
        this.isSubscribed = mySubscriptions.includes(parseInt(this.categoryId));
      } catch (error) {
        console.error('Error checking subscription status:', error);
        this.isSubscribed = false;
      }
    },
    async handleSubscribe() {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('Debes iniciar sesión para suscribirte.');
        return;
      }
      try {
        const api = new SubscriptionCategoryApiService();
        await api.createSubscription(userId, this.categoryId);
        this.isSubscribed = true;
      } catch (error) {
        alert('No se pudo suscribir. Intenta de nuevo.');
      }
    }
  },
  created() {
    this.loadData();
  },
  watch: {
    categoryId: {
      handler() {
        this.loadData();
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
.category-description-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.category-header {
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}

.category-info {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.category-text {
  flex: 1;
}

.category-text h1 {
  color: #7a5630;
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
}

.subscription-status {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-badge {
  background: #f9f3e5;
  color: #7a5630;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
}

.subscribe-btn, .retry-btn {
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

.subscribe-btn:hover, .retry-btn:hover {
  background: #5a3e22;
}

.activities-section {
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}

.activities-section h2 {
  color: #7a5630;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.activities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.loading-state, .empty-state, .error-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
}

.empty-icon, .error-icon {
  font-size: 3rem;
  color: #7a5630;
  margin-bottom: 1rem;
}

.error-icon {
  color: #fc4b4b;
}

.empty-state h3, .error-state h3 {
  color: #7a5630;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.error-state h3 {
  color: #fc4b4b;
}

.empty-state p, .error-state p {
  color: #666;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .category-info {
    flex-direction: column;
    text-align: center;
  }

  .category-text h1 {
    font-size: 2rem;
  }

  .subscription-status {
    justify-content: center;
  }

  .activities-section h2 {
    font-size: 1.5rem;
  }
}
</style>
