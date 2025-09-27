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
      <ClassInfo classInfo={classInfo} />
      <QuestionsSection questions={questions} />
    </div>
  );
}

function ClassInfo({ classInfo }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-4">Class Information</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="mb-2">Name: {classInfo.name}</p>
        <p className="mb-2">Description: {classInfo.description}</p>
        <p className="mb-2">Instructor: {classInfo.instructor}</p>
      </div>
    </div>
  );
}

function QuestionsSection({ questions }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-xl font-semibold mb-2">Questions</h2>
      <div className="flex flex-wrap gap-4">
        {questions.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Questions Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first question to get started
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300">
              Create Your First Question
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {questions.map((q) => (
              <Question key={q.id} ques={q} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Question({ ques }) {
  return (
    <div
      key={ques.id}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group cursor-pointer"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors duration-300">
              {ques.questionText}
            </h3>
            <div className="text-gray-600">{ques.questionTimestamp}</div>
            <div className="text-gray-600">{ques.author}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassPage;
