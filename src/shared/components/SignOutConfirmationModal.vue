<template>
    <Dialog 
      :visible="visible" 
      @update:visible="$emit('close')" 
      modal 
      :closable="false" 
      :style="{ width: '28rem' }" 
      :breakpoints="{ '960px': '75vw', '641px': '90vw' }"
      class="signout-dialog"
    >
      <template #header>
        <div class="modal-header">
          <div class="icon-container">
            <i class="pi pi-sign-out"></i>
          </div>
          <h3 class="modal-title">Confirmar Cierre de Sesión</h3>
        </div>
      </template>
      
      <div class="modal-content">
        <p class="confirmation-text">¿Estás seguro de que deseas cerrar sesión?</p>
        <p class="confirmation-subtitle">Tendrás que volver a iniciar sesión para acceder a tu cuenta.</p>
      </div>
      
      <template #footer>
        <div class="modal-actions">
          <Button 
            label="Cancelar" 
            @click="$emit('close')" 
            class="cancel-button"
            outlined
          />
          <Button 
            label="Confirmar" 
            @click="$emit('confirm')" 
            class="confirm-button"
            autofocus 
          />
        </div>
      </template>
    </Dialog>
  </template>
  
  <script>
  import Dialog from 'primevue/dialog';
  import Button from 'primevue/button';
  
  export default {
    name: "SignOutConfirmationModal",
    components: {
      Dialog,
      Button
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    emits: ['close', 'confirm']
  }
  </script>
  
  <style scoped>
  /* Dialog customization */
  :deep(.signout-dialog .p-dialog) {
    border-radius: 16px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    border: 1px solid rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }
  
  :deep(.signout-dialog .p-dialog-header) {
    padding: 3rem 3rem 1.5rem 3rem;
    border-bottom: none;
    background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
  }
  
  :deep(.signout-dialog .p-dialog-content) {
    padding: 2.5rem 3rem;
    background: white;
  }
  
  :deep(.signout-dialog .p-dialog-footer) {
    padding: 1.5rem 3rem 3rem 3rem;
    border-top: none;
    background: white;
  }
  
  /* Header styling */
  .modal-header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  }
  
  .icon-container i {
    font-size: 1.25rem;
    color: white;
  }
  
  .modal-title {
    margin: 0;
    font-weight: 700;
    font-size: 1.375rem;
    color: #1f2937;
    letter-spacing: -0.025em;
  }
  
  /* Content styling */
  .modal-content {
    text-align: center;
    padding: 2.5rem 0 2rem 0;
  }
  
  .confirmation-text {
    margin: 0 0 1.5rem 0;
    font-size: 1.125rem;
    font-weight: 500;
    color: #374151;
    line-height: 1.6;
  }
  
  .confirmation-subtitle {
    margin: 0;
    font-size: 0.875rem;
    color: #6b7280;
    line-height: 1.5;
  }
  
  /* Actions styling */
  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1.25rem;
    margin-top: 2rem;
  }
  
  /* Button customizations */
  :deep(.cancel-button) {
    padding: 0.875rem 2rem;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s ease;
    border: 1.5px solid #d1d5db;
    color: #6b7280;
  }
  
  :deep(.cancel-button:hover) {
    border-color: #9ca3af;
    color: #374151;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  :deep(.confirm-button) {
    padding: 0.875rem 2rem;
    border-radius: 8px;
    font-weight: 500;
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    border: 1.5px solid #dc2626;
    color: white;
    transition: all 0.2s ease;
  }
  
  :deep(.confirm-button:hover) {
    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
    border-color: #b91c1c;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
  }
  
  :deep(.confirm-button:focus) {
    outline: none;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
  }
  
  /* Responsive adjustments */
  @media (max-width: 640px) {
    :deep(.signout-dialog .p-dialog-header),
    :deep(.signout-dialog .p-dialog-content),
    :deep(.signout-dialog .p-dialog-footer) {
      padding-left: 2rem;
      padding-right: 2rem;
    }
    
    .modal-content {
      padding: 1.5rem 0;
    }
    
    .modal-actions {
      flex-direction: column-reverse;
      gap: 0.75rem;
      margin-top: 1rem;
    }
    
    :deep(.cancel-button),
    :deep(.confirm-button) {
      width: 100%;
      justify-content: center;
    }
  }</style>