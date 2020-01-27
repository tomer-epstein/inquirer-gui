import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Form from '../src/Form.vue';

const questionInput = [
  {
    type: "input",
    name: "input",
    message: "An input",
    default: "default input",
    validate: function (input) {
      if (input.length >= 2) {
        return true;
      } else {
        return "Name must be at least 2 characters long";
      }
    }
  }
];

const questionPassword = [
  {
    type: "password",
    name: "password",
    message: "A password"
  }
];

const questionNumber = [
  {
    type: "number",
    name: "number",
    message: "A number",
    default: "0"
  },
];

let localVue;

describe('Questions of type input, password and number', () => {
  beforeAll(() => {
    localVue = createLocalVue();
    localVue.use(Vuetify);
  });

  test('Input', async () => {
    const value1 = "my input";

    const wrapper = mount(Form, { localVue });
    wrapper.setProps({ questions: questionInput });
    await localVue.nextTick();

    const name = wrapper.find('input');
    name.element.value = value1;
    name.trigger('input');

    await localVue.nextTick();
    expect(wrapper.emitted().answered).toBeTruthy();
    const answered = wrapper.emitted().answered[0];
    // test answers
    expect(answered[0].input).toEqual(value1);
    // test validation
    expect(answered[1]).toEqual(true);
  });

  test('Input with invalid input', async () => {
    const value1 = "m";

    const wrapper = mount(Form, { localVue });
    wrapper.setProps({ questions: questionInput });
    await localVue.nextTick();

    const name = wrapper.find('input');
    name.element.value = value1;
    name.trigger('input');

    await localVue.nextTick();
    expect(wrapper.emitted().answered).toBeTruthy();
    const answered = wrapper.emitted().answered[0];
    // test answers
    expect(answered[0].input).toEqual(value1);
    // test validation
    expect(answered[1]).toEqual(false);
  });

  test('Password', async () => {
    const value1 = "my password";

    const wrapper = mount(Form, { localVue });
    wrapper.setProps({ questions: questionPassword });
    await localVue.nextTick();

    const name = wrapper.find('input');
    name.element.value = value1;
    name.trigger('input');

    await localVue.nextTick();
    expect(wrapper.emitted().answered).toBeTruthy();
    const answered = wrapper.emitted().answered[0];
    // test answers
    expect(answered[0].password).toEqual(value1);
  });

  test('Number', async () => {
    const value1 = 5;

    const wrapper = mount(Form, { localVue });
    wrapper.setProps({ questions: questionNumber });
    await localVue.nextTick();

    const name = wrapper.find('input');
    name.element.value = value1;
    name.trigger('input');

    await localVue.nextTick();
    expect(wrapper.emitted().answered).toBeTruthy();
    const answered = wrapper.emitted().answered[0];
    // test answers
    expect(answered[0].number).toEqual(value1.toString());
  });
});