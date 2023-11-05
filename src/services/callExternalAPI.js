import axios from 'axios';

export async function callExternalAPI(messages) {
    const API_KEY = process.env.OPEN_AI_API_KEY
    const API_URL = process.env.OPEN_AI_API_URL
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      };
      
      const data = {
        option1: 'option',
        messages: messages,
        number:50
    };
    try {
        await axios.post(API_URL, data, {headers})
        .then(function(response){
            result = response.item;
        return result    
        })
    } catch (error) {console.error('Error:', error)
        
    }
}