<script>
import { SubscriptionApiService } from "@/domains/subscriptionManagement/services/subscription-api.service.js";

const CATEGORY_IMAGES = {
  1: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  2: 'https://cdn-icons-png.flaticon.com/512/2935/2935359.png',
  3: 'https://cdn-icons-png.flaticon.com/512/616/616494.png',
  4: 'https://cdn-icons-png.flaticon.com/512/201/201818.png',
  5: 'https://cdn-icons-png.flaticon.com/512/854/854878.png',
  6: 'https://cdn-icons-png.flaticon.com/512/616/616601.png',
  7: 'https://cdn-icons-png.flaticon.com/512/616/616490.png',
  8: 'https://cdn-icons-png.flaticon.com/512/854/854894.png',
  9: 'https://cdn-icons-png.flaticon.com/512/616/616408.png',
  10: 'https://cdn-icons-png.flaticon.com/512/854/854929.png'
};

export default {
  name: "ActivityFormModal",
  props: {
    show: {
      type: Boolean,
      required: true
    },
    editingPublication: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      publication: {
        nameActivity: '',
        description: '',
        timeDuration: '',
        image: '',
        cantPeople: '',
        cost: '',
        categoryId: null
      },
      imageFile: null,
      imagePreview: null,
      categories: [],
      dropdownOpen: false
    }
  },
  created() {
    this.subscriptionApi = new SubscriptionApiService();
    this.fetchCategories();
  },
  watch: {
    editingPublication(newValue) {
      if (newValue) {
        this.publication = {
          nameActivity: newValue.nameActivity,
          description: newValue.description,
          timeDuration: newValue.timeDuration,
          image: newValue.image,
          cantPeople: newValue.cantPeople,
          cost: newValue.cost,
          categoryId: newValue.categoryId || null
        };
        this.imagePreview = newValue.image;
      } else {
        this.resetForm();
      }
    },
    show(newValue) {
      if (!newValue) {
        this.resetForm();
      }
    }
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await this.subscriptionApi.getAllCategories();
        this.categories = response.data.map(category => ({
          ...category,
          image: CATEGORY_IMAGES[category.id] || null
        }));
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    },
    getCategoryImage(categoryId) {
      if (!categoryId) return null;
      const category = this.categories.find(c => c.id === categoryId);
      return category ? category.image : null;
    },
    getCategoryName(categoryId) {
      if (!categoryId) return 'Seleccionar categoría';
      const category = this.categories.find(c => c.id === categoryId);
      return category ? category.name : 'Seleccionar categoría';
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    selectCategory(categoryId) {
      this.publication.categoryId = categoryId;
      this.dropdownOpen = false;
    },
    savePublication() {
      if (this.imageFile) {
        this.readFileAsBase64(this.imageFile, (base64Image) => {
          this.publication.image = base64Image;
          this.$emit('save', this.publication);
        });
      } else {
        this.$emit('save', this.publication);
      }
    },
    closeModal() {
      this.$emit('close');
    },
    resetForm() {
      this.publication = {
        nameActivity: '',
        description: '',
        timeDuration: '',
        image: '',
        cantPeople: '',
        cost: '',
        categoryId: null
      };
      this.imageFile = null;
      this.imagePreview = null;
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      this.imageFile = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    readFileAsBase64(file, callback) {
      const reader = new FileReader();
      reader.onload = (e) => {
        callback(e.target.result);
      };
      reader.readAsDataURL(file);
    },
    removeImage() {
      this.imageFile = null;
      this.imagePreview = null;
      this.publication.image = '';
      // Reset the file input
      const fileInput = document.getElementById('image-upload');
      if (fileInput) fileInput.value = '';
    }
  }
}
</script>

<template>
  <div v-if="show" class="modal-backdrop">
    <div class="modal-container">
      <div class="modal-header">
        <h2 class="modal-title">{{ editingPublication ? 'Editar Actividad' : 'Nueva Actividad' }}</h2>
        <button @click="closeModal" class="close-button">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="modal-body">
        <form @submit.prevent="savePublication">
          <div class="form-group">
            <label for="title">Título</label>
            <input type="text" id="title" v-model="publication.nameActivity" required placeholder="Nombre de la actividad">
          </div>

          <div class="form-group">
            <label for="description">Descripción</label>
            <textarea id="description" v-model="publication.description" required placeholder="Describe tu actividad..."></textarea>
          </div>

          <div class="form-row">
            <div class="form-group half-width">
              <label for="duration">Duración (min)</label>
              <input type="number" id="duration" v-model="publication.timeDuration" required min="1">
            </div>

            <div class="form-group half-width">
              <label for="capacity">Capacidad</label>
              <input type="number" id="capacity" v-model="publication.cantPeople" required min="1">
            </div>
          </div>

          <!-- Replace the existing image input with this -->
          <div class="form-group">
            <label for="image-upload">Imagen</label>
            <div class="image-upload-container">
              <div v-if="imagePreview" class="image-preview-container">


                <img :src="imagePreview" alt="Preview" class="image-preview">
                <button type="button" @click="removeImage" class="remove-image-btn">
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <div v-else class="upload-placeholder">
                <i class="fas fa-cloud-upload-alt upload-icon"></i>
                <span>Sube una imagen representativa</span>
              </div>
              <input
                  type="file"
                  id="image-upload"
                  @change="handleImageUpload"
                  accept="image/*"
                  class="file-input">
              <label for="image-upload" class="upload-btn">
                {{ imagePreview ? 'Cambiar imagen' : 'Seleccionar archivo' }}
              </label>
            </div>
          </div>

          <div class="form-group">
            <label for="price">Precio ($)</label>
            <input type="number" id="price" v-model="publication.cost" required min="0" step="0.01">
          </div>

          <div class="form-group">
            <label>Categoría</label>
            <div class="custom-dropdown">
              <div class="dropdown-selected" @click="toggleDropdown">
                <span class="selected-text">{{ getCategoryName(publication.categoryId) }}</span>
                <img v-if="getCategoryImage(publication.categoryId)" :src="getCategoryImage(publication.categoryId)" alt="" class="category-icon-display">
                <i class="fas fa-chevron-down dropdown-arrow" :class="{ 'rotated': dropdownOpen }"></i>
              </div>
              <ul v-if="dropdownOpen" class="dropdown-list">
                <li @click="selectCategory(null)">
                  <span>Sin categoría</span>
                </li>
                <li v-for="cat in categories" :key="cat.id" @click="selectCategory(cat.id)">
                  <span>{{ cat.name }}</span>
                  <img v-if="cat.image" :src="cat.image" :alt="cat.name" class="category-icon-option">
                </li>
              </ul>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" @click="closeModal" class="btn-secondary">Cancelar</button>
            <button type="submit" class="btn-primary">
              {{ editingPublication ? 'Actualizar' : 'Publicar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background-color: white;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  border-bottom: 1px solid #eee;
}

.modal-title {
  color: var(--primary-color);
  margin: 0;
  font-size: 22px;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
  transition: color 0.2s;
}

.close-button:hover {
  color: var(--error-color);
}

.modal-body {
  padding: 10px 25px 25px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--text-dark);
  font-size: 14px;
}

.form-group input, .form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: border-color 0.2s;
  background-color: #f9f9f9;
}

.form-group input:focus, .form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.form-row {
  display: flex;
  gap: 20px;
}

.half-width {
  flex: 1;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  gap: 10px;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary:hover {
  background-color: var(--primary-light);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.btn-secondary {
  background-color: #e9e9e9;
  color: var(--text-dark);
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-secondary:hover {
  background-color: #ddd;
}

.image-upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  position: relative;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--text-light);
  padding: 30px 0;
  width: 100%;
}

.upload-icon {
  font-size: 40px;
  margin-bottom: 10px;
  color: var(--primary-light);
}

.file-input {
  position: absolute;
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  z-index: -1;
}

.upload-btn {
  background-color: var(--primary-lighter);
  color: var(--primary-color);
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 15px;
  transition: all 0.3s;
  display: inline-block;
}

.upload-btn:hover {
  background-color: var(--primary-light);
  color: white;
}

.image-preview-container {
  position: relative;
  width: 100%;
  max-width: 300px;
  margin-bottom: 10px;
}

.image-preview {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  max-height: 200px;
}

.remove-image-btn {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: var(--error-color);
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.remove-image-btn:hover {
  background-color: #d32f2f;
}

/* CUSTOM DROPDOWN STYLES */
.custom-dropdown {
  position: relative;
  width: 100%;
}

.dropdown-selected {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  cursor: pointer;
  user-select: none;
}

.selected-text {
  flex-grow: 1;
  font-size: 14px;
}

.dropdown-arrow {
  transition: transform 0.2s ease-in-out;
  font-size: 12px;
  color: #888;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.dropdown-list {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  list-style: none;
  margin: 0;
  padding: 4px 0;
  z-index: 20;
  max-height: 220px;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.dropdown-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  cursor: pointer;
  font-size: 14px;
}

.dropdown-list li:hover {
  background-color: #f0f0f0;
}

.category-icon-option {
  width: 20px;
  height: 20px;
  margin-left: 10px;
  flex-shrink: 0;
}

.category-icon-display {
  width: 24px;
  height: 24px;
  margin: 0 10px;
}
/* END CUSTOM DROPDOWN STYLES */
</style>