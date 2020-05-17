# Todos project
Dans le cadre du confinement actuel, il est impossible que vous puissiez mener à bien les projets que vous aviez choisi en début de module. C'est pourquoi je vous ai préparé un projet qui remplacera le vôtre et qui tiendra compte de ce que nous avons pu voir en cours sans vous mettre en diffculté. Cela ne veut pas dire pour autant que vous n'aurez pas à réfléchir je vous rassure...

# Comment utiliser l'application ?

Rien de bien compliqué ! Assurez-vous déjà d’avoir le logiciel Docker d’installé sur vôtre machine et que ce dernier soit lancé.

Une fois fait, veuillez cloner ce projet puis, dans une invite de commande positionnez vous dans le répertoire du projet que vous venez de cloner.

Je vous invite ensuite à lancer les commandes suivantes :

  - docker run -p 3306:3306 --name containerMysql -e MYSQL_ROOT_PASSWORD=root -d mysql:5
  - docker run --name container-phpmyadmin --link containerMysql:db -d -p 3333:80 phpmyadmin/phpmyadmin

Une fois rendu ici, avec votre navigateur, saisissez http://192.168.99.100:3333 ou bien localhost:3333 afin de vous rendre sur PhpMyAdmin. Connectez vous avec root et le mot de passe que vous lui avez attribué lors de la première commande. Ensuite, dans la barre d'option en haut, rendez-vous sur l’onglet « Importer » puis importez le script « ListTodo.sql » qui contient la base de données dans laquelle se retourveront les données de l’application. Le fichier « ListTodo.sql » est disponible à la racine du répertoire du projet.

Puis saisir les commandes suivantes :

  - docker run -it --rm --name projects.todos -v "$PWD":/app -w /app/server --link containerMysql:db -p 3100:3001 node:13 bash
  - yarn dev

Pour finir, rendez-vous sur l’application web en tapant http://192.168.99.100:3100 ou bien localhost:3100. 

Voilà, vous pouvez créer vos listes de tâches !


# Le projet
Ce projet est fonctionnellement assez simple, il s'agit d'une application de gestion de tâches à faire (todos). Il a la particularité de pouvoir gérer plusieurs listes ayant chacune sons propre ensemble de tâches.

Les fonctionnalités sont assez basiques, voici ce qui est possible de faire avec cette application :
  - Afficher les listes créées
  - Créer une nouvelle liste
  - Au clic sur une liste, voir les tâches associées
  - Modifier le titre et la description de la liste
  - Pouvoir créer une nouvelle tâche
  - Cocher une tâche pour la marquer comme terminée
  - Supprimer une tâche

# Démo
Pour que vous puissiez voir l'ensemble des fonctionnalités en action avant de développer je vous propose une vidéo d'une version fonctionnelle :

[![Vidéo démo "todos project"](https://img.youtube.com/vi/23y6bNsTqY4/0.jpg)](https://www.youtube.com/watch?v=23y6bNsTqY4)

[https://www.youtube.com/watch?v=23y6bNsTqY4](https://www.youtube.com/watch?v=23y6bNsTqY4)

# Travail déjà effectué
Puisque nous n'avons pas pu voir tout ce qu'il faut pour créer ce genre d'interface j'ai développé moi-même la partie cliente du projet. **Vous n'aurez donc aucun code à écrire concernant l'interface**.

# Travail demandé
Pour ce projet, je vais vous demander des choses que nous avons déjà pu voir en cours et pour lesquelles vous avez déjà pu me fournir un travail. Vous devrez donc développer la partie serveur, API de ce projet. Le client est développé pour requêter sur certaines URLs, ce sont ces APIs que vous devez développer. Vous pouvez retrouver la documentation de ces APIs plus bas.

Voici plus en détails ce que je vous demande :
  - Créer un container Docker avec la base de données
  - Lier ce container à celui du projet
  - Créer l'ensemble des tables utiles pour répondre au besoin du projet
  - Créer les APIs que le client va requêter
  - Dans ces APIs, vous devez lire et écrire dans votre base de données

# APIs
## Listes
### **GET /api/lists**
#### Paramètres URL
Aucun paramètre
#### Corps de requête
Aucun corps
### Retour
`Tableau de listes`, exemple :
```js
[
  {
    "id": <ID de la liste>,
    "label": <Titre de la liste>,
    "description": <Description de la liste>
  },
  {...}
]
```

### **POST /api/lists**
#### Paramètres URL
Aucun paramètre
#### Corps de requête
`Liste à créer`, exemple :
```js
{
  "id": <ID de la liste>,
  "label": <Titre de la liste>, // Obligatoire
  "description": <Description de la liste> // Optionnel
}
```
### Retour
`Liste créée`, exemple :
```js
{
  "id": <ID de la liste>,
  "label": <Titre de la liste>,
  "description": <Description de la liste>
}
```

### **PUT /api/lists/:id**
#### Paramètres URL
`id` = ID de la liste à modifier
#### Corps de requête
`Liste à modifier`, exemple :
```js
{
  "id": <ID de la liste>,
  "label": <Titre de la liste>, // Obligatoire
  "description": <Description de la liste> // Optionnel
}
```
### Retour
`Liste modifiée`, exemple :
```js
{
  "id": <ID de la liste>,
  "label": <Titre de la liste>,
  "description": <Description de la liste>
}
```

## Todos
### **GET /api/todos**
#### Paramètres URL
Aucun paramètre
#### Corps de requête
Aucun corps
### Retour
`Tableau de tâches`, exemple :
```js
[
  {
    "id": <ID de la tâche>,
    "label": <Titre de la tâche>,
    "idList": <ID de la liste où est cette tâche>,
    "isDone": <Booléen qui dit si la tâche est terminée>
  },
  {...}
]
```

### **POST /api/todos**
#### Paramètres URL
Aucun paramètre
#### Corps de requête
`Tâche à créer`, exemple :
```js
{
  "label": <Titre de la tâche>, // Obligatoire
  "idList": <ID de la liste où est cette tâche>, // Obligatoire
  "isDone": <Booléen qui dit si la tâche est terminée> // Optionnel
}
```
### Retour
`Tâche créée`, exemple :
```js
{
  "id": <ID de la tâche>,
  "label": <Titre de la tâche>,
  "idList": <ID de la liste où est cette tâche>,
  "isDone": <Booléen qui dit si la tâche est terminée>
}
```

### **PUT /api/todos/:id**
#### Paramètres URL
`id` = ID de la tâche à modifier
#### Corps de requête
`Tâche à modifier`, exemple :
```js
{
  "id": <ID de la tâche>,
  "label": <Titre de la tâche>, // Obligatoire
  "idList": <ID de la liste où est cette tâche>, // Obligatoire
  "isDone": <Booléen qui dit si la tâche est terminée> // Optionnel
}
```
### Retour
`Tâche modifiée`, exemple :
```js
{
  "id": <ID de la tâche>,
  "label": <Titre de la tâche>,
  "idList": <ID de la liste où est cette tâche>,
  "isDone": <Booléen qui dit si la tâche est terminée>
}
```

### **DELETE /api/todos/:id**
#### Paramètres URL
`id` = ID de la tâche à supprimer
#### Corps de requête
Aucun corps
### Retour
Aucun retour spécifique attendu

# Par où commencer ?
- :warning: Ne pas cloner ce dépôt et le modifier, voir plus bas
- :warning: Toutes les modifications que vous ferez seront dans le dossier `/server/`

## Créer un fork
Pour commencer à exécuter l'application et la modifer vous devez récupérer le code, pour cela il faut créer un **fork** à partir du bouton du même nom disponible en haut à droite de ce dépôt. Une fois le fork créé vous aurez votre propre dépôt que vous pourrez cloner, modifier et sur lequel vous pourrez commiter. C'est ce fork qui fera office de rendu de votre travail.

## Lancer l'appli
Pour lancer l'appli il vous suffit de vous rendre dans le dossier où vous avez clôné le dépôt et de lancer la commande suivante :
```bash
docker run --name projects.todos -d -v "$PWD":/app -w /app/server -p 3100:3001 node:13 yarn dev
```
Pour voir les logs de votre application vous pouvez lancer la commande suivante :
```bash
docker logs -f projects.todos
```
Vous verrez lors de la première exécution qu'il va installer l'ensemble des dépendances dont vous avez besoin et lancer l'application.

Pour voir l'application, rendez-vous à l'adresse
  - `http://localhost:3100` pour ceux qui sont sous Linux, Mac ou Docker natif Windows
  - `http://[IP VM Docker toolbox]:3100` pour ceux qui sont sous Windows avec Docker toolbox

:bulb: La commande `run` ci-dessus ne prend pas en compte la base de données, pour `run` le projet avec de noueaux arguments, il faut d'abord supprimer l'existant avec la commande suivante, puis vous pourrez relancer avec votre nouvelle commande :
```bash
docker rm -f projects.todos
```

## Fichiers API
Pour vous aider à bien débuter j'ai créé une API test que vous pouvez voir consulter sur `http://localhost:3100/api/test`. Cette API est définie dans le fichier suivant : `/server/apis/test.js`.

Vous pourrez donc vous inspirer de ce fichier pour créer les APIs demandées dans les fichiers suivants :
 - `/server/apis/lists.js`
 - `/server/apis/todos.js`

 Ces deux fichiers n'existent pas encore et ce sera à vous de les créer et définir vos APIs dedans. Le projet est paramétré pour enregistrer automatiquement ces deux fichiers, ce qui veut dire que leur nommage est très important. Si vous nommez le premier fichier `/server/apis/list.js` par exemple, cela ne fonctionnera pas.

 :warning: Cela ne veut pas dire que ce sont les deux seuls fichiers à créer et modifier, simplement que c'est le point d'entrée de vos APIs.

# Quel rendu est demandé ?
Vous devrez me rendre votre travail sur le dépôt Github forké de celui-ci. Pour le code c'est simple, je regarderai le code présent dans votre dépôt. Cependant, je vous laisse la liberté de la forme concernant la base de données, fichiers SQL + explications, système de migrations intégré au projet, image Docker publié sur un registry, etc...

# Pour quand rendre le projet ?
La date de rendu de ce projet est définie au **maximum** pour le `17/05/2020 à 20h`.

# Des questions ?
Si vous avez des questions, et il n'y a pas de problèmes à en avoir, je vous demanderai de ne pas me formuler vos questions par email individuellement. Vous allez utiliser les issues de Github, cela permettra de partager l'information entre toute la classe. Rendez-vous donc sur la page suivante pour créer un ticket et poser votre question : [https://github.com/fleebzz/lpdip.2020.projects.todos/issues](https://github.com/fleebzz/lpdip.2020.projects.todos/issues).
