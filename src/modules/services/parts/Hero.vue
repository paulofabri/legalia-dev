<template>
  <section class="hero-section">
    <div class="hero-background">
      <v-img src="@/modules/services/assets/gabrielle-henderson-HJckKnwCXxQ-unsplash 1.png"
        alt="Consultoría legal profesional" class="hero-image" cover>
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
          </div>
        </template>
      </v-img>
      <div class="hero-overlay"></div>
    </div>

    <div class="hero-content d-flex justify-end align-center">
      <div class="hero-text d-flex flex-column align-start">
        <h1 
          class="hero-title text-right ma-0 pa-0"
          v-intersect="titleAnimation.intersectOptions"
          :class="titleAnimation.animationClass()"
          :style="titleAnimation.animationStyle"
        >
          <span class="text-gray">Desarrollamos </span><span class="text-primary-dark">soluciones jurídicas </span><span class="text-primary-dark">personalizadas</span><span class="text-gray">, evitando complicaciones y procurando tu tranquilidad.</span>
        </h1>

        <div class="button-container d-flex justify-end">
          <v-btn 
            class="hero-cta mt-8 d-flex flex-row align-center justify-center" 
            color="primary-dark" 
            height="52" 
            rounded="lg" 
            elevation="2" 
            @click="openCalendly"
            v-intersect="buttonAnimation.intersectOptions"
            :class="buttonAnimation.animationClass()"
            :style="buttonAnimation.animationStyle"
          >
            Agendar asesoría
          </v-btn>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { useWhatsApp } from '@/composables/useWhatsApp'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useCalendly } from '@/composables/useCalendly'

const { openWhatsApp } = useWhatsApp()
const {openCalendly} = useCalendly()

// Animaciones de entrada sin offset
const titleAnimation = useScrollAnimation({ 
  type: 'slide-left', 
  duration: 1000, 
  once: true, 
  threshold: 0.2
})

const buttonAnimation = useScrollAnimation({ 
  type: 'scale', 
  duration: 800, 
  delay: 200,
  once: true, 
  threshold: 0.2
})
</script>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  height: 520px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
      rgba(255, 255, 255, 0.05) 0%,
      rgba(255, 255, 255, 0.1) 20%,
      rgba(255, 255, 255, 0.3) 40%,
      rgba(255, 255, 255, 0.6) 60%,
      rgba(255, 255, 255, 0.85) 80%,
      rgba(255, 255, 255, 0.95) 100%);
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 3;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 6rem 0 0;
}

.hero-text {
  max-width: 850px;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
}

.hero-title {
  font-size: 40px;
  font-weight: 500;
  line-height: 60px;
  font-family: 'Poppins', sans-serif;
  letter-spacing: -0.5px;
  width: 100%;
}

.text-gray {
  color: #1E293B;
  font-weight: 500;
}

.text-primary-dark {
  color: #63071E;
  font-weight: 500;
}

.button-container {
  width: 100%;
}

.hero-cta {
  font-size: 1.1rem;
  font-weight: 600;
  padding: 16px 32px !important;
  text-transform: none;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.hero-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 0, 0, 0.3) !important;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .hero-content {
    padding: 0 4%;
  }

  .hero-text {
    max-width: 550px;
  }

  .hero-title {
    font-size: 36px;
    line-height: 54px;
  }
}

@media (max-width: 992px) {
  .hero-content {
    padding: 0 3%;
  }

  .hero-text {
    max-width: 500px;
  }

  .hero-title {
    font-size: 32px;
    line-height: 48px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    height: 520px;
  }

  .hero-content {
    padding: 0 5% !important;
    justify-content: center !important;
  }
 
  .hero-text {
    max-width: 100%;
    text-align: center !important;
    align-items: center !important;
  }

  .hero-title {
    font-size: 28px;
    line-height: 42px;
    margin-bottom: 1.5rem;
    text-align: center !important;
  }

  .hero-cta {
    font-size: 1rem;
    padding: 14px 28px !important;
  }
  
  .button-container {
    justify-content: center !important;
  }
}

@media (max-width: 576px) {
  .hero-section {
    height: 520px;
  }

  .hero-content {
    padding: 0 4%;
  }

  .hero-text {
    align-items: center !important;
  }

  .hero-title {
    font-size: 24px;
    line-height: 36px;
  }

  .hero-cta {
    font-size: 0.95rem;
    padding: 12px 24px !important;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 20px;
    line-height: 30px;
  }

  .hero-cta {
    font-size: 0.9rem;
    padding: 10px 20px !important;
  }
}

/* Ajustes para el overlay en dispositivos móviles */
@media (max-width: 768px) {
  .hero-overlay {
    background: rgba(255, 255, 255, 0.85);
  }
}
</style>
