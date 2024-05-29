import React, { useState } from 'react';
import bg from "./assets/bg.png";
import "./Test.css";
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';

// Sample questions data
const questions = [
  {
    question: "How often do you dab in public?",
    options: ["Never", "Sometimes", "All the time"],
  },
  {
    question: "How often do you use outdated internet slang in conversations?",
    options: ["Never", "Sometimes", "All the time"],
  },
  {
    question: "When someone tells a joke that falls flat, how likely are you to laugh anyway?",
    options: ["Never", "Sometimes", "All the time"],
  },
  {
    question: "Do you ever make your own edits",
    options: ["Never", "Sometimes", "All the time"],
  },
  {
    question: "Do you ever air(ignore) someones joke on purpose",
    options: ["Never", "Sometimes", "All the time"],
  },
  {
    question: "When taking a selfie, how often do you use excessive filters or editing?",
    options: ["Never", "Sometimes", "All the time"],
  },
  {
    question: "How likely are you to burst into song or dance in public?",
    options: ["Never", "Sometimes", "All the time"],
  },
  {
    question: "Do you ever say anime dialouges out loud ?",
    options: ["Never", "Sometimes", "All the time"],
  },
  {
    question: "When meeting new people, how likely are you to dominate the conversation?",
    options: ["Never", "Sometimes", "All the time"],
  },
  {
    question: "Have you ever performed a TikTok dance?",
    options: ["Never", "Sometimes", "All the time"],
  }
];

const Test = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));
  const [cringeScore, setCringeScore] = useState(null);

  const handleOptionChange = (option) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[currentQuestionIndex] = option;
    setSelectedOptions(updatedSelectedOptions);
  };

  const nextQuestion = () => {
    if (selectedOptions[currentQuestionIndex] !== null) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        calculateCringeScore();
      }
    }
  };

  const calculateCringeScore = () => {
    let score = 0;
    selectedOptions.forEach(option => {
      if (option === 'Sometimes') {
        score += 5;
      } else if (option === 'All the time') {
        score += 10;
      }
    });
    setCringeScore(score);

    // Prompt user for name
    const name = window.prompt('Enter your name:');
    const currentDate = new Date().toLocaleDateString(); // Get current date

    if (name) {
      generatePDF(score, name, currentDate);
    } else {
      alert('Please enter your name.');
    }
  };

  const generatePDF = (score, name, date) => {
    const doc = new jsPDF(); // Create jsPDF instance

    // Add text content to the PDF
    doc.setFontSize(16); // Set a larger font size for the title
    doc.text('Official Cringe Certification', 105, 20, { align: 'center' });

    doc.setFontSize(12); // Set a standard font size for the body
    doc.text('----------------------------------------------', 105, 30, { align: 'center' });
    doc.text('This certification is proudly presented to', 105, 40, { align: 'center' });
    doc.text(name, 105, 50, { align: 'center' });
    doc.text(`${name} has received a score of ${score} in the test conducted by`, 105, 60, { align: 'center' });
    doc.text(`Cringe-O-Meter on ${date}`, 105, 70, { align: 'center' });

    // Save the PDF
    doc.save('cringe_certification.pdf');
  };

  const generateQuestions = () => {
    const question = questions[currentQuestionIndex];
    return (
      <div>
        <h3>{question.question}</h3>
        {question.options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              className='option'
              id={`${option}${currentQuestionIndex}`}
              name={`option${currentQuestionIndex}`}
              value={option}
              checked={selectedOptions[currentQuestionIndex] === option}
              onChange={() => handleOptionChange(option)}
            />
            <label htmlFor={`${option}${currentQuestionIndex}`}>{option}</label>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <img src={bg} alt="Background" />
      <div className="heading">
        <h1>THE CRINGE TEST</h1>
      </div>
      <div className="placeholder">
        <div className='wrapper'>
          {cringeScore === null ? (
            <>
              {generateQuestions()}
              <button onClick={nextQuestion} disabled={selectedOptions[currentQuestionIndex] === null}>
                Next
              </button>
            </>
          ) : (
            <div>
              <p className='cringe-score'>Your Cringe Score: {cringeScore}</p>
              <button onClick={() => navigate('/')}>Go to Home</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Test;
