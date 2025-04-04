export const generateQuestion = (firstNum, secondNum, operator) => {
    let num1, num2, answer;

    // GEnerate first number based on firstNum and secondNum
    const min1 = Math.pow(10, firstNum - 1);
    const max1 = Math.pow(10, firstNum) - 1;

    // Generate second number based on firstNum and secondNum
    const min2 = Math.pow(10, secondNum - 1);
    const max2 = Math.pow(10, secondNum) - 1;

    num1 = Math.floor(Math.random() * (max1 - min1 + 1)) + min1;
    num2 = Math.floor(Math.random() * (max2 - min2 + 1)) + min2;

    switch(operator) {
        case '+':
            answer = num1 + num2;
            break;
        case '-':
            answer = num1 - num2;
            break;
        case '*':
            answer = num1 * num2;
            break;
        case '÷':
            answer = Math.floor(num1 / num2);
            break;
        default:
            throw new Error('Invalid operator');
    }

    return { num1, num2, answer, operator };
}

export const checkAnswer = (userAnswer, correctAnswer) => {
    return parseInt(userAnswer) === correctAnswer;
}