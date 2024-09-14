import axios from 'axios';

export async function getExternalAPI(body) {
    // const API_KEY = process.env.API_KEY
    const API_URL = process.env.SERVER_URL 
    const headers = {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${API_KEY}`
      };
      
      ;
    try {
        await axios.get(API_URL, body, {headers})
        .then(function(response){
            result = response.item;
        return result    
        })
    } catch (error) {console.error('Error:', error)
        
    }
}