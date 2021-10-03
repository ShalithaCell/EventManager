# EventManager
Central point for find and host events. Anyone can host a event and also anyone can find the events or share the events with LinkedIn.

---

# Purpose

The purpose of this project is handling 0Auth2 mechanisms.

---

# Development setup

### 1. Retrieve our project (if you haven't done so already)

```git
 $ git clone git@github.com:ShalithaCell/EventManager.git
```

### 2. Goto root folder and run the following command to install the necessary packages (this operation will install both client and server packages at once).

```npm
 npm run setup
```

### 3. override the configurations (optional).

 i. Basic Configurations (database, site settings)
    * Goto server folder and open .env file.
    * Replace parameters with your configs.
    
 ii. LinkedIn Client Configurations
    * Goto server folder and open ___credentials.linkedin.js___ file.
    * Replace parameters with your configs.


### 4. Goto root folder and run the ```npm run start``` to run the project.
