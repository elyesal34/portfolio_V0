# Configuration de Node.js dans VS Code

## Problème identifié

Il semble y avoir un problème avec la configuration de Node.js dans votre environnement VS Code. Les tests et les commandes Node.js ne produisent pas de sortie dans le terminal intégré.

## Étapes de résolution

### 1. Vérification de l'installation de Node.js

1. Ouvrez un terminal PowerShell ou CMD en dehors de VS Code
2. Exécutez les commandes suivantes :
   ```
   node -v
   npm -v
   ```
3. Si ces commandes ne fonctionnent pas, installez Node.js depuis [nodejs.org](https://nodejs.org/)

### 2. Configuration de VS Code

1. Créez un dossier `.vscode` à la racine de votre projet
2. Ajoutez un fichier `settings.json` avec le contenu suivant :

```json
{
  "terminal.integrated.shell.windows": "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
  "javascript.nodePath": "C:\\Program Files\\nodejs",
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.tsserver.nodePath": "C:\\Program Files\\nodejs\\node.exe",
  "eslint.nodePath": "C:\\Program Files\\nodejs\\node.exe"
}
```

### 3. Vérification des variables d'environnement

1. Ouvrez les paramètres système avancés
2. Cliquez sur "Variables d'environnement"
3. Vérifiez que le chemin vers Node.js est dans la variable PATH système :
   - `C:\Program Files\nodejs\`
   - `%AppData%\npm` (pour les installations globales)

### 4. Redémarrage de VS Code

1. Fermez complètement VS Code
2. Rouvrez VS Code en tant qu'administrateur
3. Essayez à nouveau d'exécuter les commandes Node.js

### 5. Test de fonctionnement

Créez un fichier `test.js` avec le contenu suivant :

```javascript
console.log('Node.js fonctionne correctement !');
console.log('Version de Node.js :', process.version);
```

Exécutez-le avec :
```
node test.js
```

## Dépannage supplémentaire

Si le problème persiste :

1. Vérifiez les extensions VS Code qui pourraient interférer
2. Désactivez temporairement les extensions une par une
3. Consultez les journaux de sortie de VS Code (Afficher > Sortie)
4. Vérifiez les journaux du terminal intégré

## Ressources utiles

- [Documentation officielle de VS Code sur Node.js](https://code.visualstudio.com/docs/nodejs/nodejs-tutorial)
- [Guide de débogage de VS Code](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)
- [Résolution des problèmes de Node.js dans VS Code](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_troubleshooting)
