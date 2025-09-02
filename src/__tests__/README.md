# Tests

Ce dossier contient les tests automatisés pour l'application. Les tests sont organisés en différentes catégories pour une meilleure maintenabilité.

## Structure des dossiers

- `unit/` - Tests unitaires pour les fonctions et utilitaires
- `integration/` - Tests d'intégration entre plusieurs composants
- `components/` - Tests spécifiques aux composants React
- `setup/` - Configuration et utilitaires pour les tests

## Comment exécuter les tests

### Tous les tests
```bash
npm test
```

### Tests unitaires uniquement
```bash
npm run test:unit
```

### Tests d'intégration
```bash
npm run test:integration
```

### Tests de composants
```bash
npm run test:components
```

### Avec couverture de code
```bash
npm run test:coverage
```

## Bonnes pratiques

1. **Nommage des fichiers** : Utilisez le suffixe `.test.ts` ou `.test.tsx` pour les fichiers de test.
2. **Organisation** : Gardez les tests proches du code qu'ils testent, dans un dossier `__tests__` adjacent.
3. **Mocks** : Utilisez les mocks pour les dépendances externes et les appels API.
4. **Assertions** : Utilisez les assertions fournies par `@testing-library/react` et `vitest`.

## Configuration

La configuration des tests se trouve dans `vitest.config.ts`. Cette configuration inclut :
- L'environnement de test (jsdom pour les tests navigateur)
- Les chemins des fichiers de test à inclure/exclure
- La configuration de la couverture de code
- Les alias de chemins

## Débogage

Pour déboguer les tests, vous pouvez utiliser :

```bash
# Mode watch
npm run test:unit:watch

# Avec l'interface utilisateur de Vitest
npx vitest --ui
```
