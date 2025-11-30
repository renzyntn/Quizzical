export default async function getQuestions() {
    
    try{
        const response = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
        if (!response.ok) {
            throw new Error("There was a problem fetching the API.")
        }
        const data = await response.json();
        return data;
    } catch(err) {
        console.log(err);
    }
}