FROM mcr.microsoft.com/playwright:v1.52.0-noble
WORKDIR /www
RUN npm install @playwright/test@1.52.0
COPY ./e2e ./e2e
COPY ./playwright.config.js ./playwright.config.js
CMD ["npx", "playwright", "test"]
