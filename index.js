'use strict'
//Module of search with Algolia
const algolia = require('./search/searchquey')


//#Examples os use of querys
try {
    algolia.SearchbyProperty('', 'post.location.city', 'Cali', 'Recommendations').then(() =>{
        console.log(`Done!`)
        
    }).catch(err =>{
        console.log(`${err}`)
    })    
} catch (error) {
    console.log(`${error}`)
}



