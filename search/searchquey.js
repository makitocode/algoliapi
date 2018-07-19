'use strict'
/* *******
Dependencies
* *******/
//Lib for algolia
const algoliasearch = require('algoliasearch');

/* *******
Initialize
* *******/
//load env file
dotenv.load();
//load algolia
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
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
function SearchbyProperty(wordToSearch, propertyValue, propertyName, indexName){
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
            algoliaindex.search(`${wordToSearch}`).then(response =>{
                console.log('We got `' + results.nbHits + '` results')
                console.log('Here is the first one: ', results.hits[0])
                resolve()
            }).catch(err =>{
                console.log(`Error: ${err}`)
                reject();
            });
        } catch (error) {
            console.log(`Error general en el método SearchbyProperty: ${error}`)
            reject();
        }
    })
}
