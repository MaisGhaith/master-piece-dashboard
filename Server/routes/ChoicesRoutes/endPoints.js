
// ! choices endpoints 

const deleteChoice = "http://localhost:8181/deleteChoices/deleteChoice/:id"

const getChoices = "http://localhost:8181/getChoices/getChoice";

const editChoices = "http://localhost:8181/editChoices/editChoice/:id";

const addChoices = "http://localhost:8181/addChoices/addChoice"


// ! services endpoints

const deleteService = `http://localhost:8181/delete/deleteService/${id}`

const getServices = "http://localhost:8181/services/getService";

const editServices = `http://localhost:8181/edit/editService/${id}`;

const addServices = "http://localhost:8181/dash/addService";




// ! get all choices, even deleted 
const getAllChoices = async () => {
    try {
        const response = await axios.get("http://localhost:8181/getChoices/getChoice");
        console.log(response.data)
        setChoices(response.data);

    } catch (error) {
        console.log("Error getting choices data:", error);
    }
}
useEffect(() => {
    getAllChoices
})
