FROM node:20-alpine

#RUN apk add --no-cache python g++ make

WORKDIR /app
COPY . .
COPY prisma ./prisma/

RUN npm install
RUN npm run build
RUN npx prisma generate

EXPOSE 3333
CMD ["node", "build/server.js"]