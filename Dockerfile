FROM node:20.5.0  

WORKDIR /agms-client
## vous devez ici placer le nom de votre dossier backend

COPY package*.json ./

#RUN npm install -g npm@10.8.1

RUN npm install -f

# Install webpack globally
RUN npm install -g webpack

COPY . .

EXPOSE 5671

CMD ["npm","start"]
