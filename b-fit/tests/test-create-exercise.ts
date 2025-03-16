import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Sign in/Sign Up' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('buttermaslo97@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Password1234');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('button', { name: 'Testing User buttermaslo97@' }));
  await page.getByRole('link', { name: 'Exercises', exact: true }).click();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByRole('textbox', { name: 'Exercise Name' }).click();
  await page.getByRole('textbox', { name: 'Exercise Name' }).fill('Testing Exercise');
  await page.getByRole('button', { name: 'Equipment Please select' }).click();
  await page.getByLabel('Equipment').getByText('Machine', { exact: true }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Primary Muscle Please select' }).click();
  await page.getByText('Biceps').click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Auxiliary Muscles None' }).click();
  await page.getByText('Triceps', { exact: true }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Exercise Type Please select' }).click();
  await page.getByText('Small exercise').click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Create' }).click();
});