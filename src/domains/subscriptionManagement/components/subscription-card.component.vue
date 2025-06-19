<template>
  <div class="subscription-card" @click="goToDescription">
    <img :src="image" alt="Imagen de categoría" class="category-image" />
    <div class="category-name">{{ name }}</div>
    <button
      v-if="!subscribed"
      class="subscribe-btn"
      @click.stop="$emit('subscribe', name)"
    >
      Suscribirse
    </button>
    <button
      v-else
      class="unsubscribe-btn"
      @click.stop="$emit('unsubscribe', name)"
    >
      Desuscribirse
    </button>
  </div>
</template>

<script>
export default {
  name: 'SubscriptionCard',
  props: {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, default: '' },
    subscribed: { type: Boolean, default: false }
  },
  methods: {
    goToDescription() {
      this.$router.push({
        name: 'category-description',
        params: { categoryId: this.id }
      });
    }
  }
};
</script>

<style scoped>
.subscription-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  padding: 24px 16px;
  margin: 8px;
  min-width: 200px;
  max-width: 240px;
  transition: box-shadow 0.2s;
  cursor: pointer;
}
.subscription-card:hover {
  box-shadow: 0 8px 24px rgba(118, 85, 50, 0.15);
}
.category-image {
  width: 64px;
  height: 64px;
  object-fit: contain;
  margin-bottom: 16px;
}
.category-name {
  font-size: 1.2rem;
  color: #7a5630;
  margin-bottom: 16px;
  text-align: center;
}
.subscribe-btn {
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
.subscribe-btn:hover {
  background: #5a3e22;
}
.unsubscribe-btn {
  background: #fc4b4b;
  color: #ffffff;
  border: 2px solid #fc4b4b;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.unsubscribe-btn:hover {
  background: #e43535;
  border-color: #e43535;
}
</style>
