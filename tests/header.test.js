const puppeteer = require('puppeteer');
const tokenFactory = require('./factories/tokenFactory');
const userFactory = require('./factories/userFactory');
const mongoose = require('mongoose');

let browser, page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    args: ['--no-sandbox'],
  });
  page = await browser.newPage();

  await page.goto('http://localhost:3000/');
});

afterEach(async () => {
  await browser.close();
});

beforeAll(done => {
  done();
});
afterAll(done => {
  mongoose.connection.close();
  done();
});

test('Sign in text is in the screen when page is launched', async () => {
  const text = await page.$eval('#header [href="/sign-in"]', el => el.innerHTML);
  expect(text).toContain('Sign in');
});

it('redirects to /sign-in when user clicks in the sign in button', async () => {
  await page.click('#header [href="/sign-in"]');
  const url = await page.url();
  expect(url).toMatch(/\/sign-in/);
});

describe('User is logged in', () => {
  beforeEach(async () => {
    const user = await userFactory();
    const token = await tokenFactory(user);
    await page.evaluateOnNewDocument(token => {
      localStorage.setItem('token', token);
    }, token);
    await page.goto('http://localhost:3000/');
  });

  it('should render a log out button', async () => {
    await page.waitForSelector('#header [href="/log-out"]');
    const text = await page.$eval('#header [href="/log-out"]', el => el.innerHTML);
    expect(text).toContain('Log out');
  });

  it('should have a CTA to create a profile', async () => {
    await page.goto('http://localhost:3000/dashboard', { waitUntil: 'networkidle0' });
    const text = await page.$eval('#dashboard .btn', el => el.innerHTML);
    expect(text).toContain('Create a profile');
  });
});
