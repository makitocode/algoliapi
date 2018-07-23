'use strict'
/* ******* Dependencies * *******/
//Lib for algolia
const algoliasearch = require('algoliasearch')
//Const to join paths
const path = require('path');
//Lib for manage env
const dotenv = require('dotenv').config({path: `${path.join(__dirname,'./../config/.env')}`})


/* ******* Initialize * *******/
//load env file
// dotenv.config()
let x = process.env.ALGOLIA_APP_ID
//load algolia
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY)    

//*************************************** Biz Logic *********************************/
//************************************************************************************

//>>> Search by word
function SearchbyWord(wordToSearch, indexName){
    return new Promise((resolve, reject)=>{
        try {
            //Algolia index -> like a doc db
            const algoliaindex = client.initIndex(`${indexName}`)
            //Search word in Algolia
            algoliaindex.search(`${wordToSearch}`).then(results =>{
                console.log('We got `' + results.nbHits + '` results')
                console.log('Here is the first one: ', results.hits[0])
                resolve()
            }).catch(err =>{
                console.log(`Error: ${err}`)
                reject()
            });
        } catch (error) {
            console.log(`Error general método SearchbyWord: ${error}`)
            reject();
        }
    })
}

//>>> Search by property
function SearchbyProperty(wordToSearch, propertyName, propertyValue, indexName){
    return new Promise((resolve, reject)=>{
        try {
            if(!indexName){
                return reject(`Warning: indexName is required`)
            }
            if(!propertyName){
                return reject(`Warning: propertyName is required`)
            }
            if(!propertyName){
                return reject(`Warning: propertyValue is required`)
            }
            
            //Algolia index -> like a doc db
            const algoliaindex = client.initIndex(`${indexName}`)
            const parameters = {
                query: `${wordToSearch}`,
                facets: `[\"${propertyName}\"]`, 
                facetFilters: `[[\"${propertyName}:${propertyValue}\"]]`, 
                hitsPerPage: 100
            }
            //client.setExtraHeader('X-Algolia-User-ID', 'user123');
            // algoliaindex.search("", {
            //     "facets": "[\"post.location.city\"]",
            //     "facetFilters": "[[\"post.location.city:cali\"]]"
            // })
            //FIlters by Category
            algoliaindex.search({
              query: '',
              attributesToRetrieve: ['userFrom'],
              facets: ['post.location.city'],
              facetFilters: ['post.location.city:cali'],
              facetingAfterDistinct: true
            }).then(res => {
                console.log('We got `' + res.nbHits + '` results')
                console.log('Here is the first one: ', res.hits[0])
                resolve()
              //console.log(res);
            });

            // algoliaindex.searchForFacetValues({
            //     facetName: `${propertyName}`,
            //     facetQuery: `${propertyValue}`
            //   }).then(Response =>{
            //     console.log('We got `' + results.nbHits + '` results')
            //     console.log('Here is the first one: ', results.hits[0])
            //     resolve()
            // }).catch(err =>{
            //     console.log(`Error: ${err}`)
            //     reject();
            // });
            // algoliaindex.search(`${parameters}`).then(results =>{
                // console.log('We got `' + results.nbHits + '` results')
                // console.log('Here is the first one: ', results.hits[0])
                // resolve()
            // }).catch(err =>{
            //     console.log(`Error: ${err}`)
            //     reject();
            // });
        } catch (error) {
            console.log(`Error general en el método SearchbyProperty: ${error}`)
            reject();
        }
    })
}

//export methods
module.exports ={
    SearchbyWord,
    SearchbyProperty
}