import React from 'react';
import { ArrowRight, RefreshCw, Calculator } from 'lucide-react';

interface SimilarProblemsProps {
  currentProblem: string;
  onProblemSelect: (problem: string) => void;
}

export const SimilarProblems: React.FC<SimilarProblemsProps> = ({ currentProblem, onProblemSelect }) => {
  // Generate similar problems based on the current problem
  const generateSimilarProblems = (problem: string) => {
    const lowerProblem = problem.toLowerCase();
    
    // Linear equations
    if (lowerProblem.includes('x') && (lowerProblem.includes('=') || lowerProblem.includes('solve'))) {
      return [
        { problem: '3x + 7 = 22', difficulty: 'Easy', topic: 'Linear Equations' },
        { problem: '5x - 8 = 17', difficulty: 'Easy', topic: 'Linear Equations' },
        { problem: '2x + 9 = 25', difficulty: 'Easy', topic: 'Linear Equations' },
        { problem: '4(x - 3) = 20', difficulty: 'Medium', topic: 'Equations with Parentheses' },
        { problem: '6x - 4 = 2x + 12', difficulty: 'Medium', topic: 'Variables on Both Sides' },
      ];
    }
    
    // Quadratic equations
    if (lowerProblem.includes('x²') || lowerProblem.includes('x^2') || lowerProblem.includes('quadratic')) {
      return [
        { problem: 'x² - 5x + 6 = 0', difficulty: 'Medium', topic: 'Quadratic Equations' },
        { problem: '2x² + 7x - 4 = 0', difficulty: 'Hard', topic: 'Quadratic Equations' },
        { problem: 'x² - 9 = 0', difficulty: 'Easy', topic: 'Difference of Squares' },
        { problem: 'x² + 6x + 9 = 0', difficulty: 'Medium', topic: 'Perfect Square Trinomial' },
        { problem: '3x² - 12x = 0', difficulty: 'Medium', topic: 'Factoring' },
      ];
    }
    
    // Geometry - Area
    if (lowerProblem.includes('area') || lowerProblem.includes('triangle') || lowerProblem.includes('circle') || lowerProblem.includes('rectangle')) {
      return [
        { problem: 'Find the area of a triangle with base 8cm and height 6cm', difficulty: 'Easy', topic: 'Triangle Area' },
        { problem: 'Calculate the area of a circle with radius 5cm', difficulty: 'Medium', topic: 'Circle Area' },
        { problem: 'Find the area of a rectangle with length 12m and width 7m', difficulty: 'Easy', topic: 'Rectangle Area' },
        { problem: 'What is the area of a square with side length 9cm?', difficulty: 'Easy', topic: 'Square Area' },
        { problem: 'Find the area of a trapezoid with bases 10cm and 6cm, height 4cm', difficulty: 'Medium', topic: 'Trapezoid Area' },
      ];
    }
    
    // Geometry - Perimeter
    if (lowerProblem.includes('perimeter') || lowerProblem.includes('circumference')) {
      return [
        { problem: 'Find the perimeter of a rectangle with length 15cm and width 8cm', difficulty: 'Easy', topic: 'Rectangle Perimeter' },
        { problem: 'Calculate the circumference of a circle with radius 7cm', difficulty: 'Medium', topic: 'Circle Circumference' },
        { problem: 'What is the perimeter of a square with side length 12cm?', difficulty: 'Easy', topic: 'Square Perimeter' },
        { problem: 'Find the perimeter of a triangle with sides 5cm, 7cm, and 9cm', difficulty: 'Easy', topic: 'Triangle Perimeter' },
        { problem: 'Calculate the perimeter of a regular hexagon with side length 6cm', difficulty: 'Medium', topic: 'Polygon Perimeter' },
      ];
    }
    
    // Percentages
    if (lowerProblem.includes('%') || lowerProblem.includes('percent')) {
      return [
        { problem: 'What is 25% of 80?', difficulty: 'Easy', topic: 'Percentage Calculation' },
        { problem: 'Find 15% of 240', difficulty: 'Easy', topic: 'Percentage Calculation' },
        { problem: 'If 30% of a number is 45, what is the number?', difficulty: 'Medium', topic: 'Reverse Percentage' },
        { problem: 'A shirt costs $40. If there is a 20% discount, what is the sale price?', difficulty: 'Medium', topic: 'Percentage Discount' },
        { problem: 'The population increased from 500 to 650. What is the percentage increase?', difficulty: 'Hard', topic: 'Percentage Change' },
      ];
    }
    
    // Fractions
    if (lowerProblem.includes('/') || lowerProblem.includes('fraction')) {
      return [
        { problem: 'Simplify: 3/4 + 1/6', difficulty: 'Medium', topic: 'Adding Fractions' },
        { problem: 'Calculate: 2/3 × 3/5', difficulty: 'Medium', topic: 'Multiplying Fractions' },
        { problem: 'Solve: 5/8 - 1/4', difficulty: 'Medium', topic: 'Subtracting Fractions' },
        { problem: 'Divide: 3/4 ÷ 2/3', difficulty: 'Medium', topic: 'Dividing Fractions' },
        { problem: 'Convert 7/8 to a decimal', difficulty: 'Easy', topic: 'Fraction to Decimal' },
      ];
    }
    
    // Word problems
    if (lowerProblem.length > 50 || lowerProblem.includes('if') || lowerProblem.includes('how many')) {
      return [
        { problem: 'Sarah has 24 apples. She gives away 1/3 of them. How many apples does she have left?', difficulty: 'Medium', topic: 'Word Problems' },
        { problem: 'A train travels 180 miles in 3 hours. What is its average speed?', difficulty: 'Medium', topic: 'Rate Problems' },
        { problem: 'John is 3 times as old as his sister. If their combined age is 32, how old is John?', difficulty: 'Hard', topic: 'Age Problems' },
        { problem: 'A rectangular garden is twice as long as it is wide. If the perimeter is 36m, find the dimensions.', difficulty: 'Hard', topic: 'Geometry Word Problems' },
        { problem: 'If 5 books cost $45, how much do 8 books cost?', difficulty: 'Medium', topic: 'Proportion Problems' },
      ];
    }
    
    // Default similar problems for basic arithmetic
    return [
      { problem: '15 + 27 = ?', difficulty: 'Easy', topic: 'Addition' },
      { problem: '84 - 39 = ?', difficulty: 'Easy', topic: 'Subtraction' },
      { problem: '12 × 8 = ?', difficulty: 'Easy', topic: 'Multiplication' },
      { problem: '144 ÷ 12 = ?', difficulty: 'Easy', topic: 'Division' },
      { problem: 'What is the square root of 64?', difficulty: 'Medium', topic: 'Square Roots' },
    ];
  };

  const similarProblems = generateSimilarProblems(currentProblem);

  const handleProblemClick = (problem: string) => {
    onProblemSelect(problem);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <RefreshCw className="w-5 h-5 text-blue-500" />
          <span>Similar Problems to Practice</span>
        </h3>
        <span className="text-sm text-gray-500">Click any problem to solve it</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {similarProblems.map((item, index) => (
          <div 
            key={index} 
            onClick={() => handleProblemClick(item.problem)}
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer group hover:shadow-md"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 pr-2">
                <p className="text-gray-900 font-medium leading-relaxed group-hover:text-blue-700 transition-colors">
                  {item.problem}
                </p>
              </div>
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Calculator className="w-4 h-4 text-blue-500" />
                <ArrowRight className="w-4 h-4 text-blue-500" />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                item.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {item.difficulty}
              </span>
              <span className="text-xs text-gray-600">{item.topic}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-2 mb-2">
          <Calculator className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">Practice Tip</span>
        </div>
        <p className="text-blue-700 text-sm">
          Click on any problem above to automatically solve it and see the step-by-step solution. 
          This helps you practice similar concepts and build your problem-solving skills!
        </p>
      </div>
    </div>
  );
};