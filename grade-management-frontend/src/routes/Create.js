import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const [studentName, setStudentName] = useState('');
    const [score, setScore] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newGradeRecord = { studentName, score };

        fetch('http://localhost:8081/api/v1/grades/add', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newGradeRecord)
        }).then((response) => {
            if(response.ok) {
                navigate("/");
            } else if(response.status === 400) {
                alert("Student already has grade!");
                window.location.reload();
            }
        })
    }

    return (
        <div className="create">
            <h2>Add a New Grade</h2>
            <form onSubmit={handleSubmit}>
                <label>Student Name:</label>
                <input 
                    type="text" 
                    required 
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                />

                <label>Grade:</label>
                <input 
                    type="number" 
                    required 
                    value={score}
                    min={0}
                    max={100}
                    onChange={(e) => setScore(e.target.value)}
                />

                <button type="submit">Add Grade</button>
            </form>
        </div>
    );
}
 
export default Create;