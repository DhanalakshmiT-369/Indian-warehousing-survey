import * as XLSX from 'xlsx';

/**
 * Generates a detailed Excel export with all survey responses and their answers
 * @param {Array} surveys - Array of survey documents from MongoDB
 * @param {Object} questions - Questions object from SURVEY_DATA.QUESTIONS
 */
export function generateDetailedExcel(surveys, questions) {
  if (!surveys || surveys.length === 0) {
    alert('No survey responses to download');
    return;
  }

  // Get all question IDs in order (from 1 to 75)
  const questionIds = Object.keys(questions)
    .map(Number)
    .sort((a, b) => a - b);

  // Build header row
  const headerRow = [
    'Respondent ID',
    'Respondent Name',
    'Role Name',
    'Email ID',
    'Organization',
    'Submitted Time'
  ];

  // Add question columns (Question ID, Question Text, Answer)
  questionIds.forEach(qId => {
    const question = questions[qId];
    headerRow.push(`Q${qId}_ID`);
    headerRow.push(`Q${qId}_Text`);
    headerRow.push(`Q${qId}_Answer`);
  });

  // Build data rows
  const dataRows = surveys.map(survey => {
    const respondent = survey.respondent || {};
    const answers = survey.answers || {};
    const submittedDate = survey.submittedAt
      ? new Date(survey.submittedAt).toLocaleString('en-IN')
      : 'Not Submitted';

    const row = [
      survey._id?.toString() || 'N/A',
      respondent.name || 'N/A',
      respondent.role || 'N/A',
      respondent.email || 'N/A',
      respondent.organization || 'N/A',
      submittedDate
    ];

    // Add answers for each question
    questionIds.forEach(qId => {
      const question = questions[qId];
      const answer = answers[qId] || '';
      row.push(qId); // Question ID
      row.push(question?.label || `Question ${qId}`); // Question Text
      row.push(formatAnswer(answer)); // Answer
    });

    return row;
  });

  // Create worksheet
  const worksheet = XLSX.utils.aoa_to_sheet([headerRow, ...dataRows]);

  // Set column widths
  const colWidths = [];
  headerRow.forEach((_, idx) => {
    if (idx < 6) {
      colWidths.push({ wch: 20 }); // Respondent info columns
    } else if (idx % 3 === 0) {
      colWidths.push({ wch: 8 }); // Question ID
    } else if ((idx - 1) % 3 === 0) {
      colWidths.push({ wch: 50 }); // Question Text
    } else {
      colWidths.push({ wch: 30 }); // Answer
    }
  });
  worksheet['!cols'] = colWidths;

  // Create workbook and add worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Survey Responses');

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `survey-responses-detailed-${timestamp}.xlsx`;

  // Write the file
  XLSX.writeFile(workbook, filename);
}

/**
 * Format answer for display in Excel
 * @param {*} answer - The answer value (can be string, array, object, etc.)
 * @returns {string} Formatted answer
 */
function formatAnswer(answer) {
  if (!answer) return '';
  
  if (Array.isArray(answer)) {
    return answer.join('; ');
  }
  
  if (typeof answer === 'object') {
    return JSON.stringify(answer);
  }
  
  return String(answer);
}

/**
 * Generates a simple CSV export (backward compatible)
 * @param {Array} surveys - Array of survey documents
 */
export function generateSimpleCSV(surveys) {
  if (surveys.length === 0) {
    alert('No survey responses to download');
    return;
  }

  const headers = [
    'Respondent Name',
    'Email',
    'Organization',
    'Role',
    'Submitted Date',
    'Progress %',
    'Total Questions Answered'
  ];

  const rows = surveys.map(survey => {
    const respondent = survey.respondent || {};
    const answeredCount = Object.keys(survey.answers || {}).length;
    const submittedDate = survey.submittedAt
      ? new Date(survey.submittedAt).toLocaleDateString()
      : 'N/A';

    return [
      respondent.name || 'N/A',
      respondent.email || 'N/A',
      respondent.organization || 'N/A',
      respondent.role || 'N/A',
      submittedDate,
      `${survey.progress?.totalAnswered || 0}%`,
      answeredCount
    ];
  });

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `survey-responses-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
