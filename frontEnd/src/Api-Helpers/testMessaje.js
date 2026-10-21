const defaultUrl = "http://localhost:8080"

/** @param {string} path */
export async function getData(path){
    const url = defaultUrl + path;

    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`)
        }
        const result = await response.json();
        console.log(result);
        return result.message;
    } 
    catch (error){
        console.error(error.message);
    }
}