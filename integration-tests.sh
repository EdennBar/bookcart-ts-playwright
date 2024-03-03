docker-compose -f docker-compose-selenium-grid.yml up -d --scale chrome=4
SELENIUM_REMOTE_URL=http://localhost:4444/ npx playwright test --project=chromium --headed 



#DEBUG=pw:browser* SELENIUM_REMOTE_URL=http://localhost:4444 npx playwright test --project=chromium