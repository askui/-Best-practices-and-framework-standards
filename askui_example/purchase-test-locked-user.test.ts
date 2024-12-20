import { aui } from "./helpers/askui-helper";
import { LoginPage } from './page_workflows/login-page';
import { InventoryPage } from './page_workflows/inventory-page';
import { CheckoutPage } from './page_workflows/checkout-page';
import { testData } from './data_input/test-data';
import { logger } from './logging/logger';
import dotenv from 'dotenv';
dotenv.config();
describe('Sauce Demo Purchase Flow Tests', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let checkoutPage: CheckoutPage;

    beforeEach(async () => {
        loginPage = new LoginPage();
        inventoryPage = new InventoryPage();
        checkoutPage = new CheckoutPage();
    });

    afterEach(async () => {
        await aui.pressTwoKeys('alt', 'f4').exec();
        await aui.waitFor(1000).exec();
        logger.info('Browser instance closed');
    });

    
    it('Locked out user should not be able to login', async () => {
        logger.info('Starting locked out user test');
        
        await loginPage.navigateToSite();
        await loginPage.login(
            process.env.lockedUserName!,
            process.env.commonPassword!
        );
        await aui.waitUntil(aui.expect().text(testData.lockedUserError).exists());
        await aui.annotate();
        logger.success('Successfully verified locked out user cannot login');
    });

});