# honours-project
The Code for my honours project: "An Evaluation of Vue.js Against Nielsen's 10 Usability Heuristics"
## Project setup
```
See Appendix 8 of Honours Project Report
```

## Administrator Work Instructions

The administrator work instructions for this project can be found [here](https://github.com/AdamBlunn/BookRetreatHelpDocs)

## Dependancies 
```
date-fns: 2.16.1,
firebase: 8.2.3,
vue: 2.6.11 "Macross",
vue-router: 3.2.0,
vuetify: 2.2.11
```
## Creating New Product Pages Pages
1. Create a new book on the admin dashboard using the administrator work instructions
2. Open the project in a code editor of your choice
3. Navigate to src\views\ProductPages\Template.vue
4. Copy the entire code into a new .vue file with the name of the new book as its filename
5. Enter the title of the book without spaces (LordOfTheRings) into the quotes on line 199
6. Enter the book title in quotes (e.g. "The Lord Of The Rings") on line 236
7. Navigate to src\router\index.js
8. Import the vue component from it's file using the syntax  import [Filename] from "[File Location]"
9. Create a router pathway  using the below code:

 {
    path: '/Product/[Book Name]',
    name: '[full book name]|Book Retreat',
    component: [component name]
  },
