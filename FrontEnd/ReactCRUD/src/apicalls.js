export async function get() {
    try {
        const response = await fetch("http://localhost:5294/api/Student", {
            method: "GET",
            mode: "cors"
        });
        const students = await response.json();
        return students;
    }
    catch(error) {
        throw error;
    }
}