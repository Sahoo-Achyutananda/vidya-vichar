/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Users, MessageCircle, Check, X, Clock, Plus, BookOpen, User, Calendar } from "lucide-react";

function ClassPage() {
  const {classId} = useParams();
  const [classInfo, setClassInfo] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("instructor");

  
  const [question,setQuestion] = useState("");

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const classRes = await fetch(`${import.meta.env.VITE_DB_LINK}/groups/${classId}`);
        const classData = await classRes.json();
        // console.log(classRes, classData);
        // console.log(classData.questions);
        setClassInfo(classData);
        setQuestions(classData.questions);
        
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchClassData();
  }, [classId]);

  //////////////////////////////////// APIs needed !
  const handleMarkAnswered = (questionId) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId ? { ...q, status: "answered" } : q
    ));
  };

  const handleMarkUnanswered = (questionId) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId ? { ...q, status: "unanswered" } : q
    ));
  };

  const handleAskQuestion = ()=>{
    console.log(question);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 h-64 animate-pulse"></div>
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="h-4 bg-gray-300 rounded mb-4"></div>
                <div className="h-3 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!classInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Class Not Found</h3>
          <p className="text-gray-600">The requested class could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ClassInfo classInfo={classInfo} userRole={userRole} />
      <QuestionsSection 
        questions={questions} 
        userRole={userRole}
        question={question}
        handleAskQuestion={handleAskQuestion}
        setQuestion={setQuestion}
        onMarkAnswered={handleMarkAnswered}
        onMarkUnanswered={handleMarkUnanswered}
      />
    </div>
  );
}

function ClassInfo({ classInfo, userRole, question, handleAskQuestion , setQuestion}) {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              {classInfo.groupName}
            </h1>
            
            <div className="flex flex-wrap gap-6 text-purple-200">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span>{classInfo.faculty}</span>
              </div>
              
            </div>
          </div>
          
          {userRole === "student" &&( 
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            {/* <h3 className="text-xl font-semibold mb-4">Ask Question</h3> */}
              <div className="space-y-3">
                <input
                  type="text"
                  value={question}
                  onChange={(e) =>
                    setQuestion( e.target.value )
                  }
                  placeholder="Type your question here..."
                  className="w-full p-3 rounded-lg bg-white/80 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={()=>handleAskQuestion()}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Ask Question</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function QuestionsSection({ questions, userRole, onMarkAnswered, onMarkUnanswered }) {
  const [filter, setFilter] = useState("all");
  
  const filteredQuestions = questions.filter(q => {
    if (filter === "answered") return q.status === "answered";
    if (filter === "unanswered") return q.status === "unanswered";
    return true;
  });

  const answeredCount = questions.filter(q => q.status === "answered").length;
  const unansweredCount = questions.filter(q => q.status === "unanswered").length;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Questions</h2>
          <p className="text-gray-600">
            {questions.length} total questions • {answeredCount} answered • {unansweredCount} pending
          </p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              filter === "all" 
                ? "bg-purple-600 text-white" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All ({questions.length})
          </button>
          <button
            onClick={() => setFilter("answered")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              filter === "answered" 
                ? "bg-green-600 text-white" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Answered ({answeredCount})
          </button>
          <button
            onClick={() => setFilter("unanswered")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              filter === "unanswered" 
                ? "bg-orange-600 text-white" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Pending ({unansweredCount})
          </button>
        </div>
      </div>

      {/* Questions Grid */}
      {filteredQuestions.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {filter === "all" ? "No Questions Yet" : `No ${filter} Questions`}
          </h3>
          <p className="text-gray-600 mb-6">
            {filter === "all" 
              ? "Be the first to ask a question and start the discussion" 
              : `No questions match the ${filter} filter`
            }
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
            <Plus className="w-5 h-5 inline mr-2" />
            Ask First Question
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredQuestions.map((question) => (
            <Question 
              key={question.id} 
              ques={question} 
              userRole={userRole}
              onMarkAnswered={onMarkAnswered}
              onMarkUnanswered={onMarkUnanswered}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Question({ ques, userRole, onMarkAnswered, onMarkUnanswered }) {
  const isAnswered = ques.status === "answered";
  
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Status Bar */}
      <div className={`h-1 ${isAnswered ? 'bg-green-500' : 'bg-orange-500'}`}></div>
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                isAnswered 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {isAnswered ? (
                  <>
                    <Check className="w-3 h-3 mr-1" />
                    Answered
                  </>
                ) : (
                  <>
                    <Clock className="w-3 h-3 mr-1" />
                    Pending
                  </>
                )}
              </span>
              <span className="text-xs text-gray-500">{ques.questionTimestamp}</span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300 line-clamp-3">
              {ques.questionText}
            </h3>
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Asked by <span className="font-medium">{ques.author}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">

          
          {userRole === "instructor" && (
            <div className="flex items-center space-x-2">
              {isAnswered ? (
                <button
                  onClick={() => onMarkUnanswered(ques.id)}
                  className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-1"
                >
                  <X className="w-4 h-4" />
                  <span>Mark Pending</span>
                </button>
              ) : (
                <button
                  onClick={() => onMarkAnswered(ques.id)}
                  className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-1"
                >
                  <Check className="w-4 h-4" />
                  <span>Mark Answered</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClassPage;