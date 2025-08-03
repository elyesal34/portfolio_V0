// Script de test manuel pour vérifier la navigation
console.log('🧪 Test de navigation manuel');

// Fonction pour simuler la navigation
function testNavigation() {
  console.log('📍 Test de navigation vers Contact...');
  
  // Simuler un clic sur le bouton Contact
  const contactButton = document.querySelector('button[aria-label*="Contact"]');
  if (contactButton) {
    console.log('✅ Bouton Contact trouvé');
    contactButton.click();
    console.log('🖱️ Clic simulé sur Contact');
    
    // Vérifier si la section contact existe
    setTimeout(() => {
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        console.log('✅ Section Contact trouvée');
        
        // Vérifier la position de scroll
        const scrollPosition = window.pageYOffset;
        console.log(`📏 Position de scroll: ${scrollPosition}px`);
        
        // Vérifier si on est proche de la section contact
        const contactPosition = contactSection.offsetTop;
        const expectedPosition = contactPosition - 160; // Offset spécial pour contact
        
        if (Math.abs(scrollPosition - expectedPosition) < 50) {
          console.log('✅ Navigation réussie ! Position correcte');
        } else {
          console.log('❌ Position incorrecte');
          console.log(`   Attendu: ${expectedPosition}px`);
          console.log(`   Actuel: ${scrollPosition}px`);
        }
      } else {
        console.log('❌ Section Contact non trouvée');
      }
    }, 1000);
  } else {
    console.log('❌ Bouton Contact non trouvé');
  }
}

// Fonction pour tester toutes les sections
function testAllSections() {
  const sections = [
    { name: 'Accueil', hash: '#accueil', offset: 80 },
    { name: 'CV', hash: '#cv', offset: 80 },
    { name: 'Ateliers Pro', hash: '#ateliers', offset: 80 },
    { name: 'Stages', hash: '#stages', offset: 80 },
    { name: 'Veilles', hash: '#veilles', offset: 80 },
    { name: 'Compétences', hash: '#competences', offset: 80 },
    { name: 'Productions', hash: '#productions', offset: 80 },
    { name: 'Contact', hash: '#contact', offset: 160 },
  ];
  
  console.log('🧪 Test de toutes les sections...');
  
  sections.forEach((section, index) => {
    setTimeout(() => {
      console.log(`\n📍 Test de navigation vers ${section.name}...`);
      
      const button = document.querySelector(`button[aria-label*="${section.name}"]`);
      if (button) {
        console.log(`✅ Bouton ${section.name} trouvé`);
        button.click();
        console.log(`🖱️ Clic simulé sur ${section.name}`);
        
        setTimeout(() => {
          const sectionElement = document.querySelector(section.hash);
          if (sectionElement) {
            console.log(`✅ Section ${section.name} trouvée`);
            
            const scrollPosition = window.pageYOffset;
            const expectedPosition = sectionElement.offsetTop - section.offset;
            
            if (Math.abs(scrollPosition - expectedPosition) < 50) {
              console.log(`✅ Navigation vers ${section.name} réussie !`);
            } else {
              console.log(`❌ Position incorrecte pour ${section.name}`);
              console.log(`   Attendu: ${expectedPosition}px`);
              console.log(`   Actuel: ${scrollPosition}px`);
            }
          } else {
            console.log(`❌ Section ${section.name} non trouvée`);
          }
        }, 1000);
      } else {
        console.log(`❌ Bouton ${section.name} non trouvé`);
      }
    }, index * 3000); // Délai entre chaque test
  });
}

// Exposer les fonctions globalement pour les tests manuels
window.testNavigation = testNavigation;
window.testAllSections = testAllSections;

console.log('📝 Instructions:');
console.log('   - Ouvrez la console du navigateur');
console.log('   - Tapez: testNavigation() pour tester Contact');
console.log('   - Tapez: testAllSections() pour tester toutes les sections'); 