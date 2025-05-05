import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class QuizFormFixture extends E2EComponentFixture {
  getQuizForm() {
    return this.page.waitForSelector('app-quiz-form');
  }

  getInput(id: string) {
    const selector = `app-quiz-form input[id="${id}"]`;
    return this.page.waitForSelector(selector);
  }

  getCreateButton() {
   return this.page.getByRole('button', { name: 'Create' });
  }

  clickCreateButton() {
    return this.getCreateButton().click();
  }
}