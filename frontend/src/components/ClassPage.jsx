import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ClassPage() {
  const { classId } = useParams(); // User parameter se le class ID milega
  const [classInfo, setClassInfo] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        // Fetch class info
        const classRes = await fetch(
          `${import.meta.env.VITE_DB_LINK}/classes/?id=${classId}`
        );
        const classData = await classRes.json();
        setClassInfo(classData[0]);
        console.log(classData);
        // // Fetch questions for the class
        // const questionsRes = await fetch(
        //   `${import.meta.env.VITE_DB_LINK}/questions?class_id=${classId}`
        // );
        // const questionsData = await questionsRes.json();
        setQuestions(classData[0].questions); // temporary
      } catch (err) {
        console.error(err);
      }
    };

    fetchClassData();
  }, [classId]);

  if (!classInfo) return <p>Loading class info...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{classInfo.name}</h1>

      <div className="flex flex-wrap gap-4">
        {questions.length === 0 ? (
          <p>No questions yet.</p>
        ) : (
          questions.map((q) => (
            <div
              key={q.id}
              className={`w-60 p-4 rounded shadow-lg text-white
                ${
                  q.status === "answered"
                    ? "bg-green-500"
                    : q.status === "important"
                    ? "bg-red-500"
                    : "bg-yellow-400"
                }
              `}
            >
              <p className="font-semibold">{q.text}</p>
              <p className="text-sm mt-2">Status: {q.status}</p>
              {q.answers.length > 0 && (
                <div className="mt-2 p-2 bg-white text-black rounded">
                  {q.answers.map((a) => (
                    <p key={a.id} className="text-sm">
                      Answer: {a.text}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ClassPage;
