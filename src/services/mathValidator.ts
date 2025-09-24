// Enhanced math content validation and safety filters
export class MathValidator {
  private static readonly MATH_KEYWORDS = [
    // Basic math operations
    'add', 'subtract', 'multiply', 'divide', 'plus', 'minus', 'times', 'divided',
    'sum', 'difference', 'product', 'quotient', 'calculate', 'compute',
    
    // Algebra
    'equation', 'solve', 'variable', 'unknown', 'algebra', 'expression',
    'polynomial', 'quadratic', 'linear', 'factor', 'expand', 'simplify',
    
    // Geometry
    'geometry', 'triangle', 'circle', 'square', 'rectangle', 'polygon',
    'area', 'perimeter', 'volume', 'surface', 'angle', 'degree', 'radius',
    'diameter', 'circumference', 'hypotenuse', 'theorem', 'proof',
    
    // Calculus
    'calculus', 'derivative', 'integral', 'limit', 'function', 'graph',
    'slope', 'tangent', 'maximum', 'minimum', 'optimization',
    
    // Statistics and Probability
    'statistics', 'probability', 'mean', 'median', 'mode', 'average',
    'standard deviation', 'variance', 'distribution', 'sample',
    
    // Numbers and operations
    'number', 'integer', 'fraction', 'decimal', 'percent', 'percentage',
    'ratio', 'proportion', 'prime', 'composite', 'factor', 'multiple',
    
    // Advanced math
    'logarithm', 'exponential', 'matrix', 'vector', 'trigonometry',
    'sine', 'cosine', 'tangent', 'radian', 'pi', 'infinity'
  ];

  private static readonly FORBIDDEN_TOPICS = [
    // Non-educational content
    'violence', 'weapon', 'drug', 'alcohol', 'gambling', 'adult',
    'inappropriate', 'harmful', 'dangerous', 'illegal',
    
    // Off-topic subjects
    'politics', 'religion', 'personal information', 'social media',
    'dating', 'relationship', 'money transfer', 'investment advice'
  ];

  static isMathRelated(text: string): boolean {
    const lowerText = text.toLowerCase();
    
    // Check for math symbols and patterns
    const mathSymbols = /[+\-*/=<>≤≥∑∏∫√π∞°%]/;
    const mathPatterns = /\b\d+[x-z]\b|\b[x-z]\d+\b|\b\d+\/\d+\b|\b\d+\.\d+\b/;
    
    // Check for math keywords
    const hasMathKeywords = this.MATH_KEYWORDS.some(keyword => 
      lowerText.includes(keyword)
    );
    
    // Check for mathematical expressions
    const hasMathSymbols = mathSymbols.test(text);
    const hasMathPatterns = mathPatterns.test(text);
    
    return hasMathKeywords || hasMathSymbols || hasMathPatterns;
  }

  static containsForbiddenContent(text: string): boolean {
    const lowerText = text.toLowerCase();
    return this.FORBIDDEN_TOPICS.some(topic => lowerText.includes(topic));
  }

  static validateProblem(problem: string): { isValid: boolean; reason?: string } {
    if (!problem || problem.trim().length === 0) {
      return { isValid: false, reason: 'Please enter a math problem.' };
    }

    if (problem.trim().length < 3) {
      return { isValid: false, reason: 'Please enter a more detailed math problem.' };
    }

    if (this.containsForbiddenContent(problem)) {
      return { isValid: false, reason: 'I can only help with mathematics problems. Please ask me a math question! 📚' };
    }

    if (!this.isMathRelated(problem)) {
      return { isValid: false, reason: 'I can only help with mathematics problems. Please ask me a math question! 🔢' };
    }

    return { isValid: true };
  }

  static sanitizeResponse(response: string): string {
    // Remove any potentially harmful content from AI responses
    let sanitized = response;
    
    // Remove any URLs or links
    sanitized = sanitized.replace(/https?:\/\/[^\s]+/g, '[link removed]');
    
    // Remove email addresses
    sanitized = sanitized.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[email removed]');
    
    // Remove phone numbers
    sanitized = sanitized.replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, '[phone removed]');
    
    return sanitized;
  }
}