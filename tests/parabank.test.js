const { test, expect } = require('@playwright/test');

test('Automate Parabank flow', async ({ page }) => {
    // Navegar para o site
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');

    // Registrar um novo usuário
    await page.click('text=Register');
    await page.fill('input[name="customer.firstName"]', 'Mate');
    await page.fill('input[name="customer.lastName"]', 'Moro');
    await page.fill('input[name="customer.address.street"]', '5th Avenue');
    await page.fill('input[name="customer.address.city"]', 'New York');
    await page.fill('input[name="customer.address.state"]', 'NY');
    await page.fill('input[name="customer.address.zipCode"]', '1001');
    await page.fill('input[name="customer.phoneNumber"]', '1234567890');
    await page.fill('input[name="customer.ssn"]', '10-11-0001');

    const username = `user${Date.now()}`;
    const password = 'Password';

    await page.fill('input[name="customer.username"]', username);
    await page.fill('input[name="customer.password"]', password);
    await page.fill('input[name="repeatedPassword"]', password);
    await page.click('input[value="Register"]');

    await expect(page).toHaveURL(/register.htm/);

    await page.click('text=Transfer Funds');
    await page.fill('input[id="amount"]', '500');

    const fromAccount = await page.locator('#fromAccountId option').first().getAttribute('value');
    const toAccount = await page.locator('#toAccountId option').first().getAttribute('value');

    await page.selectOption('#fromAccountId', fromAccount);
    await page.selectOption('#toAccountId', toAccount);
    await page.click('input[value="Transfer"]');

    const resultDiv = page.locator('#showResult');

    await expect(resultDiv).toContainText('Transfer Complete!');
    await expect(resultDiv.locator('#amountResult')).toHaveText('$500.00');
    await expect(resultDiv.locator('#fromAccountIdResult')).not.toBeEmpty();
    await expect(resultDiv.locator('#toAccountIdResult')).not.toBeEmpty();
    await page.waitForTimeout(10000);
});
