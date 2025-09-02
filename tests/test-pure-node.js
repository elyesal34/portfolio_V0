// Simple test sans dépendances
console.log("=== Début du test ===");
console.log("1. Test de base:");
console.log(`   1 + 1 = ${1 + 1}`);

console.log("\n2. Test d'assertion simple:");
const assert = (condition, message) => {
  if (!condition) {
    console.error(`❌ Échec: ${message}`);
    process.exit(1);
  }
  console.log(`✅ Succès: ${message}`);
};

assert(1 + 1 === 2, "1 + 1 doit être égal à 2");
assert(typeof console !== 'undefined', "L'objet console doit être disponible");

console.log("\n=== Fin du test ===");
