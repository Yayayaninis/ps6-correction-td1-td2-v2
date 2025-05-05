import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class QuestionFormFixture extends E2EComponentFixture {

    getLabelInput() {
        return this.page.waitForSelector('app-question-form input[id="label"]');
    }

    getAllAnswersInputs(type: string) {
        const selector = `app-question-form .answer-form input[type="${type}"]`;
        return this.page.$$(selector);
    }

    getAddAnswerButton() {
        return this.page.getByRole('button', { name: 'Add Answer' });
    }

    getCreateButton() {
        return this.page.getByRole('button', { name: 'Create' });
    }

    clickCreateButton(numberOfClick = 1) {
        return this.getCreateButton().click({ clickCount: numberOfClick });
    }

    clickAddAnswerButton(numberOfClick = 1) {
        return this.getAddAnswerButton().click({ clickCount: numberOfClick });
    }
}