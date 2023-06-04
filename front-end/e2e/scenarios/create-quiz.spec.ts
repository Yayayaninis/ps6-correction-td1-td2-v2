import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { QuestionFormFixture } from 'src/app/questions/question-form/question-form.fixture';
import { QuizFormComponent } from 'src/app/quizzes/quiz-form/quiz-form.component';
import { QuizFormFixture } from 'src/app/quizzes/quiz-form/quiz-form.fixture';
import { QuizFixture } from 'src/app/quizzes/quiz/quiz.fixture';



// test.describe is a hook that creates a test group and lets you define lifecycle stages such as beforeEach.
test.describe('Quiz Feature', () => {

    test('Quiz Creation', async ({ page }) => {
        await page.goto(testUrl);

        //create all fixtures
        const quizFormFixture = new QuizFormFixture(page);
        const quizFixture = new QuizFixture(page);
        const questionFormFixture = new QuestionFormFixture(page);

        await expect(page).toHaveURL("http://localhost:4200/quiz-list");

        await test.step(`Quiz form visible`, async () => {

            const quizForm = await quizFormFixture.getQuizForm();
            const isVisible = await quizForm.isVisible();
            expect(isVisible).toBeTruthy();
        });

        await test.step(`Create Quiz`, async () => {
            const inputName = await quizFormFixture.getInput('name');
            await inputName.type('Quiz E2E');
            const inputTheme = await quizFormFixture.getInput('theme');
            await inputTheme.type('E2E');
            await quizFormFixture.clickCreateButton();
            const indexQuiz = await quizFixture.getIndexOfTitle('Quiz E2E');
            expect(await quizFixture.getContentTitleQuiz(indexQuiz)).toEqual(' Quiz E2E ');
        });

        await test.step(`Add questions`, async () => {
            await quizFixture.clickButtonOfQuiz('Quiz E2E', 'Edit');

            const inputLabel = await questionFormFixture.getLabelInput();
            await inputLabel.type('What are the advantages of E2E testing for the web?');
            await questionFormFixture.clickAddAnswerButton(2);
            const inputAnswers = await questionFormFixture.getAllAnswersInputs('text');
            const checkboxAnswers = await questionFormFixture.getAllAnswersInputs('checkbox');

            await inputAnswers[0].type('E2E (End-to-End) testing offers several advantages in the web domain. Firstly, they simulate the entire user journey on a website, testing all interactions between the various components of the system. This includes validating functionalities, checking navigation, data entry and so on. By carrying out these tests, it is possible to detect potential problems and bugs at an early stage, thus guaranteeing better quality of the final product. Whats more, E2E tests can be automated, saving time and reducing the costs associated with manual testing.');
            await checkboxAnswers[0].check();
            await inputAnswers[1].type('E2E testing in the web domain doesnt really offer any significant advantages. They are often costly and time-consuming, as they require a complete test environment to be set up, simulating all possible interactions on the website. Whats more, these tests can be prone to false positives or false negatives, which can make them difficult to interpret. In some cases, E2E tests can also be unreliable, as they depend on the initial state of the system and can be sensitive to changes in the user interface. It is therefore preferable to focus on other types of testing, such as unit testing and regression testing, which can offer better coverage of website functionality and performance.');
            await questionFormFixture.clickCreateButton();

            const question = await page.getByRole('heading', { name: ' What are the advantages of E2E testing for the web?' });
            const goodAnswer = await page.getByText('0 - E2E (End-to-End) testing offers several advantages in the web domain. Firstl');
            const badAnswer = await page.getByText('1 - E2E testing in the web domain doesnt really offer any significant advantages');
            expect(question).toBeVisible();
            expect(goodAnswer).toBeVisible();
            expect(badAnswer).toBeVisible();
        });
    });

    test('Delete Quiz', async ({ page }) => {
        await page.goto(testUrl);
        const quizFixture = new QuizFixture(page);
        const quiz = await page.getByRole('heading', { name: ' Quiz E2E' });
        expect(quiz).toBeVisible();
        await quizFixture.clickButtonOfQuiz('Quiz E2E', 'Delete');
        expect(quiz).not.toBeVisible();
    });

});
