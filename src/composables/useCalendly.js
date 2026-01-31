
export function useCalendly() {
  const openCalendly = () => {
    
    const calendlyURL = `https://calendly.com/legalia-si/asesoria-legal`
    window.open(calendlyURL, '_blank')
  }

  return {
    openCalendly
  }
}
