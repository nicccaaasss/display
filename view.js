// Supabase Configuration
const SUPABASE_URL = "https://yrmpdcpwgsuopkimhjhw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlybXBkY3B3Z3N1b3BraW1oamh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5ODc2OTcsImV4cCI6MjA1ODU2MzY5N30.hGZ1XaHYWIjTChMQTlNOmG9s8QSpozjq_bufo_ZTAHU";

// Ensure Supabase library is loaded before initializing
if (typeof window.supabase === 'undefined') {
    console.error("Supabase library is not loaded. Make sure to include the script in your HTML file.");
} else {
    var supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// Fetch and Display Data
async function fetchStudents() {
    console.log("Fetching student data...");
    
    try {
        if (!supabase) {
            console.error("Supabase is not initialized correctly.");
            return;
        }
        
        let { data, error } = await supabase.from("students").select("*");

        if (error) {
            throw error;
        }

        console.log("Fetched data:", data); // Log data to check if it's retrieved

        let tableBody = document.getElementById("studentTableBody");
        if (!tableBody) {
            console.error("Error: studentTableBody element not found.");
            return;
        }

        tableBody.innerHTML = ""; // Clear existing rows

        if (data.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="18" style="text-align:center;">No data available</td></tr>`;
            return;
        }

        data.forEach(student => {
            let studentPhoto = student.student_photo ? `<img src="${student.student_photo}" class="student-img">` : "No Image";
            let aadharPhoto = student.aadhar_photo ? `<img src="${student.aadhar_photo}" class="student-img">` : "No Image";

            let row = `<tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.activity}</td>
                <td>${student.gender}</td>
                <td>${student.dob}</td>
                <td>${student.age}</td>
                <td>${student.qualification}</td>
                <td>${student.father_name}</td>
                <td>${student.father_occupation}</td>
                <td>${student.mother_name}</td>
                <td>${student.mother_occupation}</td>
                <td>${student.father_phone}</td>
                <td>${student.father_email}</td>
                <td>${student.mother_phone}</td>
                <td>${student.mother_email}</td>
                <td>${student.address}</td>
                <td>${studentPhoto}</td>
                <td>${aadharPhoto}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });

        console.log("Table updated with latest data.");

    } catch (err) {
        console.error("Unexpected error fetching data:", err);
    }
}

// Call function on page load
document.addEventListener("DOMContentLoaded", fetchStudents);