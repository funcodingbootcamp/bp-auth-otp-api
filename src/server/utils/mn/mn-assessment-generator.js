const faker = require('faker');
const coursesArr = require('./courses.json');
const standardSetsArr = require('./standard-sets.json');

const gradesArr = [
  'Kindergarten',
  'Grade 1',
  'Grade 2',
  'Grade 3',
  'Grade 4',
  'Grade 5',
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Grade 9',
  'Grade 10',
  'Grade 11',
  'Grade 12'
];

const subjectsArr = [
  'All Subject',
  'Mathematics',
  'ELA',
  'Science',
  'Social Studies',
  'Other Subjects'
];

const collectionArr = [
  'CLI MSMS Bank',
  'Private Library',
  'School Library',
  'District Library',
  'Public Library',
  'Edulastic Certified',
  'KDS Inspect Bank',
  'Inspect 18-19'
];

const questionTypeArr = [
  'Multiple Choice',
  'Multiple Selection',
  'Expression Evaluator',
  'Numeric',
  'Passage Based',
  'Classification',
  'Cloze (Formula)',
  'Cloze Matrix',
  'Drag and Drop',
  'Drawing Response',
  'Essay Type',
  'Fraction Editor',
  'Graphing',
  'Graph Placement',
  'Graph Plotter',
  'Label an image (Dropdown)',
  'Label an image (Text)',
  'Line Plot',
  'Match the following',
  'Matching Tables',
  'Multipart',
  'Number Line',
  'Numeric Entry w/ Units',
  'Pictograph',
  'Range Plotter',
  'Resequence',
  'Editing Task',
  'Sentence Response',
  'Text Drop Down',
  'Text Entry',
  'True or False'
];

const depthOfKnowledgeArr = [
  'Recall',
  'Skill/Concept',
  'Strategic Thinking',
  'Extended Thinking'
];

const difficultyArr = [
  'All Levels',
  'Easy',
  'Medium',
  'Hard'
];

const sharedLevelArr = [
  'Private',
  'School',
  'District',
  'Public'
];

// Generation
export function generateMnAssessmentJson() {
  const id = faker.random.uuid();
  const name = `Math test #${faker.random.number()}`;
  const description = faker.random.words();
  const grades = [faker.random.arrayElement(gradesArr), faker.random.arrayElement(gradesArr)];
  const subject = faker.random.arrayElement(subjectsArr);
  const course = faker.random.arrayElement(coursesArr);
  const standards = [
    {
      standardSet: faker.random.arrayElement(standardSetsArr),
      domains: [
        {
          name: 'Operations & Algebraic Thinking',
          id: '101',
          standards: [
            {
              name: 'CCSS.MATH.CONTENT.5.OA.A.1',
              id: '234'
            }
          ]
        }
      ]
    },
    {
      standardSet: faker.random.arrayElement(standardSetsArr),
      domains: [
        {
          name: 'Operations & Algebraic Thinking 2',
          id: '102',
          standards: [
            {
              name: 'CCSS.MATH.CONTENT.5.OA.A.2',
              id: '235'
            }
          ]
        }
      ]
    },
    {
      standardSet: faker.random.arrayElement(standardSetsArr),
      domains: [
        {
          name: 'Operations & Algebraic Thinking 3',
          id: '103',
          standards: [
            {
              name: 'CCSS.MATH.CONTENT.5.OA.A.3',
              id: '236'
            }
          ]
        }
      ]
    }
  ];
  const collection = faker.random.arrayElement(collectionArr);
  const questionTypes = [
    faker.random.arrayElement(questionTypeArr),
    faker.random.arrayElement(questionTypeArr)
  ];
  const depthOfKnowledge = faker.random.arrayElement(depthOfKnowledgeArr);
  const difficulty = faker.random.arrayElement(difficultyArr);
  const author = faker.random.uuid();
  const coAuthor = faker.random.uuid();
  const sharedLevel = faker.random.arrayElement(sharedLevelArr);
  const sharedLevelId = faker.random.uuid();
  const sharedWithIds = [faker.random.uuid(), faker.random.uuid()];
  const isInstance = faker.random.arrayElement([true, false]);
  const instanceUserId = faker.random.uuid();
  const isFavorite = faker.random.arrayElement([true, false]);
  const tags = ['Math', 'Algebra', 'Unit1'];
  const userFolders = ['Common Assessments', 'Term 1 Assessments'];
  return {
    id,
    name,
    description,
    grades,
    subject,
    course,
    standards,
    collection,
    questionTypes,
    depthOfKnowledge,
    difficulty,
    author,
    coAuthor,
    sharedLevel,
    sharedLevelId,
    sharedWithIds,
    isInstance,
    instanceUserId,
    isFavorite,
    tags,
    userFolders
  };
}

export function generateMnAssessmentsText(num) {
  let res = '[';
  for (let i = 0; i < num; i++) {
    res += `${JSON.stringify(generateMnAssessmentJson())},`;
  }
  res = `${res + JSON.stringify(generateMnAssessmentJson())}]`;
  return res;
}
